
import { NextResponse } from "next/server";
const nodemailer = require("nodemailer");

export async function POST (request){
try {
const {subject, message} = await request.json ();
const transporter = nodemailer.createTransport({
    host: "smtpro.zoho.in",
    port: 465,
    secure: true,
    auth: {
      user: "organizapp@zohomail.com",
      pass: "8q]E~+Gy05&M"
    },
  });


const mailOption = {
    from: "organizapp@zohomail.com",
    to: "organizapp68@gmail.com",
    subject: "Send Email Tutorial",
    html:  `
    <h3> Hello </h3>
    <li> Title: ${subject} </li>
    <li> message: ${message} </li>
    `
}

await transporter.sendMail(mailOption)

return NextResponse.json ({message:"Email Sent Succesfully"}, {status:200})
}
catch(error){
  return NextResponse.json ({message:'Failed to send Email'}, {status:500})
}}