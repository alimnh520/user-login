import { connectDb } from "@/lib/connectDb"
import UserProfile from "@/models/user";
import { NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import { sendEmail } from "@/utils/meilar";

export const POST = async (request) => {
    await connectDb();
    try {
        const { username, email, password } = await request.json();

        const userMail = await UserProfile.findOne({ email });
        if (userMail) {
            return NextResponse.json({ message: "Email already exists", success: false });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPass = await bcryptjs.hash(password, salt);
        const user = new UserProfile({
            username,
            email,
            password: hashedPass
        });
        await user.save();
        await sendEmail({email, type: 'VERIFY', userId: user._id});

        return NextResponse.json({ message: 'User register successful', success: true });
    } catch (error) {
        return NextResponse.json({ message: error.message, success: false });
    }
}