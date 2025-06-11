import { useEffect, useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Login() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: "false",
    });

    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("login"));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-200 via-orange-300 to-orange-400">
            <Head title="Login" />
            <div className="bg-white/95 shadow-xl rounded-xl p-10 w-full max-w-xl animate-fade-in border border-orange-200">
                <div className="mb-6 text-center">
                    <h1 className="text-2xl text-orange-700 mb-2">Soft Manage UI</h1>
                    <p className="text-gray-700 mb-1">Masuk untuk mulai mengelola projek</p>
                </div>
                <form onSubmit={submit}>
                    <div>
                        <InputLabel htmlFor="email" value="Email" className="text-gray-700" />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full bg-orange-50 border border-orange-300 focus:border-orange-400 focus:ring-orange-400 text-gray-800"
                            autoComplete="username"
                            isFocused={true}
                            placeholder="akun@gmail.com"
                            onChange={(e) => setData("email", e.target.value)}
                        />
                        <InputError message={errors.email} className="mt-2 text-orange-600" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="password" value="Kata Sandi" className="text-gray-700" />
                        <div className="relative">
                            <TextInput
                                id="password"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full bg-orange-50 border border-orange-300 focus:border-orange-400 focus:ring-orange-400 pr-10 text-gray-800"
                                autoComplete="current-password"
                                placeholder="password"
                                onChange={(e) => setData("password", e.target.value)}
                            />
                            <button
                                type="button"
                                tabIndex={-1}
                                className="absolute inset-y-0 right-2 flex items-center text-orange-400 hover:text-orange-600"
                                onClick={() => setShowPassword((v) => !v)}
                            >
                                {showPassword ? (
                                    // Eye icon (show)
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                ) : (
                                    // Eye off icon (hide)
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.956 9.956 0 012.293-3.95M6.7 6.7A9.956 9.956 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.956 9.956 0 01-4.043 5.132M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
                                    </svg>
                                )}
                            </button>
                        </div>
                        <InputError message={errors.password} className="mt-2 text-orange-600" />
                    </div>

                    {/* <div className="block mt-4">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="remember"
                                checked={data.remember === "true"}
                                onChange={(e) =>
                                    setData("remember", e.target.checked ? "true" : "false")
                                }
                                className="rounded border-orange-300 text-orange-600 shadow-sm focus:ring-orange-400"
                            />
                            <span className="ms-2 text-sm text-gray-700">
                                
                            </span>
                        </label>
                    </div> */}

                    <div className="flex items-center justify-between mt-6">
                        <Link
                            href={route("password.request")}
                            className="underline text-sm text-gray-600 hover:text-orange-600 transition"
                        >
                            Lupa password?
                        </Link>
                        <PrimaryButton
                            className="ms-4 px-8 py-2 bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 transition-all duration-200 shadow rounded-lg text-white"
                            disabled={processing}
                        >
                            MASUK
                        </PrimaryButton>
                    </div>
                </form>
                <div className="mt-8 text-center">
                    <span className="text-gray-700 text-sm">Belum punya akun?</span>
                    <Link
                        href={route("register")}
                        className="ml-2 text-orange-600 font-medium hover:underline"
                    >
                        Buat akun
                    </Link>
                </div>
            </div>
            <style>
                {`
                .animate-fade-in {
                    animation: fadeIn 0.7s ease;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(30px);}
                    to { opacity: 1; transform: translateY(0);}
                }
                `}
            </style>
        </div>
    );
}