import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname, basename, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const MAX_SIZE = 2000;
const QUALITY = 85;

// Images to skip (SVGs, icons, etc.)
const SKIP_PATTERNS = ['.svg', 'favicon', 'apple-touch-icon', 'site.webmanifest'];

async function getAllFiles(dir, fileList = []) {
  const files = await readdir(dir);

  for (const file of files) {
    const filePath = join(dir, file);
    const fileStat = await stat(filePath);

    if (fileStat.isDirectory()) {
      await getAllFiles(filePath, fileList);
    } else {
      const ext = extname(file).toLowerCase();
      if (['.png', '.jpg', '.jpeg', '.webp'].includes(ext)) {
        // Check if file should be skipped
        const shouldSkip = SKIP_PATTERNS.some(pattern => file.includes(pattern));
        if (!shouldSkip) {
          fileList.push(filePath);
        }
      }
    }
  }

  return fileList;
}

async function convertImage(inputPath) {
  try {
    const ext = extname(inputPath);
    const baseName = basename(inputPath, ext);
    const dirName = dirname(inputPath);
    const outputPath = join(dirName, `${baseName}.jpg`);

    // Skip if already converted
    if (ext === '.jpg' && inputPath === outputPath) {
      console.log(`Skipping ${inputPath} (already .jpg)`);
      return;
    }

    const image = sharp(inputPath);
    const metadata = await image.metadata();

    // Calculate new dimensions if image is larger than MAX_SIZE
    let width = metadata.width;
    let height = metadata.height;

    if (width > MAX_SIZE || height > MAX_SIZE) {
      if (width > height) {
        height = Math.round((height / width) * MAX_SIZE);
        width = MAX_SIZE;
      } else {
        width = Math.round((width / height) * MAX_SIZE);
        height = MAX_SIZE;
      }
    }

    await image
      .resize(width, height, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .jpeg({ quality: QUALITY, progressive: true })
      .toFile(outputPath);

    console.log(`✓ Converted: ${inputPath} → ${outputPath} (${width}x${height})`);

    return { inputPath, outputPath, ext };
  } catch (error) {
    console.error(`✗ Error converting ${inputPath}:`, error.message);
    return null;
  }
}

async function main() {
  const publicDir = join(__dirname, '..', 'public', 'images');

  console.log('Finding images to convert...\n');
  const imageFiles = await getAllFiles(publicDir);

  console.log(`Found ${imageFiles.length} images to process\n`);

  const conversions = [];

  for (const file of imageFiles) {
    const result = await convertImage(file);
    if (result) {
      conversions.push(result);
    }
  }

  console.log(`\n✓ Converted ${conversions.length} images`);

  // Output file mappings for code updates
  console.log('\n--- File Mappings ---');
  conversions.forEach(({ inputPath, outputPath }) => {
    const oldExt = extname(inputPath);
    const oldName = basename(inputPath);
    const newName = basename(outputPath);
    if (oldName !== newName) {
      console.log(`${oldName} → ${newName}`);
    }
  });
}

main().catch(console.error);
