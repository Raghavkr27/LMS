"use server";

import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { z } from "zod";

const RegisterAdminSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function registerAdmin(prevState: any, formData: FormData) {
    const validatedFields = RegisterAdminSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
    });

    if (!validatedFields.success) {
        return {
            error: "Invalid fields. Failed to register admin.",
        };
    }

    const { name, email, password } = validatedFields.data;

    try {
        await connectDB();

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return { error: "Email already in use." };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name,
            email,
            password: hashedPassword,
            role: "admin", // Explicitly set role to admin
        });

        return { success: "Admin registered successfully! Redirecting to login..." };
    } catch (error) {
        console.error("Admin registration error:", error);
        return { error: "Something went wrong." };
    }
}
