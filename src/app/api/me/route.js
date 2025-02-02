import User from "@/models/userModel";
import { GetDataToken } from "@/utils/getDataToken"
import { NextResponse } from "next/server";

export const POST = async(request) => {
    const userId = await GetDataToken(request);
    const user = await User.findOne({_id: userId}).select("-password");

    return NextResponse.json({
        message: "user found",
        data : user
    });
}