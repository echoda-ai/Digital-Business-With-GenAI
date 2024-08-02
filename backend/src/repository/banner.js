const knex = require('../db/knex');

class BannerRepository {
    #selected = ['bannerID', 'image_path']

    findAll() {
        return knex('banners')
            .select(this.#selected)
    }

    insert(data) {
        return knex('banners')
            .insert(data)
    }
}

module.exports = BannerRepository;