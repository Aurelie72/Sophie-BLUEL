import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: globals.browser,
    },
  },

  // 👉 Configuration spéciale pour ton backend Node.js
  {
    files: ["Backend/**/*.js"],
    languageOptions: {
      globals: globals.node,
    },
  },
]);