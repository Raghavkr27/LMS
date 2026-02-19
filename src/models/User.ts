import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide a name"],
            maxlength: [60, "Name cannot be more than 60 characters"],
        },
        email: {
            type: String,
            required: [true, "Please provide an email"],
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: [true, "Please provide a password"],
            select: false, // Do not return password by default
        },
        role: {
            type: String,
            enum: ["user", "admin", "instructor"],
            default: "user",
        },
        image: {
            type: String,
        },
        resetPasswordToken: String,
        resetPasswordExpires: Date,
    },
    {
        timestamps: true,
    }
);

// Prevent overwriting the model if it's already compiled
const User = mongoose.models?.User || mongoose.model("User", UserSchema);

export default User;
