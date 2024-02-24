const { error } = require('console');
const { MongoClient, ObjectId } = require('mongodb')

const connectionURL = "mongodb://0.0.0.0:27017";
const databaseName = "task-manager";

const client = new MongoClient(connectionURL);

async function main() {
  try {
    await client.connect();
    const db = client.db(databaseName);

    // db.collection('users').updateOne({
    //   _id: new ObjectId("65d7231cefe5dbe284e6661a")
    // }, {
    //   $set: {
    //     name: "Akshay" 
    //   }
    // }).then((result)  => {
    //   console.log(result);
    // }).catch((error) => {
    //   console.log(error);
    // })

    // const updateResponse = await db.collection('users').updateOne({
    //   _id: new ObjectId("65d7231cefe5dbe284e6661a")
    // }, {
    //   $set: {
    //     name: "Mike"
    //   },
    //   $inc: {
    //     age: 1
    //   }
    // })

    // const response = await db.collection('tasks').updateMany({
    //   completed: false,
    // }, {
    //   $set: {
    //     completed: true
    //   }
    // })

    const response = await db.collection('tasks').deleteOne({
      description : "task-1"
    })

    console.log(response)


   
  } catch (e) {
    console.log(e);
    console.log("Unnable to connect.");
  }
}

main();
