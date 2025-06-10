import { ReactNode } from "react";
import { Link } from "@inertiajs/react";

interface Props {
    children: ReactNode;
}

export default function GuestLayout({ children }: Props) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
            <div>
                <Link href="/">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Task Management
                    </h1>
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
