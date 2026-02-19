"use client";

import { useActionState, useState } from "react";
import { forgotPassword } from "@/actions/reset";
import Link from "next/link";
import { motion } from "framer-motion";
import { Loader2, Mail, ArrowLeft, Send } from "lucide-react";

export default function ForgotPasswordPage() {
    const [state, action, pending] = useActionState(forgotPassword, undefined);

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
                            <Mail className="h-8 w-8" />
                        </div>
                        <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
                            Forgot Password
                        </h2>
                        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                            Enter your email and we'll send you a link to reset your password.
                        </p>
                    </div>

                    <form action={action} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <Mail className="h-5 w-5 text-zinc-400" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="block w-full rounded-xl border border-zinc-200 bg-zinc-50 py-3 pl-10 pr-3 text-zinc-900 outline-none transition-all focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:focus:border-primary"
                                    placeholder="you@example.com"
                                />
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
                                <>
                                    Send Reset Link
                                    <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </>
                            )}
                        </button>

                        {state?.error && (
                            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400 text-center">
                                {state.error}
                            </div>
                        )}

                        {state?.success && (
                            <div className="rounded-lg bg-green-50 p-3 text-sm text-green-600 dark:bg-green-900/30 dark:text-green-400 text-center">
                                {state.success}
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
