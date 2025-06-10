import { PageProps } from "@/types";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import {
    FolderKanban,
    CheckSquare,
    Users,
    Clock,
    Calendar,
    AlertCircle,
    UserPlus,
    Mail,
    MessageSquare,
    User,
} from "lucide-react";
import { Link } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { ChartComp } from "@/Components/ui/ChartComp";
import { Progress } from "@/Components/ui/progress";
import { Badge } from "@/Components/ui/badge";

// Warna-warna custom sesuai screenshot
const orangeBg = "bg-[#FFF6ED]";
const orangeCard = "bg-[#FFE3C6]";
const orangeText = "text-[#B05A00]";
const orangeButton = "bg-[#FF7300] hover:bg-[#FF8C1A] text-white";
const orangeProgress = "bg-[#FF7300]";
const greenProgress = "bg-[#B6E2C6]";
const greenText = "text-[#2E7D32]";
const borderOrange = "border-[#FF7300]";
const borderGreen = "border-[#B6E2C6]";

interface DashboardProps extends PageProps {
    stats: {
        activeProjects: number;
        tasksDueSoon: number;
        completedTasks: number;
        teamMembers: number;
    };
    projectProgress: {
        name: string;
        progress: number;
    }[];
    recentTasks: {
        id: number;
        title: string;
        project: string;
        dueDate: string;
        status: string;
    }[];
    upcomingDeadlines: {
        id: number;
        title: string;
        project: string;
        dueDate: string;
        priority: string;
    }[];
    teamMembers: {
        id: number;
        name: string;
        role: string;
        email: string;
        avatar: string;
        status: "online" | "offline" | "away";
    }[];
}

