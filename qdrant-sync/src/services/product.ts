import knex from '../db/knex'

export const getProducts = async (limit: number, offset: number) => {
    return knex('products')
        .select('products.productID',
            'products.name',
            'products.price',
            'categories.categoryName')
        .leftJoin('categories', 'products.categoryID', 'categories.categoryID')
        .limit(limit)
        .offset(offset)
}