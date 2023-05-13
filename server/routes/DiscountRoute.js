const express = require("express");
const router = express.Router();
const Discount = require("../models/Atlaide");

router.get("/discountAll", async (req, res) => {
    try {
        const discount = await Discount.find();
        res.json(discount);
    } catch (err) {
        res.status(400).json(`Error: ${err}`);
    }
});

router.post("/discount", async (req, res) => {
    try {
        const { title, type, validUntil } = req.body;

        const discount = new Discount({
            title,
            type,
            validUntil,
        });
        await discount.save();

        res.json(discount);
    } catch (err) {
        res.status(400).json(`Error: ${err}`);
    }
});

module.exports = router;