import { connectDB } from "@/lib/db";
import Course from "@/models/Course";
import Link from "next/link";
import { BookOpen, Clock, Star, User } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function CoursesPage() {
    await connectDB();
    const courses = await Course.find({ isPublished: true }).sort({ createdAt: -1 });

    return (
        <div className="min-h-screen bg-zinc-50 pt-24 pb-16 dark:bg-black">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
                        Explore Our Courses
                    </h1>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
                        Advance your career with our comprehensive selection of technical courses.
                    </p>
                </div>

                {courses.length === 0 ? (
                    <div className="text-center py-20">
                        <h3 className="text-xl font-medium text-zinc-900 dark:text-zinc-50">No courses found</h3>
                        <p className="mt-2 text-zinc-500">Check back later for new content!</p>
                    </div>
                ) : (
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {courses.map((course) => (
                            <div
                                key={course._id}
                                className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
                            >
                                <div className="relative h-48 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                                    {/* Using a standard img tag here since we're using external URLs which might not be configured in next.config.js for Image component */}
                                    <img
                                        src={course.imageUrl || "/placeholder-course.jpg"}
                                        alt={course.title}
                                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <div className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-zinc-900 backdrop-blur-md dark:bg-black/80 dark:text-zinc-50">
                                        {course.category}
                                    </div>
                                </div>

                                <div className="flex flex-1 flex-col p-6">
                                    <div className="mb-4 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                                        <div className="flex items-center gap-1">
                                            <Clock className="h-3.5 w-3.5" />
                                            {course.duration} Hours
                                        </div>
                                        <div className="flex items-center gap-1 text-yellow-500">
                                            <Star className="h-3.5 w-3.5 fill-current" />
                                            4.8 (120)
                                        </div>
                                    </div>

                                    <h3 className="mb-2 text-xl font-bold leading-tight text-zinc-900 dark:text-zinc-50">
                                        {course.title}
                                    </h3>

                                    <p className="mb-6 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
                                        {course.description}
                                    </p>

                                    <div className="mt-auto flex items-center justify-between border-t border-zinc-100 pt-6 dark:border-zinc-800">
                                        <div className="flex items-center gap-2">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
                                                <User className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
                                            </div>
                                            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                                {course.instructorName || "Instructor"}
                                            </span>
                                        </div>
                                        <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                                            ₹{course.price.toLocaleString("en-IN")}
                                        </div>
                                    </div>

                                    <Link
                                        href={`/courses/${course._id}`}
                                        className="mt-6 flex w-full items-center justify-center rounded-xl bg-zinc-900 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
                                    >
                                        View Details
                                        <BookOpen className="ml-2 h-4 w-4" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
