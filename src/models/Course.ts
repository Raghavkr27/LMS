import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Please provide a course title"],
            maxlength: [100, "Title cannot be more than 100 characters"],
        },
        description: {
            type: String,
            required: [true, "Please provide a description"],
        },
        category: {
            type: String,
            required: [true, "Please select a category"],
            default: "Development",
        },
        level: {
            type: String,
            enum: ["Beginner", "Intermediate", "Advanced"],
            default: "Beginner",
        },
        price: {
            type: Number,
            required: [true, "Please provide a price"],
            min: [0, "Price must be a positive number"],
        },
        imageUrl: {
            type: String,
            default: "",
        },
        duration: {
            type: Number,
            required: [true, "Please provide course duration in hours"],
        },
        instructorName: {
            type: String,
            required: [true, "Please provide the instructor name"],
        },
        status: {
            type: String,
            enum: ["Draft", "Published"],
            default: "Draft",
        },
        isPublished: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Course = mongoose.models?.Course || mongoose.model("Course", CourseSchema);

export default Course;
