import { eslint } from '@siberiacancode/eslint'
import pluginQuery from '@tanstack/eslint-plugin-query'
import pluginRouter from '@tanstack/eslint-plugin-router'
import prettierRecommended from 'eslint-plugin-prettier/recommended'

export default eslint({
  typescript: true,
  react: true,
  jsx: true,
  jsxA11y: true,
  rules: {
    'es-tooling/no-axios': 'off',
    'siberiacancode/function-component-definition': [
      'error',
      { namedComponents: 'function-declaration' }
    ]
  }
})
  .append({ ignores: ['src/routeTree.gen.ts'] })
  .append(...pluginQuery.configs['flat/recommended'])
  .append(...pluginRouter.configs['flat/recommended'])
  .append({
    files: ['**/*.json', '**/*.jsonc'],
    rules: {
      'unicorn/no-typeof-undefined': 'off',
      'unicorn/no-useless-spread': 'off'
    }
  })
  .append(prettierRecommended)
  .append({
    files: ['src/routes/**/*.tsx', 'src/**/route.tsx'],
    ignores: ['src/routes/**/-components/**/*.tsx', 'src/routes/**/-layout/**/*.tsx'],
    rules: {
      'siberiacancode/function-component-definition': [
        'error',
        { namedComponents: 'function-declaration' }
      ]
    }
  })
