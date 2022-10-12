import { createTransport } from "nodemailer";
import dontenv from "dotenv";
import logger from "./logger.config.js";
dontenv.config();

const ADMIN_MAIL = process.env.ADMIN_MAIL;

const sendMail = async (to, subject, message) => {
  const transporter = createTransport({
    service: "gmail",
    port: 587,
    auth: {
      user: ADMIN_MAIL,
      pass: process.env.ADMIN_PASS,
    },
  });

  const mailOptions = {
    from: "Node Server",
    to: to,
    subject: subject,
    html: message,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    logger.error("error sending mail: ", error);
  }
};

export default sendMail;
