angular.module( 'booksApp', [ 'ui.router', 'ngResource', 'booksApp.controllers', 'booksApp.services' ] );

angular.module( 'booksApp' ).config( function ( $stateProvider, $httpProvider ) {

    $stateProvider.state( 'books-page', {
        url: '/books-page',
        params: { pageFlag: 'current' },
        templateUrl: 'partials/books-page.html',
        controller: 'BooksPageCtrl'
    }).state( 'add-page', {
       url: '/add-page',
       templateUrl: 'partials/add-page.html',
       controller: 'AddPageCtrl'
    }).state( 'edit-page', {
        url: '/edit-page',
        templateUrl: 'partials/edit-page.html',
        controller: 'EditPageCtrl'
    });

}).run( function( $state ) {

    $state.go( 'books-page', { pageFlag: '1' } );

});
