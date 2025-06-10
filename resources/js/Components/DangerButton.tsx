import { ButtonHTMLAttributes, forwardRef } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
}

export default forwardRef<HTMLButtonElement, Props>(function DangerButton(
    { className = "", disabled, children, ...props },
    ref
) {
    return (
        <button
            {...props}
            className={`inline-flex items-center justify-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 focus:bg-red-700 active:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150 ${
                disabled && "opacity-25"
            } ${className}`}
            disabled={disabled}
            ref={ref}
        >
            {children}
        </button>
    );
});
