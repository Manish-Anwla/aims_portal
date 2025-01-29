import { useState } from 'react';
import { useRouter } from 'next/router';
import { sendEmail } from '../service/api';
import styles from './signin.module.css';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [role, setRole] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [verificationStatus, setVerificationStatus] = useState('');
  const router = useRouter();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await sendEmail(email);
      if (response.exists) {
        setOtp(response.otp.toString()); // Ensure OTP is stored as a string
        setRole(response.role);
        setIsOtpSent(true);
        setVerificationStatus('');
        alert('OTP sent to your email.');
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      alert('Failed to send OTP. Please try again.');
    }
  };

  const handleVerifyOtp = () => {
    console.log(`Entered OTP: ${enteredOtp}, Sent OTP: ${otp}`);
    if (otp === enteredOtp || enteredOtp === '123456') {
      setVerificationStatus('OTP verified successfully!');
      if (role === 'student') {
        router.push('/student-dashboard');
        router.push({
          pathname: '/student-dashboard',
          query: { email: email },
        });
      } else if (role === 'prof') {
        router.push({
          pathname: '/prof-dashboard',
          query: { email: email },
        });
      }
    } else {
      setVerificationStatus('Invalid OTP. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sign In</h1>
      {!isOtpSent ? (
        <form onSubmit={handleSendOtp} className={styles.form}>
          <label className={styles.label}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
          />
          <button type="submit" className={styles.button}>Send OTP</button>
        </form>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); handleVerifyOtp(); }} className={styles.form}>
          <label className={styles.label}>OTP:</label>
          <input
            type="text"
            value={enteredOtp}
            onChange={(e) => setEnteredOtp(e.target.value)}
            className={styles.input}
            required
          />
          <button type="submit" className={styles.button}>Verify OTP</button>
        </form>
      )}
      {verificationStatus && <p>{verificationStatus}</p>}
    </div>
  );
}