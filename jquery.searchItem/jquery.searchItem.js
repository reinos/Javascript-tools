/*!
 * Search inside html elements
 * Original author: @reinos
 */
;(function ( $, window, document, undefined ) {

    // Create the defaults once
    var pluginName = 'searchItem',
        defaults = {
            input: '',
            searchOn : [],
            wrapper : '',
            reset : ''
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
        
        //add reset button
        //$(obj.options.reset).click();
    };

    //search
    Plugin.prototype.searchItem = function (val) {
        var obj = this,
            $elem = $(this.element);
            
        var found = [];

        //look inside the element
        $.each(obj.options.searchOn, function(k, value){
            $elem.find(value).each(function(){
                var text = $(this).text().replace(/ +(?= )/g,'').toLowerCase();
                
                //check
                if(text.indexOf(val) >= 0) {
                   found.push($(this).parents(obj.options.wrapper));
                } 
            });
        });
        
        //hide first all items
        $(obj.options.wrapper).hide();
        
        //show the result
        $.each(found, function(k,v){
            v.show();
        });
        
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
     };

})( jQuery, window, document );