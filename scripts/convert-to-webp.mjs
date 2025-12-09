#!/usr/bin/env node
import sharp from 'sharp';
import { readdir, stat, mkdir } from 'fs/promises';
import { join, extname, dirname, relative } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const MAX_SIZE = 1600;
const IMAGES_DIR = join(__dirname, '../public/images');

// Extensions to convert
const CONVERT_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif'];

// Track conversions for reporting
const conversions = [];

async function convertImage(inputPath, outputPath) {
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    // Calculate new dimensions if needed
    let width = metadata.width;
    let height = metadata.height;
    
    if (width > MAX_SIZE || height > MAX_SIZE) {
      if (width > height) {
        height = Math.round((height * MAX_SIZE) / width);
        width = MAX_SIZE;
      } else {
        width = Math.round((width * MAX_SIZE) / height);
        height = MAX_SIZE;
      }
    }
    
    // Convert to webp
    await image
      .resize(width, height, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ quality: 85 })
      .toFile(outputPath);
    
    const originalSize = (await stat(inputPath)).size;
    const newSize = (await stat(outputPath)).size;
    
    conversions.push({
      original: relative(IMAGES_DIR, inputPath),
      webp: relative(IMAGES_DIR, outputPath),
      originalSize,
      newSize,
      savings: originalSize - newSize,
      dimensions: `${width}x${height}`
    });
    
    console.log(`✓ Converted: ${relative(IMAGES_DIR, inputPath)} -> ${relative(IMAGES_DIR, outputPath)}`);
  } catch (error) {
    console.error(`✗ Failed to convert ${inputPath}:`, error.message);
  }
}

async function processDirectory(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    
    if (entry.isDirectory()) {
      await processDirectory(fullPath);
    } else if (entry.isFile()) {
      const ext = extname(entry.name).toLowerCase();
      
      if (CONVERT_EXTENSIONS.includes(ext)) {
        const webpPath = fullPath.replace(new RegExp(`${ext}$`), '.webp');
        await convertImage(fullPath, webpPath);
      }
    }
  }
}

async function main() {
  console.log('🚀 Starting image conversion to WebP...');
  console.log(`📁 Images directory: ${IMAGES_DIR}`);
  console.log(`📏 Max size: ${MAX_SIZE}x${MAX_SIZE}px\n`);
  
  await processDirectory(IMAGES_DIR);
  
  console.log('\n' + '='.repeat(60));
  console.log('✅ Conversion complete!\n');
  
  const totalOriginal = conversions.reduce((sum, c) => sum + c.originalSize, 0);
  const totalNew = conversions.reduce((sum, c) => sum + c.newSize, 0);
  const totalSavings = totalOriginal - totalNew;
  
  console.log(`📊 Summary:`);
  console.log(`   Files converted: ${conversions.length}`);
  console.log(`   Original size: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   New size: ${(totalNew / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Savings: ${(totalSavings / 1024 / 1024).toFixed(2)} MB (${((totalSavings / totalOriginal) * 100).toFixed(1)}%)`);
  
  // Write conversion map to file for reference updating
  const fs = await import('fs/promises');
  await fs.writeFile(
    join(__dirname, '../conversion-map.json'),
    JSON.stringify(conversions, null, 2)
  );
  console.log(`\n📝 Conversion map saved to: scripts/conversion-map.json`);
}

main().catch(console.error);
