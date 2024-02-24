const { error } = require('console');
const { MongoClient, ObjectId } = require('mongodb')

const connectionURL = "mongodb://0.0.0.0:27017";
const databaseName = "task-manager";

const client = new MongoClient(connectionURL);

async function main() {
  try {
    await client.connect();
    const db = client.db(databaseName);

   
  } catch (e) {
    console.log(e);
  }
}

main();
