const knex = require('../db/knex')
class OrderProductRepository {
    async createOrderProduct(orderID, productID, trx) {
        return trx('order_products')
            .insert({ orderID, productID })
            .catch(err => { throw err })
    }
}

module.exports = OrderProductRepository 