const express = require("express");
const router = express.Router();
const Category = require("../models/Kategorijas");
const Product = require("../models/Produkti");

router.get("/category", async (req, res) => {
    try {
        const category = await Category.find();
        res.json(category);
    } catch (err) {
        res.status(400).json(`Error: ${err}`);
    }
});

router.get("/category/:categoryId", async (req, res) => {
    try {
        const category = await Product.find({ category: req.params.categoryId }).populate('category');
        res.json(category);
    } catch (err) {
        res.status(400).json(`Error: ${err}`);
    }
});

module.exports = router;