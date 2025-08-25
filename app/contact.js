// import nodemailer from "nodemailer";

// export default async function handler(req, res) {
//   if (req.method === "POST") {
//     console.log("📧 Contact API: Request received", {
//       name: req.body.name,
//       email: req.body.email,
//     });

//     const { name, email, message } = req.body;

//     // Configure Nodemailer transport (using a Gmail example here, but you can use any service)
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER, // Set your email here
//         pass: process.env.EMAIL_PASS, // Set your email password here
//       },
//     });

//     console.log("📧 Contact API: Email config loaded", {
//       user: process.env.EMAIL_USER ? "Set" : "Missing",
//       pass: process.env.EMAIL_PASS ? "Set" : "Missing",
//     });

//     const mailOptions = {
//       from: email,
//       to: process.env.EMAIL_USER, // Your email
//       subject: `New Contact Form Submission from ${name}`,
//       text: `You have received a new message from ${name} (${email}):\n\n${message}`,
//     };

//     try {
//       console.log("📧 Contact API: Attempting to send email...");
//       await transporter.sendMail(mailOptions);
//       console.log("📧 Contact API: Email sent successfully!");
//       res.status(200).json({ message: "Message sent successfully!" });
//     } catch (error) {
//       console.error("📧 Contact API: Email sending failed:", error.message);
//       res
//         .status(500)
//         .json({ message: "Something went wrong, please try again later." });
//     }
//   } else {
//     res.status(405).json({ message: "Method Not Allowed" });
//   }
// }
