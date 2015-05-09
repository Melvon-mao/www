/**
 * global js.
 */

<!-- Get Source and Put to cookie -->
function getUrlParam(name)
{
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp( regexS );
	var results = regex.exec( window.location.href );
	if( results == null )    return null;
	else    return results[1];
}
function setCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}
function getCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

var urlSource = getUrlParam('source');
if(urlSource)
{
	setCookie('d_src', urlSource, 1);
}

function LoadFrameContentsIntoParent(frameID,target){

	var iFrame =  document.getElementById(frameID);
	  if(!iFrame)
	  {	  
		  setTimeout(function(){LoadFrameContentsIntoParent(frameID,target);}, 1000);
		}
	  else
	  {
		  
		   var iFrameBody;
		   if ( iFrame.contentDocument ) 
		   { // FF
		     iFrameBody = iFrame.contentDocument.getElementsByTagName('body')[0];
		   }
		   else if ( iFrame.contentWindow ) 
		   { // IE
		     iFrameBody = iFrame.contentWindow.document.getElementsByTagName('body')[0];
		   }
		   if(iFrameBody && iFrameBody.innerHTML)
		   {
			   $(target).html(iFrameBody.innerHTML).show();
			}
		   else
			{
			   setTimeout(function(){LoadFrameContentsIntoParent(frameID,target);}, 1000);
			}
			  

	  }

}

