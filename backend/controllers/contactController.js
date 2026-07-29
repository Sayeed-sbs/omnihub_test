// 📥 Handle Contact Form Submission
exports.submitContactForm = async (req, res) => {
  try {
    const { email, message } = req.body;

    if (!email || !message) {
      return res.status(400).json({ message: "Transmission failed. Missing critical fields." });
    }

    // Since this is a workshop project, we simulate a successful transmission save
    res.status(201).json({ 
      status: "success", 
      message: "Broadcast signal established. Message logged safely into network stream." 
    });
  } catch (error) {
    res.status(500).json({ message: "Internal routing link failure.", error: error.message });
  }
};
