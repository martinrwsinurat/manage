import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps, User } from "@/types";
import { Head, Link, router } from "@inertiajs/react";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { Button } from "@/components/ui/button";

interface Props {
    auth: {
        user: User;
    };
}

export default function Edit({
    mustVerifyEmail,
    status,
    auth,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }> & Props) {
    // Fungsi logout - opsi 1: redirect manual ke login
    const handleLogout = () => {
        router.post(route("logout"), {}, {
            onSuccess: () => {
                // Redirect ke login setelah logout berhasil
                router.visit('/login');
            }
        });
    };

    // Alternatif fungsi logout - opsi 2: langsung ke login
    // const handleLogout = () => {
    //     router.visit('/login', {
    //         method: 'post',
    //         data: {},
    //         headers: {
    //             'X-HTTP-Method-Override': 'POST'
    //         },
    //         onBefore: () => {
    //             // Hapus session/token sebelum redirect
    //             router.post(route("logout"));
    //         }
    //     });
    // };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Profil Saya
                </h2>
            }
        >
            <Head title="Profil" />

            <div
                className="py-12 min-h-screen flex items-center justify-center"
                style={{
                    background: "linear-gradient(135deg, #ff9800 0%, #ffb74d 100%)",
                }}
            >
                <div className="w-full max-w-5xl bg-white/90 rounded-2xl shadow-2xl p-0 md:p-0 flex flex-col md:flex-row gap-0 md:gap-8 overflow-hidden">
                    {/* Sidebar */}
                    <div className="bg-gradient-to-b from-orange-400 to-orange-200 p-8 flex flex-col items-center md:w-1/3 w-full">
                        <div className="w-24 h-24 rounded-full bg-white shadow mb-4 flex items-center justify-center text-3xl font-bold text-orange-600">
                            {auth.user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()}
                        </div>
                        <div className="text-center mb-6">
                            <div className="font-bold text-lg text-white">{auth.user.name}</div>
                            <div className="text-white text-sm">{auth.user.email}</div>
                        </div>
                        <Button
                            variant="destructive"
                            className="w-full mt-4"
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    </div>
                    {/* Main Content */}
                    <div className="flex-1 p-8 space-y-8">
                        <div className="bg-white/90 p-6 shadow rounded-xl">
                            <h3 className="text-lg font-semibold mb-4 text-orange-700">Informasi Profil</h3>
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="max-w-xl"
                            />
                        </div>
                        <div className="bg-white/90 p-6 shadow rounded-xl">
                            <h3 className="text-lg font-semibold mb-4 text-orange-700">Ubah Password</h3>
                            <UpdatePasswordForm className="max-w-xl" />
                        </div>
                        <div className="bg-white/90 p-6 shadow rounded-xl">
                            <h3 className="text-lg font-semibold mb-4 text-orange-700">Hapus Akun</h3>
                            <DeleteUserForm className="max-w-xl" />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}