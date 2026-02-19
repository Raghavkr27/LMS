import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export const sendResetEmail = async (email: string, resetUrl: string) => {
    // Development fallback if SMTP is not configured
    if (!process.env.SMTP_USER || process.env.SMTP_USER === "your-email@gmail.com" || process.env.SMTP_USER.includes("example.com") || process.env.SMTP_PASS === "your-app-password") {
        console.log("------------------------------------------");
        console.log("📧 DEVELOPMENT MODE: Password Reset Email");
        console.log(`To: ${email}`);
        console.log(`Reset URL: ${resetUrl}`);
        console.log("------------------------------------------");
        return { messageId: "dev-mock-id" };
    }

    const mailOptions = {
        from: `"LMS Support" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Reset your Password",
        html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e4e4e7; border-radius: 12px;">
                <h2 style="color: #4f46e5; margin-bottom: 16px;">Reset Your Password</h2>
                <p style="color: #3f3f46; line-height: 1.6;">You requested a password reset for your account. Click the button below to set a new password. This link will expire in 1 hour.</p>
                <div style="margin: 32px 0;">
                    <a href="${resetUrl}" style="background-color: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Reset Password</a>
                </div>
                <p style="color: #71717a; font-size: 14px;">If you didn't request this, any changes made will be ignored.</p>
                <hr style="border: 0; border-top: 1px solid #e4e4e7; margin: 24px 0;" />
                <p style="color: #a1a1aa; font-size: 12px;">Sent from LMS Pro</p>
            </div>
        `,
    };

    return transporter.sendMail(mailOptions);
};
