import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, message } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || "nmr.amodya@gmail.com";
    const timestamp = new Date().toLocaleString("en-US", { timeZone: "Asia/Colombo" });

    let emailSent = false;
    let telegramSent = false;

    // 1. Send via SMTP (Gmail, Zoho, SendGrid, Hostinger, etc.)
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      const port = Number(process.env.SMTP_PORT) || 465;
      const isSecure = port === 465;

      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: port,
        secure: isSecure,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const htmlContent = `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0b0b0d; color: #ffffff; border: 1px solid #222; border-radius: 12px; padding: 24px; line-height: 1.6;">
          <div style="border-bottom: 1px solid #333; padding-bottom: 16px; margin-bottom: 20px;">
            <h2 style="margin: 0; color: #38bdf8; font-size: 20px;">🚀 New Portfolio Inquiry</h2>
            <p style="margin: 4px 0 0 0; font-size: 12px; color: #888;">Received on ${timestamp} (Sri Lanka Time)</p>
          </div>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; color: #888; font-size: 13px; width: 100px;"><strong>Name:</strong></td>
              <td style="padding: 8px 0; color: #fff; font-size: 14px; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #888; font-size: 13px;"><strong>Email:</strong></td>
              <td style="padding: 8px 0; color: #38bdf8; font-size: 14px;"><a href="mailto:${email}" style="color: #38bdf8; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #888; font-size: 13px;"><strong>Phone / Mobile:</strong></td>
              <td style="padding: 8px 0; color: #34d399; font-size: 14px; font-weight: 600;">${phone || "Not provided"}</td>
            </tr>
          </table>

          <div style="background-color: #141418; border-left: 4px solid #38bdf8; padding: 14px 18px; border-radius: 6px; margin-bottom: 20px;">
            <p style="margin: 0; font-size: 14px; color: #e5e5e5; white-space: pre-wrap;">${message}</p>
          </div>

          <div style="border-top: 1px solid #222; padding-top: 14px; font-size: 11px; color: #666; text-align: center;">
            Sent from amodya.dev portfolio contact form
          </div>
        </div>
      `;

      await transporter.sendMail({
        from: `"${name} via Portfolio" <${process.env.SMTP_USER}>`,
        to: receiverEmail,
        replyTo: email,
        subject: `💼 New Message from ${name} [${phone || email}]`,
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "N/A"}\nTime: ${timestamp}\n\nMessage:\n${message}`,
        html: htmlContent,
      });

      emailSent = true;
    }

    // 2. Instant Telegram Notification (Optional)
    if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
      try {
        const tgText = `🔔 *New Portfolio Message*\n\n👤 *Name:* ${name}\n📧 *Email:* ${email}\n📱 *Phone:* ${phone || "N/A"}\n⏰ *Time:* ${timestamp}\n\n💬 *Message:*\n${message}`;
        await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: process.env.TELEGRAM_CHAT_ID,
            text: tgText,
            parse_mode: "Markdown",
          }),
        });
        telegramSent = true;
      } catch (tgErr) {
        console.error("Telegram notification error:", tgErr);
      }
    }

    // 3. Discord Webhook Notification (Optional)
    if (process.env.DISCORD_WEBHOOK_URL) {
      try {
        await fetch(process.env.DISCORD_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            embeds: [
              {
                title: `🚀 New Contact Inquiry from ${name}`,
                color: 3728632,
                fields: [
                  { name: "Email", value: email, inline: true },
                  { name: "Phone", value: phone || "Not provided", inline: true },
                  { name: "Message", value: message },
                ],
                footer: { text: `amodya.dev • ${timestamp}` },
              },
            ],
          }),
        });
      } catch (dcErr) {
        console.error("Discord webhook error:", dcErr);
      }
    }

    // Log for dev environments if no delivery method is configured
    if (!emailSent && !telegramSent && !process.env.DISCORD_WEBHOOK_URL) {
      console.log("📨 [DEVELOPMENT] Contact Form Submission Received:");
      console.log({ name, email, phone, message, timestamp });
    }

    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully!",
    });
  } catch (error: any) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
