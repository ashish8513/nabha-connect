// // smsController.js
// const twilio = require("twilio");

// const sendSMS = async (req, res) => {
//   try {
//     const { to, message } = req.body;

//     const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

//     await client.messages.create({
//       body: message,
//       from: process.env.TWILIO_PHONE_NUMBER, // e.g. +19855895279
//       to: to,
//     });

//     res.status(200).json({ success: true, msg: "SMS sent successfully!" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, msg: "Failed to send SMS" });
//   }
// };

// module.exports = { sendSMS };





import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// 🚨 Send SOS SMS
export const sendSOS = async (req, res) => {
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ error: "Phone number is required" });
  }

  try {
    const msg = await client.messages.create({
      body: "🚨 SOS! Emergency assistance needed immediately.",
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone, // must be in +91XXXXXXXXXX format
    });

    res.json({ success: true, message: "SOS SMS sent!", sid: msg.sid });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📞 Make Emergency Call
export const makeCall = async (req, res) => {
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ error: "Phone number is required" });
  }

  try {
    const call = await client.calls.create({
      twiml:
        "<Response><Say>This is an emergency call to 108. Please assist immediately.</Say></Response>",
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    });

    res.json({ success: true, message: "Emergency call triggered!", sid: call.sid });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// const twilio = require("twilio");

// const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

// exports.sendOtp = async (req, res) => {
//   try {
//     const { phoneNumber, otp } = req.body;

//     const message = await client.messages.create({
//       body: `Your OTP is: ${otp}`,
//       from: process.env.TWILIO_PHONE_NUMBER,
//       to: phoneNumber,
//     });

//     res.json({ success: true, sid: message.sid });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };
