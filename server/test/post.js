// products.js
const express = require('express');
const router = express.Router();
const Products = require('./prod');
const Cat = require('./cat');

router.get("/products", async (req, res) => {
    const products = await Products.find();
    res.json(products);
});

router.get("/carts", async (req, res) => {
    const carts = await Cat.find().populate("productId");
    res.json(carts);
});

router.post("/carts", async (req, res) => {
    const { productId, quantity } = req.body;

    // Check if the product is already in the cart
    const cartItem = await Cat.findOne({ productId });
    if (cartItem) {
        // If the product is already in the cart, update its quantity
        cartItem.quantity += quantity;
        await cartItem.save();
    } else {
        // If the product is not in the cart, add it
        const cart = new Cat({ productId, quantity });
        await cart.save();
    }

    res.json({ message: "Product added to cart" });
});


module.exports = router;