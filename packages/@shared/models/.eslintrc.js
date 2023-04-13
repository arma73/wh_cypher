module.exports = {
    extends: "@linter/eslint-config-ts-prettier",
    parserOptions: {
        project: "tsconfig.json",
        tsconfigRootDir: __dirname,
    },
    globals: {
        chrome: "readonly",
        SECRET_KEY: "readonly",
    },
    rules: {
        "max-lines": ["error", 150],
    },
};
