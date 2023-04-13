import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import TSConfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import env from "../env";
import { WSPaths, WSExtPaths } from "../paths";
import { EXT_WINDOW_HEIGHT, EXT_WINDOW_WIDTH } from "../consts";

import type { Configuration } from "webpack";

export const commonConf: Configuration = {
    name: "extension",
    target: "web",
    entry: {
        bg: WSExtPaths.BG_SCRIPT,
        content: WSExtPaths.CONTENT_SCRIPT,
        popup: WSExtPaths.POPUP,
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
    plugins: [
        new webpack.ProgressPlugin(),
        new webpack.DefinePlugin({
            "SECRET_KEY": JSON.stringify(env.SECRET_KEY),
            EXT_WINDOW_HEIGHT,
            EXT_WINDOW_WIDTH,
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
