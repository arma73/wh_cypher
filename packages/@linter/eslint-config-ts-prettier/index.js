module.exports = {
    "root": true,
    "extends": ["@amollo-lint/eslint-config-ts-prettier"],
    "ignorePatterns": ["dist", "build"],
    "rules": {
        "no-console": ["error", { "allow": ["warn", "error"] }],
    },
};
