import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Checkbox({ handleChange, ...props }: Props) {
    return (
        <input
            {...props}
            type="checkbox"
            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
            onChange={(e) => handleChange?.(e)}
        />
    );
}
