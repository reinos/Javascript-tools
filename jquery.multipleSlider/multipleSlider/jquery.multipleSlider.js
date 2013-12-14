(function($){
	$.fn.multipleSlider = function(options){
		
		var settings = $.extend({
			interval:1000,
			type:'header',
			arrows:false,
			arrowLeft:'',
			arrowRight:'',
			items:4,
			slideItems:1,
			easing:'swing',
			circular:false ,
			animationTime:500
		},options||{});
		
		//easing methods
		switch(options.easing){
			case 'bounce':
				settings.easing = 'easeOutBounce';
				break;
			case 'linear':
				settings.easing = 'linear';
				break;
			case 'quart':
				settings.easing = 'easeOutQuart';
				break;
			case 'cubic':
				settings.easing = 'easeOutCubic';
				break;
			case 'quint':
				settings.easing = 'easeOutQuint';
				break;
			case 'sine':
				settings.easing = 'easeOutSine';
				break;
			case 'back':
				settings.easing = 'easeOutBack';
				break;
			case 'expo':
				settings.easing = 'easeOutExpo';
				break;
			case 'circ':
				settings.easing = 'easeOutCirc';
				break;
			case 'elastic':
				settings.easing = 'easeOutElastic';
				break;
			case 'swing':
				settings.easing = 'swing';
				break;
			default: 
				settings.easing = 'swing' ;
		}
		
		return this.each(function(){
			
			//wanneer er geen item is op de slider op toe te passen, false returnen
			if(!$(this).length) {
				return false;	
			}
			
			//init, alle vars aanmaken
			var $item = $(this);
			var $this = this;
			
			//wanneer alle plaatjes zijn geladen, slider toepassen
			//$item.find('img').filter(':last').load(function(){			
			
				//display weer op block zetten, is een fix voor het klappen
				$item.css({display:'block'});
				
				//init, alle vars aanmaken
				var $items = $item.find('li');
				var totaal = $items.length;
				var $curItem = $item.find('li').eq(0);
				var $lastItem = $item.find('li').eq(totaal-1);
				var $width = $curItem.find('img').width();
				var $height = $curItem.height();
				var $nrs;
				//var $sliceItem = $item.find('li').eq(settings.items);
				var $sliceItem = $items.slice(settings.items, settings.items+settings.slideItems);
				//is in animation
				var isAnimation = false;
				//queue the animations
				var clickSpeed = 250;
				
				//wrap alles
				$item.wrap('<div id="multipleSliderWrapper" style="position:relative;"/>');
				$multipleSliderWrapper = $('#multipleSliderWrapper');
				
				/**
				 * arrowLeft
				 */
				if(settings.arrowLeft) {	
					//load the arrow image
					$multipleSliderWrapper.append('<img style="display:none;" id="imageLoader" src="'+settings.arrowLeft+'"/>');
					//wanneer de arrow image is geladen:
					$('#imageLoader').load(function(){
						$multipleSliderWrapper.prepend('<div id="arrowLeft"/>');
						//style
						$('#arrowLeft').css({
							cursor:'pointer',
							float:'left',
							width:$('#imageLoader').width(),
							height:$('#imageLoader').height(),
							background:'url('+settings.arrowLeft+')'
						});
						//remove clone
						$('#imageLoader').remove();
						
						//click events naar rechts (reserve)
						$('#arrowLeft').click(function(){
							
							//stop de timers
							$item.stopTime('slideshow');
							$item.stopTime('reinit');
							
							//als er voor 2 sec niks is gedaan, gewoon doorgaan.
							$item.oneTime((settings.interval+1000), 'reinit', function(){
								startSlide();
							});
							
						   //de slide uitvoeren
							slideRes(1);
															
						});
					});
					
					//de lijst op float zetten
					$item.css({
						float:'left'
					});
				}
				
				/**
				 * arrowRight
				 */
				if(settings.arrowRight) {	
					//load the arrow image
					$multipleSliderWrapper.append('<img style="display:none;" id="imageLoader" src="'+settings.arrowRight+'"/>');
					//wanneer de arrow image is geladen:
					$('#imageLoader').load(function(){
						$multipleSliderWrapper.append('<div id="arrowRight"/>');
						//style
						$('#arrowRight').css({
							cursor:'pointer',
							float:'left',
							width:$('#imageLoader').width(),
							height:$('#imageLoader').height(),
							background:'url('+settings.arrowRight+')'
						});
						$('#imageLoader').remove();
						
						$multipleSliderWrapper.append('<div style="clear:both;"/>');
						
						//click events neer links
						$('#arrowRight').click(function(){
							//stop de timers
							$item.stopTime('slideshow');
							$item.stopTime('reinit');
							
							//als er voor 2 sec niks is gedaan, gewoon doorgaan.
							$item.oneTime((settings.interval+1000), 'reinit', function(){
								startSlide();
							});
							
							//de slide uitvoeren
							slide(1);
						});					
					});				
				}
				
				//zet de css style voor de ul
				$item.css({
					margin:0,
					padding:0,
					listStyle:'none',
					overflow:'hidden',
					position:'relative',
					width:$width*settings.items,
					height:$height
				});
				//zet de css styel voor de li`s
				$items.css({
					position:'absolute',
					width:$width,
					height:$height
				});
				
	
				/**
				 * bereken het aantal clones wanneer er te weinig zijn om te laten zien\
				 * @todo dynamich aanpassen van het aantal, nu kopierd hij alles gewoon 1 keer
				 */
				var totalClones = settings.items-totaal;
				if(totalClones > 0) {
					$item.append($items.clone());
					_reInitItems();
				}
				
				//zet de margin die tussen de plaatjes moet komen
				var margin = Math.round(($item.width()-(settings.items*$width))/(settings.items-1));
				$items.each(function(key){
					//alleen de fotos die zichtbaar moeten komen positioneren
					//if(key+1 <= settings.items) {
						if(key == 0) {
							$(this).css({left:0});
						} else {
							$(this).css({
								left:(key*margin)+($width*key)
							});
						}
						
						
//					} else {
//						$(this).css({
//							left:$item.width()
//						});
//					}
				});
				//het aantal items dat niet zichtbaar zijn
				var hiddenItems = totaal-settings.items;
				
				
				//reinit de curitem en lastitem
				function _reInitItems() {
					$items = $item.find('li');
					totaal = $items.length;
					$curItem = $item.find('li:first');
					$lastItem = $item.find('li').eq(totaal-1);
					//$sliceItem = $item.find('li').eq(settings.items);
					$sliceItem = $items.slice(settings.items, settings.items+settings.slideItems);
					
					//console.log($items.slice(settings.items, settings.items+settings.slideItems));
				}						
	
				//de slide function
				function slide(queue) {
	
					//als er op de nrs is geklikt mag hij wel doorschieten 
					queue = queue||false;
					
					//als hij gequeued (meerdere items) is dan time omlaag zetten
					if(queue) {
						animationTime = clickSpeed;
						easingMethod = 'linear';
											
					} else {
						animationTime = settings.animationTime;	
						easingMethod = settings.easing;
					}
	
					//als er geen animatie in de que zit
					if(!isAnimation) {
						isAnimation = true;
						
						//reset all vars
						_reInitItems();
	
						//clones worden alleen gemaakt wanneer er precies genoeg items zijn
						//clone de eerste en zet hem op de laatste plek
						var clone = true;
						var $clonesOrig = $items.slice(0,settings.slideItems);
						var $clones = $clonesOrig.clone().appendTo($item).addClass('clone');
						
						//reset all vars
						_reInitItems();	

						   
						//zet de position goed van de clone
						if(clone) {
							$clones.each(function(key){
								$(this).css({
									left:($item.width())+((key+hiddenItems)*$width)
								});
							});	
						}
						
						//animeer alles naar links
						$items.stop().animate({
							left:'-='+($width+margin)*settings.slideItems
						},{
							duration:settings.animationTime,
							easing:settings.easing,
							complete:function(){  
								//wanneer het clones zijn deze ook verwijderen
								if(clone) {
									$clonesOrig.remove();
								} else {
									$item.append($clonesOrig)
								}
								
								$curItem = $($this).find('li').eq(0);
								
								$('.clone').removeClass('clone');
 
								isAnimation = false;
							}
						});						
					}	
				};
				
				//slide in andere volgorde, van achter naar voren
				function slideRes(queue){
									
					//als er op de nrs is geklikt mag hij wel doorschieten 
					queue = queue||false;
									
					//als hij gequeued (meerdere items) is dan time omlaag zetten
					if(queue) {
						animationTime = clickSpeed;
						easingMethod = 'linear';
											
					} else {
						animationTime = settings.animationTime;	
						easingMethod = settings.easing;
					}
					
					//als er geen animatie in de que zit
					if(!isAnimation) {
						isAnimation = true;
						//clones worden alleen gemaakt wanneer er precies genoeg items zijn
												
						//reset all vars
						_reInitItems();	
						
						
						//clone de eerste en zet hem op de laatste plek
						var clone = true;
						var $clonesOrig = $items.slice(-settings.slideItems);

						var $clones = $clonesOrig.clone().prependTo($item).addClass('clone');
						//$lastItem.clone().prependTo($item).addClass('clone');
						
						//reset all vars
						_reInitItems();	
												
						//zet de positio goed van de clone
						if(clone) {
							$($clones.get().reverse()).each(function(key){
								$(this).css({
									left:'-'+$width*(key+1)+'px'
								});
							});
							
						} 								
						
						//animeer alles naar links
						$items.stop().animate({
							left:'+='+($width+margin)*settings.slideItems
						}, {
							duration:settings.animationTime,
							easing:settings.easing,
							complete:function(){
							
								//als er clones aanwezig zijn
								if(clone) {
									$clonesOrig.remove();
									$('.clone').removeClass('clone');
								}
								
								//reset all vars
								_reInitItems();	
								
								//mag weer geanimeerd worden
								isAnimation = false;
							}
						});
					}							
				}
				
				//start van de time voor de slide
				function startSlide (){
					//eerst 1 timeout, voordat we gaan beginnen, 
					//daarna nemen we de animatie time ook mee, anders loopt hij niet op de seconde goed
					$item.oneTime(settings.interval, 'slideshow', function(){
						slide();
						//vervolg slides
						$($this).everyTime((settings.interval-1)+(settings.animationTime), 'slideshow', function(){
							slide();
						});
					});
				
				};
				
				//start de slide
				startSlide();
//			});
		});
	};		
})(jQuery);       
