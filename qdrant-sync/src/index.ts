import cron from 'node-cron';
import { getProducts } from './services/product';

// for schedule task
cron.schedule('0 0 * * *', () => {
    console.log('running a task every day');
});

getProducts().then((products) => {
    console.log(products);
}).catch((error) => {
    console.log(error);
});