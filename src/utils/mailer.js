import { connectDB } from '@/lib/connectDB';
import User from '@/models/userModel';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';

export const sendEmail = async ({ email, emailType, userId }) => {
    try {
        await connectDB();
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);
        console.log('hashed token is : ', hashedToken);

        if (emailType == 'VERIFY') {
            await User.findByIdAndUpdate(userId, {
                $set: {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000
                }
            });
        } else if (emailType == 'RESET') {
            await User.findByIdAndUpdate(userId, {
                $set: {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 3600000
                }
            });
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "c77f128d304f10",
                pass: "10aa25f1d43519"
            }
        });

        const mailOptions = {
            from: 'alimnh412@gmail.com',
            to: email,
            subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">Here</a> to ${emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password'}
            or copy and paste the link below in your browser. <br>
            ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`,
        }
        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse

    } catch (error) {
        console.log(error)
    }
}