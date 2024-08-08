const knex = require('../db/knex');

class ProductRepository {
    #selectedFields = ["productID", "name", "description", "price", "quantityAvailable", "image"]

    getProducts() {
        return knex('products')
            .select(this.#selectedFields)
    }

    getProductById(productID) {
        return knex("products")
            .select(this.#selectedFields)
            .where('productID', '=', productID)
    }

    decrementProductQuantity(productID, quantity, trx) {
        return trx('products')
            .where('productID', '=', productID)
            .decrement('quantityAvailable', quantity)
    }

    findProductById(productIDs) {
        console.log(productIDs)
        return knex('products')
            .select(this.#selectedFields)
            .whereIn('productID', productIDs)
    }

    getProductByCategoryID(categoryID) {
        return knex('products')
            .select(this.#selectedFields)
            .where({ categoryID })
    }
}


module.exports = ProductRepository