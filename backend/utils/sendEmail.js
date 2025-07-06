import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
export const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // or use your email provider's SMTP
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail ID
        pass: process.env.EMAIL_PASS, // App password (not your Gmail password)
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });

    console.log("📧 Email sent successfully");
  } catch (error) {
    console.error("❌ Email not sent", error);
  }
};
