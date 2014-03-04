//----------------------------------------------
// monitor dom changes
//----------------------------------------------
jQuery.fn.watchInserts = function(fn) {
	var obj = this;
	document.watchInserts = setInterval(function(){
		if($(obj.selector)) {
			clearInterval(document.watchInserts);
			fn.call($(obj.selector));
		}
	}, 100);
};