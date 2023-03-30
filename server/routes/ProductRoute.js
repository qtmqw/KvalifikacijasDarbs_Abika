// import modules
const express = require("express");
const router = express.Router();
const multer = require("multer")
const Product = require("../models/Products");
const Category = require("../models/Category");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../client/public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage })


// get all products
router.get("/", async (req, res) => {
    try {
        const products = await Product.find().populate('category');
        res.json(products);
    } catch (err) {
        res.status(400).json(`Error: ${err}`);
    }
});

router.get("/category", async (req, res) => {
    try {
        const category = await Category.find();
        res.json(category);
    } catch (err) {
        res.status(400).json(`Error: ${err}`);
    }
});

// add product
router.post("/", upload.single("image"), async (req, res) => {
    try {
        const { title, description, color, price, categoryId } = req.body;

        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(400).json({ message: 'Category not found' });
        }

        const product = new Product({
            image: req.file.originalname,
            title,
            description,
            color,
            price,
            category: categoryId
        });
        await product.save();

        res.json(product);
        console.log(req.file.path);
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


// get product by id
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.json(product);
    } catch (err) {
        res.status(400).json(`Error: ${err}`);
    }
});

// edit product
router.put("/:id", async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
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
            title: { $regex: search, $options: "i" },
        });
        res.json(products);
    } catch (err) {
        res.status(400).json(`Error: ${err}`);
    }
});

module.exports = router;