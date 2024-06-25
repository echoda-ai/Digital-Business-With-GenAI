const knex = require('../db/knex');

class ProductRepository {
    getProducts() {
        return knex('products')
            .select("productID", "name", "description", "price", "quantityAvailable")
            .then(products => products)
            .catch(err => { throw err })
    }

    getProductById(productID) {
        console.log("productID", productID)
        return knex("products")
            .select("productID", "name", "description", "price", "quantityAvailable")
            .where('productID', '=', productID)
            .catch(err => { throw err })
    }

    async decrementProductQuantity(productID, quantity, trx) {
        return trx('products')
            .where('productID', '=', productID)
            .decrement('quantityAvailable', quantity)
            .catch(err => { throw err })
    }
}


module.exports = ProductRepository