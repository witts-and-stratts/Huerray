import fs from 'fs/promises';
import path from 'path';
import 'dotenv/config';

// --- UTILITIES ---

/**
 * A simple semaphore to limit concurrency for async tasks.
 */
class Semaphore {
    constructor(maxConcurrent) {
        this.max = maxConcurrent;
        this.current = 0;
        this.queue = [];
    }

    async acquire() {
        if (this.current < this.max) {
            this.current++;
            return Promise.resolve();
        }
        return new Promise((resolve) => {
            this.queue.push(resolve);
        });
    }

    release() {
        this.current--;
        if (this.queue.length > 0) {
            this.current++;
            const next = this.queue.shift();
            if (next) {
                next();
            }
        }
    }
}

/**
 * Extracts ICU placeholders from text, replacing them with numbered tokens (%%N%%).
 * Handles nested braces (e.g. {count, plural, =1 {# gig} other {# gigs}}).
 * Returns { template, placeholders } where template has %%0%%, %%1%%, etc.
 */
function protectPlaceholders(text) {
    const placeholders = [];
    let result = '';
    let i = 0;

    while (i < text.length) {
        if (text[i] === '{') {
            let depth = 0;
            const start = i;
            while (i < text.length) {
                if (text[i] === '{') depth++;
                else if (text[i] === '}') {
                    depth--;
                    if (depth === 0) { i++; break; }
                }
                i++;
            }
            result += `%%${placeholders.length}%%`;
            placeholders.push(text.slice(start, i));
        } else {
            result += text[i++];
        }
    }

    return { template: result, placeholders };
}

/**
 * Restores protected %%N%% tokens back to their original ICU placeholders.
 */
function restorePlaceholders(text, placeholders) {
    return placeholders.reduce(
        (str, placeholder, i) => str.replace(new RegExp(`%%\\s*${i}\\s*%%`, 'g'), placeholder),
        text
    );
}

/**
 * Returns true if a protected template has translatable text beyond placeholder tokens.
 */
function hasTranslatableContent(template) {
    return template.replace(/%%\d+%%/g, '').trim() !== '';
}

/**
 * Determines if a string should be skipped from translation.
 */
function shouldSkipTranslation(text) {
    if (typeof text !== 'string' || text.trim() === '') return true;

    // Regex for URLs, file paths, or special placeholders
    const skipPatterns = [
        /^https?:\/\//i, // Full URLs
        /^\/|^\.\/|^\.\.\/|^#/, // Relative paths, anchors
        /\.(json|png|jpg|jpeg|svg|gif|webp|css|js|pdf|doc[x]?|xls[x]?)$/i, // File extensions
        /^{{.*}}$/, // Placeholders like {{variable}}
        /^<[^>]+>$/, // Simple HTML-like tags
        /^\-?\d+(\.\d+)?%?$/, // Numbers, percentages
        /^[\$€£¥¢₹₽₿]/, // Currency symbols
        /^[A-Z0-9_]+$/, // All caps constants like MY_VARIABLE
    ];

    return skipPatterns.some(pattern => pattern.test(text.trim()));
}

/**
 * Checks if a string is an image file path
 */
function isImagePath(text) {
    if (typeof text !== 'string') return false;

    const imageExtensions = /\.(png|jpg|jpeg|svg|gif|webp)$/i;
    return imageExtensions.test(text.trim());
}

/**
 * Generates the translated image path with language suffix
 * Example: /images/elsa.png -> /images/elsa-de.png
 */
function getTranslatedImagePath(imagePath, langCode) {
    const parsedPath = path.parse(imagePath);
    const translatedName = `${parsedPath.name}-${langCode}${parsedPath.ext}`;
    return path.join(parsedPath.dir, translatedName).replace(/\\/g, '/'); // Ensure forward slashes
}

/**
 * Checks if a translated image file exists
 * This function checks relative to the project root and common image directories
 */
