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
import { User } from "@/types";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Calendar, User as UserIcon } from "lucide-react";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";

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

const columns = [
    { id: "todo", title: "Belum Dikerjakan" },
    { id: "in_progress", title: "Sedang Dikerjakan" },
    { id: "completed", title: "Selesai" },
];

export default function Index({ auth, tasks }: Props) {
    const [taskState, setTaskState] = React.useState<Task[]>(tasks);

    const getTasksByStatus = (status: Task["status"]) =>
        taskState.filter((task) => task.status === status);

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return;
        const { source, destination, draggableId } = result;

        // Jika drop di kolom yang sama dan urutan sama, tidak perlu update
        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) {
            return;
        }

        const taskId = parseInt(draggableId);
        const task = taskState.find((t) => t.id === taskId);
        if (!task) return;

        const newStatus = destination.droppableId as Task["status"];
        setTaskState((prev) =>
            prev.map((t) =>
                t.id === taskId ? { ...t, status: newStatus } : t
            )
        );
        // TODO: Kirim update ke backend jika ingin persist perubahan status
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Daftar Tugas
                </h2>
            }
        >
            <Head title="Tugas" />

            <div
                className="py-12 min-h-screen"
                style={{
                    background: "linear-gradient(135deg, #ff9800 0%, #ffb74d 100%)",
                }}
            >
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="mb-6 flex justify-between items-center">
                        <h1 className="text-2xl font-semibold">Tugas Saya</h1>
                        <Button asChild>
                            <Link href="/tasks/create">Buat Tugas</Link>
                        </Button>
                    </div>

                    <DragDropContext onDragEnd={onDragEnd}>
                        <div className="grid gap-6 md:grid-cols-3">
                            {columns.map((col) => (
                                <Droppable droppableId={col.id} key={col.id}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            className={`min-h-[200px] p-2 rounded-lg transition-colors ${
                                                snapshot.isDraggingOver
                                                    ? "bg-orange-100"
                                                    : ""
                                            }`}
                                        >
                                            <h3 className="text-lg font-medium mb-4">{col.title}</h3>
                                            <div className="space-y-4">
                                                {getTasksByStatus(col.id as Task["status"]).map((task, i) => (
                                                    <Draggable
                                                        key={task.id}
                                                        draggableId={task.id.toString()}
                                                        index={i}
                                                    >
                                                        {(provided, snapshot) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                style={{
                                                                    ...provided.draggableProps.style,
                                                                    opacity: snapshot.isDragging ? 0.7 : 1,
                                                                }}
                                                            >
                                                                <TaskCard task={task} />
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </div>
                                        </div>
                                    )}
                                </Droppable>
                            ))}
                        </div>
                    </DragDropContext>
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
                        {task.status === "todo"
                            ? "Belum Dikerjakan"
                            : task.status === "in_progress"
                            ? "Sedang Dikerjakan"
                            : "Selesai"}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="py-2">
                <p className="text-sm text-gray-600">{task.description}</p>
                <div className="mt-2 space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>Jatuh Tempo: {formatDate(task.due_date)}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                        <UserIcon className="w-4 h-4 mr-1" />
                        <span>
                            Ditugaskan kepada: {task.assignee?.name || "Belum Ditugaskan"}
                        </span>
                    </div>
                    <div className="text-sm text-gray-600">
                        Proyek:{" "}
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
                    <Link href={`/tasks/${task.id}`}>Lihat Detail</Link>
                </Button>
            </CardFooter>
        </Card>
    );
}