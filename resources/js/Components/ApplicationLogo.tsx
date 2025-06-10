import { SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {
    className?: string;
}

export default function ApplicationLogo({ className = "", ...props }: Props) {
    return (
        <svg
            {...props}
            className={`fill-current text-gray-500 ${className}`}
            viewBox="0 0 24 24"
        >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
    );
}
