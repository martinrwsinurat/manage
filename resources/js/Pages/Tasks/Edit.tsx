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
import { Link, useForm, Head } from "@inertiajs/react";
import { ArrowLeft, AlertCircle } from "lucide-react";
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

interface Project {
    id: number;
    name: string;
    start_date: string;
    end_date: string;
}

interface Props {
    task: {
        id: number;
        title: string;
        description: string;
        status: string;
        due_date: string;
        project_id: number;
        assigned_to: number | null;
        attachments: any[];
    };
    projects: Project[];
    users: User[];
    auth: {
        user: User & { role: string };
    };
}

// Helper: cek apakah user boleh update task
function canUpdateTask(user: User & { role: string }, task: { assigned_to: number | null }) {
    if (user.role === "project_manager") return true;
    if (user.role === "team_member" && user.id === task.assigned_to) return true;
    return false;
}

export default function Edit({ auth, task, users, projects }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        title: task.title,
        description: task.description,
        project_id: task.project_id.toString(),
        assigned_to: task.assigned_to?.toString() || "",
        status: task.status,
        due_date: task.due_date,
    });

    const [date, setDate] = React.useState<Date | undefined>(
        task.due_date ? new Date(task.due_date) : undefined
    );
    const [dateError, setDateError] = React.useState<string>("");

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
                    `Tanggal jatuh tempo tidak boleh sebelum tanggal mulai proyek (${projectStartDate.toLocaleDateString()})`
                );
                return;
            }
            if (projectEndDate && newDate > projectEndDate) {
                setDateError(
                    `Tanggal jatuh tempo tidak boleh setelah tanggal selesai proyek (${projectEndDate.toLocaleDateString()})`
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
                        "Silakan pilih tanggal jatuh tempo baru sesuai rentang proyek"
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
        put(route("tasks.update", task.id));
    };

    // Permission check
    if (!canUpdateTask(auth.user, task)) {
        return (
            <AuthenticatedLayout user={auth.user}>
                <Head title="Akses Ditolak" />
                <div className="py-12 min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-300">
                    <Card className="max-w-md w-full shadow-2xl border-0 bg-white/90">
                        <CardHeader>
                            <CardTitle className="text-red-600">
                                Akses Ditolak
                            </CardTitle>
                            <CardDescription>
                                Anda tidak memiliki izin untuk mengedit tugas ini.
                            </CardDescription>
                        </CardHeader>
                        <CardFooter className="flex justify-end">
                            <Button
                                asChild
                                variant="outline"
                                className="border-orange-400 text-orange-700 hover:bg-orange-50"
                            >
                                <Link href="/tasks">
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Kembali ke Daftar Tugas
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </AuthenticatedLayout>
        );
    }

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Edit Tugas" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="mb-6">
                        <Button variant="ghost" asChild className="mb-4">
                            <Link href="/tasks">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Kembali ke Daftar Tugas
                            </Link>
                        </Button>
                        <h1 className="text-2xl font-semibold">Edit Tugas</h1>
                    </div>

                    <Card>
                        <form onSubmit={handleSubmit}>
                            <CardHeader>
                                <CardTitle>Detail Tugas</CardTitle>
                                <CardDescription>
                                    Perbarui detail tugas di bawah ini.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Judul Tugas</Label>
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
                                        Deskripsi
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
                                    <Label htmlFor="project_id">Proyek</Label>
                                    <Select
                                        value={data.project_id}
                                        onValueChange={handleProjectChange}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih proyek" />
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
                                        Ditugaskan Kepada
                                    </Label>
                                    <Select
                                        value={data.assigned_to}
                                        onValueChange={(value) =>
                                            setData("assigned_to", value)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih pengguna" />
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
                                            <SelectValue placeholder="Pilih status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="todo">
                                                Belum Dikerjakan
                                            </SelectItem>
                                            <SelectItem value="in_progress">
                                                Sedang Dikerjakan
                                            </SelectItem>
                                            <SelectItem value="completed">
                                                Selesai
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
                                    <Label>Tanggal Jatuh Tempo</Label>
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
                            </CardContent>
                            <CardFooter className="flex justify-end space-x-4">
                                <Button variant="outline" asChild>
                                    <Link href="/tasks">Batal</Link>
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={processing || !!dateError}
                                >
                                    {processing ? "Menyimpan..." : "Simpan Perubahan"}
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}