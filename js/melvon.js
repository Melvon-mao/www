;jQuery(function($){
	  
	  
	  //主导航：记录导航点击样式
	  $("#nav li").click(function(){
		  $(this).addClass("nav_click").siblings("li").removeClass();
	  });
	  
	  //左侧：响应式导航+点击样式
	  $(".open").pageslide();
	  $("#nav_mobile a").click(function(){
		  $(this).addClass("nav_mobile_current").siblings("a").removeClass();
	  });
	  
	  //右侧：二级导航
	  $(".submenu").pageslide(/*{ direction: "left"}*/);
	  
	  //二级导航：记录导航点击样式
	  $("#submenu a").click(function(){
		  $(this).addClass("submenu_current").siblings("a").removeClass();
	  });
	  
	  //三级导航：记录导航点击样式
	  $(".three_nav_list a").click(function(){
		  $(this).addClass("three_nav_current").siblings("a").removeClass();
	  });
	  
	  jQuery(document).ready(function(){
			// Declare parallax on layers
			jQuery('.parallax-layer').parallax({
				mouseport: jQuery("#port")
			});
			});
	  
	  
	  
	  //判断页面滚动距离，替换LOGO旁边的tip
	  $(window).scroll(function (event) {
		var y = $(this).scrollTop();
		if (y > 70) {
		  var logoSrc = $('.logoicon_tip img').attr('src').replace('space.png', 'logoside_tip.png');
      	  $('.logoicon_tip img').attr('src', logoSrc);
		  //$('.navbox').addClass('overlayed');
		  $('.navbox').addClass('overlayed');
		} else {
		  var logoSrc = $('.logoicon_tip img').attr('src').replace('logoside_tip.png', 'space.png');
      	  $('.logoicon_tip img').attr('src', logoSrc);
		  //$('.navbox').removeClass('overlayed');
		  $('.navbox').removeClass('overlayed');
		}
	  });
	  //点击LOGO滚回顶部 
	  $('.logoicon_tip').live('click', function(){
		$('html, body').animate({scrollTop:0},{duration:500, queue:true, complete:function(){
		  $('.logoicon_tip').attr('href', '/');
		  }
		});
		return false;
	  });
	
		
		
	  
	  
});