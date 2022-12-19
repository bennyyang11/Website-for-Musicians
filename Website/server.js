/*********************
 * GENERAL TODOS:
 * Add postgres stuff + copy queries to db_script.sql
 * 2 Test Cases using mocha/chai library
 * Heroku Hosting
 * EC: Docker deployment
 *********************/


//TODO: add postgres library
var express = require('express');
var app = express();

//TODO: connect to postgres database

const hostname = '127.0.0.1'
const port = 8080

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '\\public'))

app.get('/', function (req, res) {
    console.log("Received GET: /")
    res.render('pages\\main', {
        my_title: 'Project'
    });
})

app.get('/reviews', function (req, res) {
    console.log("Received GET: /reviews")
    res.render('pages\\reviews', {
        my_title: 'Project'
    });
})

app.get('/query', function (req, res) {
    console.log("Received GET: /query")

    //TODO: send query to database, store output in result
    result = []

    res.send(result)
})


var server = require('http').Server(app)
server.listen(port, hostname, () => console.log(`Server running at ${hostname}:${port}`))