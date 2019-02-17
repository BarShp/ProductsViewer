const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: {
        type:
            String
    },
    productName: {
        type:
            String
    },
    price: {
        type:
            Number
    }
}, { collection: 'PVProducts' });

module.exports = mongoose.model("Product", productSchema);;