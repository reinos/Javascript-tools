//new array function to shuffle an array
Array.prototype.shuffle = function (){ 
        for(var rnd, tmp, i=this.length; i; rnd=parseInt(Math.random()*i), tmp=this[--i], this[i]=this[rnd], this[rnd]=tmp);
};


//dom is ready
(function($){
	$.fn.carrousel = function(options){
		//options
		var settings = {
			fadeTime       	: 1000,
			interval		: 5000
		};
			
		//maintain chaining
		return this.each(function(){
			
			//settings
			var $item = $(this);
			var $object = $(this);
			
			//extend the user options
			if ( options ) { 
			    $.extend( settings, options );
			}

			//get the itesm
			var items = $item.find('img').get();
			items.shuffle();
			$item.html(items);
			
			//style aanpassen van de image
			$item.find('img').css({left:0,position:'absolute'});
			//alle items, behalve de eerste hiden
			$item.find('img:gt(0)').hide();
			$item.find('img:eq(0)').show();			
			
			//interval zetten
			setInterval(function(){	
		       //eerste item uitfaden
				$item.find('img:first').fadeOut(settings.fadeTime)
					//volgens item zichtbaar maken	
					.next('img').show()
				//context op de eerste item zetten
				.end()
				//item achteraan zetten.
				.appendTo($item);
			}, settings.interval);
		});
	};
		
	
	
})(jQuery);


//dom is ready
$(function() {
	$('#carrousel').carrousel({
		fadeTime       	: 1000,
		interval		: 5000	
	});
});