(function(e) {
	$.fn.video_background = function(R) {
		var I = "background-video",
			p = "padding",
			O = "0",
			Y = "100%",
			N = "position",
			y = false,
			q = true,
			V = q,
			j = q,
			M = y,
			P = "16:9",
			f, E = y,
			s = y,
			L = y,
			F = y,
			C = y,
			U = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i),
			o = $(this);
		if (R.loop != e) {
			if (R.loop == "true") V = q;
			else if (R.loop == "false") V = y;
		}
		if (R.autoplay != e) {
			if (R.autoplay == "true") j = q;
			else if (R.autoplay == "false") j = y;
		}
		if (R.muted != e) {
			if (R.muted == "true") M = q;
			else if (R.muted == "false") M = y;
		}
		var i = (U) ? R.formatMobile : R.format;
		if (i != e) {
			var W = new RegExp("[0-9][0-9]*:[0-9][0-9]*");
			if (i.match(W)) P = i;
			else alert("INVALID FORMAT");
		}
		var u = "",
			r = "",
			x, Z, S = 0;
		while (P[S] != ':') {
			u += P[S];
			S++;
		}
		x = parseFloat(u, 10);
		S++;
		while (S < P.length) {
			r += P[S];
			S++;
		}
		Z = parseFloat(r, 10);
		if (!U) {
			if (R.mp4 != e) s = q;
			if (R.webm != e) L = q;
			if (R.flv != e) F = q;
			if (R.ogg != e) C = q;
		} else {
			if (R.mp4Mobile != e) s = q;
			if (R.webmMobile != e) L = q;
			if (R.flvMobile != e) F = q;
			if (R.oggMobile != e) C = q;
		}
		var B = $("<div id='background-video'></div>"),
			X = $("<div id='background-video-mask'></div>");
		X.css(N, "fixed");
		X.css("width", Y);
		X.css("height", Y);
		X.css("margin", O);
		X.css(p, O);
		X.css("left", O);
		X.css("top", O);
		X.css("overflow", "hidden");
		X.css("z-index", "-5");
		B.css(N, "absolute");
		B.css("margin", O);
		B.css(p, O);
		X.append(B);
		o.append(X);
		$(window).resize(function() {
			var l = $(window).width(),
				J = $(window).height(),
				c, K;
			c = l;
			K = c * Z / x;
			if (K < J) {
				K = J;
				c = x * K / Z;
			}
			B.css("width", c);
			B.css("height", K);
			B.css("left", l / 2 - c / 2);
			B.css("top", J / 2 - K / 2);
		});
		$(window).trigger('resize');

		function g(l) {
			f = document.getElementById(l.id);
		}
		var H = function() {
				var l = 'autoplay',
					J = "",
					c = "",
					K = "",
					D = y;
				if (Modernizr.video.h264 && s) {
					if (U) J = R.mp4Mobile;
					else J = R.mp4;
					c = "video/mp4";
				} else if (Modernizr.video.ogg && C) {
					if (U) J = R.oggMobile;
					else J = R.ogg;
					c = "video/ogg";
				} else if (Modernizr.video.webm && L) {
					if (U) J = R.webmMobile;
					else J = R.webm;
					c = "video/webm";
				} else D = q;
				if (!D) {
					var G = document.createElement('video');
					G.setAttribute('id', 'background-video-id');
					G.setAttribute('width', '100%');
					G.setAttribute('height', '100%');
					G.setAttribute('src', J);
					G.setAttribute('type', c);
					if (j) G.setAttribute(l, l);
					if (V) G.setAttribute('loop', 'loop');
					document.getElementById(I).appendChild(G);
					f = document.getElementById("background-video-id");
					E = q;
					if (M) background_mute();
				}
			},
			T = function() {
				B.append('<h1>You need at least Flash Player 9.0</h1>');
				var K = {
					url: ""
				},
					D = y;
				if (s) {
					if (U) K.url = R.mp4Mobile;
					else K.url = R.mp4;
				} else if (F) {
					if (U) K.url = R.flvMobile;
					else K.url = R.flv;
				} else D = q;
				if (!D) {
					K.loop = V;
					K.autoplay = j;
					K.muted = M;
					K.formW = x;
					K.formH = Z;
					swfobject.embedSWF("video/video.swf", I, Y, Y, "9.0", null, K, {
						allowfullscreen: q,
						allowScriptAccess: "always",
						wmode: "transparent"
					}, {
						name: "background-video-swf"
					}, g);
				} else H();
			},
			b = swfobject.getFlashPlayerVersion();
		if (b.major > 9) {
			T();
		} else if (Modernizr.video) {
			H();
		}
		function a() {
			if (E) return !f.paused;
			else return f.isPlaying();
		}
		background_play = function() {
			if (E) f.play();
			else f.resume();
		};
		background_pause = function() {
			f.pause();
		};
		background_toggle_play = function() {
			if (a()) background_pause();
			else background_play();
		};

		function w() {
			if (E) return !(f.volume);
			else return f.isMute();
		}
		background_mute = function() {
			if (E) f.volume = 0;
			else f.mute();
		};
		background_unmute = function() {
			if (E) f.volume = 1;
			else f.unmute();
		};
		background_toggle_sound = function() {
			if (w()) background_unmute();
			else background_mute();
		};
		var t = y;
		background_hide = function() {
			background_pause();
			X.stop().fadeTo(700, 0);
			t = q;
		};
		background_show = function() {
			background_play();
			X.stop().fadeTo(700, 1);
			t = y;
		};
		background_toggle_hide = function() {
			if (t) background_show();
			else background_hide();
		};
		background_rewind = function() {
			if (E) f.currentTime = 0;
			else f.rewind();
		};
	};
}());
jQuery(document).ready(function(N) {
	buttonsClass("div.social_button");
	N("body").video_background({
		format: "16:9",
		mp4: "video/loop3.mp4",
		webm: "video/loop3.webm",
		flv: "videos/loop3.flv",
		formatMobile: "16:9",
		mp4Mobile: "video/loop3.mp4",
		webmMobile: "video/loop3.webm",
		flvMobile: "videos/loop3.flv",
		loop: "true",
		autoplay: "true",
		muted: "true"
	});
});