const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error("Please define MONGODB_URI in .env.local");
    process.exit(1);
}

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: { type: String, select: true },
    role: String,
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

async function createAdmin() {
    const email = "admin@lms.com";
    const password = "admin123";

    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB...");

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.findOneAndUpdate(
            { email },
            {
                name: "Admin User",
                email,
                password: hashedPassword,
                role: "admin", // Important: Set role to admin
                image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
            },
            { upsert: true, new: true }
        );

        console.log("\n✅ Admin Account Created/Updated!");
        console.log("--------------------------------");
        console.log(`Email:    ${email}`);
        console.log(`Password: ${password}`);
        console.log("--------------------------------");

    } catch (error) {
        console.error("Error creating admin:", error);
    } finally {
        await mongoose.disconnect();
    }
}

createAdmin();
