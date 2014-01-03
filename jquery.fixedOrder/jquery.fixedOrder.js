/*!
 * Sort html elements on a given attr
 * Original author: @reinos
 * 
 * $('.row').sorter({
 * 		checkOn : 'h3',
 * 		wrapper : 'li'
 * });
 * 
 */
;(function ( $, window, document, undefined ) {

    // Create the defaults once
    var pluginName = 'fixedSorter',
        defaults = {
            checkOn : "",
            wrapper : "",
            order : []
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

	//Init the plugin
    Plugin.prototype.init = function () {
        var $elem = $(this.element),
        	obj = this;
        	
        //add wrapper element
        $elem.prepend('<div class="__sorter__"></div>');
        
        //hide other elements
        $elem.find(obj.options.wrapper).hide();
        
        //run the sorter
        obj.doSort();
    };
    
    //Sort the values
    Plugin.prototype.doSort = function () {
    	var $elem = $(this.element),
        	obj = this;
        	
        var temp = [];
        
        //loop over the values and replace them
        $.each(obj.options.order, function(key, val){
        	
        	//loop over the elements and check if we got an result?
        	$elem.find(obj.options.wrapper).each(function(){
        		var text = $(this).find(obj.options.checkOn).text().replace(/ +(?= )/g,'').toLowerCase();
        		if(text.indexOf(val) >= 0) {
        			$elem.find('.__sorter__').append($(this).detach());
        		}        		
        	});
        	
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