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