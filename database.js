const mongoose = require('mongoose')
const {
    MongoClient
} = require('mongodb')
require('dotenv').config()

// Mongoose connection setup
const uri = 'mongodb+srv://admin:' + process.env.DB_PASS + '@projecttech-a3phf.mongodb.net/test'

mongoose.connect(uri || 'mongodb://localhost/playlist', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected')
});

// MongoDB connection setup
async function main() {

    const uri = 'mongodb+srv://admin:' + process.env.DB_PASS + '@projecttech-a3phf.mongodb.net/test'


    const client = new
    MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    try {
        // Connect to the MongoDB cluster
        await client.connect()

        // Make the appropriate DB calls
        await listDatabases(client)

    } catch (e) {
        console.error(e)
    } finally {
        await client.close()
    }
}

main().catch(console.error)

// Database function retrieve list databases
async function listDatabases(client) {
    databasesList = await client.db().admin().listDatabases()

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`))
};