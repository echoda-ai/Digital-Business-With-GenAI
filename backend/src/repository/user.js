const knex = require('../db/knex');

class UserRepository {
    async findUserByEmail(email) {
        return knex('users').where({ email }).first();
    }

    async saveUser(user) {
        return knex('users').insert(user);
    }
}

module.exports = UserRepository;