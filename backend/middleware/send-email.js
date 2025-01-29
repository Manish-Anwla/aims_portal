import nodemailer from 'nodemailer'

import dotenv from "dotenv";
dotenv.config();

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "manishanwla1@gmail.com",
        pass: process.env.APP_PASSWORD,
    },
});

const sendEmail = async () => {
    try {
        const info = await transporter.sendMail({
            from: '"Aims Portal" <manishanwla1@gmail.com>',
            to: "manishanwlaiitrpr@gmail.com",
            subject: "Your OTP for Login",
            text: `Your OTP is 123456`,
            html: `<b>Your OTP is 123456</b>`,
        });
    } catch (error) {
        console.error(error);
    }
}

sendEmail()