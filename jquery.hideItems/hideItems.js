(function($){
	$.fn.hideItems = function(options){
		//settings
		var $obj = $(this);
		var settings = {
		    moreClass       : "meer",
		    visible		 	: 2,
		    autoClose		:true
		};
			
		return this.each(function(){
			//itme
			$item = $(this);
			
			//extend the user options
			if ( options ) { 
			    $.extend( settings, options );
			}
			
			//aantal accordions
			//var $ul = $('.accordion');

			//hide alle elementen die moeten sliden
			//$.each($ul, function(key, val){
			$item.find('li').slice(settings.visible).hide();
			//});

			//wanneer er geklikt is slide animatie toepassen
			$item.next().click(function(){
				if($(this).hasClass(settings.moreClass)) {
					//auto close other items
					if(settings.autoClose) {
						var $ul = $($obj.selector);
						$.each($ul, function(key, val){
							$(this).find('li').slice(settings.visible).slideUp();
						});
					}
					//slide open
					$(this).prev().find('li').slice(settings.visible).stop(true, true).slideToggle();
					$(this).addClass('active');
				}
				
			});
		});
	}
})(jQuery)


//dom ready
$(function(){	
	$('.accordion').hideItems({
		moreClass       : "meer",
	    visible		 	: 2,
	    autoClose		:true
	});
});