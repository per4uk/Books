function DropDown ( el ) {

    this.dd = el;
    this.placeholder = this.dd.children('span.text');
    this.opts = this.dd.find('ul.dropdown > li');
    this.val = '';
    this.index = -1;
    this.initEvents();

};

DropDown.prototype = {

    initEvents : function () {

        var obj = this;

        obj.dd.on( 'click', function ( event ) {

            $( this ).toggleClass('active');
            return false;

        });

        obj.opts.on( 'click', function () {

            var opt = $( this );
            obj.val = opt.text();
            obj.index = opt.index();
            obj.placeholder.text( obj.val );

        });

        $( document ).click( function () {

            obj.dd.removeClass('active');

        });

    },

    getValue : function () {

        return this.val == 'ON';

    },

    setValue : function ( status ) {

        var opt = this.dd.find( 'li:eq(' + +!status + ')' )
        this.val = opt.text();
        this.index = opt.index();
        this.placeholder.text( this.val );

    },

    getIndex : function () {

        return this.value;

    },

    discard : function () {

        this.val = '';
        this.index = -1;
        this.placeholder.text('status');

    }

};