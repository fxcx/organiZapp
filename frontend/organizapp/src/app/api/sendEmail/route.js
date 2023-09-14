"use strict";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    console.log ("ready")
    const { name, email, message, subject } = await request.json();
    const mainMail = process.env.EMAIL
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: mainMail,
        pass: process.env.MAILER_PASS,
      },
    });

    const mailOption = {
      from: mainMail,
      to: mainMail,
      subject: `Email sent by: ${name}`,
      html: `
    <h3> Hello </h3>
    <li> Name: ${name} </li>
    <li> Subject: ${subject} </li>
    <li> Email: ${email} </li>
    <li> message: ${message} </li>
    `,
    };
    
    const mailSent = {
      from: mainMail,
      to: email,
      subject: `This is your information from the email you sent: ${name}`,
      html: `
    <h3> Hello </h3>
    <li> Name: ${name} </li>
    <li> Subject: ${subject} </li>
    <li> Email: ${email} </li>
    <li> message: ${message} </li>
    <li> We will be happy to respond to you as soon as possible!  </li>
    `,
    };

    await transporter.sendMail(mailOption);
    await transporter.sendMail(mailSent);

    return NextResponse.json(
      { message: "Email Sent Successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to Send Email" },
      { status: 500 }
    );
  }
}
