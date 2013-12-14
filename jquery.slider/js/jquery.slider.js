//random array
function randOrd() {
    return (Math.round(Math.random()) - 0.5);
};
/*
* 
* jQuery Delay Plugin
* version: 0.0.1 (14-Jan-2010)
*/
$.fn.reverse = [].reverse;
jQuery.fn.eachDelay = function (callback, speed, reverse) {
    return jQuery.eachDelay(this, callback, speed, reverse);
};
jQuery.extend({
    eachDelay: function (object, callback, speed, reverse) {
        if (reverse) { object.reverse(); } //reverse the object		
        var name, i = -1, length = object.length, $div = $('<div>'), id;
        if (length === undefined) { //not an array process as object
            var arr = [], x = -1;
            for (name in object) arr[++x] = name;
            id = window.setInterval(function () {
                if (++i === arr.length || callback.call(object[arr[i]], arr[i], object[arr[i]]) === false)
                    clearInterval(id);
            }, speed);
        }
        else { //array-compatible element ie. [], jQuery Object
            id = window.setInterval(function () {
                if (++i === object.length || callback.call(object[i], i, object[i]) === false)
                    clearInterval(id);
            }, speed);
        }
        return object;
    }
});

/**
* css regels die nodig is:
* 
* #slider{ display:none; margin:0; padding:0; }
* #s-animatie_nr li.selected{ background:#000 !important; color:#fff; }
* 
*/
(function ($) {
    $.widget('suneco.slider', {
        //default options
        options: {
            version: "1.1",
            interval: 5000,
            arrows: {
                enable: false,
                left: {
                    src: '',
                    style: ''
                },
                right: {
                    src: '',
                    style: ''
                }
            },
            overlay: {
                status: false,
                position: 'left',
                overlayStyle: {},
                hidden: false
            },
            mozik: {
                horizontal: 20,
                vertical: 1,
                type: 'blok-random',
                easing: 'slide'
            },
            width: '',
            height: '',
            easing: 'swing',
            sliderType: 'horizontal',
            circular: false,
            animationTime: 500,
            clickAnimationTime: 1000,
            numbers: false,
            onSliderComplete: '',
            onComplete: '',
            onStart: '',
            onAnimation: '',
            onSliderInit: ''
        },

        _init: function () {


        }, //eind init

        _create: function () {

            //vars
            var obj = this;
            var elem = this.element;

            //prefix
            obj.widgetEventPrefix = '';

            //namespace
            obj.widgetEventPrefix = '';


            //fix zodat je niet alle elementen ziet
            obj.element.css({ display: 'block' });

            //config aanmaken
            obj.config = {
                options: obj.options,
                items: obj.element.children('li'),
                totaal: obj.element.children('li').length,
                curItem: obj.element.children('li').eq(0),
                nextItem: obj.element.children('li').eq(1),
                lastItem: obj.element.children('li').eq(obj.element.children('li').length - 1),
                prevItem: obj.element.children('li').eq(obj.element.children('li').length - 1),
                width: obj.element.children('li img').eq(0).width(),
                height: obj.element.children('li img').eq(0).height(),
                nrs: '',
                isAnimation: false,
                isMozikAnimation: false,
                isDragging: false
            };

            //vars
            var config = obj.config;
            var options = obj.config.options;

            //custom hoogtes.
            if (typeof (options.height) == 'number') {
                config.height = options.height;
            }
            if (typeof (options.width) == 'number') {
                config.width = options.width;
            }

            //easing methods
            switch (options.easing) {
                case 'bounce':
                    options.easing = 'easeOutBounce';
                    options.easingShadow = 'easeOutBounce';
                    options.easingSlide = true;
                    break;
                case 'linear':
                    options.easing = 'linear';
                    options.easingShadow = 'linear';
                    options.easingSlide = true;
                    break;
                case 'quart':
                    options.easing = 'easeOutQuart';
                    options.easingShadow = 'easeOutQuart';
                    options.easingSlide = true;
                    break;
                case 'cubic':
                    options.easing = 'easeOutCubic';
                    options.easingShadow = 'easeOutCubic';
                    options.easingSlide = true;
                    break;
                case 'quint':
                    options.easing = 'easeOutQuint';
                    options.easingShadow = 'easeOutQuint';
                    options.easingSlide = true;
                    break;
                case 'sine':
                    options.easing = 'easeOutSine';
                    options.easingShadow = 'easeOutSine';
                    options.easingSlide = true;
                    break;
                case 'back':
                    options.easing = 'easeOutBack';
                    options.easingShadow = 'easeOutBack';
                    options.easingSlide = true;
                    break;
                case 'expo':
                    options.easing = 'easeOutExpo';
                    options.easingShadow = 'easeOutExpo';
                    options.easingSlide = true;
                    break;
                case 'circ':
                    options.easing = 'easeOutCirc';
                    options.easingShadow = 'easeOutCirc';
                    options.easingSlide = true;
                    break;
                case 'elastic':
                    options.easing = 'easeOutElastic';
                    options.easingShadow = 'easeOutElastic';
                    options.easingSlide = true;
                    break;
                case 'swing':
                    options.easing = 'swing';
                    options.easingSlide = true;
                    break;
                case 'fade':
                    options.easing = 'fade';
                    options.easingSlide = false;
                    break;
                default:
                    options.easing = 'swing';
                    options.easingSlide = true;
            }

            //route naar een init function
            switch (options.sliderType) {
                case 'vertical': ;
                    break;
                case 'horizontal': ;
                    break;
                case 'fade': ;
                    break;
                case 'mozik': ;
                    break;
            }

            //de slidertype bekijken en confg voor maken
            if (options.sliderType == 'vertical' || options.sliderType == 'fade' || options.sliderType == 'mozik') {

                //bij fade is de easing ook fade
                if (options.sliderType == 'fade') {
                    options.easing = 'fade';
                }

                //mozik effect is altijd fade
                if (options.sliderType == 'mozik') {
                    options.easing = 'fade';
                }

                //er is nu geen sprake van een slide, dus deze false zettten
                options.easingSlide = false;

                //default = horizontal
            } else {
                options.sliderType = 'horizontal';
                options.easingSlide = true;
            }


            //bereken de paddings en de margins
            //deze ook overnemen uit de CSS door de gebruiker gedefineerd
            if (!elem.css('padding')) {
                var paddingLeft = elem.css('paddingLeft') || '0';
                var paddingTop = elem.css('paddingTop') || '0';
                var paddingBottom = elem.css('paddingBottom') || '0';
                var paddingRight = elem.css('paddingRight') || '0';

                var paddingSlider = paddingTop + ' ' + paddingRight + ' ' + paddingBottom + ' ' + paddingLeft;
            } else {
                var paddingSlider = elem.css('padding') != '' ? elem.css('padding') : '0';
            }
            if (!elem.css('margin')) {
                var marginLeft = elem.css('marginLeft') || '0';
                var marginTop = elem.css('marginTop') || '0';
                var marginBottom = elem.css('marginBottom') || '0';
                var marginRight = elem.css('marginRight') || '0';

                var marginSlider = marginTop + ' ' + marginRight + ' ' + marginBottom + ' ' + marginLeft;
            } else {
                var paddingSlider = elem.css('margin') != '' ? elem.css('margin') : '0';
            }


            //wrap alles in nog een div om de arrows en de animatie nr te wrappen
            elem.wrap('<div id="s-sliderOuterWrapper" style="width:' + config.width + 'px;margin:' + marginSlider + ';padding:' + paddingSlider + ';position:relative;"/>');

            //wrap alles in een MAINdiv
            elem.wrap('<div id="s-sliderWrapper" style="overflow:hidden;width:' + config.width + 'px;position:relative;height:' + config.height + 'px;"/>');

            //cache element
            config.sliderWrapper = $('#s-sliderWrapper');
            config.sliderOuterWrapper = $('#s-sliderOuterWrapper');

            //zet de css style voor de ul
            //slide
            if (options.easingSlide) {
                elem.css({
                    listStyle: 'none',
                    width: config.width * config.totaal + 'px',
                    margin: 0,
                    padding: 0,
                    listStyle: 'none',
                    overflow: 'hidden',
                    position: 'absolute',
                    height: elem.children('li').height() + 'px'
                });

                //rest (fade,bounce, mozaik)
            } else {
                elem.css({
                    listStyle: 'none',
                    width: config.width,
                    margin: 0,
                    padding: 0,
                    listStyle: 'none',
                    overflow: 'hidden',
                    position: 'relative',
                    height: elem.children('li').height() + 'px'
                });
            }


            //zet de css styel voor de li`s van de ul
            //slide
            if (options.easingSlide) {
                config.items.css({
                    width: config.width,
                    float: 'left'
                });

                //rest (fade,bounce, mozaik)
            } else {
                config.items.css({
                    position: 'absolute',
                    width: config.width
                });
            }

            //plaats de arrows
            if (options.arrows) {
                obj._placeArrows();
            }


            //alle li`s behalve de eerste helemaal recht zetten zodat je ze niet ziet.
            //bij een vertical type moeten wat meer dingen worden geregeld.

            //vertical type
            if (options.sliderType == 'vertical') {
                //alle ander li`s behalve de eerste weg zetten
                elem.children('li:not(:first)').css({ top: '-' + config.height + 'px' });

                //wanneer je een vertical met schaduw hebt, een schaduw toevoegen.
                $('<img id="s-imageSizeShadow" style="display:none"/>')
				.attr('src', options.shadow+'?'+ Math.random()*99999)
				.load(function () {

				    //zet een dummy neer om de maten te meten
				    elem.wrap('<div id="vertical" style="position:relative;overflow:hidden"/>');
				    elem.parent().prepend('<img id="s-imageSizeShadow" style="position:absolute;" src="' + options.shadow+'?'+ Math.random()*99999 + '"/>');

				    config.shadowTop = (Number(config.curItem.find('img').height()) + (Number(options.shadowHeight) * 2 - 7)) - Number($('#s-imageSizeShadow').height());

				    //bereken nieuwe hoogt
				    config.height = (parseInt(elem.children('li').eq(0).height()) + parseInt($('#s-imageSizeShadow').height())) - options.shadowHeight;

				    $('#s-imageSizeShadow').css({
				        top: config.shadowTop + 'px'
				    });

				    //voer de hoogte door
				    $('#vertical').css({
				        height: config.height,
				        overflow: 'hidden'
				    });

				    //wrapper aanpassen
				    config.sliderWrapper.css({
				        height: config.height
				    });

				    //registreer het object
				    config.shadow = $('#s-imageSizeShadow');
				});

                //horizontal type	
            } else {
                //fade / mozik 
                //alle ander li`s behalve de eerste weg zetten
                if (!options.easingSlide) {
                    elem.children('li:not(:first)').css({ left: config.width });
                }

                //bij mozik een div plaatsen die de animaities verzorgd
                if (options.sliderType == 'mozik') {
                    config.sliderWrapper.prepend('<div style="z-index:1;position:relative;" id="s-mozikLayer"/>');
                    config.mozikLayer = $('#s-mozikLayer');

                    //tijdelijk
                    if (options.mozik.type == 'blok-random') {
                        //options.mozik.type = 'blok-topLeft';
                    }
                    //de balken
                    if (options.mozik.type == 'blok-slide-right' || options.mozik.type == 'blok-slide-left' || options.mozik.type == 'blok-random' || options.mozik.type == 'blok-bottom-left' || options.mozik.type == 'blok-bottom-right' || options.mozik.type == 'blok-top-left' || options.mozik.type == 'blok-top-right' || options.mozik.type == 'blok-left' || options.mozik.type == 'blok-right') {
                        obj.isMozikAnimation = false;
                        obj._mozikBlokInit();
                    }
                }
            }

            //init overlay
            if (options.overlay.status) {
                obj._initOverlay();
            }

            //kijk of er meer dan 1 item aanwezig is
            //wanneer dit zo is dan mag de slider gaan bewegen
           if(config.items.length > 1) {
                //click events naar rechts (reserve)
                $('#s-arrow_left').live('click', function (e) {

                    //stop de timers
                    elem.stopTime('slideshow');
                    elem.stopTime('reinit');

                    //als er voor 2 sec niks is gedaan, gewoon doorgaan.
                    elem.oneTime((options.interval + 1000), 'reinit', function () {
                        obj._route();
                    });

                    //ROUTES
                    //wanneer we in vertical modus zitten
                    if (options.sliderType == 'vertical') {
                        obj._slideVertical(config.prevItem.attr('alt'), true);

                        //geen slider maar fader
                    } else if (!options.easingSlide) {

                        //fade effect
                        if (options.sliderType == 'fade') {
                            obj._fade(config.prevItem.attr('alt'), true);

                            //mozik effect
                        } else if (options.sliderType == 'mozik') {
                            obj._fade(config.prevItem.attr('alt'), true);
                        }
                    } else {
                        //de slide uitvoeren
                        obj._slide(config.prevItem.attr('alt'), e);
                    }
                });

                //click events neer links
                $('#s-arrow_right').live('click', function () {
                    //stop de timers
                    elem.stopTime('slideshow');
                    elem.stopTime('reinit');

                    //als er voor 2 sec niks is gedaan, gewoon doorgaan.
                    elem.oneTime((options.interval + 1000), 'reinit', function () {
                        obj._route();
                    });

                    //ROUTES
                    //wanneer we in vertical modus zitten
                    if (options.sliderType == 'vertical') {
                        obj._slideVertical(config.nextItem.attr('alt'));

                        //geen slider maar fader
                    } else if (!options.easingSlide) {

                        //fade effect
                        if (options.sliderType == 'fade') {
                            obj._fade(config.nextItem.attr('alt'));

                            //mozik effect
                        } else if (options.sliderType == 'mozik') {
                            obj._fade(config.nextItem.attr('alt'));
                        }
                    } else {
                        //de slide uitvoeren
                        obj._slide(config.nextItem.attr('alt'));
                    }

                });
            }

            //zet id`s voor de li`s
            $(elem).children('li').each(function (key) {
                $(this).attr('id', 's-slide_' + key).attr('class', 's-slide_' + key+' slide-' + (key+1));
            });

            //console.log(obj);
            //obj.onSliderInit(config.curItem,config.items);


            //fire the slider
            obj._route();
            obj._initNrs();

            // callback wanneer alles ge-init.
            if (options.onSliderInit) {
                obj._trigger("onSliderInit", '', {
                    item: config.curItem,
                    items: config.items
                });
            }

            //callBack wanneer alles klaar is\
            /*if($('#s-arrow_left').length > 0 || $('#s-arrow_right').length > 0) {
                if (options.onSliderComplete) {
				        obj._trigger("onSliderComplete", '', {
				            item: config.curItem,
				            items: config.items
				        });
				    }
            }*/


        }, //eind _create()

        _fadeInit: function () {

        }, //eind _fadeInit()
        _fade: function (queue, back, event) {

            //event is geset wanneer je op een nummer klikt
            //back is geset wanneer je op de bnack button klikt

            //vars
            var obj = this;
            var config = this.config;
            var elem = this.element;
            var options = this.config.options;

            if (!config.isAnimation && !obj.isMozikAnimation) {

                //als het een click animatie is
                if (queue || event) {
                    var clickAnimation = true;
                } else {
                    var clickAnimation = false;
                }

                //welke animatieTiming soort moet je hebben
                if (clickAnimation) {
                    var animationTime = options.clickAnimationTime
                } else {
                    var animationTime = options.animationTime
                }
                //de animatie tijd mag niet lager dan 200 zijn
                animationTime = animationTime <= 200 ? 250 : animationTime;

                config.isAnimation = true;

                //als er geen event object is
                event = event || false;

                //wanneer er in fademode op de left button is geklikt
                back = back || false;

                //volgend item pakken
                if (event) {
                    var $nextItem = $(config.items + '[alt="' + $(event.currentTarget).attr('alt') + '"]').eq(0);

                } else {
                    //reverse mode of niet, meestal reserve als je op de leftbutton hebt geklikt.
                    if (back) {
                        var $nextItem = config.prevItem;
                    } else {
                        var $nextItem = config.nextItem;
                    }
                }


                //second item onder de curitem leggen
                //css goed zetten
                $nextItem.css({
                    left: 0,
                    zIndex: 0,
                    opacity:0
                });

                $nextItem.animate({
                    opacity:1
                }, {duration: animationTime});

                config.curItem.css({
                    zIndex: 1
                });

                //callback function onClick
                if (options.onClick && event) {
                    obj._trigger('onClick', '', {
                        item: $nextItem,
                        items: config.items
                    });
                }
                obj.onClick($nextItem, config.items);

                //callback function onStart
                if (options.onStart) {
                    obj._trigger('onStart', '', {
                        item: $nextItem,
                        items: config.items
                    });
                }
                obj.onStart($nextItem, config.items);


                //Mozik types
                if (options.sliderType == 'mozik') {
                    if (options.mozik.type == 'blok-slide-right' || options.mozik.type == 'blok-slide-left' || options.mozik.type == 'blok-random' || options.mozik.type == 'blok-bottom-left' || options.mozik.type == 'blok-bottom-right' || options.mozik.type == 'blok-top-left' || options.mozik.type == 'blok-top-right' || options.mozik.type == 'blok-left' || options.mozik.type == 'blok-right') {
                        obj._mozikBlok(animationTime);
                    }
                }

                //animeer de curitem naar opacity:0
                config.curItem.stop().animate({
                    opacity: 0
                }, {
                    duration: animationTime,
                    complete: function () {
                        //wanneer de animatie klaar is var goed zetten
                        config.isAnimation = false;

                        //zet de curItem goed, meot weg dus
                        config.curItem.css({
                            left: config.width,
                            opacity: 1,
                            zIndex: 0
                        });

                        //callback function onComplete
                        if (options.onComplete) {
                            obj._trigger('onComplete', '', {
                                item: $nextItem,
                                items: config.items
                            });
                        }
                        obj.onComplete($nextItem, config.items);


                        if (back) {
                            //lastItem aan het begin van de lijst
                            elem.prepend(config.prevItem);
                        } else {
                            //curitem aan het eind van de lijst
                            elem.append(config.curItem);
                        }

                        //als er  geklikt is, dit item ook vooraan zetten
                        if (event) {

                            //start item en geklikte item selecteren
                            var _start = Number(config.curItem.attr('alt'));
                            var _end = Number($(event.currentTarget).attr('alt'));

                            //als we vooruit gaan
                            if (_start < _end) {
                                var _last = _end - _start;
                                elem.append($(config.items).slice(0, _last));
                                config.items = elem.children('li');

                                //als we achteruit gaan	moeten we de items goed zetten in de dom, terug halen dus	
                            } else {
                                config.items = elem.children('li');
                                var _last = ((config.totaal - _start) - 1) + (_end);
                                elem.append(config.items.slice(0, _last));
                                //nog een keer goed zetten de items omdat de dom is aangepast.
                                config.items = elem.children('li');
                            }
                            queue = $(event.currentTarget).attr('alt');
                        }

                        //reset items en nummers
                        obj._reInitItems(queue);
                        obj._reSortNr(config.curItem);
                    }
                });
            }
        }, //eind fade

        _mozikBlokInit: function () {
            //vars
            var obj = this;
            var config = this.config;
            var elem = this.element;
            var options = this.config.options;

            //options.mozik.vertical = 1;

            //bereken de breedtes en hoogtes
            var m_width = config.width / options.mozik.horizontal;
            var m_height = config.height / options.mozik.vertical;

            //plaats de divs
            for (var h = 0; h < options.mozik.vertical; h++) {
                var height = h * m_height;
                for (var w = 0; w < options.mozik.horizontal; w++) {
                    config.mozikLayer.append('<div class="s-mozikLayers ' + h + ' ' + w + ' ' + h + '-' + w + '"/>');
                    $('.' + h + '-' + w).css({
                        width: Math.round(m_width),
                        height: Math.round(m_height),
                        position: 'absolute',
                        left: Math.round(w * m_width),
                        top: height,
                        overflow: 'hidden'
                    });
                }
            }

        },


        _mozikBlok: function (animationTime) {
            //vars
            var obj = this;
            var config = this.config;
            var elem = this.element;
            var options = this.config.options;

            //image naar mozik neerzetten
            var img_url = config.curItem.find('img').attr('src');

            //wanneer de balken vanaf rechts moeten
            var reverse;

            //wanneer de balken van beneden naar boven gaan
            if (options.mozik.type == 'blok-bottom-right' || options.mozik.type == 'blok-bottom-left') {
                var newHeight = '-' + config.height;
            } else {
                var newHeight = config.height;
            }


            //bereken de breedtes en hoogtes
            var m_width = config.width / options.mozik.horizontal;
            var m_height = config.height / options.mozik.vertical;
            var object_tmp = [];

            if (!obj.isMozikAnimation) {
                obj.isMozikAnimation = true;

                //plaatsen van de div
                if (options.mozik.type == 'blok-top-right') {
                    //plaats de divs
                    for (var h = 0; h < options.mozik.vertical; h++) {
                        var height = h * m_height;

                        for (var w = options.mozik.horizontal - 1; w >= 0; w--) {
                            object_tmp.push($('.' + h + '-' + w));
                            $('.' + h + '-' + w).css({
                                background: 'url(' + img_url + ') no-repeat',
                                backgroundPosition: '-' + w * m_width + 'px -' + height + 'px'
                            });
                        }
                    }
                } else if (options.mozik.type == 'blok-top-left') {
                    //plaats de divs
                    for (var h = 0; h < options.mozik.vertical; h++) {
                        var height = h * m_height;

                        for (var w = 0; w < options.mozik.horizontal; w++) {
                            object_tmp.push($('.' + h + '-' + w));
                            $('.' + h + '-' + w).css({
                                background: 'url(' + img_url + ') no-repeat',
                                backgroundPosition: '-' + w * m_width + 'px -' + height + 'px'
                            });
                        }
                    }
                } else if (options.mozik.type == 'blok-bottom-left') {
                    //plaats de divs
                    for (var h = options.mozik.vertical - 1; h >= 0; h--) {
                        var height = h * m_height;

                        for (var w = 0; w < options.mozik.horizontal; w++) {
                            object_tmp.push($('.' + h + '-' + w));
                            $('.' + h + '-' + w).css({
                                background: 'url(' + img_url + ') no-repeat',
                                backgroundPosition: '-' + w * m_width + 'px -' + height + 'px'
                            });
                        }
                    }

                } else if (options.mozik.type == 'blok-bottom-right') {
                    //plaats de divs
                    for (var h = options.mozik.vertical - 1; h >= 0; h--) {
                        var height = h * m_height;

                        for (var w = options.mozik.horizontal - 1; w >= 0; w--) {
                            object_tmp.push($('.' + h + '-' + w));
                            $('.' + h + '-' + w).css({
                                background: 'url(' + img_url + ') no-repeat',
                                backgroundPosition: '-' + w * m_width + 'px -' + height + 'px'
                            });
                        }
                    }

                } else if (options.mozik.type == 'blok-random') {
                    //plaats de divs
                    for (var h = 0; h < options.mozik.vertical; h++) {
                        var height = h * m_height;
                        object_tmp[h] = [];
                        for (var w = 0; w < options.mozik.horizontal; w++) {
                            object_tmp[h].push($('.' + h + '-' + w));
                            $('.' + h + '-' + w).css({
                                background: 'url(' + img_url + ') no-repeat',
                                backgroundPosition: '-' + w * m_width + 'px -' + height + 'px'
                            });
                        }
                    }


                } else {
                    //plaats de divs
                    for (var h = 0; h < options.mozik.vertical; h++) {
                        var height = h * m_height;

                        for (var w = 0; w < options.mozik.horizontal; w++) {
                            object_tmp.push($('.' + h + '-' + w));
                            $('.' + h + '-' + w).css({
                                background: 'url(' + img_url + ') no-repeat',
                                backgroundPosition: '-' + w * m_width + 'px -' + height + 'px'
                            });
                        }
                    }
                }

                //animatie tijd
                var mozikAnimationTime = (animationTime / $('.s-mozikLayers').length) / 2;

                //Animeer de blokken random
                if (options.mozik.type == 'blok-random') {
                    object_tmp.sort(randOrd);

                    var blokjesTot = options.mozik.horizontal * options.mozik.vertical;
                    var subTime = mozikAnimationTime;
                    var subSubtime = mozikAnimationTime * 1;


                    //sub tijden afhankelijk van de aantal blokjes
                    if (blokjesTot > 10) {
                        subSubtime = mozikAnimationTime * 2.6;
                        subTime = mozikAnimationTime * 9;
                    }
                    //deze tijden kloppen nog niet

                    //console.log(subSubtime, blokjesTot / 16 * mozikAnimationTime)

                    //animeer alle blokjes
                    $.eachDelay(object_tmp, function (key, val) {
                        val.sort(randOrd);
                        $.eachDelay(val, function (k, v) {
                            $(this).animate({
                                opacity: 0
                            }, function () {
                                $(this).css({
                                    background: 'none',
                                    opacity: 1
                                });

                                if ($('.s-mozikLayers:animated').length == 1) {
                                    obj.isMozikAnimation = false;
                                }
                            });
                        }, subSubtime, reverse);
                    }, subTime);

                    //blokken die sliden 
                    //@todo werkt nog niet goed
                } else if (options.mozik.type == 'blok-slide-right' || options.mozik.type == 'blok-slide-left') {

                    $.eachDelay(object_tmp, function () {
                        var width_ = $(this).width();
                        var left_orig = parseInt($(this).css('left').replace('px', ''));

                        //left positinering aanpassen als hij van links komt
                        if (options.mozik.type == 'blok-slide-left') {
                            reverse = true;
                            var left_ = parseInt($(this).css('left').replace('px', '')) + parseInt(width_);
                        } else {
                            var left_ = parseInt($(this).css('left').replace('px', ''));
                        }

                        //animate de balken
                        $(this).animate({
                            width: 0,
                            left: left_,
                            opacity: 1
                        }, function () {
                            $(this).css({
                                left: left_orig + 'px',
                                background: 'none',
                                width: width_,
                                opacity: 1
                            });
                            if ($('.s-mozikLayers:animated').length == 0) {
                                obj.isMozikAnimation = false;
                            }
                        });
                    }, mozikAnimationTime / 3, reverse);

                    //normale mozaik effect
                } else {
                    $.eachDelay(object_tmp, function () {
                        var top_ = $(this).css('top');
                        $(this).animate({
                            top: newHeight,
                            opacity: 0.3
                        }, function () {
                            $(this).css({
                                background: 'none',
                                top: top_,
                                opacity: 1
                            });

                            if ($('.s-mozikLayers:animated').length == 1) {
                                obj.isMozikAnimation = false;
                            }
                        });
                    }, mozikAnimationTime, reverse);
                }
            }

            //return;

        }, //eind _mozikInit()	

        _slideInit: function () {

        }, //eind _slideInit()

        _slide: function (queue, event) {

            //vars
            var obj = this;
            var config = this.config;
            var elem = this.element;
            var options = this.config.options;



            //als het een click animatie is
            if (queue || event) {
                var clickAnimation = true;
            } else {
                var clickAnimation = false;
            }
            var aantal = queue;
            if (queue < config.curItem.attr('alt')) {
                aantal = config.curItem.attr('alt') - queue;
            } else {
                aantal = queue - config.curItem.attr('alt');
            }


            //de animatie tijd mag niet lager dan 200 zijn
            animationTime = animationTime <= 200 ? 250 : animationTime;

            //als er op de nrs is geklikt mag hij wel doorschieten 
            queue = queue || (parseInt(config.nextItem.attr('alt')));

            //wanneer er geen animatie is
            if (!config.isAnimation) {

                config.isAnimation = true;

                //callback function onClick
                if (options.onClick) {
                    obj._trigger('onClick', '', {
                        item: config.curItem,
                        items: config.items
                    });
                }
                obj.onClick(config.curItem, config.items);

                //bereken hoevel px hij naar links moet
                if (options.circular) {

                    //wanneer in circular modus het eind is gehaald
                    var not = false;
                    if (queue == 0 && config.curItem.attr('alt') == config.items.filter(':last').attr('alt')) {
                        //grab all clones
                        var clones = config.items.slice(0, (parseInt(queue) + 1)).clone();
                        //restaantal 
                        var rest = (config.totaal - 1) - config.curItem.attr('alt');

                        var totaal = parseInt(config.totaal) + parseInt(clones.length);

                        //add class to clones
                        clones.addClass('clone');

                        //append de clones aan de ul
                        elem.append(clones);

                        //pas breedte van de ul aan
                        elem.css({
                            width: (totaal) * config.width
                        });

                        //animeer aantal pixels 
                        var animateTo = (totaal - 1) * config.width;

                        //var maken om alle clones weg te halen
                        var reset = true;

                        //wanneer je van de eerste naar de laaste gaat
                    } else if (event && config.curItem.attr('alt') == 0 && queue == config.totaal - 1) {
                        //grab all clones
                        var clones = config.items.eq(config.totaal - 1).clone();

                        var totaal = parseInt(config.totaal) + parseInt(clones.length);

                        //add class to clones
                        clones.addClass('clone');

                        //append de clones aan de ul
                        elem.prepend(clones);


                        //pas breedte van de ul aan
                        elem.css({
                            width: (totaal) * config.width,
                            left: '-' + config.width + 'px'
                        });

                        //animeer aantal pixels 
                        var animateTo = 0;


                        //var maken om alle clones weg te halen
                        var reset = true;
                        var toLeft = true;


                        //normaal
                    } else {
                        //animeer aantal pixels 
                        var animateTo = (queue) * config.width;
                    }

                    //nier circular
                } else {
                    var animateTo = (queue) * config.width;
                }


                //welke animatieTiming soort moet je hebben
                if (clickAnimation) {
                    //bereken hoevel items hij opschuift.
                    var start = Math.abs(parseInt(elem.css('left')));

                    //ie fix, anders gaan we een NaN berekenen en dat kan niet
                    start = isNaN(start) ? 0 : start;

                    //verschil berkenen
                    var verschil = Math.abs((start - animateTo) / config.width);

                    var animationTime = options.clickAnimationTime * verschil;
                } else {
                    var animationTime = options.animationTime;
                }

                //animeer de lijst
                elem.animate({
                    left: '-' + animateTo + 'px'
                }, {
                    duration: animationTime,
                    easing: options.easing,
                    complete: function () {

                        //reset items en nummers
                        obj._reInitItems(queue);
                        obj._reSortNr(queue);

                        //wanneer er gebruik word gemaakt van een clone deze weghalen
                        if (options.circular && reset) {

                            //aantal pixels hoe hij moet staan
                            if (toLeft) {
                                var left = '-' + ((config.totaal - 1) * config.width) + 'px';
                            } else {
                                var left = '-' + queue * config.width + 'px';
                            }


                            //reset style
                            elem.css({
                                width: config.totaal * config.width,
                                left: left
                            });

                            //remove clones
                            elem.find('.clone').remove();
                        }


                        //callback function onComplete
                        if (options.onComplete) {
                            obj._trigger('onComplete', '', {
                                item: config.curItem,
                                items: config.items
                            });
                        }
                        obj.onComplete(config.curItem, config.items);

                        //animeer var false zetten
                        config.isAnimation = false;
                    }
                });

            }

        }, //eind _slide(queue)

        _slideVertical: function (queue, back, event) {

            //vars
            var obj = this;
            var config = this.config;
            var elem = this.element;
            var options = this.config.options;

            //als het een click animatie is
            if (queue || event) {
                var clickAnimation = true;
            } else {
                var clickAnimation = false;
            }


            var queue = queue || config.curItem.attr('alt');


            if (!config.isAnimation) {

                //buttons wegFaden
                config.arrowLeft.fadeOut(100);
                config.arrowRight.fadeOut(100);

                config.isAnimation = true;

                //welke animatieTiming soort moet je hebben
                if (clickAnimation) {
                    var animationTime = options.clickAnimationTime
                } else {
                    var animationTime = options.animationTime
                }
                //de animatie tijd mag niet lager dan 200 zijn
                animationTime = animationTime <= 200 ? 250 : animationTime;

                //callback function onClick
                if (options.onClick && clickAnimation) {
                    obj._trigger('onClick', '', {
                        item: config.curItem,
                        items: config.items
                    });
                }
                obj.onClick(config.curItem, config.items);

                //callback function onStart
                if (options.onStart) {
                    obj._trigger('onStart', '', {
                        item: config.curItem,
                        items: config.items
                    });
                }
                obj.onStart(config.curItem, config.items);

                //fade current item weg
                config.curItem.fadeOut(200, function () {
                    config.curItem.css({
                        top: '-' + config.height + 'px',
                        display: 'block'
                    });
                });

                //zet shadow weg
                config.shadow.css({
                    top: (parseInt(config.shadow.css('top')) * 2) + 'px',
                    opacity: 0
                });


                //easing bepalen voor de shadow.				
                config.shadow.animate({
                    top: config.shadowTop,
                    opacity: 1
                }, {
                    duration: animationTime,
                    easing: options.easingShadow
                });


                //vbepaal volgend item
                if (event) {
                    var $nextItem = $(config.items + '[alt="' + $(event.currentTarget).attr('alt') + '"]').eq(0);

                } else {
                    //reserve mode of niet, meestal reserve als je op de leftbutton hebt geklikt.
                    if (back) {
                        var $nextItem = config.prevItem;
                    } else {
                        var $nextItem = config.nextItem;
                    }
                }


                //animeer item
                $nextItem.animate({
                    top: 0
                }, {
                    duration: animationTime,
                    easing: options.easing,
                    complete: function () {
                        config.isAnimation = false;

                        //infaden van de buttons
                        config.arrowLeft.fadeIn(200);
                        config.arrowRight.fadeIn(200);

                        //element achteraan plaatsen of vooraan plaatsen, afhankelijk van back
                        if (back) {
                            elem.prepend($nextItem);
                        } else {
                            elem.append(config.curItem);
                        }


                        //callback function onComplete
                        if (options.onComplete) {
                            obj._trigger('onComplete', '', {
                                item: config.curItem,
                                items: config.items
                            });
                        }
                        obj.onComplete(config.curItem, config.items);

                        //als er  geklikt is, dit item ook vooraan zetten
                        if (event) {

                            //start item en geklikte item selecteren
                            var _start = Number(config.curItem.attr('alt'));
                            var _end = Number($(event.currentTarget).attr('alt'));

                            //als we vooruit gaan
                            if (_start < _end) {
                                var _last = _end - _start;
                                elem.append($(config.items).slice(0, _last));
                                config.items = elem.children('li');

                                //als we achteruit gaan	moeten we de items goed zetten in de dom, terug halen dus	
                            } else {
                                config.items = elem.children('li');
                                var _last = ((config.totaal - _start) - 1) + (_end);
                                elem.append(config.items.slice(0, _last));
                                //nog een keer goed zetten de items omdat de dom is aangepast.
                                config.items = elem.children('li');
                            }
                            queue = $(event.currentTarget).attr('alt');
                        }


                        //reinit settings
                        obj._reInitItems(queue);
                        obj._reSortNr(config.curItem);

                    }
                });

            }


        }, //eind _slideVertical()

        _initOverlay: function () {

            //vars
            var obj = this;
            var config = this.config;
            var elem = this.element;
            var options = this.config.options;

            //hide de h1/h2/g3/h4/h5/h6 of <p>
            var $hiddenItems = elem.find('h1, h2, h3, h4, h5, h6, p, a').hide();
            var heading;
            switch ($hiddenItems[0].tagName.toLowerCase()) {
                case 'h1': heading = 'h1';
                    break;
                case 'h2': heading = 'h2';
                    break;
                case 'h3': heading = 'h3';
                    break;
                case 'h4': heading = 'h4';
                    break;
                case 'h5': heading = 'h5';
                    break;
                case 'h6': heading = 'h6';
                    break;
            }

            //add classes
            elem.find(heading).addClass('title');
            elem.find('p').addClass('text');
            elem.find('a').addClass('more');

            //wrap een div om heen die kan sliden
            $('#s-sliderOuterWrapper').prepend('<div id="s-overlay" style="position:absolute;"/>');
            $overlay = $('#s-overlay');
            $overlay.wrap('<div id="s-overlayWrapper" style="left:0;"/>');

            //default styles
            $overlay.css({
                background: options.overlay.overlayStyle.background || '#000',
                zIndex: 10,
                opacity: options.overlay.overlayStyle.opacity || 0.5,
                padding: options.overlay.overlayStyle.padding || '0',
                margin: options.overlay.overlayStyle.margin || '0',
                height: options.overlay.overlayStyle.height || config.height,
                width: options.overlay.overlayStyle.width || '200px'
            });

            //padding berekenen
            var heightPadding = parseInt($overlay.css('paddingTop')) + parseInt($overlay.css('paddingBottom'));
            var widthPadding = parseInt($overlay.css('paddingLeft')) + parseInt($overlay.css('paddingRight'));
            var heightMargin = parseInt($overlay.css('marginTop')) + parseInt($overlay.css('marginBottom'));
            var widthMargin = parseInt($overlay.css('marginLeft')) + parseInt($overlay.css('marginRight'));

            options.overlay.overlayStyle.height = parseInt($overlay.css('height')) - heightPadding - heightMargin;
            options.overlay.overlayStyle.width = parseInt($overlay.css('width')) - widthPadding - widthMargin;
            //toevoegen aan de css
            $overlay.css({
                height: options.overlay.overlayStyle.height,
                width: options.overlay.overlayStyle.width
            });

            //reset de background, anders wordt deze gebruikt voor de content div en dat mag niet.
            options.overlay.overlayStyle.background = '';


            //content wrapper neerzetten
            $overlay.before('<div id="s-overlayContent" style="position:absolute;width:' + $overlay.width() + 'px;height:' + $overlay.height() + 'px;z-index:11;"/>');
            //custom style
            $('#s-overlayContent').css(options.overlay.overlayStyle);

            //toggle button
            var hidden = options.overlay.hidden ? 'none' : 'block';
            var overlayWidth = ($overlay.width() + widthPadding + (widthMargin / 2));
            $overlay.before('<div id="s-toggle" style="display:' + hidden + ';left:' + overlayWidth + 'px;background:url(' + options.overlay.hide + ') no-repeat;cursor:pointer;z-index:12;position:absolute;width:26px; height:' + options.overlay.overlayStyle.height + 'px;top:' + (heightMargin / 2) + 'px"/>');

            //wanneer hij auto hidden moet zijn
            if (options.overlay.hidden) {
                $('#s-overlayContent, #s-toggle').hover(function () {
                    $('#s-toggle').stopTime('toggle');
                    $('#s-toggle').fadeIn(100, function () {
                        $(this).css({
                            opacity: 1,
                            display: 'block'
                        });
                    });
                }, function () {
                    $('#s-toggle').oneTime(500, 'toggle', function () {
                        $(this).fadeOut(100, function () {
                            $(this).css({
                                opacity: 0,
                                display: 'block'
                            });
                        });
                    });
                });
            }

            //wannneer je op de button klikt op het weg te sliden.
            $('#s-toggle').click(function () {
                var toggle = parseInt($('#s-overlay').css('left')) < 0 ? '0' : '-' + overlayWidth;
                var toggleButton = parseInt($('#s-overlay').css('left')) < 0 ? overlayWidth : '0';

                //animeer 
                $('#s-overlay, #s-overlayContent').animate({
                    left: toggle + 'px'
                });

                //animeer button mee 
                $('#s-toggle').animate({
                    left: toggleButton + 'px'
                }, function () {
                    //welke buttomn moet getoont worden?
                    if (parseInt($('#s-toggle').css('left')) == 0) {
                        $('#s-toggle').css({
                            background: 'url(' + options.overlay.show + ') no-repeat'
                        });
                    } else {
                        $('#s-toggle').css({
                            background: 'url(' + options.overlay.hide + ') no-repeat'
                        });
                    }
                });
            });

            //title & text vak neerzetten	
            $('#s-overlayContent').prepend('<a href="' + config.curItem.find('a').attr('href') + '" class="more">' + config.curItem.find('a').text() + '</a>');
            $('#s-overlayContent').prepend('<p style="margin:0;padding:0;" class="text">' + config.curItem.find('.text').text() + '</p>');
            $('#s-overlayContent').prepend('<' + heading + ' style="margin:0;padding:0;" class="title">' + config.curItem.find('.title').text() + '</' + heading + '>');

            //css aanpassen zodat het mogelijk is om de overlay weg te schuiven en dat je hem niet ziet.
            config.sliderOuterWrapper.css({ overflow: 'hidden' });

        }, //eind _initOverlay()

        //plaats de nummers
        _placeArrows: function () {

            //vars
            var obj = this;
            var config = this.config;
            var elem = this.element;
            var options = this.config.options;

            //zet de arrows
            if ($('#s-arrow_left').length == 0 || $('#s-arrow_right').length == 0) {               
                //preloading image first
                $('<img id="s-imageSize" style="display:none"/>')
				.attr('src', options.arrows.right.src+'?'+ Math.random()*99999)
				.load(function () {
				    //zet een dummy neer om de maten te meten
				    config.sliderOuterWrapper.prepend('<img id="s-imageSize" style="display:none" src="' + options.arrows.right.src+'?'+ Math.random()*99999 + '"/>');

				    //arrow neerzetten
				    config.sliderOuterWrapper.prepend('<div style="cursor:pointer;" id="s-arrow_left"></div>').prepend('<div style="cursor:pointer;" id="s-arrow_right"></div>');

				    //chache elements
				    config.arrowRight = $('#s-arrow_right');
				    config.arrowLeft = $('#s-arrow_left');

				    //custom style
				    config.arrowLeft.css(options.arrows.left.style);
				    config.arrowRight.css(options.arrows.right.style);

				    //default style
				    config.arrowRight.css({
				        backgroundImage: 'url(' + options.arrows.right.src+'?'+ Math.random()*99999 + ')'
				    });
				    //wanneer er geen custom style is gezet
				    if (!options.arrows.right.style) {

				        //wanneer het vertical is bovenin plaatsen
				        if (options.sliderType == 'vertical') {
				            config.arrowRight.css({
				                cursor: 'pointer',
				                position: 'absolute',
				                right: config.width / 2,
				                top: config.height - config.arrowRight.height(),
				                zIndex: 99
				            });

				            //horizontal
				        } else {
				            config.arrowRight.css({
				                cursor: 'pointer',
				                position: 'absolute',
				                right: 0,
				                top: elem.height() / 2,
				                zIndex: 99
				            });
				        }

				    }
				    config.arrowLeft.css({
				        backgroundImage: 'url(' + options.arrows.left.src+'?'+ Math.random()*99999 + ')'
				    });
				    //wanneer er geen custom style is gezet
				    if (!options.arrows.left.style) {

				        //wanneer het vertical is bovenin plaatsen
				        if (options.sliderType == 'vertical') {
				            config.arrowLeft.css({
				                cursor: 'pointer',
				                position: 'absolute',
				                right: config.width / 2,
				                top: 0,
				                zIndex: 99
				            });

				            //horizontal
				        } else {
				            config.arrowLeft.css({
				                cursor: 'pointer',
				                position: 'absolute',
				                left: 0,
				                top: elem.height() / 2,
				                zIndex: 99
				            });
				        }

				    }

				    // callback wanneer alles klaar is met laden
				    if (options.onSliderComplete) {
				        obj._trigger("onSliderComplete", '', {
				            item: config.curItem,
				            items: config.items
				        });
				    }


				    //de dummy weghalen
				    $('#s-imageSize').remove();
				});
            }


        }, //eind _placeNumbers

        _initNrs: function () {

            //vars
            var obj = this;
            var config = this.config;
            var elem = this.element;
            var options = this.config.options;


            //maak een ul element aan in de dom
            var hidden = options.numbers ? 'inline-block' : 'none';

            elem.parent().after('<div style="clear:both;"></div><ul style="display:' + hidden + ';list-style:none;margin:0;padding:0;" id="s-animatie_nr"/>');

            //cache elements
            config.animatieWrapper = $('#s-animatie_nr');

            //voeg daar li`s aan toe met nrs
            config.items.each(function (key) {
                //voeg aan de bestaande li elemaneten (#animatie li) een alt, nu kunnen ze matchen met de nrs
                config.items.eq(key).attr('alt', key);
                config.animatieWrapper.append('<li alt="' + (key) + '">' + (key + 1) + '</li>');
            });
            config.animatieWrapper.after('<div style="clear:both;"/>');

            $('#s-animatie_nr li:first').addClass('selected');
            config.nrs = $('#s-animatie_nr');

            //kijk of er meer dan 1 item aanwezig is
            //wanneer dit zo is dan mag de slider gaan bewegen
           if(config.items.length > 1) {
                //click event voor de nrs
                $('#s-animatie_nr li:not(.selected)').live('click', function (e) {
                    //stop de timers
                    elem.stopTime('slideshow');
                    elem.stopTime('reinit');

                    //als er voor 2 sec niks is gedaan, gewoon doorgaan.
                    elem.oneTime((options.interval + 1000), 'reinit', function () {
                        obj._route();
                    });

                    //ROUTES
                    //wanneer we in vertical modus zitten
                    if (options.sliderType == 'vertical') {
                        obj._slideVertical(false, false, e);

                        //geen slider maar fader
                    } else if (!options.easingSlide) {

                        //fade effect
                        if (options.sliderType == 'fade') {
                            obj._fade(false, false, e);

                            //mozik effect
                        } else if (options.sliderType == 'mozik') {
                            obj._fade(false, false, e);
                        }
                    } else {
                        //de slide uitvoeren
                        obj._slide($(this).attr('alt'));
                    }
                });
            }


        }, //eind initNrs()

        _route: function () {

            //vars
            var obj = this;
            var config = this.config;
            var elem = this.element;
            var options = this.config.options;

            //kijk of er meer dan 1 item aanwezig is
            //wanneer dit zo is dan mag de slider gaan bewegen
           if(config.items.length > 1) {

                //eerst 1 timeout, voordat we gaan beginnen, 
                //daarna nemen we de animatie time ook mee, anders loopt hij niet op de seconde goed
                elem.oneTime(options.interval, 'slideshow', function () {
                    //cancel oneTime
                    $(this).stopTime('slideshow');

                    //afhankelijk van het type van boven(vertical) of van de zijkant(horizontal) komen
                    if (options.sliderType == 'vertical') {
                        obj._slideVertical();
                        //vervolg slides
                        elem.everyTime((options.interval) + (options.animationTime), 'slideshow', function () {
                            obj._slideVertical();
                        });

                        //geen slider maar fader
                    } else if (!options.easingSlide) {

                        //fade effect
                        if (options.sliderType == 'fade') {
                            obj._fade();
                            //vervolg slides
                            elem.everyTime((options.interval) + (options.animationTime), 'slideshow', function () {
                                obj._fade();
                            });

                            //mozik effect
                        } else if (options.sliderType == 'mozik') {
                            obj._fade();
                            //vervolg slides
                            elem.everyTime((options.interval) + (options.animationTime), 'slideshow', function () {
                                obj._fade();
                            });
                        }
                    } else {
                        obj._slide();
                        //vervolg slides
                        elem.everyTime((options.interval) + (options.animationTime), 'slideshow', function () {
                            obj._slide();
                        });
                    }

                });
            }

        }, //eind _startSlide()

        _reInitItems: function (item) {
            //vars
            var obj = this;
            var config = this.config;
            var elem = this.element;
            var options = this.config.options;

            //slide mode
            if (options.easingSlide && options.sliderType == 'horizontal') {
                //nieuwe curitem instellen
                var newCurItem = config.items.eq(item);
                this.config.curItem = newCurItem.length == 0 ? config.items.eq(0) : newCurItem;

                //nextItem instellen
                var newNextItem = config.curItem.next();
                this.config.nextItem = newNextItem.length == 0 ? config.items.eq(0) : newNextItem;

                //nextItem instellen
                var newPrevItem = config.curItem.prev();
                this.config.prevItem = newPrevItem.length == 0 ? config.items.eq(config.totaal - 1) : newPrevItem;

                //fade mode
            } else {
                this.config.items = elem.children('li');
                this.config.prevItem = this.element.children('li').eq(config.totaal - 1);
                this.config.curItem = this.element.children('li').eq(0);

                var newNextItem = config.curItem.next();
                this.config.nextItem = newNextItem.length == 0 ? config.items.eq(0) : newNextItem;

                this.config.lastItem = this.element.children('li').eq(this.config.totaal - 1);
            }


        }, //eind _reInitItems()

        _reSortNr: function (item) {

            //vars
            var obj = this;
            var config = this.config;
            var elem = this.element;
            var options = this.config.options;

            if (options.easingSlide && options.sliderType == 'horizontal') {
                item = config.items.eq(item);
            } else {
                item = item || false;
            }

            if (item.length) {
                this.config.nrs.children('li').removeClass('selected');
                this.config.nrs.find('[alt="' + item.attr('alt') + '"]').addClass('selected');
            } else {
                this.config.nrs.children('li').removeClass('selected');
                this.config.nrs.find('[alt="' + this.config.curItem.attr('alt') + '"]').addClass('selected');
            }
        }, //eind _reSortNr(item)

        destroy: function () {

        }, //einsd destroy

        onComplete: function (item, items) {
            //vars
            var obj = this;
            var config = this.config;
            var elem = this.element;
            var options = this.config.options;

            if (options.overlay.status) {
                $('#s-overlayContent .title').text(item.find('.title').text());
                $('#s-overlayContent .text').text(item.find('.text').text());
                $('#s-overlayContent .more').text(item.find('.more').text()).attr('href', item.find('.more').attr('href'));
            }
        },

        onStart: function (item, items) {
            //vars
            var obj = this;
            var config = this.config;
            var elem = this.element;
            var options = this.config.options;
        },

        onClick: function (item, items) {
            //vars
            var obj = this;
            var config = this.config;
            var elem = this.element;
            var options = this.config.options;

        }
    });
})(jQuery);