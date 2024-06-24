/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('ewallet_transaction', (table) => {
        table.uuid('transactionID').primary();
        table.decimal('balance', 10, 2).defaultTo(0);
        table.uuid('eWalletID').notNullable();
        table.foreign('eWalletID').references('eWalletID').inTable('ewallet');
        table.enu('transactionType', ['withdrawal', 'deposit', 'purchase']).notNullable();
        table.decimal('transactionAmount', 10, 2).notNullable();
        table.text('transactionDescription').nullable();
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('ewallet_transaction');
};
