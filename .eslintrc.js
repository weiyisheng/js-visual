module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'plugin:react/recommended',
		'airbnb',
		'plugin:prettier/recommended',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react', '@typescript-eslint'],
	rules: {
		'react/jsx-filename-extension': [
			1,
			{ extensions: ['.js', '.jsx', '.tsx'] },
		],
		'import/extensions': [0, 'never'],
		'import/no-unresolved': [0, {}],
		'react/forbid-prop-types': [1, { forbid: ['any'] }],
		'react/prop-types': [1],
		'no-debugger': [1],
		'import/prefer-default-export': [0],
		'no-unused-vars': [1],
		'no-underscore-dangle': [0],
		'no-restricted-syntax': [1],
	},
};
