const { MongoClient } = require('mongodb');
require('dotenv').config();

async function main(){
    const client = new MongoClient(process.env.DATABASE_UNWRITTEN);

    try {
        await client.connect();
        const db = client.db('unwritten');
        await  listDatabases(client);
    
        const collections = [
            'sender_answer',
            'sender_question',
            'sender_record_question',
            'receiver_record_answer',
            'receiver_record_follow_up', 
            'sender_record_follow_up'
        ];

        collections.forEach(async (collection) => {
            await cleanCollection(db, collection);
        })
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
