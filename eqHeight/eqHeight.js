;(function ( $, window, document, undefined ) {

    // Create the defaults once
    var pluginName = 'eqHeight',
        defaults = {
            refresh : false,
            column_selector : ''
        };

    // The actual plugin constructor
    function Plugin( element, options ) {
        this.element = element;

        //if the options var is a string, just put this as the column_selector
        if(typeof(options) === 'string') {
            options.column_selector = options;
        }

        // the default options for future instances of the plugin
        this.options = $.extend( {}, defaults, options) ;

        //set some defaults
        this._defaults = defaults;
        this._name = pluginName;

        //init the plugin
        this.init();
    }

    //init the plugin
    Plugin.prototype.init = function () {
        var $elem = $(this.element),
            obj = this;

        //get the elements
        obj.columns = $elem.find(obj.options.column_selector);

        //nothing found, we get the first set of children
        if (obj.columns.length === 0) {
          obj.columns = $elem.children(obj.options.column_selector);
        }

        //still no luck, return
        if (obj.columns.length === 0) {
          return;
        }

        //start ewualizing
        obj.equalizer(); 

        //start after 100ms, so we are sure everything is loaded 
        setTimeout(function(){
            obj.equalizer();    
        }, 100);

        //responsive... do it with the resize
        $(window).resize(function(){
            obj.equalizer();
        });
    };

     Plugin.prototype.equalizer = function () {
        var $elem = $(this.element),
            obj = this;

        //set the height to auto
        obj.columns.height("auto");

        //get the first height
        var row_top_value = obj.columns.first().position().top;

        //loop over all the elements
        obj.columns.each(function() {
            //set the var for the height
            var current_top;

            //get  the current top
            current_top = $(this).position().top;
            
            //do we have the set the height?
            if (current_top !== row_top_value) {
                obj.equalize_marked_columns();
                row_top_value = $(this).position().top;
            }
            return $(this).addClass("eqHeight_row");
        });
        return obj.equalize_marked_columns();
    };

    Plugin.prototype.equalize_marked_columns = function () {
        var $elem = $(this.element),
            obj = this;

        //set vars
        var marked_columns, max_col_height;

        //get the markerd element
        marked_columns = $(".eqHeight_row");

        //default height
        max_col_height = 0;
       
        //loop over the marked columns
        marked_columns.each(function() {
            //return the value
            return max_col_height = Math.max($(this).height(), max_col_height);
        });

        //set the height
        marked_columns.height(max_col_height);

        //remove the class markerd indicator
        return $(".eqHeight_row").removeClass("eqHeight_row");
    };

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