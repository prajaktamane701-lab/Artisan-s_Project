const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../middleware/auth');

router.get('/products', auth, async (req, res) => {
    try {
        if (req.user.role !== 'vendor') return res.status(403).json({ message: 'Vendor only' });
        const products = await Product.find({ vendor: req.user.id });
        res.json(products);
    } catch (err) { res.status(500).json({ message: err.message }); }
});

router.post('/products', auth, async (req, res) => {
    try {
        if (req.user.role !== 'vendor') return res.status(403).json({ message: 'Vendor only' });
        const product = new Product({ ...req.body, vendor: req.user.id });
        await product.save();
        res.status(201).json(product);
    } catch (err) { res.status(400).json({ message: err.message }); }
});

module.exports = router;