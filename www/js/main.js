var books;
/*var dateOptions = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
};*/

$( document ).ready( function () {

    /*$('ul.top-menu li').click( function () {

        var curPage = $('ul.top-menu li.active').attr( 'page' );
        var nextPage = $( this ).attr( 'page' );

        $( 'div.' + curPage ).hide();
        $( 'div.' + nextPage ).show();

        $('ul.top-menu li.active').removeClass( 'active' );
        $( this ).addClass( 'active' );

    });*/



/*    $.get( '/books', function ( data ) {

        books = data.books;console.log( data );

        if ( books.length ) {

            createNewTablePage( 1 );
            createPagination();

            updateArticle();
            $('div.article').show();

        }

    });*/

    /*function DropDown(el) {
        this.dd = el;
        this.placeholder = this.dd.children('span.text');
        this.opts = this.dd.find('ul.dropdown > li');
        this.val = '';
        this.index = -1;
        this.initEvents();
    }
    DropDown.prototype = {

        initEvents : function() {

            var obj = this;

            obj.dd.on('click', function(event){

                $(this).toggleClass('active');
                return false;

            });

            obj.opts.on('click',function(){
                var opt = $(this);
                obj.val = opt.text();
                obj.index = opt.index();
                obj.placeholder.text(obj.val);
            });

            $(document).click(function() {
                obj.dd.removeClass('active');
            });
        },
        getValue : function() {
            return this.val == 'ON';
        },
        getIndex : function() {
            return this.value;
        },

        discard : function() {
            this.val = '';
            this.index = -1;
            this.placeholder.text('status');
        }
    }
    var dd1 = new DropDown( $('div.add-page div.status') );

    $('div.add-page div.cancel').click( function () {

        $('div.add-page input.file').val('');
        $('div.add-page input.author').val('');
        $('div.add-page input.title').val('');
        $('div.add-page textarea.description').val('');
        dd1.discard();

    });

    $('div.add-page div.submit').click( function () {

        var data = new FormData();
        data.append( 'file', $('div.add-page input.file')[ 0 ].files[ 0 ] );
        data.append( 'author', $('div.add-page input.author').val() );
        data.append( 'title', $('div.add-page input.title').val() );
        data.append( 'description', $('div.add-page textarea.description').val() );
        data.append( 'status', dd1.getValue() );

        $.ajax({
            url: '/addbook', 
            type: 'POST',
            contentType: false, 
            data: data, 
            processData: false,  
            cache: false
        }).done( function () {

            $('div.add-page div.cancel').click();
            $('ul.top-menu li[page=books-page]').click();
            //refreshTable();

        });

    });
*/
});

/*var createNewRow = function ( book, i ) {

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

};*/

/*var createNewTablePage = function ( page ) {

    $('table#booklist tbody').html('');

    var start = 3 * ( page - 1 );
    for ( var i = start; i < Math.min( books.length, start + 3 ); i ++ ) {

        $('table#booklist tbody').append( createNewRow( books[ i ], i ) );

    }

    $('table#booklist tbody tr:first-child').addClass( 'active' );

    $('table#booklist tbody tr').click( function () {

        $('table#booklist tbody tr.active').removeClass( 'active' );
        $( this ).addClass( 'active' );
        updateArticle();

    });

    $('table#booklist tr div.edit-btn').click( function () {

        var id = $( this ).parent('tr').attr( 'cid' );

    });

    $('table#booklist tr div.delete-btn').click( function () {

        $.post( "/deletebook", { id: $( this ).parents('tr').attr( 'cid' ) }, function () {

            //refreshTable();

        });

    });

};*/

/*var createPagination = function () {

    var pagCount = Math.ceil( books.length / 3 );
    for ( var i = 2; i <= pagCount; i ++ ) {

        $('ul.pagination').append( '<li value="' + i + '">'+ i + '</li>' );

    }

    $('ul.pagination li').click( function () {

        createNewTablePage( +$( this ).attr( 'value' ) );

        $('ul.pagination li.active').removeClass( 'active' );
        $( this ).addClass( 'active' );

    });

};
*/
/*var updateArticle = function () {

    var activeBook = books.find( function ( e ) {

        if ( e._id === $('table#booklist tr.active').attr('cid') ) return true;
        return false; 

    });

    $('div.article h1.book-title').text( activeBook.author + ' - ' + activeBook.title );
    $('div.article p.date').text( new Date( activeBook.date ).toLocaleString( "en-GB", dateOptions ) );
    $('div.article p.description').text( activeBook.description );
    $('div.article div.download a').attr( 'href', activeBook.file );

};*/
