import TSConfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import { WSPaths } from "../paths";

import type { Configuration } from "webpack";

export const commonConf: Configuration = {
    name: "extension",
    target: "web",
    resolve: {
        mainFiles: ["index"],
        extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
        plugins: [
            new TSConfigPathsPlugin({
                configFile: "tsconfig.json",
                baseUrl: WSPaths.ROOT,
            }),
        ],
    },
};
