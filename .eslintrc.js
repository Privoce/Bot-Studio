module.exports = {
  plugins: ['react', 'react-hooks', 'prettier'],
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:react/jsx-runtime',
    'plugin:@next/next/recommended',
    'prettier',
  ],
  rules: {
    '@next/next/no-img-element': 'off',
    'comma-dangle': 'off',
    'consistent-return': 'off',
    'import/prefer-default-export': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'max-classes-per-file': 'off',
    'no-bitwise': 'off',
    'no-console': 'off',
    'no-continue': 'off',
    'no-plusplus': 'off',
    'no-param-reassign': [
      'error',
      { props: true, ignorePropertyModificationsFor: ['state', 'pages', 'page', 'entities'] },
    ],
    radix: ['error', 'as-needed'],
    'react/require-default-props': 'off',
    'react/function-component-definition': [
      'error',
      { namedComponents: ['function-declaration', 'arrow-function'] },
    ],
    'react/jsx-props-no-spreading': 'off',
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      plugins: ['@typescript-eslint'],
      extends: ['airbnb-typescript', 'prettier'],
      parser: '@typescript-eslint/parser',
      parserOptions: { project: ['./tsconfig.json'] },
      rules: {
        '@typescript-eslint/comma-dangle': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
  ],
};
