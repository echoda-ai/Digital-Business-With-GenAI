import cron from 'node-cron';
import { getProducts } from './services/product';
import { QdrantService } from './qdrant';

const qdrantService = new QdrantService();

const addToQdrant = async () => {
    try {
        const collectionName = 'products';
        console.log('collectionName', collectionName)
        const checkCollection = await qdrantService.checkCollectionExist(collectionName)
        if (!checkCollection.exists) {
            console.log("====== Create Collection ======")
            await qdrantService.createCollection(collectionName)
        }

        const chunkSize = 500;
        let offset = 0;

        while (true) {
            console.log(`====== Add vectors from ${offset} to ${offset + chunkSize} ======`)
            const products = await getProducts(chunkSize, offset);
            if (products.length === 0) {
                break;
            }

            const points = products.map((product: any) => ({
                id: product.productID,
                vector: Array(512).fill(parseFloat(product.price)),
                payload: {
                    id: product.productID,
                    price: product.price,
                    name: product.name,
                    categoryName: product.categoryName
                }
            }));

            await qdrantService.addVector(collectionName, points);

            offset += chunkSize;
        }
    } catch (error) {
        console.error(error);
    }
}



// for schedule task
cron.schedule('0 0 * * *', () => {
    console.log('running a task every day');
    addToQdrant();
});

