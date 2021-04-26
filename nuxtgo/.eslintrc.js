module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
  ],
  plugins: [],
  // add your custom rules here
  rules: {
    'no-console': 'off',
    'no-unused-vars': 'warn',
    'no-unused-expressions': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
  },
}
