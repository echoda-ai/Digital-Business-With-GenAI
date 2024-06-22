const knex = require('../db/knex');

class ProductRepository {
    getProducts() {
        return knex('products')
            .select("productID", "name", "description", "price", "quantityAvailable")
    }

    getProductById(productID) {
        return knex("products")
            .select("productID", "name", "description", "price", "quantityAvailable")
            .where({ productID });
    }
}

module.exports = ProductRepository;