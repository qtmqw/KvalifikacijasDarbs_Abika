const mongoose = require("mongoose")
const { Schema } = mongoose;

const productSchema = new Schema(
    {
        image: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
            index: true,
        },
        description: {
            type: String,
            required: true,
        },
        color: {
            type: [
                {
                    type: String,
                    enum: ["Red", "Green", "Blue", "White", "Brown", "Purple", "Black", "White"],
                },
            ],
            required: true,
        },
        size: {
            type: [
                {
                    type: String,
                    enum: ["XS", "S", "M", "L", "XL", "XXL"],
                },
            ],
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        category: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Category',
                required: true
            }
        ],
        discount: {
            type: String,
            ref: "Discount",
        },
        created_at: {
            type: Date,
            default: Date.now,
        },
    },
);

const Product = mongoose.model("Product", productSchema)

module.exports = Product 