import UserProfile from "@/models/user";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

export const POST = async (request) => {
    try {
        const body = await request.json();
        const token = body.token;
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const user = await UserProfile.findById(decoded.userId);

        if (!user) return NextResponse.json({ message: "ইউজার পাওয়া যায়নি!" });

        if (user.isVerified) return NextResponse.json({ message: "তুমি আগেই ভেরিফাই করেছো!" });

        user.isVerified = true;
        await user.save();

        return NextResponse.json({ message: "তোমার একাউন্ট সফলভাবে ভেরিফাই হয়েছে!" , isVerified: true});

    } catch (error) {
        return NextResponse.json({ message: 'Time is over' });
    }
};
