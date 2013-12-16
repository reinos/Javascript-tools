$(function(){
	$('.ledenfilter-wrapper').ledenFilter();
});

;(function ( $, window, document, undefined ) {

    // Create the defaults once
    var pluginName = 'ledenFilter',
        defaults = {
            baseUrl: "/ledenfilter",
            activeTabClass : "active",
            ajaxUrl : "/ajaxfilter",
            tabClass : ".member-tab-nav",
            loader: "/assets/images/ajax-loader.gif",
            resultDiv: "#resultaat",
            innerResultDiv: '.inner-result',
            loggedInClass : '.is_logged',
            loggedIn : false,
            restrict : true,
            searchDiv : "#search"
        };

    // The actual plugin constructor
    function Plugin( element, options ) {
        this.element = element;

        // jQuery has an extend method that merges the
        // contents of two or more objects, storing the
        // result in the first object. The first object
        // is generally empty because we don't want to alter
        // the default options for future instances of the plugin
        this.options = $.extend( {}, defaults, options) ;

        this._defaults = defaults;
        this._name = pluginName;
        
        //set the full ajax url
        this.ajaxUrl = this.options.baseUrl+''+this.options.ajaxUrl;

        this.init();
    }

	//init
    Plugin.prototype.init = function () {
    	//default vars
    	var $elem = $(this.element),
    		obj = this;
    	
    	//set the first one as active
        $elem.find(obj.options.tabClass + ' ul li:first').addClass(obj.options.activeTabClass);
        
        //set the onclick events
        this.addTabClick();
        
        //add search
        this.addSearch();
        
        //check if the user is logged_in
        if($(obj.options.loggedInClass).length) {
        	obj.options.loggedIn = true;
        }
        
        //get the first selection "a"
        this.get('overview', 'a');
		
    };
    
    //Get a selection based on the char
    Plugin.prototype.get = function (type, search_char, id) {
    	//default vars
    	var $elem = $(this.element),
    		obj = this;
    	
    	var type = type || 'overview';
    	var search_char = search_char || '';
    	var id = id || '';
    	
    	//nothing for overview?
    	if(type == 'overview' && search_char == '') {
    		return;
    	}
    	
    	//nothing for detail?
    	if(type == 'detail' && search_char == '' && id == '') {
    		return;
    	}
    	
    	//nothing for search?
    	if(type == 'search' && search_char == '') {
    		return;
    	}
    	
    	//set the url
    	if(type == 'overview') {
    		var url = obj.ajaxUrl+"/"+search_char;
    	
    	//detail
    	} else if(type == 'detail') {
    		var url = obj.ajaxUrl+"/"+search_char+"/"+id;
    		
    	//search	
    	} else {
    		var url = obj.ajaxUrl+"/search/"+search_char;
    	}

    	//place placeholder
    	$(obj.options.resultDiv).html("<center><img src='"+obj.options.loader+"'></center>");
    	
    	//get the data
    	//the timeout, so we can see the loader :-)
        setTimeout(function(){
        	$.get(url, function(html){
				$(obj.options.resultDiv).html(html);
				$(obj.options.resultDiv).hide(); // voor de fadeIn
				$(obj.options.resultDiv).attr('rel','a');
				$(obj.options.resultDiv).fadeIn(300);
				
				//verwijder cursor:pointer wanneer je niet ingelogd bent.
				if(obj.options.loggedIn == false && obj.options.restrict == true) {
					$(obj.options.resultDiv + ' li a').css('cursor', 'default');	
				}
				
				//set the detail click
				if((obj.options.loggedIn == true && obj.options.restrict == true) || (obj.options.restrict == false)) {
					obj.addDetailClick();
				}
			});
        }, 500);
    };

	//add a onclick on the tabs
    Plugin.prototype.addTabClick = function () {
    	//default vars
    	var $elem = $(this.element),
    		obj = this;
    		
    	//set the click
    	$(document).on('click', obj.options.tabClass + ' ul li:not(.'+obj.options.activeTabClass+')', function(e){
			e.preventDefault();
			
			//remove active state
			$(obj.options.tabClass + ' ul li').removeClass(obj.options.activeTabClass);
			$(this).addClass(obj.options.activeTabClass);
			
			//get the selection
			obj.get('overview', $(this).data('char'));
			
			return false;
		});
    };
    
    //add a onclick on the tabs
    Plugin.prototype.addDetailClick = function () {
    	//default vars
    	var $elem = $(this.element),
    		obj = this;
    	
    	$(document).on('click', obj.options.resultDiv + ' li a', function(){
    	
	    	var id = $(this).children("input").attr("name");
			var search_char = $(obj.options.tabClass + ' ul li.active').data('char');
			
			//get the detail
			obj.get('detail', search_char, id);
			
			//add the click events for back
			$(document).on('click','.member-detail-footer a', function(e){	
				e.preventDefault();
				
				//get back to the overview	
				obj.get('overview', search_char);
			});
			
		});
    };
    
    //add a onclick on the tabs
    Plugin.prototype.addSearch = function () {
    	//default vars
    	var $elem = $(this.element),
    		obj = this;
    	
    	//create new click event	
    	$(obj.options.searchDiv).click(function(){
			//hold an inter number to avoid double clicks.
			var temp = 0;
			
			//keypres
			$(document).keypress(function(e) {
				if(e.which == 13 && temp == 0) {
					temp = 1;
	
					//search for this value
					obj.get('search', $("#search").val());
					
					//reset
					temp = 0;
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

;(function ( $, window, document, undefined ) {
	jQuery.fn.limit = function(max){
	   var i=0;
	   this.each(function(){
			i++;
			if (i > max){
				$(this).hide();
			}
	   });
	};
})( jQuery, window, document );
//----------------------------------------------
// monitor dom changes
//----------------------------------------------
;(function ( $, window, document, undefined ) {
	jQuery.fn.watch = function( id, fn ) {
	    return this.each(function(){
	        var self = this;
	        var oldVal = $(self).attr(id);
	        $(self).data(
	            'watch_timer',
	            setInterval(function(){
	                if ($(self).attr(id) !== oldVal) {
	                    fn.call(self, id, oldVal, $(self).attr(id));
	                    oldVal = $(self).attr(id);
	                }
	            }, 1000)
	        );
	    });
	    return self;
	};

	jQuery.fn.unwatch = function( id ) {
    return this.each(function(){
        clearInterval( $(this).data('watch_timer') );
    });
};
})( jQuery, window, document );