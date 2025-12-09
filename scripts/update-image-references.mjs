#!/usr/bin/env node
import { readFile, writeFile, readdir } from 'fs/promises';
import { join, dirname, extname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PROJECT_ROOT = join(__dirname, '..');
const CONVERSION_MAP_PATH = join(PROJECT_ROOT, 'conversion-map.json');

// File extensions to search in
const SEARCH_EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js', '.css', '.json', '.html'];

// Track updates
const updates = [];

async function updateReferencesInFile(filePath, conversions) {
  try {
    let content = await readFile(filePath, 'utf-8');
    let modified = false;
    const fileUpdates = [];
    
    for (const conversion of conversions) {
      // Create search patterns for different formats
      const originalPath = conversion.original;
      const webpPath = conversion.webp;
      
      // Match patterns like: /images/path/to/file.jpg, '/images/path...', "/images/path..."
      const patterns = [
        new RegExp(`/images/${originalPath.replace(/\./g, '\\.')}`, 'g'),
        new RegExp(`images/${originalPath.replace(/\./g, '\\.')}`, 'g'),
      ];
      
      for (const pattern of patterns) {
        if (pattern.test(content)) {
          const newContent = content.replace(
            pattern, 
            pattern.source.includes('/images') 
              ? `/images/${webpPath}` 
              : `images/${webpPath}`
          );
          
          if (newContent !== content) {
            content = newContent;
            modified = true;
            fileUpdates.push({
              original: originalPath,
              webp: webpPath
            });
          }
        }
      }
    }
    
    if (modified) {
      await writeFile(filePath, content, 'utf-8');
      updates.push({
        file: filePath,
        changes: fileUpdates
      });
      console.log(`✓ Updated: ${filePath} (${fileUpdates.length} references)`);
    }
  } catch (error) {
    console.error(`✗ Failed to update ${filePath}:`, error.message);
  }
}

async function findFilesToUpdate(dir, files = []) {
  const entries = await readdir(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    
    // Skip node_modules, .git, .next, etc.
    if (entry.isDirectory()) {
      if (!entry.name.startsWith('.') && 
          entry.name !== 'node_modules' && 
          entry.name !== 'dist' && 
          entry.name !== 'build') {
        await findFilesToUpdate(fullPath, files);
      }
    } else if (entry.isFile()) {
      const ext = extname(entry.name);
      if (SEARCH_EXTENSIONS.includes(ext)) {
        files.push(fullPath);
      }
    }
  }
  
  return files;
}

async function main() {
  console.log('🚀 Starting reference update...\n');
  
  // Load conversion map
  const conversionMap = JSON.parse(await readFile(CONVERSION_MAP_PATH, 'utf-8'));
  console.log(`📋 Loaded ${conversionMap.length} conversions from map\n`);
  
  // Find all files to update
  const filesToUpdate = await findFilesToUpdate(PROJECT_ROOT);
  console.log(`📁 Found ${filesToUpdate.length} files to scan\n`);
  
  // Update references
  for (const file of filesToUpdate) {
    await updateReferencesInFile(file, conversionMap);
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('✅ Reference update complete!\n');
  console.log(`📊 Summary:`);
  console.log(`   Files scanned: ${filesToUpdate.length}`);
  console.log(`   Files updated: ${updates.length}`);
  
  const totalChanges = updates.reduce((sum, u) => sum + u.changes.length, 0);
  console.log(`   Total references updated: ${totalChanges}\n`);
  
  // Write update log
  await writeFile(
    join(PROJECT_ROOT, 'reference-updates.json'),
    JSON.stringify(updates, null, 2)
  );
  console.log(`📝 Update log saved to: reference-updates.json`);
}

main().catch(console.error);
