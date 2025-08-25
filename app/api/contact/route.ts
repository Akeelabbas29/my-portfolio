// app/api/contact/route.ts
import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    console.log("📧 Contact API: Request received", { name, email });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    console.log("�� Contact API: Email config loaded", {
      user: process.env.EMAIL_USER ? "Set" : "Missing",
      pass: process.env.EMAIL_PASS ? "Set" : "Missing",
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: `New Contact Form Submission from ${name}`,
      text: `You have received a new message from ${name} (${email}):\n\n${message}`,
    };

    console.log("📧 Contact API: Attempting to send email...");
    await transporter.sendMail(mailOptions);
    console.log("�� Contact API: Email sent successfully!");

    return NextResponse.json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error(
      "�� Contact API: Email sending failed:",
      error instanceof Error ? error.message : "Unknown error"
    );
    return NextResponse.json(
      { message: "Something went wrong, please try again later." },
      { status: 500 }
    );
  }
}
