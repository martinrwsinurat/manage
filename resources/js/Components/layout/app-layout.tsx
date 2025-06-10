import { ReactNode } from "react";
import { Navigation } from "./navigation";
import { useIsMobile } from "@/components/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

interface AppLayoutProps {
    children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
    const isMobile = useIsMobile();

    if (isMobile) {
        return (
            <div className="min-h-screen bg-background">
                <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <div className="container flex h-14 items-center">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-[300px] p-0">
                                <Navigation className="p-4" />
                            </SheetContent>
                        </Sheet>
                    </div>
                </header>
                <main className="container py-6">{children}</main>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen">
            <aside className="w-[250px] border-r bg-background">
                <div className="flex h-14 items-center border-b px-4">
                    <span className="font-semibold">Project Manager</span>
                </div>
                <Navigation className="p-4" />
            </aside>
            <main className="flex-1">
                <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <div className="container flex h-14 items-center">
                        {/* Add header content here */}
                    </div>
                </header>
                <div className="container py-6">{children}</div>
            </main>
        </div>
    );
}
