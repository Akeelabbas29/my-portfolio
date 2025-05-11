import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, message } = req.body;

    // Configure Nodemailer transport (using a Gmail example here, but you can use any service)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Set your email here
        pass: process.env.EMAIL_PASS, // Set your email password here
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER, // Your email
      subject: `New Contact Form Submission from ${name}`,
      text: `You have received a new message from ${name} (${email}):\n\n${message}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Message sent successfully!" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Something went wrong, please try again later." });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
