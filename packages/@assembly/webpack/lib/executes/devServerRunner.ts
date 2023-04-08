import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";
import { WSPaths } from "../paths/ws";
import { devConfig } from "../configs/development";

import type { Entry } from "webpack";
import type { Configuration } from "webpack-dev-server";

export const PORT = process.env.PORT || 3000;
const ignoreHotReloadPaths = ["bg", "content"];

/**
 * Modify webpack entry configuration for the development server by adding hot reloading.
 * @param entry - The webpack entry configuration.
 * @returns The modified webpack entry configuration.
 */
const modifyEntryConfig = (entry: Entry): Entry => {
    if (!entry) {
        console.warn("No entry configuration found for development server.");
        return entry;
    }

    const hotEntry = [
        "webpack/hot/dev-server",
        `webpack-dev-server/client?hot=true&hostname=localhost&port=${PORT}`,
    ];

    const modifiedEntry = Object.entries(entry).map(([entryName, path]) => {
        if (ignoreHotReloadPaths.includes(entryName)) {
            return [entryName, path];
        }

        return [entryName, [...hotEntry, path]];
    });

    return Object.fromEntries(modifiedEntry);
};

export const devServerRunner = async () => {
    if (!devConfig.entry) {
        console.warn("No entry configuration found for development server.");
        return;
    }

    const entry = modifyEntryConfig(devConfig.entry);
    const compiler = webpack({ ...devConfig, entry });
    const serverConfig: Configuration = {
        https: false,
        hot: true,
        liveReload: false,
        client: {
            webSocketTransport: "sockjs",
        },
        webSocketServer: "sockjs",
        host: "localhost",
        port: PORT,
        static: {
            directory: WSPaths.OUTPUT_DEV,
        },
        devMiddleware: {
            publicPath: `http://localhost:${PORT}/`,
            writeToDisk: true,
        },
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        allowedHosts: "all",
    };

    const server = new WebpackDevServer(serverConfig, compiler);
    await server.start();
};
