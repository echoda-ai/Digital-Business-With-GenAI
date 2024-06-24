/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('orders', function (table) {
        table.uuid('orderID').primary();
        table.uuid('userID').references('userID').inTable('users');
        table.enum('orderStatus', ['pending', 'processing', 'completed', 'cancelled']).defaultTo('pending');
        table.float('totalAmount').notNullable();
        table.boolean('isChatbotOrder').defaultTo(false);
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('orders');
};
