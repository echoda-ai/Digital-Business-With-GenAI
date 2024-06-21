const { hashPassword } = require("../../utils/util");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      userID: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
      username: 'JohnDoe',
      password: hashPassword('password1'),
      email: 'johndoe@example.com',
      address: '123 Main St',
      gender: 'Male',
      phone: '1234567890',
      zip: '12345',
      roleID: 1
    },
    {
      userID: 'd290f1ee-6c54-4b01-90e6-d701748f0852',
      username: 'AdminUser',
      password: hashPassword('password2'),
      email: 'adminuser@example.com',
      address: '456 High St',
      gender: 'Female',
      phone: '0987654321',
      zip: '54321',
      roleID: 2
    },
  ]);
};
