import { QdrantClient } from "@qdrant/js-client-rest";
import { getEnv } from "../utils/env";

export class QdrantService {
    private client: QdrantClient;

    constructor() {
        this.client = new QdrantClient({ host: getEnv('QDRANT_HOST'), port: 6333 });
    }

    public createCollection(collectionName: string): Promise<any> {
        return this.client.createCollection(
            collectionName, {
            vectors: { size: 512, distance: "Cosine" },
        })
    }

    public getCollections(): Promise<any> {
        return this.client.getCollections()
            .then((collections) => collections)
            .catch((error) => {
                console.log(error);
                throw error;
            });
    }

    checkCollectionExist(collectionName: string) {
        return this.client.collectionExists(collectionName)
            .then((response) => response)
            .catch((error) => {
                console.log(error);
                throw error;
            })
    }

    public addVector(collectionName: string, points: any[]): Promise<any> {
        return this.client.upsert(collectionName, {
            wait: true,
            points: points
        })
            .then((response) => response)
            .catch((error) => {
                console.log(error);
                throw error;
            });
    }

}