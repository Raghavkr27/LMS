const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    process.exit(1);
}

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: { type: String, select: true },
    role: String,
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

async function resetPassword() {
    const email = "test@example.com";
    const newPassword = "password123";

    try {
        await mongoose.connect(MONGODB_URI);

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update or Create User
        const user = await User.findOneAndUpdate(
            { email },
            {
                name: "Test User",
                email,
                password: hashedPassword,
                role: "user"
            },
            { upsert: true, new: true }
        );

        console.log(`User ${email} updated with password: ${newPassword}`);

    } catch (error) {
        console.error("Error:", error);
    } finally {
        await mongoose.disconnect();
    }
}

resetPassword();
