import dotenv from "dotenv";
dotenv.config({ path: [".env.local", ".env"] });
import ApiTranslator from "./translation/api-translator.js";

// --- CONFIGURATION ---
const SOURCE_DIR = "./locales/en";
const TARGET_DIR = "./locales";
const PROJECT_ROOT = "./"; // Root directory for checking image files

const TARGET_LANGS = [
  { code: "fr", name: "French" },
  { code: "es", name: "Spanish" },
  { code: "de", name: "German" },
];

// Limit concurrent calls to the API to avoid rate limits.
const MAX_CONCURRENT_TRANSLATIONS = 5;

/**
 * Factory function to create the translator
 */
function createTranslator() {
  const config = {
    sourceDir: SOURCE_DIR,
    targetDir: TARGET_DIR,
    targetLangs: TARGET_LANGS,
    maxConcurrentTranslations: MAX_CONCURRENT_TRANSLATIONS,
    projectRoot: PROJECT_ROOT,
    cachePath: "./translation-cache-api.json",
  };

  return new ApiTranslator(config);
}

/**
 * Main function to run the translation process
 */
async function main() {
  console.log(`🚀 Starting translation process using Backend API...`);

  try {
    // Create and initialize the appropriate translator
    const translator = createTranslator();
    await translator.initialize();

    // Run the translation process
    await translator.processFiles();

    console.log(`\n🎉 Translation process completed successfully!`);
  } catch (err) {
    console.error("\n❌ An unrecoverable error occurred:", err.message);
    if (err.stack) {
      console.error(err.stack);
    }
    process.exit(1);
  }
}

// Run the main function
main();
