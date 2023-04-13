import clsx from "clsx";

import type { FC, ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type SizeTypes = "md" | "lg";

const styles = {
    primary:
        "inline-flex items-center border border-transparent font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2",
    secondary:
        "inline-flex items-center border border-transparent font-medium focus:outline-none focus:ring-2 focus:ring-offset-2",
};

const sizeStyles: Record<SizeTypes, string> = {
    md: "rounded-md px-4 py-2 text-sm",
    lg: "rounded-md px-4 py-2 text-base",
};

const themeStyles = {
    primary:
        "bg-indigo-600/60 text-theme-textPrimary hover:bg-indigo-700/60 focus:ring-indigo-500",
    secondary:
        "bg-indigo-100/20 text-theme-bg hover:bg-theme-bgHover focus:ring-indigo-500",
};

interface IThemedButtonProps
    extends DetailedHTMLProps<
        ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > {
    size?: SizeTypes;
    text: string;
    variant?: "primary" | "secondary";
    className?: string;
}

const ThemedButton: FC<IThemedButtonProps> = ({
    className,
    size = "md",
    variant = "primary",
    text,
    ...restProps
}) => {
    const buttonClassName = clsx(
        sizeStyles[size],
        styles[variant],
        themeStyles[variant],
        className
    );

    return (
        <button type="button" className={buttonClassName} {...restProps}>
            {text}
        </button>
    );
};

export default ThemedButton;
