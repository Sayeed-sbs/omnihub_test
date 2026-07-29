const mongoose = require('mongoose');

// Building the database fields validation rule-set
const UserSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Please provide an account name identity'], 
    trim: true 
  },
  email: { 
    type: String, 
    required: [true, 'Please provide a valid transmission email communication node'], 
    unique: true, 
    trim: true, 
    lowercase: true,
    // 🚀 Added: Regular expression validator to reject malformed emails before database insertion
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid structural format for the email address node']
  },
  password: { 
    type: String, 
    required: [true, 'Please assign a secure access validation password string'], 
    minlength: 6 
  },
  role: { 
    type: String, 
    enum: ['user', 'admin'], 
    default: 'user' 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('User', UserSchema);
