const mongoose = require("mongoose")
const { Schema } = mongoose;

const orderSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "UserInfo",
            required: true,
        },
        cart: {
            type: Schema.Types.ObjectId,
            ref: "Cart",
            required: true,
        },
        created_at: {
            type: Date,
            default: Date.now,
        },
    },
);

const Orders = mongoose.model("Orders", orderSchema)

module.exports = Orders 