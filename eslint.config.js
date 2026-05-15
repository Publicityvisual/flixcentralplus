import pluginJs from '@eslint/js'
import globals from 'globals'

export default [
  { languageOptions: { globals: globals.browser, ecmaVersion: 2022, sourceType: 'module' } },
  pluginJs.configs.recommended,
  {
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
      'no-undef': 'off',
    },
  },
]
