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

// Warna custom sesuai dashboard baru
const sidebarBg = "bg-[#23282d]";
const sidebarActive = "bg-[#FF7300] text-white font-semibold";
const sidebarHover = "hover:bg-[#FFE3C6] hover:text-[#B05A00]";
const sidebarText = "text-[#b05a00]";
const sidebarSubHover = "hover:bg-[#FFF6ED] text-[#B05A00]";
const sidebarSubText = "text-[#B05A00]";
const sidebarSection = "text-[#B05A00]";

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
    // Fungsi logout yang benar: POST ke /logout lalu redirect ke /login
    const handleLogout = async () => {
        await fetch('/logout', {
            method: 'POST',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '',
            },
        });
        window.location.href = "/login";
    };

    return (
        <Sidebar
            collapsible="icon"
            className={`${sidebarBg} min-h-screen`}
            {...props}
        >
            <SidebarHeader>
                {/* User info */}
                <div className="flex items-center gap-3 py-4 px-2">
                    <img
                        src={data.user.avatar}
                        alt={data.user.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-white"
                    />
                    <div>
                        <div className={`font-semibold ${sidebarText}`}>{data.user.name}</div>
                        <div className="text-xs text-white/80">{data.user.email}</div>
                    </div>
                </div>
            </SidebarHeader>
            <SidebarContent>
                {/* Main Navigation */}
                <nav>
                    <ul className="space-y-1">
                        {data.navMain.map((item, idx) => (
                            <li key={item.title}>
                                <a
                                    href={item.url}
                                    className={`flex items-center gap-3 px-4 py-2 rounded-l-lg transition-colors
                                        ${
                                            item.isActive
                                                ? sidebarActive
                                                : `${sidebarText} ${sidebarHover}`
                                        }
                                    `}
                                >
                                    {item.icon && <item.icon className="w-5 h-5" />}
                                    <span>{item.title}</span>
                                </a>
                                {/* Submenu */}
                                {item.items && (
                                    <ul className="ml-8 mt-1 space-y-1">
                                        {item.items.map((sub) => (
                                            <li key={sub.title}>
                                                <a
                                                    href={sub.url}
                                                    className={`block px-4 py-1 text-sm rounded ${sidebarSubHover} ${sidebarSubText}`}
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
                    <div className={`px-4 py-2 text-xs font-bold uppercase tracking-wider ${sidebarSection}`}>
                        Projek
                    </div>
                    <ul className="space-y-1">
                        {data.projects.map((project) => (
                            <li key={project.name}>
                                <a
                                    href={project.url}
                                    className={`flex items-center gap-3 px-4 py-2 rounded-l-lg ${sidebarHover} ${sidebarText} transition-colors`}
                                >
                                    {project.icon && <project.icon className="w-4 h-4" />}
                                    <span>{project.name}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </SidebarContent>
            {/* Logout Button */}
            <div className="p-4 mt-auto">
                <button
                    onClick={handleLogout}
                    className="w-full py-2 px-4 rounded bg-[#FF7300] text-white font-semibold hover:bg-[#FF8C1A] transition"
                >
                    Keluar
                </button>
            </div>
            <SidebarRail />
        </Sidebar>
    );
}