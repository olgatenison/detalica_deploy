// app/api/contact/route.ts

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type ContactRequestBody = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ContactRequestBody;

    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (name.length < 2) {
      return NextResponse.json({ error: "Invalid name" }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    if (message.length < 10) {
      return NextResponse.json({ error: "Invalid message" }, { status: 400 });
    }

    const emailUser = process.env.EMAIL_USER?.trim();
    const emailPass = process.env.EMAIL_PASS?.trim();
    const mailTo = process.env.MAIL_TO?.trim();

    console.log("CONTACT EMAIL CONFIG:", {
      hasEmailUser: Boolean(emailUser),
      hasEmailPass: Boolean(emailPass),
      hasMailTo: Boolean(mailTo),
    });

    if (!emailUser || !emailPass || !mailTo) {
      console.error("Missing contact email environment variables");

      return NextResponse.json(
        { error: "Email service is not configured" },
        { status: 500 },
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    await transporter.verify();

    const result = await transporter.sendMail({
      from: `"DETAILICA Website" <${emailUser}>`,
      to: mailTo,
      replyTo: email,
      subject: `New contact message from ${name}`,
      text: [`Name: ${name}`, `Email: ${email}`, "", "Message:", message].join(
        "\n",
      ),
    });

    console.log("CONTACT EMAIL SENT:", {
      messageId: result.messageId,
      accepted: result.accepted,
      rejected: result.rejected,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("CONTACT API ERROR:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Failed to send message";

    return NextResponse.json(
      {
        error:
          process.env.NODE_ENV === "development"
            ? errorMessage
            : "Failed to send message",
      },
      { status: 500 },
    );
  }
}
