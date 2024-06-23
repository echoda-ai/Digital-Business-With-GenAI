import knex from '../db/knex'

export const getProducts = async () => {
    return knex('products').select('*')
}