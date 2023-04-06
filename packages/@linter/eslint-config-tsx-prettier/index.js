module.exports = {
    "root": true,
    "extends": ["@amollo-lint/eslint-config-tsx-prettier"],
    "ignorePatterns": ["dist", "build"],
    "rules": {
        "no-console": ["error", { "allow": ["warn", "error"] }],
    },
    "globals": {
        "JSX": "readonly",
    },
};
