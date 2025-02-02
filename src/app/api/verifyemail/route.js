import { connectDB } from "@/lib/connectDB";
import User from "@/models/userModel";
import { NextResponse } from "next/server"

export const POST = async (request) => {
    await connectDB();
    try {
        const reqBody = await request.json();

        const {token} = reqBody
        console.log('The token is ', token);

        const user = await User.findOne({verifyToken : token, verifyTokenExpiry : {$gt: Date.now()}});

        if (!user) {
            return NextResponse.json({message: 'Invalid token details'}, {status : 400});
        }
        console.log(user);

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        await user.save();
        return NextResponse.json({
            message: 'Email verified successful',
            success: true
        }, {status: 200});

    } catch (error) {
        return NextResponse.json({message: error}, {status : 500})
    }
}