const mongoose = require("mongoose")
const { Schema } = mongoose;

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "UserInfo",
    },
    items: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: "Product",
            },
            quantity: {
                type: Number,
                default: 1,
            },
        },
    ],
    total: {
        type: Number,
    },
    readyDate: {
        type: Date,
    },
    status: {
        type: [
            {
                type: String,
                enum: ["Gatavs", "Atcelts", "Apstrādā"],
            },
        ],
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

const Orders = mongoose.model("Orders", orderSchema)

module.exports = Orders
