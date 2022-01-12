import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

// Global Variables
export const collections: { users?: mongoDB.Collection } = {};
const USERS_COLLECTION_NAME = "users";

// Initialize Connection
export async function connectToUsersDatabase() {
  dotenv.config();

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    process.env.DB_CONN_STRING!
  );

  await client.connect();

  const db: mongoDB.Db = client.db(process.env.DB_NAME);

  const usersCollection: mongoDB.Collection = db.collection(
    USERS_COLLECTION_NAME
  );

  collections.users = usersCollection;

  console.log(
    `Successfully connected to database: ${db.databaseName} and collection: ${usersCollection.collectionName}`
  );
}
