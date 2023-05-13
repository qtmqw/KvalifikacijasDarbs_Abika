const express = require("express");
const router = express.Router();
const Cart = require("../models/Grozs");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

// Add a product to the user's cart
router.post("/add", async (req, res) => {
    const { userId, productId, quantity } = req.body;

    try {
        // Check if the product already exists in the cart
        let cartItem = await Cart.findOne({
            user: ObjectId(userId),
            product: ObjectId(productId),
        });

        if (cartItem) {
            // If it does, update the quantity of that cart item
            const totalQuantity = cartItem.quantity + quantity;
            cartItem.quantity = totalQuantity;

            console.log(JSON.stringify(cartItem.quantity));
            console.log(JSON.stringify(quantity));
            console.log(JSON.stringify(totalQuantity));
            await cartItem.save();
        } else {
            // If it doesn't, create a new cart item
            cartItem = new Cart({
                user: ObjectId(userId),
                product: ObjectId(productId),
                quantity: quantity,
            });
            await cartItem.save();
        }

        res.status(200).json({ status: "OK", data: cartItem, userId: userId });
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
});

router.get("/:userId", async (req, res) => {
    const userId = req.params.userId;

    // Check if userId is a valid ObjectId
    if (!ObjectId.isValid(userId)) {
        res.status(400).json({ error: "Invalid userId" });
        return;
    }

    try {
        const cart = await Cart.find({ user: ObjectId(userId) }).populate("product");
        res.status(200).json({ status: "OK", data: cart });
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
});

router.delete("/:cartItemId", async (req, res) => {
    const cartItemId = req.params.cartItemId;

    try {
        const deletedCartItem = await Cart.findByIdAndDelete(cartItemId);
        res.status(200).json({ status: "OK", data: deletedCartItem });
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
});

router.put("/:cartItemId", async (req, res) => {
    try {
        const { quantity } = req.body;

        if (quantity < 1 || quantity > 1000 || quantity % 1 !== 0) {
            throw new Error("Invalid quantity value");
        }

        const editCart = await Cart.findByIdAndUpdate(
            req.params.cartItemId,
            { quantity },
            { new: true }
        );

        res.json(editCart);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;