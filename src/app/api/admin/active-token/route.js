import { NextResponse } from "next/server";

export const GET = async (request) => {
    try {
        const token = request.cookies.get('token');
        return NextResponse.json({message: token.value});
    } catch (error) {
        return NextResponse.json({message: ''});
    }
}