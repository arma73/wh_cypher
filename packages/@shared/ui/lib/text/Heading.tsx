import clsx from "clsx";

import type { FC } from "react";

interface IHeadingProps {
    className?: string;
    text: string;
}

const Heading: FC<IHeadingProps> = ({ className, text }) => {
    return (
        <h1
            className={clsx(
                "text-2xl text-center text-theme-textPrimary",
                className
            )}>
            {text}
        </h1>
    );
};

export default Heading;
