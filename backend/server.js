const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path'); // Added for resolving file paths
require('dotenv').config();

const app = express();

// 🚀 Production CORS Policy Setup
const allowedOrigins = [
  "http://localhost:3000",
  "https://vercel.app" 
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    const cleanOrigin = origin.replace(/\/$/, "");
    const isAllowed = allowedOrigins.some(allowed => allowed.replace(/\/$/, "") === cleanOrigin);
    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error('Blocked by security rules (CORS Production Constraint)'));
    }
  },
  credentials: true 
}));

app.use(express.json());
app.use(cookieParser());

// 📦 Import Active API Route Modules
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const systemRoutes = require('./routes/system');
const contactRoutes = require('./routes/contact');

// 🔌 Gateway Verification Ping Route
app.get('/api/test', (req, res) => {
  res.status(200).json({ status: "online", gateway: "Omnihub Quantum API Operational", timestamp: new Date().toISOString() });
});

// 📌 Mount Active Full-Stack Port Matrix Endpoints
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/system', systemRoutes);
app.use('/api/contact', contactRoutes);

// ========================================================
// 🌐 SERVE FRONTEND STATIC FILES (OPTION 2 - NEXT.JS UPDATED)
// ========================================================
app.get('/', (req, res) => {
  res.send('Omnihub Production API Operational');
});

// ========================================================

// 🛠️ Serverless Graceful Error Interceptor
app.use((err, req, res, next) => {
  console.error("🔥 System Error Context:", err.message);
  res.status(500).json({ success: false, message: "Internal operational anomaly detected.", error: process.env.NODE_ENV === "development" ? err.message : undefined });
});

// 💾 Managed Database Connection Layer
const PORT = process.env.PORT || 5000;
let isConnected = false;

async function connectDatabase() {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log("⚡ MongoDB Connected Successfully");
  } catch (err) {
    console.error("❌ Database Connection Error: ", err);
  }
}

// 🌐 Run App Context Listener
connectDatabase().then(() => {
  app.listen(PORT, () => console.log(`🚀 Production server matrix online on port ${PORT}`));
});

// 📦 Export Application Layout Interface for Vercel
module.exports = app;
