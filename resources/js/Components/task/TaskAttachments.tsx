import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useForm } from "@inertiajs/react";
import { toast } from "sonner";
import {
    FileIcon,
    TrashIcon,
    DownloadIcon,
    EyeIcon,
    MessageSquareIcon,
} from "lucide-react";
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
import { Textarea } from "../ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface TaskAttachment {
    id: number;
    filename: string;
    path: string;
    type: string;
    uploaded_at: string;
    created_at: string;
    comments: TaskComment[];
}

interface TaskComment {
    id: number;
    content: string;
    user: {
        id: number;
        name: string;
        avatar?: string;
    };
    created_at: string;
}

interface TaskAttachmentsProps {
    attachments: TaskAttachment[];
    taskId: number;
    currentUser: {
        id: number;
        name: string;
        avatar?: string;
    };
}

interface PageProps {
    task?: {
        attachments: TaskAttachment[];
    };
    attachment?: TaskAttachment;
}

export function TaskAttachments({
    attachments,
    taskId,
    currentUser,
}: TaskAttachmentsProps) {
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [selectedAttachment, setSelectedAttachment] =
        useState<TaskAttachment | null>(null);
    const [showComments, setShowComments] = useState(false);
    const [localAttachments, setLocalAttachments] = useState<TaskAttachment[]>(
        attachments || []
    );
    const isNewTask = taskId === 0;

    const { data, setData, post, processing } = useForm({
        file: null as File | null,
    });

    const commentForm = useForm({
        content: "",
    });

    // Update local attachments when props change
    useEffect(() => {
        setLocalAttachments(attachments || []);
    }, [attachments]);

    // Function to get full Cloudinary URL
    const getFullCloudinaryUrl = (path: string) => {
        if (path.startsWith("http")) return path;
        const cloudName = window.CLOUDINARY_CLOUD_NAME || "dtpflpunp";
        return `https://res.cloudinary.com/${cloudName}/image/upload/${path}`;
    };

    // Function to transform Cloudinary URL for thumbnails
    const getThumbnailUrl = (url: string) => {
        const fullUrl = getFullCloudinaryUrl(url);
        if (!fullUrl.includes("cloudinary.com")) return fullUrl;
        return fullUrl.replace(
            "/upload/",
            "/upload/c_thumb,w_200,h_200,g_face/"
        );
    };

    // Function to transform Cloudinary URL for preview
    const getPreviewUrl = (url: string) => {
        const fullUrl = getFullCloudinaryUrl(url);
        if (!fullUrl.includes("cloudinary.com")) return fullUrl;
        return fullUrl.replace("/upload/", "/upload/q_auto,f_auto/");
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setData("file", e.target.files[0]);
        }
    };

    const handleFileUpload = () => {
        if (!data.file) return;
        if (isNewTask) {
            toast.error("Silakan simpan tugas terlebih dahulu sebelum mengunggah file");
            return;
        }

        post(route("tasks.attachments.store", taskId), {
            preserveScroll: true,
            onSuccess: (page) => {
                const props = page.props as PageProps;
                if (props.task?.attachments) {
                    setLocalAttachments(props.task.attachments);
                }
                toast.success("File berhasil diunggah");
                setData("file", null);
                const fileInput = document.querySelector(
                    'input[type="file"]'
                ) as HTMLInputElement;
                if (fileInput) fileInput.value = "";
            },
            onError: () => {
                toast.error("Gagal mengunggah file");
            },
        });
    };

    const handleDelete = (attachmentId: number) => {
        if (isNewTask) return;
        if (!confirm("Apakah Anda yakin ingin menghapus file ini?")) return;

        router.delete(
            route("tasks.attachments.destroy", [taskId, attachmentId]),
            {
                onSuccess: () => {
                    setLocalAttachments((prev) =>
                        prev.filter((att) => att.id !== attachmentId)
                    );
                    toast.success("File berhasil dihapus");
                },
                onError: () => {
                    toast.error("Gagal menghapus file");
                },
            }
        );
    };

    const handleDownload = (path: string, filename: string) => {
        window.open(getFullCloudinaryUrl(path), "_blank");
    };

    const handlePreview = (path: string) => {
        const fullUrl = getFullCloudinaryUrl(path);
        setPreviewImage(fullUrl);
    };

    const handleShowComments = (attachment: TaskAttachment) => {
        setSelectedAttachment(attachment);
        setShowComments(true);
    };

    const handleAddComment = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedAttachment) return;
        if (isNewTask) {
            toast.error("Silakan simpan tugas terlebih dahulu sebelum menambah komentar");
            return;
        }

        post(
            route("tasks.attachments.comments.store", [
                taskId,
                selectedAttachment.id,
            ]),
            {
                onSuccess: () => {
                    toast.success("Komentar berhasil ditambahkan");
                    commentForm.setData("content", "");
                },
                onError: () => {
                    toast.error("Gagal menambah komentar");
                },
            }
        );
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Lampiran Tugas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="flex-1 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                            accept="*/*"
                        />
                        {!isNewTask && (
                            <Button
                                type="button"
                                onClick={handleFileUpload}
                                disabled={processing || !data.file}
                            >
                                {processing ? "Mengunggah..." : "Unggah"}
                            </Button>
                        )}
                    </div>
                    {isNewTask && (
                        <div className="space-y-2">
                            <p className="text-sm text-yellow-600">
                                File akan diunggah setelah tugas disimpan
                            </p>
                        </div>
                    )}
                </div>

                {localAttachments && localAttachments.length > 0 ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Berkas</TableHead>
                                <TableHead>Tipe</TableHead>
                                <TableHead>Diunggah</TableHead>
                                <TableHead className="text-right">
                                    Aksi
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {localAttachments.map((attachment) => (
                                <TableRow key={attachment.id}>
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
                                        {attachment.uploaded_at
                                            ? new Date(
                                                  attachment.uploaded_at
                                              ).toLocaleDateString("id-ID", {
                                                  year: "numeric",
                                                  month: "long",
                                                  day: "numeric",
                                                  hour: "2-digit",
                                                  minute: "2-digit",
                                              })
                                            : new Date(
                                                  attachment.created_at
                                              ).toLocaleDateString("id-ID", {
                                                  year: "numeric",
                                                  month: "long",
                                                  day: "numeric",
                                                  hour: "2-digit",
                                                  minute: "2-digit",
                                              })}
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
                                                    handleShowComments(
                                                        attachment
                                                    )
                                                }
                                            >
                                                <MessageSquareIcon className="h-4 w-4" />
                                                {attachment.comments.length >
                                                    0 && (
                                                    <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                                        {
                                                            attachment.comments
                                                                .length
                                                        }
                                                    </span>
                                                )}
                                            </Button>
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
                                                    handleDelete(attachment.id)
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
                        Belum ada lampiran
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
                                        console.error(
                                            "Gagal memuat gambar:",
                                            previewImage
                                        );
                                        e.currentTarget.src =
                                            "https://via.placeholder.com/400x300?text=Gagal+Memuat+Gambar";
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

            <Dialog
                open={showComments}
                onOpenChange={() => setShowComments(false)}
            >
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Komentar</DialogTitle>
                    </DialogHeader>
                    {selectedAttachment && (
                        <div className="space-y-4">
                            <div className="space-y-4 max-h-[400px] overflow-y-auto">
                                {selectedAttachment.comments.map((comment) => (
                                    <div
                                        key={comment.id}
                                        className="flex gap-3 items-start"
                                    >
                                        <Avatar>
                                            <AvatarImage
                                                src={comment.user.avatar}
                                                alt={comment.user.name}
                                            />
                                            <AvatarFallback>
                                                {comment.user.name
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <p className="font-medium">
                                                    {comment.user.name}
                                                </p>
                                                <span className="text-sm text-gray-500">
                                                    {new Date(
                                                        comment.created_at
                                                    ).toLocaleString("id-ID")}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-700 mt-1">
                                                {comment.content}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="space-y-2">
                                <Textarea
                                    placeholder="Tambah komentar..."
                                    value={commentForm.data.content}
                                    onChange={(e) =>
                                        commentForm.setData(
                                            "content",
                                            e.target.value
                                        )
                                    }
                                    className="min-h-[100px]"
                                />
                                <div className="flex justify-end">
                                    <Button
                                        type="button"
                                        onClick={handleAddComment}
                                        disabled={
                                            commentForm.processing ||
                                            !commentForm.data.content
                                        }
                                    >
                                        {commentForm.processing
                                            ? "Mengirim..."
                                            : "Kirim Komentar"}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </Card>
    );
}