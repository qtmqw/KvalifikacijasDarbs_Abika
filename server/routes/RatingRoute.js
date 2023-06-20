const express = require("express");
const router = express.Router();
const Rating = require("../models/Ratings");
const mongoose = require("mongoose");

router.post("/rating", async (req, res) => {
    try {
        const { user, product, value } = req.body;
        const rating = new Rating({
            user,
            product,
            value,
        });
        await rating.save();
        res.status(201).json({ message: "Rating created successfully", rating });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create rating" });
    }
});

router.get("/rating", async (req, res) => {
    try {
        const ratings = await Rating.find();
        res.json({ ratings });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch ratings" });
    }
});

router.get("/rating/:productId", async (req, res) => {
    try {
        const productId = req.params.productId;
        const totalRating = await Rating.aggregate([
            { $match: { product: mongoose.Types.ObjectId(productId) } },
            {
                $group: {
                    _id: null,
                    totalRating: { $sum: "$value" },
                    count: { $sum: 1 },
                },
            },
        ]);
        const rating = totalRating[0];
        const total = rating ? rating.totalRating : 0;
        const count = rating ? rating.count : 0;
        const averageRating = count > 0 ? total / count : 0;
        res.json({ productId, averageRating });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch average rating" });
    }
});

router.get("/rating/user/:userId/product/:productId", async (req, res) => {
    try {
        const { userId, productId } = req.params;
        const existingRating = await Rating.findOne({ user: userId, product: productId });
        res.json({ exists: !!existingRating });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to check if user already rated the product" });
    }
});

module.exports = router;