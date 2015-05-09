// $_GET
var $_GET = {};
document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
	function decode(s) {
		return decodeURIComponent(s.split("+").join(" "));
	}
	$_GET[decode(arguments[1])] = decode(arguments[2]);
});

/* <![CDATA[ */
var google_conversion_id     = 1010065244;
var google_conversion_label  = "zhBOCLSXsgUQ3L7R4QM";
var google_conversion_format = 3;
var google_custom_params     = '';
var google_remarketing_only  = true;
/* ]]> */

var as                  = {};
as.tags                 = _pageTaxonomy.Tags;
as.keyword              = $_GET['q'] || $_GET['key'];
as.taggroups            = [];
as.segs                 = [];
as.google_keyvalues     = [];
as.google_custom_params = {};
as.debug                = $_GET['asdebug'];

// tag to taggroup
if (as.tags) {
	as.tags.forEach(function (tag) {
		if (tag_taggroup_mapping[tag]) {
			tag_taggroup_mapping[tag].forEach(function (taggroup) {
				as.taggroups.push(taggroup.toLowerCase());
			});
		}
	});
}

// keyword to sem
if (as.keyword) {
	if (keyword_sem_mapping.keyword[as.keyword]) {
		keyword_sem_mapping.keyword[as.keyword].forEach(function (taggroup) {
			as.taggroups.push(taggroup.toLowerCase());
		});
	}
}

// taggroup/sem to seg
if (as.taggroups) {
	taggroup_seg_mapping.forEach(function (item) {
		if (as.taggroups.indexOf(item["VCB TagGroup"].toLowerCase()) != -1 || as.taggroups.indexOf(item["SEM Category"].toLowerCase()) != -1) {
			as.google_keyvalues.push({key: item["Google Key"], value: item["Google Value"]});
			as.segs.push(item["VCB Standard Segments"]);
		}
	});
}

// as.google_keyvalues aggregate to as.google_custom_params
if (as.google_keyvalues) {
	as.google_keyvalues.forEach(function (google_keyvalue) {
		if (!as.google_custom_params[google_keyvalue.key])
			as.google_custom_params[google_keyvalue.key] = [];
		if (as.google_custom_params[google_keyvalue.key].indexOf(google_keyvalue.value) == -1)
			as.google_custom_params[google_keyvalue.key].push(google_keyvalue.value);
	});
}

// user FA
if (!$.isEmptyObject(as.google_custom_params)) {
	google_custom_params = as.google_custom_params;
	$.ajax({
		type : "POST",
		url: '/vcb_lib/accounts/user-menu.php',
		dataType: 'json',
		data: '',
		async: false
	})
	.done(function (data) {								
		if(data.name && data.fa === true) {
			google_custom_params.FIN_interest.push('FA');
			google_custom_params.DATA_quality = 'REGISTERED';
		}
	});
}

// GeoIP then call smartpixel
if (!$.isEmptyObject(as.google_custom_params)) {
	
	$.ajax({
		url: '/vcb_lib/geoip.php',
		dataType: 'json',
		data: '',
		async: false
	})
	.done(function (geoip) {
		if (geoip.FIN_state)
			google_custom_params.FIN_state = geoip.FIN_state;
		if (geoip.FIN_zip)
			google_custom_params.FIN_zip = geoip.FIN_zip;
	})
	.always(function () {
		document.write("<script language=\"javascript\" src=\"//www.googleadservices.com/pagead/conversion.js\"><\/script>");
	});
}

// debug
if (as.debug)
	console.info('audience segment debug:', as);