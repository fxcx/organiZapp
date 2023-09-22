"use strict";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    console.log("ready");
    const { name, email, message, subject } = await request.json();
    const mainMail = process.env.EMAIL;
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
      <div style="background-color: #f5f5f5; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0,0,0,0.2);">
          <h1 >Details of Mail</h1>
          <table>
              <tr>
                  <td><strong>Name: ${name}</strong></td>
              </tr>
              <tr>
                  <td><strong>Subject: ${subject}</strong></td>
              </tr>
              <tr>
                  <td><strong>Email: ${email}</strong></td>
              </tr>
          </table>
          <hr style=" border-color: #18A14F; 
            border-width: 1px; 
            margin: 20px 0;;">
          <h2>Message:${message}</h2>

      </div>
        <p style="padding:10px;">
          <strong>Mail generated by:</strong> ${mainMail}
        </p>
  </div>
    `,
    };

    const mailSent = {
      from: mainMail,
      to: email,
      subject: `This is your information from the email you sent: ${name}`,
      html: `
      <div style="background-color: #f5f5f5; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0,0,0,0.2);">
          <h1 >Details of Mail</h1>
          <table>
              <tr>
                  <td><strong>Name: ${name}</strong></td>
              </tr>
              <tr>
                  <td><strong>Subject: ${subject}</strong></td>
              </tr>
              <tr>
                  <td><strong>Email: ${email}</strong></td>
              </tr>
          </table>
          <hr style=" border-color: #18A14F; 
            border-width: 1px; 
            margin: 20px 0;;">
          <h2>Message:${message}</h2>

      </div>
        <p style="padding:10px;">
          <strong>Mail generated by:</strong> ${mainMail}
        </p>
  </div>
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
