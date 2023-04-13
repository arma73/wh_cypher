import { useRef, useEffect } from "react";
import { useUIType } from "../hooks";
import clsx from "clsx";

import type { FC, PropsWithChildren } from "react";

interface IExtensionLayoutProps {
    className?: string;
}

const ExtensionLayout: FC<PropsWithChildren<IExtensionLayoutProps>> = ({
    className,
    children,
}) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const uiType = useUIType();

    useEffect(() => {
        if (ref.current && uiType === "menubar") {
            ref.current.style.border = "none";
        }
    }, [uiType]);

    return (
        <div
            ref={ref}
            className={clsx(
                "d-flex flex-col w-full h-full border-2 border-theme-linesLight rounded-lg",
                className
            )}>
            {children}
        </div>
    );
};

export default ExtensionLayout;
