// import modules
const express = require("express");
const router = express.Router();
const Product = require("../models/Products");
const multer = require("multer")

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
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(400).json(`Error: ${err}`);
    }
});

// add product
router.post("/", upload.single("image"), async (req, res) => {
    try {
        const { title, description, color, price } = req.body;
        const product = new Product({
            image: req.file.originalname,
            title,
            description,
            color,
            price,
        });
        await product.save();
        res.json(product);
        console.log(req.file.path);
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