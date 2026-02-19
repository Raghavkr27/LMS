import NextAuth from "next-auth";

import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectDB } from "./lib/db";
import User from "./models/User";
import { z } from "zod";

async function getUser(email: string) {
    try {
        await connectDB();
        const user = await User.findOne({ email }).select("+password");
        return user;
    } catch (error) {
        console.error("Failed to fetch user:", error);
        throw new Error("Failed to fetch user.");
    }
}

export const { auth, signIn, signOut, handlers } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const lowerEmail = email.toLowerCase();
                    console.log("Attempting login for:", lowerEmail);

                    const user = await getUser(lowerEmail);
                    if (!user) {
                        console.log("User not found in DB.");
                        return null;
                    }

                    console.log("User found. Verifying password...");
                    const passwordsMatch = await bcrypt.compare(password, user.password);

                    if (passwordsMatch) {
                        console.log("Password match! Login successful.");
                        return {
                            id: user._id.toString(),
                            name: user.name,
                            email: user.email,
                            role: user.role,
                        };
                    } else {
                        console.log("Password mismatch.");
                    }
                }

                console.log("Invalid credentials or parsing failed");
                return null;
            },
        }),
    ],
});
