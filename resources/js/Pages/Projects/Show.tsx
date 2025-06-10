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

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="mb-6">
                        <Button variant="ghost" asChild className="mb-4">
                            <Link href="/projects">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Projects
                            </Link>
                        </Button>
                        <div className="flex justify-between items-center">
                            <h1 className="text-2xl font-semibold">
                                {project.name}
                            </h1>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    onClick={handleDuplicateTemplate}
                                >
                                    Duplicate as Template
                                </Button>
                                <Button variant="outline" asChild>
                                    <Link
                                        href={route(
                                            "projects.edit",
                                            project.id
                                        )}
                                    >
                                        Edit Project
                                    </Link>
                                </Button>
                                <Button asChild>
                                    <Link href={route("tasks.create")}>
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add Task
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Project Details</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <h3 className="text-sm font-medium">
                                            Description
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">
                                            {project.description}
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <h3 className="text-sm font-medium">
                                                Start Date
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-500">
                                                {new Date(
                                                    project.start_date
                                                ).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium">
                                                End Date
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-500">
                                                {new Date(
                                                    project.end_date
                                                ).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    {project.category && (
                                        <div>
                                            <h3 className="text-sm font-medium">
                                                Category
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-500">
                                                {project.category}
                                            </p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

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

                            <ProjectBudget
                                budget={project.budget}
                                spentBudget={project.spent_budget}
                                projectId={project.id}
                            />
                        </div>

                        <div className="space-y-6">
                            <ProjectTags
                                tags={project.tags}
                                projectId={project.id}
                            />

                            <ProjectAttachments
                                attachments={project.attachments}
                                projectId={project.id}
                            />

                            <Card>
                                <CardHeader>
                                    <CardTitle>Tasks</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {project.tasks.length > 0 ? (
                                        <div className="space-y-4">
                                            {project.tasks.map((task) => (
                                                <div
                                                    key={task.id}
                                                    className="flex items-center justify-between p-4 border rounded-lg"
                                                >
                                                    <div>
                                                        <h3 className="font-medium">
                                                            {task.title}
                                                        </h3>
                                                        <p className="text-sm text-gray-500">
                                                            {task.description}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <span className="text-sm text-gray-500">
                                                            {new Date(
                                                                task.due_date
                                                            ).toLocaleDateString()}
                                                        </span>
                                                        <Button
                                                            variant="ghost"
                                                            asChild
                                                        >
                                                            <Link
                                                                href={route(
                                                                    "tasks.show",
                                                                    task.id
                                                                )}
                                                            >
                                                                detail
                                                            </Link>
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            asChild
                                                        >
                                                            <Link
                                                                href={route(
                                                                    "tasks.edit",
                                                                    task.id
                                                                )}
                                                            >
                                                                Edit
                                                            </Link>
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-center text-gray-500">
                                            No tasks yet
                                        </p>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
