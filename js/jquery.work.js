jQuery(

  function ($) {
	  
    $.Body = $('body');   
    $.Window = $(window); 
	$.Document = $(document);  
    $.Scroll = ($.browser.mozilla || $.browser.msie) ? $('html') : $.Body;
    $.Mobile = ($.Body.hasClass('webkit-mobile') || (navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i))),
    $.Unsupported = $.Body.hasClass('unsupported-browser');
	$('[data-controller]').Instantiate();
	
	//鼠标移进Titile时停止动画
	$('.header1,.header2,.header3,.header4, .header5').bind('mouseenter', function()
	{
		//$(this).stop().animate({'height': '200'}, 600, 'easeInOutQuart');
		$(".headers_arrow").stop().animate({'top': '0'}, 600, 'easeInOutQuart');
	});
	//鼠标离开Titile时停止动画
	$('.header1,.header2,.header3,.header4, .header5').bind('mouseleave', function()
	{
		//$(this).stop().animate({'height': '40'}, 600, 'easeInOutQuart');
		$(".headers_arrow").stop().animate({'top': '-16px'}, 600, 'easeInOutQuart');
	});
	
	//延迟加载图片
	$('img.lazy').lazyload({effect:'fadeIn',container:$('#seccion1')});
	
	//左侧导航滑入动画延迟 + 内容区进入延迟
	$('#menu').delay(0).animate({'left': '0'}, 0, 'easeInOutQuart',function()
	{
		$('#containerSecciones').stop().animate({'width':$.Window.width() - 200}, 1000, 'easeInOutQuart');
		
		$('#seccion1, .header1').stop().animate({'left': '0'}, 1000, 'easeInOutQuart',function()
		{	
			//$('img.lazy').lazyload({effect:'fadeIn',container:$('#seccion1')});
			$('img.lazy').lazyload({effect:'fadeIn',container:$('#seccion2')});
			$('img.lazy').lazyload({effect:'fadeIn',container:$('#seccion3')});
			$('img.lazy').lazyload({effect:'fadeIn',container:$('#seccion4')});
			$('img.lazy').lazyload({effect:'fadeIn',container:$('#seccion5')});
		});
		$('#seccion2, .header2').stop().animate({'left': '1100'}, 1000,'easeInOutQuart');
		$('#seccion3, .header3').stop().animate({'left': '2200'}, 1000,'easeInOutQuart');
		$('#seccion4, .header4').stop().animate({'left': '3300'}, 1000,'easeInOutQuart');
		$('#seccion5, .header5').stop().animate({'left': '4400'}, 1000,'easeInOutQuart');
	});
	
	//默认菜单滑入动画同步延迟
	$('#menuSeccion1').delay(0).animate({'left': '14'}, 500, 'easeInOutQuart');
	
	
	// 企业网站 <!-- 主菜单一 / 次级菜单一 / 内容一事件 -->
	$('#default_nav a').bind('click',function(e)
	{
		num = $(this).parent().attr('id-menu');
		val = 0;
		delay = 0;
		
		for( i = 1; i < num; i++ )
		{
			val += $('#'+'workcont_1_'+i).height(); 
		}
		
		if(num != 1) $('#seccion1').stop().animate({ scrollTop : (val + delay) }, 1000, 'easeInOutQuart');
		else $('#seccion1').stop().animate({ scrollTop : 0 }, 1000, 'easeInOutQuart');
		
		e.preventDefault();
	});
	$('#seccion1').bind('scroll',function(e)
	{
		
		if( $('#workcont_1_2').offset().top < $.Window.height() / 2 && $('#workcont_1_3').offset().top > $.Window.height() / 2 )
		{
			$('#menuSeccion1 li').removeClass('active');
			$('#worknav_1_2').addClass('active');
		}
		else if( $('#workcont_1_3').offset().top < $.Window.height() / 2 && $('#workcont_1_4').offset().top > $.Window.height() / 2 )
		{
			$('#menuSeccion1 li').removeClass('active');
			$('#worknav_1_3').addClass('active');
		}
		else if( $('#workcont_1_4').offset().top < $.Window.height() / 2 && $('#workcont_1_5').offset().top > $.Window.height() / 2 )
		{
			$('#menuSeccion1 li').removeClass('active');
			$('#worknav_1_4').addClass('active');
		}
		else if( $('#workcont_1_5').offset().top < $.Window.height() / 2 && $('#workcont_1_6').offset().top > $.Window.height() / 2 )
		{
			$('#menuSeccion1 li').removeClass('active');
			$('#worknav_1_5').addClass('active');
		}
		else if( $('#workcont_1_6').offset().top < $.Window.height() / 2 && $('#workcont_1_7').offset().top > $.Window.height() / 2 )
		{
			$('#menuSeccion1 li').removeClass('active');
			$('#worknav_1_6').addClass('active');
		}
		else if( $('#workcont_1_7').offset().top < $.Window.height() / 2 && $('#workcont_1_8').offset().top > $.Window.height() / 2 )
		{
			$('#menuSeccion1 li').removeClass('active');
			$('#worknav_1_7').addClass('active');
		}
		else if( $('#workcont_1_8').offset().top < $.Window.height() / 2 && $('#workcont_1_9').offset().top > $.Window.height() / 2 )
		{
			$('#menuSeccion1 li').removeClass('active');
			$('#worknav_1_8').addClass('active');
		}
		else if( $('#workcont_1_9').offset().top < $.Window.height() / 2 && $('#workcont_1_10').offset().top > $.Window.height() / 2 )
		{
			$('#menuSeccion1 li').removeClass('active');
			$('#worknav_1_9').addClass('active');
		}
		else if( $('#workcont_1_10').offset().top < $.Window.height() / 2 && $('#workcont_1_11').offset().top > $.Window.height() / 2 )
		{
			$('#menuSeccion1 li').removeClass('active');
			$('#worknav_1_10').addClass('active');
		}
		else if( $('#workcont_1_11').offset().top < $.Window.height() / 2 && $('#workcont_1_12').offset().top > $.Window.height() / 2 )
		{
			$('#menuSeccion1 li').removeClass('active');
			$('#worknav_1_11').addClass('active');
		}
		else if( $('#workcont_1_12').offset().top < $.Window.height() / 2 && $('#workcont_1_13').offset().top > $.Window.height() / 2 )
		{
			$('#menuSeccion1 li').removeClass('active');
			$('#worknav_1_12').addClass('active');
		}
		else if( $('#workcont_1_13').offset().top < $.Window.height() / 2 && $('#workcont_1_14').offset().top > $.Window.height() / 2 )
		{
			$('#menuSeccion1 li').removeClass('active');
			$('#worknav_1_13').addClass('active');
		}
		else if( $('#workcont_1_14').offset().top < $.Window.height() / 2 )
		{
			$('#menuSeccion1 li').removeClass('active');
			$('#worknav_1_14').addClass('active');
		}
		else
		{
			$('#menuSeccion1 li').removeClass('active');
			$('#worknav_1_1').addClass('active');
		}
		
	});
	
	
	// 系统平台 <!-- 主菜单二 / 次级菜单二 / 内容二事件 -->
	$('#menuSeccion2 a').bind('click',function(e)
	{
		num = $(this).parent().attr('id-menu');
		val = 0;
		delay = 0;
		
		for( i = 1; i < num; i++ )
		{
			val += $('#'+'workcont_2_'+i).height(); 
		}
		
		if(num != 1) $('#seccion2').stop().animate({ scrollTop : (val + delay) }, 1000, 'easeInOutQuart');
		else $('#seccion2').stop().animate({ scrollTop : 0 }, 1000, 'easeInOutQuart');
		
		e.preventDefault();
	});
	
	$('#seccion2').bind('scroll',function(e)
	{
		if( $('#workcont_2_2').offset().top < $.Window.height() / 2 && $('#workcont_2_3').offset().top > $.Window.height() / 2 )
		{
			$('#menuSeccion2 li').removeClass('active');
			$('#worknav_2_2').addClass('active');
		}
		else if( $('#workcont_2_3').offset().top < $.Window.height() / 2 && $('#workcont_2_4').offset().top > $.Window.height() / 2 )
		{
			$('#menuSeccion2 li').removeClass('active');
			$('#worknav_2_3').addClass('active');
		}
		else if( $('#workcont_2_4').offset().top < $.Window.height() / 2 && $('#workcont_2_5').offset().top > $.Window.height() / 2 )
		{
			$('#menuSeccion2 li').removeClass('active');
			$('#worknav_2_4').addClass('active');
		}
		else if( $('#workcont_2_5').offset().top < $.Window.height() / 2 && $('#workcont_2_6').offset().top > $.Window.height() / 2 )
		{
			$('#menuSeccion2 li').removeClass('active');
			$('#worknav_2_5').addClass('active');
		}
		else if( $('#workcont_2_6').offset().top < $.Window.height() / 2 && $('#workcont_2_7').offset().top > $.Window.height() / 2 )
		{
			$('#menuSeccion2 li').removeClass('active');
			$('#worknav_2_6').addClass('active');
		}
		else if( $('#workcont_2_7').offset().top < $.Window.height() / 2 && $('#workcont_2_8').offset().top > $.Window.height() / 2 )
		{
			$('#menuSeccion2 li').removeClass('active');
			$('#worknav_2_7').addClass('active');
		}
		else if( $('#workcont_2_8').offset().top < $.Window.height() / 2 && $('#workcont_2_9').offset().top > $.Window.height() / 2 )
		{
			$('#menuSeccion2 li').removeClass('active');
			$('#worknav_2_8').addClass('active');
		}
		else if( $('#workcont_2_9').offset().top < $.Window.height() / 2 && $('#workcont_2_10').offset().top > $.Window.height() / 2 )
		{
			$('#menuSeccion2 li').removeClass('active');
			$('#worknav_2_9').addClass('active');
		}
		else if( $('#workcont_2_10').offset().top < $.Window.height() / 2 && $('#workcont_2_11').offset().top > $.Window.height() / 2 )
		{
			$('#menuSeccion2 li').removeClass('active');
			$('#worknav_2_10').addClass('active');
		}
		else if( $('#workcont_2_11').offset().top < $.Window.height() / 2 && $('#workcont_2_12').offset().top > $.Window.height() / 2 )
		{
			$('#menuSeccion2 li').removeClass('active');
			$('#worknav_2_11').addClass('active');
		}
		else if( $('#workcont_2_12').offset().top < $.Window.height() / 2 && $('#workcont_2_13').offset().top > $.Window.height() / 2 )
		{
			$('#menuSeccion2 li').removeClass('active');
			$('#worknav_2_12').addClass('active');
		}
		else if( $('#workcont_2_13').offset().top < $.Window.height() / 2 && $('#workcont_2_14').offset().top > $.Window.height() / 2 )
		{
			$('#menuSeccion2 li').removeClass('active');
			$('#worknav_2_13').addClass('active');
		}
		else if( $('#workcont_2_14').offset().top < $.Window.height() / 2 )
		{
			$('#menuSeccion2 li').removeClass('active');
			$('#worknav_2_14').addClass('active');
		}
		else
		{
			$('#menuSeccion2 li').removeClass('active');
			$('#worknav_2_1').addClass('active');
		}
		
	});
	
	
	
	// 产品类型 <!-- 主菜单3 / 次级菜单3 / 内容3事件 -->
	$('#menuSeccion3 a').bind('click',function(e)
	{
		num = $(this).parent().attr('id-menu');
		val = 0;
		delay = 0;
		
		for( i = 1; i < num; i++ )
		{
			val += $('#'+'workcont_3_'+i).height(); 
		}
		
		if(num != 1) $('#seccion3').stop().animate({ scrollTop : (val + delay) }, 1000, 'easeInOutQuart');
		else $('#seccion3').stop().animate({ scrollTop : 0 }, 1000, 'easeInOutQuart');
		
		e.preventDefault();
	});
	
	$('#seccion3').bind('scroll',function(e)
	{
		if( $('#workcont_3_2').offset().top < $.Window.height() / 2 && $('#workcont_3_3').offset().top > $.Window.height() / 2 )
		{
			$('#menuSeccion3 li').removeClass('active');
			$('#worknav_3_2').addClass('active');
		}
		else if( $('#workcont_3_3').offset().top < $.Window.height() / 2 && $('#workcont_3_4').offset().top > $.Window.height() / 2 )
		{
			$('#menuSeccion3 li').removeClass('active');
			$('#worknav_3_3').addClass('active');
		}
		else if( $('#workcont_3_4').offset().top < $.Window.height() / 2 && $('#workcont_3_5').offset().top > $.Window.height() / 2 )
		{
			$('#menuSeccion3 li').removeClass('active');
			$('#worknav_3_4').addClass('active');
		}
		else if( $('#workcont_3_5').offset().top < $.Window.height() / 2 && $('#workcont_3_6').offset().top > $.Window.height() / 2 )
		{
			$('#menuSeccion3 li').removeClass('active');
			$('#worknav_3_5').addClass('active');
		}
		else if( $('#workcont_3_6').offset().top < $.Window.height() / 2 && $('#workcont_3_7').offset().top > $.Window.height() / 2 )
		{
			$('#menuSeccion3 li').removeClass('active');
			$('#worknav_3_6').addClass('active');
		}
		else if( $('#workcont_3_7').offset().top < $.Window.height() / 2 && $('#workcont_3_8').offset().top > $.Window.height() / 2 )
		{
			$('#menuSeccion3 li').removeClass('active');
			$('#worknav_3_7').addClass('active');
		}
		else if( $('#workcont_3_8').offset().top < $.Window.height() / 2 && $('#workcont_3_9').offset().top > $.Window.height() / 2 )
		{
			$('#menuSeccion3 li').removeClass('active');
			$('#worknav_3_8').addClass('active');
		}
		else if( $('#workcont_3_9').offset().top < $.Window.height() / 2 && $('#workcont_3_10').offset().top > $.Window.height() / 2 )
		{
			$('#menuSeccion3 li').removeClass('active');
			$('#worknav_3_9').addClass('active');
		}
		else if( $('#workcont_3_10').offset().top < $.Window.height() / 2 && $('#workcont_3_11').offset().top > $.Window.height() / 2 )
		{
			$('#menuSeccion3 li').removeClass('active');
			$('#worknav_3_10').addClass('active');
		}
		else if( $('#workcont_3_11').offset().top < $.Window.height() / 2 && $('#workcont_3_12').offset().top > $.Window.height() / 2 )
		{
			$('#menuSeccion3 li').removeClass('active');
			$('#worknav_3_11').addClass('active');
		}
		else if( $('#workcont_3_12').offset().top < $.Window.height() / 2 )
		{
			$('#menuSeccion3 li').removeClass('active');
			$('#worknav_3_12').addClass('active');
		}
		else
		{
			$('#menuSeccion3 li').removeClass('active');
			$('#worknav_3_1').addClass('active');
		}
		
	});
	
	
	
	// 电商 <!-- 主菜单4 / 次级菜单4 / 内容4事件 -->
	$('#menuSeccion4 a').bind('click',function(e)
	{
		num = $(this).parent().attr('id-menu');
		val = 0;
		delay = 0;
		
		for( i = 1; i < num; i++ )
		{
			val += $('#'+'workcont_4_'+i).height(); 
		}
		
		if(num != 1) $('#seccion4').stop().animate({ scrollTop : (val + delay) }, 1000, 'easeInOutQuart');
		else $('#seccion4').stop().animate({ scrollTop : 0 }, 1000, 'easeInOutQuart');
		
		e.preventDefault();
	});
	
	$('#seccion4').bind('scroll',function(e)
	{
		if( $('#workcont_4_2').offset().top < $.Window.height() / 2 && $('#workcont_4_3').offset().top > $.Window.height() / 2 )
		{
			$('#menuSeccion4 li').removeClass('active');
			$('#worknav_4_2').addClass('active');
		}
		else if( $('#workcont_4_3').offset().top < $.Window.height() / 2 )
		{
			$('#menuSeccion4 li').removeClass('active');
			$('#worknav_4_3').addClass('active');
		}
		else
		{
			$('#menuSeccion4 li').removeClass('active');
			$('#worknav_4_1').addClass('active');
		}
		
	});
	
	
	
	
	
	// 其他类型<!-- 主菜单5 / 次级菜单5 / 内容5事件 -->
	$('#menuSeccion5 a').bind('click',function(e)
	{
		num = $(this).parent().attr('id-menu');
		val = 0;
		delay = 0;
		
		for( i = 1; i < num; i++ )
		{
			val += $('#'+'workcont_5_'+i).height(); 
		}
		
		if(num != 1) $('#seccion5').stop().animate({ scrollTop : (val + delay) }, 1000, 'easeInOutQuart');
		else $('#seccion5').stop().animate({ scrollTop : 0 }, 1000, 'easeInOutQuart');
		
		e.preventDefault();
	});
	
	$('#seccion5').bind('scroll',function(e)
	{ 
			$('#menuSeccion5 li').removeClass('active');
			$('#worknav_5_1').addClass('active');
		
	});
	
	
	
	//点击下一个内容空白进行切换
	$('#seccion2, #seccion3, #seccion4, #seccion5').bind('click', function()
	{
		target = $(this).attr('menu-id');
		$('#'+target).trigger('click').trigger('mouseover');
	});
	
	// 底部链接
	$('#socialLinks a').bind('mouseover', function()
	{
		$target = $(this);
		$target.children('img').css('margin-top', '-27px');
	});
	
	$('#socialLinks a').bind('mouseout', function()
	{
		$target = $(this);
		$target.children('img').css('margin-top', '0');
	});
	
  } 
  
);

