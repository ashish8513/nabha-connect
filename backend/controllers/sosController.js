const twilio = require("twilio");

const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

exports.sendSOS = async (req, res) => {
  try {
    const { phoneNumber, userName, userLocation } = req.body;

    const message = await client.messages.create({
      body: `🚨 SOS Alert! Madhav Aggarwal in Nabha needs urgent help. 🚑`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    });

    res.json({ success: true, sid: message.sid });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
