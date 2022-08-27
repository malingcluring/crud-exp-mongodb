const express = require('express');
const bodyParser = require('body-parser');
const { engine } = require('express-handlebars');
const MongoClient = require('mongodb').MongoClient;
const path = require('path');
const port = 3030;

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(path.join(__dirname, 'public')));

app.engine('hbs', engine({
    extname: 'hbs',
}));

app.set('view engine', 'hbs');

app.set('views', path.join(__dirname, 'views'));

app.get('/', function (req, res) {
    res.render('home', {
        layout: 'index'
    });
});

app.get('/new-quote', function (req, res) {
    res.render('home', {
        layout: 'index',
        name: req.body.name,
        quote: req.body.quote
    });
});

app.listen(port, function () {
    console.log(`App listening on port ${port}`);
})