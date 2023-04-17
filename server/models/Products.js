const mongoose = require("mongoose")
const { Schema } = mongoose;

const productSchema = new Schema(
    {
/*         image: {
            type: String,
            required: true,
        }, */
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
                    enum: ["Red", "Green", "Blue", "White", "Brown", "Purple"], // example validation
                },
            ],
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        category: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true
        }],
        created_at: {
            type: Date,
            default: Date.now,
        },
    },
    {
        collection: "Products",
    }
);

const Products = mongoose.model("Product", productSchema)

module.exports = Products