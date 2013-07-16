var Page = (function() {

	var $container = $( '#container' ),
		$bookBlock = $( '#bb-bookblock' ),
		$items = $bookBlock.children(),
		itemsCount = $items.length,
		current = 0,
		bb = $( '#bb-bookblock' ).bookblock( {
			speed : 800,
			perspective : 2000,
			shadowSides	: 0.8,
			shadowFlip	: 0.4,
			onEndFlip : function(old, page, isLimit) {
				
				current = page;
				updateTOC();
				updateNavigation( isLimit );
				setJSP( 'init' );
				setJSP( 'destroy', old );

			}
		} ),
		$navNext = $( '#bb-nav-next' ),
		$navPrev = $( '#bb-nav-prev' ).hide(),
		$menuItems = $container.find( 'ul.menu-toc > li' ),
		$tblcontents = $( '#tblcontents' ),
		transEndEventNames = {
			'WebkitTransition': 'webkitTransitionEnd',
			'MozTransition': 'transitionend',
			'OTransition': 'oTransitionEnd',
			'msTransition': 'MSTransitionEnd',
			'transition': 'transitionend'
		},
		transEndEventName = transEndEventNames[Modernizr.prefixed('transition')],
		supportTransitions = Modernizr.csstransitions;

	function init() {

		setJSP( 'init' );
		initEvents();

	}
	
	// 下一页 & 上一页
	function initEvents() {

		$navNext.on( 'click', function() {
			bb.next();
			return false;
		} );

		$navPrev.on( 'click', function() {
			bb.prev();
			return false;
		} );
		
		//swipe 
		$items.on( {
			'swipeleft'		: function( event ) {
				if( $container.data( 'opened' ) ) {
					return false;
				}
				bb.next();
				return false;
			},
			'swiperight'	: function( event ) {
				if( $container.data( 'opened' ) ) {
					return false;
				}
				bb.prev();
				return false;
			}
		} );

		// 点击展开左侧菜单
		$tblcontents.on( 'click', toggleTOC );

		// 点击菜单元素
		$menuItems.on( 'click', function() {
			
			var $el = $( this ),
				idx = $el.index(),
				jump = function() {
					bb.jump( idx + 1 );
					$navNext.hide();
		$navPrev.hide();
				};
				current !== idx ? closeTOC( jump ) : closeTOC();
				return false;
			
		} );

	
		$( window ).on( 'debouncedresize', function() {
			setJSP( 'reinit' );
		} );

	}

	function setJSP( action, idx ) {
		
		var idx = idx === undefined ? current : idx,
			$content = $items.eq( idx ).children( 'div.content' ),
			apiJSP = $content.data( 'jsp' );
		
		if( action === 'init' && apiJSP === undefined ) {
			$content.jScrollPane({verticalGutter : 0, hideFocus : true });
		}
		else if( action === 'reinit' && apiJSP !== undefined ) {
			apiJSP.reinitialise();
		}
		else if( action === 'destroy' && apiJSP !== undefined ) {
			apiJSP.destroy();
		}

	}
	
	//点击 Li 加载样式
	function updateTOC() {
		$menuItems.removeClass( 'menu-toc-current' ).eq( current ).addClass( 'menu-toc-current' );
	}

	function updateNavigation( isLastPage ) {
		
		if( current === 0 ) {
			$navNext.show();
			$navPrev.hide();
		}
		else if( isLastPage ) {
			$navNext.hide();
			$navPrev.show();
		}
		else {
			$navNext.show();
			$navPrev.show();
		}

	}

	function toggleTOC() {
		var opened = $container.data( 'opened' );
		opened ? closeTOC2() : openTOC();
	}
	
	// 当左侧菜单展开时
	function openTOC() {
		$navNext.hide();
		$navPrev.hide();
		//$("h5").fadeOut(500);
		//$("h2").fadeOut(500);
		//$(".large_pic").fadeOut(500);
		//$(".app_info").fadeOut(500);
		$container.addClass( 'slideRight' ).data( 'opened', true );
	}
	
	
	
	// 当左侧菜单关闭时
	function closeTOC( callback ) {
		//$("h5").fadeIn(500);
		//$("h2").fadeIn(500);
		//$(".large_pic").fadeIn(500);
		//$(".app_info").fadeIn(500);
		updateNavigation( current === itemsCount - 1 );
		//$container.removeClass( 'slideRight' ).data( 'opened', false );
		if( callback ) {
			if( supportTransitions ) {
				$container.on( transEndEventName, function() {
					$( this ).off( transEndEventName );
					callback.call();
				} );
			}
			else {
				callback.call();
			}
		}

	}
	
	// 关闭 2
	function closeTOC2() {
		$navNext.show();
		$navPrev.show();
		$container.removeClass( 'slideRight' ).data( 'opened', false );
	}

	return { init : init };

})();