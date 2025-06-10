import * as React from "react";
import {
    LayoutDashboard,
    FolderKanban,
    CheckSquare,
    Users,
    Settings2,
    Plus,
} from "lucide-react";

import { NavMain } from "@/Components/nav-main";
import { NavProjects } from "@/Components/nav-projects";
import { NavUser } from "@/Components/nav-user";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar";

// Warna baru yang lebih nyaman dan modern
const sidebarBg = "bg-slate-50 border-r border-slate-200";
const sidebarActive = "bg-blue-500 text-white font-medium";
const sidebarHover = "hover:bg-blue-50 hover:text-blue-700";
const sidebarText = "text-slate-700";
const sidebarSubHover = "hover:bg-slate-100 text-slate-600";
const sidebarSubText = "text-slate-600";
const sidebarSection = "text-slate-500";

const data = {
    user: {
        name: "",
        email: "",
        avatar: "",
    },
    navMain: [
        {
            title: "Soft UI Manage",
            url: "/dashboard",
            icon: LayoutDashboard,
            isActive: true,
        },
        {
            title: "projek",
            url: "/projects",
            icon: FolderKanban,
            items: [
                {
                    title: "semua projek",
                    url: "/projects",
                },
                {
                    title: "mulai projek",
                    url: "/projects/create",
                },
            ],
        },
        {
            title: "Pekerjaan",
            url: "/tasks",
            icon: CheckSquare,
            items: [
                {
                    title: "Semua Pekerjaan",
                    url: "/tasks",
                },
                {
                    title: "Membuat pekerjaan",
                    url: "/tasks/create",
                },
            ],
        },
        {
            title: "Pengaturan",
            url: "/settings",
            icon: Settings2,
            items: [
                {
                    title: "Profil",
                    url: "/profile",
                },
                {
                    title: "Pengaturan Tim",
                    url: "/team/settings",
                },
                {
                    title: "pengaturan projek",
                    url: "/projects/settings",
                },
            ],
        },
    ],
    projects: [
        {
            name: "projek aktif",
            url: "/projects?status=active",
            icon: FolderKanban,
        },
        {
            name: "Projek Selesai",
            url: "/projects?status=completed",
            icon: CheckSquare,
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar
            collapsible="icon"
            className={`${sidebarBg} min-h-screen w-56`} // Lebar diperkecil dari default
            {...props}
        >
            <SidebarHeader className="py-3">
                {/* User info - diperkecil */}
                <div className="flex items-center gap-2 px-3">
                    <img
                        src={data.user.avatar}
                        alt={data.user.name}
                        className="w-8 h-8 rounded-full object-cover border border-slate-300"
                    />
                    <div className="flex-1 min-w-0">
                        <div className={`font-medium text-sm ${sidebarText} truncate`}>{data.user.name}</div>
                        <div className="text-xs text-slate-500 truncate">{data.user.email}</div>
                    </div>
                </div>
            </SidebarHeader>
            
            <SidebarContent className="px-2">
                {/* Main Navigation */}
                <nav>
                    <ul className="space-y-1">
                        {data.navMain.map((item, idx) => (
                            <li key={item.title}>
                                <a
                                    href={item.url}
                                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm
                                        ${
                                            item.isActive
                                                ? sidebarActive
                                                : `${sidebarText} ${sidebarHover}`
                                        }
                                    `}
                                >
                                    {item.icon && <item.icon className="w-4 h-4 flex-shrink-0" />}
                                    <span className="truncate">{item.title}</span>
                                </a>
                                {/* Submenu */}
                                {item.items && (
                                    <ul className="ml-6 mt-1 space-y-1">
                                        {item.items.map((sub) => (
                                            <li key={sub.title}>
                                                <a
                                                    href={sub.url}
                                                    className={`block px-3 py-1.5 text-xs rounded-md ${sidebarSubHover} ${sidebarSubText} truncate`}
                                                >
                                                    {sub.title}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>
                
                {/* Projects Section */}
                <div className="mt-6">
                    <div className={`px-3 py-2 text-xs font-semibold uppercase tracking-wider ${sidebarSection}`}>
                        Projek
                    </div>
                    <ul className="space-y-1">
                        {data.projects.map((project) => (
                            <li key={project.name}>
                                <a
                                    href={project.url}
                                    className={`flex items-center gap-2 px-3 py-2 rounded-lg ${sidebarHover} ${sidebarText} transition-colors text-sm`}
                                >
                                    {project.icon && <project.icon className="w-4 h-4 flex-shrink-0" />}
                                    <span className="truncate">{project.name}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </SidebarContent>
            
            {/* Tombol Keluar dihapus */}
            
            <SidebarRail />
        </Sidebar>
    );
}