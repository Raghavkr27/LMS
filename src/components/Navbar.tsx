import Link from "next/link";
import { auth, signOut } from "@/auth";
import { BookOpen, LogOut, LayoutDashboard, Menu, Shield } from "lucide-react";

export async function Navbar() {
    const session = await auth();

    return (
        <header className="fixed top-0 z-50 w-full border-b border-zinc-200/50 bg-white/70 backdrop-blur-xl dark:border-zinc-800/50 dark:bg-black/70">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo Section */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-600/20 group-hover:scale-105 transition-transform">
                        <BookOpen className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                        LMS<span className="text-blue-600 font-extrabold tracking-tighter">PRO</span>
                    </span>
                </Link>

                {/* Desktop Navigation Links */}
                <nav className="hidden md:flex md:items-center md:gap-8">
                    {session && (
                        <>
                            <Link href="/courses" className="text-sm font-semibold text-zinc-600 transition-colors hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400">
                                Courses
                            </Link>
                            <Link href="/pricing" className="text-sm font-semibold text-zinc-600 transition-colors hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400">
                                Pricing
                            </Link>
                            <Link href="/about" className="text-sm font-semibold text-zinc-600 transition-colors hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400">
                                About
                            </Link>
                        </>
                    )}
                </nav>

                {/* Action Buttons & User Menu */}
                <div className="flex items-center gap-3">
                    {session?.user?.role === "admin" && (
                        <Link
                            href="/admin"
                            className="mr-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400"
                        >
                            <Shield className="h-4 w-4" />
                            Admin Panel
                        </Link>
                    )}

                    {!session ? (
                        <>
                            <Link
                                href="/login"
                                className="px-4 py-2 text-sm font-bold text-zinc-700 hover:text-blue-600 dark:text-zinc-300 dark:hover:text-blue-400 transition-colors"
                            >
                                Log In
                            </Link>
                            <Link
                                href="/register"
                                className="hidden sm:inline-flex rounded-full bg-blue-600 px-5 py-2 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-700 hover:scale-[1.02] active:scale-95"
                            >
                                Join for Free
                            </Link>
                        </>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link
                                href="/dashboard"
                                className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-bold text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900 transition-colors"
                            >
                                <LayoutDashboard className="h-4 w-4" />
                                <span className="hidden sm:inline">My Learning</span>
                            </Link>
                            <form
                                action={async () => {
                                    "use server";
                                    await signOut();
                                }}
                            >
                                <button
                                    type="submit"
                                    className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 text-zinc-500 hover:bg-red-50 hover:text-red-600 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-red-900/20 dark:hover:text-red-400 transition-all"
                                    title="Sign out"
                                >
                                    <LogOut className="h-4 w-4" />
                                </button>
                            </form>
                        </div>
                    )}

                    {/* Mobile Menu Icon (Placeholder interaction) */}
                    <button className="md:hidden p-2 text-zinc-600 hover:bg-zinc-100 rounded-lg dark:text-zinc-400 dark:hover:bg-zinc-900">
                        <Menu className="h-6 w-6" />
                    </button>
                </div>
            </div>
        </header>
    );
}
