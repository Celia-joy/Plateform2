import nodemailer from "nodemailer"
import { EMAIL_USER, EMAIL_PASS } from "../config/env.js"

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS
    },
})

export const sendEmail = async ({ to, subject, html}) => {
    await transporter.sendMail({
        from: `"Plateform" <${EMAIL_USER}>`,
        to,
        subject,
        html
    })
}