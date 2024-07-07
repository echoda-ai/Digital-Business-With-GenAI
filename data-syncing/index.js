import mysql from 'mysql2/promise';
import got from 'got';
import crypto from 'crypto';

// Initialize a connection pool
const connPool = mysql.createPool({
    host: 'localhost',
    user: 'seanglay_user',
    password: 'seanglay_password',
    database: 'seanglay_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const generateUUID = () => crypto.randomUUID()

const categorySync = () => got('https://fakestoreapi.com/products/categories', { responseType: 'json' })
    .then(response => response.body.map(category => ({
        categoryID: generateUUID(),
        categoryName: category,
        categoryDescription: `Description for ${category}`,
    })))
    .then((data) => {
        const sql = 'INSERT INTO categories (categoryID, categoryName, description) VALUES ?';
        const values = data.map(category => [category.categoryID, category.categoryName, category.categoryDescription]);
        connPool.query(sql, [values])
            .then(([results, fields]) => {
                console.log('Query executed successfully:', results);
            })
            .catch(error => {
                console.error('Error executing query:', error);
            });
    })
    .catch(error => {
        console.error('Error:', error);
    });

const productSync = () => connPool.query('SELECT categoryID, categoryName FROM categories')
    .then(([results]) => {
        results.forEach(row => {
            console.log(`${row.categoryID}: ${row.categoryName}`);
            got.get(`https://fakestoreapi.com/products/category/${row.categoryName}`, { responseType: 'json' })
                .then((response) => response.body.map(product => (
                    {
                        productID: generateUUID(),
                        name: product.title,
                        description: product.description,
                        image: product.image,
                        price: product.price,
                        categoryID: row.categoryID,
                        quantityAvailable: Math.floor(Math.random() * 100) + 1
                    }
                )))
                .then(data => {
                    const sql = 'INSERT INTO products (productID, name, description, image, price, categoryID, quantityAvailable) VALUES ?';
                    const values = data.map(product => [product.productID, product.name, product.description, product.image, product.price, product.categoryID, product.quantityAvailable]);
                    connPool.query(sql, [values])
                        .then(([results]) => {
                            console.log('Query executed successfully:', results);
                        })
                        .catch(error => {
                            console.error('Error executing query:', error);
                        });
                })
        });
    })
    .catch(error => {
        console.error('Error executing query:', error);
    });


categorySync()
    .then(() => productSync())
    .then(() => console.log('Synchronization completed successfully.'))
    .catch(error => console.error('An error occurred during synchronization:', error));