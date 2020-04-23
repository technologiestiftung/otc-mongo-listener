// TODO: Read https://docs.mongodb.com/manual/tutorial/convert-standalone-to-replica-set/
// TODO: Continue toturial: https://www.mongodb.com/blog/post/node-js-change-streams-and-triggers
// TODO: review mongo /opt/myscripts/script.js
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { MongoClient } from "mongodb";

const muser = process.env.MONGO_USER!;
const mpassword = process.env.MONGO_PW!;
const mhost = process.env.MONGO_HOST!;
const mport = process.env.MONGO_PORT!;

// Add functions that make DB calls here

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function closeChangeStream(timeInMs = 60000, changeStream: any): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Closing the change stream");
      changeStream.close();
      resolve();
    }, timeInMs);
  });
}

async function monitorListingsUsingEventEmitter(
  client: any,
  timeInMs = 60000,
  pipeline = []
): Promise<void> {
  try {
    const collection = client.db("opendatacam").collection("tracker");
    const changeStream = collection.watch(pipeline);
    changeStream.on("change", (next: any) => {
      console.log("---------------------");
      console.log("---------------------");
      console.log("---------------------");
      console.log("---------------------");
      console.log("---------------------");
      console.log("---------------------");
      console.log("---------------------");
      console.log("---------------------");
      console.log(next);
      console.log("---------------------");
      console.log("---------------------");
      console.log("---------------------");
      console.log("---------------------");
      console.log("---------------------");
      console.log("---------------------");
      console.log("---------------------");
    });
    await closeChangeStream(timeInMs, changeStream);
  } catch (error) {
    console.error(error);
  }
}

async function main(): Promise<void> {
  /**
   * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
   * See http://bit.ly/NodeDocs_lauren for more details
   */
  const uri = `mongodb://${muser}:${mpassword}@${mhost}:${mport}`;

  /**
   * The Mongo Client you will use to interact with your database
   * See bit.ly/Node_MongoClient for more details
   */
  const client = new MongoClient(uri, { useUnifiedTopology: true });

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Make the appropriate DB calls
    await monitorListingsUsingEventEmitter(client);
  } finally {
    // Close the connection to the MongoDB cluster
    await client.close();
  }
}

main().catch(console.error);
