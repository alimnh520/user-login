import { connectDB } from "@/lib/connectDB"
import User from "@/models/userModel";
import bcryptjs from 'bcryptjs'
import { sendEmail } from "@/utils/mailer";
import { NextResponse } from "next/server";

export const POST = async (request) => {
    await connectDB();
    try {
        const {username, email, password} = await request.json();

        const userMail = await User.findOne({email});

        if (userMail) {
            return NextResponse.json({message: 'User already exists'}, {status: 400});
        }
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });
        const savedUser = await newUser.save();
        console.log(savedUser);

        //send verification mail
        await sendEmail({email, emailType: "VERIFY", userId:savedUser._id});

        return NextResponse.json({
            message: 'User register successfully',
            success: true,
            savedUser
        });
    } catch (error) {
        return NextResponse.json({message: error.message},{status: 500});
    }
}