import React from "react";
import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Calendar, Users } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { User } from "@/types";
import { Badge } from "@/components/ui/badge";
import { TaskAttachments } from "@/components/task/TaskAttachments";

interface Props {
    task: {
        id: number;
        title: string;
        description: string;
        status: string;
        due_date: string;
        project: {
            id: number;
            name: string;
        };
        assignee: {
            id: number;
            name: string;
        } | null;
        attachments: {
            id: number;
            filename: string;
            path: string;
            type: string;
            uploaded_at: string;
            comments: {
                id: number;
                content: string;
                user: {
                    id: number;
                    name: string;
                    avatar?: string;
                };
                created_at: string;
            }[];
        }[];
    };
    auth: {
        user: User;
    };
}

export default function Show({ auth, task }: Props) {
    // Ubah status ke bahasa Indonesia
    const statusLabel =
        task.status === "todo"
            ? "Belum Dikerjakan"
            : task.status === "in_progress"
            ? "Sedang Dikerjakan"
            : "Selesai";

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Detail Tugas
                </h2>
            }
        >
            <Head title={task.title} />

            <div
                className="py-12 min-h-screen"
                style={{
                    background: "linear-gradient(135deg, #ff9800 0%, #ffb74d 100%)",
                }}
            >
                <div className="max-w-5xl mx-auto sm:px-6 lg:px-8">
                    <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <Button variant="ghost" asChild className="mb-2 md:mb-0">
                            <Link href="/tasks">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Kembali ke Daftar Tugas
                            </Link>
                        </Button>
                        <div className="flex flex-col md:flex-row md:items-center md:gap-4 w-full md:w-auto">
                            <h1 className="text-2xl font-semibold mb-2 md:mb-0 text-gray-900">
                                {task.title}
                            </h1>
                            <Button variant="outline" asChild>
                                <Link href={`/tasks/${task.id}/edit`}>
                                    Edit Tugas
                                </Link>
                            </Button>
                        </div>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2">
                        <Card className="shadow-lg">
                            <CardHeader>
                                <CardTitle>Informasi Tugas</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div>
                                    <h3 className="text-sm font-medium mb-2">
                                        Deskripsi
                                    </h3>
                                    <p className="text-gray-700">
                                        {task.description}
                                    </p>
                                </div>

                                <div className="flex flex-col gap-2 text-sm text-gray-700">
                                    <div className="flex items-center">
                                        <Calendar className="w-4 h-4 mr-1" />
                                        <span>
                                            Jatuh Tempo: {formatDate(task.due_date)}
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <Users className="w-4 h-4 mr-1" />
                                        <span>
                                            Ditugaskan kepada:{" "}
                                            {task.assignee?.name ||
                                                "Belum Ditugaskan"}
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium mb-2">
                                        Status
                                    </h3>
                                    <Badge
                                        variant={
                                            task.status === "completed"
                                                ? "success"
                                                : task.status === "in_progress"
                                                ? "warning"
                                                : "secondary"
                                        }
                                    >
                                        {statusLabel}
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="shadow-lg">
                            <CardHeader>
                                <CardTitle>Informasi Proyek</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-sm font-medium mb-2">
                                            Nama Proyek
                                        </h3>
                                        <Link
                                            href={`/projects/${task.project.id}`}
                                            className="text-primary hover:underline"
                                        >
                                            {task.project.name}
                                        </Link>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    asChild
                                >
                                    <Link href={`/projects/${task.project.id}`}>
                                        Lihat Proyek
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>

                    <div className="mt-8">
                        <TaskAttachments
                            attachments={task.attachments}
                            taskId={task.id}
                            currentUser={auth.user}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}