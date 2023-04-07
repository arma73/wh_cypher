import type { Plugin, Transformer, TransformCallback } from "postcss";

function rem(px: number) {
    return `${px * 0.0625}rem`;
}

const postcssProcessEnv: Plugin = require("postcss-preset-env")({
    autoprefixer: {
        flexbox: "no-2009",
    },
    stage: 3,
    features: {
        "custom-properties": false,
    },
});
const tailwindNesting: Plugin = require("tailwindcss/nesting");
const tailwind: Plugin = require("tailwindcss");
const autoprefixer: Plugin = require("autoprefixer");
const postcssImport: Plugin = require("postcss-import");
const postcssFunctions: Plugin = require("postcss-functions")({
    functions: {
        rem,
    },
});

const plugins: Array<Plugin | Transformer | TransformCallback> = [
    postcssProcessEnv,
    tailwindNesting,
    tailwind,
    autoprefixer,
    postcssImport,
    postcssFunctions,
];

export default {
    plugins,
};
