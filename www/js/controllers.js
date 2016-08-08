angular.module( 'booksApp.controllers', [] ).controller( 'BooksPageCtrl', function ( $scope, $state, $stateParams, Book, sharedParams ) {

    $scope.books = Book.query( function () {

        if ( sharedParams.getActiveBook() ) {

            $scope.activeBook = sharedParams.getActiveBook();

        } else {

            $scope.activeBook = $scope.books[0];
            sharedParams.setActiveBook( $scope.activeBook );

        }

        $scope.setPage( $stateParams.pageFlag );

    });
    $scope.itemsPerPage = 3;

    $scope.setPage = function ( pageFlag ) {
        
        if ( pageFlag && Number.isInteger( +pageFlag ) ) {

            $scope.currentPage = pageFlag;

        } else {

            switch ( pageFlag ) {

              case 'last' :

                $scope.currentPage = Math.floor( ( $scope.books.length - 1 ) / $scope.itemsPerPage + 1 );
                break;

              case 'current' :

                var activeBookPage = Math.max( Math.floor( $scope.books.findIndex( function ( book ) { return $scope.activeBook._id == book._id } ) / $scope.itemsPerPage + 1  ) );
                $scope.currentPage = Math.min( $scope.currentPage || activeBookPage || 1, Math.floor( ( $scope.books.length - 1 ) / $scope.itemsPerPage + 1 ) );
                break;

              default :

                $scope.currentPage = 1;

            }

        }

        $scope.activeBook = $scope.books[ ( $scope.currentPage - 1 ) * $scope.itemsPerPage ];
        sharedParams.setActiveBook( $scope.activeBook );

    };

    $scope.setActiveBook = function () {
        
        $scope.activeBook = this.book;
        sharedParams.setActiveBook( $scope.activeBook );

    };

    $scope.updateBook = function ( value ) {

        var bookData = {};
        curBook = this.book || $scope.activeBook;
        bookData[ value ] = curBook[ value ];
        Book.update( { book_id: curBook._id }, bookData );

    };

    $scope.goToEditPage = function () {

        $scope.setActiveBook.call( this );
        $state.go( 'edit-page' );

    };

    $scope.deleteBook = function () {

        Book.delete( { book_id: this.book._id } );
        $scope.books = Book.query( function () {

            $scope.setPage( 'current' );

        });

    };

}).controller( 'AddPageCtrl', function ( $scope, $state, $stateParams, Book ) {

    $scope.dd = {};
    $scope.reset = function () {

        $scope.bookForm = {};
        $scope.dd.toggle = false;
        $scope.dd.val = 'status';
        angular.element( document.querySelector('div.add-page input.file')).val( '' );

    };
    $scope.reset();

    $scope.addBook = function () {

        var newBook = new Book( $scope.bookForm );
        newBook.status = $scope.dd.val == 'ON';
        newBook.file = angular.element( document.querySelector('div.add-page input.file') )[ 0 ].files[ 0 ];
        newBook.$save( function () {

            $state.go( 'books-page', { pageFlag: 'last' } );

        });

    };

}).controller( 'EditPageCtrl', function ( $scope, $state, $stateParams, Book, sharedParams ) {

    $scope.dd = {};
    var activeBook =  Book.get({ book_id: sharedParams.getActiveBook()._id  }, function () {

        $scope.reset();

    });

    $scope.reset = function () {

        $scope.editBook = { author: activeBook.author, title: activeBook.title, description: activeBook.description };
        $scope.dd.toggle = false;
        $scope.dd.val = activeBook.status ? 'ON' : 'OFF';

    };

    $scope.updateBook = function () {

        var bookData = {};
        if (  angular.element( document.querySelector('div.edit-page input.file') )[ 0 ].files[ 0 ] ) {

            bookData.file = angular.element( document.querySelector('div.edit-page input.file') )[ 0 ].files[ 0 ];

        }
        if ( activeBook.author != $scope.editBook.author ) {

            bookData.author = $scope.editBook.author;

        }
        if ( activeBook.title != $scope.editBook.title ) {

            bookData.title = $scope.editBook.title;

        }
        if ( activeBook.description != $scope.editBook.description ) {

            bookData.description = $scope.editBook.description;

        }
        if ( activeBook.status != ( $scope.dd.val == 'ON' ) ) {
        
            bookData.status = ( $scope.dd.val == 'ON' );

        }

        Book.update( { book_id: activeBook._id }, bookData, function () {

            $state.go( 'books-page', { pageFlag: 'current' } );

        });

    };

});