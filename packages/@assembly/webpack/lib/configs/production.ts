import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { merge } from "webpack-merge";
import { WSPaths } from "../paths";
import { commonConf } from "./common";

import type { Configuration } from "webpack";

const conf: Configuration = {
    mode: "production",
    devtool: false,
    output: {
        path: WSPaths.OUTPUT_BUILD,
        filename: "[name].js",
        publicPath: "/",
        chunkFilename: "[name].[chunkhash:8].chunk.js",
        assetModuleFilename: "assets/[name].[contenthash:8][ext][query]",
        clean: true,
    },
    module: {
        rules: [
            {
                "test": /\.css$/,
                "use": [
                    {
                        "loader": MiniCssExtractPlugin.loader,
                        "options": {
                            "esModule": true,
                        },
                    },
                    "css-loader",
                    "postcss-loader",
                ],
                "sideEffects": true,
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash:8].css",
        }),
    ],
};

export const prodConf = merge(commonConf, conf);
