const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 🔒 Account Registration Protocol
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Identity credentials already exist inside database registers" });
    }

    user = new User({ name, email, password });
    
    // Cryptographically encrypt passwords before DB insertion
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    // Generate JWT Auth Token Passkey
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // 🚀 Fixed: Securely bake token into an automated httpOnly browser cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // true if live on Vercel/Render
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days matching token expiration
    });

    res.status(201).json({
      status: "success",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({ message: "Server registry allocation error", error: error.message });
  }
};

// 🔓 Account Login Verification Protocol
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Locate user credentials inside database records
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid clearance parameters: email not found" });
    }

    // 2. Cryptographically match the hash array against user password input
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid clearance parameters: incorrect password" });
    }

    // 3. Issue a fresh session JWT handshake authorization token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // 🚀 Fixed: Securely bake token into an automated httpOnly browser cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.json({
      status: "success",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({ message: "Server handshake authorization error", error: error.message });
  }
};

// 🚀 Missing Requirement Added: Logout capability to cleanly strip auth footprints
exports.logout = async (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    });
    res.json({ status: "success", message: "Successfully logged out from active matrix session" });
  } catch (error) {
    res.status(500).json({ message: "Server session termination failure", error: error.message });
  }
};
