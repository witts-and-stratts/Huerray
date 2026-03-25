import { BaseTranslator, shouldSkipTranslation, isImagePath, protectPlaceholders, hasTranslatableContent } from './base.js';

const BATCH_SIZE = 50; // Max strings per API call

/**
 * Backend API-based translator implementation
 */
class ApiTranslator extends BaseTranslator {
    constructor(config) {
        super(config);

        this.apiUrl = config.apiUrl || process.env.NEXT_PUBLIC_API_BASE_URL || 'https://backend.huerray.de/api/v1';
    }

    /**
     * Collects all unique translatable leaf strings from an object.
     * ICU placeholders are protected (%%N%% tokens) so the collected strings match
     * the cache keys used when handleTextTranslation calls translateText.
     */
    collectTranslatableStrings(obj) {
        const strings = new Set();
        const collect = (value) => {
            if (typeof value === 'string') {
                if (!isImagePath(value) && !shouldSkipTranslation(value)) {
                    const { template } = protectPlaceholders(value);
                    if (hasTranslatableContent(template)) {
                        strings.add(template);
                    }
                }
            } else if (Array.isArray(value)) {
                value.forEach(collect);
            } else if (typeof value === 'object' && value !== null) {
                Object.values(value).forEach(collect);
            }
        };
        collect(obj);
        return [...strings];
    }

    /**
     * Sends a batch of texts to the API in one request and populates the cache.
     */
    async translateBatch(texts, targetLang) {
        if (texts.length === 0) return;

        await this.translationSemaphore.acquire();
        try {
            const response = await fetch(`${this.apiUrl}/translation/translate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
                },
                body: JSON.stringify({
                    source_lang: 'EN',
                    target_lang: targetLang.code.toUpperCase(),
                    text: texts
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`API returned ${response.status}: ${errorText}`);
            }

            const data = await response.json();

            let translations;
            if (data?.data?.translations) {
                translations = data.data.translations;
            } else if (data?.translations) {
                translations = data.translations;
            } else {
                throw new Error('Unexpected API response format: ' + JSON.stringify(data));
            }

            texts.forEach((text, i) => {
                const cacheKey = `${targetLang.code}::${text}`;
                this.cache[cacheKey] = translations[i]?.text ?? text;
            });

        } catch (error) {
            console.error(`❌ Failed to batch translate to ${targetLang.name}:`, error.message);
            // Cache misses will fall back to original text in translateText
        } finally {
            this.translationSemaphore.release();
        }
    }

    /**
     * Overrides translateObject to batch-populate the cache before traversal.
     * This reduces N API calls to ceil(N / BATCH_SIZE) calls per object.
     */
    async translateObject(obj, targetLang) {
        const allStrings = this.collectTranslatableStrings(obj);
        const uncached = allStrings.filter(text => !this.cache[`${targetLang.code}::${text}`]);

        if (uncached.length > 0) {
            console.log(`  -> 📦 Batch translating ${uncached.length} strings (${allStrings.length - uncached.length} cached) in ${Math.ceil(uncached.length / BATCH_SIZE)} request(s)...`);
            for (let i = 0; i < uncached.length; i += BATCH_SIZE) {
                await this.translateBatch(uncached.slice(i, i + BATCH_SIZE), targetLang);
            }
        } else {
            console.log(`  -> ⚡ All ${allStrings.length} strings served from cache.`);
        }

        // All strings are now cached — traversal hits cache only
        return super.translateObject(obj, targetLang);
    }

    /**
     * Translates a single string — used as fallback by super.translateObject traversal.
     */
    async translateText(text, targetLang) {
        if (shouldSkipTranslation(text)) {
            return text;
        }

        const cacheKey = `${targetLang.code}::${text}`;
        if (this.cache[cacheKey]) {
            return this.cache[cacheKey];
        }

        // Fallback: single-string request (e.g. if batch failed for this string)
        await this.translationSemaphore.acquire();
        try {
            const response = await fetch(`${this.apiUrl}/translation/translate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
                },
                body: JSON.stringify({
                    source_lang: 'EN',
                    target_lang: targetLang.code.toUpperCase(),
                    text: [text]
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`API returned ${response.status}: ${errorText}`);
            }

            const data = await response.json();

            let result = text;
            if (data?.data?.translations && data.data.translations.length > 0) {
                result = data.data.translations[0].text;
            } else if (data?.translations && data.translations.length > 0) {
                result = data.translations[0].text;
            } else {
                throw new Error('Unexpected API response format: ' + JSON.stringify(data));
            }

            this.cache[cacheKey] = result;
            return result;

        } catch (error) {
            console.error(`❌ Failed to translate "${text}" to ${targetLang.name}:`, error.message);
            return text;
        } finally {
            this.translationSemaphore.release();
        }
    }
}

export default ApiTranslator;
