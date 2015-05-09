$(function() {

	 /********** forex articles ************/
	$( "#forexArticles li" ).bind('click',function(e){
		var index = $(this).index();
		var pannelId = '#pannel_forexArticle'+index;
		showCurrentPannel(e,'forexArticles','pannel_forexArticle', pannelId, index);
	});
 	/********** forex select ************/
	$( "#selforex" ).bind('change',function(e){
		var index = $("#selforex").get(0).selectedIndex;
		var pannelId = '#pannel_forexArticle'+index;
		showCurrentPannel(e,'forexArticles','pannel_forexArticle', pannelId, index);
	});

	/********** pivot points ************/
	$( "#pivotPoints li" ).bind('click',function(e){
		var index = $(this).index();
		var pannelId = '#pannel_pivotPoint'+index;
        var event = e || window.event;
        var target = event.currentTarget || event.target;
        if (typeof target.id != 'undefined' && target.id) {
            var type = target.id.replace('pivotPoints_','');
        }
        else {
            var type = $(event.target).parent().attr('id').replace('pivotPoints_','');
        }
        PivotPoints_common_WithAjax(type,pannelId.substring(1));
		showCurrentPannel(e,'pivotPoints','pannel_pivotPoint', pannelId, index);
	});

    $("#selforex_pivotPoints").change(function(e){
        var type = $(this).val();
        var index = $(this).get(0).selectedIndex;
        var pannelId = '#pannel_pivotPoint'+index;
        PivotPoints_common_WithAjax(type,pannelId.substring(1));
        showCurrentPannel(e,'pivotPoints','pannel_pivotPoint', pannelId, index);
    });

 	/********** Live Rates ************/
	$( "#liveRates li" ).bind('click',function(e){
		var index = $(this).index();
		var pannelId = '#pannel_liveRate'+index;
        var event = e || window.event;
        var target = event.currentTarget || event.target;
        if (typeof target.id != 'undefined' && target.id) {
            var type = target.id.replace('liveRates_','');
        }
        else {
            var type = $(event.target).parent().attr('id').replace('liveRates_','');
        }

        LiveRates_common_WithAjax(type,pannelId.substring(1));
		showCurrentPannel(e,'liveRates','pannel_liveRate', pannelId, index);
	});

    $("#selforex_liveRates").change(function(e){
        var type = $(this).val();
        var index = $(this).get(0).selectedIndex;
        var pannelId = '#pannel_liveRate'+index;
        LiveRates_common_WithAjax(type,pannelId.substring(1));
        showCurrentPannel(e,'liveRates','pannel_liveRate', pannelId, index);
    });

 	/********** TOP INSIDER TRANSACTIONS ************/
	$( "#insiderTransactions li" ).bind('click',function(e){
		var index = $(this).index();
		var pannelId = '#pannel_insiderTransaction'+index;
        var event = e || window.event;
        var target = event.currentTarget || event.target;
        if (typeof target.id != 'undefined' && target.id) {
            var type = target.id.replace('insiderTransactions_','');
        }
        else {
            var type = $(event.target).parent().attr('id').replace('insiderTransactions_','');
        }
        insiders_lab_data(type,pannelId.substring(1));
		showCurrentPannel(e,'insiderTransactions','pannel_insiderTransaction', pannelId, index);
	});

    $("#selforex_insiderTransactions").change(function(e){
        var type = $(this).val();
        var index = $(this).get(0).selectedIndex;
        var pannelId = '#pannel_insiderTransaction'+index;
        insiders_lab_data(type,pannelId.substring(1));
        showCurrentPannel(e,'insiderTransactions','pannel_insiderTransaction', pannelId, index);
    });




 	/**********  more Slideshows ************/
	$( "#moreSlideshows li" ).bind('click',function(e){
		var index = $(this).index();
		var pannelId = '#pannel_moreSlideshow'+index;
		showCurrentPannel(e,'moreSlideshows','pannel_moreSlideshow', pannelId, index);
	});

 	/********** More Slideshow select ************/
	$( "#selMoreslideshows" ).bind('change',function(e){
		var index = $("#selMoreslideshows").get(0).selectedIndex;
		var pannelId = '#pannel_moreSlideshow'+index;
		showCurrentPannel(e,'moreSlideshows','pannel_moreSlideshow', pannelId, index);
	});






 	/********** Carousel ************/
	$( "#Carousels li" ).bind('click',function(e){
		var index = $(this).index();
		var pannelId = '#pannel_carousel'+index;
		showCurrentPannel(e,'Carousels','pannel_carousel', pannelId, index);
	});

	$( "#Carousels li" ).bind('mouseenter',function(){
		carouselobject.hoverFlag = false;
		clearInterval(carouselobject.delay);
	});
	
	$( "#Carousels li" ).bind('mouseleave',function(){
		carouselobject.hoverFlag = true;
 		var forex_length = $( "#Carousels").find('li').length;
	 	for(var j =0; j < forex_length;j++){
	 		var flag = $($( "#Carousels" ).find('li')[j]).hasClass( "selected" );
	 		if(flag){
	 			carouselobject.step = j;
	 			return;
	 		}
	 	}
	});
	/********** Carousel end ************/

 	/********** More Video ************/
	$( "#moreVideos li" ).bind('click',function(e){
		var index = $(this).index();
		var pannelId = '#pannel_moreVideo'+index;
		showCurrentPannel(e,'moreVideos','pannel_moreVideo', pannelId, index);
	});

 	/********** More Video select ************/
	$( "#selMorevideos" ).bind('change',function(e){
		var index = $("#selMorevideos").get(0).selectedIndex;
		var pannelId = '#pannel_moreVideo'+index;
		showCurrentPannel(e,'moreVideos','pannel_moreVideo', pannelId, index);
	});

 	/********** Active Trading Carousel ************/


 	/********** carousel timer start **********/
 	$( "#timer_prev" ).bind('mousedown', function() {
 		prevCarousel('Carousel');
		carouselobject.timer_step = 1;
		clearInterval(carouselobject.timer_time);
 	});

 	$( "#timer_next" ).bind('mousedown', function() {
 		nextCarousel('Carousel');
		carouselobject.timer_step = 1;
		clearInterval(carouselobject.timer_time);
 	});

	$( "#Carousel" ).bind('mouseenter',function(){
		carouselobject.timer_hoverFlag = false;
		clearInterval(carouselobject.timer_time);
	});
	
	$( "#Carousel" ).bind('mouseleave',function(){
		carouselobject.timer_hoverFlag = true;
	});
	/********** carousel timer end **********/



/*    $(window).resize(function() {
        for(var i = 0; i < $("#Carousel").children().length; i++){
            if($("#Carousel").children()[i].style.left != carouselobject.nowleft){
                var width1 = '-'+$("#Carousel").width()+'px';
                console.log(i);
                $($("#Carousel").children()[i]).css({'visibility':'hidden'});
            }
        }
    });*/

});

