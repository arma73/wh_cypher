import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import { WSPaths } from "../paths/ws";
import { merge } from "webpack-merge";
import { commonConf } from "./common";

import type { Configuration } from "webpack";

const config: Configuration = {
    mode: "development",
    devtool: "cheap-module-source-map",
    output: {
        path: WSPaths.OUTPUT_DEV,
        filename: "[name].js",
        publicPath: "/",
        clean: true,
    },
    module: {
        rules: [
            {
                "test": /\.css$/,
                "use": ["style-loader", "css-loader", "postcss-loader"],
                "sideEffects": true,
            },
        ],
    },
    plugins: [new ReactRefreshWebpackPlugin()],
};

export const devConfig = merge(commonConf, config);
