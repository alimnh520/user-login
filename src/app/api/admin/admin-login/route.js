import { NextResponse } from "next/server"
import jwt from 'jsonwebtoken'
import userLogin from "@/app/models/userLogin";
import { connectDb } from "@/app/lib/connectDb";

export const POST = async (request) => {
    try {
        const reqBody = await request.json();
        const {username,password} = reqBody.user;

        if (!username || !password) {
            return NextResponse.json({message: "সকল ঘর পূরণ করুন!", success: false});
        }
        await connectDb();
        const saveUser = new userLogin({
            username,
            password
        });
        await saveUser.save();
        return NextResponse.json({message: "সফল হয়েছে!", success: true});

        // const token = jwt.sign({user: username}, process.env.JWT_SECRET, {expiresIn: '1d'});

        // const response = NextResponse.json({message: 'সফল হয়েছে!', success: true});
        // response.cookies.set('token', token, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === "production",
        //     maxAge: 24*60*60,
        //     sameSite: "strict",
        //     path: '/'
        // });
        // return response

    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "Failed to login"});
    }
}