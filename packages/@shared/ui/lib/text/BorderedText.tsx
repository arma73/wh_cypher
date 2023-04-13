import clsx from "clsx";

import type { FC } from "react";

type VariantTypes = "primary" | "secondary";

interface IBorderedTextProps {
    className?: string;
    variant?: VariantTypes;
    text: string;
}

const styles: Record<VariantTypes, string> = {
    primary: "border-theme-linesPrimary",
    secondary: "border-theme-linesLighter",
};

const BorderedText: FC<IBorderedTextProps> = ({
    className,
    text,
    variant = "primary",
}) => {
    return (
        <div
            className={clsx(
                "border w-full text-center mx-7 py-1 rounded-lg",
                styles[variant],
                className
            )}>
            <span className="text-xl text-theme-textSecondary">{text}</span>
        </div>
    );
};

export default BorderedText;
