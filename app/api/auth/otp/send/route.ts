import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { generateUserId } from "@/lib/generateUserId";
import { sendOtpMail } from "@/lib/sendOtpMail";
import { checkRateLimit } from "@/lib/rateLimit";

export async function POST(request: Request) {
    try {
        await connectDB();
        
        const ip = request.headers.get("x-forwarded-for") || "unknown_ip";
        const isAllowed = await checkRateLimit(`otp_${ip}`, 3, 10); // 3 requests per 10 mins
        if (!isAllowed) {
            return Response.json({ success: false, message: "Too many requests. Please try again later." }, { status: 429 });
        }

        const { email } = await request.json();

        if (!email) {
            return Response.json({ success: false, message: "Email is required" }, { status: 400 });
        }

        const normalizedEmail = email.toLowerCase().trim();
        
        if (!normalizedEmail.endsWith("@gmail.com")) {
            return Response.json({ success: false, message: "Only @gmail.com addresses are allowed." }, { status: 400 });
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        let user = await User.findOne({ email: normalizedEmail });

        if (!user) {
            // Auto-register if not exists
            const name = normalizedEmail.split("@")[0];
            const dummyPhone = Math.floor(1000000000 + Math.random() * 9000000000).toString();
            const userId = generateUserId(name, dummyPhone);

            user = await User.create({
                userId,
                name,
                email: normalizedEmail,
                provider: "local",
                wallet: 0,
                order: 0,
                userType: "user",
                resetOtp: otp,
                resetOtpExpiry: expiry
            });
        } else {
            user.resetOtp = otp;
            user.resetOtpExpiry = expiry;
            await user.save();
        }

        await sendOtpMail(normalizedEmail, otp);

        return Response.json({ success: true, message: "OTP sent to your email" });
    } catch (error) {
        console.error("STP Send Error:", error);
        return Response.json({ success: false, message: "Failed to send OTP" }, { status: 500 });
    }
}
