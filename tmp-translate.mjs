import fs from 'fs/promises';
import path from 'path';

const GOOGLE_TRANSLATE_URL = 'https://translate.googleapis.com/translate_a/single?client=gtx&dt=t';

async function translateText(text, targetLang) {
  if (!text || typeof text !== 'string' || text.trim() === '') return text;

  // Protect variables like {role} by converting them to <span class="v" id="role"></span>
  let protectedText = text.replace(/\{([^}]+)\}/g, '<span class="v" id="$1"></span>');

  try {
    const url = `${GOOGLE_TRANSLATE_URL}&sl=en&tl=${targetLang}&q=${encodeURIComponent(protectedText)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    let translated = data[0].map(item => item[0]).join('');

    // Restore variables
    translated = translated.replace(/<span class="v" id="([^"]+)"><\/span>/gi, '{$1}');
    // Fix any potential spaces added by translation around variables
    translated = translated.replace(/\{\s+([^}]+)\s+\}/g, '{$1}');
    return translated;
  } catch (err) {
    console.warn(`Translation failed for: "${text}" to ${targetLang}. Using original. Error: ${err.message}`);
    return text;
  }
}

async function translateObj(obj, targetLang, delay = 100) {
  if (typeof obj === 'string') {
    await new Promise(r => setTimeout(r, delay));
    return await translateText(obj, targetLang);
  } else if (Array.isArray(obj)) {
    const newArr = [];
    for (const item of obj) {
      newArr.push(await translateObj(item, targetLang, delay));
    }
    return newArr;
  } else if (typeof obj === 'object' && obj !== null) {
    const newObj = {};
    for (const [key, value] of Object.entries(obj)) {
      newObj[key] = await translateObj(value, targetLang, delay);
    }
    return newObj;
  }
  return obj; // numbers, booleans, null
}

async function processFile(srcPath, destPath, targetLang) {
  console.log(`Translating ${srcPath} to ${targetLang}...`);
  try {
    let content = await fs.readFile(srcPath, 'utf-8');
    const json = JSON.parse(content);
    
    // speed up translation request spacing
    const translatedObj = await translateObj(json, targetLang, 30);
    await fs.writeFile(destPath, JSON.stringify(translatedObj, null, 2), 'utf-8');
  } catch (err) {
    console.error(`Error processing ${srcPath}:`, err);
  }
}

async function processDirectory(srcDir, destDir, targetLang, filePromises = []) {
  const entries = await fs.readdir(srcDir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.name === '.DS_Store' || entry.name.endsWith('.js') || entry.name.endsWith('.md')) continue;

    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);

    if (entry.isDirectory()) {
      await fs.mkdir(destPath, { recursive: true });
      await processDirectory(srcPath, destPath, targetLang, filePromises);
    } else if (entry.isFile() && entry.name.endsWith('.json')) {
      filePromises.push(processFile(srcPath, destPath, targetLang));
    }
  }
}

async function main() {
  const localesPath = path.resolve('./locales');
  const enPath = path.join(localesPath, 'en');
  const targetLangs = ['de', 'es', 'fr'];
  
  console.log(`Starting massive translation from ${enPath}...`);

  for (const lang of targetLangs) {
    const destPath = path.join(localesPath, lang);
    await fs.mkdir(destPath, { recursive: true });
    const promises = [];
    await processDirectory(enPath, destPath, lang, promises);
    // process up to 3 files parallel at a time to not spam google too much
    for (let i = 0; i < promises.length; i += 3) {
      const chunk = promises.slice(i, i + 3);
      await Promise.all(chunk);
    }
  }
  console.log('All translations finished!');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
