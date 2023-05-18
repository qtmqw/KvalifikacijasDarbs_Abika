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

router.delete("/:discountId", async (req, res) => {
    const discountId = req.params.discountId;

    try {
        const deletedDiscount = await Discount.findByIdAndDelete(discountId);
        res.status(200).json({ status: "OK", data: deletedDiscount });
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
});

module.exports = router;