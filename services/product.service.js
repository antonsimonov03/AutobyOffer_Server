const Product = require('../models/product.model');

_this = this;

exports.getProducts = async function (query, page, limit) {
    let options = {
        page,
        limit
    };

    try {

        return await Product.paginate(query, options);

    } catch (e) {

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

    console.log('OLD', oldProduct);

    oldProduct = { ...product };

    delete oldProduct.id;

    console.log('NEW', oldProduct);

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