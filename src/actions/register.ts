"use server";

import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { z } from "zod";

const RegisterSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function register(formData: FormData) {
    const validatedFields = RegisterSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
    });

    if (!validatedFields.success) {
        return {
            error: "Invalid fields. Failed to register.",
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
        });

        return { success: "User registered successfully!" };
    } catch (error) {
        console.error("Registration error:", error);
        return { error: "Something went wrong." };
    }
}
