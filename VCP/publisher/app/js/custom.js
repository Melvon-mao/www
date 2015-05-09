;jQuery(function($){

     //æ ¼å¼�åŒ–æ»šåŠ¨æ�¡ niceScroll
//     $("html").niceScroll({cursorcolor:"#ffffff"});

	
	$('.block_content').click(function() {
		var weight = $(this).attr('weight');
		var position = $(this).attr('position');
		var panel = $(this).attr('panel');
		var layout = $(this).attr('layout');
		var page = $('ul.pagelistbox').find('a[active=active]').attr('pageid');
		$.post('/block/setting', {
			weight : weight,
			position : position,
			panel : panel,
			layout : layout,
			page : page
		}, function(result) {
			result = JSON.parse(result);
			$('div.pagewrap').html(result.content);
			$('div.pagelayout').html(result.layoutList);
			$('div.pagelist').html(result.pageList);
			
			
			$('.pagewrap ul.nav-tabs a').click(function() {
				$('.pagewrap ul.nav-tabs li').each(function() {
					$(this).removeAttr('class');
				});
				$('.pagewrap .tab-pane').each(function() {
					$(this).attr('class', 'tab-pane');
				});
				
				var tabPaneId = 'tab-' + $(this).parent().attr('id');
				$(this).parent().attr('class', 'active');
				$('.pagewrap #'+tabPaneId).attr('class', 'tab-pane active');
			});
		});
		return false;
	});
	
	
	$('ul.layout_list li').click(function() {
		if($(this).attr('active') == '') {
			if(confirm('Are you sure to switch the layout? If confirmed you will lose your page settings.')) {
				var pageid = $('ul.pagelistbox').find('a[active=active]').attr('pageid');
				var layoutid = $(this).attr('layout');
				location.href = '/demo/'+pageid+'/'+layoutid;
			}
		}
	});
	
	
	
});