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
                    enum: ["Sarkans", "Zaļš", "Zils", "Brūns", "Violēts", "Melns", "Balts", "Rozs", "Dzeltens", "Orandž", "Pelēks"],
                },
            ],
            required: true,
        },
        size: {
            type: [
                {
                    type: String,
                    enum: ["XS", "S", "M", "L", "XL", "XXL", "30", "30.5", "31", "32", "32.5", "33", "33.5", "34.5", "35", "35.5", "36", "37", "37.5", "38", "39", "40", "41", "41.5", "42", "43"]
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
            type: Schema.Types.ObjectId,
            ref: "Discount",
        },
        discountPrice: {
            type: Number,
            default: 0,
        },
        quantity: {
            type: Number,
            default: 0,
            min: 0,
            max: 1000,
            validate: {
                validator: Number.isInteger,
                message: "Quantity must be an integer value",
            },
        },
        created_at: {
            type: Date,
            default: Date.now,
        },
    },
);

const Product = mongoose.model("Product", productSchema)

module.exports = Product