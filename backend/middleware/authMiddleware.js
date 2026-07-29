const jwt = require('jsonwebtoken');

// 🔐 Middleware validation lock to isolate protected endpoints
module.exports = async (req, res, next) => {
  try {
    // 1. Extract token value directly out from secure httpOnly browser cookies
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ 
        message: "Access Denied: No clearance credential handshake present inside session cookies" 
      });
    }

    // 2. Validate token footprint signature against your secure environment secret key
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    
    // 3. Mount decrypted payload metrics (id, role) into request parameters
    req.user = verified;
    
    next(); // Pass operational pipeline focus cleanly down to your controllers
  } catch (error) {
    return res.status(401).json({ 
      message: "Handshake Expired: Access signature trace invalid or corrupted", 
      error: error.message 
    });
  }
};
