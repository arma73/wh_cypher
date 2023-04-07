import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { merge } from "webpack-merge";
import { commonConf } from "./common";
import { WSExtPaths, WSPaths } from "../paths";

import type { Configuration } from "webpack";

const conf: Configuration = {
    mode: "production",
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
            {
                "test": /\.(ttf|eot|woff|otf|woff2)(\?\S*)?$/,
                "type": "asset/resource",
                "generator": {
                    "filename": "assets/[hash][ext][query]",
                },
            },
            {
                "test": /\.(jpg|jpeg|png|ico)$/i,
                "type": "asset/resource",
            },
            {
                "test": /\.svg$/i,
                "type": "asset/resource",
                "exclude": [WSPaths.SVGR_ICONS],
                "generator": {
                    "filename": "assets/[name].[hash][ext][query]",
                },
            },
            {
                "test": /\.svg$/i,
                "use": ["@svgr/webpack"],
                "include": [WSPaths.SVGR_ICONS],
            },
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
        new HtmlWebpackPlugin({
            template: WSExtPaths.POPUP_MARKUP,
            chunks: ["popup"],
            filename: "popup.html",
            inject: true,
        }),
        new CopyWebpackPlugin({
            patterns: [{ from: "public/*", to: "[name][ext]" }],
        }),
    ],
};

export const prodConf = merge(commonConf, conf);
