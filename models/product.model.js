const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const ProductSchema = new mongoose.Schema({
    titleImage: String,
    images: [{
        type: String
    }],
    make: String,
    model: String,
    year: Number,
    color: String,
    odometer: Number,
    price: Number,
    condition: String,
    category: String,
    type: String,
    mileage: Number,
    family: String,
    engine: String
});

ProductSchema.plugin(mongoosePaginate);

const Client = mongoose.model('Product', ProductSchema);

module.exports = Client;