const mongoose = require("mongoose");
const { Schema } = mongoose;

const discountSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            index: true,
        },
        type:
        {
            type: Number,
            min: 0,
            max: 100,
            required: true,
        },
        validUntil: {
            type: Date,
        },
    },
    { timestamps: true }
);

const Discount = mongoose.model("Discount", discountSchema);

module.exports = Discount;