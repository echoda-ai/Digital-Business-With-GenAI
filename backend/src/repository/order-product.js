const knex = require('../db/knex')
class OrderProductRepository {
    async createOrderProduct(orderID, productID, trx) {
        return trx('order_products')
            .insert({ orderID, productID })
            .catch(err => { throw err })
    }

    async getTopSale() {
        console.log('getTopSale')
        const topSale = await knex('order_products')
            .select('productID')
            .groupBy('productID')
            .orderBy(knex.raw('count(productID)'), 'desc');
        return topSale;
    }
}

module.exports = OrderProductRepository 