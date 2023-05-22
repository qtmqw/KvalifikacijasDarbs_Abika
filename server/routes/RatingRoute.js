const express = require("express");
const router = express.Router();
const Rating = require("../models/Ratings");
const mongoose = require("mongoose");

// Create a new rating
router.post("/rating", async (req, res) => {
    try {
        const { user, product, value } = req.body;

        // Check if the user has already rated the product
        const existingRating = await Rating.findOne({ user, product });
        if (existingRating) {
            return res.status(400).json({ error: "User has already rated this product" });
        }

        // Create a new rating
        const rating = new Rating({
            user,
            product,
            value,
        });

        // Save the rating
        await rating.save();

        res.status(201).json({ message: "Rating created successfully", rating });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create rating" });
    }
});

// Get all ratings
router.get("/ratings", async (req, res) => {
    try {
        // Fetch all ratings
        const ratings = await Rating.find();

        res.json({ ratings });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch ratings" });
    }
});

// Get total rating for a product
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




module.exports = router;