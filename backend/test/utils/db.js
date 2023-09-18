import { connect, connection } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongo = undefined;

export async function setUp() {
    mongo = await MongoMemoryServer.create();
    const url = mongo.getUri();

    await connect(url, {
        useNewUrlParser: true,
    });
}

export async function dropDatabase() {
    if (mongo) {
        await connection.dropDatabase();
        await connection.close();
        await mongo.stop();
    }
}

export async function dropCollections() {
    if (mongo) {
        const collections = connection.collections;

        for (const key in collections) {
            const collection = collections[key];
            await collection.deleteMany();
        }
    }
}

