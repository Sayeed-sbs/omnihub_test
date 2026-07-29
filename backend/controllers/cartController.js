const Cart = require('../models/Cart');

// 📥 Fetch User Cart Records Protocol
exports.getCart = async (req, res) => {
  try {
    // 🚀 Fixed: Securely extracts identity from token middleware instead of insecure params
    const userId = req.user.id; 
    
    let cart = await Cart.findOne({ userId }).populate('items.productId');

    // If user doesn't possess an active basket database entity layer, instantiate a clean one instantly
    if (!cart) {
      cart = new Cart({ userId, items: [] });
      await cart.save();
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Failed to pull system checkout ledger registers", error: error.message });
  }
};

// ➕ Add Asset Item Node to Cart Structure
exports.addToCart = async (req, res) => {
  try {
    const userId = req.user.id; // 🚀 Fixed: Pulled from verified user session
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // Cross-check if item node choice already occupies a tracking index row cell
    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += (quantity || 1);
    } else {
      cart.items.push({ productId, quantity: quantity || 1 });
    }
    
    await cart.save();
    const updatedCart = await Cart.findOne({ userId }).populate('items.productId');
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: "Failed to write allocation updates inside database tables", error: error.message });
  }
};

// 🔄 Update Item Quantity Protocol
exports.updateQuantity = async (req, res) => {
  try {
    const userId = req.user.id; // 🚀 Fixed: Pulled from verified user session
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart ledger matrix not found" });

    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = quantity;
      
      // If quantity falls to 0, automatically flush the item node
      if (quantity <= 0) {
        cart.items.splice(itemIndex, 1);
      }
      await cart.save();
    }
    
    const updatedCart = await Cart.findOne({ userId }).populate('items.productId');
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: "Failed to modify item balance records", error: error.message });
  }
};

// 🗑️ Delete/Remove Single Item From Cart Array
exports.removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id; // 🚀 Fixed: Pulled from verified user session
    const { productId } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart ledger matrix not found" });

    cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    await cart.save();
    
    const updatedCart = await Cart.findOne({ userId }).populate('items.productId');
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: "Failed to purge item allocation row", error: error.message });
  }
};

// 🛒 Clear Entire Cart Database Array (Checkout Complete)
exports.clearCart = async (req, res) => {
  try {
    const userId = req.user.id; // 🚀 Fixed: Pulled from verified user session
    
    const cart = await Cart.findOne({ userId });
    if (cart) {
      cart.items = []; // Flush all item rows completely
      await cart.save();
    }
    res.json({ status: "success", message: "Cart cleared successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to flush ledger records", error: error.message });
  }
};
