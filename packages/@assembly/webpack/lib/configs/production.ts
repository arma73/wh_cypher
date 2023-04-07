import TSConfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import { WSExtPaths, WSPaths } from "../paths";

import type { Configuration } from "webpack";

export const prodConf: Configuration = {
    mode: "production",
    name: "extension",
    target: "web",
    devtool: false,
    entry: {
        bg: WSExtPaths.BG_SCRIPT,
        content: WSExtPaths.CONTENT_SCRIPT,
        popup: WSExtPaths.POPUP,
    },
    output: {
        path: WSPaths.OUTPUT,
        filename: "[name].js",
        publicPath: "/",
        chunkFilename: "[name].[chunkhash:8].chunk.js",
        assetModuleFilename: "assets/[name].[contenthash:8][ext][query]",
        clean: true,
    },
    module: {
        rules: [
            {
                "test": /\.(ts)x?$/,
                "use": "ts-loader",
                "exclude": /node_modules/,
            },
            {
                "test": /\.(js)x?$/,
                "exclude": /node_modules/,
                "use": "babel-loader",
            },
        ],
    },
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
