import React from "react";
import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
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
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Task Details
                </h2>
            }
        >
            <Head title={task.title} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="mb-6">
                        <Button variant="ghost" asChild className="mb-4">
                            <Link href="/tasks">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Tasks
                            </Link>
                        </Button>
                        <div className="flex justify-between items-center">
                            <h1 className="text-2xl font-semibold">
                                {task.title}
                            </h1>
                            <Button variant="outline" asChild>
                                <Link href={`/tasks/${task.id}/edit`}>
                                    Edit Task
                                </Link>
                            </Button>
                        </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Task Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <h3 className="text-sm font-medium mb-2">
                                        Description
                                    </h3>
                                    <p className="text-gray-600">
                                        {task.description}
                                    </p>
                                </div>

                                <div className="flex items-center space-x-4 text-sm text-gray-600">
                                    <div className="flex items-center">
                                        <Calendar className="w-4 h-4 mr-1" />
                                        <span>
                                            Due: {formatDate(task.due_date)}
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <Users className="w-4 h-4 mr-1" />
                                        <span>
                                            Assigned to:{" "}
                                            {task.assignee?.name ||
                                                "Unassigned"}
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
                                        {task.status.replace("_", " ")}
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Project Information</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-sm font-medium mb-2">
                                            Project Name
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
                                        View Project
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>

                    <div className="mt-6">
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
