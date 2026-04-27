import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import reactX from "@eslint-react/eslint-plugin";
import reactHooksPlugin from "eslint-plugin-react-hooks";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  reactX.configs.recommended,
  {
    plugins: {
      "react-hooks": reactHooksPlugin,
    },
    rules: {
      ...reactHooksPlugin.configs.recommended.rules,
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/immutability": "off",
      "@eslint-react/set-state-in-effect": "off",
      "@eslint-react/no-array-index-key": "off",
    },
  },
  {
    ignores: [".next/**", "node_modules/**"],
  },
);
