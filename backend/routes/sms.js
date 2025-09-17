// // const express = require("express");
// // const router = express.Router();
// // const { sendSMS } = require("../controllers/smsController");

// // router.post("/send", sendSMS);

// // module.exports = router;





// // const express = require("express");
// // const router = express.Router();
// // const { sendOtp } = require("../controllers/smsController");

// // router.post("/send-otp", sendOtp);

// // module.exports = router;






// // // backend/routes/sms.js
// // const express = require('express');
// // const router = express.Router();
// // const twilio = require('twilio');

// // // load env vars (already loaded in server.js too)
// // require('dotenv').config();

// // // Twilio client
// // const client = twilio(
// //   process.env.TWILIO_ACCOUNT_SID,
// //   process.env.TWILIO_AUTH_TOKEN
// // );

// // // POST /api/sms/send
// // router.post('/send', async (req, res) => {
// //   try {
// //     const { to, body } = req.body; // e.g. { "to":"+91xxxxxxxxxx", "body":"Hello from Twilio" }

// //     if (!to || !body) {
// //       return res.status(400).json({ error: 'to and body are required' });
// //     }

// //     const message = await client.messages.create({
// //       body,
// //       from: process.env.TWILIO_PHONE_NUMBER, // Twilio number
// //       to
// //     });

// //     res.json({
// //       success: true,
// //       sid: message.sid,
// //       status: message.status
// //     });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// // module.exports = router;






// // routes/sms.js
// const express = require('express');
// const router = express.Router();
// const twilio = require('twilio');

// // load env vars
// require('dotenv').config();

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const fromNumber = process.env.TWILIO_PHONE_NUMBER;

// const client = twilio(accountSid, authToken);

// // POST /api/sms/send
// router.post('/send', async (req, res) => {
//   try {
//     const { to, message } = req.body;

//     if (!to || !message) {
//       return res.status(400).json({ error: 'Missing to or message' });
//     }

//     // Send SMS
//     const sms = await client.messages.create({
//       body: message,
//       from: fromNumber,
//       to: to,
//     });

//     res.json({ success: true, sid: sms.sid });
//   } catch (err) {
//     console.error('Error sending SMS:', err);
//     res.status(500).json({ error: 'Failed to send SMS' });
//   }
// });

// module.exports = router;


// backend/routes/sms.js
const express = require('express');
const router = express.Router();
require('dotenv').config();
const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

// POST /api/sms/send
router.post('/send', async (req, res) => {
  try {
    const { to, message } = req.body;

    if (!to || !message) {
      return res.status(400).json({ error: 'to and message are required' });
    }

    const msg = await client.messages.create({
      body: message,
      from: twilioPhone,
      to: to
    });

    res.json({ success: true, sid: msg.sid });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
