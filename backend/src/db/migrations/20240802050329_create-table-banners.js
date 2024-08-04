/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('banners', (table) => {
        table.increments('id').primary();
        table.string('image_path').notNullable();
        table.string('image_type', 50).notNullable();
        table.bigInteger('image_size').notNullable();
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('banners');
};
