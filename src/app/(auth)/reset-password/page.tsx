"use client";

import { useActionState, useState } from "react";
import { resetPassword } from "@/actions/reset";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Loader2, Lock, ArrowLeft, KeyRound } from "lucide-react";

export default function ResetPasswordPage() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token") || "";
    const [state, action, pending] = useActionState(resetPassword, undefined);

    if (!token) {
        return (
            <div className="flex min-h-screen w-full items-center justify-center bg-white dark:bg-black px-4 py-12">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-500">Invalid Link</h2>
                    <p className="mt-2 text-zinc-600">The reset link is missing or invalid.</p>
                    <Link href="/forgot-password" className="mt-4 inline-block text-primary hover:underline">
                        Request a new link
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-white dark:bg-black px-4 py-12">
            <div className="w-full max-w-md">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="mb-8 text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <KeyRound className="h-8 w-8" />
                        </div>
                        <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
                            Reset Password
                        </h2>
                        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                            Please enter your new password below.
                        </p>
                    </div>

                    <form action={action} className="space-y-6">
                        <input type="hidden" name="token" value={token} />

                        <div className="space-y-4">
                            <div>
                                <label htmlFor="password" className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                    New Password
                                </label>
                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <Lock className="h-5 w-5 text-zinc-400" />
                                    </div>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        className="block w-full rounded-xl border border-zinc-200 bg-zinc-50 py-3 pl-10 pr-3 text-zinc-900 outline-none transition-all focus:border-primary focus:bg-zinc-700 focus:ring-4 focus:ring-primary/10 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:focus:border-primary"
                                        placeholder="••••••••"
                                    />
                                </div>
                                {state?.error && typeof state.error === "object" && "password" in state.error && (
                                    <p className="mt-1 text-xs text-red-500">{(state.error as any).password[0]}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                    Confirm New Password
                                </label>
                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <Lock className="h-5 w-5 text-zinc-400" />
                                    </div>
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        required
                                        className="block w-full rounded-xl border border-zinc-200 bg-zinc-50 py-3 pl-10 pr-3 text-zinc-900 outline-none transition-all focus:border-primary focus:bg-zinc-700 focus:ring-4 focus:ring-primary/10 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:focus:border-primary"
                                        placeholder="••••••••"
                                    />
                                </div>
                                {state?.error && typeof state.error === "object" && "confirmPassword" in state.error && (
                                    <p className="mt-1 text-xs text-red-500">{(state.error as any).confirmPassword[0]}</p>
                                )}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={pending}
                            className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-white transition-all hover:opacity-90 hover:shadow-lg hover:shadow-primary/25 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {pending ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                "Reset Password"
                            )}
                        </button>

                        {state?.error && typeof state.error === "string" && (
                            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400 text-center">
                                {state.error}
                            </div>
                        )}

                        {state?.success && (
                            <div className="rounded-lg bg-green-50 p-3 text-sm text-green-600 dark:bg-green-900/30 dark:text-green-400 text-center">
                                {state.success}
                                <div className="mt-2">
                                    <Link href="/login" className="font-bold underline">Go to Sign in</Link>
                                </div>
                            </div>
                        )}

                        <div className="text-center">
                            <Link href="/login" className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-primary dark:text-zinc-400">
                                <ArrowLeft className="h-4 w-4" />
                                Back to Sign in
                            </Link>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