async function translatedImageExists(imagePath, langCode, projectRoot = './') {
    const translatedPath = getTranslatedImagePath(imagePath, langCode);

    // Common paths to check for images
    const pathsToCheck = [
        path.join(projectRoot, translatedPath),
        path.join(projectRoot, 'src', translatedPath),
        path.join(projectRoot, 'public', translatedPath),
        path.join(projectRoot, 'assets', translatedPath),
    ];

    // Remove leading slash and check relative paths too
    const relativePath = translatedPath.startsWith('/') ? translatedPath.slice(1) : translatedPath;
    pathsToCheck.push(
        path.join(projectRoot, relativePath),
        path.join(projectRoot, 'src', relativePath),
        path.join(projectRoot, 'public', relativePath),
        path.join(projectRoot, 'assets', relativePath)
    );

    for (const checkPath of pathsToCheck) {
        try {
            await fs.access(checkPath);
            console.log(`  -> 🖼️ Found translated image: ${checkPath}`);
            return true;
        } catch (error) {
            // File doesn't exist, continue checking
        }
    }

    return false;
}

/**
 * Wraps an async function with an exponential backoff retry mechanism.
 */
async function withRetry(fn, retries = 5, initialDelay = 1000) {
    let lastError;
    for (let i = 0; i < retries; i++) {
        try {
            return await fn();
        } catch (err) {
            lastError = err;
            if (err.status === 429) {
                const delay = initialDelay * Math.pow(2, i);
                console.warn(`⚠️ Rate limited. Retrying in ${delay / 1000}s...`);
                await new Promise(resolve => setTimeout(resolve, delay));
            } else {
                // For other errors, log and attempt a quicker retry
                console.warn(`⚠️ API Error occurred, retrying... (${i + 1}/${retries})`);
                await new Promise(resolve => setTimeout(resolve, initialDelay));
            }
        }
    }
    throw new Error(`❌ Max retries exceeded. Last error: ${lastError.message}`);
}

// --- FILE HANDLING ---

/**
 * Recursively finds all JSON files in a directory.
 */
async function getAllJsonFiles(dir) {
    try {
        const entries = await fs.readdir(dir, { withFileTypes: true });
        const filePaths = await Promise.all(
            entries.map(async (entry) => {
                const fullPath = path.join(dir, entry.name);
                if (entry.isDirectory()) {
                    return getAllJsonFiles(fullPath);
                } else if (entry.isFile() && entry.name.endsWith('.json')) {
                    return fullPath;
                }
                return [];
            })
        );
        return filePaths.flat().filter(filePath => filePath); // Filter out empty arrays
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.warn(`⚠️ Source directory ${dir} not found.`);
            return [];
        }
        throw error;
    }
}

/**
 * Loads the translation cache from disk.
 */
async function loadCache(cachePath) {
    try {
        const data = await fs.readFile(cachePath, 'utf8');
        const cache = JSON.parse(data);
        console.log(`🧠 Loaded ${Object.keys(cache).length} entries from cache (${cachePath}).`);
        return cache;
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log(`ℹ️ No cache file found at ${cachePath}. Starting fresh.`);
        } else {
            console.error('❌ Error loading cache:', error);
        }
        return {};
    }
}

/**
 * Saves the translation cache to disk.
 */
async function saveCache(cache, cachePath) {
    if (Object.keys(cache).length === 0) {
        console.log('ℹ️ No new translations to save to cache.');
        return;
    }
    try {
        await fs.mkdir(path.dirname(cachePath), { recursive: true }); // Ensure directory exists
        await fs.writeFile(cachePath, JSON.stringify(cache, null, 2), 'utf8');
        console.log(`💾 Saved ${Object.keys(cache).length} entries to translation cache (${cachePath}).`);
    } catch (error) {
        console.error('❌ Error saving cache:', error.message);
    }
}

/**
 * Base class for translators
 */
class BaseTranslator {
    constructor(config) {
        this.sourceDir = config.sourceDir || './src/locales/en';
        this.targetDir = config.targetDir || './src/locales';
        this.cachePath = config.cachePath || './translation-cache.json';
        this.targetLangs = config.targetLangs || [];
        this.maxConcurrentTranslations = config.maxConcurrentTranslations || 5;
        this.translationSemaphore = new Semaphore(this.maxConcurrentTranslations);
        this.cache = {};
        this.projectRoot = config.projectRoot || './';
    }

    async initialize() {
        this.cache = await loadCache(this.cachePath);
    }

    async translateText(text, targetLang) {
        throw new Error('translateText method must be implemented by subclasses');
    }

