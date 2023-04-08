import defaultTheme from "tailwindcss/defaultTheme";

import type { Config } from "tailwindcss";

const config: Omit<Config, "content"> = {
    theme: {
        extend: {
            fontFamily: {
                sans: ["Matter", ...defaultTheme.fontFamily.sans],
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};

export default config;
