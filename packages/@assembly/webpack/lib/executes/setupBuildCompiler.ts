import webpack from "webpack";
import { Log } from "@shared/auxiliaries";

import type { Configuration } from "webpack";

export const setupBuildCompiler = (config: Configuration) => {
    const compiler = webpack(config);

    compiler.run((error, stats): null | void => {
        if (error) {
            // error configuration
            console.error(error.stack || error);
            return null;
        }

        const info = stats?.toString({
            "hash": true,
            "colors": true,
            "modules": false,
            "version": true,
            "env": true,
            "entrypoints": false,
        });

        Log.echo("✔ Build completed");
        Log.echo(info);

        if (stats?.hasErrors()) {
            // Compile-time error (broken import, syntax error, etc)
            Log.echo("➡ Compile-time Error!");
        }

        if (stats?.hasWarnings()) {
            // Compile-time warnings
            Log.echo("➡ Compile-time Warning!");
        }
    });
};
