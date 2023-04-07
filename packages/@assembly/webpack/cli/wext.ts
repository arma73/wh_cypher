#!/usr/bin/env node

import { resolve } from "path";
import { program } from "commander";
import { Log } from "@shared/auxiliaries";
import { setupBuildCompiler } from "../lib/executes";

import type { Configuration } from "webpack";

const minConf: Configuration = {
    mode: "production",
    entry: "./src/index.js",
    output: {
        path: resolve(process.cwd(), "build"),
        filename: "main.js",
    },
};

const validOptions = ["build", "dev"];

const spawnScript = () => {
    // Define the "build" command
    program
        .command("build")
        .description("Build the project")
        .action(() => {
            // Code to run when the "build" command is used
            Log.echo("Building the project");
            setupBuildCompiler(minConf);
        });

    // Define the "dev" command
    program
        .command("dev")
        .description("Start the development server")
        .action(() => {
            // Code to run when the "dev" command is used
            Log.echo("Starting the development server");
        });

    program.parse(process.argv);

    const command = program.args[0];
    if (!validOptions.includes(command)) {
        console.error(
            `Invalid command "${command}". Valid options are: ${validOptions.join(
                ", "
            )}`
        );
        process.exit(1);
    }
};

spawnScript();
