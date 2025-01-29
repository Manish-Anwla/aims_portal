import { Verification_Email_Template } from "../utils/emailTemplate.js";
import { transporter } from "./send-email.js";

export const sendVerificationCode = async (email, otp) => {
    try {
        
        const response = await transporter.sendMail({
            from: '"Aims Portal" <manishanwla1@gmail.com>',
            to: email,
            subject: "Verify your email",
            text: "Verify your email",
            html: Verification_Email_Template.replace("{verificationCode}", otp),
        });
        
        console.log('Verification code sent:', response.messageId);
        
    } catch (error) {
        console.error('Error sending verification code:', error);
        throw error;
    }
}