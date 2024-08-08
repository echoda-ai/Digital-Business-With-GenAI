const knex = require('../db/knex');
const OrderProductRepository = require('../repository/order-product');
const ProductRepository = require('../repository/product');

const productRepository = new ProductRepository()
const orderProductRepository = new OrderProductRepository()

class OrderRepository {
    #selectedFields = ['orderID', 'userID', 'totalAmount', 'orderStatus']

    async create(order) {
        const trx = await knex.transaction();
        try {
            await trx('orders')
                .insert({
                    userID: order.userID,
                    orderID: order.orderID,
                    totalAmount: trx('products').sum('price').whereIn('productID', order.products),
                    isChatbotOrder: order.isChatbotOrder
                })
                .then(async () => {
                    for (const productID of order.products) {
                        const product = await productRepository.getProductById(productID);
                        if (product.quantityAvailable < 1) {
                            throw new Error(`Product with ID ${productID} is out of stock`);
                        }
                        await orderProductRepository.createOrderProduct(order.orderID, productID, trx);
                        await productRepository.decrementProductQuantity(productID, 1, trx);
                    }
                });
            await trx.commit();

            // const createdOrder = await knex('orders').where({ orderID: order.orderID });
            // return createdOrder;
        } catch (error) {
            await trx.rollback();
            throw error;
        }
    }

    async updateStatus(orderID, status) {
        return await knex('orders')
            .where('orderID', orderID)
            .update({ orderStatus: status })
    }

    async getOrderByUserID(userID) {
        const orders = await knex('orders')
            .select(this.#selectedFields.map(field => `orders.${field}`))
            .select(knex.raw(`
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'productName', products.name,
                    'productPrice', products.price,
                    'productImage', products.image
                )
            ) as products
        `))
            .leftJoin('order_products', 'orders.orderID', 'order_products.orderID')
            .leftJoin('products', 'order_products.productID', 'products.productID')
            .where('orders.userID', userID)
            .groupBy(this.#selectedFields.map(field => `orders.${field}`))
            .orderBy('orders.created_at', 'desc');

        return orders.map(order => ({
            ...order,
            products: JSON.parse(order.products)
        }));
    }

}

module.exports = { OrderRepository }