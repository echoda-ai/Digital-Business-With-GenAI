/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('products', (table) => {
        table.uuid('productID').primary();
        table.string('name', 68).notNullable();
        table.string('description', 255);
        table.decimal('price', 10, 2).notNullable();
        table.integer('quantityAvailable').notNullable();
        table.uuid('categoryID').notNullable();
        table.foreign('categoryID').references('categoryID').inTable('categories');
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('products');
};
