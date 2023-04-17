const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    quantity: Number,
});

// Define a model for carts
const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;