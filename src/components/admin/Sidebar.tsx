"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    BookOpen,
    PlusCircle,
    Users,
    Settings,
    ChevronRight
} from "lucide-react";

const navItems = [
    {
        label: "Overview",
        href: "/admin",
        icon: LayoutDashboard,
    },
    {
        label: "Manage Courses",
        href: "/admin/courses",
        icon: BookOpen,
    },
    {
        label: "Add New Course",
        href: "/admin/add-course",
        icon: PlusCircle,
        highlight: true,
    },
    {
        label: "Users",
        href: "/admin/users",
        icon: Users,
    },
    {
        label: "Settings",
        href: "/admin/settings",
        icon: Settings,
    },
];

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-full border-r border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 md:w-64">
            <div className="flex flex-col gap-2 p-4">
                <div className="mb-4 px-3 text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                    Administrator
                </div>

                <nav className="space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`group flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${isActive
                                        ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                                        : item.highlight
                                            ? "text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20"
                                            : "text-zinc-600 hover:bg-zinc-200/50 dark:text-zinc-400 dark:hover:bg-zinc-800"
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <Icon className={`h-5 w-5 ${isActive ? "text-white" : ""}`} />
                                    {item.label}
                                </div>
                                {isActive && <ChevronRight className="h-4 w-4 opacity-50" />}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer Section in Sidebar */}
                <div className="mt-auto pt-8">
                    <div className="rounded-2xl bg-zinc-200/50 p-4 dark:bg-zinc-800/50">
                        <p className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400">
                            Logged in as
                        </p>
                        <p className="truncate text-xs font-bold text-zinc-900 dark:text-zinc-100">
                            Platform Admin
                        </p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
