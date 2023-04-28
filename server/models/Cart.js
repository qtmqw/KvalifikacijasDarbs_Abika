const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "UserInfo",
            required: true,
        },
        product: {
            type: String,
            ref: "Product",
            required: true,
        },
        quantity: {
            type: Number,
            default: 1,
        },
    },
    { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;