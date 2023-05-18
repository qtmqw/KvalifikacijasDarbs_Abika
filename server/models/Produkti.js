const mongoose = require("mongoose")
const { Schema } = mongoose;
const Discount = require("../models/Atlaide");

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
                    enum: ["Red", "Green", "Blue", "Brown", "Purple", "Black", "White"],
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
            type: Schema.Types.ObjectId,
            ref: "Discount",
        },
        discountPrice: {
            type: Number,
            default: 0,
        },
        created_at: {
            type: Date,
            default: Date.now,
        },
    },
);

productSchema.pre("save", async function (next) {
    try {
        // Calculate the discount price if the discount is not 0
        if (this.discount) {
            const discount = await Discount.findById(this.discount);
            if (discount && discount.type !== 0) {
                const discountPrice = this.price * (1 - discount.type / 100);
                this.discountPrice = discountPrice;
                console.log(discountPrice)
            } else {
                this.discountPrice = 0;
            }
        } else {
            this.discountPrice = 0;
        }

        next();
    } catch (error) {
        next(error);
    }
});

const Product = mongoose.model("Product", productSchema)

module.exports = Product 