    /**
     * Handles translation of text, with special logic for image paths and ICU placeholders.
     * ICU placeholders like {value} or {count, plural, ...} are protected before translation
     * and restored afterwards so their names are never altered by the translation API.
     */
    async handleTextTranslation(text, targetLang) {
        // Check if this is an image path
        if (isImagePath(text)) {
            const translatedImagePath = getTranslatedImagePath(text, targetLang.code);
            const imageExists = await translatedImageExists(text, targetLang.code, this.projectRoot);

            if (imageExists) {
                console.log(`  -> 🖼️ Using translated image path: ${text} -> ${translatedImagePath}`);
                return translatedImagePath;
            } else {
                console.log(`  -> 🖼️ No translated image found for ${text}, keeping original`);
                return text; // Keep original if translated version doesn't exist
            }
        }

        const { template, placeholders } = protectPlaceholders(text);

        // String is purely placeholders with no text to translate — return as-is
        if (placeholders.length > 0 && !hasTranslatableContent(template)) {
            return text;
        }

        const textToTranslate = placeholders.length > 0 ? template : text;
        const translated = await this.translateText(textToTranslate, targetLang);
        return placeholders.length > 0 ? restorePlaceholders(translated, placeholders) : translated;
    }

    /**
     * Recursively traverses a JSON object or array and translates all string values.
     */
    async translateObject(obj, targetLang) {
        if (typeof obj === 'string') {
            return await this.handleTextTranslation(obj, targetLang);
        }

        if (Array.isArray(obj)) {
            // Process array items sequentially to better manage concurrency
            const translatedArray = [];
            for (const item of obj) {
                translatedArray.push(await this.translateObject(item, targetLang));
            }
            return translatedArray;
        }

        if (typeof obj === 'object' && obj !== null) {
            const newObj = {};
            const keys = Object.keys(obj);
            // Process object keys sequentially
            for (const key of keys) {
                newObj[key] = await this.translateObject(obj[key], targetLang);
            }
            return newObj;
        }

        return obj; // Return numbers, booleans, null as is
    }

    async processFiles() {
        const sourceFiles = await getAllJsonFiles(this.sourceDir);
        if (sourceFiles.length === 0) {
            console.log(`⚠️ No JSON files found in ${this.sourceDir}. Exiting.`);
            return;
        }

        console.log(`📁 Found ${sourceFiles.length} source file(s) to translate into ${this.targetLangs.length} languages.`);
        console.log(`⚡ Limiting to ${this.maxConcurrentTranslations} concurrent translation operations.`);

        const totalStartTime = Date.now();
        let filesProcessed = 0;
        let filesFailed = 0;

        for (const filePath of sourceFiles) {
            const relativePath = path.relative(this.sourceDir, filePath);
            console.log(`\n📄 Processing source file: ${relativePath}`);

            try {
                const fileContent = await fs.readFile(filePath, 'utf8');
                const data = JSON.parse(fileContent);

                const languageTasks = this.targetLangs.map(async (lang) => {
                    const langStartTime = Date.now();
                    console.log(`  -> 🌍 Translating to ${lang.name} (${lang.code})...`);

                    const translatedData = await this.translateObject(data, lang);

                    const outPath = path.join(this.targetDir, lang.code, relativePath);
                    await fs.mkdir(path.dirname(outPath), { recursive: true });

                    await fs.writeFile(outPath, JSON.stringify(translatedData, null, 2), 'utf8');
                    const langDuration = ((Date.now() - langStartTime) / 1000).toFixed(1);
                    console.log(`  -> ✅ ${lang.name} (${lang.code}) translation written to: ${outPath} (took ${langDuration}s)`);
                });

                await Promise.all(languageTasks);
                filesProcessed++;

            } catch (error) {
                filesFailed++;
                console.error(`❌ Failed to process file ${filePath}:`, error.message);
                // Continue with other files unless it's a critical error
            }
        }

        await saveCache(this.cache, this.cachePath);
        const totalDuration = ((Date.now() - totalStartTime) / 1000).toFixed(1);
        console.log(`\n🎉 Translation process completed in ${totalDuration}s.`);
        console.log(`📊 Files processed: ${filesProcessed}, Files failed: ${filesFailed}.`);
    }
}

export {
    Semaphore,
    shouldSkipTranslation,
    withRetry,
    getAllJsonFiles,
    loadCache,
    saveCache,
    BaseTranslator,
    isImagePath,
    getTranslatedImagePath,
    translatedImageExists,
    protectPlaceholders,
    restorePlaceholders,
    hasTranslatableContent
};