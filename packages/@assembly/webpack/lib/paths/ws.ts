import { join } from "path";

/**
 * Represents the paths paths used by the runner.
 * @namespace
 */
export namespace WSPaths {
    /**
     * The absolute path to the root directory of the runner.
     * @constant
     */
    export const ROOT = process.cwd();
    /**
     * The absolute path to the environment variables.
     * @constant
     */
    export const ROOT_ENV = join(ROOT, ".env");
    /**
     * The absolute path to the source directory.
     * @constant
     */
    export const SRC = join(ROOT, "src");
    /**
     * The absolute path to the building directory.
     * @constant
     */
    export const OUTPUT_BUILD = join(ROOT, "build");
    /**
     * The absolute path to the build directory in development mode.
     * @constant
     */
    export const OUTPUT_DEV = join(ROOT, "dev");
    /**
     * The absolute path to the app directory.
     * @constant
     */
    export const APP = join(SRC, "app");
    /**
     * The absolute path to the svgr icons directory.
     * @constant
     */
    export const SVGR_ICONS = join(ROOT, "assets", "svgr");
}

/**
 * Represents the paths to various scripts used in the extension.
 * @namespace
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
    /**
     * The absolute path to the directory containing the popup template of the extension.
     * @constant
     */
    export const POPUP_MARKUP = join(WSPaths.SRC, "popup/popup.html");
}
