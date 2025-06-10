import { InputHTMLAttributes, forwardRef } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    isFocused?: boolean;
}

export default forwardRef<HTMLInputElement, Props>(
    ({ type = "text", className = "", isFocused = false, ...props }, ref) => {
        return (
            <input
                {...props}
                type={type}
                className={`border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ${className}`}
                ref={ref}
            />
        );
    }
);
