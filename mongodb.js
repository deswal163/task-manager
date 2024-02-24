const { error } = require('console');
const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = "mongodb://0.0.0.0:27017";
const databaseName = "task-manager";

const client = new MongoClient(connectionURL);

async function main() {
  try {
    await client.connect();
    const db = client.db(databaseName);

    // const result = await db.collection('users').insertOne({
    //     name: 'Shubham',
    //     age: 20
    // })

    // const result = await db.collection("tasks").insertMany([
    //   {
    //     description: "task-1",
    //     completed: false,
    //   },
    //   {
    //     description: "task-2",
    //     completed: true,
    //   },
    //   {
    //     description: "task-3",
    //     completed: false,
    //   },
    // ]);

    db.collection('users').findOne({ name: 'Shubwham' }).then((error, result) => {
        if (error) {
            return console.log("Unable to fetch.");
        }

        if (!result) {
            return console.log('NO data found');
        }

        console.log(result);
    })

    db.collection('tasks').find( { completed : false } ).toArray().then((data) => {
        console.log(data);
    })



  } catch (e) {
    console.log("Unnable to connect.");
  }
}

main();
