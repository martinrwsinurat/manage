import React from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Link, useForm, Head, router } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";
import { User } from "@/types";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { TaskAttachments } from "@/components/task/TaskAttachments";

interface Project {
    id: number;
    name: string;
    start_date: string;
    end_date: string;
}

interface Props {
    projects: Project[];
    users: User[];
    auth: {
        user: User;
    };
}

export default function Create({ auth, users, projects }: Props) {
    const [date, setDate] = React.useState<Date | undefined>();
    const [dateError, setDateError] = React.useState<string>("");

    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        description: "",
        project_id: "",
        assigned_to: "",
        status: "todo",
        due_date: "",
    });

    const selectedProject = projects.find(
        (p) => p.id === parseInt(data.project_id)
    );
    const projectStartDate = selectedProject
        ? new Date(selectedProject.start_date)
        : undefined;
    const projectEndDate = selectedProject
        ? new Date(selectedProject.end_date)
        : undefined;

    const handleDateChange = (newDate: Date | undefined) => {
        setDate(newDate);
        setDateError("");

        if (newDate) {
            if (projectStartDate && newDate < projectStartDate) {
                setDateError(
                    `Due date cannot be before project start date (${projectStartDate.toLocaleDateString()})`
                );
                return;
            }
            if (projectEndDate && newDate > projectEndDate) {
                setDateError(
                    `Due date cannot be after project end date (${projectEndDate.toLocaleDateString()})`
                );
                return;
            }
            setData("due_date", newDate.toISOString().split("T")[0]);
        }
    };

    const handleProjectChange = (value: string) => {
        setData("project_id", value);
        // Reset date if it's outside the new project's timeline
        if (date) {
            const newProject = projects.find((p) => p.id === parseInt(value));
            if (newProject) {
                const newStartDate = new Date(newProject.start_date);
                const newEndDate = new Date(newProject.end_date);
                if (date < newStartDate || date > newEndDate) {
                    setDate(undefined);
                    setData("due_date", "");
                    setDateError(
                        "Please select a new due date within the project timeline"
                    );
                }
            }
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (dateError) {
            return;
        }
        if (!data.project_id) {
            setDateError("Please select a project first");
            return;
        }
        if (!date) {
            setDateError("Please select a due date");
            return;
        }

        post(route("tasks.store"), {
            onSuccess: () => {
                toast.success("Task created successfully");
                reset();
                router.visit(route("tasks.index"));
            },
            onError: (errors) => {
                toast.error("Failed to create task");
                console.error("Task creation errors:", errors);
            },
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Create Task" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="mb-6">
                        <Button variant="ghost" asChild className="mb-4">
                            <Link href="/tasks">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Tasks
                            </Link>
                        </Button>
                        <h1 className="text-2xl font-semibold">Create Task</h1>
                    </div>

                    <Card>
                        <form onSubmit={handleSubmit}>
                            <CardHeader>
                                <CardTitle>Task Details</CardTitle>
                                <CardDescription>
                                    Fill in the task details below.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Task Title</Label>
                                    <Input
                                        id="title"
                                        value={data.title}
                                        onChange={(e) =>
                                            setData("title", e.target.value)
                                        }
                                        required
                                    />
                                    {errors.title && (
                                        <p className="text-sm text-red-500">
                                            {errors.title}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">
                                        Description
                                    </Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                "description",
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                    {errors.description && (
                                        <p className="text-sm text-red-500">
                                            {errors.description}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="project_id">Project</Label>
                                    <Select
                                        value={data.project_id}
                                        onValueChange={handleProjectChange}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a project" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {projects.map((project) => (
                                                <SelectItem
                                                    key={project.id}
                                                    value={project.id.toString()}
                                                >
                                                    {project.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.project_id && (
                                        <p className="text-sm text-red-500">
                                            {errors.project_id}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="assigned_to">
                                        Assign To
                                    </Label>
                                    <Select
                                        value={data.assigned_to}
                                        onValueChange={(value) =>
                                            setData("assigned_to", value)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a user" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {users.map((user) => (
                                                <SelectItem
                                                    key={user.id}
                                                    value={user.id.toString()}
                                                >
                                                    {user.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.assigned_to && (
                                        <p className="text-sm text-red-500">
                                            {errors.assigned_to}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="status">Status</Label>
                                    <Select
                                        value={data.status}
                                        onValueChange={(
                                            value:
                                                | "todo"
                                                | "in_progress"
                                                | "completed"
                                        ) => setData("status", value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="todo">
                                                To Do
                                            </SelectItem>
                                            <SelectItem value="in_progress">
                                                In Progress
                                            </SelectItem>
                                            <SelectItem value="completed">
                                                Completed
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.status && (
                                        <p className="text-sm text-red-500">
                                            {errors.status}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label>Due Date</Label>
                                    <DatePicker
                                        date={date}
                                        onDateChange={handleDateChange}
                                    />
                                    {dateError && (
                                        <Alert variant="destructive">
                                            <AlertCircle className="h-4 w-4" />
                                            <AlertDescription>
                                                {dateError}
                                            </AlertDescription>
                                        </Alert>
                                    )}
                                    {errors.due_date && (
                                        <p className="text-sm text-red-500">
                                            {errors.due_date}
                                        </p>
                                    )}
                                </div>

                                <div className="mt-6">
                                    <TaskAttachments
                                        attachments={[]}
                                        taskId={0}
                                        currentUser={auth.user}
                                    />
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-end space-x-4">
                                <Button variant="outline" asChild>
                                    <Link href="/tasks">Cancel</Link>
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={processing || !!dateError}
                                >
                                    {processing ? "Creating..." : "Create Task"}
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
