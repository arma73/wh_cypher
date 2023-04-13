/// <reference path="../../../@types/global.d.ts" />

declare module "svgr/*.svg" {
    import React from "react";
    const SVG: React.FC<React.SVGProps<SVGSVGElement>>;

    export default SVG;
}

declare const SECRET_KEY: string;
declare const EXT_WINDOW_HEIGHT: number;
