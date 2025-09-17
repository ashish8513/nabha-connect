// const express = require("express");
// const router = express.Router();
// const { sendOTP, verifyOTP } = require("../controllers/authController");

// router.post("/send-otp", sendOTP);
// router.post("/verify-otp", verifyOTP);

// module.exports = router;




// backend/routes/auth.js
const express = require("express");
const router = express.Router();
const { sendOtp, verifyOtp } = require("../controllers/authController");

// POST /api/auth/send-otp
router.post("/send-otp", sendOtp);

// POST /api/auth/verify-otp
router.post("/verify-otp", verifyOtp);

module.exports = router;