(function ($) {
	/* ============== plugin ============== */


	$.cookie = function (key, value, options) {

		// key and at least value given, set cookie...
		if (arguments.length > 1 && String(value) !== "[object Object]") {
			options = jQuery.extend({}, options);

			if (value === null || value === undefined) {
				options.expires = -1;
			}

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setDate(t.getDate() + days);
			}

			value = String(value);

			return (document.cookie = [
				encodeURIComponent(key), '=',
				options.raw ? value : encodeURIComponent(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path ? '; path=' + options.path : '',
				options.domain ? '; domain=' + options.domain : '',
				options.secure ? '; secure' : ''
			].join(''));
		}

		// key and possibly options given, get cookie...
		options = value || {};
		var result, decode = options.raw ? function (s) { return s; } : decodeURIComponent;
		return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
	};

	$.extend({
		getUrlVars: function() {
			var vars = [], hash;
			var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
			for(var i = 0; i < hashes.length; i++)
			{
				hash = hashes[i].split('=');
				vars.push(hash[0]);
				vars[hash[0]] = hash[1];
			}
			return vars;
		},
		getUrlVar: function(name) {
			return $.getUrlVars()[name];
		}
	});

	$.fn.validate = function (options) //------------------------- Form Validator
	{
		var defaults = {};
		defaults.rules;
		defaults.zIndex = 110;
		defaults.pattern;
		defaults.msg;
		defaults.field;
		defaults.show_message = true;

		var options = $.extend(defaults, options);

		return this.each(function () {
			var elm = $(this);
			var msg = '';
			var val;
			var result;

			if (elm.hasClass('form-hidden')) {
				return;
			}

			if (options.field != null) {
				val = elm.find(options.field).val();
			} else {
				val = elm.val();
			}

			for (i in options.rules) {

				//if (msg.length == 0) {

				switch (options.rules[i].type) {
					// notempty: field cannot be empty or only spaces
					case 'notempty':
						if (val.replace(/\s/g, "") == "") {
							msg = 'This field cannot be empty.';
						}
						break;

					// dropdownlistindexgreaterthan0: The dropdownlist selected index must be greater than 0.
					// This only works if option groups aren't being set.
					case 'dropdownlistindexgreaterthan0':
						if (elm.find('option:selected').index() <= 0) {
							msg = 'Please select a value from the dropdownlist.';
						}
						break;

					// dropdownliststringisnot: The selected text of the dropdownlist cannot be equal to the passed in string.
					case 'dropdownliststringisnot':
						if (elm.find('option:selected').text() == options.rules[i].string) {
							msg = 'Please select a different value - ' + options.rules[i].string + ' is not valid.';
						}
						break;

					// email: email address only
					case 'email':
						pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
						if (pattern.test(String(val)) != true) {
							msg = 'Please enter a valid email address.';
						}

					//email: email length validation
					case 'emaillength':
						if (val.length > 128) {
							msg = 'The email address is too long.';
						}
						break;

					// phone: phone number only
					case 'phone':
						pattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
						if (pattern.test(String(val)) != true) {
							msg = 'Please enter a number in the format:<br />(xxx) xxx-xxxx.';
						}
						break;

					// post: postal or zip code only
					case 'post':
						pattern = /(^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ]( )?\d[ABCEGHJKLMNPRSTVWXYZ]\d$)|(^\d{5}(-\d{4})?$)/i;
						if (pattern.test(String(val)) != true) {
							msg = 'Please provide a valid zip / post code.';
						}
						break;

					// alphanum: letters, numbers, dash and underscores only
					case 'alphanum':
						pattern = /^[a-z0-9-_]+$/i;
						if (pattern.test(String(val)) != true) {
							msg = 'Only letters, numbers, underscores( _ ) and dashes( - ) are allowed.';
						}
						break;

					// atleastone: designed for checkboxes contained in a div. Use the div as main element
					case 'atleastone':
						if (elm.find('input:checked').size() < 1) {
							msg = 'At least one item must be checked.';
						}
						break;

					// between: value must be between 'from' and 'to' parameters.
					case 'between':
						if (String(val).length < options.rules[i].from || String(val).length > options.rules[i].to) {
							msg = 'Must be ' + options.rules[i].from + ' to ' + options.rules[i].to + ' characters in length.';
						}
						break;

					// minimum: value must be at least the 'min' parameter value.
					case 'minimum':
						if (parseInt(val, '10') < options.rules[i].min) {
							msg = 'A value of ' + options.rules[i].min + ' or more is required.';
						}
						break;

					// minimumlength: string value must be at least the 'min' parameter value in length.
					case 'minimumlength':
						if (String(val).length < options.rules[i].min) {
							msg = 'A length of ' + options.rules[i].min + ' or more is required.';
						}
						break;

					// alphanum: letters, numbers, dash and underscores only
					case 'numeric':
						val = val.replace(/,/g, '');
						val = val.replace(/\$/g, '');
						if (isNaN(val)) {
							msg = 'Value must be numeric.';
						}
						break;

					// not equal to zero
					case 'notzero':
						if (val == 0) {
							msg = 'Value must be greater or less than 0';
						}
						break;

					// greater than zero
					case 'greaterthanzero':
						val = val.replace(/,/g, '');
						if (val <= 0) {
							msg = 'Value must be greater than 0';
						}
						break;

					// match: value must match a given string (use the value of a given field for confirmations)
					case 'match':
						if (String(val) != String(options.rules[i].matchval)) {
							if (elm.attr('type').toLowerCase() == 'password') {
								msg = 'Must match associated field.';
							} else {
								msg = 'Must match <br />( ' + String(options.rules[i].matchval) + ' ).';
							}
						}
						break;

					// regex: use your own custom regular expression
					case 'regex':
						pattern = options.pattern;
						if (pattern.test(String(val)) != true) {
							msg = options.rules[i].msg;
						}
						break;

					default:

				}
				//}

				if (msg != '') {
					break;
				}
			}

			// override default message.
			if (msg != '' && options.rules[i].msg) {
				msg = options.rules[i].msg;
			}

			// remove wrapped elms
			var wrapper = elm.parents('.msg-validate');

			if (wrapper.size() > 0) {
				elm.removeClass('warning');
				elm.insertBefore(wrapper);
				wrapper.remove();
			}

			if (msg != '') {


				var message = '';
				message += '<a class="tooltip msg-validate">';
				message += '<div></div>';
				message += '	<span class="content" style="display: none">';
				message += '		' + msg + '<br />';
				message += '		<span class="pointer"></span>';
				message += '	</span>';
				message += '</a>';

				if (options.show_message == true) {

					if (elm.is('select') && elm.prev().is('.selectmenu')) {
						elm = elm.prev('.selectmenu'); 
					}

					elm.addClass('warning');
					elm.wrap($(message));

					var tooltip = elm.parents('.tooltip');
					var content = tooltip.find('.content');
					elm.bind('focus', function () {
						content.show();
					});
					elm.bind('blur', function () {
						content.hide();
					});
				}

				result = false;
			} else {
				result = true;
			}

			if (options.onComplete != null) {
				options.onComplete(result, elm);
			}
		});
	}

	$.fn.helptext = function (options) //------------------------- Input help text
	{
		var defaults = {};
		defaults.msg = 'Enter Text Here';
		defaults.help_class = 'input-help';

		var options = $.extend(defaults, options);

		return this.each(function () {
			if (this.nodeName.toLowerCase() == 'input' && $(this).attr('type').toLowerCase() == 'text') {

				var elm = $(this);

				if (elm.val() == '' || elm.val() == options.msg) {
					elm.attr('value', options.msg);
					elm.addClass(options.help_class);
				} else {
					elm.data('entered', true);
				}

				elm.bind('focusin.ui', function () {
					if (!elm.data('entered')) {
						elm.val('');
						elm.removeClass('input-help');
						elm.data('entered', true);
					}
				});

				elm.bind('focusout.ui', function () {
					if (elm.val() == '') {
						elm.attr('value', options.msg);
						elm.addClass(options.help_class);
						elm.removeData('entered');
					}
				});

				elm.parents('form').bind('submit.ui', function () {
					if (elm.val() == options.msg) {
						elm.val('');
					}
				});
			}
		});
	}

	$.fn.adReset = function (options) //--------------------------ad position
	{
		var options = $.extend({
				target: null,
				callback: null,
				tarCss: {},
				tarAutoWidth: true,
				minWidth: 768,
				bottom: null,
				isFloat: false
			}, options)
			, is_mobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase())
			;

		return this.each(function () {
			var elm = $(this);
			var elmWidth = elm.outerWidth();
			var tmp;
			if (elm.hasClass('is_mobile') || (!options.isFloat && (!options.target || !options.target.size() || options.target.css('display') == 'none'))) {
				return;
			}
			function resize() {
				if (options.target && options.target.size() && (is_mobile || $(window).width() + 15 <= options.minWidth)) {
					elm.css({position: 'absolute', display: 'block'});
					options.target.css($.extend({height: elm.outerHeight(), width: options.tarAutoWidth ? 'auto' : elm.outerWidth()}, options.tarCss));
					if (elm.offset().top == options.target.offset().top && elm.outerHeight() == options.target.outerHeight())
						return;
					if (options.tarAutoWidth) {
						elm.css({left: 0, right: 0, marginLeft: 'auto', marginRight: 'auto'});
						elm.offset({top: options.target.offset().top});
					} else {
						elm.offset({top: options.target.offset().top, left: options.target.offset().left});
					}
				} else if (options.isFloat) {

					if (options.target && options.target.size()) {
						options.target.removeAttr('style');
					}

					var top = tmp ? tmp.offset().top : elm.offset().top;
					if ($(window).scrollTop() - top <= 0 || ($(window).scrollTop() > options.bottom.offset().top - elm.outerHeight() - 20)) {
						if (tmp)
							tmp.remove();
						tmp = null;
						elm.removeAttr('style');
						return;
					}

					if (!tmp) {
						tmp = $('<div style="width:' + elmWidth + 'px;height:' + elm.outerHeight() + 'px;clear:both"></div>');
						tmp.insertBefore(elm);
					}
					elm.removeAttr('style');
					elm.css({width: elmWidth, position: 'fixed', top: '0'});
				} else {
					if (tmp) {
						tmp.remove();
						tmp = null;
					}
					if (options.target && options.target.size()) {
						options.target.removeAttr('style');
					}
					elm.removeAttr('style');
				}
			}

			resize();
			$(window).scroll(resize);
			$(window).resize(resize);
			if (typeof options.callback === 'function') {
				options.callback(resize);
			}
		});
	}

	$.fn.iframeAutoHeight = function () //--------------------------ad position
	{
		return this.each(function () {
			var t = $(this);
			var iframe = t[0];
			t.load(function(){
				var iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;
				if (iframeWin.document.body) {
					iframe.height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight;
				}
			});

		});
	}
        
    $.fn.colcarousel = function(options) //------------------------- Column Carousel
    {
        var defaults = {};
        defaults.current_slide = 0;
        defaults.delay = 4;

        var options = $.extend(defaults, options);

        return this.each(function()
        {
            var elm = $(this);
            var timer;
            var hover = false;
            var count = 0;

            elm.unbind('mouseenter').bind('mouseenter', function() { hover = true; });
            elm.unbind('mouseleave').bind('mouseleave', function() { hover = false; });
            elm.find('.item').append('<div class="pointer"></div>');
            elm.find('.item-title a').unbind('click').bind('click', selectSlide);
            elm.find('.item-image').each(function()
            {                
                elm.find('.colcarousel-screen').append($(this));
                $(this).show();
            });

            function nextSlide()
            {
            if (options.current_slide >= elm.find('.item-title a').size()-1) {
              options.current_slide = 0;
            } else {
              options.current_slide++;
            }

            count = 0;
            getSlide();
            }

            function selectSlide(e)
            {
                e.preventDefault();
                options.current_slide = elm.find('.item-title a').index(this);
                getSlide();
            }

            function getSlide()
            {
                var slide = elm.find('.item:eq(' + options.current_slide + ')');

                elm.find('.item-image').hide();
                elm.find('.item-image:eq(' + options.current_slide + ')').show();
                elm.find('.item').removeClass('selected');
                slide.addClass('selected');
            };

            getSlide();
            timer = setInterval(function()
            {
                count++;
                if (hover == true) { count = 0; }
                if (count > options.delay) {
                  nextSlide();
                };
            }, 1000);
        });
    }

    $.fn.selectmenu = function(options) //------------------------- Custom Select Menu
    {
        var defaults = {};
        defaults.opendepth = 90; // z-index when open
        defaults.classname = 'selectmenu';
        defaults.linkmode = false;
        defaults.onSelect;
        defaults.onInit;
        defaults.width;
        defaults.value;

        var options = $.extend(defaults, options);

        return $(this).each(function()
        {
            var elm = $(this);
            var target = elm;
            var markup = '';
            var markup_id = '';
            var fieldname = elm.attr('name');
            var fieldvalue;
            var selectmenu;
            var size = elm.width();
            var closedepth = elm.css('z-index');
            var menu;
            var keypos = 0;
            var lastkey = '';
            var lockmouseover = false;
            var option;

            // set the form value of the field.
            if (options.value != null) {
                fieldvalue = options.value;
            } else {
                option = elm.find('option:selected');
                if (option.attr('value')) {
                    fieldvalue = option.attr('value');
                } else {
                    fieldvalue = '';
                }
            }

            // set the id of the element
            if (elm.attr('id')) {
                markup_id = ' id="' + elm.attr('id') + '"';
            }

            // draw the new menu
            markup += '<div class="' + options.classname + '" style="width:' + elm.width() + 'px;"><div class="label"><div class="text"></div></div>';
            markup += '<input type="button" class="keytrigger" style="position:absolute; left:-99999px; width:10px;" /><ul>';

            elm.find('option').each(function()
            {
                var id = '';
                if ($(this).attr('id')) { id = ' id="' + $(this).attr('id') + '"'; }
                markup += '<li' + id + '><a href="' + $(this).attr('value') + '">' + $(this).text() + '</a></li>';
            });

            markup += '</ul></div>';

            // create the new elements and hide the old
            selectmenu = $(markup);
            selectmenu.insertBefore(elm);
            elm.hide();

            /// if (fieldvalue != '') { selectmenu.find('.label .text').text(option.text()); }
            selectmenu.find('.label .text').text(option.text());

            // initialize the menu elements
            menu = selectmenu.find('ul');
            menu.find('li a').bind('click.selectmenuitem', function(e)
            {
                e.preventDefault();
                if (options.linkmode == true && $(this).attr('href') != '') {
                    linkTo($(this).attr('href'));
                } else {
                    setValue(menu.find('li a').index($(this)));
                }
            });

            menu.find('li a').bind('mouseover.selectmenuitem', function()
            {
                if (lockmouseover == true) { return; };
                $(this).addClass('hover');
            });

            menu.find('li a').bind('mouseout.selectmenuitem', function()
            {
                $(this).removeClass('hover');
            });

            selectmenu.find('.keytrigger').bind('focus.selectmenu', function()
            {
                selectmenu.find('.label').css({ outline:'3px dotted #aaaaaa' });
                $(document).keydown(function(e)
                {
                    e.preventDefault();
                    $(document).unbind('keydown');

                    if (e.keyCode == 30) { showMenu(); }
                    if (e.keyCode == 38 || e.keyCode == 40) { if (menu.css('display') == 'none') { showMenu(); } prevItem(); }
                });
            });

            selectmenu.find('.keytrigger').bind('blur.selectmenu', function()
            {
                selectmenu.find('.label').css({ outline:'none' });
                $('html').unbind('keypress.triggerselectmenu');
                hideMenu();
            });

            // handle show/hide events
            selectmenu.bind('click.selectmenu', function(e)
            {
                e.stopPropagation();
                hideMenus($(this));

                if (menu.css('display') == 'none') {
                    showMenu();
                } else {
                    hideMenu();
                }
            });

            if (options.onInit != null) {
                options.onInit();
            }


            function hideMenus(exempt) // hide all menus except this one
            {
                $('body .selectmenu').each(function()
                {
                    if ($(this) != exempt) {
                        hideMenu($(this));
                    }
                });
            }

            function showMenu()
            {
                lockmouseover = false;
                menu.fadeIn('fast');
                selectmenu.css({ zIndex:options.opendepth });
                $('body').bind('click.selectmenu', function() { hideMenu(); });
                enableKeys();
            }

            function hideMenu(elm) // hide specified menu
            {
                if (elm == null) { elm = selectmenu; }

                elm.find('ul').fadeOut('fast', function() { elm.css({ zIndex:closedepth }); });
                $('body').unbind('click.selectmenu');
                disableKeys();
            }

            function linkTo(url)
            {
                document.location.href = url;
            }

            function setValue(i)
            {
                var option = target.find('option:eq(' + i + ')');
                var val = option.val();

                target.find('option').removeAttr('selected');
                option.attr('selected', 'selected');
                selectmenu.find('.label .text').text(option.text());

                if (options.onSelect != null) {
                    options.onSelect(val);
                }
            }

            function enableKeys()
            {
                $(document).keydown(function(e)
                {
                    var char = String.fromCharCode(e.which);
                    e.preventDefault();
                    lockmouseover = true;

                    if (e.keyCode == 13) {
                        menu.find('li a.hilighted').trigger('click.selectmenuitem');
                        hideMenu();
                    } else {

                        if (e.keyCode == 38) {
                            prevItem();
                        } else if (e.keyCode == 40) {
                            nextItem();
                        } else {
                            findItem(char);
                        }
                    }


                });
            }

            function disableKeys()
            {
                $(document).unbind('keydown');
            }

            function prevItem()
            {
                var i = menu.find('li a').index(menu.find('li a.hilighted'));

                if (i > 0) {
                    selectItem(i-1);
                } else {
                    selectItem(0);
                }
            }

            function nextItem()
            {
                var i = menu.find('li a').index(menu.find('li a.hilighted'));

                if (i < menu.find('li a').size()-1) {
                    selectItem(i+1);
                }
            }

            function selectItem(n)
            {
                menu.find('li a').removeClass('hilighted');
                menu.find('li a:eq(' + n + ')').addClass('hilighted');
                menu.scrollTop(0);
                menu.scrollTop(menu.find('li a.hilighted').position().top - menu.position().top - menu.height() + menu.find('li a').parent().height());
                manageMouseover();
            }

            function findItem(c)
            {
                var found = false;
                var key;

                c = c.toLowerCase();

                menu.find('li a').each(function(i)
                {
                    var self = $(this);

                    key = String(self.html().toLowerCase()).substring(0,1);
                    self.removeClass('hilighted');
                    self.removeClass('hover');

                    if (key == c) {

                        if (key != lastkey) { keypos = -1; }

                        if (i > keypos) {
                            found = true;
                            menu.scrollTop(0);
                            menu.scrollTop($(this).parent().position().top - menu.position().top - menu.height() + self.parent().height());
                            keypos = i;
                            self.addClass('hilighted');

                            manageMouseover();

                            lastkey = key;
                            return false;
                        }
                    }
                });

                if (found == false && c == lastkey) {
                    lastkey = '';
                    findItem(c);
                }
            }

            function manageMouseover()
            {
                $('html').bind('mousemove.selectmenu', function()
                {
                    keypos = 0;
                    lastkey = null;
                    menu.find('li a').removeClass('hilighted');
                    lockmouseover = false;
                    $('html').unbind('mousemove.selectmenu');
                });
            }

        });
    }

	$.fn.selectGoto = function(){
		return this.each(function () {
			var elm = $(this)
			elm.change(function(){
				if(elm.attr('value'))
					window.location.href = elm.attr('value');
			});

		});
	}

	$.fn.slideshow = function(options){
		var options = $.extend({
			slide: $('.content-section-box'),
			img: '.slide-viewer',
			prevBtn: '.prev',
			nextBtn: '.next',
			nextPage:'.next-pg',
			pageNav:'.slide-nav',
			title:'.slide-title h2',
			body:'.content-box-body'
		}, options);

		return this.each(function(){
			var elm = $(this),
				slide  = options.slide,
				img  = elm.find(options.img),
				prevBtn  = elm.find(options.prevBtn),
				nextBtn  = elm.find(options.nextBtn),
				pageNav  = elm.find(options.pageNav),
				pages  = null,
				nextPage  = elm.find(options.nextPage),
				title  = elm.find(options.title),
				body  = elm.find(options.body),
				pagesLen  = slide.size(),
				preInd = -1,
				ind = 0;

			var page = ['<ul class="pagination slidepage">'];
			for(var i = 0; i < pagesLen; i++){
				page.push('<li><a href="javascript:;" class="btn'+(i == 0 ? ' select' : '')+'">'+(i+1)+'</a></li>');
			}
			page.push('</ul>');

			pageNav.html(page.join(' '));
			pages = pageNav.find('li');

			function goto(){
				if(ind < 0){
					ind = 0;
				}else if(ind >= pagesLen){
					ind = pagesLen -1;
				}

				if(preInd == ind)
					return;

				pages.removeClass('selected');
				pages.eq(ind).addClass('selected');
				preInd = ind;
				var oc = slide.eq(ind);
				var on = slide.eq(ind + 1);
				var onTit = on.find('.content-subhead h2, .title h2').html();
				img.html(oc.find('.content-img, .content-related').html());
				title.html(oc.find('.content-subhead h2').html());
				body.html(oc.find('.content-box').html());

				if(ind == pagesLen -1){
					nextBtn.addClass('disabled');
				}else if(ind == 0){
					prevBtn.addClass('disabled');
				}else{
					prevBtn.removeClass('disabled');
					nextBtn.removeClass('disabled');
				}

				if(onTit){
					nextPage.html(onTit).css({display:'block'});
					nextPage.css({display:'block'});
				}else{
					nextPage.css({display:'none'});
				}

				triggerGoogleAnalytics();
				refreshAdUnits();
			}

			pages.bind('click', function(){
				ind = pages.index($(this));
				goto();
				return true;
			});
			prevBtn.bind('click', function(){
				ind--;
				goto();
				return false;
			});
			nextBtn.bind('click', function(){
				ind++;
				goto();
				return false;
			});
			nextPage.bind('click', function(){
				ind++;
				goto();
				return false;
			});

			goto();

		});
	}

	$.fn.chapterTab = function(options){
		var options = $.extend({
			chapter: '.ui-tabset li',
			section: '.tabcontent',
			title: '.menuleft li',
			subTitle: '.menuright > ol'
		}, options);

		return this.each(function(){
			var elm = $(this),
				chapter = elm.find(options.chapter),
				section = elm.find(options.section);

			chapter.bind('click', function(){
				var t = $(this);
				var ind = chapter.index(t);

				chapter.removeClass('selected');
				t.addClass('selected');
				var curSec = section.hide().eq(ind);
				var title = curSec.find(options.title);
				var subTitle = curSec.find(options.subTitle);
				title.removeClass('selected');
				title.eq(0).addClass('selected');
				subTitle.hide();
				subTitle.eq(0).show();
				curSec.show();
			});
			section.each(function(i){
				var title = $(this).find(options.title);
				var subTitle = $(this).find(options.subTitle);
				title.bind('click', function(){
					var t = $(this);
					var ind = title.index(t);
					title.removeClass('selected');
					t.addClass('selected');
					subTitle.hide();
					subTitle.eq(ind).show();
				});
			});
			/*title.bind('click', function(){
				var t = $(this);
				var ind = chapter.index(t);
				title.removeClass('selected');
				t.addClass('selected');
				subTitle.hide().eq(ind).show();
			});*/
		});
	}


	/* ============== actions ============== */
	$(function () {
		//global config
		var g_config = window.g_config || {};
		var is_mobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase());
		var win = $(window);



		//member
		String.prototype.replaceAll = function (find, replace) {
			return this.replace(new RegExp(find, 'g'), replace);
		}
		var menu = '<li><a class="MenuFreeNewsletters" href="/accounts/signupnewsletter/?returnurl=http://www.investopedia.com/default.aspx">Free Newsletters</a></li>' +
			'<li><a href="http://investopedia.ar.wilink.com/" target="_blank" rel="nofollow">Free Annual Reports</a></li>' +
			'<li><a rel="nofollow" href="/accounts/manageprofile.aspx" target="_top">My Account ({name})</a></li>' +
			'<li><a href="/accounts/logout.aspx?returnurl={request_uri}"  rel="nofollow" target="_top">Sign Out</a></li>';
		var mobileMenu = '<a rel="nofollow" href="/accounts/manageprofile.aspx" target="_top">My Account ({name})</a> <a href="/accounts/logout.aspx?returnurl={request_uri}"  rel="nofollow" target="_top">Sign Out</a>';
		var updated = false;
		if(!updated) {
			$.ajax({
				type : "POST",
				url : "/vcb_lib/accounts/user-menu.php?returnurl="+ g_config.requestUri,
				dataType : "json",
				success : function(data) {
					if(data.name) {
						menu = menu.replaceAll('{request_uri}',data.request_uri).replaceAll('{name}',data.name);
						mobileMenu = mobileMenu.replaceAll('{request_uri}',data.request_uri).replaceAll('{name}',data.name);
						$('.user-nav').html(menu);
						$('.m-login').html(mobileMenu).addClass('m-account').removeClass('m-login');
						updated = true;
					}
				}
			});
		}

		//inv search
		var invSearchText = $('.invSearchText');
		var invSearchBtn = $('.invSearchBtn');
		function invGoto(i) {
			var value = encodeURIComponent($.trim(invSearchText.eq(i).val()));
			if (value && value != 'Search%20Investopedia' && value.length > 0) {
				window.location = '/search/default.aspx?q=' + value;
			}
		}
		invSearchText.helptext({ msg: 'Search Investopedia' });
		invSearchText.bind('keypress',function (e) {
			var code = (e.keyCode ? e.keyCode : e.which);
			if (code == 13) {
				invGoto(invSearchText.index($(this)));
				return false;
			}
		});
		invSearchBtn.bind('click', function () {
			invGoto(invSearchBtn.index($(this)));
			return false;
		});

		//quote search
		var quoteSearchText = $('form.filter-form input[name="symbol"]');
		quoteSearchText.helptext({ msg: 'Symbol' });

		//mobile search
		var mSearchIcon = $('.m-search-box');
		var mainBodyForSearch = $('.ad-leaderboard,#Content, #Footer');
		$('.m-search-icon').toggle(
			function () {
				$(this).addClass('active');
				mSearchIcon.addClass('open-search');
				mainBodyForSearch.addClass('open-search');
				$('body').addClass('open-body');
			},
			function () {
				$(this).removeClass('active');
				mSearchIcon.removeClass('open-search');
				mainBodyForSearch.removeClass('open-search');
				$('body').removeClass('open-body');
			}
		);

		//mobile nav
		var nav = $('#Nav');
		var mainBody = $('.ad-leaderboard, #Header, #Content, #Footer');
		var menuList = $('.menulist');
		var itemIcon = menuList.find('i');

		$('.m-nav-icon').toggle(
			function () {
				$(this).addClass('active');
				menuList.find('.selected').removeClass('selected');
				menuList.find('.active').addClass('selected');

				if(!is_mobile){
				nav.animate({left: 0}, 250);
				mainBody.animate({left: 200}, 250);
					return;
				}

				nav.addClass('open-nav');
				mainBody.addClass('open-content');
			},
			function () {
				$(this).removeClass('active');

				if(!is_mobile){
				nav.animate({left: -200}, 250);
				mainBody.animate({left: 0}, 250);
					return;
				}

				nav.removeClass('open-nav');
				mainBody.removeClass('open-content');
			}
		);

		itemIcon.bind('click.ui', function () {
			var _t = $(this), _p = _t.parent();
			if (_p.hasClass('selected')) {
				_p.removeClass('selected');
				return;
			}
			menuList.find('.selected').removeClass('selected');
			_p.addClass('selected');
		});

		//print_button
		$('.print_button').bind('click.ui', function () {
			$curl = window.location.href.split('#');
			$nurl = $curl[0] + ($curl[0].indexOf('?') > 0 ? '&':'?') + 'view=print';
			window.open($nurl);
			return false;
		});

		//font-size
		$('.font-size span').bind('click.ui', function () {
			var hSize = {
				'15px': '23px',
				'17px': '25px',
				'19px': '26px'
			}
			$('.layout-body').attr('style', 'font-size:' + $(this).css('font-size') + ' !important');
			if(hSize[$(this).css('font-size')]){
				$('.layout-body h2, .layout-body h3').attr('style', 'font-size:' + hSize[$(this).css('font-size')] + ' !important');
			}
		});

		//newsletter
		var nlForm = $('form.newsletter-widget-form');
		$('form.newsletter-widget-form-content input[name=email]').helptext({msg: 'Enter e-mail address'});
		$('form.newsletter-widget-form-footer input[name=email]').helptext({msg: 'Sign Up for Our Free Newsletters!'});
		nlForm.submit(function (e) {
				var result = false;
				$(this).find("input[name=email]").validate({
					rules: [
						{ type: "notempty", msg: "Please provide your email address." },
						{ type: "email" }
					],
					onComplete: function (res, elm) {
						result = res;
					} });
				return result;
			}
		);

		//article body
		var artileLastElement = $('.layout-body-article .content-box').children().last();
		if(artileLastElement.size() && artileLastElement[0].nodeName.toLowerCase() == 'p' && !$('#AdSlot_BC-TextNote').size()){
			artileLastElement.addClass('last-spacing');
		}

		//go to top
		$('.to-top').bind('click.ui', function () {
			$("html,body").animate({scrollTop: 0}, 1000);
			return false;
		});

		//ad responsive
		var afRightMulti = $('.af-right-multi')
			, bfRightMulti = $('.bf-right-multi')
			, afResponsive = $('.af-responsive')
			, bfResponsive = $('.bf-responsive')
			;


		if (afResponsive.size()) {
			afRightMulti.adReset({target: afResponsive, tarCss: {marginBottom: 30}});
		}
		bfRightMulti.adReset({target: bfResponsive, isFloat: true, bottom: $('#Footer'), tarCss: {marginBottom: 30}});

		//article-related-articles
		$('.article-related-articles').adReset({target: $('.article-related-articles-responsive'), tarCss: {marginBottom: 30}});

        //forex
        $('.live-rates').adReset({target: $('.live-rates-responsive'), tarCss:{marginBottom:30}});
        $('.currency-converter-panel').adReset({target: $('.currency-converter-responsive'), tarCss:{marginBottom:30}});
                
                //right-related
                $('.right-related').adReset({target: $('.right-related-responsive'),tarCss:{marginBottom:30}});
                //right related below
                $('.right-related-b').adReset({target: $('.right-related-b-responsive'),tarCss:{marginBottom:30}});

		//marketplace
		$('#adPartnerLinks iframe').iframeAutoHeight();

		$('.slideshow').slideshow();

		var tutorial_nav = $('.tutorial_nav');
		if(tutorial_nav.size()){
			tutorial_nav.scrollTop(tutorial_nav.find('.selected').position().top);
		}
		
		//responsive design menu
		$('.menu-dropdown').toggle(function(){
			$(this).addClass('active');
		},function(){
			$(this).removeClass('active');
		});
		$('.walkthrough_tab').chapterTab();
		//$('.menu-dropdown li').
	});

})($);