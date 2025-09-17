// backend/controllers/authController.js
require("dotenv").config();
const twilio = require("twilio");

// Config
const BACKUP_OTP = process.env.BACKUP_OTP || "123456";   // default backup OTP
const DEV_EXPOSE_OTP = (process.env.DEV_EXPOSE_OTP || "false").toLowerCase() === "true";

// Simple in-memory otp store (dev only). Use Redis/DB in production.
const otpStore = new Map(); // phone -> { otp, expiresAt }

// Twilio client (may be null if credentials missing)
let twilioClient = null;
if (process.env.TWILIO_SID && process.env.TWILIO_AUTH_TOKEN) {
  try {
    twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
  } catch (err) {
    console.warn("Twilio client init failed:", err?.message || err);
    twilioClient = null;
  }
}

function generateRandomOtp() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function saveOtp(phone, otp) {
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes
  otpStore.set(phone, { otp, expiresAt });
}

function verifyStoredOtp(phone, otp) {
  const rec = otpStore.get(phone);
  if (!rec) return false;
  if (Date.now() > rec.expiresAt) {
    otpStore.delete(phone);
    return false;
  }
  const ok = rec.otp === otp;
  if (ok) otpStore.delete(phone);
  return ok;
}

// -------------------- SEND OTP --------------------
exports.sendOtp = async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ success: false, error: "phone is required" });

    // create a random OTP and save
    const otp = generateRandomOtp();
    saveOtp(phone, otp);

    // If Twilio client exists, attempt to send SMS
    if (twilioClient && process.env.TWILIO_PHONE_NUMBER) {
      try {
        const bodyText = `Your NabhaCare Connect OTP: ${otp}`;
        const message = await twilioClient.messages.create({
          body: bodyText,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: phone,
        });

        return res.json({
          success: true,
          method: "sms",
          sid: message.sid,
          ...(DEV_EXPOSE_OTP ? { otp } : {})
        });
      } catch (twErr) {
        console.warn("Twilio send failed:", twErr?.message || twErr);

        // fallback: backup OTP
        saveOtp(phone, BACKUP_OTP);
        console.log(`[BACKUP] Using backup OTP for ${phone}`);
        return res.json({
          success: true,
          method: "backup",
          message: "Twilio send failed; using backup OTP",
          ...(DEV_EXPOSE_OTP ? { otp: BACKUP_OTP } : {})
        });
      }
    }

    // Twilio not configured: always use backup OTP
    saveOtp(phone, BACKUP_OTP);
    console.log(`[BACKUP] Twilio not configured. Using backup OTP for ${phone}`);
    return res.json({
      success: true,
      method: "backup",
      message: "Twilio not configured; using backup OTP",
      ...(DEV_EXPOSE_OTP ? { otp: BACKUP_OTP } : {})
    });

  } catch (err) {
    console.error("sendOtp error:", err);
    return res.status(500).json({ success: false, error: err.message || "Server error" });
  }
};

// -------------------- VERIFY OTP --------------------
exports.verifyOtp = async (req, res) => {
  try {
    const { phone, otp } = req.body;
    if (!phone || !otp) return res.status(400).json({ success: false, error: "phone and otp required" });

    // ✅ Always accept backup OTP
    if (otp === BACKUP_OTP) {
      otpStore.delete(phone);
      console.log(`[VERIFY] Backup OTP accepted for ${phone}`);
      return res.json({ success: true, verified: true, method: "backup" });
    }

    // Otherwise check stored OTP
    const ok = verifyStoredOtp(phone, otp);
    if (!ok) return res.status(401).json({ success: false, verified: false, error: "Invalid or expired OTP" });

    return res.json({ success: true, verified: true, method: "store" });
  } catch (err) {
    console.error("verifyOtp error:", err);
    return res.status(500).json({ success: false, error: err.message || "Server error" });
  }
};
