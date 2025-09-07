import { Db, MongoClient } from "mongodb";

const mongoUri = process.env.DB_URI || "mongodb://localhost:27017/";
const databaseName = process.env.DB_NAME || "user-register";
let client = new MongoClient(mongoUri);
let db: Db;

client.on("connection", () => {
  console.log(`Database connected successfully`);
});

client.on("connection", () => {
  console.log(`Database connected successfully`);
});
const connect = async () => {
  client = await client.connect();
  db = client.db(databaseName);
};

export { connect, db };
