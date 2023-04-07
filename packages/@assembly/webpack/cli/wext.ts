#!/usr/bin/env node

import { spawn } from "child_process";

const spawnScript = () => {
    const scriptResult = spawn("echo", ["cli is running"]);

    scriptResult.stdout.on("data", data => {
        // eslint-disable-next-line no-console
        console.log(`${data}`);
    });
};

spawnScript();
