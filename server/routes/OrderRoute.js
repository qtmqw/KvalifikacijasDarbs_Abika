const express = require("express");
const router = express.Router();
const Orders = require("../models/Orders");
const Cart = require("../models/Grozs");
const User = require("../models/Lietotaji");
const Product = require("../models/Produkti");

router.post("/order", async (req, res) => {
    try {
        const { userId, cartId, items, total, readyDate } = req.body;
        const user = await User.findById(userId);
        const cart = await Cart.findById(cartId).populate("product");

        const order = new Orders({
            user: user._id,
            items: items,
            total,
            readyDate,
            status: "Apstrādā",
        });

        await order.save();

        for (const item of cart.items) {
            const product = await Product.findById(item.product);
            product.quantity -= item.quantity;
            await product.save();
        }

        cart.status = "completed";
        await cart.save();

        res.status(201).json({ message: "Order placed successfully", order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to place the order" });
    }
});

router.get("/", async (req, res) => {
    try {
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

        const order = await Orders.findById(id);

        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        await order.remove();

        res.json({ message: "Order deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete the order" });
    }
});


module.exports = router;
