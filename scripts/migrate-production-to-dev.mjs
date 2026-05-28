/**
 * Copies every document from the 'production' dataset to 'dev', then deletes
 * all blog documents from 'production'.
 *
 * Usage:
 *   SANITY_API_TOKEN=<token> node scripts/migrate-production-to-dev.mjs
 *
 * Get a token (Editor role or higher) at:
 *   https://www.sanity.io/manage/project/q2wjujwy/api#tokens
 *
 * Flags:
 *   --skip-delete   Copy only — do not delete blogs from production afterward
 *   --skip-images   Skip image asset migration (faster, but image refs will break)
 */

import { createClient } from '@sanity/client'
import https from 'https'
import http from 'http'

// ─── Config ──────────────────────────────────────────────────────────────────

const PROJECT_ID  = 'q2wjujwy'
const API_VERSION = '2026-04-23'
const SOURCE      = 'production'
const TARGET      = 'dev'
const BLOG_TYPE   = 'blog'
const BATCH_SIZE  = 50
const FETCH_SIZE  = 100

// ─── Bootstrap ───────────────────────────────────────────────────────────────

const token = process.env.SANITY_API_TOKEN
if (!token) {
  console.error('✖  SANITY_API_TOKEN is not set.')
  console.error('   Get a token at: https://www.sanity.io/manage/project/q2wjujwy/api#tokens')
  process.exit(1)
}

const args       = new Set(process.argv.slice(2))
const skipDelete = args.has('--skip-delete')
const skipImages = args.has('--skip-images')

const base = { projectId: PROJECT_ID, apiVersion: API_VERSION, token, useCdn: false }
const src  = createClient({ ...base, dataset: SOURCE })
const tgt  = createClient({ ...base, dataset: TARGET })

// ─── Helpers ─────────────────────────────────────────────────────────────────

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function fetchAll(type) {
  const docs = []
  let offset = 0
  while (true) {
    const page = await src.fetch(
      `*[_type == $type] | order(_id asc) [$start...$end]`,
      { type, start: offset, end: offset + FETCH_SIZE },
      { perspective: 'raw' }
    )
    docs.push(...page)
    if (page.length < FETCH_SIZE) break
    offset += FETCH_SIZE
  }
  return docs
}

function chunk(arr, n) {
  const out = []
  for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n))
  return out
}

function download(url) {
  return new Promise((resolve, reject) => {
    const get = url.startsWith('https') ? https.get : http.get
    get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        download(res.headers.location).then(resolve).catch(reject)
        return
      }
      const bufs = []
      res.on('data', (b) => bufs.push(b))
      res.on('end',  ()  => resolve(Buffer.concat(bufs)))
      res.on('error', reject)
    }).on('error', reject)
  })
}

/**
 * Recursively walk a document value and rewrite any _ref string that appears
 * in the remap table. Returns a new object/array (does not mutate the input).
 */
function applyRemap(value, remap) {
  if (Array.isArray(value)) return value.map((v) => applyRemap(v, remap))
  if (value !== null && typeof value === 'object') {
    const out = {}
    for (const [k, v] of Object.entries(value)) {
      out[k] = k === '_ref' && typeof v === 'string' && remap.has(v) ? remap.get(v) : applyRemap(v, remap)
    }
    return out
  }
  return value
}

// ─── Step 1: Image assets ────────────────────────────────────────────────────

/**
 * Upload all production image assets to dev.
 * Returns a Map<productionId, devId> for any IDs that differ (CDN re-encodes
 * images on download, so the SHA1 hash may change). Documents are patched
 * using this map before being written to dev.
 */