var s = 0;
$pasoSeccion5 = 0;

//Instanciacion
(function($) {
  
  $.fn.Instantiate = function(settings) {
    
    var config = {};
 
    if (settings) $.extend(config, settings);
  
      this.each(function(i) { 
		  
          var $self = $(this);
          var $controller = $self.attr('data-controller');
				  
          if ($self[$controller])
            $self[$controller]();
		
      });
      
  }
    
}) (jQuery);

//Resize
$(function()
{
	
		var win = $.Window;
		
		win.bind('resize',
			function()
			{
				$('#seccion1, #seccion2, #seccion3, #seccion4, #seccion5').removeOverscroll();
				$("#seccion1, #seccion2, #seccion3, #seccion4, #seccion5").css("height", win.height());//70头+30标题 = 正文内容高度
				$('#containerSecciones').css('height', win.height()  - 70 );
				$('#containerSecciones').css('margin-top', 70);
				$('#menu').css('height', win.height());
				$('#menu_cont').css('height', win.height() - 70);
				$('#menu_cont').css('margin-top', 70);
				
				if($paso1) $('#seccion1').css('left','0'); $paso1 = true;
				
				delay = win.width() - 200;
				ancho = (delay + (1100 * $seccionActiva));
				$('#containerSecciones').css('width',ancho);
				
				Reset( positions() );
			}
		).trigger('resize');
	
});

