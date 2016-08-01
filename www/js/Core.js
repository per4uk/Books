var Core = function () {

};

Core.prototype = {};
Core.constructor = Core;

Core.prototype.init = function () {

    ui = new UI();

    //

    ui.init();

    this.books = [];

};

Core.prototype.addNewBook = function ( newBook , callback ) {

    var data = new FormData();
    data.append( 'file', newBook.file );
    data.append( 'author', newBook.author );
    data.append( 'title', newBook.title );
    data.append( 'description', newBook.description );
    data.append( 'status', newBook.status );

    $.ajax({
        url: '/addbook', 
        type: 'POST',
        contentType: false, 
        data: data, 
        processData: false,  
        cache: false
    }).done( callback );

};

Core.prototype.editBook = function ( editBook , callback ) {

    var data = new FormData();
    for ( key in editBook ) {

        data.append( key, editBook[ key ] );

    }

    $.ajax({
        url: '/editbook', 
        type: 'POST',
        contentType: false, 
        data: data, 
        processData: false,  
        cache: false
    }).done( callback );

};

Core.prototype.refreshBooks = function ( callback ) {

    var self = this;
    $.get( '/books', function ( data ) {

        self.books = data.books;console.log( self.books );

        callback();

    });

};

Core.prototype.findBookById = function ( id ) {

    return  this.books.find( function ( e ) {

                if ( e._id === id ) return true;
                return false; 

            });

};

Core.prototype.deleteBook = function ( id, callback ) {

    $.post( "/deletebook", { id: id }, function () {

        callback();

    });

};
