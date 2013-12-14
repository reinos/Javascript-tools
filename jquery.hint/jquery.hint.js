/**
 * trim function
 * 
 * @param value
 * @return
 */
function trim(value) 
{
  value = value.replace(/^\s+/,'');
  value = value.replace(/\s+$/,'');
  return value;
}

/*
 * in_array function
 */
function in_array( what, where )
{
	var a=false;
	for(var i=0;i<where.length;i++)
	{
		where[i] = trim(where[i]);
	  if(what == where[i])
	  {
	    a=true;
        break;
	  }
	}
	return a;
}

/*              
 * hints for the jquery object
 */
(function($)
{
	$.fn.hint = function(values)
	{
		values = values.split('|');

		$(this).addClass("idleField");
		
		$(this).focus(function() 
		{
	        if (this.value == this.defaultValue)
	        {
	        	$(this).removeClass("idleField").addClass("focusField");
	        	
	        	if(in_array(this.defaultValue, values))
	        	{
	        		this.value = '';
	        	}
	        }
	        if(this.value != this.defaultValue)
	        {
		    	this.select();	    	
	        }
	    });
	    $(this).blur(function() 
	    {
	    	if (in_array(this.defaultValue, values) && this.value == ''){ 
	    		$(this).removeClass("focusField").addClass("idleField");
	    		this.value = (this.defaultValue ? this.defaultValue : ''); 
	    	}
	    });
	}
})(jQuery);
