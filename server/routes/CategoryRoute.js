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

router.post("/category", async (req, res) => {
    try {
        const { name } = req.body;

        const category = new Category({
            name,
        });
        await category.save();

        res.json(category);
    } catch (err) {
        res.status(400).json(`Error: ${err}`);
    }
});

router.delete("/:categoryId", async (req, res) => {
    const categoryId = req.params.categoryId;

    try {
        const deletedCategory = await Category.findByIdAndDelete(categoryId);
        res.status(200).json({ status: "OK", data: deletedCategory });
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
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