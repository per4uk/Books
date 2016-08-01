var UI = function ( params ) {

    var activeBook, activePage;

    this.modules = {};

};

UI.prototype = {};
UI.constructor = UI;

UI.prototype.init = function () {

    this.modules.booksPage = new UI.BooksPage( null, this );
    this.modules.addPage = new UI.AddPage( null, this );
    this.modules.editPage = new UI.EditPage( null, this );
    this.modules.topMenu = new UI.TopMenu( null, this );

    this.activePage = this.modules.booksPage;

};



