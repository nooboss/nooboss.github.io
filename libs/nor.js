/**
 * @Project: ReferrerKiller.
 * @Licence: The MIT License.
 * @Author: Juan Pablo Guereca.
 */
var ReferrerKiller = (function () {
	var URL_REDIRECTION = "https://www.google.com/url?q=", // You can use another service if you use https protocol no referrer will be sent.
		PUB = {},
		IE_GT_8 = (function () {
				/*- Detecting if it's IE greater than 8 -*/
				var trident,
					match = navigator.userAgent.match(/Trident\/(\d)+/);
				if (null === match) {
					return false;
				}
				trident = parseInt(match[1], 10);
				if (isNaN(trident)) {
					return false;
				}
				return trident > 4;
		})();
	function escapeDoubleQuotes(str) {
		return str.split('"').join('\\"');
	}
	function htmlToNode(html) {
		var container = document.createElement('div');
		container.innerHTML = html;
		return container.firstChild;
	}
	function objectToHtmlAttributes(obj) {
		var attributes = [],
			value;
		for (var name in obj) {
			value = obj[name];
			attributes.push(name + '="' + escapeDoubleQuotes(value) + '"');
		}
		return attributes.join(' ');
	}
	function htmlString(html, iframeAttributes) {
		var iframeAttributes  = iframeAttributes || {},
			defaultStyles = 'border:none; overflow:hidden; ',
			id;
		/*-- Setting default styles and letting the option to add more or overwrite them --*/
		if ('style' in iframeAttributes) {
			iframeAttributes.style =  defaultStyles + iframeAttributes.style;
		} else {
			iframeAttributes.style = defaultStyles;
		}
		id = '__referrer_killer_' + (new Date).getTime() + Math.floor(Math.random()*9999);
		/*-- Returning html with the hack wrapper --*/
		return '<iframe \
				style="border 1px solid #ff0000" \
				scrolling="no" \
				frameborder="no" \
				allowtransparency="true" ' +
			/*-- Adding style attribute --*/
			objectToHtmlAttributes( iframeAttributes ) +
			'id="' + id + '" ' +
			'	src="javascript:\'\
			<!doctype html>\
			<html>\
			<head>\
			<meta charset=\\\'utf-8\\\'>\
			<style>*{margin:0;padding:0;border:0;}</style>\
			</head>' +
			/*-- Function to adapt iframe's size to content's size --*/
			'<script>\
				 function resizeWindow() {\
					var elems  = document.getElementsByTagName(\\\'*\\\'),\
						width  = 0,\
						height = 0,\
						first  = document.body.firstChild,\
						elem;\
					if (first.offsetHeight && first.offsetWidth) {\
						width = first.offsetWidth;\
						height = first.offsetHeight;\
					} else {\
						for (var i in elems) {\
											elem = elems[i];\
											if (!elem.offsetWidth) {\
												continue;\
											}\
											width  = Math.max(elem.offsetWidth, width);\
											height = Math.max(elem.offsetHeight, height);\
						}\
					}\
					var ifr = parent.document.getElementById(\\\'' + id + '\\\');\
					ifr.height = height;\
					ifr.width  = width;\
				}\
			</script>' +
			'<body onload=\\\'resizeWindow()\\\'>\' + decodeURIComponent(\'' +
			/*-- Content --*/
			encodeURIComponent(html) +
		'\') +\'</body></html>\'"></iframe>';
	}
	var linkHtml = PUB.linkHtml = function (url, innerHTML, anchorParams, iframeAttributes) {
		var html,
			urlRedirection = '';
		innerHTML = innerHTML || false;
		/*-- If there is no innerHTML use the url as innerHTML --*/
		if (!innerHTML) {
			innerHTML = url;
		}
		anchorParams = anchorParams || {};
		/*-- Making sure there is a target attribute and the value isn't '_self' --*/
		if (!('target' in anchorParams) || '_self' === anchorParams.target) {
			/*-- Converting _self to _top else it would open in the iframe container --*/
			anchorParams.target = '_top';
		}
		if (IE_GT_8) {
			urlRedirection = URL_REDIRECTION;
		}
		html = '<a rel="noreferrer" href="' + urlRedirection + escapeDoubleQuotes(url) + '" ' + objectToHtmlAttributes(anchorParams) + '>' + innerHTML + '</a>';
		return htmlString(html, iframeAttributes);
	};
	var linkNode = PUB.linkNode = function (url, innerHTML, anchorParams, iframeAttributes) {
		return htmlToNode(linkHtml(url, innerHTML, anchorParams, iframeAttributes));
	};
	var imageHtml = PUB.imageHtml = function (url, imgAttributesParam) {
		var imgAttributes = imgAttributesParam || {},
		/*-- Making sure this styles are applyed in the image but let the possibility to overwrite them --*/
			defaultStyles = 'border:none; margin: 0; padding: 0';
		if ('style' in imgAttributes) {
			imgAttributes.style = defaultStyles + imgAttributes.style;
		} else {
			imgAttributes.style = defaultStyles;
		}
		return htmlString('<img src="' + escapeDoubleQuotes(url) + '" ' + objectToHtmlAttributes(imgAttributes) + '/>');
	};
	var imageNode = PUB.imageNode = function (url, imgParams) {
		return htmlToNode(imageHtml(url, imgParams));
	};
	console.log('LOADED NOR');
	return PUB;
})();
