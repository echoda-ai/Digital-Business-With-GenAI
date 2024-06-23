import Knex from "../src/db/knex";

Knex('users').select('*').then((users) => {
    console.log(users);
}).catch((error) => {
    console.log(error);
})