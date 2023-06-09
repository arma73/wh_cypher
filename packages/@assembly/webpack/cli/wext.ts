#!/usr/bin/env node

import { program } from "commander";
import { Log } from "@shared/auxiliaries";
import { setupBuildCompiler, devServerRunner } from "../lib/executes";

const validOptions = ["build", "dev"];

const spawnScript = () => {
    // Define the "build" command
    program
        .command("build")
        .description("Build the project")
        .action(() => {
            // Code to run when the "build" command is used
            Log.echo("Building the project");
            setupBuildCompiler();
        });

    // Define the "dev" command
    program
        .command("dev")
        .description("Start the development server")
        .action(async () => {
            // Code to run when the "dev" command is used
            Log.echo("Starting the development server");
            await devServerRunner();
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
