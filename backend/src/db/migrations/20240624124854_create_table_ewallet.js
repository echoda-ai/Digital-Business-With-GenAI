/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('ewallet', (table) => {
        table.uuid('eWalletID').primary();
        table.decimal('balance', 10, 2).defaultTo(0);
        table.uuid('userID').notNullable();
        table.foreign('userID').references('userID').inTable('users');
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('ewallet');
};
