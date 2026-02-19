import Link from "next/link";

export function Footer() {
    return (
        <footer className="w-full border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-black">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div className="flex flex-col gap-4">
                        <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                            LMS<span className="text-blue-600">Pro</span>
                        </span>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                            Empowering learners with world-class education.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Product</h3>
                        <ul className="mt-4 space-y-2">
                            <li><Link href="/courses" className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50">Courses</Link></li>
                            <li><Link href="/pricing" className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50">Pricing</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Company</h3>
                        <ul className="mt-4 space-y-2">
                            <li><Link href="/about" className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50">About Us</Link></li>
                            <li><Link href="/contact" className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Legal</h3>
                        <ul className="mt-4 space-y-2">
                            <li><Link href="/privacy" className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50">Privacy</Link></li>
                            <li><Link href="/terms" className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50">Terms</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 border-t border-zinc-200 pt-8 dark:border-zinc-800">
                    <p className="text-center text-xs text-zinc-600 dark:text-zinc-400">
                        &copy; {new Date().getFullYear()} LMS Pro. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
