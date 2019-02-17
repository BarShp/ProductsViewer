const ProductModel = require('../Models/productModel.js');

function getProducts(req, res, next) {
    const page = Math.max(req.params.page | 0, 0);
    let { query, sortBy } = extractQueryAndSort(req);
    // (debug) console.log(`Sending products from page ${page}. Page Size: ${process.env.PV_MONGO_PAGE_SIZE}. Query: ${JSON.stringify(query)}`);
    getProductsFromDB(page, +process.env.PV_MONGO_PAGE_SIZE, query, sortBy).then((data) => {
        res.send(data);
    });
}

function getFieldAutocomplete(req, res, next) {
    let { query, sortBy } = { ...extractQueryAndSort(req) };
    let field = req.query.field;
    if (!field) {
        return res.status(500).send('Field undefined for autocomplete');
    }
    getFieldAutocompleteFromDB(field, +process.env.PV_MONGO_AUTOCOMPLETE_SIZE, query, sortBy).then((data) => {
        res.send(data);
    });
}

function getProductById(req, res, next) {
    getProductFromDB(req.params.id).then((product) => {
        res.send(product);
    });
};

async function getProductsFromDB(page, pageSize = 10, query = {}, sortBy = "name") {
    return await ProductModel.aggregate([
        { $match: query },
        { $sort: { [sortBy]: 1 } },
        { $skip: page * pageSize },
        { $limit: pageSize }
    ]).exec();
}

async function getProductFromDB(id) {
    return await ProductModel.findById(id).exec();
}

async function getFieldAutocompleteFromDB(fieldName, autocompleteSize = 3, query = {}, sortBy = "name") {
    return await ProductModel.aggregate([
        { $match: query },
        { $sort: { [sortBy]: 1 } },
        { $limit: autocompleteSize },
        { $project: { [fieldName]: 1, "_id": 0 } }
    ]).exec();
}

function extractQueryAndSort(req) {
    let { field, value, sortBy } = req.query;
    let query = {};

    if (field && value) {
        query = { [`${field}`]: new RegExp(value, "i") };
    }
    return { query: query, sortBy: sortBy };

}

module.exports = {
    getProducts: getProducts,
    getProductById: getProductById,
    getFieldAutocomplete: getFieldAutocomplete
};
