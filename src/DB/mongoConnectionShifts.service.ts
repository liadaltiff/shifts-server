import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

// Global Variables
export const collections: { shifts?: mongoDB.Collection } = {};
const SHIFTS_COLLECTION_NAME = "shifts";

// Initialize Connection
export async function connectToShiftsDatabase() {
  dotenv.config();

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    process.env.DB_CONN_STRING!
  );

  await client.connect();

  const db: mongoDB.Db = client.db(process.env.DB_NAME);

  const shiftsCollection: mongoDB.Collection = db.collection(
    SHIFTS_COLLECTION_NAME
  );

  collections.shifts = shiftsCollection;

  console.log(
    `Successfully connected to database: ${db.databaseName} and collection: ${shiftsCollection.collectionName}`
  );
}
