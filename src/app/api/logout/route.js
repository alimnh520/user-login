import { NextResponse } from "next/server";

export const GET = async (request) => {

    try {
        const response = NextResponse.json({
            message: 'Logged out successful',
            success: true
        });
        response.cookies.set("token", '', {
            httpOnly: true,
            expires: new Date(0)
        });

        return response

    } catch (error) {
        return NextResponse.json(
            { message: error },
            { status: 500 }
        );
    }
}