export default function Dashboard({
    stats,
    projectProgress,
    recentTasks,
    upcomingDeadlines,
    teamMembers,
}: DashboardProps) {
    const getStatusBadge = (status: string) => {
        switch (status) {
            case "online":
                return <Badge variant="default" className="bg-green-500 hover:bg-green-600">Online</Badge>;
            case "away":
                return <Badge variant="secondary" className="bg-yellow-500 hover:bg-yellow-600 text-white">Away</Badge>;
            default:
                return <Badge variant="outline" className="text-gray-500">Offline</Badge>;
        }
    };

    const getRoleBadge = (role: string) => {
        const roleColors: { [key: string]: string } = {
            'admin': 'bg-red-500 hover:bg-red-600',
            'manager': 'bg-blue-500 hover:bg-blue-600',
            'developer': 'bg-purple-500 hover:bg-purple-600',
            'designer': 'bg-pink-500 hover:bg-pink-600',
            'qa': 'bg-orange-500 hover:bg-orange-600',
            'default': 'bg-gray-500 hover:bg-gray-600'
        };
        const colorClass = roleColors[role.toLowerCase()] || roleColors.default;
        return <Badge className={`${colorClass} text-white`}>{role}</Badge>;
    };

    return (
        <AuthenticatedLayout>
            <div className={`${orangeBg} min-h-screen py-8 px-4`}>
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className={`text-3xl font-bold ${orangeText}`}>Projek</h1>
                        <p className="mt-1 text-base text-[#B05A00]">Tuangkan idemu dalam projek</p>
                    </div>
                    <Button asChild className={`${orangeButton} rounded-lg px-6 py-2 font-semibold`}>
                        <Link href={route("projects.create")}>Buat projek</Link>
                    </Button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                    <Card className={`${orangeCard} shadow-none`}>
                        <CardContent className="p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 bg-white rounded-md p-3">
                                    <FolderKanban className="h-6 w-6 text-[#FF7300]" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dt className={`text-sm font-medium ${orangeText} truncate`}>
                                        projek aktif
                                    </dt>
                                    <dd className="flex items-baseline">
                                        <div className={`text-2xl font-semibold ${orangeText}`}>
                                            {stats.activeProjects}
                                        </div>
                                    </dd>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className={`${orangeCard} shadow-none`}>
                        <CardContent className="p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 bg-white rounded-md p-3">
                                    <Clock className="h-6 w-6 text-[#FF7300]" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dt className={`text-sm font-medium ${orangeText} truncate`}>
                                        Tugas selanjutnya
                                    </dt>
                                    <dd className="flex items-baseline">
                                        <div className={`text-2xl font-semibold ${orangeText}`}>
                                            {stats.tasksDueSoon}
                                        </div>
                                    </dd>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className={`${orangeCard} shadow-none`}>
                        <CardContent className="p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 bg-white rounded-md p-3">
                                    <CheckSquare className="h-6 w-6 text-[#FF7300]" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dt className={`text-sm font-medium ${orangeText} truncate`}>
                                        selesai
                                    </dt>
                                    <dd className="flex items-baseline">
                                        <div className={`text-2xl font-semibold ${orangeText}`}>
                                            {stats.completedTasks}
                                        </div>
                                    </dd>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className={`${orangeCard} shadow-none`}>
                        <CardContent className="p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 bg-white rounded-md p-3">
                                    <Users className="h-6 w-6 text-[#FF7300]" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dt className={`text-sm font-medium ${orangeText} truncate`}>
                                        Tim
                                    </dt>
                                    <dd className="flex items-baseline">
                                        <div className={`text-2xl font-semibold ${orangeText}`}>
                                            {stats.teamMembers}
                                        </div>
                                    </dd>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Project Progress Chart */}
                <Card className={`${orangeCard} mb-8 shadow-none`}>
                    <CardHeader>
                        <CardTitle className={orangeText}>Progress Projek</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ChartComp />
                    </CardContent>
                </Card>

                {/* Team Members Grid */}
                <Card className={`${orangeCard} mb-8 shadow-none`}>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className={orangeText}>Anggota Basis</CardTitle>
                        <Button variant="outline" size="sm" className={`${orangeButton} border-0`}>
                            <UserPlus className="h-4 w-4 mr-2" />
                            Tambah Anggota
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {teamMembers?.map((member) => (
                                <Card key={member.id} className={`relative ${orangeBg} border-0 shadow-none`}>
                                    <CardContent className="p-6">
                                        <div className="flex flex-col items-center space-y-4">
                                            {/* Icon and Status */}
                                            <div className="relative flex items-center justify-center">
                                                <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center border-4 border-[#FFE3C6] shadow-lg">
                                                    <User className="h-10 w-10 text-[#FF7300]" />
                                                </div>
                                                <div
                                                    className={`absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-2 border-white ${
                                                        member.status === "online"
                                                            ? "bg-green-500"
                                                            : member.status === "away"
                                                            ? "bg-yellow-500"
                                                            : "bg-gray-500"
                                                    }`}
                                                />
                                            </div>
                                            {/* Member Info */}
                                            <div className="text-center space-y-2">
                                                <h3 className={`font-semibold text-lg ${orangeText}`}>
                                                    {member.name}
                                                </h3>
                                                <div className="flex justify-center">
                                                    {getRoleBadge(member.role)}
                                                </div>
                                                <p className="text-sm text-gray-600">
                                                    {member.email}
                                                </p>
                                            </div>
                                            {/* Status Badge */}
                                            <div className="flex justify-center">
                                                {getStatusBadge(member.status)}
                                            </div>
                                            {/* Action Buttons */}
                                            <div className="flex space-x-2 pt-4">
                                                <Button variant="outline" size="sm" className={`${orangeButton} border-0`}>
                                                    <Mail className="h-4 w-4 mr-1" />
                                                    Email
                                                </Button>
                                                <Button variant="outline" size="sm" className={`${orangeButton} border-0`}>
                                                    <MessageSquare className="h-4 w-4 mr-1" />
                                                    Chat
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Upcoming Deadlines */}
                <Card className={`${orangeCard} mb-8 shadow-none`}>
                    <CardHeader>
                        <CardTitle className={orangeText}>Batas Waktu</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {upcomingDeadlines?.map((deadline) => (
                                <div
                                    key={deadline.id}
                                    className={`flex items-center justify-between p-4 border rounded-lg hover:bg-[#FFF6ED] transition-colors border-[#FFD6A0]`}
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-shrink-0">
                                            <Calendar className="h-5 w-5 text-[#FF7300]" />
                                        </div>
                                        <div>
                                            <p className={`text-sm font-medium ${orangeText}`}>
                                                {deadline.title}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {deadline.project}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center">
                                            <AlertCircle
                                                className={`h-4 w-4 mr-2 ${
                                                    deadline.priority === "high"
                                                        ? "text-red-500"
                                                        : deadline.priority === "medium"
                                                        ? "text-yellow-500"
                                                        : "text-green-500"
                                                }`}
                                            />
                                            <Badge 
                                                variant={
                                                    deadline.priority === "high" 
                                                        ? "destructive" 
                                                        : deadline.priority === "medium" 
                                                        ? "secondary" 
                                                        : "default"
                                                }
                                            >
                                                {deadline.priority}
                                            </Badge>
                                        </div>
                                        <div className="text-sm text-muted-foreground font-medium">
                                            {deadline.dueDate}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Project Status Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projectProgress.map((project, idx) => (
                        <Card key={project.name} className={`${orangeCard} shadow-none`}>
                            <CardHeader>
                                <CardTitle className={`text-lg ${orangeText}`}>
                                    {project.name}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex justify-between text-sm">
                                        <span className={orangeText}>
                                            Progress
                                        </span>
                                        <span className="font-medium">
                                            {project.progress}%
                                        </span>
                                    </div>
                                    <div className="w-full h-2 rounded-full bg-[#FFE3C6] overflow-hidden">
                                        <div
                                            className={`h-2 rounded-full ${project.progress === 100 ? greenProgress : orangeProgress}`}
                                            style={{ width: `${project.progress}%` }}
                                        />
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className={orangeText}>
                                            Status
                                        </span>
                                        <span
                                            className={`font-medium ${
                                                project.progress === 100
                                                    ? greenText
                                                    : orangeText
                                            }`}
                                        >
                                            {project.progress === 100
                                                ? "Completed"
                                                : project.progress >= 75
                                                ? "On Track"
                                                : project.progress >= 50
                                                ? "In Progress"
                                                : "At Risk"}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}