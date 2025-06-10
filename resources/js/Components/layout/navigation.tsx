import { Link } from "@inertiajs/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    LayoutDashboard,
    FolderKanban,
    CheckSquare,
    Users,
    Settings,
    Plus,
} from "lucide-react";
import { useIsMobile } from "@/components/hooks/use-mobile";

interface NavigationProps {
    className?: string;
}

export function Navigation({ className }: NavigationProps) {
    const isMobile = useIsMobile();
    const currentPath = window.location.pathname;

    const isActive = (path: string) => {
        return currentPath.startsWith(path);
    };

    const navItems = [
        {
            title: "Dashboard",
            href: "/dashboard",
            icon: LayoutDashboard,
        },
        {
            title: "Projects",
            href: "/projects",
            icon: FolderKanban,
            children: [
                {
                    title: "All Projects",
                    href: "/projects",
                },
                {
                    title: "Create Project",
                    href: "/projects/create",
                },
            ],
        },
        {
            title: "Tasks",
            href: "/tasks",
            icon: CheckSquare,
            children: [
                {
                    title: "All Tasks",
                    href: "/tasks",
                },
                {
                    title: "Create Task",
                    href: "/tasks/create",
                },
            ],
        },
        {
            title: "Team",
            href: "/team",
            icon: Users,
        },
        {
            title: "Settings",
            href: "/settings",
            icon: Settings,
        },
    ];

    return (
        <nav className={cn("flex flex-col gap-2", className)}>
            {navItems.map((item) => (
                <div key={item.href} className="space-y-1">
                    <Link href={item.href}>
                        <Button
                            variant={
                                isActive(item.href) ? "secondary" : "ghost"
                            }
                            className={cn(
                                "w-full justify-start gap-2",
                                isActive(item.href) && "bg-secondary"
                            )}
                        >
                            <item.icon className="h-4 w-4" />
                            {!isMobile && <span>{item.title}</span>}
                        </Button>
                    </Link>
                    {item.children && !isMobile && (
                        <div className="ml-6 space-y-1">
                            {item.children.map((child) => (
                                <Link key={child.href} href={child.href}>
                                    <Button
                                        variant={
                                            isActive(child.href)
                                                ? "secondary"
                                                : "ghost"
                                        }
                                        className={cn(
                                            "w-full justify-start gap-2",
                                            isActive(child.href) &&
                                                "bg-secondary"
                                        )}
                                    >
                                        {child.title}
                                    </Button>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </nav>
    );
}
