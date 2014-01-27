/*!
 * Sticky footer
 * Original author: @reinos_
 * Licensed under the MIT license
 */

;(function ( $, window, document, undefined ) {
    // Create the defaults once
    var pluginName = 'stickyFooter',
        defaults = {
            animate: false,
            animateTime : 200,
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
               .scroll(obj.positionFooter)
               .resize(obj.positionFooter);
    };
	
	// set the position
    Plugin.prototype.positionFooter = function () {           
	     var obj = this,
	     	$elem = $(this.element); 
         
        //get the values  
        obj.footerHeight = $elem.height();
        obj.footerTop = ($(window).scrollTop()+$(window).height()-obj.footerHeight)+"px";
 	
 		// is there a negativ marign?
 		if(obj.options.removeNegativMargin && $elem.css('margin-top')[0] == '-') {
 			$elem.css('margin-top', 0);	
 		}
	 	
 		//what do we need to do?
		if ( ($(document.body).height()+obj.footerHeight) < $(window).height()) {
			
			//do we need to animate
			if(obj.options.animate) {
				//css
				var css = $.extend( {}, {
					position: "absolute"
				}, obj.options.css);
			
				//set the styles
				$elem.css(css).animate({
					top: obj.footerTop
				}, obj.options.animateTime);
				
			//no animation
			} else {
				//css
				var css = $.extend( {}, {
					position: "absolute",
					top: obj.footerTop
				}, obj.options.css);
				
				//set the styles
				$elem.css(css);
			}
			
		} else {
			//css
			var css = $.extend( {}, {
				position: "static"
			}, obj.options.css);
				
			//set the styles
			$elem.css(css);
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