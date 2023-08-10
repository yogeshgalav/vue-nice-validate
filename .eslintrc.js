
module.exports = {	
	root: true,
	env: {
      	node: true,
	},
	extends: [
		"plugin:vue/strongly-recommended",
		"eslint:recommended",
	],
	parserOptions: {
      	parser: "@babel/eslint-parser",
		requireConfigFile: false,
	},
	rules: {
    	"no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
      	"no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
      	"no-mixed-spaces-and-tabs": "off",
      	"vue/multi-word-component-names": "off",
      	"indent": ["error", "tab"],
		"no-unused-vars": "off"
	},
};