function positions()
{
	var _arreglo = [ $('#seccion1').scrollTop(),
					 $('#seccion2').scrollTop(),
				     $('#seccion3').scrollTop(),
				     $('#seccion4').scrollTop(),
		             $('#seccion5').scrollTop() ];

	return _arreglo;	
}

$seccionActiva = 0;
$paso1 = false;
$paso2 = true;
$paso3 = true;
$paso4 = true;
$paso5 = true;

//Secciones
function Reset( _posiciones ) 
{
	
	// 滚动条颜色
	$('#seccion1, #seccion2, #seccion3, #seccion4, #seccion5').removeClass($.browser.msie ? 'drag2' : 'drag1');
	
	if($seccionActiva != 0) $('#seccion1').css('left','0');
	
	if($seccionActiva == 0)
	{
		$('#seccion1').overscroll({
			cancelOn: '.no-drag',
			direction: 'vertical',
			persistThumbs: false,
			thumbColor: '#000',
			scrollLeft: 0,
			scrollTop: _posiciones[0]
		}).on('overscroll:dragstart overscroll:dragend overscroll:driftstart overscroll:driftend', function(event){
		});
	}
	else if($seccionActiva == 1)
	{
		$('#seccion2').overscroll({
			cancelOn: '.no-drag',
			direction: 'vertical',
			persistThumbs: false,
			thumbColor: '#000',
			scrollLeft: 0,
			scrollTop: _posiciones[1]
		}).on('overscroll:dragstart overscroll:dragend overscroll:driftstart overscroll:driftend', function(event){
		});
	}
	else if($seccionActiva == 2)
	{
		$('#seccion3').overscroll({
			cancelOn: '.no-drag',
			direction: 'vertical',
			persistThumbs: false,
			thumbColor: '#000',
			scrollLeft: 0,
			scrollTop: _posiciones[2]
		}).on('overscroll:dragstart overscroll:dragend overscroll:driftstart overscroll:driftend', function(event){
		});
	}
	else if($seccionActiva == 3)
	{
		$('#seccion4').overscroll({
			cancelOn: '.no-drag',
			direction: 'vertical',
			persistThumbs: false,
			thumbColor: '#000',
			scrollLeft: 0,
			scrollTop: _posiciones[3]
		}).on('overscroll:dragstart overscroll:dragend overscroll:driftstart overscroll:driftend', function(event){
		});
	}
	else if($seccionActiva == 4)
	{
		$('#seccion5').overscroll({
			cancelOn: '.no-drag',
			direction: 'vertical',
			persistThumbs: false,
			thumbColor: '#000',
			scrollLeft: 0,
			scrollTop: _posiciones[4]
		}).on('overscroll:dragstart overscroll:dragend overscroll:driftstart overscroll:driftend', function(event){
		});
	}
	
}
	

