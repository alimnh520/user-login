import nodemailer from 'nodemailer';
import { connectDb } from '@/lib/connectDb';
import jwt from 'jsonwebtoken'

export const sendEmail = async ({ email, type, userId }) => {
    try {
        await connectDb();

        const verifyToken = jwt.sign({ userId: userId._id }, process.env.JWT_SECRET, { expiresIn: "5m" });
        
        const verifyUrl = `http://localhost:3000/verifypage?token=${verifyToken}`;

        var transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.APP_MAIL,
                pass: process.env.APP_PASS
            }
        });

        const mailOptions = {
            from: process.env.APP_MAIL,
            to: email,
            subject: 'Verify your account',
            html: `
                <div>
                    <p>Click the button to verify your account</p>
                    <a href="${verifyUrl}">Verify Email</a>
                    <p>${verifyUrl}</p>
                </div>
            `,
        }
        await transport.sendMail(mailOptions);

    } catch (error) {
        console.log(error)
    }
}