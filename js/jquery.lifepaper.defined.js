(function() {
	(function(e) {
		var t;
		return e.event.special.tap = {
			setup: function() {
				return e(this).on("touchstart", t)
			},
			teardown: function() {
				return e(this).off("touchstart", t)
			}
		}, t = function(t) {
			var n, r, i;
			return n = e(t.target), i = function() {
				return n.data("touchmoved", !0)
			}, r = function() {
				n.off("touchmove", i), n.off("touchend", r);
				if (!n.data("touchmoved")) return n.trigger("tap")
			}, n.data("touchmoved", !1), n.on("touchmove", i), n.on("touchend", r)
		}
	})(jQuery), $(function() {
		var e, t, n, r, i, s, o, u, a, f, l, c, h, p, d, v, m, g, y, b, w, E, S;
		return v = navigator.userAgent.match(/(iPad|iPhone|iPod)/i) != null, S = {
			touch: "ontouchstart" in window
		}, h = {
			click: S.touch ? "tap" : "click",
			mousedown: S.touch ? "touchstart" : "mousedown",
			mouseup: S.touch ? "touchend" : "mouseup"
		}, p = {
			works_smallbg: {
				base: "scaleY(.5) rotate(-45deg)",
				size: {
					width: 320,
					height: 480
				},
				translate: {
					left: 130,
					top: -91
				}
			},
			works_bigbg: {
				base: "scaleY(.5) rotate(-45deg) scale(1.07)",
				size: {
					width: 665,
					height: 499
				},
				translate: {
					left: 117,
					top: -23
				}
			}
		}, u = $(window), e = $("#works .works_content"), i = $(".works figure"), r = $("#overlay_infor"), o = $(".timeline .content"), s = $(".timeline .bg"), t = $(".map-overlay"), n = $(".idea li"), m = (new Date).getTime(), f = 100, a = e.height(), c = e.width(), l = e.offset().top, v && setTimeout(function() {
			return window.scrollTo(0, 1)
		}, 0), g = function(e) {
			return e.children("div").each(function() {
				var e, t, n;
				return t = $(this), e = t.data("handle"), n = p[t.hasClass("works_smallbg") ? "works_smallbg" : "works_bigbg"], t.css(PrefixFree.prefixProperty("transform"), "translate3d(0px, 0px, 0px)"), e.css(PrefixFree.prefixProperty("transform"), "translate3d(" + n.translate.left + "px, " + n.translate.top + "px, 0px) " + n.base)
			}), i.not(e).removeClass(), setTimeout(function() {
				return e.removeClass()
			}, 500)
		}, w = function(e) {
			var t, n;
			return t = e.data("sub-height") + 50, n = u.scrollTop() - l + (u.height() - t) / 2, n + t > a ? n = a - t : n + l < l && (n = 0), e.attr("class", "fadein").children("div").each(function() {
				var e, t, r, i, s, o, a;
				return t = $(this), e = t.data("handle"), a = t.data("pos")[0], i = t.data("pos")[1], s = p[t.hasClass("works_smallbg") ? "works_smallbg" : "works_bigbg"], o = [i[0] - a[0], i[1] - a[1] + n], r = [i[0] - (c - u.width()) / 2, i[1] + n + l], t.css(PrefixFree.prefixProperty("transform"), "translate3d(" + o[0] + "px, " + o[1] + "px, 0px)").data("capt-pos", r), e.css(PrefixFree.prefixProperty("transform"), "translate3d(" + (o[0] + s.translate.left) + "px, " + (o[1] + s.translate.top) + "px, 0px) " + s.base)
			}), i.not(e).attr("class", "fadeout")
		}, E = function(e, t) {
			var n, i;
			return n = e.data("capt-pos"), r.empty().append(t.html()), i = {
				left: n[0] + e.width() / 2 - r.outerWidth() / 2,
				top: n[1] + e.height() / 2.2 - r.outerHeight()
			}, r.css(i).addClass("visible")
		}, d = function() {
			return r.removeClass("visible")
		}, y = function(e) {
			var t, n;
			return t = $(this).parent("figure"), n = i.filter(".fadein"), n.length > 0 ? (g(n), d()) : (w(t), E(e.data.targetScreen, t.children("figcaption"))), e.stopImmediatePropagation()
		}, b = function(e) {
			var t, n, r;
			return t = (new Date).getTime(), n = t - m, n < f ? (m = t + f - n, setTimeout(function() {
				return e.data.screen.addClass("ready")
			}, f - n)) : (r = t, e.data.screen.addClass("ready"))
		}, i.each(function() {
			var e;
			return e = $(this), e.children("div").each(function() {
				var t, n, r, i, s, o;
				r = $(this), n = r.find("img"), s = r.data("pos")[0], i = p[r.hasClass("works_smallbg") ? "works_smallbg" : "works_bigbg"], r.css({
					left: s[0],
					top: s[1]
				}), o = {
					left: "" + s[0] + "px",
					top: "" + s[1] + "px",
					width: "" + i.size.width + "px",
					height: "" + i.size.height + "px"
				}, o[PrefixFree.prefixProperty("transform")] = "translate3d(" + i.translate.left + "px, " + i.translate.top + "px, 0px) " + i.base, t = $('<span class="handle" />').css(o), e.append(t), r.data("handle", t), t.on(h.click, {
					targetScreen: r
				}, y), n.load({
					screen: r
				}, b);
				if (n[0].complete) return n.trigger("load")
			})
		}), r.on(h.click, function() {
			var e;
			return e = i.filter(".fadein"), g(e), d()
		}), r.on(h.click, "a", function(e) {
			return e.stopPropagation()
		}), v || (o.scroll(function() {
			var e;
			return e = o.scrollLeft() * -0.44, s.css("left", "" + e + "px")
		}), $(".scroll").on(h.click, function(e) {
			e.preventDefault(), $("html, body").animate({
				scrollTop: $(this.hash).offset().top
			}, 500);
			if (window.history != null && window.history.replaceState != null) return window.history.replaceState(null, null, this.hash)
		})), t.on(h.mousedown, function() {
			return t.addClass("transparent")
		}).on(h.mouseup, function() {
			return t.removeClass("transparent")
		}).find("a").on(h.mousedown, function(e) {
			return e.stopImmediatePropagation()
		}), n.each(function(e, t) {
			var r;
			return r = $(t), r.addClass("animate"), r.on("webkitAnimationEnd oAnimationEnd msAnimationEnd animationend", function() {
				r.removeClass("animate");
				if (e === 3) return setTimeout(function() {
					return n.addClass("animate")
				}, 100)
			})
		})
	})
}).call(this);