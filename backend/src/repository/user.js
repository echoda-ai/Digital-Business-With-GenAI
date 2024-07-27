const knex = require('../db/knex');

class UserRepository {
    #selectedField = ['userID', 'email', 'username', 'address', 'gender', 'phone'];

    /**
     * 
     * @param {string} email 
     * @returns 
     */
    async findUserByEmail(email) {
        return await knex('users')
            .where({ email })
            .select(this.#selectedField)
            .first();
    }

    /**
     * 
     * @param {Object} user 
     * @returns 
     */
    async saveUser(user) {
        return await knex('users')
            .insert(user);
    }

    /**
     * 
     * @param {number} userID 
     * @returns 
     */
    async findUserById(userID) {
        return await knex('users')
            .where({ userID })
            .select(this.#selectedField)
            .first();
    }
}

module.exports = UserRepository;