import * as deepl from 'deepl-node';
import { BaseTranslator, shouldSkipTranslation } from './base.js';

/**
 * DeepL-based translator implementation
 */
class DeepLTranslator extends BaseTranslator {
    constructor(config) {
        super(config);
        
        if (!config.apiKey) {
            throw new Error('DeepL API key is required');
        }
        
        this.translator = new deepl.Translator(config.apiKey);
        this.preserveFormatting = config.preserveFormatting !== false; // Default to true
    }

    /**
     * Validates the API key by making a small usage request
     */
    async initialize() {
        await super.initialize();
        
        try {
            await this.translator.getUsage();
            console.log('🔑 DeepL API key validated successfully.');
        } catch (error) {
            console.error('❌ Failed to initialize DeepL translator or validate API key:', error.message);
            if (error instanceof deepl.AuthorizationError) {
                console.error('ℹ️ Please ensure your DEEPL_API_KEY is correct and active.');
            }
            throw error;
        }
    }

    /**
     * Protects Mustache templates by replacing them with XML placeholder tags
     * This approach is more robust as translation services preserve XML/HTML tags
     * 
     * Example: "Hello {{name}}. You have {{count}} items!"
     * Becomes: "Hello <m id='0' />. You have <m id='1' /> items!"
     */
    protectMustacheTemplates(text) {
        const mustacheTags = [];
        let protectedText = text;
        let tagId = 0;
        
        // Find all Mustache patterns: {{variable}}, {{{variable}}}, {{#section}}, {{/section}}, etc.
        const mustacheRegex = /\{\{[^}]*\}\}/g;
        let match;
        
        // Reset regex lastIndex to ensure we capture all matches
        mustacheRegex.lastIndex = 0;
        
        while ((match = mustacheRegex.exec(text)) !== null) {
            const mustacheTag = match[0];
            const xmlPlaceholder = `<m id='${tagId}' />`;
            
            mustacheTags.push({
                id: tagId,
                xmlPlaceholder,
                originalTag: mustacheTag
            });
            
            // Replace first occurrence to handle duplicates correctly
            const index = protectedText.indexOf(mustacheTag);
            if (index !== -1) {
                protectedText = protectedText.substring(0, index) + 
                              xmlPlaceholder + 
                              protectedText.substring(index + mustacheTag.length);
            }
            
            tagId++;
        }
        
        return { protectedText, mustacheTags };
    }

    /**
     * Restores Mustache templates from XML placeholder tags
     * 
     * Example: "Hallo <m id='0' />. Sie haben <m id='1' /> Artikel!"
     * Becomes: "Hallo {{name}}. Sie haben {{count}} Artikel!"
     */
    restoreMustacheTemplates(text, mustacheTags) {
        let restoredText = text;
        
        // Sort by ID in descending order to avoid index shifting issues
        const sortedTags = mustacheTags.sort((a, b) => b.id - a.id);
        
        sortedTags.forEach(({ xmlPlaceholder, originalTag }) => {
            // Use global replace to handle all occurrences
            restoredText = restoredText.replace(new RegExp(this.escapeRegExp(xmlPlaceholder), 'g'), originalTag);
        });
        
        return restoredText;
    }

    /**
     * Escapes special regex characters in a string
     */
    escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    /**
     * Translates a single string of text using the DeepL API.
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
        let translatedText = text; // Default to original text
        
        try {
            // Protect Mustache templates with XML placeholders before translation
            const { protectedText, mustacheTags } = this.protectMustacheTemplates(text);
            
            const result = await this.translator.translateText(
                protectedText,
                null, // Source language: null for auto-detect
                targetLang.code,
                {
                    preserveFormatting: this.preserveFormatting,
                    // Enable XML tag handling for better preservation of our placeholder tags
                    tagHandling: 'xml',
                }
            );
            
            // Restore Mustache templates from XML placeholders in the translated text
            translatedText = this.restoreMustacheTemplates(result.text, mustacheTags);

            this.cache[cacheKey] = translatedText;

        } catch (error) {
            console.error(`❌ Failed to translate "${text.substring(0, 50)}..." to ${targetLang.code} using DeepL:`, error.message);
            
            if (error instanceof deepl.QuotaExceededError) {
                console.error(`🚫 DeepL Quota Exceeded for ${targetLang.code}. Further translations for this language might fail or be skipped.`);
            } else if (error instanceof deepl.AuthorizationError) {
                console.error(`🚫 DeepL Authorization Error. Please check your DEEPL_API_KEY.`);
                throw error; // Re-throw to halt execution
            } else if (error instanceof deepl.TooManyRequestsError) {
                console.warn(`⏳ DeepL Rate Limited (TooManyRequestsError) for "${text.substring(0,50)}..." to ${targetLang.code}. The library should retry. If this persists, reduce concurrency or check your DeepL plan.`);
            }
            // For other errors, deepl-node library might have already retried.
            
        } finally {
            this.translationSemaphore.release();
        }
        
        return translatedText;
    }
}

export default DeepLTranslator;