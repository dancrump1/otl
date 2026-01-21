module.exports = {
	env: { browser: true, es2020: true },
	extends: ["next/core-web-vitals", "next/typescript", "prettier"],
	ignorePatterns: ["dist", ".eslintrc.cjs"],
	parser: "@typescript-eslint/parser",
	plugins: ["react-refresh"],
	settings: {
		next: {
			rootDir: "packages/app/",
		},
	},
	rules: {
		"react-refresh/only-export-components": [
			"warn",
			{ allowConstantExport: true },
		],
	},
};
