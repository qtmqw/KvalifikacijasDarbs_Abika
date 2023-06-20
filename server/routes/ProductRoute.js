// import modules
const express = require("express");
const router = express.Router();
const Product = require("../models/Produkti");
const Category = require("../models/Kategorijas");
const Discount = require("../models/Atlaide");

// get all products
router.get("/", async (req, res) => {
    try {
        let products = await Product.find().populate('category').populate('discount');

        if (req.query.color) {
            const color = req.query.color;
            products = products.filter(product => product.color.some(c => c.toLowerCase() === color.toLowerCase()));
        }

        res.json(products);
    } catch (err) {
        res.status(400).json(`Error: ${err}`);
    }
});

router.post("/", async (req, res) => {
    try {
        const { image, title, description, color, size, price, categoryIds } = req.body;

        if (!categoryIds) {
            return res.status(400).json({ message: "Category IDs not provided" });
        }

        const categoryIdsArray = categoryIds.split(",");
        const categories = await Category.find({ _id: { $in: categoryIdsArray } });
        if (categories.length !== categoryIdsArray.length) {
            return res.status(400).json({ message: "Category not found" });
        }

        const product = {
            image,
            title,
            description,
            color,
            size,
            price,
            category: categories,
        };
        const newProduct = await Product.create(product);
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


// get product by id
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('discount');
        res.json(product);
    } catch (err) {
        res.status(400).json(`Error: ${err}`);
    }
});

// edit product
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { image, title, description, color, size, price, categoryIds } = req.body;

        if (!categoryIds) {
            return res.status(400).json({ message: "Category IDs not provided" });
        }

        const categoryIdsArray = categoryIds.split(",");
        const categories = await Category.find({ _id: { $in: categoryIdsArray } });
        if (categories.length !== categoryIdsArray.length) {
            return res.status(400).json({ message: "Category not found" });
        }

        const updatedProduct = {
            image,
            title,
            description,
            color,
            size,
            price,
            category: categories,
        };

        const product = await Product.findByIdAndUpdate(id, updatedProduct, { new: true });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (product.discount) {
            const discount = await Discount.findById(product.discount);
            if (discount.type !== 0) {
                product.discountPrice = product.price * (1 - discount.type / 100);
            } else {
                product.discountPrice = 0;
            }
        } else {
            product.discountPrice = 0;
        }

        await product.save();
        res.json(product);
    } catch (err) {
        res.status(400).json(`Error: ${err}`);
    }
});

router.patch("/q/:id", async (req, res) => {
    try {
        const { quantity } = req.body;

        if (quantity < 0 || quantity > 1000 || quantity % 1) {
            throw new Error("Invalid quantity value");
        }
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { quantity },
            { new: true }
        );
        await product.save();
        res.json(product);
    } catch (err) {
        res.status(400).json(`Error: ${err}`);
    }
});

// delete product
router.delete("/:id", async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: "Product deleted successfully" });
    } catch (err) {
        res.status(400).json(`Error: ${err}`);
    }
});

// search products
router.post("/search", async (req, res) => {
    try {
        const { search } = req.body;
        const products = await Product.find({
            title: { $regex: `^${search}`, $options: "i" },
        });
        res.json(products);
    } catch (err) {
        res.status(400).json(`Error: ${err}`);
    }
});

module.exports = router;