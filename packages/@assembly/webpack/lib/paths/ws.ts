import { join } from "path";

export namespace WSPaths {
    /**
     * The absolute path to the root directory of the runner.
     * @constant
     */
    export const ROOT = process.cwd();
    /**
     * The absolute path to the source directory.
     * @constant
     */
    export const SRC = join(ROOT, "src");
    /**
     * The absolute path to the building directory.
     * @constant
     */
    export const OUTPUT = join(ROOT, "build");
    /**
     * The absolute path to the app directory.
     * @constant
     */
    export const APP = join(SRC, "app");
}

/**
 * Represents the paths to various scripts used in the extension.
 */
export namespace WSExtPaths {
    /**
     * The absolute path to the directory containing the background script of the extension.
     * @constant
     */
    export const BG_SCRIPT = join(WSPaths.SRC, "bg/index.ts");
    /**
     * The absolute path to the directory containing the content script of the extension.
     * @constant
     */
    export const CONTENT_SCRIPT = join(WSPaths.SRC, "content/index.ts");
    /**
     * The absolute path to the directory containing the popup script of the extension.
     * @constant
     */
    export const POPUP = join(WSPaths.SRC, "popup/index.tsx");
}
