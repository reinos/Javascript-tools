/*!
 * Sticky footer
 * Original author: @reinos_
 * Licensed under the MIT license
 */

;(function ( $, window, document, undefined ) {
    // Create the defaults once
    var pluginName = 'stickyFooter',
        defaults = {
            removeNegativMargin : true,
            css : {}
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
    
    //do some default shizzle
    Plugin.prototype.init = function () {     
    	var obj = this,
	     	$elem = $(this.element); 
	     	 
	 	this.footerHeight = 0;
		this.footerTop = 0;
		
		obj.positionFooter();
		
    	$(window)
               .scroll(function(){obj.positionFooter();})
               .resize(function(){obj.positionFooter();});
    };
	
	// set the position
    Plugin.prototype.positionFooter = function () {           
	     var obj = this,
	     	$elem = $(this.element); 
         
         obj.footerHeight = $elem.height();
       
		// is there a negativ marign?
		if(obj.options.removeNegativMargin && $elem.css('margin-top')[0] == '-') {
			$elem.css('margin-top', 0);	
		}
       
		if ( ($(document.body).height()+(obj.footerHeight)) < $(window).height()) {
			//css
			var css = $.extend( {}, {
				position: "fixed",
				bottom: 0,
				left:0,
				right:0
			}, obj.options.css);
			
			//must stick to bottom
			$elem.css(css);
		} else {
			$elem.attr("style", "");
		}
	};

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                new Plugin( this, options ));
            };
        });
    };

})( jQuery, window, document );