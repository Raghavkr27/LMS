import mongoose from "mongoose";

const EnrollmentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User reference is required"],
        },
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: [true, "Course reference is required"],
        },
        enrolledAt: {
            type: Date,
            default: Date.now,
        },
        progress: {
            type: Number,
            default: 0,
            min: 0,
            max: 100,
        },
    },
    {
        timestamps: true,
    }
);

// Prevent duplicate enrollments for the same user and course
EnrollmentSchema.index({ user: 1, course: 1 }, { unique: true });

const Enrollment = mongoose.models?.Enrollment || mongoose.model("Enrollment", EnrollmentSchema);

export default Enrollment;
