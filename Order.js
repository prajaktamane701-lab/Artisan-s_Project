const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number },
        price: { type: Number },
        vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    }],
    totalAmount: { type: Number, required: true },
    shippingAddress: { type: Object },
    paymentMethod: { type: String },
    paymentStatus: { type: String, default: 'pending' },
    orderStatus: { type: String, default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);