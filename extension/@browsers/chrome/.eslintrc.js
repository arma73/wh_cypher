module.exports = {
    extends: "@linter/eslint-config-tsx-prettier",
    parserOptions: {
        project: "tsconfig.json",
        tsconfigRootDir: __dirname,
    },
    globals: {
        chrome: "readonly",
        SECRET_KEY: "readonly",
    },
};
