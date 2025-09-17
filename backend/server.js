// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use("/api/auth", require("./routes/auth"));  // OTP login
// app.use("/api/sos", require("./routes/sos"));    // SOS
// app.use("/api/symptoms", require("./routes/symptoms"));  // AI Symptom Checker

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`✅ Backend running on http://localhost:${PORT}`));



const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));  // OTP login
app.use("/api/sos", require("./routes/sos"));    // SOS
app.use("/api/symptoms", require("./routes/symptoms"));  // AI Symptom Checker

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Backend running on http://localhost:${PORT}`));