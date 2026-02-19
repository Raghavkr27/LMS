"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

interface EnrollButtonProps {
    courseId: string;
    price: number;
    isLoggedIn: boolean;
}

export default function EnrollButton({ courseId, price, isLoggedIn }: EnrollButtonProps) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleEnroll = async () => {
        if (!isLoggedIn) {
            router.push("/login");
            return;
        }

        try {
            setLoading(true);
            const response = await fetch("/api/enroll", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ courseId }),
            });

            if (!response.ok) {
                const error = await response.text();
                throw new Error(error || "Enrollment failed");
            }

            toast.success("Enrolled successfully!");
            router.push("/dashboard");

        } catch (error) {
            console.error("Enrollment error:", error);
            toast.error("You are already enrolled or an error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleEnroll}
            disabled={loading}
            className="flex w-full items-center justify-center rounded-xl bg-blue-600 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:bg-blue-700 hover:shadow-blue-500/40 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
        >
            {loading ? (
                <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing...
                </>
            ) : (
                <>
                    Enroll Now - ₹{price.toLocaleString("en-IN")}
                </>
            )}
        </button>
    );
}
