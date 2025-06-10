import InputError from "@/components/InputError";
import PrimaryButton from "@/components/PrimaryButton";
import TextInput from "@/components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("password.email"));
    };

    return (
        <GuestLayout>
            <Head title="Lupa Password" />

            <div
                className="min-h-screen flex items-center justify-center"
                style={{
                    background: "linear-gradient(135deg, #ff9800 0%, #ffb74d 100%)",
                }}
            >
                <div className="w-full max-w-md bg-white/90 rounded-2xl shadow-2xl p-8">
                    <h1 className="text-2xl font-bold text-orange-700 mb-6 text-center">
                        Lupa Password
                    </h1>
                    <div className="mb-4 text-sm text-gray-700 text-center">
                        Lupa kata sandi Anda? Tidak masalah. Masukkan email Anda dan kami akan mengirimkan link untuk mengatur ulang kata sandi.
                    </div>

                    {status && (
                        <div className="mb-4 text-sm font-medium text-green-600 text-center">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit}>
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            isFocused={true}
                            onChange={(e) => setData("email", e.target.value)}
                            placeholder="Email"
                        />

                        <InputError message={errors.email} className="mt-2" />

                        <div className="mt-6 flex items-center justify-center">
                            <PrimaryButton className="w-full bg-orange-500 hover:bg-orange-600 border-0" disabled={processing}>
                                Kirim Link Reset Password
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}