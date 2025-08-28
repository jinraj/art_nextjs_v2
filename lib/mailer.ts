// lib/mailer.ts
import nodemailer from "nodemailer";

export const transporter = process.env.SMTP_HOST
    ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
    : null; // handle missing config in dev

export async function sendVerificationEmail(to: string, code: string) {
  if (!transporter) {
    console.warn("No SMTP config; skipping email send");
    return;
  }
  console.log(`Sending verification email to ${to} with code ${code}`);
  const html = `
    <div style="font-family:system-ui,Segoe UI,Roboto,Helvetica,Arial">
      <h2>Verify your email</h2>
      <p>Your one-time code is:</p>
      <div style="font-size:28px;font-weight:700;letter-spacing:6px">${code}</div>
      <p>This code expires in 10 minutes.</p>
      <p>If you didn’t request this, you can ignore this email.</p>
    </div>
  `;
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM ?? "no-reply@example.com",
      to,
      subject: "Your verification code",
      html,
    });
    console.log(`Sent verification email to ${to}`);
  }
  catch (error) {
    console.error("Error sending email:", error);
  }
}
