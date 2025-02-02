import User from "@/models/userModel";
import { NextResponse } from "next/server"
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken'

export const POST = async(request) => {
    try {
        const reqBody = await request.json();
        console.log(reqBody);
        const {email, password} = reqBody;

        const user = await User.findOne({email});
        if (!user) {
            return NextResponse.json({message: 'User does not registered'});
        }
        console.log("User exits");

        const validPassword = await bcryptjs.compare(password, user.password);

        if (!validPassword) {
            return NextResponse.json({message: 'Password is invalid'},{status: 400});
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {expiresIn: '1d'});

        const response = NextResponse.json({
            message: 'Logged in success',
            success: true,
        });
        response.cookies.set("token", token, {
            httpOnly: true
        });

        return response

    } catch (error) {
        return NextResponse.json(
            { message: error},
            {status: 500}
        );
    }
}