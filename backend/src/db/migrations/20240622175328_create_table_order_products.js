/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('order_products', function (table) {
        table.uuid('orderID').references('orderID').inTable('orders');
        table.uuid('productID').references('productID').inTable('products');
        table.integer('quantity').notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('order_products');
};
