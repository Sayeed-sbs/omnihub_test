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
// 1. Point Express to your Next.js standalone export or build files
app.use(express.static(path.join(__dirname, '../frontend/.next')));
app.use(express.static(path.join(__dirname, '../frontend/out'))); // Fallback fallback if your app uses static exports

// 2. Route any page request that isn't an API route back to the client router
app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: "API route not found" });
  }
  // Tries to find the built Next.js index layout
  res.sendFile(path.join(__dirname, '../frontend/.next', 'index.html'), (err) => {
    if (err) {
      // If standalone index file doesn't exist, check standard static export folder
      res.sendFile(path.join(__dirname, '../frontend/out', 'index.html'));
    }
  });
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
