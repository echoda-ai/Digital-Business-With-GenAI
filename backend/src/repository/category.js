const knex = require('../db/knex');

class CategoryRepository {
    async findAll() {
        return knex('categories')
            .select('categoryID', 'categoryName', 'description');
    }
};
module.exports = CategoryRepository;