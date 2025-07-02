import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.js"],
    languageOptions: { ecmaVersion: "latest" },
  },
  tseslint.configs.recommended,
]);
