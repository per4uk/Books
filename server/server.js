
var PORT = 10096;

var express = require('express');
var books = require('./books');
var bodyParser = require('body-parser');

var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/books');

app.use( express.static( './../www' ) );
app.use( bodyParser.json() ); 
app.use( bodyParser.urlencoded({ extended: true }) );

//

app.listen( PORT );

//

app.get( '/books', books.getAllBooks );

app.post( '/addbook', books.addBook );

app.get( '/download/:book', books.downloadBook );

app.post( '/editbook', books.editBook );

app.post( '/deletebook', books.deleteBook );



console.log( '> Started server on port ' + PORT );