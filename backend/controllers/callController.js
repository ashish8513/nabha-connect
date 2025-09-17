const twilio = require("twilio");

const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

exports.makeCall = async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    const call = await client.calls.create({
      to: phoneNumber,
      from: process.env.TWILIO_PHONE_NUMBER,
      url: "http://demo.twilio.com/docs/voice.xml" // Simple voice message
    });

    res.json({ success: true, sid: call.sid });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
