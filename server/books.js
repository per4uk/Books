var Book = require('./models/books');
var formidable = require('formidable');

exports.getAllBooks = function ( req, res ) {
    
    console.log( 'get /books' );
    Book.find( {}, function ( err, books ) {

      if ( err ) res.send( err );

      res.send( books );

    });
    
};

exports.addBook = function ( req, res ) {
    
    newBook = Book();

    newBook.save( function ( err, book ) {

        if ( err ) throw err;

        var form = new formidable.IncomingForm();
        var bookData = {};

        form.on( 'fileBegin', function ( name, file ) {

            file.path = __dirname + '/books/' + book.id + '.' + file.name.split('.').pop();

        });

        form.on('field', function( name, value ) {

            bookData[ name ] = value;

        });

        form.on( 'file', function ( name, file ) {

            bookData.file = '/download/' + book.id + '.' + file.name.split('.').pop();
            console.log('Uploaded ' + file.name);

        });

        form.on( 'end', function () {

            Book.findByIdAndUpdate( book.id, bookData, function ( err ) {

              if (err) throw err;

              res.send();
              console.log( 'Book created!' );

            });            

        });

        form.parse( req );

    });
    
};

exports.downloadBook =  function ( req, res ) {

  var bookName = req.params.book_id;
  var file = __dirname + '/books/' + bookName;
  res.download( file );

};

exports.editBook = function ( req, res ) {
    
    var form = new formidable.IncomingForm();
    var bookData = {};
    var id = req.params.book_id;

    form.on( 'fileBegin', function ( name, file ) {

        file.path = __dirname + '/books/' + id + '.' + file.name.split('.').pop();

    });

    form.on( 'field', function( name, value ) {

        bookData[ name ] = value;

    });

    form.on( 'file', function ( name, file ) {

        bookData.file = '/download/' + id + '.' + file.name.split('.').pop();
        console.log('Uploaded ' + file.name);

    });

    form.on( 'end', function () {

        Book.findByIdAndUpdate( id, bookData, function ( err ) {

          if ( err ) res.send( err );

          res.send();
          console.log('Book updated!');

        });       

    });

    form.parse( req );    
    
};

exports.deleteBook = function ( req, res ) {
 
    Book.findByIdAndRemove( req.params.book_id, function ( err ) {

      if ( err ) res.send( err );

      res.send();
      console.log( 'Book deleted!' );

    });
    
};

exports.getBook = function ( req, res ) {
 
    Book.findById( req.params.book_id, function ( err, book ) {

      if ( err ) res.send( err );

      res.send( book );
      console.log( 'Book Finded!' );

    });
    
};