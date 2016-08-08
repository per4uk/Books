
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

app.get( '/download/:book_id', books.downloadBook );

//

var router = express.Router(); 

//

router.route( '/books' )
    .post( books.addBook )
    .get( books.getAllBooks );

router.route( '/books/:book_id' )
    .put( books.editBook )
    .delete( books.deleteBook )
    .get( books.getBook );

//

app.use( '/api', router );

//

app.listen( PORT );
console.log( '> Started server on port ' + PORT );