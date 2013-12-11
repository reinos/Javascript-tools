/**
 * jQuery.extLink - Allows to add target="_blank" to external or file links
 * Written by Muhammad Bilal Awan(bilal AT uipress DOT com)
 * Date: 2011/11/17
 *
 * @author Muhammad Bilal Awan
 * @version 1.0
 *
 * 
 * How to Use:
 * ***********
 * ***********
 * 
 * Method 1: 
 * Without passing any extensions string
 * **************************************
 * Examples:
 * $("a").extLink();
 * $("#content a").extLink();
 * $(".leftpane a,.partners a").extLink();
 *  
 * Behavior:
 * It will find all the anchors based on the selector string provided that does not have the same domain as of the current page
 * and will attach target="_blank" attribute to them. 
 * 
 * ****************************************************************************************************************************
 * ****************************************************************************************************************************
 * 
 * Method 2:
 * When passed with extensions string
 * **********************************
 * Examples:
 * $("a").extLink({fileTypes:".doc,.pdf"});
 * 
 * Behavior:
 * Rest of the functionality will be similar as the Method 1 but it will attach target="_blank" to the links ending with the files
 * extension provided by the fileTypes options parameter.
 * 
 * *******************************************************************************************************************************
 * *******************************************************************************************************************************
 * 
 **/

(function($){

	$.fn.extLink = function(options){
	    
	    var defaults = {fileTypes:""};
	    var opts = $.extend(defaults,options);
	    var typesArray = opts.fileTypes.split(',');
	    var extValid = new RegExp('/'+window.location.host+'/');
	        
	    return this.each(function(){

	    	if(!extValid.test(this.href)) {
	    		this.target="_blank";
	    	}
	    	else {
		    	if(typesArray[0]!=="") {
		    		for(var i=0;i<typesArray.length;i=i+1) {
		    			if(this.href.indexOf(typesArray[i])>-1) {
		    				this.target="_blank";
		    			}
		    		}
		    	}
	    	}
	    		
	    });
	};

})(jQuery);