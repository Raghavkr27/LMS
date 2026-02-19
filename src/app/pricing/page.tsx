import Link from "next/link";
import { Check, Shield, Zap, Star } from "lucide-react";

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-zinc-50 pt-24 pb-16 dark:bg-black">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-base font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
                        Pricing Plans
                    </h2>
                    <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
                        Invest in your future
                    </h1>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
                        Choose the plan that fits your learning goals. Transparent pricing, no hidden fees.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid gap-8 lg:grid-cols-3 lg:gap-8">
                    {/* Starter Plan */}
                    <div className="relative flex flex-col rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                        <div className="mb-6">
                            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Starter</h3>
                            <p className="mt-2 text-zinc-500 dark:text-zinc-400">Perfect for exploring new skills.</p>
                        </div>
                        <div className="mb-6 flex items-baseline">
                            <span className="text-5xl font-extrabold text-zinc-900 dark:text-zinc-50">Free</span>
                        </div>
                        <ul className="mb-8 space-y-4 flex-1">
                            {["Access to free courses", "Community support", "Basic quizzes", "Mobile access"].map((feature) => (
                                <li key={feature} className="flex items-start">
                                    <Check className="mr-3 h-5 w-5 flex-shrink-0 text-green-500" />
                                    <span className="text-zinc-600 dark:text-zinc-300">{feature}</span>
                                </li>
                            ))}
                        </ul>
                        <Link
                            href="/register"
                            className="block w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-center text-sm font-bold text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
                        >
                            Get Started
                        </Link>
                    </div>

                    {/* Pro Plan */}
                    <div className="relative flex flex-col rounded-2xl border-2 border-blue-600 bg-white p-8 shadow-xl dark:border-blue-600 dark:bg-zinc-900">
                        <div className="absolute -top-5 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-4 py-1 text-sm font-bold text-white shadow-md">
                            Most Popular
                        </div>
                        <div className="mb-6">
                            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Pro Learner</h3>
                            <p className="mt-2 text-zinc-500 dark:text-zinc-400">For serious learners and professionals.</p>
                        </div>
                        <div className="mb-6 flex items-baseline">
                            <span className="text-5xl font-extrabold text-zinc-900 dark:text-zinc-50">₹499</span>
                            <span className="ml-2 text-zinc-500 dark:text-zinc-400">/month</span>
                        </div>
                        <ul className="mb-8 space-y-4 flex-1">
                            {[
                                "Access to ALL courses",
                                "Certificates of completion",
                                "Premium support",
                                "Offline downloads",
                                "Project reviews",
                                "Exclusive workshops"
                            ].map((feature) => (
                                <li key={feature} className="flex items-start">
                                    <Check className="mr-3 h-5 w-5 flex-shrink-0 text-blue-600 dark:text-blue-400" />
                                    <span className="text-zinc-900 font-medium dark:text-zinc-100">{feature}</span>
                                </li>
                            ))}
                        </ul>
                        <Link
                            href="/login?plan=pro"
                            className="block w-full rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:bg-blue-700 hover:shadow-blue-500/40"
                        >
                            Start Free Trial
                        </Link>
                    </div>

                    {/* Business Plan */}
                    <div className="relative flex flex-col rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                        <div className="mb-6">
                            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Business</h3>
                            <p className="mt-2 text-zinc-500 dark:text-zinc-400">For teams and organizations.</p>
                        </div>
                        <div className="mb-6 flex items-baseline">
                            <span className="text-4xl font-extrabold text-zinc-900 dark:text-zinc-50">Custom</span>
                        </div>
                        <ul className="mb-8 space-y-4 flex-1">
                            {[
                                "Unlimited team members",
                                "Advanced analytics dashboard",
                                "SSO & Security features",
                                "Dedicated account manager",
                                "Custom learning paths",
                                "API access"
                            ].map((feature) => (
                                <li key={feature} className="flex items-start">
                                    <Check className="mr-3 h-5 w-5 flex-shrink-0 text-purple-500" />
                                    <span className="text-zinc-600 dark:text-zinc-300">{feature}</span>
                                </li>
                            ))}
                        </ul>
                        <Link
                            href="/contact"
                            className="block w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-center text-sm font-bold text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
                        >
                            Contact Sales
                        </Link>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mx-auto mt-24 max-w-3xl">
                    <h2 className="text-center text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                        Frequently Asked Questions
                    </h2>
                    <div className="mt-12 space-y-8">
                        <div>
                            <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-50">Can I cancel anytime?</h3>
                            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                                Yes, you can cancel your subscription at any time. You will continue to have access until the end of your billing cycle.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-50">Is there a student discount?</h3>
                            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                                Yes! We offer a 50% discount for students with a valid .edu email address. Contact support to apply.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-50">Do you offer refunds?</h3>
                            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                                We offer a 14-day money-back guarantee if you are not satisfied with our content.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
