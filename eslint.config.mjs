import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      // Ignore auto-generated API files
      "scripts/lib/api/generated/**",
      // Ignore Node.js utility scripts
      "scripts/**/*.js",
    ],
  },
  {
    // Global rule overrides
    rules: {
      // TanStack Form uses the children prop pattern extensively
      // This is a required pattern for the library's render prop approach
      "react/no-children-prop": "off",
      
      // The project uses `any` types in many places for complex form handling,
      // API response mapping, and generated SDK compatibility.
      // Set to warn to allow builds while highlighting areas for future cleanup.
      "@typescript-eslint/no-explicit-any": "warn",
      
      // Memo'd components and arrow functions may not have display names
      // This is common in the codebase for file-scoped helper components
      "react/display-name": "warn",
    },
  },
];

export default eslintConfig;

