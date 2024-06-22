const { faker } = require('@faker-js/faker');
const crypto = require('crypto');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('products').del()

  const categories = await knex('categories').select('categoryID');
  const randomCategoryID = categories[Math.floor(Math.random() * categories.length)].categoryID;

  const products = Array.from({ length: 10000 }).map(() => ({
    productID: crypto.randomUUID(),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
    quantityAvailable: 100,
    categoryID: randomCategoryID
  }));

  await knex('products').insert(products);
};
