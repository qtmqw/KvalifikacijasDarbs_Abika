const mongoose = require("mongoose")
const { Schema } = mongoose;

const ratingSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "UserInfo",
            required: true,
        },
        product: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        value: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        created_at: {
            type: Date,
            default: Date.now,
        },
    },
);

const Rating = mongoose.model("Rating", ratingSchema)

module.exports = Rating 