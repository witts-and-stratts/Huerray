/**
 * Restores full blog documents (body + mainImage) to the 'dev' dataset by
 * parsing the cached MCP query result files that were saved before the blogs
 * were deleted from production.
 *
 * Usage:
 *   SANITY_API_TOKEN=<token> node scripts/restore-blogs-from-cache.mjs
 */

import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'

const PROJECT_ID  = 'q2wjujwy'
const API_VERSION = '2026-04-23'
const TARGET      = 'dev'
const BATCH_SIZE  = 5

// The cached file that contains ALL 93 production documents (including all 37 blogs)
const CACHE_FILE  =
  '/Users/ws-one/.claude/projects/-Users-ws-one-Documents-www-huerray/' +
  '64ade64e-3d98-4eaa-935f-9a7163ec8b61/tool-results/' +
  'mcp-Sanity-query_documents-1779676299392.txt'

// ─── Bootstrap ───────────────────────────────────────────────────────────────

const token = process.env.SANITY_API_TOKEN
if (!token) {
  console.error('✖  SANITY_API_TOKEN is not set.')
  console.error('   Get a token at: https://www.sanity.io/manage/project/q2wjujwy/api#tokens')
  process.exit(1)
}

const tgt = createClient({ projectId: PROJECT_ID, dataset: TARGET, apiVersion: API_VERSION, token, useCdn: false })

// ─── Parse cached MCP file ────────────────────────────────────────────────────

function parseCacheFile(filePath) {
  const text = readFileSync(filePath, 'utf8')
  const docs = []

  // Each document is wrapped in <documents>...</documents> tags.
  // The JSON inside can span many lines, so we split on tag boundaries.
  const regex = /<documents>([\s\S]*?)<\/documents>/g
  let match
  while ((match = regex.exec(text)) !== null) {
    try {
      docs.push(JSON.parse(match[1].trim()))
    } catch (err) {
      console.warn('   ⚠  Failed to parse a document block:', err.message)
    }
  }
  return docs
}

// ─── Recursive _ref rewriter ──────────────────────────────────────────────────

function applyRemap(value, remap) {
  if (Array.isArray(value)) return value.map((v) => applyRemap(v, remap))
  if (value !== null && typeof value === 'object') {
    const out = {}
    for (const [k, v] of Object.entries(value)) {
      out[k] = k === '_ref' && typeof v === 'string' && remap.has(v)
        ? remap.get(v)
        : applyRemap(v, remap)
    }
    return out
  }
  return value
}

// ─── Build asset remap ───────────────────────────────────────────────────────
// Match production assets (from cache) to dev assets by originalFilename.

async function buildAssetRemap(cachedDocs) {
  const prodAssets = cachedDocs.filter((d) => d._type === 'sanity.imageAsset')
  const devAssets  = await tgt.fetch('*[_type == "sanity.imageAsset"]{ _id, originalFilename }')

  const devByFilename = new Map(devAssets.map((a) => [a.originalFilename, a._id]))

  const remap = new Map()
  for (const a of prodAssets) {
    const devId = devByFilename.get(a.originalFilename)
    if (devId && devId !== a._id) remap.set(a._id, devId)
  }

  console.log(`   ${remap.size} asset ID(s) will be remapped`)
  return remap
}

// ─── Main ─────────────────────────────────────────────────────────────────────

console.log(`Restoring blogs from cache → ${TARGET} (project: ${PROJECT_ID})\n`)

// 1. Parse the cache file
console.log('── Parsing cache file ───────────────────────────────────────')
console.log(`   ${CACHE_FILE}`)
const allDocs  = parseCacheFile(CACHE_FILE)
const blogs    = allDocs.filter((d) => d._type === 'blog')
console.log(`   Parsed ${allDocs.length} total docs, found ${blogs.length} blog(s)`)

if (!blogs.length) {
  console.error('✖  No blogs found in cache file.')
  process.exit(1)
}

// 2. Build asset remap
console.log('\n── Building asset remap ─────────────────────────────────────')
const assetRemap = await buildAssetRemap(allDocs)

// 3. Write blogs to dev
console.log('\n── Writing blogs to dev ─────────────────────────────────────')
let written = 0

for (let i = 0; i < blogs.length; i += BATCH_SIZE) {
  const batch = blogs.slice(i, i + BATCH_SIZE)
  const tx    = tgt.transaction()

  for (const doc of batch) {
    // Strip _rev so Sanity assigns a fresh one; preserve all other fields
    const { _rev, _system, ...rest } = doc
    const patched = assetRemap.size > 0 ? applyRemap(rest, assetRemap) : rest
    tx.createOrReplace(patched)
  }

  await tx.commit({ visibility: 'sync' })
  written += batch.length
  process.stdout.write(`\r   Written ${written}/${blogs.length}`)
}

console.log('\n')

// 4. Verify
const devCount = await tgt.fetch('count(*[_type == "blog" && defined(body)])')
console.log(`✅  Done. ${written} blog(s) written. ${devCount} blog(s) in dev now have body content.\n`)