async function migrateImageAssets() {
  if (skipImages) {
    console.log('⏭  Skipping image assets (--skip-images)')
    return new Map()
  }

  console.log('\n── Image assets ─────────────────────────────────────────────')
  const assets = await fetchAll('sanity.imageAsset')
  console.log(`   Found ${assets.length} image asset(s) in ${SOURCE}`)

  const remap = new Map()  // productionId → devId (only populated when they differ)
  let done = 0, failed = 0

  for (const asset of assets) {
    // Derive the canonical CDN URL from the _id to avoid redirects / query params
    const m = asset._id.match(/^image-([a-f0-9]+)-(\d+x\d+)-(\w+)$/)
    if (!m) {
      console.warn(`\n   ⚠  Cannot parse asset ID ${asset._id} — skipping`)
      failed++
      done++
      continue
    }
    const [, sha1, dims, fmt] = m
    const url      = `https://cdn.sanity.io/images/${PROJECT_ID}/${SOURCE}/${sha1}-${dims}.${fmt}`
    const ext      = fmt === 'jpg' ? 'jpeg' : fmt
    const mimeType = asset.mimeType || `image/${ext}`

    try {
      const buf      = await download(url)
      const uploaded = await tgt.assets.upload('image', buf, {
        filename:    asset.originalFilename || `${sha1}-${dims}.${fmt}`,
        contentType: mimeType,
      })

      if (uploaded._id !== asset._id) {
        remap.set(asset._id, uploaded._id)
      }
    } catch (err) {
      console.warn(`\n   ⚠  Failed ${asset._id}: ${err.message}`)
      failed++
    }

    done++
    process.stdout.write(`\r   Processed ${done}/${assets.length}`)
    await sleep(50)
  }

  const remapped = remap.size
  console.log(`\n   ✔  ${done - failed} uploaded, ${failed} failed, ${remapped} ID(s) remapped`)

  if (remapped > 0) {
    console.log('   Remapped IDs (production → dev):')
    for (const [oldId, newId] of remap) {
      console.log(`     ${oldId}\n     → ${newId}`)
    }
  }

  if (done - failed > 0) {
    process.stdout.write('   Waiting for assets to settle...')
    await sleep(4000)
    console.log(' done')
  }

  return remap
}

// ─── Step 2: All other document types ────────────────────────────────────────

async function migrateDocuments(assetRemap) {
  console.log('\n── Documents ────────────────────────────────────────────────')

  const all = []
  let offset = 0
  while (true) {
    const page = await src.fetch(
      `*[
        !(_id in path("_.**")) &&
        _type != "sanity.imageAsset" &&
        _type != "sanity.fileAsset"
      ] | order(_id asc) [$start...$end]`,
      { start: offset, end: offset + FETCH_SIZE },
      { perspective: 'raw' }
    )
    all.push(...page)
    if (page.length < FETCH_SIZE) break
    offset += FETCH_SIZE
  }

  console.log(`   Found ${all.length} document(s) in ${SOURCE} (raw, all types)`)
  if (assetRemap.size > 0) {
    console.log(`   Applying ${assetRemap.size} asset ID remap(s) to document references`)
  }

  const drafts    = all.filter((d) =>  d._id.startsWith('drafts.'))
  const published = all.filter((d) => !d._id.startsWith('drafts.'))

  async function writeBatch(docs, label) {
    let n = 0
    for (const batch of chunk(docs, BATCH_SIZE)) {
      const tx = tgt.transaction()
      for (const doc of batch) {
        const { _rev, ...rest } = doc
        // Rewrite any _ref values that changed due to CDN re-encoding
        const patched = assetRemap.size > 0 ? applyRemap(rest, assetRemap) : rest
        tx.createOrReplace(patched)
      }
      await tx.commit({ visibility: 'sync' })
      n += batch.length
      process.stdout.write(`\r   ${label}: ${n}/${docs.length}`)
    }
    if (docs.length) console.log()
  }

  await writeBatch(published, 'Published')
  await writeBatch(drafts,    'Drafts   ')

  const counts = {}
  for (const d of all) counts[d._type] = (counts[d._type] || 0) + 1
  console.log('   By type:')
  for (const [type, count] of Object.entries(counts).sort()) {
    console.log(`     ${type.padEnd(20)} ${count}`)
  }
}

// ─── Step 3: Delete blogs from production ────────────────────────────────────

async function deleteProductionBlogs() {
  if (skipDelete) {
    console.log('\n⏭  Skipping production blog deletion (--skip-delete)')
    return
  }

  console.log('\n── Deleting blogs from production ───────────────────────────')

  const ids = await src.fetch(`*[_type == $type]._id`, { type: BLOG_TYPE }, { perspective: 'raw' })
  if (!ids.length) { console.log('   Nothing to delete.'); return }

  console.log(`   Found ${ids.length} blog document(s) to delete`)
  for (const batch of chunk(ids, BATCH_SIZE)) {
    const tx = src.transaction()
    for (const id of batch) tx.delete(id)
    await tx.commit({ visibility: 'sync' })
  }
  console.log(`   ✔  Deleted ${ids.length} blog document(s) from ${SOURCE}`)
}

// ─── Main ─────────────────────────────────────────────────────────────────────

console.log(`Huerray Sanity migration: ${SOURCE} → ${TARGET}`)
console.log(`Project: ${PROJECT_ID}`)
console.log(`Flags: skip-delete=${skipDelete}, skip-images=${skipImages}\n`)

try {
  const assetRemap = await migrateImageAssets()
  await migrateDocuments(assetRemap)
  await deleteProductionBlogs()
  console.log('\n✅  Migration complete.\n')
} catch (err) {
  console.error('\n✖  Migration failed:', err.message)
  process.exit(1)
}
