const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products"
    },
    quantity: Number,
});

// Define a model for carts
const Cart = mongoose.model("Cartt", cartSchema);

module.exports = Cart;