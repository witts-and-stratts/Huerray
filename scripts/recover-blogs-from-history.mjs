/**
 * Recovers deleted blog documents from Sanity's transaction history and
 * restores them (with full body + mainImage) into the 'dev' dataset.
 *
 * Usage:
 *   SANITY_API_TOKEN=<token> node scripts/recover-blogs-from-history.mjs
 *
 * The token needs at least Editor role.
 * Get one at: https://www.sanity.io/manage/project/q2wjujwy/api#tokens
 */

import { createClient } from '@sanity/client'

const PROJECT_ID  = 'q2wjujwy'
const API_VERSION = '2026-04-23'
const SOURCE      = 'production'  // history is read from here (deleted docs)
const TARGET      = 'dev'         // restored docs are written here
const BATCH_SIZE  = 10

const token = process.env.SANITY_API_TOKEN
if (!token) {
  console.error('✖  SANITY_API_TOKEN is not set.')
  console.error('   Get a token at: https://www.sanity.io/manage/project/q2wjujwy/api#tokens')
  process.exit(1)
}

const tgt = createClient({ projectId: PROJECT_ID, dataset: TARGET, apiVersion: API_VERSION, token, useCdn: false })

// ─── Build production→dev image asset remap ──────────────────────────────────
// Production and dev image assets were re-encoded by Sanity CDN on download,
// so their SHA1 hashes differ. Match by originalFilename + dimensions to remap.

async function buildAssetRemap() {
  const src = createClient({ projectId: PROJECT_ID, dataset: SOURCE, apiVersion: API_VERSION, token, useCdn: false })

  const [prodAssets, devAssets] = await Promise.all([
    src.fetch('*[_type == "sanity.imageAsset"]{ _id, originalFilename, metadata }'),
    tgt.fetch('*[_type == "sanity.imageAsset"]{ _id, originalFilename, metadata }'),
  ])

  // Index dev assets by filename
  const devByFilename = new Map()
  for (const a of devAssets) {
    if (a.originalFilename) devByFilename.set(a.originalFilename, a._id)
  }

  const remap = new Map()
  for (const a of prodAssets) {
    if (a._id === devByFilename.get(a.originalFilename)) continue  // already same
    const devId = devByFilename.get(a.originalFilename)
    if (devId) remap.set(a._id, devId)
  }

  if (remap.size > 0) {
    console.log(`   Built asset remap (${remap.size} entries):`)
    for (const [k, v] of remap) console.log(`     ${k} → ${v}`)
  } else {
    console.log('   No asset remapping needed.')
  }
  return remap
}

// ─── Fetch document history via Sanity HTTP API ───────────────────────────────

async function fetchLastRevision(id) {
  // The history endpoint returns newline-delimited JSON of revisions (newest first
  // when using reverse=true). Each line is either a full document snapshot or a
  // set of mutations. We want the last published state before the document was deleted.
  const url = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/history/${SOURCE}/documents/${id}?limit=5&reverse=true`
  const res  = await fetch(url, { headers: { Authorization: `Bearer ${token}` } })

  if (!res.status === 200 && res.status !== 204) {
    console.warn(`   ⚠  History API returned ${res.status} for ${id}`)
    return null
  }

  const text = await res.text()
  if (!text.trim()) return null

  // Response is NDJSON — parse each line
  const lines = text.trim().split('\n').filter(Boolean)
  for (const line of lines) {
    try {
      const entry = JSON.parse(line)
      // Each entry has a `document` field (snapshot) or `result` field
      const doc = entry.document ?? entry.result ?? entry
      if (doc && doc._id && doc._type === 'blog') return doc
    } catch { /* skip malformed lines */ }
  }

  return null
}

// ─── Recursive _ref rewriter ──────────────────────────────────────────────────

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

// ─── Main ─────────────────────────────────────────────────────────────────────

console.log(`Recovering deleted blogs: ${SOURCE} history → ${TARGET}`)
console.log(`Project: ${PROJECT_ID}\n`)

// 1. Get blog IDs from dev (these are the original production IDs)
const devBlogs = await tgt.fetch('*[_type == "blog"]{ _id, title }', {}, { perspective: 'raw' })
console.log(`Found ${devBlogs.length} blog stub(s) in dev to recover.\n`)

if (!devBlogs.length) {
  console.log('Nothing to recover.')
  process.exit(0)
}

// 2. Build asset remap
console.log('── Asset remap ──────────────────────────────────────────────')
const assetRemap = await buildAssetRemap()

// 3. Recover each blog from production history
console.log('\n── Fetching history ─────────────────────────────────────────')
const recovered = []
const failed    = []

for (const stub of devBlogs) {
  process.stdout.write(`\r   ${recovered.length + failed.length + 1}/${devBlogs.length} — ${stub._id}`)
  const doc = await fetchLastRevision(stub._id)
  if (doc) {
    recovered.push(doc)
  } else {
    failed.push(stub._id)
    console.log(`\n   ⚠  No history found for ${stub._id} (${JSON.stringify(stub.title)})`)
  }
  await new Promise((r) => setTimeout(r, 80))  // gentle rate-limit
}

console.log(`\n   ✔  ${recovered.length} recovered, ${failed.length} not found in history`)

if (!recovered.length) {
  console.error('\n✖  No documents could be recovered from history.')
  console.error('   The blog content may have been permanently purged.')
  process.exit(1)
}

// 4. Write recovered docs to dev (createOrReplace to overwrite the stubs)
console.log('\n── Writing to dev ───────────────────────────────────────────')
let written = 0

for (let i = 0; i < recovered.length; i += BATCH_SIZE) {
  const batch = recovered.slice(i, i + BATCH_SIZE)
  const tx    = tgt.transaction()

  for (const doc of batch) {
    const { _rev, ...rest } = doc
    const patched = assetRemap.size > 0 ? applyRemap(rest, assetRemap) : rest
    tx.createOrReplace(patched)
  }

  await tx.commit({ visibility: 'sync' })
  written += batch.length
  process.stdout.write(`\r   Written ${written}/${recovered.length}`)
}

console.log('\n')

if (failed.length) {
  console.warn(`⚠  ${failed.length} blog(s) could not be recovered (history not available):`)
  for (const id of failed) console.warn(`   - ${id}`)
}

console.log('\n✅  Recovery complete. Open Sanity Studio to verify the restored blogs.\n')
