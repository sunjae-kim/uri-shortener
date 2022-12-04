module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: ['vue', '@typescript-eslint'],
  extends: ['plugin:vue/essential', 'standard'],
  rules: {
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'vue/multi-word-component-names': 'off',
    'arrow-parens': [2, 'as-needed'],
    'comma-dangle': [2, 'always-multiline'],
  },
  ignorePatterns: ['node_modules/**/*'],
}
