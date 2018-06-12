const ProductService = require('../services/product.service');

exports.getProducts = async function (req, res) {
    const  { page, limit, ...dbQuery } = req.query;
    let paginationOptions = {};

    if (page) {
        paginationOptions.page = Number(page);
    }

    if (limit) {
        paginationOptions.limit = Number(limit);
    }

    if (dbQuery.last_years) {
        dbQuery.year = {
            $gte: new Date().getFullYear() - dbQuery.last_years,
            $lte: new Date().getFullYear()
        };
        delete dbQuery.last_years;
    }

    if (dbQuery.price_min && dbQuery.price_max) {
        dbQuery.price = {
            $gte: dbQuery.price_min,
            $lte: dbQuery.price_max
        };
        delete dbQuery.price_min;
        delete dbQuery.price_max;
    }

    if (Number(dbQuery.cond_new) && !Number(dbQuery.cond_used)) {
        dbQuery.condition = 'New'
    } else if (Number(dbQuery.cond_used) && !Number(dbQuery.cond_new)) {
        dbQuery.condition = 'Used'
    }
    delete dbQuery.cond_new;
    delete dbQuery.cond_used;

    try {

        const products = await ProductService.getProducts(dbQuery, paginationOptions);

        return res.status(200).json({
            status: 200,
            data: products
        });

    } catch (e) {
        return res.status(400).json({
            status: 400,
            message: e.message
        });
    }
};

exports.getProduct = async function (req, res) {
    const id = req.params.id;

    try {

        const product = await ProductService.getProduct(id);

        return res.status(200).json({
            status: 200,
            data: product
        });

    } catch (e) {
        return res.status(400).json({
            status: 400,
            message: e.message
        });
    }
};

exports.getTypes = async (req, res) => {
    try {

        const types = await ProductService.getDistinct('type');

        return res.status(200).send(types);

    } catch (e) {
        console.log(e);
        return res.status(500).send(e);
    }
};

exports.getMakes = async (req, res) => {
    try {

        const makes = await ProductService.getDistinct('make');

        return res.status(200).send(makes);

    } catch (e) {
        console.log(e);
        return res.status(500).send(e);
    }
};

exports.addProduct = async function (req, res) {

    let product = { ...req.body };

    try {
        let addedProduct = await ProductService.addProduct(product);

        return res.status(201).json({
            status: 201,
            data: addedProduct
        });

    } catch (e) {

        return res.status(400).json({
            status: 400,
            message: e.message
        });

    }
};

exports.updateProduct = async function (req, res) {
    if (!req.body._id) {

        return res.status(400).json({
            status: 400,
            message: 'id is required!'
        });

    }

    const id = req.body._id;

    console.log(req.body);

    let product = {
        id,
        titleImage: req.body.titleImage || null,
        images: req.body.images ? [ ...req.body.images ] : null,
        make: req.body.make || null,
        model: req.body.model || null,
        year: req.body.year || null,
        color: req.body.color || null,
        odometer: req.body.odometer || null,
        price: req.body.price || null,
        condition: req.body.condition || null,
        category: req.body.category || null,
        type: req.body.type || null,
        mileage: req.body.mileage || null,
        family: req.body.family || null,
        engine: req.body.engine
    };

    try {

        const updatedProduct = await ProductService.updateProduct(product);

        return res.status(200).json({
            status: 200,
            data: updatedProduct
        });

    } catch (e) {

        return res.status(400).json({
            status: 400,
            message: e.message
        });

    }
};

exports.deleteProduct = async function (req, res) {

    const id = req.params.id;

    try {
        const deletedProduct = await ProductService.deleteProduct(id);
        return res.status(204).json({ status: 204,  data: deletedProduct });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }

};