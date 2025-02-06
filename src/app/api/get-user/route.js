import { connectDb } from "@/lib/connectDb"
import UserProfile from "@/models/user";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

export const GET = async (request) => {
    await connectDb();
    try {
        const token = request.cookies.get('token')?.value;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserProfile.findById(decoded.userId).select('-password');
        console.log('The decoded user id is : ', user);
        return NextResponse.json({message: user});

    } catch (error) {
        return NextResponse.json({ message: 'failed to get user' });
    }
}