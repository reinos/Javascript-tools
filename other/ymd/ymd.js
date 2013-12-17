/**
 * ymd.js
 */
;(function ( $, window, document, undefined ) {

    // Create the defaults once
    var pluginName = 'ymd',
        defaults = {
            startYear: 2012,
            totalYears: 100
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

		//get the time
    	obj.selectedDate = $elem.val();
    	
    	//build the selected
    	obj.buildSelects();
    	
    	$elem.parents('form').submit(function(){
    		var day = $elem.parent().find('.__ymd__daySelect').val();
    		var month = $elem.parent().find('.__ymd__monthSelect').val();
    		var year = $elem.parent().find('.__ymd__yearSelect').val();
    		
			//show elements
			$elem.show();
    		
    		//set the attr to array
    		$elem.attr('name', $elem.attr('name')+'[]');
    		//set the day
    		$elem.val(day);
    		
    		//set the year
    		$elemY = $elem.clone();
    		$elemY.val(year);
    		$elem.after($elemY);
    		
    		//set the month
    		$elemM = $elem.clone();
    		$elemM.val(month);
    		$elem.after($elemM);
    		
    		//remove items
    		$elem.parent().find('.__ymd__daySelect').remove();
    		$elem.parent().find('.__ymd__monthSelect').remove();
    		$elem.parent().find('.__ymd__yearSelect').remove();
    	});
    	
     	
    };
    
    
    //build the selects
    Plugin.prototype.buildSelects = function () {
    	var obj = this,
    		$elem = $(this.element);
    		
    	//set the current Data
    	// -1577923200
    	var currentDate = new Date(obj.selectedDate * 1000);
    	//currentDate.setTime();
    	
    	var currentDay = currentDate.getUTCDate();
    	var currentMonth = currentDate.getUTCMonth() + 1;
    	var currentYear = currentDate.getUTCFullYear();
    	
    	//build the days
    	var daySelect = '<select class="__ymd__daySelect">';
    	daySelect += '<option value="0">Day</option>';
    	for(var i = 1; i <= 31; i++) {
    		daySelect += '<option '+(currentDay == i ? 'SELECTED' : '')+' value="'+i+'">'+i+'</option>';
    	}
    	daySelect += '</select>';
    	
    	//build the months
    	var monthSelect = '<select class="__ymd__monthSelect">';
    	monthSelect += '<option value="0">Month</option>';
    	for(var i = 1; i <= 12; i++) {
    		monthSelect += '<option '+(currentMonth == i ? 'SELECTED' : '')+' value="'+i+'">'+i+'</option>';
    	}
    	monthSelect += '</select>';
    	
    	//build the years
    	var yearSelect = '<select class="__ymd__yearSelect">';
    	yearSelect += '<option value="0">Year</option>';
    	for(var i = (obj.options.startYear - obj.options.totalYears); i <= obj.options.startYear; i++) {
    		yearSelect += '<option '+(currentYear == i ? 'SELECTED' : '')+' value="'+i+'">'+i+'</option>';
    	}
    	yearSelect += '</select>';
     	
     	//$elem.hide();
     	$elem.wrap('<div class="__ymd__"></div>');
     	$elem.parent().append(daySelect+monthSelect+yearSelect);
     	$elem.hide();
     	
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