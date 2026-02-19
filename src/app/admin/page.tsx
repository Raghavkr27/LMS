"use client";

import Link from "next/link";
import { Shield, Lock, Users, BookOpen, Settings, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminAccessPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-zinc-950 dark:via-blue-950 dark:to-indigo-950">
            <div className="mx-auto max-w-4xl px-4 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    {/* Header */}
                    <div className="mb-8 flex justify-center">
                        <div className="rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 p-4 shadow-lg shadow-blue-500/30">
                            <Shield className="h-12 w-12 text-white" />
                        </div>
                    </div>

                    <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
                        Admin Portal Access
                    </h1>
                    <p className="mb-12 text-lg text-zinc-600 dark:text-zinc-400">
                        Secure access for administrators and course managers
                    </p>

                    {/* Main Card */}
                    <div className="mx-auto max-w-md rounded-2xl border border-zinc-200 bg-white p-8 shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
                        <div className="mb-6 flex items-center justify-center gap-2 rounded-lg bg-blue-50 px-4 py-2 dark:bg-blue-950">
                            <Lock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                                Authorized Personnel Only
                            </span>
                        </div>

                        <Link
                            href="/admin/login"
                            className="group mb-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl hover:shadow-blue-500/40"
                        >
                            <Shield className="h-5 w-5" />
                            Sign In to Admin Portal
                        </Link>

                        <div className="text-sm text-zinc-500 dark:text-zinc-400">
                            Don't have admin access?{" "}
                            <Link href="/" className="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400">
                                Return to Home
                            </Link>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        <FeatureCard
                            icon={<BookOpen className="h-6 w-6" />}
                            title="Course Management"
                            description="Create, edit, and publish courses"
                        />
                        <FeatureCard
                            icon={<Users className="h-6 w-6" />}
                            title="User Management"
                            description="Manage students and instructors"
                        />
                        <FeatureCard
                            icon={<BarChart3 className="h-6 w-6" />}
                            title="Analytics"
                            description="Track performance and engagement"
                        />
                        <FeatureCard
                            icon={<Settings className="h-6 w-6" />}
                            title="System Settings"
                            description="Configure platform preferences"
                        />
                        <FeatureCard
                            icon={<Shield className="h-6 w-6" />}
                            title="Security"
                            description="Role-based access control"
                        />
                        <FeatureCard
                            icon={<Lock className="h-6 w-6" />}
                            title="Secure Access"
                            description="Protected admin routes"
                        />
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
    return (
        <div className="rounded-xl border border-zinc-200 bg-white p-6 text-left shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
            <div className="mb-3 inline-flex rounded-lg bg-blue-100 p-2 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                {icon}
            </div>
            <h3 className="mb-2 font-semibold text-zinc-900 dark:text-zinc-50">{title}</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
        </div>
    );
}
