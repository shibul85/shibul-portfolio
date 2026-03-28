import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const targetEmail = 'shibulkumarpadhan85@gmail.com';

  try {
    // If EMAIL_PASS is not set, we'll log it and return a specific message
    if (!process.env.EMAIL_PASS) {
      console.warn("âš ï¸ EMAIL_PASS environment variable is missing. Email not sent.");
      console.log("Form Submission Details:", { name, email, message });
      return res.json({ 
        success: true, 
        message: "Message received! (Note: Email sending is currently in demo mode. Please configure EMAIL_PASS in Vercel environment variables to receive real emails.)" 
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
    console.log(`âœ… Email sent successfully to ${targetEmail}`);
    res.json({ success: true, message: "Your message has been sent successfully!" });
  } catch (error) {
    console.error("âŒ Error sending email:", error);
    res.status(500).json({ 
      error: "Failed to send email. Please ensure your Gmail App Password is correct in the Vercel environment variables." 
    });
  }
}
