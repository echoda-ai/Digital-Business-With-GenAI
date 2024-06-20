/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments('userID').primary();
        table.string('username').notNullable();
        table.string('password').notNullable();
        table.string('email').notNullable();
        table.string('address').notNullable();
        table.string('phone').notNullable();
        table.string('zip').notNullable();
        table.integer('roleID').unsigned().notNullable();
        table.foreign('roleID').references('roleID').inTable('roles');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('users');
};
