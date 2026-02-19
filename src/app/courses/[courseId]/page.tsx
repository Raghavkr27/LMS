import { auth } from "@/auth";
import { connectDB } from "@/lib/db";
import Course from "@/models/Course";
import EnrollButton from "@/components/EnrollButton";
import { notFound } from "next/navigation";
import { CheckCircle2, Clock, BarChart, Globe, Award, PlayCircle } from "lucide-react";
import Image from "next/image";

interface PageProps {
    params: Promise<{
        courseId: string;
    }>;
}

export default async function CourseDetailPage({ params }: PageProps) {
    const { courseId } = await params;

    // Validate ID format to prevent casting errors
    if (!courseId.match(/^[0-9a-fA-F]{24}$/)) {
        return notFound();
    }

    try {
        await connectDB();
        const course = await Course.findById(courseId);
        if (!course || !course.isPublished) {
            return notFound();
        }

        const session = await auth();
        const isLoggedIn = !!session?.user;

        return (
            <div className="min-h-screen bg-zinc-50 pb-20 dark:bg-black">
                {/* Hero Section */}
                <div className="relative bg-zinc-900 pt-32 pb-20 lg:pt-48">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute inset-0 bg-blue-900/20" />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
                    </div>

                    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="lg:grid lg:grid-cols-2 lg:gap-16">
                            <div className="max-w-2xl">
                                <div className="mb-6 inline-flex rounded-full bg-blue-600/20 px-3 py-1 text-sm font-semibold text-blue-400 ring-1 ring-inset ring-blue-400/30">
                                    {course.category}
                                </div>
                                <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                                    {course.title}
                                </h1>
                                <p className="mb-8 text-lg text-zinc-300">
                                    {course.description}
                                </p>

                                <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-300">
                                    <div className="flex items-center gap-2">
                                        <div className="rounded-full bg-yellow-400/10 p-1 text-yellow-400">
                                            <Award className="h-4 w-4" />
                                        </div>
                                        <span>4.8 (120 ratings)</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="rounded-full bg-green-400/10 p-1 text-green-400">
                                            <Globe className="h-4 w-4" />
                                        </div>
                                        <span>English</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="rounded-full bg-purple-400/10 p-1 text-purple-400">
                                            <Clock className="h-4 w-4" />
                                        </div>
                                        <span>Last updated Feb 2026</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative mx-auto -mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="lg:grid lg:grid-cols-3 lg:gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            {/* What you'll learn */}
                            <div className="mb-10 rounded-2xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
                                <h3 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                                    What you'll learn
                                </h3>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    {[
                                        "Master core concepts and advanced techniques",
                                        "Build real-world projects for your portfolio",
                                        "Learn best practices from industry experts",
                                        "Get certification upon successful completion",
                                        "Access community support and networking",
                                        "Lifetime access to course materials"
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-3">
                                            <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-blue-600 dark:text-blue-500" />
                                            <span className="text-zinc-600 dark:text-zinc-300">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Course Content Placeholder */}
                            <div className="mb-10">
                                <h3 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                                    Course Content
                                </h3>
                                <div className="space-y-4">
                                    {[1, 2, 3, 4, 5].map((module) => (
                                        <div key={module} className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
                                            <div className="flex items-center justify-between px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <PlayCircle className="h-5 w-5 text-zinc-400" />
                                                    <span className="font-medium text-zinc-900 dark:text-zinc-50">
                                                        Module {module}: Key Concepts & Practical Application
                                                    </span>
                                                </div>
                                                <span className="text-sm text-zinc-500">45 min</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="relative mt-10 lg:mt-0">
                            <div className="sticky top-24 rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
                                <div className="aspect-video relative mb-6 w-full overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800">
                                    <img
                                        src={course.imageUrl || "/placeholder-course.jpg"}
                                        alt={course.title}
                                        className="h-full w-full object-cover"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity hover:bg-black/30">
                                        <PlayCircle className="h-16 w-16 text-white opacity-80" />
                                    </div>
                                </div>

                                <div className="mb-6 flex items-baseline gap-2">
                                    <span className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                                        ₹{course.price.toLocaleString("en-IN")}
                                    </span>
                                    {course.price > 0 && (
                                        <span className="text-sm text-zinc-500 line-through">
                                            ₹{(course.price * 1.5).toLocaleString("en-IN")}
                                        </span>
                                    )}
                                </div>

                                <EnrollButton
                                    courseId={course._id.toString()}
                                    price={course.price}
                                    isLoggedIn={isLoggedIn}
                                />

                                <div className="mt-6 space-y-4 border-t border-zinc-100 pt-6 text-sm dark:border-zinc-800">
                                    <div className="flex items-center justify-between">
                                        <span className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                                            <Clock className="h-4 w-4" />
                                            Duration
                                        </span>
                                        <span className="font-medium text-zinc-900 dark:text-zinc-50">
                                            {course.duration} Hours
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                                            <BarChart className="h-4 w-4" />
                                            Level
                                        </span>
                                        <span className="font-medium text-zinc-900 dark:text-zinc-50">
                                            {course.level}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                                            <Award className="h-4 w-4" />
                                            Certificate
                                        </span>
                                        <span className="font-medium text-zinc-900 dark:text-zinc-50">
                                            Yes
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error("Course load error:", error);
        return notFound();
    }
}
