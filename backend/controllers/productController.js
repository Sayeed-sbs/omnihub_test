const Product = require('../models/Product');

// 📥 Get All Products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, count: products.length, products });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch hardware catalog records", error: error.message });
  }
};

// 📥 Get Single Product by Dynamic ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Specified hardware node entry not found inside registers" });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(400).json({ message: "Invalid clearance parameters: malformed identity hash signature", error: error.message });
  }
};
