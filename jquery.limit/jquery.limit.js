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