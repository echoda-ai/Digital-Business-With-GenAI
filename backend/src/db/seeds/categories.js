/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('categories').del()
  await knex('categories').insert([
    { categoryID: knex.raw('UUID()'), categoryName: 'Pizza', description: 'Delicious pizza from various restaurants' },
    { categoryID: knex.raw('UUID()'), categoryName: 'Burger', description: 'Juicy burgers of all kinds' },
    { categoryID: knex.raw('UUID()'), categoryName: 'Sushi', description: 'Fresh sushi from the best chefs' },
    { categoryID: knex.raw('UUID()'), categoryName: 'Pasta', description: 'Italian pasta dishes' },
    { categoryID: knex.raw('UUID()'), categoryName: 'Indian', description: 'Spicy and flavorful Indian cuisine' },
    { categoryID: knex.raw('UUID()'), categoryName: 'Chinese', description: 'Tasty Chinese dishes' },
    { categoryID: knex.raw('UUID()'), categoryName: 'Thai', description: 'Delicious Thai food' },
    { categoryID: knex.raw('UUID()'), categoryName: 'Mexican', description: 'Mexican food full of flavor' },
    { categoryID: knex.raw('UUID()'), categoryName: 'Vegan', description: 'Plant-based dishes' },
    { categoryID: knex.raw('UUID()'), categoryName: 'Gluten Free', description: 'Dishes without gluten' },
    { categoryID: knex.raw('UUID()'), categoryName: 'Desserts', description: 'Sweet treats for after your meal' },
    { categoryID: knex.raw('UUID()'), categoryName: 'Drinks', description: 'Refreshing beverages' },
    { categoryID: knex.raw('UUID()'), categoryName: 'Seafood', description: 'Fresh seafood dishes' },
    { categoryID: knex.raw('UUID()'), categoryName: 'Steakhouse', description: 'High-quality steaks' },
    { categoryID: knex.raw('UUID()'), categoryName: 'BBQ', description: 'Barbecue dishes' },
    { categoryID: knex.raw('UUID()'), categoryName: 'Breakfast', description: 'Start your day right with a good breakfast' },
    { categoryID: knex.raw('UUID()'), categoryName: 'Brunch', description: 'Late morning meals' },
    { categoryID: knex.raw('UUID()'), categoryName: 'Bakery', description: 'Freshly baked goods' },
    { categoryID: knex.raw('UUID()'), categoryName: 'Cafe', description: 'Light meals and drinks' },
    { categoryID: knex.raw('UUID()'), categoryName: 'Healthy', description: 'Nutritious and balanced meals' },
  ]);
};
