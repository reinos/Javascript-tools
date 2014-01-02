/*!
 * Search inside html elements
 * Original author: @reinos
 */
;(function ( $, window, document, undefined ) {

    // Create the defaults once
    var pluginName = 'searchItem',
        defaults = {
            input: '',
            searchOn : '',
            wrapper : ''
        };

    // The actual plugin constructor
    function Plugin( element, options ) {
        this.element = element;

        // the default options for future instances of the plugin
        this.options = $.extend( {}, defaults, options) ;

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype.init = function () {
        var obj = this,
            $elem = $(this.element);

        var timer = null;

        //add type event
        $(obj.options.input).keyup(function(){
            //kill the time
            clearTimeout(timer);

            var value = $(this).val();

           //set timer and then search
           timer = setTimeout(function(){
                obj.searchItem(value);
           }, 300);
           
        });
    };

    //search
    Plugin.prototype.searchItem = function (val) {
         var obj = this,
            $elem = $(this.element);

        //look inside the element
        $elem.find(obj.options.searchOn).each(function(){
            var text = $(this).text().replace(/ +(?= )/g,'').toLowerCase();
          
            if(text.indexOf(val) >= 0) {
               $(this).parents(obj.options.wrapper).hide().show();
            } else {
               $(this).parents(obj.options.wrapper).hide().hide();
            }
        });
    }

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                new Plugin( this, options ));
            }
        });
    }

})( jQuery, window, document );