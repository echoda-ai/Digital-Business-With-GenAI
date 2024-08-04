const knex = require('../db/knex');

class BannerRepository {
    #selected = ['id', 'image_path']

    findAll() {
        return knex('banners')
            .select(this.#selected)
    }

    insert(data) {
        return knex('banners')
            .insert(data)
    }

    findById(id) {
        return knex('banners')
            .select(this.#selected)
            .where({ id })
            .first();
    }

    remove(id) {
        return knex('banners')
            .where({ id })
            .del();
    }


}

module.exports = BannerRepository;