const { MongoClient } = require('mongodb');
require('dotenv').config();


async function main(){
  const client = new MongoClient(process.env.DATABASE_UNWRITTEN);

  try {
    await client.connect();
    const db = client.db('unwritten');
    // await  listDatabases(client);

    await cleanCollection(db, 'sender_answer');
    await cleanCollection(db, 'sender_question');
    await cleanCollection(db, 'sender_record_question');
    await cleanCollection(db, 'receiver_record_answer');
    await cleanCollection(db, 'receiver_record_follow_up');
    await cleanCollection(db, 'sender_record_follow_up');

  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

async function cleanCollection(db, collectionName) {
  try {
    const result = await db.collection(collectionName).deleteMany({});
    console.log(`${result.deletedCount} documents were deleted from the ${collectionName} collection.`);
    return result;
  } catch (e) {
    console.error(e);
   }
}

main().catch(console.error);

