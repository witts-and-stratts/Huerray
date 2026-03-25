import { OpenAI } from 'openai';
import { BaseTranslator, shouldSkipTranslation } from './base.js';

/**
 * OpenAI-based translator implementation
 */
class OpenAITranslator extends BaseTranslator {
    constructor(config) {
        super(config);
        
        if (!config.apiKey) {
            throw new Error('OpenAI API key is required');
        }
        
        this.openai = new OpenAI({ apiKey: config.apiKey });
        this.model = config.model || 'gpt-4.1-2025-04-14';
        this.temperature = config.temperature || 0.3;
        this.maxTokens = config.maxTokens || 1500;
    }

    /**
     * Translates a single string of text using the OpenAI API.
     */
    async translateText(text, targetLang) {
        if (shouldSkipTranslation(text)) {
            return text;
        }

        const cacheKey = `${targetLang.code}::${text}`;
        if (this.cache[cacheKey]) {
            return this.cache[cacheKey];
        }

        await this.translationSemaphore.acquire();
        try {
            const prompt = `Translate the following text to ${targetLang.name}.

RULES:
- Return ONLY the translated text. Do not include prefixes or quotation marks.
- Preserve original formatting, placeholders like {variable}, {{variable}}, %%N%% tokens, and URLs or paths.

Original text: "${text}"`;

            const res = await this.openai.chat.completions.create({
                model: this.model,
                messages: [{ role: 'user', content: prompt }],
                temperature: this.temperature,
                max_tokens: this.maxTokens,
            });

            let result = res.choices[0]?.message?.content?.trim() || text;
            // Defensive cleaning to remove quotes the AI might add
            result = result.replace(/^["'"«]?(.*?)["'"»]?$/, '$1');

            this.cache[cacheKey] = result;
            return result;

        } catch (error) {
            console.error(`❌ Failed to translate "${text}" to ${targetLang.name}:`, error.message);
            return text; // Return original text on failure
        } finally {
            this.translationSemaphore.release();
        }
    }
}

export default OpenAITranslator;