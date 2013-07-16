(function(global, math, wait, cancel, browser, namespace, $, none){

    'use strict';
    
    var prefix = browser.mozilla ? '-moz-' : (
                 browser.webkit ? '-webkit-' : (
                 browser.opera ? '-o-' : (
                 browser.msie && browser.version > 9 ? '-ms-' : 
                 ''))),

    animate = global.requestAnimationFrame       || 
              global.webkitRequestAnimationFrame || 
              global.mozRequestAnimationFrame    || 
              global.oRequestAnimationFrame      || 
              global.msRequestAnimationFrame     || 
              function(callback) {
                  wait(callback, 1000/60);
              },
             
    datakey = 'overscroll',
    
    compat = {
        cursorGrab:     prefix ? (prefix + 'grab')               : 'move',
        cursorGrabbing: prefix ? (prefix + 'grabbing')           : 'move',
        scrollingProp:  prefix ? (prefix + 'overflow-scrolling') : 'overflow-scrolling',
        touchEnabled:   'ontouchstart' in global
    },
    
    events = {
        drag:       'mousemove',
        end:        'mouseup mouseleave click',
        hover:      'mouseenter mouseleave',
        ignored:    'select dragstart drag',
        scroll:     'scroll',
        start:      'mousedown',
        wheel:      'mousewheel DOMMouseScroll'
    },
    
    settings = {
        captureThreshold:   3,
        driftDecay:         1.1,
        driftSequences:     22,
        driftTimeout:       100,
        scrollDelta:        15,
        thumbOpacity:       1,
        thumbThickness:     8,//滚动条宽度
        thumbTimeout:       400,
        wheelDelta:         20
    },
    
    defaults = {
        cancelOn:       '',
        direction:      'multi',
        hoverThumbs:    false,
        scrollDelta:    settings.scrollDelta,
        showThumbs:     true,
        persistThumbs:  false,
		thumbColor:		'#fff',
        wheelDelta:     settings.wheelDelta,
        wheelDirection: 'vertical',
        zIndex:         999
    },
    
    triggerEvent = function (event, target) {
        target.trigger('overscroll:' + event);
    },
    
    time = function() {
        return (new Date()).getTime();
    },
    
    capturePosition = function (event, position, index) {
        position.x = event.pageX;
        position.y = event.pageY;
        position.time = time();
        position.index = index;
        return position;
    },
    
    moveThumbs = function (thumbs, sizing, left, top) {

        var ml, mt;

        if (thumbs && thumbs.added) {
            if (thumbs.horizontal) {
                ml = left * (1 + sizing.container.width / sizing.container.scrollWidth);
                mt = top + sizing.thumbs.horizontal.top;
                thumbs.horizontal.css('margin', mt + 'px 0 0 ' + ml + 'px');
            }
            if (thumbs.vertical) {
                ml = left + sizing.thumbs.vertical.left;
                mt = top * (1 + sizing.container.height / sizing.container.scrollHeight);
                thumbs.vertical.css('margin', mt + 'px 0 0 ' + ml + 'px');
            }
        }

    },  
    
    toggleThumbs = function (thumbs, options, dragging) {
        if (thumbs && thumbs.added && !options.persistThumbs) {
            if (dragging) {
                if (thumbs.vertical) {
                    thumbs.vertical.stop(true, true).fadeTo('fast', settings.thumbOpacity);
                }
                if (thumbs.horizontal) {
                    thumbs.horizontal.stop(true, true).fadeTo('fast', settings.thumbOpacity);
                }
            } else {
                if (thumbs.vertical) {
                    thumbs.vertical.fadeTo('fast', 0);
                }
                if (thumbs.horizontal) {
                    thumbs.horizontal.fadeTo('fast', 0);
                }
            }
        }
    },
    
    deferClick = function (target) {
        var events = target.data('events'),
        click = events && events.click ? events.click.slice() : [];
        if (events) { delete events.click; }
        target.one('mouseup', function () {
            $.each(click, function(i, event){
                target.click(event);
            });
            return false;
        });
    },

    hover = function (event) {
        var data = event.data,
        thumbs   = data.thumbs,
        options  = data.options,
        dragging = event.type === 'mouseenter';
        toggleThumbs(thumbs, options, dragging);
    },

    scroll = function (event) {
        var data = event.data;
        if (!data.flags.dragged) {
            moveThumbs(data.thumbs, data.sizing, this.scrollLeft, this.scrollTop);            
        }
    },
    
    wheel = function (event) {
        
        event.preventDefault(); 
                
        var data = event.data,
        options = data.options,
        sizing = data.sizing,
        thumbs = data.thumbs,
        wheel = data.wheel,
        flags = data.flags, delta,
        original = event.originalEvent;

        flags.drifting = false;

        if (original.wheelDelta) {
            delta = original.wheelDelta / (browser.opera ? -120 : 120);
        } if (original.detail) {
            delta = -original.detail / 3;
        } delta *= options.wheelDelta;

        if (!wheel) {
            flags.dragging = true;
            data.wheel = wheel = { timeout: null };
            toggleThumbs(thumbs, options, true);
        }
        
        if (options.wheelDirection === 'horizontal') {
            this.scrollLeft -= delta;
        } else {
            this.scrollTop -= delta;
        }

        if (wheel.timeout) { cancel(wheel.timeout); }

        moveThumbs(thumbs, sizing, this.scrollLeft, this.scrollTop);

        wheel.timeout = wait(function() {
            toggleThumbs(thumbs, options, data.wheel = flags.dragging = null);
        }, settings.thumbTimeout);

    },

    drag = function (event) {

        event.preventDefault();

        var data = event.data, 
        options  = data.options,
        sizing  = data.sizing,
        thumbs   = data.thumbs,
        position = data.position,
        flags    = data.flags;

        if (!flags.dragged) {
            toggleThumbs(thumbs, options, true);
        }

        flags.dragged = true;

        if (options.direction !== 'vertical') {
            this.scrollLeft -= (event.pageX - position.x);
        }

        if (data.options.direction !== 'horizontal') {
            this.scrollTop -= (event.pageY - position.y);
        }

        capturePosition(event, data.position);

        if (--data.capture.index <= 0) {
            flags.dragging = true;
            capturePosition(event, data.capture, settings.captureThreshold);
        }
        
        moveThumbs(thumbs, sizing, this.scrollLeft, this.scrollTop);

    },
    
    drift = function (target, event, callback) {

        var data   = event.data, dx, dy, xMod, yMod,
        capture    = data.capture,
        options    = data.options,
        sizing     = data.sizing,
        thumbs     = data.thumbs,
        elapsed    = time() - capture.time,
        scrollLeft = target.scrollLeft, 
        scrollTop  = target.scrollTop,
        decay      = settings.driftDecay;

        if (elapsed > settings.driftTimeout) {
            return callback(data);
        }
        
        dx = options.scrollDelta * (event.pageX - capture.x);
        dy = options.scrollDelta * (event.pageY - capture.y);
        
        if (options.direction !== 'vertical') {
            scrollLeft -= dx;
        } if (options.direction !== 'horizontal') {
            scrollTop -= dy;
        }
        
        xMod = dx / settings.driftSequences;
        yMod = dy / settings.driftSequences;

        triggerEvent('driftstart', data.target);

        data.drifting = true;

        animate(function render() {
            if (data.drifting) {            
                var min = 1, max = -1;
                data.drifting = false;
                if (yMod > min && target.scrollTop > scrollTop || yMod < max && target.scrollTop < scrollTop) {
                    data.drifting = true;
                    target.scrollTop -= yMod;
                    yMod /= decay;
                }
                if (xMod > min && target.scrollLeft > scrollLeft || xMod < max && target.scrollLeft < scrollLeft) {
                    data.drifting = true; 
                    target.scrollLeft -= xMod;
                    xMod /= decay;
                }
                moveThumbs(thumbs, sizing, target.scrollLeft, target.scrollTop);
                animate(render);
            } else {                
                triggerEvent('driftend', data.target);
                callback(data);                
            }            
        });

    },
    
    start = function (event) {

        event.preventDefault();

        var data = event.data, 
        target   = data.target,
        start    = data.start = $(event.target),
        flags    = data.flags;

        flags.drifting = false;

        if (!start.is(data.options.cancelOn)) {            
            flags.dragging = flags.dragged = false;
            target.on(events.drag, data, drag);
            data.position = capturePosition(event, {});
            data.capture = capturePosition(event, {}, settings.captureThreshold);
            triggerEvent('dragstart', target);
        }

    },

    stop = function (event) {

        var data = event.data,
        target = data.target,
        options = data.options,
        flags = data.flags,
        thumbs = data.thumbs,
        
        done = function () {
            if (thumbs && !options.hoverThumbs) {
                toggleThumbs(thumbs, options, false);
            }
        };

        target.unbind(events.drag, drag);

        if (data.position) {            

            triggerEvent('dragend', target);

            if (flags.dragging) {
                drift(this, event, done);
            } else {
                done();
            }
            
        }
        
        if (flags.dragging && data.start.is(event.target)) {
            deferClick(data.start);
        }
        
        data.start     = 
        data.capture   = 
        data.position  = 
        flags.dragged  = 
        flags.dragging = false;


    },
	
    getOptions = function(options) {
        
        options = $.extend({}, defaults, options);
        
        if (options.direction !== 'multi' && options.direction !== options.wheelDirection) {
            options.wheelDirection = options.direction;
        }

        options.scrollDelta = math.abs(options.scrollDelta);
        options.wheelDelta  = math.abs(options.wheelDelta);
        
        options.scrollLeft = options.scrollLeft === none ? null : math.abs(options.scrollLeft);
        options.scrollTop  = options.scrollTop  === none ? null : math.abs(options.scrollTop);
                
        return options;        
        
    },
    
    getSizing = function (target) {

        var $target  = $(target),
        width        = $target.width(),
        height       = $target.height(),
        scrollWidth  = width >= target.scrollWidth ? width : target.scrollWidth,
        scrollHeight = height >= target.scrollHeight ? height : target.scrollHeight;
        
        return {
            container: {
                width: width,
                height: height,
                scrollWidth: scrollWidth,
                scrollHeight: scrollHeight
            },
            thumbs: {
                horizontal: {
                    width: width * width / scrollWidth,
                    height: settings.thumbThickness,
                    corner: settings.thumbThickness / 2,
                    left: 0,
                    top: height - settings.thumbThickness
                },
                vertical: {
                    width: settings.thumbThickness,
                    height: height * height / scrollHeight,
                    corner: settings.thumbThickness / 2,
                    left: width - settings.thumbThickness,
                    top: 0
                }
            }
        };

    },
    
    getRemover = function (target, orCreate) {
         
        var $target = $(target), thumbs,
        data        = $target.data(datakey) || {},
        style       = $target.attr('style'),
        fallback    = orCreate ? function () {

            data = $target.data(datakey);
            thumbs = data.thumbs;

            if (style) {
                $target.attr('style', style);
            } else {
                $target.removeAttr('style');
            }
            
            if (thumbs) {
                if (thumbs.horizontal) { thumbs.horizontal.remove(); }
                if (thumbs.vertical)   { thumbs.vertical.remove();   }
            }            

            $target
                .removeData(datakey)
                .off(events.wheel,      wheel)
                .off(events.start,      start)
                .off(events.end,        stop)
                .off(events.ignored,    false);
                
        } : $.noop;
        
        return $.isFunction(data.remover) ? data.remover : fallback;
        
    },
    
    getThumbCss = function(size, options) {
        return {
            position: 'absolute',
            opacity: options.persistThumbs ? settings.thumbOpacity : 0,
            'background-color': options.thumbColor,
            width: size.width + 'px',
            height: size.height + 'px',
            'border-radius': '0',//size.corner + 'px', 
            'margin': size.top + 'px 0 0 ' + size.left + 'px',
            'z-index': options.zIndex
        };
    },
    
    createThumbs = function(target, sizing, options) {
        
        var div = '<div/>',
        thumbs  = {}, 
        css     = false;
        
        if (sizing.container.scrollWidth > 0 && options.direction !== 'vertical') {
            css = getThumbCss(sizing.thumbs.horizontal, options);
            thumbs.horizontal = $(div).css(css).prependTo(target);
        }

        if (sizing.container.scrollHeight > 0 && options.direction !== 'horizontal') {
            css = getThumbCss(sizing.thumbs.vertical, options);
            thumbs.vertical = $(div).css(css).prependTo(target);
        }

        thumbs.added = !!css;
        
        return thumbs;
        
    },
      
    setup = function(target, options) {
        
        var thumbs, sizing,
        data = {
            flags:   { dragging: false },
            options: options = getOptions(options),
            remover: getRemover(target, true),
            sizing:  sizing = getSizing(target)            
        };
        
        data.target = target = $(target).css({
            position: 'relative',
            overflow: 'hidden',
        }).addClass(browser.msie ? 'drag2' : 'drag1')
		  .on(events.wheel, data, wheel)
          .on(events.start, data, start)
          .on(events.end, data, stop)
          .on(events.scroll, data, scroll)
          .on(events.ignored, false);
        
        
        if (options.scrollLeft !== null) {
            target.scrollLeft(options.scrollLeft);
        } if (options.scrollTop !== null) {
            target.scrollTop(options.scrollTop);
        }
          
        if (options.showThumbs) {
            data.thumbs = thumbs = createThumbs(target, sizing, options);
            if (thumbs.added) {
                moveThumbs(thumbs, sizing, target.scrollLeft(), target.scrollTop());
                if (options.hoverThumbs) {
                    target.on(events.hover, data, hover);
                }
            }
        }
        
        target.data(datakey, data);
        
    },
    
    teardown = function(target) {
        getRemover(target)();
    },
         
    overscroll = function(options) {
        return this.removeOverscroll().each(function() {
            setup(this, options);
        });
    },
     
    touchscroll = function(options) {
        return this.removeOverscroll().each(function() {
            $(this).data(datakey, { remover: getRemover(this) })
            .css(prefix + 'overflow-scrolling', 'touch')
            .css('overflow', 'auto');
        });
    },
    
    removeOverscroll = function() {
        return this.each(function () {
            teardown(this);
        });
    };
  
    overscroll.settings = settings;
     
    $.extend(namespace, {
        overscroll:         compat.touchEnabled ? touchscroll : overscroll,
        removeOverscroll:   removeOverscroll
    });
    
})(window, Math, setTimeout, clearTimeout, jQuery.browser, jQuery.fn, jQuery);
