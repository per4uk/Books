UI.BooksPage = function ( params, ui ) {

    params = params || {};
    this.ui = ui;

    this.dateOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };

    //

    this.moduleName = 'BooksPage';

    //

    this.init();

};

UI.BooksPage.prototype = {};
UI.BooksPage.constructor = UI.BooksPage;

UI.BooksPage.prototype.init = function () {   

    this.initArticle()
    this.refresh( 1 );

};

UI.BooksPage.prototype.show = function ( pageFlag ) {

    $('div.books-page').show();
    this.refresh( pageFlag );

};

UI.BooksPage.prototype.hide = function () {

    $('div.books-page').hide();

};

UI.BooksPage.prototype.refresh = function ( pageFlag ) {

    $('div.article').hide();
    var self = this;

    core.refreshBooks( function () {

        if ( core.books.length ) {

            self.createPagination();
            self.createNewTablePage( pageFlag );

            self.updateArticle();
            $('div.article').show();

        }

    });

};

UI.BooksPage.prototype.createNewTablePage = function ( pageFlag ) {

    $('table#booklist tbody').html('');
    var books = core.books;
    var page;

    if ( Number.isInteger( pageFlag ) ) {

        page = pageFlag;

    } else {

        switch ( pageFlag ) {

          case 'last' :

            page = Math.ceil( books.length / 3 );
            break;

          case 'current' :

            page = Math.min( Math.ceil( books.length / 3 ), $('ul.pagination li.active').index() + 1 );
            break;

          default :

            page = 1;

        }

    }

    $('ul.pagination li.active').removeClass( 'active' );
    $( 'ul.pagination li:nth-child(' + page + ')' ).addClass( 'active' );

    var start = 3 * ( page - 1 );
    for ( var i = start; i < Math.min( books.length, start + 3 ); i ++ ) {

        $('table#booklist tbody').append( this.createNewTableRow( books[ i ], i ) );

    }

    if ( this.ui.activeBook && $('table#booklist tbody tr[cid=' + this.ui.activeBook._id + ']').length ) {

        $('table#booklist tbody tr[cid=' + this.ui.activeBook._id + ']').addClass( 'active' );

    } else {

        $('table#booklist tbody tr:first-child').addClass( 'active' );
        this.ui.activeBook = core.findBookById( $('table#booklist tbody tr:first-child').attr( 'cid' ) );
        this.updateArticle();

    }

    this.initTablePage();    

};

UI.BooksPage.prototype.initTablePage = function () {

    var self = this;
    $('table#booklist tbody tr').click( function () {

        $('table#booklist tbody tr.active').removeClass( 'active' );
        $( this ).addClass( 'active' );
        self.ui.activeBook = core.findBookById( $( this ).attr( 'cid' ) );
        self.updateArticle();

    });

    $('table#booklist tr input.onoffswitch-checkbox').change( function () {

        var id = $( this ).parents('tr').attr( 'cid' );
        var book = core.findBookById( id );
        var status = $( this ).is(':checked')
        core.editBook( { _id : id, status : status }, function () {

            book.status = status;

        });

    });

    $('table#booklist tr div.edit-btn').click( function () {

        var id = $( this ).parents('tr').attr( 'cid' );
        var book = core.findBookById( id );
        self.ui.activeBook = book;
        self.ui.modules.topMenu.showEditPage();

    });

    $('table#booklist tr div.delete-btn').click( function () {

        var id = $( this ).parents('tr').attr( 'cid' );
        core.deleteBook( id, function () {

            self.refresh();

        });

    });

 };

UI.BooksPage.prototype.createNewTableRow = function ( book, i ) {

    return  '<tr cid="' + book._id + '">' +
                '<td><div class="number">' + ( i + 1 ) + '</div></td>' +
                '<td><div class="author">' + book.author + '</div></td>' +
                '<td><div class="title">' + book.title + '</div></td>' +
                '<td>' +
                    '<div class="rating" rating="' + book.rating + '">' +
                        '<span class="black">★</span><span ' + ( book.rating >= 2 ? 'class="black"' : '' ) + '>★</span><span ' + ( book.rating >= 3 ? 'class="black"' : '' ) + '>★</span><span ' + ( book.rating >= 4 ? 'class="black"' : '' ) + '>★</span><span ' + ( book.rating >= 5 ? 'class="black"' : '' ) + '>★</span>' +
                    '</div>' +
                '</td>' +
                '<td>' +
                    '<div class="onoffswitch">' +
                        '<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch' + i + '" ' + ( book.status ? 'checked' : '' ) + '>' +
                        '<label class="onoffswitch-label" for="myonoffswitch' + i + '">' +
                            '<div class="onoffswitch-inner"></div>' +
                            '<span class="onoffswitch-switch"></span>' +
                        '</label>' +
                    '</div>' +
                '</td>' +
                '<td>' +
                    '<div class="buttons">' +
                        '<div class="edit-btn">Edit</div>' +
                        '<div class="delete-btn">Delete</div>' +
                    '</div>' +
                '</td>' +
            '</tr>';

};

UI.BooksPage.prototype.createPagination = function () {

    var self = this;
    var pagCount = Math.ceil( core.books.length / 3 );
    $('div.books-page ul.pagination').html('<li value="1" class="active">1</li>');
    for ( var i = 2; i <= pagCount; i ++ ) {

        $('div.books-page ul.pagination').append( '<li value="' + i + '">'+ i + '</li>' );

    }

    $('div.books-page ul.pagination li').click( function () {

        self.createNewTablePage( +$( this ).attr( 'value' ) );

        $(' div.books-pag eul.pagination li.active').removeClass( 'active' );
        $( this ).addClass( 'active' );

    });

};

UI.BooksPage.prototype.updateArticle = function () {

    var book = this.ui.activeBook;

    $('div.article h1.book-title').text( book.author + ' - ' + book.title );
    $('div.article input[type=radio][value=' + book.rating + '][name=rating]').prop( 'checked', true );
    $('div.article p.date').text( new Date( book.date ).toLocaleString( "en-GB", this.dateOptions ) );
    $('div.article p.description').text( book.description );
    $('div.article div.download a').attr( 'href', book.file );

};

UI.BooksPage.prototype.initArticle = function () {

    var self = this;
    $('div.article input[type=radio][name=rating]').change( function () {

        var book = self.ui.activeBook;
        var newRating = this.value;
        core.editBook( { _id : book._id, rating : newRating }, function () {

            book.rating = newRating;
            $('table#booklist tbody tr[cid=' + book._id + '] div.rating' ).prop( 'rating', newRating );
            $('table#booklist tbody tr[cid=' + book._id + '] div.rating' ).html( '<span class="black">★</span><span ' + ( book.rating >= 2 ? 'class="black"' : '' ) + '>★</span><span ' + ( book.rating >= 3 ? 'class="black"' : '' ) + '>★</span><span ' + ( book.rating >= 4 ? 'class="black"' : '' ) + '>★</span><span ' + ( book.rating >= 5 ? 'class="black"' : '' ) + '>★</span>' );

        });

    });


};



