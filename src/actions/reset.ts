"use server";

import { z } from "zod";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import crypto from "crypto";
import { sendResetEmail } from "@/lib/mail";
import bcrypt from "bcryptjs";

const ForgotPasswordSchema = z.object({
    email: z.string().email(),
});

const ResetPasswordSchema = z.object({
    token: z.string(),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export async function forgotPassword(prevState: any, formData: FormData) {
    const validatedFields = ForgotPasswordSchema.safeParse({
        email: formData.get("email"),
    });

    if (!validatedFields.success) {
        return { error: "Invalid email address." };
    }

    const { email } = validatedFields.data;

    try {
        await connectDB();
        const user = await User.findOne({ email });
        if (!user) {
            console.log(`Password reset attempt for non-existent email: ${email}`);
            // We return success even if user not found for security reasons
            return { success: "If an account exists with that email, a reset link has been sent." };
        }

        console.log(`User found for password reset: ${user.email}`);

        const resetToken = crypto.randomBytes(32).toString("hex");
        const resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
        const resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.resetPasswordToken = resetPasswordToken;
        user.resetPasswordExpires = resetPasswordExpires;
        await user.save();

        const resetUrl = `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/reset-password?token=${resetToken}`;

        console.log(`Password reset URL: ${resetUrl}`);
        await sendResetEmail(user.email, resetUrl);

        return { success: "If an account exists with that email, a reset link has been sent." };
    } catch (error: any) {
        console.error("Forgot password error details:", error);

        // Check for common SMTP errors
        if (error.code === 'EAUTH' || error.command === 'CONN') {
            return { error: "Email service configuration error. Please check your SMTP settings." };
        }

        return { error: "Something went wrong. Please try again later." };
    }
}

export async function resetPassword(prevState: any, formData: FormData) {
    const validatedFields = ResetPasswordSchema.safeParse({
        token: formData.get("token"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword"),
    });

    if (!validatedFields.success) {
        return { error: validatedFields.error.flatten().fieldErrors };
    }

    const { token, password } = validatedFields.data;
    const resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");

    try {
        await connectDB();
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            return { error: "Invalid or expired reset token." };
        }

        // In a real app, hash the password here if not handled by mongoose middleware
        // assuming we use bcrypt in a pre-save hook or manual hashing
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        return { success: "Password reset successful!" };
    } catch (error) {
        return { error: "Something went wrong." };
    }
}
