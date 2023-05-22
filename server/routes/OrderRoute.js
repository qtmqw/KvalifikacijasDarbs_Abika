const express = require("express");
const router = express.Router();
const Orders = require("../models/Orders");
const Cart = require("../models/Grozs");
const User = require("../models/Lietotaji");
const Product = require("../models/Produkti");

router.post("/order", async (req, res) => {
    try {
        // Extract data from the request body
        const { userId, cartId, items, total, readyDate } = req.body;

        // Find the user and cart based on the provided IDs
        const user = await User.findById(userId);
        const cart = await Cart.findById(cartId).populate("product");

        // Create a new order
        const order = new Orders({
            user: user._id,
            items: items,
            total,
            readyDate,
            status: "Apstrādā",
        });

        // Save the order
        await order.save();

        // Update the cart status and reduce the product quantities
        for (const item of cart) {
            const product = await Product.findById(item.product._id);
            product.quantity -= item.quantity;
            await product.save();
        }

        // Update the cart status
        cart.status = "completed";
        await cart.save();

        res.status(201).json({ message: "Order placed successfully", order });
    } catch (error) {
        console.error(error);
    }
});

router.get("/", async (req, res) => {
    try {
        // Fetch all orders and populate the associated user and cart details
        const orders = await Orders.find()
            .populate("user", "username email")
            .populate({
                path: "items.product",
                select: "title price",
            });

        res.json({ orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch orders" });
    }
});

router.get("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        // Fetch orders for the specific user and populate the associated user and cart details
        const orders = await Orders.find({ user: userId })
            .populate("user", "username email")
            .populate({
                path: "items.product",
                select: "title price",
            });

        res.json({ orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch orders" });
    }
});

router.patch("/:id/status", async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        // Find the order by ID and update the status
        const order = await Orders.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        res.json({ message: "Order status updated successfully", order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update the order status" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // Find the order by ID
        const order = await Orders.findById(id);

        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        // Delete the order
        await order.remove();

        res.json({ message: "Order deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete the order" });
    }
});


module.exports = router;
