const knex = require('../db/knex');

class ProductRepository {
    getProducts() {
        return knex('products')
            .select("productID", "name", "description", "price", "quantityAvailable")
    }

    getProductById(productID) {
        console.log("productID", productID)
        return knex("products")
            .select("productID", "name", "description", "price", "quantityAvailable")
            .where('productID', '=', productID)
    }

    decrementProductQuantity(productID, quantity, trx) {
        return trx('products')
            .where('productID', '=', productID)
            .decrement('quantityAvailable', quantity)
    }

    findProductById(productIDs) {
        return knex('products')
            .select("productID", "name", "description", "price", "quantityAvailable")
            .whereIn('productID', productIDs)
    }
}


module.exports = ProductRepository