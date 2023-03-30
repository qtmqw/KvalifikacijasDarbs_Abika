// products.js
const express = require('express');
const router = express.Router();
const Products = require('./prod');
const Cat = require('./cat');

router.get("/", async (req, res) => {
    try {
        const products = await Products.find().populate('category');
        res.json(products);
    } catch (err) {
        res.status(400).json(`Error: ${err}`);
    }
});

router.get("/Cat", async (req, res) => {
    try {
        const products = await Cat.find();
        res.json(products);
    } catch (err) {
        res.status(400).json(`Error: ${err}`);
    }
});

// Create a new product
router.post('/', async (req, res) => {
    try {
        const { name, description, price, categoryId } = req.body;

        // Check if the category exists
        const category = await Cat.findById(categoryId);
        if (!category) {
            return res.status(400).json({ message: 'Category not found' });
        }

        // Create the new product
        const product = new Products({
            name,
            description,
            price,
            category: categoryId
        });

        // Save the product to the database
        await product.save();

        res.status(201).json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.get("/category/:categoryId", async (req, res) => {
    try {
        const products = await Products.find({ category: req.params.categoryId }).populate('category');
        res.json(products);
    } catch (err) {
        res.status(400).json(`Error: ${err}`);
    }
});

module.exports = router;