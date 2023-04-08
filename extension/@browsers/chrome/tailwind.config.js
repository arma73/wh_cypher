const { join } = require("path");
const baseConfig = require("@config/tailwind").default;

const fromRoot = p => join(__dirname, "..", "..", "..", p);

module.exports = {
    ...baseConfig,
    content: [
        "src/**/*.+(tsx|html)",
        fromRoot("packages/@shared/ui/lib/**/*.+(js|jsx|ts|tsx)"),
    ],
};
