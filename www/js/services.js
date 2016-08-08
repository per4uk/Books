angular.module( 'booksApp.services', [] ).factory( 'Book', function ( $resource ) {

    var transformRequest = function ( data ) {

        if ( data === undefined ) {

            return data;

        }

        var fd = new FormData();
        angular.forEach( data, function ( value, key ) {

            if ( value instanceof FileList ) {

                fd.append(key, value[0]);
            
            } else {

                fd.append(key, value);

            }

        });

        return fd;

    };

    return $resource( '/api/books/:book_id', {}, {
        update: {
            method: 'PUT',
            transformRequest: transformRequest, 
            headers: { 'Content-Type': undefined } 
        },
        save: {
            method: 'POST',
            transformRequest: transformRequest, 
            headers: { 'Content-Type': undefined } 
        }
    });

}).service( 'sharedParams', function () {

    var activeBook;

    return {

        getActiveBook: function () {

            return activeBook;

        },
        setActiveBook: function( book ) {

            activeBook = book;

        }

    };

});;