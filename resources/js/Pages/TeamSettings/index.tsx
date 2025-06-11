import React, { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/Components/ui/card";
import { ListOrdered, Plus, Trash2, Edit2, Save, X } from "lucide-react";

export default function TeamSettings({ users }) {
    // State untuk form tambah/edit user
    const [editId, setEditId] = useState<number | null>(null);

    // Form inertia
    const { data, setData, post, put, delete: destroy, reset, processing, errors } = useForm({
        name: "",
        email: "",
        role: "",
        password: "",
    });

    // Tambah user
    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        post("/users", {
            onSuccess: () => reset(),
        });
    };

    // Edit user
    const handleEdit = (user) => {
        setEditId(user.id);
        setData({
            name: user.name,
            email: user.email,
            role: user.role,
            password: "",
        });
    };

    // Simpan edit
    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/users/${editId}`, {
            onSuccess: () => {
                setEditId(null);
                reset();
            },
        });
    };

    // Hapus user
    const handleDelete = (id: number) => {
        if (confirm("Yakin hapus user ini?")) {
            destroy(`/users/${id}`);
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Manajemen User" />
            <div
                className="min-h-screen py-12 px-4 flex items-center justify-center"
                style={{
                    background: "linear-gradient(135deg, #ff9800 0%, #ffb74d 100%)",
                }}
            >
                <div className="max-w-2xl w-full mx-auto">
                    <Card className="mb-8 shadow border-0 bg-white/90">
                        <CardHeader className="flex flex-row items-center gap-3 bg-gradient-to-r from-orange-300 to-orange-400 rounded-t-lg">
                            <ListOrdered className="w-6 h-6 text-white" />
                            <CardTitle className="text-white text-lg">
                                Manajemen User
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="py-4 px-6">
                            {/* Form Tambah/Edit User */}
                            <form onSubmit={editId ? handleSave : handleAdd} className="flex flex-col md:flex-row gap-2 mb-4">
                                <input
                                    type="text"
                                    className="border border-orange-300 rounded px-3 py-2 w-full"
                                    placeholder="Nama"
                                    value={data.name}
                                    onChange={e => setData("name", e.target.value)}
                                    required
                                />
                                <input
                                    type="email"
                                    className="border border-orange-300 rounded px-3 py-2 w-full"
                                    placeholder="Email"
                                    value={data.email}
                                    onChange={e => setData("email", e.target.value)}
                                    required
                                />
                                <input
                                    type="text"
                                    className="border border-orange-300 rounded px-3 py-2 w-full"
                                    placeholder="Role"
                                    value={data.role}
                                    onChange={e => setData("role", e.target.value)}
                                    required
                                />
                                <input
                                    type="password"
                                    className="border border-orange-300 rounded px-3 py-2 w-full"
                                    placeholder={editId ? "Password (opsional)" : "Password"}
                                    value={data.password}
                                    onChange={e => setData("password", e.target.value)}
                                    required={!editId}
                                />
                                <button
                                    type="submit"
                                    className="flex items-center gap-1 bg-gradient-to-r from-orange-400 to-orange-500 text-white px-4 py-2 rounded shadow hover:from-orange-500 hover:to-orange-600 transition"
                                    disabled={processing}
                                >
                                    {editId ? <Save className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                    {editId ? "Simpan" : "Tambah"}
                                </button>
                                {editId && (
                                    <button
                                        type="button"
                                        className="flex items-center gap-1 bg-gray-300 text-gray-700 px-4 py-2 rounded shadow"
                                        onClick={() => { setEditId(null); reset(); }}
                                    >
                                        <X className="w-4 h-4" /> Batal
                                    </button>
                                )}
                            </form>
                            {/* Tabel User */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border border-orange-200 rounded">
                                    <thead>
                                        <tr className="bg-gradient-to-r from-orange-100 to-orange-200 text-orange-700">
                                            <th className="py-2 px-3 text-left">Nama</th>
                                            <th className="py-2 px-3 text-left">Email</th>
                                            <th className="py-2 px-3 text-left">Role</th>
                                            <th className="py-2 px-3 text-center">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user) => (
                                            <tr key={user.id} className="border-b border-orange-100">
                                                <td className="py-2 px-3">{user.name}</td>
                                                <td className="py-2 px-3">{user.email}</td>
                                                <td className="py-2 px-3">{user.role}</td>
                                                <td className="py-2 px-3 text-center">
                                                    <button
                                                        type="button"
                                                        className="text-blue-500 hover:text-blue-700 mr-2"
                                                        onClick={() => handleEdit(user)}
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="text-red-500 hover:text-red-700"
                                                        onClick={() => handleDelete(user.id)}
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        {users.length === 0 && (
                                            <tr>
                                                <td colSpan={4} className="py-4 text-center text-orange-400">
                                                    Belum ada user.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}