//主菜单
(function($) {
	
	$.fn.Menu = function() {
		this.each(function(i) { 
	  
			var $self = $(this),
				$ul = $('<ul/>').appendTo($self),
				$sections = $('[data-nav]'),
				_sections = new Array(),
				$navs = new Array();
			
			$sections.each(
          	function(i){
            	_sections.push($(this));
            	$('<li/>').appendTo($ul).DotNav({ id:$(this).attr('id'), name:$(this).attr('name'), menuId:$(this).attr('menu-id'), num:i });
          	})
			$('#menu1').trigger('mouseover');
    	});
    	return this;
	}
	
	$.fn.DotNav = function(settings) {
     
		var config = {};
	 	if (settings) $.extend(config, settings);
	   	this.each(function(i) { 
		  	
			var $self = $(this),
				$a = $('<a/>'),
				$id = config.id,
				$num = config.num,
				$menuId = config.menuId;
				
				$a
              		.attr('href',"#/"+config.name.split(' ').join('_'))
					.css('background-position', $num*(-40) + 'px 0px')
              		.appendTo($self)
              		.bind('click', function(e){
						$(this).unbind('mouseout');
						
						//正文容器滑动距离
						delay = $.Window.width() - 200;
						posX = (-1100 * ($num)) + 200;
						ancho = (delay + (1100 * $num));
						$('#containerSecciones').stop().animate({'left' : posX + '', 'width' : ancho + ''}, 1000, 'easeInOutQuart');
						
						// 次级菜单左右滑动
						if($menuId == 'menu1' && $seccionActiva != 0)
						{
							// 企业门户
							$seccionActiva = 0;
							$('#menu2, #menu3, #menu4, #menu5').stop().animate({'top': '-40'}, 400, 'easeInOutQuart');
							$('#menu2, #menu3, #menu4, #menu5').bind('mouseout',function(e){ $(this).stop().animate({'top': '-40'}, 400, 'easeInQuart'); });
							$('#mascara1').stop().animate({'opacity': '0'}, 1000, 'easeOutQuart', function(){ $('#mascara1').css('display', 'none') });
							$('#mascara2, #mascara3, #mascara4, #mascara5').stop().css('display','block').animate({'opacity': '.95'}, 1000, 'easeOutQuart', function(){});
							$('#seccion2, #seccion3, #seccion4, #seccion5').stop().animate({scrollTop : 0}, 1200, 'easeOutQuint', function(){ $.Window.trigger('resize'); });
							$('#menuSeccion2, #menuSeccion3, #menuSeccion4, #menuSeccion5').stop().animate({'left': '214px'}, 1000, 'easeInOutQuart', function(){ $('#menuSeccion2, #menuSeccion3, #menuSeccion4, #menuSeccion5').css('display', 'none'); });
							$('#menuSeccion1').css({display:'block', left:'-185px'});
							$('#menuSeccion1').stop().animate({'left': '14'}, 1000, 'easeInOutQuart');
						}
						else if($menuId == 'menu2' && $seccionActiva != 1)
						{
							if($seccionActiva == 0)
							{
								$posicion = -185;
								$('#menuSeccion2').css({display:'block', left:'214px'});
							}
							else
							{
								$posicion = 214;
								$('#menuSeccion2').css({display:'block', left:'-185px'});
							}
							
							// 系统平台
							$seccionActiva = 1;
							$('#menu1, #menu3, #menu4, #menu5').stop().animate({'top': '-40'}, 400, 'easeInOutQuart');
							$('#menu1, #menu3, #menu4, #menu5').bind('mouseout',function(e){ $(this).stop().animate({'top': '-40'}, 400, 'easeInQuart'); });
							$('#mascara2').stop().animate({'opacity': '0'}, 1000, 'easeOutQuart', function(){ $('#mascara2').css('display', 'none') });
							$('#mascara1, #mascara3, #mascara4, #mascara5').stop().css('display','block').animate({'opacity': '.95'}, 1000, 'easeOutQuart', function(){});
							$('#seccion1, #seccion3, #seccion4, #seccion5').stop().animate({scrollTop : 0}, 1200, 'easeOutQuint', function(){ $.Window.trigger('resize'); });
							$('#menuSeccion1, #menuSeccion3, #menuSeccion4, #menuSeccion5').stop().animate({'left': $posicion + 'px'}, 1000, 'easeInOutQuart', function(){ $('#menuSeccion1, #menuSeccion3, #menuSeccion4, #menuSeccion5').css('display', 'none'); });
							$('#menuSeccion2').stop().animate({'left': '14'}, 1000, 'easeInOutQuart');
						}
						else if($menuId == 'menu3' && $seccionActiva != 2)
						{
							if($seccionActiva == 0 || $seccionActiva == 1)
							{
								$posicion = -185;
								$('#menuSeccion3').css({display:'block', left:'214px'});
							}
							else
							{
								$posicion = 214;
								$('#menuSeccion3').css({display:'block', left:'-185px'});
							}
							
							// 项目主题
							$seccionActiva = 2;
							$('#menu2, #menu1, #menu4, #menu5').stop().animate({'top': '-40'}, 400, 'easeInOutQuart');
							$('#menu2, #menu1, #menu4, #menu5').bind('mouseout',function(e){ $(this).stop().animate({'top': '-40'}, 400, 'easeInQuart'); });
							$('#mascara3').stop().animate({'opacity': '0'}, 1000, 'easeOutQuart', function(){ $('#mascara3').css('display', 'none') });
							$('#mascara2, #mascara1, #mascara4, #mascara5').stop().css('display','block').animate({'opacity': '.95'}, 1000, 'easeOutQuart', function(){});
							$('#seccion2, #seccion1, #seccion4, #seccion5').stop().animate({scrollTop : 0}, 1200, 'easeOutQuint', function(){ $.Window.trigger('resize'); });
							$('#menuSeccion1, #menuSeccion2, #menuSeccion4, #menuSeccion5').stop().animate({'left': $posicion + 'px'}, 1000, 'easeInOutQuart', function(){ $('#menuSeccion1, #menuSeccion2, #menuSeccion4, #menuSeccion5').css('display', 'none'); });
							$('#menuSeccion3').stop().animate({'left': '14'}, 1000, 'easeInOutQuart');
						}
						else if($menuId == 'menu4' && $seccionActiva != 3)
						{
							if($seccionActiva == 0 || $seccionActiva == 1 || $seccionActiva == 2)
							{
								$posicion = -185;
								$('#menuSeccion4').css({display:'block', left:'214px'});
							}
							else
							{
								$posicion = 214;
								$('#menuSeccion4').css({display:'block', left:'-185px'});
							}
							
							// 电子商务
							$seccionActiva = 3;
							$('#menu2, #menu3, #menu1, #menu5').stop().animate({'top': '-40'}, 400, 'easeInOutQuart');
							$('#menu2, #menu3, #menu1, #menu5').bind('mouseout',function(e){ $(this).stop().animate({'top': '-40'}, 400, 'easeInQuart'); });
							$('#mascara4').stop().animate({'opacity': '0'}, 1000, 'easeOutQuart', function(){ $('#mascara4').css('display', 'none') });
							$('#mascara2, #mascara3, #mascara1, #mascara5').stop().css('display','block').animate({'opacity': '.95'}, 1000, 'easeOutQuart', function(){});
							$('#seccion2, #seccion3, #seccion1, #seccion5').stop().animate({scrollTop : 0}, 1200, 'easeOutQuint', function(){ $.Window.trigger('resize'); });
							$('#menuSeccion1, #menuSeccion2, #menuSeccion3, #menuSeccion5').stop().animate({'left': $posicion + 'px'}, 1000, 'easeInOutQuart', function(){ $('#menuSeccion1, #menuSeccion2, #menuSeccion3, #menuSeccion5').css('display', 'none'); });
							$('#menuSeccion4').stop().animate({'left': '14'}, 1000, 'easeInOutQuart');
						}
						else if($menuId == 'menu5' && $seccionActiva != 4)
						{
							
							// 其他
							$seccionActiva = 4;
							$('#menu2, #menu3, #menu4, #menu1').stop().animate({'top': '-40'}, 400, 'easeInOutQuart');
							$('#menu2, #menu3, #menu4, #menu1').bind('mouseout',function(e){ $(this).stop().animate({'top': '-40'}, 400, 'easeInQuart'); });
							$('#mascara5').stop().animate({'opacity': '0'}, 1000, 'easeOutQuart', function(){ $('#mascara5').css('display', 'none') });
							$('#mascara2, #mascara3, #mascara4, #mascara1').stop().css('display','block').animate({'opacity': '.95'}, 1000, 'easeOutQuart', function(){});
							$('#seccion2, #seccion3, #seccion4, #seccion1').stop().animate({scrollTop : 0}, 1200, 'easeOutQuint', function(){ $.Window.trigger('resize'); });
							$('#menuSeccion1, #menuSeccion2, #menuSeccion3, #menuSeccion4').stop().animate({'left': '-185px'}, 1000, 'easeInOutQuart', function(){ $('#menuSeccion1, #menuSeccion2, #menuSeccion3, #menuSeccion4').css('display', 'none'); });
							$('#menuSeccion5').css({display:'block', left:'214px'});
							$('#menuSeccion5').stop().animate({'left': '14'}, 1000, 'easeInOutQuart');
						}
						
						e.preventDefault();
                	})
					
				$a.attr('id',$menuId);
				
				$a.mouseover(function(e) {
						$(this).stop().animate({'top': '0'}, 400, 'easeOutQuart');
					})
					.mouseout(function(e) {
						$(this).stop().animate({'top': '-40'}, 400, 'easeInOutQuart');
					})
				
				//默认企业网站没有遮罩
				if($id == 'seccion1')
				{
					$a.unbind('mouseout');
					$('#mascara1').css({opacity:0, display:'none'});
				}
           
		});
		 
		return this;
     
  	}
		
}) (jQuery, jQuery.browser);