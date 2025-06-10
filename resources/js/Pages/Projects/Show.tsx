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

            <div className="min-h-screen bg-gradient-to-br from-orange-400 via-orange-500 to-orange-700 py-12">
                <div className="max-w-6xl mx-auto px-4">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
                        <div className="flex items-center gap-4 mb-4 md:mb-0">
                            <Button variant="ghost" asChild className="bg-white/30 hover:bg-white/50 text-white">
                                <Link href="/projects">
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    <span className="font-semibold">Back</span>
                                </Link>
                            </Button>
                            <h1 className="text-3xl font-bold text-white drop-shadow-lg">{project.name}</h1>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                className="bg-white/30 hover:bg-white/50 text-white border-white"
                                onClick={handleDuplicateTemplate}
                            >
                                Duplicate as Template
                            </Button>
                            <Button
                                variant="outline"
                                asChild
                                className="bg-white/30 hover:bg-white/50 text-white border-white"
                            >
                                <Link href={route("projects.edit", project.id)}>
                                    Edit Project
                                </Link>
                            </Button>
                            <Button asChild className="bg-white/80 hover:bg-white text-orange-700 font-bold">
                                <Link href={route("tasks.create")}>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Task
                                </Link>
                            </Button>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Project Details */}
                            <Card className="bg-white/80 shadow-lg">
                                <CardHeader>
                                    <CardTitle className="text-orange-700">Project Details</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <h3 className="text-sm font-medium text-orange-700">Description</h3>
                                        <p className="mt-1 text-sm text-gray-700">{project.description}</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <h3 className="text-sm font-medium text-orange-700">Start Date</h3>
                                            <p className="mt-1 text-sm text-gray-700">
                                                {new Date(project.start_date).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-orange-700">End Date</h3>
                                            <p className="mt-1 text-sm text-gray-700">
                                                {new Date(project.end_date).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    {project.category && (
                                        <div>
                                            <h3 className="text-sm font-medium text-orange-700">Category</h3>
                                            <p className="mt-1 text-sm text-gray-700">{project.category}</p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Progress & Budget */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="bg-white/80 rounded-xl shadow-lg p-4">
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
                                </div>
                                <div className="bg-white/80 rounded-xl shadow-lg p-4">
                                    <ProjectBudget
                                        budget={project.budget}
                                        spentBudget={project.spent_budget}
                                        projectId={project.id}
                                    />
                                </div>
                            </div>

                            {/* Tasks */}
                            <Card className="bg-white/80 shadow-lg">
                                <CardHeader>
                                    <CardTitle className="text-orange-700">Tasks</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {project.tasks.length > 0 ? (
                                        <div className="space-y-4">
                                            {project.tasks.map((task) => (
                                                <div
                                                    key={task.id}
                                                    className="flex flex-col md:flex-row md:items-center md:justify-between p-4 border border-orange-200 rounded-lg bg-white/60"
                                                >
                                                    <div>
                                                        <h3 className="font-medium text-orange-800">{task.title}</h3>
                                                        <p className="text-sm text-gray-600">{task.description}</p>
                                                    </div>
                                                    <div className="flex items-center gap-4 mt-2 md:mt-0">
                                                        <span className="text-sm text-orange-700 font-semibold">
                                                            {new Date(task.due_date).toLocaleDateString()}
                                                        </span>
                                                        <Button
                                                            variant="ghost"
                                                            asChild
                                                            className="text-orange-700 hover:bg-orange-100"
                                                        >
                                                            <Link href={route("tasks.show", task.id)}>
                                                                Detail
                                                            </Link>
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            asChild
                                                            className="text-orange-700 hover:bg-orange-100"
                                                        >
                                                            <Link href={route("tasks.edit", task.id)}>
                                                                Edit
                                                            </Link>
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-center text-gray-500">No tasks yet</p>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-8">
                            <div className="bg-white/80 rounded-xl shadow-lg p-4">
                                <ProjectTags tags={project.tags} projectId={project.id} />
                            </div>
                            <div className="bg-white/80 rounded-xl shadow-lg p-4">
                                <ProjectAttachments attachments={project.attachments} projectId={project.id} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}