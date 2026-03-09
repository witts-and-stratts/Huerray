const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const BASE_DIR = '/Users/ws-one/Documents/www/huerray/';

const TARGET_DIRS = [
  path.join(BASE_DIR, 'app/[locale]/(admin)'),
  path.join(BASE_DIR, 'components'),
];

const REPLACEMENTS = [
  { search: "space-y-4 bg-slate-50/50 grow relative overflow-auto", replace: "ad-shell ad-shell--slate" },
  { search: "flex flex-col gap-4 h-full", replace: "ad-page-body h-full" },
  { search: "flex flex-col gap-4", replace: "ad-page-body" },
  { search: "grid grid-cols-1 gap-4 lg:grid-cols-12", replace: "ad-grid-main" },
  { search: "grid grid-cols-1 gap-4 lg:grid-cols-2", replace: "ad-grid-two" },
  { search: "grid grid-cols-1 gap-4 lg:grid-cols-3", replace: "ad-grid-three" },
  { search: "grid gap-4 md:grid-cols-12 lg:h-full", replace: "ad-grid-main lg:h-full" },
  { search: "grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3", replace: "ad-kpi-grid" },
  { search: "lg:col-span-8", replace: "ad-main-span" },
  { search: "order-2 lg:order-1 lg:col-span-8 space-y-4", replace: "order-2 lg:order-1 ad-main-span space-y-4" },
  { search: "ad-shell py-4 bg-slate-50/50 mt-0 flex-1", replace: "ad-shell ad-shell--slate" },
  { search: "ad-shell py-4 bg-burgundy-50/50 mt-0", replace: "ad-shell ad-shell--burgundy" },
  { search: "space-y-4 md:col-span-7", replace: "ad-page-body md:col-span-7" }, // From detail pages
  { search: "flex flex-col md:flex-row gap-4 w-full flex-1", replace: "flex flex-col md:flex-row gap-4 w-full flex-1" } // Keep standard flex
];

async function processFile(filePath) {
  if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts')) return;

  const content = await readFile(filePath, 'utf8');
  let newContent = content;

  let modified = false;
  for (const { search, replace } of REPLACEMENTS) {
    if (newContent.includes(search)) {
      newContent = newContent.replaceAll(search, replace);
      modified = true;
    }
  }

  if (modified) {
    console.log(`[UPDATED] ${filePath}`);
    await writeFile(filePath, newContent, 'utf8');
  }
}

async function walk(dir) {
  try {
    const list = await readdir(dir);
    for (const file of list) {
      const filePath = path.join(dir, file);
      const fsStat = await stat(filePath);
      if (fsStat.isDirectory()) {
        await walk(filePath);
      } else {
        await processFile(filePath);
      }
    }
  } catch (err) {
    // some directories might not exist, skip silently
  }
}

async function main() {
  for (const targetDir of TARGET_DIRS) {
    console.log(`Walking directory: ${targetDir}`);
    await walk(targetDir);
  }
  console.log('Refactoring complete.');
}

main().catch(console.error);
