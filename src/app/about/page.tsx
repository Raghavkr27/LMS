"use client";

import { motion } from "framer-motion";
import { Users, BookOpen, Award, Globe, Heart, Shield, Sparkles, CheckCircle2 } from "lucide-react";
import Image from "next/image";

const stats = [
    { label: "Active Students", value: "10,000+", icon: Users },
    { label: "Total Courses", value: "250+", icon: BookOpen },
    { label: "Expert Instructors", value: "100+", icon: Award },
    { label: "Countries Reach", value: "50+", icon: Globe },
];

const values = [
    {
        title: "Quality First",
        description: "We partner with top-tier industry experts to deliver content that is rigorous, relevant, and up-to-date.",
        icon: Sparkles,
    },
    {
        title: "Accessible Learning",
        description: "Education should be available to everyone. We strive to make our platform accessible and affordable.",
        icon: Globe,
    },
    {
        title: "Community Driven",
        description: "Learning is better together. We foster a supportive community where students help each other grow.",
        icon: Heart,
    },
    {
        title: "Integrity & Trust",
        description: "We are committed to transparency and honesty in everything we do, from pricing to content quality.",
        icon: Shield,
    },
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-black">
            {/* Hero Section */}
            <section className="relative overflow-hidden py-24 sm:py-32">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.blue.100),white)] opacity-50 dark:bg-[radial-gradient(45rem_50rem_at_top,theme(colors.blue.900),black)]" />

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mx-auto max-w-3xl text-center"
                    >
                        <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-6xl">
                            Empowering the Next Generation of{" "}
                            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                Innovators
                            </span>
                        </h1>
                        <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                            We are on a mission to democratize education by providing world-class learning resources to everyone, everywhere. Join us in shaping the future of technology.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="border-y border-zinc-100 bg-zinc-50/50 py-12 dark:border-zinc-800 dark:bg-zinc-900/50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                        {stats.map((stat) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="flex flex-col items-center justify-center text-center"
                            >
                                <div className="mb-3 rounded-full bg-blue-100 p-3 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                                    <stat.icon className="h-6 w-6" />
                                </div>
                                <div className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">{stat.value}</div>
                                <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="mb-6 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
                                Our Mission & Vision
                            </h2>
                            <p className="mb-6 text-lg text-zinc-600 dark:text-zinc-400">
                                Founded in 2024, Orbita LMS started with a simple idea: that high-quality education should not be a privilege, but a right. We believed that by combining cutting-edge technology with expert pedagogy, we could create a learning experience that rivals the best universities.
                            </p>
                            <p className="mb-8 text-lg text-zinc-600 dark:text-zinc-400">
                                Today, we are proud to support thousands of students across the globe as they master new skills, switch careers, and build the technologies of tomorrow.
                            </p>

                            <ul className="space-y-4">
                                {[
                                    "Industry-aligned curriculum",
                                    "Project-based learning approach",
                                    "24/7 Mentorship support",
                                    "Career guidance and placement",
                                ].map((item) => (
                                    <li key={item} className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
                                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative"
                        >
                            <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800">
                                {/* Placeholder for an office or team image */}
                                <div className="flex h-full w-full items-center justify-center text-zinc-400">
                                    <Globe className="h-32 w-32 opacity-20" />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                                    <div className="text-white">
                                        <p className="font-medium">Global Headquarters</p>
                                        <p className="text-sm opacity-80">Connecting learners worldwide</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="bg-zinc-50 py-24 dark:bg-zinc-900/50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-16 text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
                            Our Core Values
                        </h2>
                        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
                            The principles that guide every decision we make.
                        </p>
                    </div>

                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
                    >
                        {values.map((value) => (
                            <motion.div
                                key={value.title}
                                variants={item}
                                className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
                            >
                                <div className="mb-4 inline-flex rounded-xl bg-blue-50 p-3 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                                    <value.icon className="h-6 w-6" />
                                </div>
                                <h3 className="mb-2 text-xl font-bold text-zinc-900 dark:text-zinc-50">{value.title}</h3>
                                <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
