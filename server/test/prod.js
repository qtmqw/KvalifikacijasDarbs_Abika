const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
});

// Define a model for products
const Products = mongoose.model("Products", productSchema);

module.exports = Products