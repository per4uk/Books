UI.TopMenu = function ( params, ui ) {

    params = params || {};
    this.ui = ui;

    //

    this.moduleName = 'TopMenu';

    //

    this.init();

};

UI.TopMenu.prototype = {};
UI.TopMenu.constructor = UI.TopMenu;

UI.TopMenu.prototype.init = function () {

    $('ul.top-menu li[page=books-page]').click( this.showBooksPage.bind( this ) );
    $('ul.top-menu li[page=add-page]').click( this.showAddPage.bind( this ) );
    $('ul.top-menu li[page=edit-page]').click( this.showEditPage.bind( this ) );

};

UI.TopMenu.prototype.showBooksPage = function ( pageFlag ) {

    $('ul.top-menu li.active').removeClass( 'active' );
    $('ul.top-menu li[page=books-page]').addClass( 'active' );

    this.ui.activePage.hide();
    this.ui.activePage = this.ui.modules.booksPage;
    this.ui.modules.booksPage.show( pageFlag );

};

UI.TopMenu.prototype.showAddPage = function () {

    $('ul.top-menu li.active').removeClass( 'active' );
    $('ul.top-menu li[page=add-page]').addClass( 'active' );

    this.ui.activePage.hide();
    this.ui.activePage = this.ui.modules.addPage;
    this.ui.modules.addPage.show();

};

UI.TopMenu.prototype.showEditPage = function () {

    $('ul.top-menu li.active').removeClass( 'active' );
    $('ul.top-menu li[page=edit-page]').addClass( 'active' );

    this.ui.activePage.hide();
    this.ui.activePage = this.ui.modules.editPage;
    this.ui.modules.editPage.show();

};
