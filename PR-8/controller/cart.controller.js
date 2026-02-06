const Cart = require("../model/cart.model");

function generateSessionId() {
    return "sess_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
}

// Get cart by session ID
exports.getCart = async (req, res) => {
    try {
        const sessionId = req.sessionID || req.cookies.sessionId;
        
        if (!sessionId) {
            return res.json({ items: [] });
        }
        
        const cart = await Cart.findOne({ sessionId });
        
        if (!cart) {
            return res.json({ items: [] });
        }
        
        return res.json({ items: cart.items });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Failed to load cart" });
    }
};

// Save cart
exports.saveCart = async (req, res) => {
    try {
        let sessionId = req.sessionID || req.cookies.sessionId;
        
        console.log('Save Cart - Session ID:', sessionId);
        console.log('Cookies:', req.cookies);
        
        // Generate new session ID if none exists
        if (!sessionId) {
            sessionId = generateSessionId();
            res.cookie("sessionId", sessionId, { 
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: false
            });
            console.log('Generated new session ID:', sessionId);
        }
        
        const { items } = req.body;
        
        let cart = await Cart.findOne({ sessionId });
        
        if (cart) {
            cart.items = items;
            cart.updatedAt = Date.now();
            await cart.save();
            console.log('Cart updated for session:', sessionId);
        } else {
            cart = await Cart.create({
                sessionId,
                items
            });
            console.log('New cart created for session:', sessionId);
        }
        
        return res.json({ success: true, items: cart.items });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Failed to save cart" });
    }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
    try {
        const sessionId = req.sessionID || req.cookies.sessionId;
        
        if (!sessionId) {
            return res.json({ success: true, items: [] });
        }
        
        const { productId } = req.body;
        
        const cart = await Cart.findOne({ sessionId });
        
        if (cart) {
            cart.items = cart.items.filter(item => item.productId !== productId);
            cart.updatedAt = Date.now();
            await cart.save();
            return res.json({ success: true, items: cart.items });
        }
        
        return res.json({ success: true, items: [] });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Failed to remove item" });
    }
};
