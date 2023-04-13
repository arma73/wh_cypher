import defaultTheme from "tailwindcss/defaultTheme";
import { EXT_WINDOW_HEIGHT, EXT_WINDOW_WIDTH } from "@assembly/webpack";

import type { Config } from "tailwindcss";

const config: Omit<Config, "content"> = {
    theme: {
        extend: {
            width: {
                "ext": `${EXT_WINDOW_WIDTH}px`,
            },
            height: {
                "ext": `${EXT_WINDOW_HEIGHT}px`,
            },
            colors: {
                theme: {
                    bg: "#333333",
                    danger: "#eb876c",
                    dangerHighlight: "#e46f4f",
                    bgHover: "rgba(255, 255, 255, 0.12)",
                    linesPrimary: "rgba(255, 197, 92, 0.5)",
                    textPrimary: "rgba(255, 255, 255, 0.84)",
                    textSecondary: "rgba(255, 255, 255, 0.6)",
                    linesLight: "rgba(255, 255, 255, 0.18)",
                    linesLighter: "rgba(255, 255, 255, 0.09)",
                },
                blue: {
                    accent: "#7295f6",
                },
            },
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
