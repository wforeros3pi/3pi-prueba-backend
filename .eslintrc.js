module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint'
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    './node_modules/standard/eslintrc.json'
  ],
  env: {
    jest: true
  },
  overrides: [
    {
      files: ['./*/**'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        semi: [2, 'always'],
        '@typescript-eslint/no-unused-vars': 'off',
        'no-use-before-define': 'off'
      }
    }
  ]
}
