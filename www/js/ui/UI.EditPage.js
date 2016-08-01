UI.EditPage = function ( params, ui ) {

    params = params || {};
    this.ui = ui;

    //

    this.moduleName = 'EditPage';

    //

    this.init();

};

UI.EditPage.prototype = {};
UI.EditPage.constructor = UI.EditPage;

UI.EditPage.prototype.init = function () {

    this.dropdown = new DropDown( $('div.edit-page div.status') );
    $('div.edit-page div.cancel').click(  this.cancel.bind( this ) );
    $('div.edit-page div.submit').click( this.submit.bind( this ) );
    var book = this.ui.activeBook;

};

UI.EditPage.prototype.show = function () {

    $('div.edit-page').show();

    var book = this.ui.activeBook;
    if ( !book ) return;

    $('div.edit-page input.file').val('');
    $('div.edit-page input.author').val( book.author );
    $('div.edit-page input.title').val( book.title );
    $('div.edit-page textarea.description').val( book.description );
    this.dropdown.setValue( book.status );

};

UI.EditPage.prototype.hide = function () {

    $('div.edit-page').hide();

};

UI.EditPage.prototype.cancel = function () {

    var book = this.ui.activeBook;
    if ( !book ) return;

    $('div.edit-page input.file').val('');
    $('div.edit-page input.author').val( book.author );
    $('div.edit-page input.title').val( book.title );
    $('div.edit-page textarea.description').val( book.description );
    this.dropdown.setValue( book.status );

};

UI.EditPage.prototype.submit = function () {

    var editBook = {};
    var self = this;
    var curBook = this.ui.activeBook;

    if ( !curBook ) return;

    editBook._id = curBook._id;

    if (  $('div.edit-page input.file')[ 0 ].files[ 0 ] ) {

        editBook.file = $('div.edit-page input.file')[ 0 ].files[ 0 ];

    }
    if ( curBook.author != $('div.edit-page input.author').val() ) {

        editBook.author = $('div.edit-page input.author').val();

    }
    if ( curBook.title != $('div.edit-page input.title').val() ) {

        editBook.title = $('div.edit-page input.title').val();

    }
    if ( curBook.description != $('div.edit-page textarea.description').val() ) {

        editBook.description = $('div.edit-page textarea.description').val();

    }
    if ( curBook.status != this.dropdown.getValue() ) {
    
        editBook.status = this.dropdown.getValue();

    }

    core.editBook( editBook, function () {

        self.cancel();
        self.ui.modules.topMenu.showBooksPage( 'current' );

    });

};

