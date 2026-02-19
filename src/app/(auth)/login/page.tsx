"use client";

import { useActionState, useState } from "react";
import { authenticate } from "@/actions/auth";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import { motion } from "framer-motion";
import { Loader2, Mail, Lock, ArrowRight, Eye, EyeOff, UserCircle2, GraduationCap } from "lucide-react";

function LoginButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-white transition-all hover:opacity-90 hover:shadow-lg hover:shadow-primary/25 disabled:cursor-not-allowed disabled:opacity-70"
        >
            {pending ? (
                <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Signing in...
                </>
            ) : (
                <>
                    Sign In
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
            )}
        </button>
    );
}

export default function LoginPage() {
    const [errorMessage, dispatch] = useActionState(authenticate, undefined);
    const [showPassword, setShowPassword] = useState(false);
    const [focusedField, setFocusedField] = useState<"email" | "password" | null>(null);
    const [email, setEmail] = useState("");

    return (
        <div className="flex min-h-screen w-full">
            {/* Left Side - Form */}
            <div className="flex w-full flex-col justify-center bg-white px-4 py-12 dark:bg-black sm:px-6 lg:w-1/2 lg:px-20 xl:px-24">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="mb-8 flex flex-col items-center text-center">
                            <div className="h-16 flex items-end justify-center overflow-hidden">
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{
                                        y: focusedField ? 0 : 20,
                                        opacity: focusedField ? 1 : 0,
                                        scale: focusedField ? 1 : 0.8
                                    }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    className="mb-4 rounded-full bg-primary/10 p-3 text-primary dark:bg-primary/20 dark:text-primary"
                                >
                                    {focusedField === "email" ? (
                                        email.toLowerCase().includes("gmail") ? (
                                            <GraduationCap className="h-10 w-10 text-orange-500 animate-bounce" />
                                        ) : (
                                            <Mail className="h-10 w-10" />
                                        )
                                    ) : focusedField === "password" ? (
                                        <Lock className="h-10 w-10" />
                                    ) : (
                                        <UserCircle2 className="h-10 w-10" />
                                    )}
                                </motion.div>
                            </div>
                            <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
                                Welcome back
                            </h2>
                            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                                Please enter your details to sign in.
                            </p>
                        </div>

                        <form action={dispatch} className="space-y-6">
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                        Email
                                    </label>
                                    <div className="relative">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <Mail className="h-5 w-5 text-zinc-800" />
                                        </div>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            onFocus={() => setFocusedField("email")}
                                            onBlur={() => setFocusedField(null)}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="block w-full rounded-xl border border-zinc-200 bg-zinc-50 py-3 pl-10 pr-3 text-zinc-900 outline-none transition-all focus:border-primary focus:bg-zinc-700 focus:ring-4 focus:ring-primary/10 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:focus:border-primary placeholder:text:zinc-700"
                                            placeholder="you@company.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="password" className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <Lock className="h-5 w-5 text-zinc-400" />
                                        </div>
                                        <input
                                            id="password"
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            autoComplete="current-password"
                                            required
                                            onFocus={() => setFocusedField("password")}
                                            onBlur={() => setFocusedField(null)}
                                            className="block w-full rounded-xl border border-zinc-200 bg-zinc-50 py-3 pl-10 pr-10 text-zinc-900 outline-none transition-all focus:border-primary focus:bg-zinc-700 focus:ring-4 focus:ring-primary/10 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:focus:border-primary"
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-5 w-5" />
                                            ) : (
                                                <Eye className="h-5 w-5" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="text-sm">
                                    <Link href="/forgot-password" className="font-medium text-primary hover:opacity-80">
                                        Forgot password?
                                    </Link>
                                </div>
                            </div>

                            {errorMessage && (
                                <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400">
                                    {errorMessage}
                                </div>
                            )}

                            <LoginButton />

                            <div className="text-center text-sm">
                                <span className="text-zinc-500 dark:text-zinc-400">Don't have an account? </span>
                                <Link href="/register" className="font-medium text-primary hover:opacity-80">
                                    Sign up
                                </Link>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>

            {/* Right Side - Image/Gradient */}
            <div className="relative hidden w-0 flex-1 lg:block">
                <div className="absolute inset-0 h-full w-full bg-gradient-to-br from-primary to-accent">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
                    <div className="flex h-full flex-col justify-between p-12 text-white">
                        <div className="flex items-center gap-2">
                            <div className="rounded-lg bg-white/20 p-2 backdrop-blur-sm">
                                <div className="h-6 w-6 rounded-full bg-white"></div>
                            </div>
                            <span className="text-xl font-bold">LMS Pro</span>
                        </div>

                        <div className="space-y-6">
                            <blockquote className="space-y-2">
                                <p className="text-lg font-medium leading-relaxed opacity-90">
                                    "This platform has completely transformed how I learn. The courses are structured perfectly and the instructors are world-class."
                                </p>
                                <footer className="text-sm opacity-75">— Sarah Chen, Full Stack Developer</footer>
                            </blockquote>

                            <div className="flex gap-4">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="h-8 w-8 rounded-full border-2 border-indigo-900 bg-zinc-400" />
                                    ))}
                                </div>
                                <div className="flex flex-col justify-center text-xs opacity-75">
                                    <span className="font-bold">10k+ Students</span>
                                    <span>Joined this month</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
