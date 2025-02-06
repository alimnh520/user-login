import { NextResponse } from "next/server";

export const POST = async (request) => {
    try {
        const res = NextResponse.json({ message: 'Logged out successfully' });

        res.cookies.set('token', '', {
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production',
            expires: new Date(0),
            path: '/',
        });
        return res;
    } catch (error) {
        return NextResponse.json({ message: error });
    }
}