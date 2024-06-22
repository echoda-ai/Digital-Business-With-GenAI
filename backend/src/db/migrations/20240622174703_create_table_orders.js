/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('orders', function (table) {
        table.uuid('orderID').primary();
        table.uuid('userID').references('userID').inTable('users');
        table.date('orderDate');
        table.float('totalAmount').notNullable();
        table.boolean('isChatbotOrder').defaultTo(false);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('orders');
};