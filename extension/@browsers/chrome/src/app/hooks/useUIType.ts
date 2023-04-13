import { useEffect, useState } from "react";
import { Detect } from "@shared/auxiliaries";

export const useUIType = () => {
    // TODO: Dispatch to store
    const [uiType, setUIType] = useState<"menubar" | "tab">("tab");

    useEffect(() => {
        const opener = Detect.duckOpenerRecognition(EXT_WINDOW_HEIGHT);
        setUIType(opener);
    }, []);

    return uiType;
};
