const baseConfig = require("@config/tailwind").default;

module.exports = {
    ...baseConfig,
    content: ["./src/**/*.+(tsx|html)"],
};
