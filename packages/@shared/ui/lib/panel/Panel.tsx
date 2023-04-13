import clsx from "clsx";

import type { FC, ReactNode } from "react";

interface IPanelProps {
    className?: string;
    header: ReactNode;
    body: ReactNode;
    footer: ReactNode;
}

const Panel: FC<IPanelProps> = ({ className, header, body, footer }) => {
    return (
        <div
            className={clsx(
                "divide-y flex flex-col h-full divide-theme-linesLighter overflow-hidden rounded-lg bg-theme-bg shadow",
                className
            )}>
            <div className="px-4 py-5 sm:px-6">{header}</div>
            <div className="px-4 py-5 sm:p-6 h-full center">{body}</div>
            <div className="px-4 py-4 sm:px-6 text-right">{footer}</div>
        </div>
    );
};

export default Panel;
