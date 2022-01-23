import * as mongoDB from "mongodb";
import Shift from "../models/shift.model";
import User from "../models/user.model";

export const collections: {
  users?: mongoDB.Collection<User>;
  shifts?: mongoDB.Collection<Shift>;
} = {};

export async function connectToDatabase() {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    process.env.DB_CONN_STRING!
  );

  await client.connect();

  const db: mongoDB.Db = client.db(process.env.DB_NAME);

  const uesrsCollection: mongoDB.Collection<User> = db.collection(
    process.env.USERS_COLLECTION_NAME!
  );

  const shiftsCollection: mongoDB.Collection<Shift> = db.collection(
    process.env.SHIFTS_COLLECTION_NAME!
  );

  collections.users = uesrsCollection;
  collections.shifts = shiftsCollection;

  console.log(
    `Successfully connected to database: ${db.databaseName} and collection: ${shiftsCollection.collectionName}`
  );
}
