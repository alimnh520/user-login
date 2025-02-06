import nodemailer from 'nodemailer';
import { connectDb } from '@/lib/connectDb';
import jwt from 'jsonwebtoken'

export const sendEmail = async ({ email, type, userId }) => {
    try {
        await connectDb();

        const verifyToken = jwt.sign({ userId: userId._id }, process.env.JWT_SECRET, { expiresIn: "5m" });
        
        const verifyUrl = `http://localhost:3000/verifypage?token=${verifyToken}`;

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "3ceeca04ae97e1",
                pass: "8396d818174724"
            }
        });

        const mailOptions = {
            from: 'alimnh412@gmail.com',
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