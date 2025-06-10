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
import { User } from "@/types";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Calendar, User as UserIcon } from "lucide-react";

interface Task {
    id: number;
    title: string;
    description: string;
    status: "todo" | "in_progress" | "completed";
    due_date: string;
    project: {
        id: number;
        name: string;
    };
    assignee: {
        id: number;
        name: string;
    } | null;
}

interface Props {
    auth: {
        user: User;
    };
    tasks: Task[];
}

export default function Index({ auth, tasks }: Props) {
    const tasksByStatus = {
        todo: tasks.filter((task) => task.status === "todo"),
        in_progress: tasks.filter((task) => task.status === "in_progress"),
        completed: tasks.filter((task) => task.status === "completed"),
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Tasks
                </h2>
            }
        >
            <Head title="Tasks" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="mb-6 flex justify-between items-center">
                        <h1 className="text-2xl font-semibold">My Tasks</h1>
                        <Button asChild>
                            <Link href="/tasks/create">Create Task</Link>
                        </Button>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        <div>
                            <h3 className="text-lg font-medium mb-4">To Do</h3>
                            <div className="space-y-4">
                                {tasksByStatus.todo.map((task) => (
                                    <TaskCard key={task.id} task={task} />
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-medium mb-4">
                                In Progress
                            </h3>
                            <div className="space-y-4">
                                {tasksByStatus.in_progress.map((task) => (
                                    <TaskCard key={task.id} task={task} />
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-medium mb-4">
                                Completed
                            </h3>
                            <div className="space-y-4">
                                {tasksByStatus.completed.map((task) => (
                                    <TaskCard key={task.id} task={task} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function TaskCard({ task }: { task: Task }) {
    return (
        <Card>
            <CardHeader className="py-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{task.title}</CardTitle>
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
            </CardHeader>
            <CardContent className="py-2">
                <p className="text-sm text-gray-600">{task.description}</p>
                <div className="mt-2 space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>Due: {formatDate(task.due_date)}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                        <UserIcon className="w-4 h-4 mr-1" />
                        <span>
                            Assigned to: {task.assignee?.name || "Unassigned"}
                        </span>
                    </div>
                    <div className="text-sm text-gray-600">
                        Project:{" "}
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
                <Button variant="outline" className="w-full" asChild>
                    <Link href={`/tasks/${task.id}`}>View Details</Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
