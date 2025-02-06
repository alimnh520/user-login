import UserProfile from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectDb } from "@/lib/connectDb";

export const POST = async (request) => {
    await connectDb();
    try {
        const { email, pass } = await request.json();

        const user = await UserProfile.findOne({ email });

        console.log(user);

        if (!user) {
            return NextResponse.json({ message: 'User not registered', success: false });
        }
        if (!user.isVerified) {
            return NextResponse.json({ message: 'User not Verified', success: false });
        }

        const comparePass = await bcrypt.compare(pass, user.password);

        if (!comparePass) {
            return NextResponse.json({ message: 'Password is wrong', success: false });
        }

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, { expiresIn: '1d' });

        const response = NextResponse.json({message: 'login successfully', success: true});
        response.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24*60*60*1000,
            path: '/'
        });
        return response
    } catch (error) {
        return NextResponse.json({ message: 'Failed to login', success: true });
    }
}