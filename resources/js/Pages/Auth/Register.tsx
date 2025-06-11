import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<{
        name: string;
        email: string;
        password: string;
        password_confirmation: string;
        agreement: boolean;
    }>({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        agreement: true,
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("register"));
    };

    return (
        <GuestLayout>
            <Head title="Register" />
            <section
                className="min-h-screen flex items-center justify-center"
                style={{
                    background: "linear-gradient(135deg, #FFD6A0 0%, #FFB86C 100%)",
                }}
            >
                <div className="w-full max-w-xl mx-auto">
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="text-center pt-8 pb-2 px-6">
                            <h1 className="text-2xl text-orange-700 mb-2">Daftar Akun</h1>
                            <p className="mb-2 text-gray-700">Silakan isi data diri kamu untuk membuat akun baru.</p>
                        </div>
                        <div className="p-8">
                            <form onSubmit={submit}>
                                <div className="mb-4">
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border border-orange-200 rounded focus:border-orange-400 focus:ring-orange-400 text-gray-800"
                                        placeholder="Nama Lengkap"
                                        name="name"
                                        id="name"
                                        value={data.name}
                                        onChange={e => setData("name", e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.name} className="text-orange-600 text-xs mt-2" />
                                </div>
                                <div className="mb-4">
                                    <input
                                        type="email"
                                        className="w-full px-4 py-2 border border-orange-200 rounded focus:border-orange-400 focus:ring-orange-400 text-gray-800"
                                        placeholder="Email"
                                        name="email"
                                        id="email"
                                        value={data.email}
                                        onChange={e => setData("email", e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.email} className="text-orange-600 text-xs mt-2" />
                                </div>
                                <div className="mb-4">
                                    <input
                                        type="password"
                                        className="w-full px-4 py-2 border border-orange-200 rounded focus:border-orange-400 focus:ring-orange-400 text-gray-800"
                                        placeholder="Password"
                                        name="password"
                                        id="password"
                                        value={data.password}
                                        onChange={e => setData("password", e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.password} className="text-orange-600 text-xs mt-2" />
                                </div>
                                <div className="mb-4">
                                    <input
                                        type="password"
                                        className="w-full px-4 py-2 border border-orange-200 rounded focus:border-orange-400 focus:ring-orange-400 text-gray-800"
                                        placeholder="Konfirmasi Password"
                                        name="password_confirmation"
                                        id="password_confirmation"
                                        value={data.password_confirmation}
                                        onChange={e => setData("password_confirmation", e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.password_confirmation} className="text-orange-600 text-xs mt-2" />
                                </div>
                                <div className="flex items-center mb-4">
                                    <input
                                        className="rounded border-orange-300 text-orange-600 shadow-sm focus:ring-orange-400"
                                        type="checkbox"
                                        name="agreement"
                                        id="agreement"
                                        checked={data.agreement}
                                        onChange={e => setData("agreement", (e.target as HTMLInputElement).checked)}
                                    />
                                    <label className="ml-2 text-sm text-gray-700" htmlFor="agreement">
                                        Saya setuju dengan{" "}
                                        <a href="#" className="text-orange-600 underline">
                                            Syarat dan Ketentuan
                                        </a>
                                    </label>
                                </div>
                                <InputError message={errors.agreement} className="text-orange-600 text-xs mb-2" />
                                <button
                                    type="submit"
                                    className="w-full py-2 rounded bg-gradient-to-r from-orange-400 to-orange-500 text-white text-base font-medium hover:from-orange-500 hover:to-orange-600 transition-all duration-200"
                                    disabled={processing}
                                >
                                    {processing ? "Mendaftar..." : "Daftar"}
                                </button>
                                <p className="text-sm mt-6 mb-0 text-center text-gray-700">
                                    Sudah punya akun?{" "}
                                    <Link href={route("login")} className="text-orange-600 font-medium hover:underline">
                                        Login di sini
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}