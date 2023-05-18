// import modules
const express = require("express");
const router = express.Router();
const multer = require("multer")
const Product = require("../models/Produkti");
const Category = require("../models/Kategorijas");
const Discount = require("../models/Atlaide");


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
        let products = await Product.find().populate('category').populate('discount');

        // Check if color query parameter exists
        if (req.query.color) {
            const color = req.query.color; // convert color to lowercase
            products = products.filter(product => product.color.some(c => c.toLowerCase() === color.toLowerCase()));
        }

        res.json(products);
    } catch (err) {
        res.status(400).json(`Error: ${err}`);
    }
});


// add product
router.post("/", upload.single("image"), async (req, res) => {
    try {
        const { title, description, color, size, price, categoryIds, discount } = req.body;

        if (!req.file) { // check if req.file exists
            return res.status(400).json({ message: "Image file not provided" });
        }

        if (!categoryIds) {
            return res.status(400).json({ message: "Category IDs not provided" });
        }

        const categoryIdsArray = categoryIds.split(",");
        const categories = await Category.find({ _id: { $in: categoryIdsArray } });
        if (categories.length !== categoryIdsArray.length) {
            return res.status(400).json({ message: "Category not found" });
        }

        const image = req.file.originalname;

        const product = new Product({
            image,
            title,
            description,
            color,
            size,
            price,
            category: categories,
            discount
        });
        await product.save();

        res.json(product);
    } catch (err) {
        res.status(400).json(`Error: ${err}`);
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