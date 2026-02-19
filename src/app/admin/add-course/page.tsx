"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
    LayoutDashboard,
    BookOpen,
    DollarSign,
    Clock,
    User,
    Image as ImageIcon,
    ArrowRight,
    Loader2
} from "lucide-react";

type FormState = z.infer<typeof courseSchema>;

const courseSchema = z.object({
    title: z.string().min(5, "Title must be at least 5 characters").max(100),
    description: z.string().min(20, "Description must be at least 20 characters"),
    category: z.string().min(1, "Please select a category"),
    level: z.string().min(1, "Please select a difficulty level"),
    price: z.number().min(0, "Price cannot be negative"),
    duration: z.number().min(1, "Duration must be at least 1 hour"),
    instructorName: z.string().min(2, "Instructor name is required"),
    status: z.enum(["Draft", "Published"]),
    imageUrl: z.string().optional().or(z.literal("")),
});

export default function AddCoursePage() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormState>({
        resolver: zodResolver(courseSchema),
        defaultValues: {
            status: "Draft",
            level: "Beginner",
            category: "Development",
            price: 0,
            duration: 0
        }
    });

    const onSubmit = async (data: FormState) => {
        setIsLoading(true);
        try {
            const response = await fetch("/api/courses", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to create course");
            }

            toast.success("Course created successfully!");
            router.push("/admin/courses");
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-50 p-6 dark:bg-black sm:p-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mx-auto max-w-4xl"
            >
                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
                            Create New Course
                        </h1>
                        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                            Fill in the details below to launch your new learning experience.
                        </p>
                    </div>
                    <div className="hidden sm:block">
                        <div className="flex -space-x-2 overflow-hidden">
                            <span className="inline-block h-8 w-8 rounded-full bg-blue-100 ring-2 ring-white dark:bg-blue-900 dark:ring-zinc-950" />
                            <span className="inline-block h-8 w-8 rounded-full bg-purple-100 ring-2 ring-white dark:bg-purple-900 dark:ring-zinc-950" />
                            <span className="inline-block h-8 w-8 rounded-full bg-green-100 ring-2 ring-white dark:bg-green-900 dark:ring-zinc-950" />
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    {/* Basic Info Card */}
                    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50">
                        <div className="mb-6 flex items-center gap-2">
                            <LayoutDashboard className="h-5 w-5 text-blue-500" />
                            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Basic Information</h2>
                        </div>

                        <div className="grid gap-6">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                    Course Title
                                </label>
                                <input
                                    {...register("title")}
                                    className={`w-full rounded-xl border bg-white px-4 py-2.5 outline-none transition-all dark:bg-black ${errors.title
                                        ? "border-red-500 ring-1 ring-red-500"
                                        : "border-zinc-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-zinc-800"
                                        }`}
                                    placeholder="e.g. Master Next.js for Beginners"
                                />
                                {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>}
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                    Course Description
                                </label>
                                <textarea
                                    {...register("description")}
                                    rows={4}
                                    className={`w-full rounded-xl border bg-white px-4 py-2.5 outline-none transition-all dark:bg-black ${errors.description
                                        ? "border-red-500 ring-1 ring-red-500"
                                        : "border-zinc-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-zinc-800"
                                        }`}
                                    placeholder="Provide a detailed roadmap of what students will learn..."
                                />
                                {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description.message}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Metadata Card */}
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50">
                            <div className="mb-6 flex items-center gap-2">
                                <BookOpen className="h-5 w-5 text-purple-500" />
                                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Course Logic</h2>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Category</label>
                                    <select
                                        {...register("category")}
                                        className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 outline-none dark:border-zinc-800 dark:bg-black shadow-sm"
                                    >
                                        <option value="Development">Development</option>
                                        <option value="Design">Design</option>
                                        <option value="Business">Business</option>
                                        <option value="Marketing">Marketing</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Level</label>
                                    <select
                                        {...register("level")}
                                        className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 outline-none dark:border-zinc-800 dark:bg-black shadow-sm"
                                    >
                                        <option value="Beginner">Beginner</option>
                                        <option value="Intermediate">Intermediate</option>
                                        <option value="Advanced">Advanced</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50">
                            <div className="mb-6 flex items-center gap-2">
                                <DollarSign className="h-5 w-5 text-green-500" />
                                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Pricing & Time</h2>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Price (₹)</label>
                                    <input
                                        type="number"
                                        {...register("price", { valueAsNumber: true })}
                                        className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 outline-none dark:border-zinc-800 dark:bg-black"
                                        placeholder="4999"
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Duration (Hrs)</label>
                                    <input
                                        type="number"
                                        {...register("duration", { valueAsNumber: true })}
                                        className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 outline-none dark:border-zinc-800 dark:bg-black"
                                        placeholder="12"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Instructor & Media */}
                    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50">
                        <div className="mb-6 flex items-center gap-2">
                            <User className="h-5 w-5 text-orange-500" />
                            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Instructor & Media</h2>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Instructor Name</label>
                                <input
                                    {...register("instructorName")}
                                    className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 outline-none dark:border-zinc-800 dark:bg-black"
                                    placeholder="John Doe"
                                />
                                {errors.instructorName && <p className="mt-1 text-xs text-red-500">{errors.instructorName.message}</p>}
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Thumbnail URL</label>
                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <ImageIcon className="h-5 w-5 text-zinc-400" />
                                    </div>
                                    <input
                                        {...register("imageUrl")}
                                        className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-10 pr-4 outline-none dark:border-zinc-800 dark:bg-black"
                                        placeholder="https://..."
                                    />
                                </div>
                                {errors.imageUrl && <p className="mt-1 text-xs text-red-500">{errors.imageUrl.message}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Status & Submit */}
                    <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-blue-100 bg-blue-50/50 p-6 dark:border-blue-900/30 dark:bg-blue-900/10 sm:flex-row">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    value="Draft"
                                    {...register("status")}
                                    id="draft"
                                    className="h-4 w-4 accent-blue-600"
                                />
                                <label htmlFor="draft" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Draft</label>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    value="Published"
                                    {...register("status")}
                                    id="published"
                                    className="h-4 w-4 accent-blue-600"
                                />
                                <label htmlFor="published" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Published</label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-3.5 text-sm font-bold text-white transition-all hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/20 disabled:scale-95 disabled:opacity-50 sm:w-auto"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    Launch Course
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
