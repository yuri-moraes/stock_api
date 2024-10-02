module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended", // Se estiver usando TypeScript
    "plugin:prettier/recommended", // Integra Prettier com ESLint
  ],
  parser: "@babel/eslint-parser", // Ou "@typescript-eslint/parser" se estiver usando TypeScript
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "prettier"],
  rules: {
    "prettier/prettier": "error", // Exige que o código siga o Prettier
    // Adicione ou ajuste regras conforme necessário
  },
};
