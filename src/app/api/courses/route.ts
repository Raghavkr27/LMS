import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectDB } from "@/lib/db";
import Course from "@/models/Course";

export async function POST(req: NextRequest) {
    try {
        const session = await auth();

        // Check if user is authenticated and is an admin
        if (!session || session.user.role !== "admin") {
            return NextResponse.json(
                { error: "Unauthorized: Admin access required" },
                { status: 401 }
            );
        }

        const body = await req.json();

        await connectDB();

        // Create course with the provided data
        const course = await Course.create({
            title: body.title,
            description: body.description,
            category: body.category,
            level: body.level,
            price: Number(body.price),
            imageUrl: body.imageUrl || "",
            duration: Number(body.duration),
            instructorName: body.instructorName,
            status: body.status || "Draft",
            isPublished: body.status === "Published",
        });

        return NextResponse.json(
            { message: "Course created successfully", course },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("API Course POST Error:", error);
        return NextResponse.json(
            { error: "Failed to create course", details: error.message },
            { status: 500 }
        );
    }
}
