const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
        if (!cart || cart.items.length === 0) return res.status(400).json({ message: 'Cart empty' });

        const order = new Order({
            customer: req.user.id,
            items: cart.items.map(item => ({
                product: item.product._id,
                quantity: item.quantity,
                price: item.price,
                vendor: item.product.vendor
            })),
            totalAmount: cart.totalAmount,
            shippingAddress: req.body.shippingAddress,
            paymentMethod: req.body.paymentMethod,
            paymentStatus: 'pending'
        });

        await order.save();
        await Cart.deleteOne({ user: req.user.id });
        res.status(201).json(order);
    } catch (err) { res.status(500).json({ message: err.message }); }
});

router.get('/customer', auth, async (req, res) => {
    try {
        const orders = await Order.find({ customer: req.user.id }).populate('items.product');
        res.json(orders);
    } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;