import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectDB } from "@/lib/db";
import Enrollment from "@/models/Enrollment";
import Course from "@/models/Course";

// POST /api/enroll - Enroll a user in a course
export async function POST(req: NextRequest) {
    try {
        const session = await auth();

        if (!session || !session.user) {
            return NextResponse.json(
                { error: "Unauthorized: Please log in to enroll" },
                { status: 401 }
            );
        }

        const { courseId } = await req.json();

        if (!courseId) {
            return NextResponse.json(
                { error: "Course ID is required" },
                { status: 400 }
            );
        }

        await connectDB();

        // 1. Verify course exists
        const course = await Course.findById(courseId);
        if (!course) {
            return NextResponse.json(
                { error: "Course not found" },
                { status: 404 }
            );
        }

        // 2. Check if already enrolled
        const existingEnrollment = await Enrollment.findOne({
            user: session.user.id,
            course: courseId,
        });

        if (existingEnrollment) {
            return NextResponse.json(
                { error: "You are already enrolled in this course" },
                { status: 400 }
            );
        }

        // 3. Create enrollment
        const enrollment = await Enrollment.create({
            user: session.user.id,
            course: courseId,
        });

        return NextResponse.json(
            { message: "Successfully enrolled in the course", enrollment },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Enrollment POST Error:", error);
        return NextResponse.json(
            { error: "Failed to process enrollment", details: error.message },
            { status: 500 }
        );
    }
}

// GET /api/enroll - Get all enrollments for the current user
export async function GET(req: NextRequest) {
    try {
        const session = await auth();

        if (!session || !session.user) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        await connectDB();

        const enrollments = await Enrollment.find({ user: session.user.id })
            .populate("course")
            .sort({ enrolledAt: -1 });

        return NextResponse.json({ enrollments });
    } catch (error: any) {
        console.error("Enrollment GET Error:", error);
        return NextResponse.json(
            { error: "Failed to fetch enrollments" },
            { status: 500 }
        );
    }
}
