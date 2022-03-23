module.exports = {
    parser: "@typescript-eslint/parser",
    extends: [
        "plugin:@typescript-eslint/recommended",
        "react-app",
        "react-app/jest",
        "plugin:prettier/recommended",
        "plugin:react-hooks/recommended",
    ],
    plugins: ["@typescript-eslint", "react"],
    rules: {
        "prettier/prettier": ["error", { tabWidth: 4, trailingComma: "all" }],
    },
};
