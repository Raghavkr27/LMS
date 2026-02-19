import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/Sidebar";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (!session || session.user.role !== "admin") {
        redirect("/");
    }

    return (
        <div className="flex min-h-screen flex-col md:flex-row pt-16">
            <AdminSidebar />
            <main className="flex-1 bg-white dark:bg-black overflow-y-auto">{children}</main>
        </div>
    );
}
