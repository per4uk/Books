UI.AddPage = function ( params, ui ) {

    params = params || {};
    this.ui = ui;

    //

    this.moduleName = 'AddPage';

    //

    this.init();

};

UI.AddPage.prototype = {};
UI.AddPage.constructor = UI.AddPage;

UI.AddPage.prototype.init = function () {

    $('div.add-page div.cancel').click(  this.cancel.bind( this ) );
    $('div.add-page div.submit').click( this.submit.bind( this ) );
    this.dropdown = new DropDown( $('div.add-page div.status') );

}

UI.AddPage.prototype.show = function () {

    $('div.add-page').show();

};

UI.AddPage.prototype.hide = function () {

    $('div.add-page').hide();

};

UI.AddPage.prototype.cancel = function () {

    $('div.add-page input.file').val('');
    $('div.add-page input.author').val('');
    $('div.add-page input.title').val('');
    $('div.add-page textarea.description').val('');
    this.dropdown.discard();

};

UI.AddPage.prototype.submit = function () {

    var self = this;
    var newBook = {};
    newBook.file = $('div.add-page input.file')[ 0 ].files[ 0 ];
    newBook.author = $('div.add-page input.author').val();
    newBook.title = $('div.add-page input.title').val();
    newBook.description = $('div.add-page textarea.description').val();
    newBook.status = this.dropdown.getValue();

    core.addNewBook( newBook, function () {

        self.cancel();
        self.ui.modules.topMenu.showBooksPage( 'last' );

    });

};

