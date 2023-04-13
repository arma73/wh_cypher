import { useId, forwardRef } from "react";
import clsx from "clsx";

import type {
    InputHTMLAttributes,
    DetailedHTMLProps,
    ChangeEvent,
    KeyboardEventHandler,
    FC,
    SVGProps,
} from "react";

interface IInputProps
    extends Omit<
        DetailedHTMLProps<
            InputHTMLAttributes<HTMLInputElement>,
            HTMLInputElement
        >,
        "onChange"
    > {
    className?: string;
    onChange: (value: string) => void;
    errIcon?: FC<SVGProps<SVGSVGElement>>;
    onSubmit?: () => void;
    label: string;
    error?: string | boolean;
}

const Input = forwardRef<HTMLInputElement, IInputProps>(function InputRef(
    {
        className,
        label,
        name,
        error,
        errIcon: ErrorIcon,
        onChange,
        onSubmit,
        placeholder = "",
        ...rest
    },
    externalRef
) {
    const uniqueId = useId();

    const handleOnChange = ({
        target: { value },
    }: ChangeEvent<HTMLInputElement>) => {
        onChange(value);
    };

    const onKeyDown: KeyboardEventHandler<HTMLInputElement> = ({ key }) => {
        if (key === "Enter" && onSubmit) {
            onSubmit();
        }
    };

    return (
        <div className={className}>
            <label
                htmlFor={uniqueId}
                className="block text-sm font-medium text-theme-textSecondary">
                {label}
            </label>
            <div className="relative mt-1 rounded-md shadow-sm">
                <input
                    name={name}
                    ref={externalRef}
                    onKeyDown={onKeyDown}
                    id={uniqueId}
                    onChange={handleOnChange}
                    className={clsx(
                        "block w-full rounded-md p-2 focus:outline-none border-solid border sm:text-sm",
                        "bg-theme-bgHover text-theme-textSecondary",
                        error
                            ? "border-theme-danger focus:border-theme-dangerHighlight"
                            : "border-gray-500 placeholder-gray-300 focus:border-gray-50 focus:ring-gray-400 focus:text-theme-textPrimary"
                    )}
                    placeholder={placeholder}
                    aria-invalid={error ? "true" : "false"}
                    aria-describedby={error ? `${name}-error` : name}
                    {...rest}
                />
                {error && ErrorIcon ? (
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <ErrorIcon className="h-5 w-5" />
                    </div>
                ) : null}
            </div>
            {error && <p className="mt-2 text-sm text-theme-danger">{error}</p>}
        </div>
    );
});

export default Input;
