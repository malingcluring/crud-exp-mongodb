const express = require('express');
const bodyParser = require('body-parser');
const { engine } = require('express-handlebars');
const MongoClient = require('mongodb').MongoClient;
const connectionString = 'mongodb+srv://malingcluring:akew990505@cluster0.t4ikhrx.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'start-wars-quotes';
const dbCollection = 'quotes';
const path = require('path');
const port = 3030;

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.engine('hbs', engine({
    extname: 'hbs',
}));

app.set('view engine', 'hbs');

app.set('views', path.join(__dirname, 'views'));

// MongoDB
MongoClient.connect(connectionString, {
    useUnifiedTopology: true,
}, function (err, client) {
    if (err) {
        return console.error(err);
    }

    console.log('Connected to database');

    // set database
    const db = client.db(dbName);
    const quoteCollection = db.collection(dbCollection);

    // POST NEW QUOTE PROCCESS AND REDIRECT PAGE
    app.post('/quotes', function (req, res) {
        quoteCollection.insertOne(req.body)
            .then(function (result) {
                console.log(result);

                // REDIRECT TO "http://localhost:3030/view" PAGE AFTER PROCCESSING SUBMIT DATA 
                res.redirect('/view');
            })
            .catch(function (error) {
                console.error(error)
            })
    });

    // GET ALL ALL QUOTE COLLECTION PROCCESS AND VIEW 
    app.get('/view', function (req, res) {
        const cursor = db.collection('quotes').find().toArray()
            .then(function (results) {
                console.log(results);

                // DISPLAY ALL DATA COLLECTION TO VIEW PAGE "http://localhost:3030/view"
                res.render('view', {
                    layout: 'index',
                    quotes: results
                });
            });
    });

    // UPDATE SELECTED QUOTE
    app.put('/quotes', function (req, res) {
        quoteCollection.findOneAndUpdate(
            { name: 'kawan lama' },
            {
                $set: {
                    name: req.body.name,
                    quote: req.body.quote
                }
            },
            { upsert: true }
        )
            .then(function (result) {
                console.log(req.body);
            })

            .catch(function (error) {
                console.log(error);
            })

    });

    // DELETE SELECTED QUOTE
    app.delete('/quotes', (req, res) => {
        quoteCollection.deleteOne(
            { name: req.body.name }
        )
            .then(result => {
                if (result.deletedCount === 0) {
                    return res.json('No quote to delete')
                }
                res.json('Deleted Darth Vadar\'s quote')
            })
            .catch(error => console.error(error))
    })

});

app.get('/', function (req, res) {
    res.render('home', {
        layout: 'index'
    });
});

app.listen(port, function () {
    console.log(`App listening on port ${port}`);
})