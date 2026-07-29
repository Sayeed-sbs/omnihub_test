const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

// 🚀 Production CORS Policy Setup
const allowedOrigins = [
  "http://localhost:3000",
  "https://vercel.app" // Fallback - replace or expand with your exact deployed Vercel domain
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow server-to-server or local automated requests (no origin)
    if (!origin) return callback(null, true);
    
    // Normalize string constraints by removing any accidental trailing slashes
    const cleanOrigin = origin.replace(/\/$/, "");
    const isAllowed = allowedOrigins.some(allowed => allowed.replace(/\/$/, "") === cleanOrigin);
    
    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error('Blocked by security rules (CORS Production Constraint)'));
    }
  },
  credentials: true // Crucial for passing httpOnly secure session cookies across environments
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
  res.status(200).json({ 
    status: "online", 
    gateway: "Omnihub Quantum API Operational",
    timestamp: new Date().toISOString()
  });
});

// 📌 Mount Active Full-Stack Port Matrix Endpoints
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/system', systemRoutes);
app.use('/api/contact', contactRoutes);

// 🛠️ Serverless Graceful Error Interceptor
app.use((err, req, res, next) => {
  console.error("🔥 System Error Context:", err.message);
  res.status(500).json({
    success: false,
    message: "Internal operational anomaly detected.",
    error: process.env.NODE_ENV === "development" ? err.message : undefined
  });
});

// 💾 Managed Database Connection Layer
const PORT = process.env.PORT || 5000;
let isConnected = false;

async function connectDatabase() {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    isConnected = true;
    console.log("⚡ MongoDB Connected Successfully");
  } catch (err) {
    console.error("❌ Database Connection Error: ", err);
  }
}

// 🌐 Run App Context Listener
if (process.env.NODE_ENV !== 'production') {
  // Traditional continuous listener fallback for local development
  connectDatabase().then(() => {
    app.listen(PORT, () => console.log(`🚀 Production server matrix online on port ${PORT}`));
  });
} else {
  // Auto-invoke execution sequence for serverless deployments
  connectDatabase();
}

// 📦 Export Application Layout Interface for Vercel
module.exports = app;
