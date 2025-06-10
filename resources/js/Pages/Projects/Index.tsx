import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Progress } from "@/Components/ui/progress";
import { User } from "@/types";
import { formatDate } from "@/lib/utils";
import { Users, Calendar } from "lucide-react";

interface Task {
    id: number;
    title: string;
    status: "todo" | "in_progress" | "completed";
    assigned_to: {
        id: number;
        name: string;
    } | null;
}

interface Project {
    id: number;
    name: string;
    description: string;
    start_date: string;
    end_date: string;
    tasks: Task[];
}

interface Props {
    auth: {
        user: User;
    };
    projects: Project[];
}

export default function Index({ auth, projects }: Props) {
    return (
        <AuthenticatedLayout>
            <Head title="Projects" />

            <div className="py-12 bg-orange-50 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold leading-tight text-orange-800 mb-2">
                            Projek
                        </h2>
                        <p className="text-orange-600">Tuangkan idemu dalam projek</p>
                    </div>
                    
                    <div className="mb-6 flex justify-between items-center">
                        <h1 className="text-2xl font-semibold text-orange-900">TUGAS SAYA</h1>
                        <Button asChild className="bg-orange-600 hover:bg-orange-700 text-white">
                            <Link href="/projects/create">Buat projek</Link>
                        </Button>
                    </div>

                    {/* Ubah grid agar card lebih lebar */}
                    <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
                        {projects.map((project) => {
                            const completedTasks = project.tasks.filter(
                                (task) => task.status === "completed"
                            ).length;
                            const progress =
                                project.tasks.length > 0
                                    ? Math.round(
                                          (completedTasks /
                                              project.tasks.length) *
                                              100
                                      )
                                    : 0;

                            return (
                                <Card key={project.id} className="border-orange-200 shadow-lg hover:shadow-xl transition-shadow bg-white">
                                    <CardHeader className="bg-gradient-to-r from-orange-100 to-orange-200">
                                        <CardTitle className="text-orange-900">{project.name}</CardTitle>
                                        <CardDescription className="text-orange-700">
                                            {project.description}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="pt-6">
                                        <div className="space-y-4">
                                            <div>
                                                <h3 className="text-sm font-medium text-orange-800">
                                                    Progress
                                                </h3>
                                                <Progress
                                                    value={progress}
                                                    className="w-full [&>div]:bg-orange-500"
                                                />
                                                <p className="text-sm text-orange-600 mt-1">
                                                    {progress}% Complete (
                                                    {completedTasks} of{" "}
                                                    {project.tasks.length}{" "}
                                                    tasks)
                                                </p>
                                            </div>

                                            <div className="flex items-center space-x-4 text-sm text-orange-600">
                                                <div className="flex items-center">
                                                    <Calendar className="w-4 h-4 mr-1 text-orange-500" />
                                                    <span>
                                                        {formatDate(
                                                            project.start_date
                                                        )}{" "}
                                                        -{" "}
                                                        {formatDate(
                                                            project.end_date
                                                        )}
                                                    </span>
                                                </div>
                                                <div className="flex items-center">
                                                    <Users className="w-4 h-4 mr-1 text-orange-500" />
                                                    <span>
                                                        {
                                                            project.tasks.filter(
                                                                (task) =>
                                                                    task.assigned_to
                                                            ).length
                                                        }{" "}
                                                        Members
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button
                                            variant="outline"
                                            className="w-full border-orange-300 text-orange-700 hover:bg-orange-100 hover:border-orange-400"
                                            asChild
                                        >
                                            <Link
                                                href={`/projects/${project.id}`}
                                            >
                                                Detail projek
                                            </Link>
                                        </Button>
                                    </CardFooter>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}