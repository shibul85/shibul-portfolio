import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API route for contact form
  app.post("/api/contact", async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const targetEmail = 'shibulkumarpadhan85@gmail.com';

    try {
      // If EMAIL_PASS is not set, we'll log it and return a specific message
      if (!process.env.EMAIL_PASS) {
        console.warn("⚠️ EMAIL_PASS environment variable is missing. Email not sent.");
        console.log("Form Submission Details:", { name, email, message });
        return res.json({ 
          success: true, 
          message: "Message received! (Note: Email sending is currently in demo mode. Please configure EMAIL_PASS in settings to receive real emails.)" 
        });
      }

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER || targetEmail,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: `"${name}" <${email}>`,
        to: targetEmail,
        subject: `🚀 New Message from Portfolio: ${name}`,
        text: `You have a new message from your portfolio contact form.\n\n` +
              `--------------------------------------------------\n` +
              `Name:    ${name}\n` +
              `Email:   ${email}\n` +
              `Message:\n${message}\n` +
              `--------------------------------------------------\n\n` +
              `Reply directly to this email to contact ${name}.`,
        replyTo: email
      };

      await transporter.sendMail(mailOptions);
      console.log(`✅ Email sent successfully to ${targetEmail}`);
      res.json({ success: true, message: "Your message has been sent successfully!" });
    } catch (error) {
      console.error("❌ Error sending email:", error);
      res.status(500).json({ 
        error: "Failed to send email. Please ensure your Gmail App Password is correct in the settings." 
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
