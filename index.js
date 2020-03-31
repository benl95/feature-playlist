const express = require('express')
const handlebars = require('express-handlebars')
const path = require('path')
const bodyParser = require('body-parser')
const camelCase = require('camelcase')
const app = express()

// Static folders 
app.use(express.static(path.join(__dirname, '/public')))

// Hbs setup 
app.engine('handlebars', handlebars({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts')
}));

app.set('view engine', 'handlebars')

// Body-parser setup
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

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

// Routing 
app.get('/', (req, res) => {
    res.render('playlist')
})

app.get('/add', (req, res) => {
    res.render('addsong')
})

app.get('/edit', (req, res) => {
    res.render('editsong')
})

// Port
app.listen(8080, () => {
    console.log('Server is starting on port', 8080)
})

// Schema
const Schema = new mongoose.Schema({
    song: String,
    artist: String,
    genre: String
});

// Model
const favouriteSongs = mongoose.model('favouriteSongs', Schema)

// Post song to DB 
app.post('/add', (req, res) => {
    const new_favouriteSongs = favouriteSongs({
        song: req.body.song,
        artist: req.body.artist,
        genre: req.body.genre
    });
    new_favouriteSongs.save((error) => {
        if (error) {
            console.log('There was an error');
        } else {
            console.log('Songs successfully added');
        }
        res.redirect('/')
    });
});

// Render data to HBS 
app.get('/', (req, res) => {
    favouriteSongs.find({}, function (err, favouritesongs) {
        if (err) return handleError(err)
        res.render('playlist', {
            favouritesongs: favouritesongs
        })
    })
})

// Edit song in playlist
app.post('/edit', (req, res) => {
    favouriteSongs.findOneAndUpdate({
        song: req.body.song,
        artist: req.body.artist,
        genre: req.body.genre
    }, {
        $set: {
            song: req.body.song,
            artist: req.body.artist,
            genre: req.body.genre
        }
    }, {
        new: true
    }, (err, doc) => {
        if (err) {
            console.log('Something went wrong')
        } else {
            console.log('Successfully updated')
        }
        console.log(doc)
    })
})