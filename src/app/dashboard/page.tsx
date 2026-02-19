import { auth, signOut } from "@/auth";

export default async function DashboardPage() {
    const session = await auth();

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Dashboard
                    </h1>
                    <form
                        action={async () => {
                            "use server";
                            await signOut({ redirectTo: "/login" });
                        }}
                    >
                        <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                            Sign Out
                        </button>
                    </form>
                </div>

                <div className="bg-white dark:bg-zinc-900 shadow rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                        Welcome back, {session?.user?.name || "User"}!
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        You are successfully logged in.
                    </p>
                    <div className="mt-4 p-4 bg-gray-100 dark:bg-zinc-800 rounded">
                        <p className="font-mono text-sm text-gray-500 dark:text-gray-400">
                            Email: {session?.user?.email}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
