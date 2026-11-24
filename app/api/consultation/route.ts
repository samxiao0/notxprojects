import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, institution, category, message } = body;

    // Basic validation
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: "Name, email, phone, and project message are required." },
        { status: 400 }
      );
    }

    const recipientEmail = process.env.CONTACT_NOTIFICATION_EMAIL || "projects.notx@gmail.com";
    const apiKey = process.env.RESEND_API_KEY;

    if (apiKey) {
      const resend = new Resend(apiKey);

      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FBF8F1; margin: 0; padding: 24px; color: #111; }
            .card { background-color: #ffffff; max-width: 600px; margin: 0 auto; border-radius: 16px; border: 1px solid #e5e5e5; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.06); }
            .header { background-color: #000000; padding: 24px; text-align: center; }
            .header h1 { color: #CCFF00; margin: 0; font-size: 22px; font-weight: 900; letter-spacing: -0.5px; text-transform: uppercase; }
            .header p { color: #ffffff; margin: 6px 0 0; font-size: 13px; font-weight: 600; opacity: 0.85; }
            .content { padding: 24px; }
            .badge { display: inline-block; background-color: #CCFF00; color: #000; font-weight: 800; font-size: 11px; padding: 4px 10px; border-radius: 9999px; text-transform: uppercase; margin-bottom: 16px; }
            .field-row { margin-bottom: 14px; border-bottom: 1px solid #f0f0f0; padding-bottom: 10px; }
            .label { font-size: 11px; font-weight: 800; color: #666; text-transform: uppercase; margin-bottom: 2px; }
            .value { font-size: 15px; font-weight: 700; color: #111; }
            .message-box { background-color: #FBF8F1; border-radius: 12px; padding: 16px; margin-top: 18px; border: 1px solid #eee; }
            .message-box .label { color: #888; }
            .message-box .text { font-size: 14px; line-height: 1.5; color: #222; margin-top: 6px; white-space: pre-wrap; font-weight: 500; }
            .footer { background-color: #fafafa; padding: 18px 24px; text-align: center; border-top: 1px solid #f0f0f0; }
            .footer p { margin: 0; font-size: 12px; color: #777; font-weight: 600; }
            .btn-wa { display: inline-block; background-color: #25D366; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 9999px; font-weight: 800; font-size: 12px; text-transform: uppercase; margin-top: 12px; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">
              <h1>NOTX STUDIO</h1>
              <p>Direct Academic Project Consultation Request</p>
            </div>
            <div class="content">
              <span class="badge">${category || "General Inquiry"}</span>
              
              <div class="field-row">
                <div class="label">Student Name</div>
                <div class="value">${name}</div>
              </div>

              <div class="field-row">
                <div class="label">Phone / WhatsApp</div>
                <div class="value"><a href="tel:${phone}" style="color:#000; text-decoration:none;">${phone}</a></div>
              </div>

              <div class="field-row">
                <div class="label">Email Address</div>
                <div class="value"><a href="mailto:${email}" style="color:#000; text-decoration:none;">${email}</a></div>
              </div>

              <div class="field-row">
                <div class="label">College / University</div>
                <div class="value">${institution || "Not specified"}</div>
              </div>

              <div class="field-row">
                <div class="label">Project Domain</div>
                <div class="value">${category || "AI/ML"}</div>
              </div>

              <div class="message-box">
                <div class="label">Project Requirements & Scope</div>
                <div class="text">${message}</div>
              </div>

              <div style="text-align: center; margin-top: 20px;">
                <a href="https://wa.me/${phone.replace(/[^0-9]/g, "")}" class="btn-wa">Reply via WhatsApp &rarr;</a>
              </div>
            </div>
            <div class="footer">
              <p>Delivered securely by NOTX Serverless Cloud via Resend</p>
            </div>
          </div>
        </body>
        </html>
      `;

      await resend.emails.send({
        from: "NOTX Studio <onboarding@resend.dev>",
        to: [recipientEmail],
        replyTo: email,
        subject: `🎓 New Project Inquiry: ${name} (${category || "Academic Project"})`,
        html: htmlContent,
      });

      return NextResponse.json({
        success: true,
        message: "Consultation email successfully dispatched to advisory team.",
      });
    } else {
      // Local or fallback mode when RESEND_API_KEY is not yet added in environment
      console.log("=== NOTX CONSULTATION INQUIRY RECEIVED (MOCK/LOCAL MODE) ===");
      console.log({ name, email, phone, institution, category, message, timestamp: new Date().toISOString() });
      console.log("To send real emails to projects.notx@gmail.com, configure RESEND_API_KEY in .env.local or Vercel Environment Variables.");

      return NextResponse.json({
        success: true,
        message: "Inquiry recorded. (Notice: Configure RESEND_API_KEY in Vercel to activate live email delivery).",
      });
    }
  } catch (error: any) {
    console.error("Consultation form submission error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to process consultation request." },
      { status: 500 }
    );
  }
}
