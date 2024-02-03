module.exports = {
	root: true,
	env: {
	  node: true,
	},
	extends: [
	  'eslint:recommended',
	  'plugin:@typescript-eslint/recommended',
	  'plugin:vue/vue3-recommended',
	],
	parser: 'vue-eslint-parser',
	parserOptions: {
	  parser: '@typescript-eslint/parser',
	  ecmaVersion: 2020,
	  sourceType: 'module',
	  project: './tsconfig.json',
	  createDefaultProgram: true,
	},
	plugins: [
	  '@typescript-eslint',
	],
	rules: {
		"indent": ["error", "tab"],
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		"@typescript-eslint/no-explicit-any": "off"
	},
  };
  