import twilio from "twilio";
import dotenv from "dotenv";
import logger from "./logger.config.js";
dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const smsNumber = process.env.TWILIO_SMS_NUMBER;
const wppNumber = process.env.TWILIO_WPP_NUMBER;

const client = twilio(accountSid, authToken);

const sendSms = async (to, body) => {
  const options = {
    from: smsNumber,
    to: `+54${to}`,
    body: body,
  };

  try {
    await client.messages.create(options);
  } catch (error) {
    logger.error("Error sending sms: ", error);
  }
};

const sendWpp = async (to, body) => {
  const options = {
    from: wppNumber,
    to: `whatsapp:+549${to}`,
    body: body,
  };

  try {
    await client.messages.create(options);
  } catch (error) {
    logger.error("Error sending whatsapp: ", error);
  }
};

export { sendSms, sendWpp };
