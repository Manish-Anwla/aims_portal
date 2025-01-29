import Email from '../models/login_email.js';
import { sendVerificationCode } from '../middleware/send-otp.js';

export const check_email = async (req, res) => {
  const { email } = req.body;
//   console.log(`Received email to check: ${email}`);

//   if (!email) {
//     return res.status(400).json({ message: 'Email is required' });
//   }

  try {
    // const trimmedEmail = email.trim().toLowerCase();
    // console.log(`Trimmed and lowercased email: ${trimmedEmail}`);

    const emailRecord = await Email.findOne({ email });
    // console.log(`Database query result: ${emailRecord}`);

    if (!emailRecord) {
      return res.status(404).json({ message: 'Email not found in the database', role: 'none' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    await sendVerificationCode(email, otp);

    return res.status(200).json({ type: emailRecord.email_type, otp: otp });
  } catch (error) {
    console.error('Error checking email:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};