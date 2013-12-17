;(function ( $, window, document, undefined ) {

    // Create the defaults once
    var pluginName = 'yearSorter',
        defaults = {
        	jsonUrl : null,
        	jsonData : null,
            onReady : function(){}
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
	
	//init
    Plugin.prototype.init = function () {
       var obj = this,
       		$elem = $(this.element);
       
       //if the url is set, fetch this data.
       //on fail, check the json option
       if(obj.options.jsonUrl != null) {
       		$.get(obj.options.jsonUrl, function(json){
       			obj.json = json;
       			
       			//parse data
       			obj.parse();
       		});
       } else {
       		obj.json = obj.options.json;
       		
       		//parse data
   			obj.parse();
       }
       
    };
    
    //parse the data
    Plugin.prototype.parse = function () {
       var obj = this,
       		$elem = $(this.element);
       	
       	var formatedJson = {},
       		html = '';
       	
       	//parse json data	
		json = $.parseJSON(obj.json);
		
		//reformat data
		if(json !== null) {
			$.each(json, function(k,v){
				//not empty?
				if(v.month != '') {
					
					//create array if needed
					if(typeof(formatedJson['0'+v.month]) == 'undefined') {
						formatedJson['0'+v.month] = {};
						
					}
					if(typeof(formatedJson['0'+v.month]['0'+v.month+''+v.day]) == 'undefined') {
						formatedJson['0'+v.month]['0'+v.month+''+v.day] = [];	
						formatedJson['0'+v.month]['monthName'] = v.monthName;
					}
					
					//push data					
					formatedJson['0'+v.month]['0'+v.month+''+v.day].push(v);
				}
			});
			
			formatedJson = obj.sortObj(formatedJson);
			
			
			
			//set the data
			$.each(formatedJson, function(key,val){
				//sort
				var elements = obj.sortObj(val);
				
				var lis = [];
				$.each(elements, function(k, v){
					if(k != 'monthName') {
						lis.push(obj.newDays(v));
					}
				});
				
				//build html
				html += obj.newMonth(elements.monthName, lis.join(''));
			});
		}
		
		//place html
		$elem.html('<ul style="display:none" class="birthdays" id="birthdays">'+html+'</ul>');
		
		//callback
		$('#birthdays').fadeIn(function(){
			obj.options.onReady($elem);
		});
				
    };
    
    //order an object
    Plugin.prototype.newMonth = function (month, elements) {
    	elements = elements || '';
    	return '<li class="month"><h2>'+month+'</h2><ul>'+elements+'</ul></li>';
    };
    
    //order an object
    Plugin.prototype.newDays = function (elem) {  	
    	elem.url = elem[0].url || 'javascript:;';
    	elem.day = elem[0].day || '';
    	elem.month = elem[0].month || '';
    	elem.year = elem[0].year || '';
    	elem.name = elem[0].name || '';
    	
    	return '<li><a href="'+elem.url+'"><i class="fa fa-gift pink"></i><span class="date">'+elem.day+'-'+elem.month+' ('+elem.year+')</span> '+elem.name+'</a></li>';
    };
    
    //order an object
    Plugin.prototype.sortObj = function (arr) {
    	
    	// Setup Arrays
		var sortedKeys = new Array();
		var sortedObj = {};
	
		// Separate keys and sort them
		for (var i in arr){
			sortedKeys.push(i);
		}

		sortedKeys.sort();
	
		// Reconstruct sorted obj based on keys
		for (var i in sortedKeys){
			sortedObj[sortedKeys[i]] = arr[sortedKeys[i]];
		}
		return sortedObj;
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