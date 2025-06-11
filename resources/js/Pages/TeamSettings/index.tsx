import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/Components/ui/card";
import { ListOrdered, Plus, Trash2, Edit2, Save, X } from "lucide-react";

export default function TeamSettings() {
    // State untuk input dan list bahan/langkah
    const [input, setInput] = useState("");
    const [items, setItems] = useState<string[]>([]);
    const [editIdx, setEditIdx] = useState<number | null>(null);
    const [editValue, setEditValue] = useState("");

    // Tambah item
    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        setItems([...items, input.trim()]);
        setInput("");
    };

    // Hapus item
    const handleDelete = (idx: number) => {
        setItems(items.filter((_, i) => i !== idx));
    };

    // Edit item
    const handleEdit = (idx: number) => {
        setEditIdx(idx);
        setEditValue(items[idx]);
    };

    // Simpan edit
    const handleSave = (idx: number) => {
        if (!editValue.trim()) return;
        setItems(items.map((item, i) => (i === idx ? editValue.trim() : item)));
        setEditIdx(null);
        setEditValue("");
    };

    return (
        <AuthenticatedLayout>
            <Head title="Input Daftar (How To Make / Bahan)" />
            <div
                className="min-h-screen py-12 px-4 flex items-center justify-center"
                style={{
                    background: "linear-gradient(135deg, #ff9800 0%, #ffb74d 100%)",
                }}
            >
                <div className="max-w-xl w-full mx-auto">
                    <Card className="mb-8 shadow border-0 bg-white/90">
                        <CardHeader className="flex flex-row items-center gap-3 bg-gradient-to-r from-orange-300 to-orange-400 rounded-t-lg">
                            <ListOrdered className="w-6 h-6 text-white" />
                            <CardTitle className="text-white text-lg">
                                List Tugas
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="py-4 px-6">
                            <form onSubmit={handleAdd} className="flex gap-2 mb-4">
                                <input
                                    type="text"
                                    className="border border-orange-300 rounded px-3 py-2 w-full"
                                    placeholder="Masukkan siapa yang mengerjakan..."
                                    value={input}
                                    onChange={e => setInput(e.target.value)}
                                />
                                <button
                                    type="submit"
                                    className="flex items-center gap-1 bg-gradient-to-r from-orange-400 to-orange-500 text-white px-4 py-2 rounded shadow hover:from-orange-500 hover:to-orange-600 transition"
                                >
                                    <Plus className="w-4 h-4" /> Tambah
                                </button>
                            </form>
                            <ul className="list-decimal ml-6 text-gray-700 space-y-2">
                                {items.map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-2">
                                        {editIdx === idx ? (
                                            <>
                                                <input
                                                    type="text"
                                                    className="border border-orange-300 rounded px-2 py-1 w-full"
                                                    value={editValue}
                                                    onChange={e => setEditValue(e.target.value)}
                                                />
                                                <button
                                                    type="button"
                                                    className="text-green-600 hover:text-green-800"
                                                    onClick={() => handleSave(idx)}
                                                >
                                                    <Save className="w-4 h-4" />
                                                </button>
                                                <button
                                                    type="button"
                                                    className="text-gray-400 hover:text-gray-600"
                                                    onClick={() => setEditIdx(null)}
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <span>{item}</span>
                                                <button
                                                    type="button"
                                                    className="text-blue-500 hover:text-blue-700"
                                                    onClick={() => handleEdit(idx)}
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    type="button"
                                                    className="text-red-500 hover:text-red-700"
                                                    onClick={() => handleDelete(idx)}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </>
                                        )}
                                    </li>
                                ))}
                                {items.length === 0 && (
                                    <li className="text-orange-400">Belum ada data.</li>
                                )}
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}