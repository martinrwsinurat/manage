import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@inertiajs/react";
import { ArrowLeft, Plus } from "lucide-react";
import { ProjectProgress } from "@/components/project/ProjectProgress";
import { ProjectBudget } from "@/components/project/ProjectBudget";
import { ProjectAttachments } from "@/components/project/ProjectAttachments";
import { ProjectTags } from "@/components/project/ProjectTags";
import { router } from "@inertiajs/react";
import { User } from "@/types";

interface Props {
    project: {
        id: number;
        name: string;
        description: string;
        start_date: string;
        end_date: string;
        progress: number;
        status: "not_started" | "in_progress" | "on_hold" | "completed";
        budget: number | null;
        spent_budget: number;
        category: string | null;
        tags: string[];
        attachments: Array<{
            filename: string;
            path: string;
            type: string;
            uploaded_at: string;
        }>;
        tasks: Array<{
            id: number;
            title: string;
            description: string;
            status: string;
            due_date: string;
        }>;
    };
    auth: {
        user: User;
    };
}

export default function Show({ project, auth }: Props) {
    const handleDuplicateTemplate = () => {
        if (
            confirm(
                "Are you sure you want to duplicate this project as a template?"
            )
        ) {
            router.post(route("projects.duplicate-template", project.id));
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={project.name} />

            <div className="min-h-screen bg-gradient-to-br from-orange-400 via-orange-500 to-orange-700 py-8 px-4">
                {/* Container dengan max-width yang lebih kecil dan centered */}
                <div className="max-w-7xl mx-auto">
                    {/* Header - Lebih compact */}
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-4">
                        <div className="flex items-center gap-4">
                            <Button variant="ghost" asChild className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                                <Link href="/projects">
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    <span className="font-semibold">Kembali</span>
                                </Link>
                            </Button>
                            <h1 className="text-2xl lg:text-3xl font-bold text-white drop-shadow-lg truncate">
                                {project.name}
                            </h1>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Button
                                variant="outline"
                                className="bg-white/20 hover:bg-white/30 text-white border-white/30 text-sm"
                                onClick={handleDuplicateTemplate}
                            >
                                Membuat salinan 
                            </Button>
                            <Button
                                variant="outline"
                                asChild
                                className="bg-white/20 hover:bg-white/30 text-white border-white/30 text-sm"
                            >
                                <Link href={route("projects.edit", project.id)}>
                                    Edit Projek
                                </Link>
                            </Button>
                            <Button asChild className="bg-white/90 hover:bg-white text-orange-700 font-bold text-sm">
                                <Link href={route("tasks.create")}>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Tambah Tugas    
                                </Link>
                            </Button>
                        </div>
                    </div>

                    {/* Main Content - Grid dengan breakpoint yang lebih baik */}
                    <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
                        {/* Left Column - Ambil 3 kolom dari 4 */}
                        <div className="xl:col-span-3 space-y-6">
                            {/* Project Details */}
                            <Card className="bg-white/90 backdrop-blur-sm shadow-xl">
                                <CardHeader className="pb-4">
                                    <CardTitle className="text-orange-700 text-lg">Detail Projek</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <h3 className="text-sm font-semibold text-orange-700 mb-2">Keterangan</h3>
                                        <p className="text-sm text-gray-700 leading-relaxed">{project.description}</p>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        <div>
                                            <h3 className="text-sm font-semibold text-orange-700 mb-1">Mulai dari</h3>
                                            <p className="text-sm text-gray-700">
                                                {new Date(project.start_date).toLocaleDateString('id-ID')}
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-semibold text-orange-700 mb-1">Sampai dengan</h3>
                                            <p className="text-sm text-gray-700">
                                                {new Date(project.end_date).toLocaleDateString('id-ID')}
                                            </p>
                                        </div>
                                        {project.category && (
                                            <div>
                                                <h3 className="text-sm font-semibold text-orange-700 mb-1">Kategori</h3>
                                                <p className="text-sm text-gray-700">{project.category}</p>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Progress & Budget - Grid yang lebih responsive */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <Card className="bg-white/90 backdrop-blur-sm shadow-xl">
                                    <CardContent className="p-6">
                                        <ProjectProgress
                                            progress={project.progress}
                                            status={project.status}
                                            totalTasks={project.tasks.length}
                                            completedTasks={
                                                project.tasks.filter(
                                                    (task) => task.status === "completed"
                                                ).length
                                            }
                                        />
                                    </CardContent>
                                </Card>
                                <Card className="bg-white/90 backdrop-blur-sm shadow-xl">
                                    <CardContent className="p-6">
                                        <ProjectBudget
                                            budget={project.budget}
                                            spentBudget={project.spent_budget}
                                            projectId={project.id}
                                        />
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Tasks */}
                            <Card className="bg-white/90 backdrop-blur-sm shadow-xl">
                                <CardHeader className="pb-4">
                                    <CardTitle className="text-orange-700 text-lg">Daftar Tugas</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {project.tasks.length > 0 ? (
                                        <div className="space-y-4">
                                            {project.tasks.map((task) => (
                                                <div
                                                    key={task.id}
                                                    className="flex flex-col lg:flex-row lg:items-center lg:justify-between p-4 border border-orange-200 rounded-lg bg-white/80 hover:bg-white/90 transition-colors"
                                                >
                                                    <div className="flex-1 min-w-0 mb-3 lg:mb-0 lg:mr-4">
                                                        <h3 className="font-semibold text-orange-800 truncate">
                                                            {task.title}
                                                        </h3>
                                                        <p className="text-sm text-gray-600 line-clamp-2">
                                                            {task.description}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-3 flex-shrink-0">
                                                        <span className="text-sm text-orange-700 font-semibold whitespace-nowrap">
                                                            {new Date(task.due_date).toLocaleDateString('id-ID')}
                                                        </span>
                                                        <div className="flex gap-2">
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                asChild
                                                                className="text-orange-700 hover:bg-orange-100"
                                                            >
                                                                <Link href={route("tasks.show", task.id)}>
                                                                    Detail
                                                                </Link>
                                                            </Button>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                asChild
                                                                className="text-orange-700 hover:bg-orange-100"
                                                            >
                                                                <Link href={route("tasks.edit", task.id)}>
                                                                    Edit
                                                                </Link>
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-8">
                                            <p className="text-gray-500 mb-4">Belum ada tugas</p>
                                            <Button asChild className="bg-orange-600 hover:bg-orange-700">
                                                <Link href={route("tasks.create")}>
                                                    <Plus className="mr-2 h-4 w-4" />
                                                    Tambah Tugas Pertama
                                                </Link>
                                            </Button>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Right Column - Sidebar yang lebih compact */}
                        <div className="xl:col-span-1 space-y-6">
                            <Card className="bg-white/90 backdrop-blur-sm shadow-xl">
                                <CardContent className="p-6">
                                    <ProjectTags tags={project.tags} projectId={project.id} />
                                </CardContent>
                            </Card>
                            <Card className="bg-white/90 backdrop-blur-sm shadow-xl">
                                <CardContent className="p-6">
                                    <ProjectAttachments attachments={project.attachments} projectId={project.id} />
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}