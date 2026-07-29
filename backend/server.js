const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser'); // 🚀 Fixed: Parsed correctly without duplicate statement lines
require('dotenv').config();

const app = express();

// 🚀 Fix: Permits incoming secure cookie transactions from Next.js local port
app.use(cors({
  origin: "http://localhost:3000", // Your Next.js local server port address
  credentials: true                // Allowed secure httpOnly token passkeys
}));


app.use(express.json());
app.use(cookieParser()); // 🚀 Mounted successfully right here

// Import Route Modules
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const systemRoutes = require('./routes/system');
const contactRoutes = require('./routes/contact');

// Gateway Verification Ping Route
app.get('/api/test', (req, res) => {
  res.json({ status: "online", gateway: "Omnihub Quantum API Operational" });
});

// 🔌 Mount Active Full-Stack Port Matrix Endpoints
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/system', systemRoutes);
app.use('/api/contact', contactRoutes);

// Database Connection Logic
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("⚡ MongoDB Connected Successfully");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.log("❌ Database Connection Error: ", err));
