const Product = require('../models/product.model');

exports.getProducts = async function (query, options) {

    try {

        return await Product.paginate(query, options);

    } catch (e) {
        console.log(e);
        throw Error('Error while paginating products');
    }
};

exports.getProduct = async function (id) {
    try {

        return await Product.findById(id);

    } catch (e) {

        throw Error('Error while getting product');
    }
};

exports.getDistinct = async (field) => {
    try {

        return await Product.find().distinct(field);


    } catch (e) {
        console.log(e);
        throw Error(`Error while getting ${field}`)
    }
};

exports.getMakes = async (req, res) => {
    try {

        const types = await Product.find().distinct('make');

        return res.status(200).send(types);

    } catch (e) {
        console.log(e);
        return res.status(500).send(e);
    }
};

exports.addProduct = async function (product) {
    let newProduct = new Product({
       titleImage: product.titleImage,
       images: [ ...product.images ],
       make: product.make,
       model: product.model,
       year: product.year,
       color: product.color,
       odometer: product.odometer,
       price: product.price,
       condition: product.condition,
       category: product.category,
       type: product.type,
       mileage: product.mileage,
       family: product.family,
       engine: product.engine
    });

    try {

        return await newProduct.save();

    } catch (e) {
        throw Error('Error while adding new product');
    }
};

exports.updateProduct = async function (product) {
    const id = product.id;
    let oldProduct = null;

    try {
        oldProduct = await Product.findById(id);

    } catch (e) {
        throw Error('Error while finding product');
    }

    if (!oldProduct) {
        return null;
    }

    oldProduct = { ...product };
    delete oldProduct.id;

    try {
        return await oldProduct.save();

    } catch (e) {
        throw Error('Error while updating product');
    }
};

exports.deleteProduct = async function (id) {
    try {

        const deleted = await Product.remove({ _id: id });

        if (!deleted.result.n) {
            return false;
        }

        return deleted;

    } catch (e) {
        throw Error('Error while deleting product');
    }
};