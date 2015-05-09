var invWelcomeAd_LengthSeconds = 14;
var invWelcomeAd_CookieExpiry = 3600000; // One Hour.
var invWelcomeAd_AjaxStatus = null;
var invWelcomeAd_Hidden = false;
var invWelcomeAd_AjaxCheckUrl = '/vcb_lib/services/welcome-ad-enabled.php';
var invWelcomeAd_CookieDomain = invCookieDomain();

function invCookieDomain(){
	var host = window.location.host.toLowerCase();
	return host.replace('www.','');
}
function isInvWelcomeAdEnabled() {
	// check for test/force welcome ad to show
	if ((getUrlParam("wa") != null) && (getUrlParam("wa") == "1")) return true;

	// check for cookies or querystring params to disable the welcome ad
	if (($.cookie("AdViewed") != null) && ($.cookie("AdViewed") == "1")) return false;
	if ((getUrlParam('viewed') != null) && (getUrlParam("viewed") == "1")) return false;
	if ((getUrlParam('wa') != null) && (getUrlParam("wa") == "0")) return false;

	// check if welcome ad is enabled for this taxonomy channel/advertising category
	var taxonomyChannel = _pageTaxonomy["Channel"];
	var taxonomyAdvertising = _pageTaxonomy["Advertising"];
	if (isInvWelcomeAdEnabledForTaxonomy(taxonomyChannel, taxonomyAdvertising) == false) return false;

	// check for AJAX welcome ad enabled status
	if (isInvWelcomeAdEnabledInAjax() == false) return false;

	// show it!
	return true;
}

function isInvWelcomeAdEnabledInAjax() {
	if (invWelcomeAd_AjaxStatus == null) {
		var result = $.ajax({ type: "GET", url: invWelcomeAd_AjaxCheckUrl, async: false }).responseText;
		invWelcomeAd_AjaxStatus = result.toLowerCase();
	}
	return (invWelcomeAd_AjaxStatus == "true") ? true : false;
}

function isInvWelcomeAdEnabledForTaxonomy(taxonomyChannel, taxonomyAdvertising) {

	// check for disabled channels/advertising categories
	if (taxonomyChannel == "Accounts") return false;
	if (taxonomyAdvertising == "Unknown") return false;
	if (taxonomyAdvertising == "Unknown") return false;

	// check for disabled channels/advertising categories on first page visit
	if (isInvFirstPageVisit()) {
		if (taxonomyChannel == "Dictionary") return false;
	}

	return true;
}

function isInvFirstPageVisit() {
	if ((document.referrer == null) || (document.referrer.length == 0)) return true;
	if (document.referrer.toLowerCase().indexOf(invWelcomeAd_CookieDomain.toLowerCase()) >= 0) {
		return false;
	}
	return true;
}

function showInvWelcomeAd() {
	var innerContent = $('#WelcomeAd .ad #AdSlot_PG-Interstitial').children('div');
	if(!innerContent || innerContent.length <= 0)
		return false;

	var count = invWelcomeAd_LengthSeconds;
	var timer;

	$('body').addClass('w-ad');
	$('#WelcomeAd').show();
	$('#WelcomeAd .info').text('Ad will close in ' + count + ' seconds.');

	timer = setInterval(function () {
		if (count > 0) {
			$('#WelcomeAd .info').text('Ad will close in ' + count + ' seconds.');
			count--;
		} else {
			clearInterval(timer);
			closeInvWelcomeAd();
		}
	}, 1000);

	var invCookieExpires = new Date();
	invCookieExpires.setTime(invCookieExpires.getTime() + invWelcomeAd_CookieExpiry);
	$('.welcome-close').bind('click', closeInvWelcomeAd);
	$.cookie("AdViewed", "1", { expires: invCookieExpires, path: '/', domain: invWelcomeAd_CookieDomain });
};

function hideInvestopediaWelcomeAd() {
	invWelcomeAd_Hidden = true;
	closeInvWelcomeAd();
}

function closeInvWelcomeAd(e) {
	if (e != null) { e.preventDefault(); }
	if ($('#WelcomeAd').css("display") == "none") return;

	$('#WelcomeAd').hide();
	$(window).scrollTop(0);
	$('#MetaViewport').remove();
	$('body').removeClass('w-ad');
};