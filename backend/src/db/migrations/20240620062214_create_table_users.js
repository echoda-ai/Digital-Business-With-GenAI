/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('users', (table) => {
        table.uuid('userID').primary();
        table.string('username').notNullable();
        table.string('password').unique().notNullable();
        table.string('email').unique().notNullable();
        table.string('address').notNullable();
        table.string('gender', 10);
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
