const knex = require('../db/knex');

class CategoryRepository {
    async findAll() {
        return knex('categories')
            .select('categoryID', 'categoryName', 'description')
            .then((categories) => categories)
            .catch((error) => { throw error });
    }
};
module.exports = CategoryRepository;