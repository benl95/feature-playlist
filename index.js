const express = require('express')
const hbs = require('handlebars')
const path = require('path')
const bodyParser = require('body-parser')
const camelCase = require('camelcase')
const app = express()

// Port
app.listen(8080, () => {
    console.log('Server is starting on port', 8080)
})

// Static folders 
app.use(express.static(path.join(__dirname, '/public')))

// Hbs setup 
app.engine('handlebars', expbs({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts')
}));

app.set('view engine', 'handlebars')

// Body Parser setup
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());