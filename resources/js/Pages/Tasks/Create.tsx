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
        user: User & { role: string }; // pastikan ada role
    };
}

// Helper: cek apakah user boleh assign/create task
function canCreateTask(role: string) {
    return role === "admin" || role === "project_manager";
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
                        "Silakan pilih tanggal jatuh tempo baru yang sesuai dengan rentang waktu proyek"
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
            setDateError("Silakan pilih proyek terlebih dahulu");
            return;
        }
        if (!date) {
            setDateError("Silakan pilih tanggal jatuh tempo");
            return;
        }

        post(route("tasks.store"), {
            onSuccess: () => {
                toast.success("Tugas berhasil dibuat");
                reset();
                router.visit(route("tasks.index"));
            },
            onError: (errors) => {
                toast.error("Gagal membuat tugas");
                console.error("Task creation errors:", errors);
            },
        });
    };

    // Jika user tidak punya izin, tampilkan pesan error
    if (!canCreateTask(auth.user.role)) {
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
                                Anda tidak memiliki izin untuk membuat tugas.
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
            <Head title="Buat Tugas" />

            <div
                className="py-12 min-h-screen"
                style={{
                    background: "linear-gradient(135deg, #ff9800 0%, #ffb74d 100%)",
                }}
            >
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="mb-6">
                        <Button
                            variant="ghost"
                            asChild
                            className="mb-4 bg-white/70 hover:bg-white/90 text-orange-700"
                        >
                            <Link href="/tasks">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Kembali ke Daftar Tugas
                            </Link>
                        </Button>
                        <h1 className="text-3xl font-bold text-white drop-shadow-lg">
                            Buat Tugas
                        </h1>
                    </div>

                    <Card className="shadow-2xl border-0 bg-white/90">
                        <form onSubmit={handleSubmit}>
                            <CardHeader>
                                <CardTitle className="text-orange-700">
                                    Detail Tugas
                                </CardTitle>
                                <CardDescription className="text-orange-500">
                                    Isi detail tugas di bawah ini.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="title"
                                        className="text-orange-700 font-semibold"
                                    >
                                        Judul Tugas
                                    </Label>
                                    <Input
                                        id="title"
                                        value={data.title}
                                        onChange={(e) =>
                                            setData("title", e.target.value)
                                        }
                                        required
                                        className="focus:border-orange-400"
                                        placeholder="Masukkan judul tugas"
                                    />
                                    {errors.title && (
                                        <p className="text-sm text-red-500">
                                            {errors.title}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label
                                        htmlFor="description"
                                        className="text-orange-700 font-semibold"
                                    >
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
                                        className="focus:border-orange-400"
                                        placeholder="Masukkan deskripsi tugas"
                                    />
                                    {errors.description && (
                                        <p className="text-sm text-red-500">
                                            {errors.description}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label
                                        htmlFor="project_id"
                                        className="text-orange-700 font-semibold"
                                    >
                                        Proyek
                                    </Label>
                                    <Select
                                        value={data.project_id}
                                        onValueChange={handleProjectChange}
                                    >
                                        <SelectTrigger className="focus:border-orange-400">
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
                                    <Label
                                        htmlFor="assigned_to"
                                        className="text-orange-700 font-semibold"
                                    >
                                        Tugaskan Kepada
                                    </Label>
                                    <Select
                                        value={data.assigned_to}
                                        onValueChange={(value) =>
                                            setData("assigned_to", value)
                                        }
                                    >
                                        <SelectTrigger className="focus:border-orange-400">
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
                                    <Label
                                        htmlFor="status"
                                        className="text-orange-700 font-semibold"
                                    >
                                        Status
                                    </Label>
                                    <Select
                                        value={data.status}
                                        onValueChange={(
                                            value:
                                                | "todo"
                                                | "in_progress"
                                                | "completed"
                                        ) => setData("status", value)}
                                    >
                                        <SelectTrigger className="focus:border-orange-400">
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
                                    <Label className="text-orange-700 font-semibold">
                                        Tanggal Jatuh Tempo
                                    </Label>
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
                                <Button
                                    variant="outline"
                                    asChild
                                    className="border-orange-400 text-orange-700 hover:bg-orange-50"
                                >
                                    <Link href="/tasks">Batal</Link>
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={processing || !!dateError}
                                    className="bg-gradient-to-r from-orange-400 to-orange-600 text-white font-semibold hover:from-orange-500 hover:to-orange-700"
                                >
                                    {processing ? "Membuat..." : "Buat Tugas"}
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}