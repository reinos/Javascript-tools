/*Menu plugin*/
;(function ( $, window, document, undefined ) {

    // Create the defaults once
    var pluginName = 'trippleTabSlider',
        defaults = {
            timeout: 5000
        };

    // The actual plugin constructor
    function Plugin( element, options ) {
        this.element = element;

        //set the timer
        this.timer = null;

        //the active elem
        this.activeElem = 0;
        //total
        this.totalItems = 0;
        //bussy
        this.bussy = false;
        //max items
        this.maxItems = 3;

        // the default options for future instances of the plugin
        this.options = $.extend( {}, defaults, options) ;

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype.init = function () {
        // Place initialization logic here
        // You already have access to the DOM element and
        // the options via the instance, e.g. this.element
        // and this.options
        
        //shortcut
        $elem =  $(this.element);

        //set bussy indicator
        $elem.data('bussy', '0');

        //show all
        $elem.show();

        //remove the items above the 
        $elem.find('.slider-pager li').slice(this.maxItems).remove();
        $elem.find('.slider li').slice(this.maxItems).remove();

        //activate the first one`s
        $elem.find('.slider-pager li:first').addClass('active');
        $elem.find('.slider li:first').addClass('active');
        $elem.find('.slider li:not(:first)').hide();

        $elem.find('.slider li').css({
            position: 'relative',
            zIndex : 2
        });

         $elem.find('.slider-pager li').css({
            position: 'relative',
            zIndex : 3
        });

        //set  total items
        this.totalItems = $elem.find('.slider-pager li').length;

        //add index numbers
        this.addNumbers();

        //add the events
        this.addEvents();

        //start the slider only if there a more then one itmes
        if(this.totalItems > 1) {
            this.start();
        }
    };

    //next
    Plugin.prototype.next = function () {
        //shortcut
        $elem =  $(this.element);  

        //new activeelem
        var activeElem = this.activeElem + 1;

         //did we reach the last one?
        if(this.totalItems ==  activeElem) {
            activeElem = 0;
        }

        this.goTo(activeElem, this.activeElem);

    }

    //go to
    Plugin.prototype.goTo = function ( nr, old_nr ) {
        //shortcut
        $elem =  $(this.element);

        //set bussy indicator
        $elem.data('bussy', '1');

        //remove old placeholder
        $('.__placeholder__').remove();
        
        $elem.append('<div class="__placeholder__"/>');
        $('.__placeholder__').css({
            position: 'absolute',
            left : 0,
            top: 0,
            zIndex: 1
        });
        $('.__placeholder__').append($elem.find('.slider li img').eq(nr).clone());
       

        //remove all other actives
        $elem.find('.slider-pager li').removeClass('active');
        $elem.find('.slider li').removeClass('active');

        //set a new active for the pager
        $elem.find('.slider-pager li').eq(nr).addClass('active');
        $elem.find('.slider li').eq(nr).addClass('active');

        //fade old item out
        $elem.find('.slider li').eq(old_nr).fadeOut(function(){
            $elem.find('.slider li').eq(nr).fadeIn(function(){
                $('.__placeholder__').remove();
            });
        });

        //assign
        this.activeElem = nr;  

        //set bussy indicator
        $elem.data('bussy', '0');
    }

    //start the queue
    Plugin.prototype.start = function () {
        obj = this;

        //start the interval
        this.timer = setInterval(function(){
            obj.next();
        }, obj.options.timeout);
    }

    //start the queue
    Plugin.prototype.stop = function () {
        clearInterval(this.timer);
    }

    //add events
    Plugin.prototype.addEvents = function () {
        obj = this;
      
        //shortcut
        $elem =  $(this.element);

        $elem.find('.slider-pager li').click(function(){
            if($elem.data('bussy') == 0) {
                obj.stop();
                obj.goTo($(this).data('indexNumber'), obj.activeElem);
                obj.start();
            }
        });
    }

    //add numbers
    Plugin.prototype.addNumbers = function () {
        //shortcut
        $elem =  $(this.element);

        //add index numbers
        $elem.find('.slider-pager li').each(function(k,v){
            $(v).data('indexNumber', k);
        });
    }


    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                new Plugin( this, options ));
            }
        });
    }

})( jQuery, window, document );