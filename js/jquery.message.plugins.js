// jQuery plugins ==============================================================

(function($) {
	
	jQuery.fn.griddit2 = function(options){
		
		/*
		USAGE		: if( $('.canvas').length ) $(this).griddit2({ <option overrides> }); NOTE: assumes Modernizr
		WHAT IT DO	: Uses canvas to draw a grid on top of the page. Toggle it on & off with the [ESC] key.
		*/
		
		var defaults 		= {
				fullWidth	: false,
				leftOffset	: 0,
				height		: Math.max( $(window).height(), $('html').height() ),
				cols		: 12,
				colWidth	: 60,
				gutterwidth	: 20,
				colColor	: "rgba(67,113,164,0.1)",
				vertical	: 10
			},
			opts 			= $.extend(defaults, options),
			w 				= ( !opts.fullWidth ) ? (opts.colWidth * opts.cols) + ( (opts.cols - 1) * opts.gutterwidth ) : $(window).width(),
			left			= ( !opts.fullWidth ) ? Math.floor( ($(window).width() / 2) - (w / 2) ) : 0,
			frag			= '<canvas id="grid-cols" width="' + w + '" height="' + opts.height + '" style="position: fixed; top: 0; left: ' + left + 'px"></canvas>',
			canvas			= null,
			ctx				= null;
			
		// attach the canvas & set vars
		$('body').append(frag);
		canvas 			= document.getElementById("grid-cols");
		ctx 			= canvas.getContext("2d");
		ctx.fillStyle 	= opts.colColor;
			
		// draw vertical columns
		if( !opts.fullWidth ) {
			// if not a fullscreen grid, draw necessary no of cols
			for (var i = 0; i < defaults.cols; i++) {
				ctx.fillRect (i * (opts.colWidth + opts.gutterwidth), 0, opts.colWidth, opts.height);
			}
		} else {
			// else, draw cols until the screen is filled
			var i = 0;
			while ( (i * (opts.colWidth + opts.gutterwidth)) < w ) {
				ctx.fillRect (i * (opts.colWidth + opts.gutterwidth) + opts.leftOffset, 0, opts.colWidth, opts.height);
				i++;
			}
			opts.cols = i;
		}
		
		// draw horizontal lines
		ctx.strokeStyle 	= opts.colColor;
		ctx.lineWidth 		= 1;
		ctx.beginPath();
		for (var i = 0; i < (opts.height / opts.vertical); i++) {
			var y = (i * opts.vertical) + 0.5;
			ctx.moveTo(0, y);
			ctx.lineTo(w, y);
		};
		ctx.stroke();
		
		// print info to canvas
		ctx.fillStyle 		= 'rgba(0,0,0,0.7)';
		ctx.font 			= '14px Myriad pro, Helvetica, Arial, sans-serif';
		ctx.textBaseline 	= 'bottom';
		ctx.fillText('GRIDDIT2 by @rike: grid is ' + w + 'px wide / ' + opts.cols + ' cols @ ' + opts.colWidth + 'px wide / gutters ' + opts.gutterwidth + 'px wide / vertical grid ' + opts.vertical + 'px high', opts.gutterwidth, opts.height - opts.gutterwidth);
		
		// hide the grid, make it togglable using the ESC key
		$(canvas).hide();
		$('html').keyup(function(event) {
			if(event.keyCode == 27){
				if( $(canvas).is(':visible') ){
					$(canvas).hide();
				}else{
					$(canvas).show();
				}
			}
		});
	}
	
})(jQuery);

(function($) {
	
	jQuery.fn.defaultValueInput = function(){
		
		/*
		USAGE		: $('<inputs to apply functionality to>').defaultValueInput();
		WHAT IT DO	: Uses an inputs 'value' attr as it's default value - removing it when the input is clicked, returning it if no text input is made.
		*/
		
		for (var i=0; i < $(this).length; i++) {
			$(this[i]).data('defaultValue', $(this[i]).attr('value'));
			$(this[i]).addClass('default-value');
		};
		$(this).focus(function(){
			if( $(this).attr('value') == $(this).data('defaultValue') ){
				$(this).attr('value', '');
				$(this).removeClass('default-value');
			}
		});
		$(this).blur(function(){
			if( $(this).attr('value') == '' || $(this).attr('value') == $(this).data('defaultValue') ){
				$(this).attr('value', $(this).data('defaultValue'));
				$(this).addClass('default-value');
			}
		});
	}
	
})(jQuery);

(function($) {
	
	jQuery.fn.biggerClick = function(){
		
		/*
		USAGE		: $('#make-these-hot ul li').biggerClick();
		WHAT IT DO	: Makes a container 'hot', and binds its click event to go to the location of the first <a>'s href within it.
		*/
		
		$(this)
			.hover(
				function(){
					$(this).addClass("hover");
				},function(){
					$(this).removeClass("hover");
				}
			)
			.click(function(){
				window.location = $(this).find("a:first").attr("href");
			});
	}
	
})(jQuery);


// Script utils ==============================================================

var scriptUtils = function () {
	
	var author = "@rike",
	
	randRange = function(minNum, maxNum) {
		return (Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
	};
	
	// < IE8 doesn't have the Array.prototype.indexOf method, define it here
	if(!Array.prototype.indexOf) {
		Array.prototype.indexOf = function(needle) {
			for(var i = 0; i < this.length; i++) {
				if(this[i] === needle) {
				return i;
				}
			}
			return -1;
		};
	}
	
	return { randRange: randRange }
	
}();

