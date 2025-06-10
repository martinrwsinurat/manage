import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useForm } from "@inertiajs/react";
import { toast } from "sonner";
import { FileIcon, TrashIcon, DownloadIcon, EyeIcon } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { router } from "@inertiajs/react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

interface Attachment {
    filename: string;
    path: string;
    type: string;
    uploaded_at: string;
}

interface ProjectAttachmentsProps {
    attachments: Attachment[];
    projectId: number;
}

interface PageProps {
    project?: {
        attachments: Attachment[];
    };
}

export function ProjectAttachments({
    attachments,
    projectId,
}: ProjectAttachmentsProps) {
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [localAttachments, setLocalAttachments] = useState<Attachment[]>(
        attachments || []
    );
    const { data, setData, post, processing } = useForm({
        file: null as File | null,
    });
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setLocalAttachments(attachments || []);
    }, [attachments]);

    const getFullCloudinaryUrl = (path: string) => {
        if (path.startsWith("http")) return path;
        const cloudName = window.CLOUDINARY_CLOUD_NAME || "dtpflpunp";
        return `https://res.cloudinary.com/${cloudName}/image/upload/${path}`;
    };

    const getThumbnailUrl = (url: string) => {
        const fullUrl = getFullCloudinaryUrl(url);
        if (!fullUrl.includes("cloudinary.com")) return fullUrl;
        return fullUrl.replace(
            "/upload/",
            "/upload/c_thumb,w_200,h_200,g_face/"
        );
    };

    const getPreviewUrl = (url: string) => {
        const fullUrl = getFullCloudinaryUrl(url);
        if (!fullUrl.includes("cloudinary.com")) return fullUrl;
        return fullUrl.replace("/upload/", "/upload/q_auto,f_auto/");
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (file.size > 10 * 1024 * 1024) {
                toast.error("Ukuran file harus kurang dari 10MB");
                e.target.value = "";
                return;
            }
            setData("file", file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!data.file) return;

        post(route("projects.attachments.store", projectId), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: (page) => {
                const props = page.props as PageProps;
                if (props.project?.attachments) {
                    setLocalAttachments(props.project.attachments);
                    toast.success("Berkas berhasil diunggah");
                    setData("file", null);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                } else {
                    toast.error("Gagal memperbarui daftar berkas");
                }
            },
            onError: (errors) => {
                toast.error(errors.file || "Gagal mengunggah berkas");
            },
        });
    };

    const handleDelete = (index: number) => {
        if (confirm("Yakin ingin menghapus berkas ini?")) {
            router.delete(
                route("projects.attachments.destroy", [projectId, index]),
                {
                    onSuccess: () => {
                        toast.success("Berkas berhasil dihapus");
                    },
                    onError: () => {
                        toast.error("Gagal menghapus berkas");
                    },
                }
            );
        }
    };

    const handleDownload = (path: string, filename: string) => {
        window.open(path, "_blank");
    };

    const handlePreview = (path: string) => {
        const fullUrl = getFullCloudinaryUrl(path);
        setPreviewImage(fullUrl);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Bukti Tugas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex items-center gap-4">
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                            accept="*/*"
                            id="fileInput"
                        />
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            Pilih Berkas
                        </Button>
                        <span className="ml-2 text-sm text-gray-600">
                            {data.file ? data.file.name : "Belum ada berkas dipilih"}
                        </span>
                        <Button
                            type="submit"
                            disabled={processing || !data.file}
                        >
                            {processing ? "Mengunggah..." : "Unggah"}
                        </Button>
                    </div>
                </form>

                {localAttachments && localAttachments.length > 0 ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>File</TableHead>
                                <TableHead>Tipe</TableHead>
                                <TableHead>Diunggah</TableHead>
                                <TableHead className="text-right">
                                    Aksi
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {localAttachments.map((attachment, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-2">
                                            {attachment.type.startsWith(
                                                "image/"
                                            ) ? (
                                                <div className="relative group">
                                                    <img
                                                        src={getThumbnailUrl(
                                                            attachment.path
                                                        )}
                                                        alt={
                                                            attachment.filename
                                                        }
                                                        className="h-12 w-12 object-cover rounded cursor-pointer hover:opacity-75 transition-opacity"
                                                        onClick={() =>
                                                            handlePreview(
                                                                getPreviewUrl(
                                                                    attachment.path
                                                                )
                                                            )
                                                        }
                                                    />
                                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all rounded flex items-center justify-center">
                                                        <EyeIcon className="h-4 w-4 text-white opacity-0 group-hover:opacity-100" />
                                                    </div>
                                                </div>
                                            ) : (
                                                <FileIcon className="h-4 w-4" />
                                            )}
                                            {attachment.filename}
                                        </div>
                                    </TableCell>
                                    <TableCell>{attachment.type}</TableCell>
                                    <TableCell>
                                        {new Date(
                                            attachment.uploaded_at
                                        ).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex justify-end gap-2">
                                            {attachment.type.startsWith(
                                                "image/"
                                            ) && (
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() =>
                                                        handlePreview(
                                                            getPreviewUrl(
                                                                attachment.path
                                                            )
                                                        )
                                                    }
                                                >
                                                    <EyeIcon className="h-4 w-4" />
                                                </Button>
                                            )}
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() =>
                                                    handleDownload(
                                                        attachment.path,
                                                        attachment.filename
                                                    )
                                                }
                                            >
                                                <DownloadIcon className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() =>
                                                    handleDelete(index)
                                                }
                                            >
                                                <TrashIcon className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <p className="text-center text-gray-500">
                        Belum ada bukti tugas yang diunggah
                    </p>
                )}
            </CardContent>

            <Dialog
                open={!!previewImage}
                onOpenChange={() => setPreviewImage(null)}
            >
                <DialogContent className="max-w-4xl">
                    <DialogHeader>
                        <DialogTitle>Pratinjau Gambar</DialogTitle>
                    </DialogHeader>
                    {previewImage && (
                        <>
                            <div className="p-4 bg-gray-100 rounded-lg mb-4">
                                <p className="text-sm text-gray-600 break-all">
                                    URL Gambar: {previewImage}
                                </p>
                            </div>
                            <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                                <img
                                    src={previewImage}
                                    alt="Preview"
                                    className="w-full h-full object-contain"
                                    onError={(e) => {
                                        e.currentTarget.src =
                                            "https://via.placeholder.com/400x300?text=Image+Failed+to+Load";
                                    }}
                                />
                            </div>
                            <div className="mt-4 flex justify-end gap-2">
                                <Button
                                    variant="outline"
                                    onClick={() =>
                                        window.open(previewImage, "_blank")
                                    }
                                >
                                    Buka di Tab Baru
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => setPreviewImage(null)}
                                >
                                    Tutup
                                </Button>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </Card>
    );
}