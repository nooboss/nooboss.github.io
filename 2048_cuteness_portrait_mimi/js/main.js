(function () {
	var b = "undefined" !== typeof window && "undefined" !== typeof window.document ? window.document: {},
	a = "undefined" !== typeof module && module.exports,
	c = "undefined" !== typeof Element && "ALLOW_KEYBOARD_INPUT" in Element,
	d = function () {
		for (var a, c = ["requestFullscreen exitFullscreen fullscreenElement fullscreenEnabled fullscreenchange fullscreenerror".split(" "), "webkitRequestFullscreen webkitExitFullscreen webkitFullscreenElement webkitFullscreenEnabled webkitfullscreenchange webkitfullscreenerror".split(" "), "webkitRequestFullScreen webkitCancelFullScreen webkitCurrentFullScreenElement webkitCancelFullScreen webkitfullscreenchange webkitfullscreenerror".split(" "), "mozRequestFullScreen mozCancelFullScreen mozFullScreenElement mozFullScreenEnabled mozfullscreenchange mozfullscreenerror".split(" "), "msRequestFullscreen msExitFullscreen msFullscreenElement msFullscreenEnabled MSFullscreenChange MSFullscreenError".split(" ")], f = 0, d = c.length, e = {}; f < d; f++) if ((a = c[f]) && a[1] in b) {
			for (f = 0; f < a.length; f++) e[c[0][f]] = a[f];
			return e
		}
		return ! 1
	} (),
	e = {
		change: d.fullscreenchange,
		error: d.fullscreenerror
	},
	h = {
		request: function (a) {
			var g = d.requestFullscreen;
			a = a || b.documentElement;
			if (/5\.1[.\d]* Safari/.test(navigator.userAgent)) a[g]();
			else a[g](c && Element.ALLOW_KEYBOARD_INPUT)
		},
		exit: function () {
			b[d.exitFullscreen]()
		},
		toggle: function (a) {
			this.isFullscreen ? this.exit() : this.request(a)
		},
		onchange: function (a) {
			this.on("change", a)
		},
		onerror: function (a) {
			this.on("error", a)
		},
		on: function (a, c) {
			var f = e[a];
			f && b.addEventListener(f, c, !1)
		},
		off: function (a, c) {
			var f = e[a];
			f && b.removeEventListener(f, c, !1)
		},
		raw: d
	};
	d ? (Object.defineProperties(h, {
		isFullscreen: {
			get: function () {
				return !! b[d.fullscreenElement]
			}
		},
		element: {
			enumerable: !0,
			get: function () {
				return b[d.fullscreenElement]
			}
		},
		enabled: {
			enumerable: !0,
			get: function () {
				return !! b[d.fullscreenEnabled]
			}
		}
	}), a ? module.exports = h: window.screenfull = h) : a ? module.exports = !1 : window.screenfull = !1
})();
function extractHostname(b) {
	b = -1 < b.indexOf("://") ? b.split("/")[2] : b.split("/")[0];
	b = b.split(":")[0];
	return b = b.split("?")[0]
}
function extractRootDomain(b) {
	b = extractHostname(b);
	var a = b.split("."),
	c = a.length;
	2 < c && (b = ("com" === a[c - 2] || "net" === a[c - 2] || "co" === a[c - 2]) && 3 <= c ? a[c - 3] + "." + a[c - 2] + "." + a[c - 1] : a[c - 2] + "." + a[c - 1]);
	return b
}
var getClosestTop = function () {
	var b = window,
	a = !1;
	try {
		for (; b.parent.document !== b.document;) if (b.parent.document) b = b.parent;
		else {
			a = !0;
			break
		}
	} catch(c) {
		a = !0
	}
	return {
		topFrame: b,
		err: a
	}
},
getBestPageUrl = function (b) {
	var a = b.topFrame,
	c = "";
	if (b.err) try {
		try {
			c = window.top.location.href
		} catch(e) {
			var d = window.location.ancestorOrigins;
			c = d[d.length - 1]
		}
	} catch(e) {
		c = a.document.referrer
	} else c = a.location.href;
	return c
},
TOPFRAMEOBJ = getClosestTop(),
PAGE_URL = getBestPageUrl(TOPFRAMEOBJ);
function showMoreGames() {
	0 < jQuery("#more-games-button").length && jQuery("#more-games-button").fadeIn()
}
function hideMoreGames() {
	0 < jQuery("#more-games-button").length && jQuery("#more-games-button").fadeOut()
}
function checkMoreGames(b) {
	var a = getGames(extractRootDomain(PAGE_URL));
	0 !== a.length && (jQuery("body").append('<div id="more-games-button"></div>'), jQuery("#more-games-button").on("click", function () {
		var b = "<div class='more-games-dialog-wrapper'><div class='more-games-dialog-block'></div><div class='more-games-dialog-content'><div class='more-games-dialog-scrolling'>";
		for (var d = 0; d < a.length; d++) b += "<a target='_blank' class='more-games-dialog-tile' href='" + a[d].url + "'>",
		b += "<img src='" + a[d].img + "' />",
		b += "</a>";
		b += "</div><div class='embed-and-earn'><a href='../../../gamedistribution.com/publishers/default.htm' target='_blank'>Earn with</br>our games</a><a target='_blank' href='../../../gamedistribution.com/Gamelist/Code-This Lab srl/default.htm'>Embed<br>our games</a></div><a href='../../../gamedistribution.com/Gamelist/Code-This Lab srl/default.htm'><div class='more-games-dialog-logo'></div></a></div><div class='more-games-dialog-exit'></div></div>";
		jQuery("body").append(b);
		setTimeout(function () {
			jQuery(".more-games-dialog-block").addClass("more-games-dialog-block-show");
			setTimeout(function () {
				jQuery(".more-games-dialog-content").addClass("more-games-dialog-content-show");
				jQuery(".more-games-dialog-exit").addClass("more-games-dialog-exit-show")
			},
			100)
		},
		100)
	}), jQuery("#more-games-button").fadeIn())
}
$(document).ready(function () {
	jQuery(document).on("click", ".more-games-dialog-exit", function () {
		jQuery(".more-games-dialog-content").removeClass("more-games-dialog-content-show");
		jQuery(".more-games-dialog-exit").removeClass("more-games-dialog-exit-show");
		setTimeout(function () {
			jQuery(".more-games-dialog-block").removeClass("more-games-dialog-block-show");
			setTimeout(function () {
				jQuery(".more-games-dialog-wrapper").remove()
			},
			500)
		},
		100)
	})
});
function getGames(b) {
	var a = [];
	switch (b) {
	case "codethislab.com":
	case "gamedistribution.com":
		a.push({
			img:
			"../../../img.gamedistribution.com/8f2d0e8b584d4eb5930a5158d08d163b.jpg",
			url: "../../../gamedistribution.com/Games/Shoot-'Em-Up/Dead-City.html"
		});
		a.push({
			img: "../../../img.gamedistribution.com/57acee2e2934416ea24a8c1c5a9ed8ea.jpg",
			url: "../../../gamedistribution.com/Games/Shooter/King-Bacon-VS-Vegans.html"
		});
		a.push({
			img: "../../../img.gamedistribution.com/fb59e2712b664e3d8c4d7decfcf419c9.jpg",
			url: "../../../gamedistribution.com/Games/Action/Cyclops-Ruins.html"
		});
		a.push({
			img: "../../../img.gamedistribution.com/4bf984a368a64b11a2748da4c66bcaa2.jpg",
			url: "../../../gamedistribution.com/Games/Board/Mastermind.html"
		});
		a.push({
			img: "../../../img.gamedistribution.com/4d081fdaff874976a47e3ec80ad9a393.jpg",
			url: "../../../gamedistribution.com/Games/Soccer/Penalty-Kicks.html"
		});
		a.push({
			img: "../../../img.gamedistribution.com/0f38da229ce44294b5aeaa52771b1608.jpg",
			url: "../../../gamedistribution.com/Games/Soccer/Foosball.html"
		});
		a.push({
			img: "../../../img.gamedistribution.com/28aad67b0b39407c93b372e83cb8cc88.jpg",
			url: "../../../gamedistribution.com/Games/Racing/Greyhound-Racing.html"
		});
		a.push({
			img: "../../../img.gamedistribution.com/902ee2d7bef446d79fde28bb28cd0f01.jpg",
			url: "../../../gamedistribution.com/Games/Match-3/Frogtastic.html"
		});
		a.push({
			img: "../../../img.gamedistribution.com/7b35c3ce549b408abe37f77990d7f6fa.jpg",
			url: "../../../gamedistribution.com/Games/Board/Nine-Mens-Morris.html"
		});
		a.push({
			img: "../../../img.gamedistribution.com/a4c67fbbc9bb4d70a26a85a91e5d12cc.jpg",
			url: "../../../gamedistribution.com/Games/Classic/Neon-Pong.html"
		});
		a.push({
			img: "../../../img.gamedistribution.com/3ab6d797bf8340139483367ac2dbf76b.jpg",
			url: "../../../gamedistribution.com/Games/Racing/Gear-Madness.html"
		});
		a.push({
			img: "../../../img.gamedistribution.com/c2820a1635844cff8c6c9b2bf0771df0.jpg",
			url: "../../../gamedistribution.com/Games/Addicting/2048--Cuteness-Edition.html"
		});
		a.push({
			img: "../../../img.gamedistribution.com/d96dc07738f248c49ae51c61facd4286.jpg",
			url: "../../../gamedistribution.com/Games/1-Player/Classic-Backgammon.html"
		});
		a.push({
			img: "../../../img.gamedistribution.com/f360e5b43093401ca1b9a6d54105ffd2.jpg",
			url: "../../../gamedistribution.com/Games/Golf/Minigolf-World.html"
		});
		a.push({
			img: "../../../img.gamedistribution.com/4ba63b68f15a4ecbb21eef429655dcc0.jpg",
			url: "../../../gamedistribution.com/Games/Board/Domino-Block.html"
		});
		a.push({
			img: "../../../img.gamedistribution.com/9881ac54b4ac48ad8b6fd92232e5ed4f.jpg",
			url: "../../../gamedistribution.com/Games/Jigsaw-Puzzle/Jigsaw-Deluxe.html"
		});
		a.push({
			img: "../../../img.gamedistribution.com/b2a3398e327b4f6da665759d6730aab4.jpg",
			url: "../../../gamedistribution.com/Games/Chess/Master-Chess.html"
		});
		a.push({
			img: "../../../img.gamedistribution.com/a82bfcc90a8548a3976b0b2d13dd37dd.jpg",
			url: "../../../gamedistribution.com/Games/Puzzle/Free-Words.html"
		});
		a.push({
			img: "../../../img.gamedistribution.com/d7b10d9e32844525a0bfa1fef7324895.jpg",
			url: "../../../gamedistribution.com/Games/Board/Connect-4.html"
		});
		a.push({
			img: "../../../img.gamedistribution.com/36b470b1f113447696c2704c6e1bd0c2.jpg",
			url: "../../../gamedistribution.com/Games/Skill/Snake-and-Blocks.html"
		});
		a.push({
			img: "../../../img.gamedistribution.com/e0d570df45e146899b986770297c0210.jpg",
			url: "../../../gamedistribution.com/Games/Board/Master-Checkers.html"
		});
		a.push({
			img: "../../../img.gamedistribution.com/2cea016521ab452692a0141a40dfde9b.jpg",
			url: "../../../gamedistribution.com/Games/Sports/Swimming-Pro.html"
		});
		a.push({
			img: "../../../img.gamedistribution.com/3be284e237de4c7ba3a9e5cac0fd6ee3.jpg",
			url: "../../../gamedistribution.com/Games/Soccer/Freekick-Training.html"
		});
		break;
	case "a10.com":
		a.push({
			img:
			"../../../files.cdn.spilcloud.com/thumbs-6-0/200X120_170460_1502450874.png",
			url: "../../../www.a10.com/popular-games/snake-and-blocks"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-7/200X120_165627.jpg",
			url: "../../../www.a10.com/action-games/swimming-pro"
		});
		break;
	case "10000paixnidia.gr":
		a.push({
			img:
			"../../../media.bfgfile.com/images/33_2121d.jpg",
			url: "../../../www.10000paixnidia.gr/paixnidia/connect_4"
		});
		a.push({
			img: "../../../media.bfgfile.com/images/35_49441.jpg",
			url: "../../../www.10000paixnidia.gr/paixnidia/frogtastic-mobile"
		});
		a.push({
			img: "../../../media.bfgfile.com/images/32_49279d.jpg",
			url: "../../../www.10000paixnidia.gr/paixnidia/minigolf-world"
		});
		break;
	case "10001games.fr":
		a.push({
			img:
			"../../../media.bfgfile.com/images/33_2121d.jpg",
			url: "../../../www.10001games.fr/jeu/connect_4"
		});
		a.push({
			img: "../../../media.bfgfile.com/images/35_49441.jpg",
			url: "../../../www.10001games.fr/jeu/frogtastic-mobile"
		});
		a.push({
			img: "../../../media.bfgfile.com/images/32_49279d.jpg",
			url: "../../../www.10001games.fr/jeu/minigolf-world"
		});
		break;
	case "1001paixnidia.eu":
		a.push({
			img:
			"../../../media.bfgfile.com/images/33_2121d.jpg",
			url: "../../../www.1001paixnidia.eu/paixnidia/connect_4"
		});
		a.push({
			img: "../../../media.bfgfile.com/images/35_49441.jpg",
			url: "../../../www.1001paixnidia.eu/paixnidia/frogtastic-mobile"
		});
		a.push({
			img: "../../../media.bfgfile.com/images/32_49279d.jpg",
			url: "../../../www.1001paixnidia.eu/paixnidia/minigolf-world"
		});
		break;
	case "101games.it":
		a.push({
			img:
			"../../../media.bfgfile.com/images/33_2121d.jpg",
			url: "../../../www.101games.it/giochi/connect_4"
		});
		a.push({
			img: "../../../media.bfgfile.com/images/35_49441.jpg",
			url: "../../../www.101games.it/giochi/frogtastic-mobile"
		});
		a.push({
			img: "../../../media.bfgfile.com/images/32_49279d.jpg",
			url: "../../../www.101games.it/giochi/minigolf-world"
		});
		break;
	case "agame.com":
		a.push({
			img:
			"../../../files.cdn.spilcloud.com/thumbs-6-0/200X120_170460_1502450874.png",
			url: "../../../www.agame.com/game/snake-and-blocks/default.htm"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-7/200X120_165627.jpg",
			url: "../../../www.agame.com/game/swimming-pro"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-7-2/200X120_170472_1502697306.png",
			url: "../../../www.agame.com/game/connect-4-classic"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-1/200X120_170521_1503068454.png",
			url: "../../../www.agame.com/game/master-checkers"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-1-9/200X120_170519_1503065531.png",
			url: "../../../www.agame.com/game/domino-block"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-4-1/200X120_170541_1503321513.png",
			url: "../../../www.agame.com/game/classic-backgammon-"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-2/200X120_170522_1503302595.png",
			url: "../../../www.agame.com/game/free-words"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-0/200X120_170520_1503067878.png",
			url: "../../../www.agame.com/game/jigsaw-deluxe"
		});
		break;
	case "bebekoyunu.com.tr":
		a.push({
			img:
			"../../../m.bebekoyunu.com.tr/img/s/cadde-yarisi-cilginlari-4582.jpg",
			url: "../../../bebekoyunu.com.tr/cadde-yarisi-cilginlari-oyna.html"
		});
		a.push({
			img: "../../../m.bebekoyunu.com.tr/img/s/domino-4525.jpg",
			url: "../../../bebekoyunu.com.tr/domino-oyna.html"
		});
		a.push({
			img: "../../../m.bebekoyunu.com.tr/img/s/2-kisilik-satranc-4509.jpg",
			url: "../../../www.bebekoyunu.com.tr/2-kisilik-satranc-oyna.html"
		});
		a.push({
			img: "../../../m.bebekoyunu.com.tr/img/s/tavla-4519.jpg",
			url: "../../../bebekoyunu.com.tr/2-kisilik-tavla-oyna.html"
		});
		a.push({
			img: "../../../m.bebekoyunu.com.tr/img/s/matematik-yilani-2-4505.jpg",
			url: "../../../www.bebekoyunu.com.tr/matematik-yilani-2-oyna.html"
		});
		break;
	case "bgames.com":
		a.push({
			img:
			"../../../static.bgames.com/games/assets/icons/3/112243/89539/bggb-380662.jpg",
			url: "../../../www.bgames.com/sport-games/minigolf_world/default.htm"
		});
		break;
	case "clickjogos.com.br":
		a.push({
			img:
			"../../../img2.clickjogos.com.br/dl/3/3294ff9b92437bc8c3dae81514e8895b/thumb.png@1504543080",
			url: "../../../www.clickjogos.com.br/jogos/penalty-kicks/default.htm"
		});
		a.push({
			img: "../../../img2.clickjogos.com.br/dl/b/be63e6dca8c799105962f9f110090fad/thumb.png@1504125627",
			url: "../../../www.clickjogos.com.br/jogos/gear-madness/default.htm"
		});
		a.push({
			img: "../../../img5.clickjogos.com.br/dl/b/bd6a0ccee7cba8dd6c1f2fbe611654d7/thumb.png@1504108745",
			url: "../../../www.clickjogos.com.br/jogos/freekick-training/default.htm"
		});
		break;
	case "flashgames.ru":
		a.push({
			img:
			"../../../files.cdn.spilcloud.com/thumbs-7-2/200X120_170472_1502697306.png",
			url: "../../../www.flashgames.ru/igra/soberi-4-klassika"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-6-0/200X120_170460_1502450874.png",
			url: "../../../www.flashgames.ru/igra/zmeia-i-bloki"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-7/200X120_165627.jpg",
			url: "../../../www.flashgames.ru/igra/chempion-po-plavaniiu"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-1/200X120_170521_1503068454.png",
			url: "../../../www.flashgames.ru/igra/master-shashek"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-1-9/200X120_170519_1503065531.png",
			url: "../../../www.flashgames.ru/igra/blok-domino"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-4-1/200X120_170541_1503321513.png",
			url: "../../../www.flashgames.ru/igra/classic-backgammon-"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-2/200X120_170522_1503302595.png",
			url: "../../../www.flashgames.ru/igra/mir-svobodnykh-slov"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-0/200X120_170520_1503067878.png",
			url: "../../../www.flashgames.ru/igra/pazl-deliuks"
		});
		break;
	case "frivjogosonline.com.br":
		a.push({
			img:
			"../../../cdn.frivjogosonline.com.br/wp-content/files/08/jpg/1f02a80db7d63ff04a6986023d3a0b60-120x100.jpg",
			url: "../../../www.frivjogosonline.com.br/jogo/freekick-training.html"
		});
		break;
	case "funnygames.be":
		a.push({
			img:
			"../../../assets.funnygames.be/games/assets/promos/3/112243/89539/185x145-380649.jpg",
			url: "../../../www.funnygames.be/spel/minigolf.html"
		});
		break;
	case "funnygames.nl":
		a.push({
			img:
			"../../../assets.funnygames.nl/games/assets/promos/7/19057/72449/185x145-380370.jpg",
			url: "../../../www.funnygames.nl/spel/vier_op_een_rij.html"
		});
		a.push({
			img: "../../../assets.funnygames.nl/games/assets/promos/2/112582/90773/185x145-380398.jpg@r=1502108077054",
			url: "../../../www.funnygames.nl/spel/free_words.html"
		});
		break;
	case "funnygames.us":
		a.push({
			img:
			"../../../assets.funnygames.us/games/assets/screenshots/3/112243/89539/minigolf-world-pss-380643.jpg",
			url: "../../../www.funnygames.us/game/minigolf_world.html"
		});
		a.push({
			img: "../../../assets.funnygames.us/games/assets/screenshots/7/19057/72449/connect-4-pss-225028.jpg@r=1502092710859",
			url: "../../../www.funnygames.us/game/connect_4.html"
		});
		break;
	case "game-game.com":
		a.push({
			img:
			"../../../cdn2.game-game.com.ua/gamesimg/180909.jpg",
			url: "../../../www.game-game.com.ua/180909/default.htm"
		});
		a.push({
			img: "../../../cdn2.game-game.com.ua/gamesimg/180384_big.jpg",
			url: "../../../game-game.com/180384/default.htm"
		});
		break;
	case "game-game.com.ua":
		a.push({
			img:
			"../../../cdn1.game-game.com.ua/gamesimg/180909_big.jpg",
			url: "../../../game-game.com/180909/default.htm"
		});
		a.push({
			img: "../../../www.game-game.com.ua/gamesimg/180384.jpg",
			url: "../../../www.game-game.com.ua/180384/default.htm"
		});
		break;
	case "game-game.kz":
		a.push({
			img:
			"../../../cdn1.game-game.com.ua/gamesimg/180909_big.jpg",
			url: "../../../game-game.kz/180909/default.htm"
		});
		a.push({
			img: "../../../www.game-game.com.ua/gamesimg/180384.jpg",
			url: "../../../game-game.kz/180384/default.htm"
		});
		break;
	case "game-game.lv":
		a.push({
			img:
			"../../../cdn1.game-game.com.ua/gamesimg/180909_big.jpg",
			url: "../../../game-game.lv/180909/default.htm"
		});
		a.push({
			img: "../../../www.game-game.com.ua/gamesimg/180384.jpg",
			url: "../../../game-game.lv/180384/default.htm"
		});
		break;
	case "game-game.ma":
		a.push({
			img:
			"../../../cdn1.game-game.com.ua/gamesimg/180909_big.jpg",
			url: "../../../game-game.ma/180909/default.htm"
		});
		a.push({
			img: "../../../www.game-game.com.ua/gamesimg/180384.jpg",
			url: "../../../game-game.ma/180384/default.htm"
		});
		break;
	case "games.co.id":
		a.push({
			img:
			"../../../files.cdn.spilcloud.com/thumbs-7-2/200X120_170472_1502697306.png",
			url: "../../../www.games.co.id/permainan_/hubungkan-4-klasik"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-6-0/200X120_170460_1502450874.png",
			url: "../../../www.games.co.id/permainan_/ular-dan-balok"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-7/200X120_165627.jpg",
			url: "../../../www.games.co.id/permainan_/renang-profesional"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-1/200X120_170521_1503068454.png",
			url: "../../../www.games.co.id/permainan_/master-checker"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-1-9/200X120_170519_1503065531.png",
			url: "../../../www.games.co.id/permainan_/balok-domino"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-4-1/200X120_170541_1503321513.png",
			url: "../../../www.games.co.id/permainan_/classic-backgammon-"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-2/200X120_170522_1503302595.png",
			url: "../../../www.games.co.id/permainan_/kata-kata-bebas"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-0/200X120_170520_1503067878.png",
			url: "../../../www.games.co.id/permainan_/puzzle-jigsaw-deluks"
		});
		break;
	case "games.co.uk":
		a.push({
			img:
			"../../../files.cdn.spilcloud.com/thumbs-7-2/200X120_170472_1502697306.png",
			url: "../../../www.games.co.uk/game/connect-4-classic"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-6-0/200X120_170460_1502450874.png",
			url: "../../../www.games.co.uk/game/snake-and-blocks"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-7/200X120_165627.jpg",
			url: "../../../www.games.co.uk/game/swimming-pro"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-1/200X120_170521_1503068454.png",
			url: "../../../www.games.co.uk/game/master-checkers"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-1-9/200X120_170519_1503065531.png",
			url: "../../../www.games.co.uk/game/domino-block"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-4-1/200X120_170541_1503321513.png",
			url: "../../../www.games.co.uk/game/classic-backgammon-"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-2/200X120_170522_1503302595.png",
			url: "../../../www.games.co.uk/game/free-words"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-0/200X120_170520_1503067878.png",
			url: "../../../www.games.co.uk/game/jigsaw-deluxe"
		});
		break;
	case "games.do":
		a.push({
			img:
			"../../../media.bfgfile.com/images/33_2121d.jpg",
			url: "../../../www.games.do/games/connect_4"
		});
		a.push({
			img: "../../../media.bfgfile.com/images/35_49441.jpg",
			url: "../../../www.games.do/games/frogtastic-mobile"
		});
		a.push({
			img: "../../../media.bfgfile.com/images/32_49279d.jpg",
			url: "../../../www.games.do/games/minigolf-world"
		});
		break;
	case "gamesgames.com":
		a.push({
			img:
			"../../../files.cdn.spilcloud.com/thumbs-7-2/200X120_170472_1502697306.png",
			url: "../../../www.gamesgames.com/game/connect-4-classic"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-6-0/200X120_170460_1502450874.png",
			url: "../../../www.gamesgames.com/game/snake-and-blocks"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-7/200X120_165627.jpg",
			url: "../../../www.gamesgames.com/game/swimming-pro"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-1/200X120_170521_1503068454.png",
			url: "../../../www.gamesgames.com/game/master-checkers"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-1-9/200X120_170519_1503065531.png",
			url: "../../../www.gamesgames.com/game/domino-block"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-4-1/200X120_170541_1503321513.png",
			url: "../../../www.gamesgames.com/game/classic-backgammon-"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-2/200X120_170522_1503302595.png",
			url: "../../../www.gamesgames.com/game/free-words"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-0/200X120_170520_1503067878.png",
			url: "../../../www.gamesgames.com/game/jigsaw-deluxe"
		});
		break;
	case "gameshed.com":
		a.push({
			img:
			"../../../games.gameshed.com/dead-city.jpg",
			url: "../../../www.gameshed.com/Zombie-Games/Dead-City/default.htm"
		});
		break;
	case "games.gr":
		a.push({
			img:
			"../../../media.games.gr/images/32_49279d.jpg",
			url: "../../../www.games.gr/search/minigolf/default.htm"
		});
		a.push({
			img: "../../../media.games.gr/images/33_2121d.jpg",
			url: "../../../www.games.gr/paixnidia/connect_4"
		});
		a.push({
			img: "../../../media.games.gr/images/35_49441.jpg",
			url: "../../../www.games.gr/paixnidia/frogtastic-mobile"
		});
		break;
	case "gioco.it":
		a.push({
			img:
			"../../../files.cdn.spilcloud.com/thumbs-7-2/200X120_170472_1502697306.png",
			url: "../../../www.gioco.it/gioco/connect-4-classico"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-6-0/200X120_170460_1502450874.png",
			url: "../../../www.gioco.it/gioco/blocchi-e-serpenti"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-7/200X120_165627.jpg",
			url: "../../../www.gioco.it/gioco/swimming-pro"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-1/200X120_170521_1503068454.png",
			url: "../../../www.gioco.it/gioco/dama-royale"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-1-9/200X120_170519_1503065531.png",
			url: "../../../www.gioco.it/gioco/dominoblock"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-4-1/200X120_170541_1503321513.png",
			url: "../../../www.gioco.it/gioco/classic-backgammon-"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-2/200X120_170522_1503302595.png",
			url: "../../../www.gioco.it/gioco/parole-in-liberta"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-0/200X120_170520_1503067878.png",
			url: "../../../www.gioco.it/gioco/puzzle-deluxe"
		});
		break;
	case "giochi.it":
		a.push({
			img:
			"../../../files.cdn.spilcloud.com/thumbs-7-2/200X120_170472_1502697306.png",
			url: "../../../www.giochi.it/gioco/connect-4-classico"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-6-0/200X120_170460_1502450874.png",
			url: "../../../www.giochi.it/gioco/blocchi-e-serpenti"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-7/200X120_165627.jpg",
			url: "../../../www.giochi.it/gioco/swimming-pro"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-1/200X120_170521_1503068454.png",
			url: "../../../www.giochi.it/gioco/dama-royale"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-1-9/200X120_170519_1503065531.png",
			url: "../../../www.giochi.it/gioco/dominoblock"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-4-1/200X120_170541_1503321513.png",
			url: "../../../www.giochi.it/gioco/classic-backgammon-"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-2/200X120_170522_1503302595.png",
			url: "../../../www.giochi.it/gioco/parole-in-liberta"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-0/200X120_170520_1503067878.png",
			url: "../../../www.giochi.it/gioco/puzzle-deluxe"
		});
		break;
	case "giochigratisonline.it":
		a.push({
			img:
			"../../../www.giochigratisonline.it/giochi-online/giochi-vari/snake-and-blocks/snake.jpg",
			url: "../../../www.giochigratisonline.it/giochi-online/giochi-vari/snake-and-blocks/default.htm"
		});
		break;
	case "girlsgogames.co.uk":
		a.push({
			img:
			"../../../files.cdn.spilcloud.com/thumbs-7-2/200X120_170472_1502697306.png",
			url: "../../../www.girlsgogames.co.uk/game/connect-4-classic"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-6-0/200X120_170460_1502450874.png",
			url: "../../../www.girlsgogames.co.uk/game/snake-and-blocks"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-7/200X120_165627.jpg",
			url: "../../../www.girlsgogames.co.uk/game/swimming-pro"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-2/200X120_170522_1503302595.png",
			url: "../../../www.girlsgogames.co.uk/game/free-words"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-0/200X120_170520_1503067878.png",
			url: "../../../www.girlsgogames.fr/jeu/puzzle-de-luxe"
		});
		break;
	case "girlsgogames.fr":
		a.push({
			img:
			"../../../files.cdn.spilcloud.com/thumbs-2-0/200X120_170520_1503067878.png",
			url: "../../../www.girlsgogames.fr/jeu/puzzle-de-luxe"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-2/200X120_170522_1503302595.png",
			url: "../../../www.girlsgogames.fr/jeu/mots-gratuits"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-7-2/200X120_170472_1502697306.png",
			url: "../../../www.girlsgogames.fr/jeu/puissance-4-classique"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-6-0/200X120_170460_1502450874.png",
			url: "../../../www.girlsgogames.fr/jeu/serpent-vs-blocs-"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-7/200X120_165627.jpg",
			url: "../../../www.girlsgogames.fr/jeu/pro-de-la-natation"
		});
		break;
	case "girlsgogames.ru":
		a.push({
			img:
			"../../../files.cdn.spilcloud.com/thumbs-2-0/200X120_170520_1503067878.png",
			url: "../../../www.girlsgogames.ru/igra/pazl-deliuks"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-7-2/200X120_170472_1502697306.png",
			url: "../../../www.girlsgogames.ru/igra/soberi-4-klassika"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-2/200X120_170522_1503302595.png",
			url: "../../../www.girlsgogames.ru/igra/mir-svobodnykh-slov"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-6-0/200X120_170460_1502450874.png",
			url: "../../../www.girlsgogames.ru/igra/zmeia-i-bloki"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-7/200X120_165627.jpg",
			url: "../../../www.girlsgogames.ru/igra/chempion-po-plavaniiu"
		});
		break;
	case "gratisspil.dk":
		a.push({
			img:
			"../../../www.gratisspil.dk/9394/onlineGameImages/w140/1504259771nmm.png",
			url: "../../../www.gratisspil.dk/onlineGame/games/play.php@categoryID=7&id=6224#commentsPaginatorPage=1"
		});
		break;
	case "gry.pl":
		a.push({
			img:
			"../../../files.cdn.spilcloud.com/thumbs-6-0/200X120_170460_1502450874.png",
			url: "../../../www.gry.pl/gra/weze-i-bloki"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-7/200X120_165627.jpg",
			url: "../../../www.gry.pl/gra/swimming-pro"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-7-2/200X120_170472_1502697306.png",
			url: "../../../www.gry.pl/gra/poacz-4-wersja-klasyczna"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-1/200X120_170521_1503068454.png",
			url: "../../../www.gry.pl/gra/mistrzowskie-warcaby"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-1/200X120_170521_1503068454.png",
			url: "../../../www.gry.pl/gra/mistrzowskie-warcaby"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-1-9/200X120_170519_1503065531.png",
			url: "../../../www.gry.pl/gra/zagraj-w-domino"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-4-1/200X120_170541_1503321513.png",
			url: "../../../www.gry.pl/gra/classic-backgammon-"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-2/200X120_170522_1503302595.png",
			url: "../../../www.gry.pl/gra/darmowe-sowa"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-0/200X120_170520_1503067878.png",
			url: "../../../www.gry.pl/gra/puzzle-luksusowe"
		});
		break;
	case "hierspielen.com":
		a.push({
			img:
			"../../../www.hierspielen.com/img/games/200x150/23088.jpg",
			url: "../../../www.hierspielen.com/spiel/frogtastic.html"
		});
		break;
	case "juegos.com":
		a.push({
			img:
			"../../../files.cdn.spilcloud.com/thumbs-7-2/200X120_170472_1502697306.png",
			url: "../../../www.juegos.com/juego/conecta-4-clasico"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-6-0/200X120_170460_1502450874.png",
			url: "../../../www.juegos.com/juego/serpientes-y-bloques"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-7/200X120_165627.jpg",
			url: "../../../www.juegos.com/juego/nadador-profesional"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-1/200X120_170521_1503068454.png",
			url: "../../../www.juegos.com/juego/damas-maestras"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-1-9/200X120_170519_1503065531.png",
			url: "../../../www.juegos.com/juego/bloques-de-domino"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-4-1/200X120_170541_1503321513.png",
			url: "../../../www.juegos.com/juego/classic-backgammon-"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-2/200X120_170522_1503302595.png",
			url: "../../../www.juegos.com/juego/palabras-libres"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-0/200X120_170520_1503067878.png",
			url: "../../../www.juegos.com/juego/rompecabezas-de-lujo"
		});
		break;
	case "jeja.pl":
		a.push({
			img:
			"../../../pobierak.jeja.pl/games_thumb/c/d/0/36215_200x120.jpg@1504101426",
			url: "../../../www.gry.jeja.pl/36215,trening-rzutow-wolnych.html"
		});
		break;
	case "jetztspielen.de":
		a.push({
			img:
			"../../../files.cdn.spilcloud.com/thumbs-7-2/200X120_170472_1502697306.png",
			url: "../../../www.jetztspielen.de/spiel/vier-gewinnt-klassisch"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-6-0/200X120_170460_1502450874.png",
			url: "../../../www.jetztspielen.de/spiel/schlange-und-blocke"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-7/200X120_165627.jpg",
			url: "../../../www.jetztspielen.de/spiel/swimming-pro"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-1/200X120_170521_1503068454.png",
			url: "../../../www.jetztspielen.de/spiel/meister-in-dame"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-1-9/200X120_170519_1503065531.png",
			url: "../../../www.jetztspielen.de/spiel/domino-block"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-4-1/200X120_170541_1503321513.png",
			url: "../../../www.jetztspielen.de/spiel/classic-backgammon-"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-2/200X120_170522_1503302595.png",
			url: "../../../www.jetztspielen.de/spiel/freie-worter"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-0/200X120_170520_1503067878.png",
			url: "../../../www.jetztspielen.de/spiel/puzzle-deluxe"
		});
		break;
	case "jeu.fr":
		a.push({
			img:
			"../../../files.cdn.spilcloud.com/thumbs-7-2/200X120_170472_1502697306.png",
			url: "../../../www.jeu.fr/jeu/puissance-4-classique"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-6-0/200X120_170460_1502450874.png",
			url: "../../../www.jeu.fr/jeu/serpent-vs-blocs-"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-7/200X120_165627.jpg",
			url: "../../../www.jeu.fr/jeu/pro-de-la-natation"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-1/200X120_170521_1503068454.png",
			url: "../../../www.jeu.fr/jeu/maitre-aux-echecs"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-1-9/200X120_170519_1503065531.png",
			url: "../../../www.jeu.fr/jeu/bloc-de-dominos"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-4-1/200X120_170541_1503321513.png",
			url: "../../../www.jeu.fr/jeu/classic-backgammon-"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-2/200X120_170522_1503302595.png",
			url: "../../../www.jeu.fr/jeu/mots-gratuits"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-0/200X120_170520_1503067878.png",
			url: "../../../www.jeu.fr/jeu/puzzle-de-luxe"
		});
		break;
	case "jeux.fr":
		a.push({
			img:
			"../../../files.cdn.spilcloud.com/thumbs-7-2/200X120_170472_1502697306.png",
			url: "../../../www.jeux.fr/jeu/puissance-4-classique"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-6-0/200X120_170460_1502450874.png",
			url: "../../../www.jeux.fr/jeu/serpent-vs-blocs-"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-7/200X120_165627.jpg",
			url: "../../../www.jeux.fr/jeu/pro-de-la-natation"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-1/200X120_170521_1503068454.png",
			url: "../../../www.jeux.fr/jeu/maitre-aux-echecs"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-1-9/200X120_170519_1503065531.png",
			url: "../../../www.jeux.fr/jeu/bloc-de-dominos"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-4-1/200X120_170541_1503321513.png",
			url: "../../../www.jeux.fr/jeu/classic-backgammon-"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-2/200X120_170522_1503302595.png",
			url: "../../../www.jeux.fr/jeu/mots-gratuits"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-0/200X120_170520_1503067878.png",
			url: "../../../www.jeux.fr/jeu/puzzle-de-luxe"
		});
		break;
	case "k2t2.com":
		a.push({
			img:
			"../../../k2t2.com/content/upload/games/images/minigolf-world.png",
			url: "../../../k2t2.com/minigolf-world/default.htm"
		});
		a.push({
			img: "../../../k2t2.com/content/upload/games/images/snake-and-blocks.png",
			url: "../../../k2t2.com/snake-and-blocks/default.htm"
		});
		break;
	case "klikarnia.pl":
		a.push({
			img:
			"../../../klikarnia.pl/gryonline/frogtastic.jpg",
			url: "../../../klikarnia.pl/frogtastic"
		});
		break;
	case "igry-multiki.ru":
		a.push({
			img:
			"../../../www.igry-multiki.ru/contents/image/games/game/220x165/shashki-na-planshet-igry-b.jpg",
			url: "../../../www.igry-multiki.ru/igra-shashki-na-planshet/default.htm"
		});
		a.push({
			img: "../../../www.igry-multiki.ru/contents/image/games/game/220x165/shahmaty-na-planshet-igry-b.jpg",
			url: "../../../www.igry-multiki.ru/igra-shahmaty-na-planshet/default.htm"
		});
		break;
	case "mousebreaker.com":
		a.push({
			img:
			"../../../files.cdn.spilcloud.com/thumbs-4-1/200X120_170541_1503321513.png",
			url: "../../../www.mousebreaker.com/game/classic-backgammon-"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-1-9/200X120_170519_1503065531.png",
			url: "../../../www.mousebreaker.com/game/domino-block"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-7/200X120_165627.jpg",
			url: "../../../www.mousebreaker.com/game/swimming-pro"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-2/200X120_170522_1503302595.png",
			url: "../../../www.mousebreaker.com/game/free-words"
		});
		break;
	case "minioyun.org":
		a.push({
			img:
			"../../../www.minioyun.org/img/baglanti-4-klasik.JPG",
			url: "../../../www.minioyun.org/baglanti-4-klasik.html"
		});
		break;
	case "ojogos.com.br":
		a.push({
			img:
			"../../../files.cdn.spilcloud.com/thumbs-7-2/200X120_170472_1502697306.png",
			url: "../../../www.ojogos.com.br/jogo/connect-4-classico"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-6-0/200X120_170460_1502450874.png",
			url: "../../../www.ojogos.com.br/jogo/cobra-e-blocos"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-7/200X120_165627.jpg",
			url: "../../../www.ojogos.com.br/jogo/swimming-pro"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-1/200X120_170521_1503068454.png",
			url: "../../../www.ojogos.com.br/jogo/maioral-das-damas"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-1-9/200X120_170519_1503065531.png",
			url: "../../../www.ojogos.com.br/jogo/bloco-de-domino"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-4-1/200X120_170541_1503321513.png",
			url: "../../../www.ojogos.com.br/jogo/classic-backgammon-"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-2/200X120_170522_1503302595.png",
			url: "../../../www.ojogos.com.br/jogo/palavras-livres"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-0/200X120_170520_1503067878.png",
			url: "../../../www.ojogos.com.br/jogo/quebra-cabecas-de-luxo"
		});
		break;
	case "ourgames.ru":
		a.push({
			img:
			"../../../files.cdn.spilcloud.com/thumbs-7-2/200X120_170472_1502697306.png",
			url: "../../../www.ourgames.ru/igra/soberi-4-klassika"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-6-0/200X120_170460_1502450874.png",
			url: "../../../www.ourgames.ru/igra/zmeia-i-bloki"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-7/200X120_165627.jpg",
			url: "../../../www.ourgames.ru/igra/chempion-po-plavaniiu"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-1/200X120_170521_1503068454.png",
			url: "../../../www.ourgames.ru/igra/master-shashek"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-1-9/200X120_170519_1503065531.png",
			url: "../../../www.ourgames.ru/igra/blok-domino"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-4-1/200X120_170541_1503321513.png",
			url: "../../../www.ourgames.ru/igra/classic-backgammon-"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-2/200X120_170522_1503302595.png",
			url: "../../../www.ourgames.ru/igra/mir-svobodnykh-slov"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-0/200X120_170520_1503067878.png",
			url: "../../../www.ourgames.ru/igra/pazl-deliuks"
		});
		break;
	case "oyungemisi.com":
		a.push({
			img:
			"../../../static.oyungemisi.com/games/assets/icons/3/112243/89539/96x96-380646.jpg@r=1502194273127",
			url: "../../../oyungemisi.com/minigolf-world-oyun/default.htm"
		});
		break;
	case "quicksave.su":
		a.push({
			img:
			"../../../st.manamonster.com/images/games/1/11945-jigsaw-deluxe-300x169.jpg",
			url: "../../../quicksave.su/games/11945-jigsaw-deluxe"
		});
		break;
	case "raketka.cz":
		a.push({
			img:
			"../../../www.raketka.cz/gamedata/images/27865_172_152.png",
			url: "../../../www.raketka.cz/h/neon-pong"
		});
		a.push({
			img: "../../../www.raketka.cz/gamedata/images/27862_172_152.png",
			url: "../../../www.raketka.cz/h/nine-mens-morris"
		});
		break;
	case "silvergames.com":
		a.push({
			img:
			"../../../i1.silvergames.com/p/b/minigolf-world.png",
			url: "../../../www.silvergames.com/en/minigolf-world"
		});
		a.push({
			img: "../../../i2.silvergames.com/p/a/snake-and-blocks.png",
			url: "../../../www.silvergames.com/en/snake-and-blocks"
		});
		break;
	case "spela.se":
		a.push({
			img:
			"../../../files.cdn.spilcloud.com/thumbs-7-2/200X120_170472_1502697306.png",
			url: "../../../www.spela.se/spel_/lanka-ihop-4-klassisk"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-6-0/200X120_170460_1502450874.png",
			url: "../../../www.spela.se/spel_/orm-och-block"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-7/200X120_165627.jpg",
			url: "../../../www.spela.se/spel_/simmarproffs"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-1/200X120_170521_1503068454.png",
			url: "../../../www.spela.se/spel_/damspelmastare"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-1-9/200X120_170519_1503065531.png",
			url: "../../../www.spela.se/spel_/dominoblock"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-4-1/200X120_170541_1503321513.png",
			url: "../../../www.spela.se/spel_/classic-backgammon-"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-2/200X120_170522_1503302595.png",
			url: "../../../www.spela.se/spel_/gratis-ord"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-0/200X120_170520_1503067878.png",
			url: "../../../www.spela.se/spel_/pussel-med-vilda-djur"
		});
		break;
	case "spele.be":
		a.push({
			img:
			"../../../static.spele.be/games/assets/screenshots/3/112243/89539/222x140-380645.jpg",
			url: "../../../spele.be/minigolf-world-spel/default.htm"
		});
		a.push({
			img: "../../../static.spele.be/games/assets/screenshots/9/68979/41390/222x140-85104.jpg",
			url: "../../../spele.be/connect-4-spel/default.htm"
		});
		break;
	case "spele.nl":
		a.push({
			img:
			"../../../spele.nl/minigolf-world-spel/default.htm",
			url: "../../../spele.nl/connect-4-spel/default.htm"
		});
		a.push({
			img: "../../../static.spele.nl/games/assets/icons/3/112243/89539/96x96-380646.jpg",
			url: "../../../spele.nl/minigolf-world-spel/default.htm"
		});
		break;
	case "spelletjes.nl":
		a.push({
			img:
			"../../../files.cdn.spilcloud.com/thumbs-6-0/200X120_170460_1502450874.png",
			url: "../../../www.spelletjes.nl/spel/slang-en-blokken"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-7-2/200X120_170472_1502697306.png",
			url: "../../../www.spelletjes.nl/spel/klassieke-4-op-een-rij"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-7/200X120_165627.jpg",
			url: "../../../www.spelletjes.nl/spel/zwemkampioen"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-1/200X120_170521_1503068454.png",
			url: "../../../www.spelletjes.nl/spel/dammeester"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-1-9/200X120_170519_1503065531.png",
			url: "../../../www.spelletjes.nl/spel/dominostenen"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-4-1/200X120_170541_1503321513.png",
			url: "../../../www.spelletjes.nl/spel/classic-backgammon-"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-2/200X120_170522_1503302595.png",
			url: "../../../www.spelletjes.nl/spel/woorden-vormen"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-0/200X120_170520_1503067878.png",
			url: "../../../www.spelletjes.nl/spel/puzzel-deluxe"
		});
		break;
	case "spielen.es":
		a.push({
			img:
			"../../../i2.spielen.es/p/a/minigolf-world.png",
			url: "../../../www.spielen.es/de/minigolf-world"
		});
		a.push({
			img: "../../../i2.spielen.es/p/a/snake-and-blocks.png",
			url: "../../../www.spielen.es/de/snake-and-blocks"
		});
		break;
	case "spielen.com":
		a.push({
			img:
			"../../../files.cdn.spilcloud.com/thumbs-7-2/200X120_170472_1502697306.png",
			url: "../../../www.spielen.com/spiel/vier-gewinnt-klassisch"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-6-0/200X120_170460_1502450874.png",
			url: "../../../www.spielen.com/spiel/schlange-und-blocke"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-7/200X120_165627.jpg",
			url: "../../../www.spielen.com/spiel/swimming-pro"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-1/200X120_170521_1503068454.png",
			url: "../../../www.spielen.com/spiel/meister-in-dame"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-1-9/200X120_170519_1503065531.png",
			url: "../../../www.spielen.com/spiel/domino-block"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-4-1/200X120_170541_1503321513.png",
			url: "../../../www.spielen.com/spiel/classic-backgammon-"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-2/200X120_170522_1503302595.png",
			url: "../../../www.spielen.com/spiel/freie-worter"
		});
		a.push({
			img: "../../../files.cdn.spilcloud.com/thumbs-2-0/200X120_170520_1503067878.png",
			url: "../../../www.spielen.com/spiel/puzzle-deluxe"
		});
		break;
	case "spielert.de":
		a.push({
			img:
			"../../../spielert.de/uploads/thumbs/nine-men-s-morris-online-mills-game.jpg",
			url: "../../../spielert.de/denk/Nine-Men-s-Morris-Online-Mills-Game"
		});
		break;
	case "superhry.cz":
		a.push({
			img:
			"../../../data6.superhry.cz/cnt_img/014/14758_340.jpg",
			url: "../../../www.superhry.cz/hra/14758-gear-madness"
		});
		break;
	case "yo-yoo.co.il":
		a.push({
			img:
			"../../../www.yo-yoo.co.il/uploads/chesssonline.jpg",
			url: "../../../games.yo-yoo.co.il/games_play.php@game=5139"
		});
		a.push({
			img: "../../../www.yo-yoo.co.il/uploads/4ineorafa.png",
			url: "../../../games.yo-yoo.co.il/games_play.php@game=5140"
		});
		a.push({
			img: "../../../www.yo-yoo.co.il/uploads/sheshshsobae.jpg",
			url: "../../../games.yo-yoo.co.il/games_play.php@game=5147"
		});
		break;
	case "zebest-3000.com":
		a.push({
			img:
			"../../../cdn.zebest-3000.com/img/general/games/200x150/23088.jpg",
			url: "../../../www.zebest-3000.com/jeux/jeu-23088.html"
		})
	}
	return a
}
var s_iScaleFactor = 1,
s_oCanvasLeft, s_oCanvasTop;
(function (b) { (jQuery.browser = jQuery.browser || {}).mobile = /android|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(ad|hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|tablet|treo|up\.(browser|link)|vodafone|wap|webos|windows (ce|phone)|xda|xiino/i.test(b) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(b.substr(0, 4))
})(navigator.userAgent || navigator.vendor || window.opera);
$(window).resize(function () {
	sizeHandler()
});
function trace(b) {
	console.log(b)
}
function isIOS() {
	for (var b = "iPad Simulator;iPhone Simulator;iPod Simulator;iPad;iPhone;iPod".split(";"); b.length;) if (navigator.platform === b.pop()) return ! 0;
	return ! 1
}
function getSize(b) {
	var a = b.toLowerCase(),
	c = window.document,
	d = c.documentElement;
	if (void 0 === window["inner" + b]) b = d["client" + b];
	else if (window["inner" + b] != d["client" + b]) {
		var e = c.createElement("body");
		e.id = "vpw-test-b";
		e.style.cssText = "overflow:scroll";
		var h = c.createElement("div");
		h.id = "vpw-test-d";
		h.style.cssText = "position:absolute;top:-1000px";
		h.innerHTML = "<style>@media(" + a + ":" + d["client" + b] + "px){body#vpw-test-b div#vpw-test-d{" + a + ":7px!important}}</style>";
		e.appendChild(h);
		d.insertBefore(e, c.head);
		b = 7 == h["offset" + b] ? d["client" + b] : window["inner" + b];
		d.removeChild(e)
	} else b = window["inner" + b];
	return b
}
window.addEventListener("orientationchange", onOrientationChange);
function onOrientationChange() {
	sizeHandler()
}
function getIOSWindowHeight() {
	return document.documentElement.clientWidth / window.innerWidth * window.innerHeight
}
function getHeightOfIOSToolbars() {
	var b = (0 === window.orientation ? screen.height: screen.width) - getIOSWindowHeight();
	return 1 < b ? b: 0
}
function sizeHandler() {
	window.scrollTo(0, 1);
	if ($("#canvas")) {
		var b = navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? getIOSWindowHeight() : getSize("Height");
		var a = getSize("Width");
		_checkOrientation(a, b);
		var c = Math.min(b / CANVAS_HEIGHT, a / CANVAS_WIDTH),
		d = CANVAS_WIDTH * c;
		c *= CANVAS_HEIGHT;
		if (c < b) {
			var e = b - c;
			c += e;
			d += CANVAS_WIDTH / CANVAS_HEIGHT * e
		} else d < a && (e = a - d, d += e, c += CANVAS_HEIGHT / CANVAS_WIDTH * e);
		e = b / 2 - c / 2;
		var h = a / 2 - d / 2,
		k = CANVAS_WIDTH / d;
		if (h * k < -EDGEBOARD_X || e * k < -EDGEBOARD_Y) c = Math.min(b / (CANVAS_HEIGHT - 2 * EDGEBOARD_Y), a / (CANVAS_WIDTH - 2 * EDGEBOARD_X)),
		d = CANVAS_WIDTH * c,
		c *= CANVAS_HEIGHT,
		e = (b - c) / 2,
		h = (a - d) / 2,
		k = CANVAS_WIDTH / d;
		s_iOffsetX = -1 * h * k;
		s_iOffsetY = -1 * e * k;
		0 <= e && (s_iOffsetY = 0);
		0 <= h && (s_iOffsetX = 0);
		null !== s_oInterface && s_oInterface.refreshButtonPos(s_iOffsetX, s_iOffsetY);
		null !== s_oMenu && s_oMenu.refreshButtonPos(s_iOffsetX, s_iOffsetY);
		s_bMobile ? ($("#canvas").css("width", d + "px"), $("#canvas").css("height", c + "px")) : (s_oStage.canvas.width = d, s_oStage.canvas.height = c, s_oStage.scaleX = s_oStage.scaleY = Math.min(d / CANVAS_WIDTH, c / CANVAS_HEIGHT));
		0 > e ? $("#canvas").css("top", e + "px") : $("#canvas").css("top", "0px");
		$("#canvas").css("left", h + "px");
		fullscreenHandler()
	}
}
function _checkOrientation(b, a) {
	s_bMobile && ENABLE_CHECK_ORIENTATION && (b > a ? "landscape" === $(".orientation-msg-container").attr("data-orientation") ? ($(".orientation-msg-container").css("display", "none"), s_oMain.startUpdate()) : ($(".orientation-msg-container").css("display", "block"), s_oMain.stopUpdate()) : "portrait" === $(".orientation-msg-container").attr("data-orientation") ? ($(".orientation-msg-container").css("display", "none"), s_oMain.startUpdate()) : ($(".orientation-msg-container").css("display", "block"), s_oMain.stopUpdate()))
}
function inIframe() {
	try {
		return window.self !== window.top
	} catch(b) {
		return ! 0
	}
}
function createBitmap(b, a, c) {
	var d = new createjs.Bitmap(b),
	e = new createjs.Shape;
	a && c ? e.graphics.beginFill("#fff").drawRect(0, 0, a, c) : e.graphics.beginFill("#ff0").drawRect(0, 0, b.width, b.height);
	d.hitArea = e;
	return d
}
function createSprite(b, a, c, d, e, h) {
	b = null !== a ? new createjs.Sprite(b, a) : new createjs.Sprite(b);
	a = new createjs.Shape;
	a.graphics.beginFill("#000000").drawRect( - c, -d, e, h);
	b.hitArea = a;
	return b
}
function randomFloatBetween(b, a, c) {
	"undefined" === typeof c && (c = 2);
	return parseFloat(Math.min(b + Math.random() * (a - b), a).toFixed(c))
}
function formatTime(b) {
	b /= 1E3;
	var a = Math.floor(b / 60);
	b = Math.floor(b - 60 * a);
	var c = "";
	c = 10 > a ? c + ("0" + a + ":") : c + (a + ":");
	return 10 > b ? c + ("0" + b) : c + b
}
function NoClickDelay(b) {
	this.element = b;
	window.Touch && this.element.addEventListener("touchstart", this, !1)
}
function shuffle(b) {
	for (var a = b.length, c, d; 0 < a;) d = Math.floor(Math.random() * a),
	a--,
	c = b[a],
	b[a] = b[d],
	b[d] = c;
	return b
}
NoClickDelay.prototype = {
	handleEvent: function (b) {
		switch (b.type) {
		case "touchstart":
			this.onTouchStart(b);
			break;
		case "touchmove":
			this.onTouchMove(b);
			break;
		case "touchend":
			this.onTouchEnd(b)
		}
	},
	onTouchStart: function (b) {
		b.preventDefault();
		this.moved = !1;
		this.element.addEventListener("touchmove", this, !1);
		this.element.addEventListener("touchend", this, !1)
	},
	onTouchMove: function (b) {
		this.moved = !0
	},
	onTouchEnd: function (b) {
		this.element.removeEventListener("touchmove", this, !1);
		this.element.removeEventListener("touchend", this, !1);
		if (!this.moved) {
			b = document.elementFromPoint(b.changedTouches[0].clientX, b.changedTouches[0].clientY);
			3 == b.nodeType && (b = b.parentNode);
			var a = document.createEvent("MouseEvents");
			a.initEvent("click", !0, !0);
			b.dispatchEvent(a)
		}
	}
};
function ctlArcadeResume() {
	null !== s_oMain && s_oMain.startUpdate()
}
function ctlArcadePause() {
	null !== s_oMain && s_oMain.stopUpdate()
}
function getParamValue(b) {
	for (var a = window.location.search.substring(1).split("&"), c = 0; c < a.length; c++) {
		var d = a[c].split("=");
		if (d[0] == b) return d[1]
	}
}
function playSound(b, a, c) {
	return ! 1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile ? (s_aSounds[b].play(), s_aSounds[b].volume(a), s_aSounds[b].loop(c), s_aSounds[b]) : null
}
function stopSound(b) { ! 1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || s_aSounds[b].stop()
}
function setVolume(b, a) { ! 1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || s_aSounds[b].volume(a)
}
function setMute(b, a) { ! 1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || s_aSounds[b].mute(a)
}
function easeLinear(b, a, c, d) {
	return c * b / d + a
}
function collisionWithCircle(b, a, c) {
	var d = b.getX() - a.getX(),
	e = b.getY() - a.getY();
	return Math.sqrt(d * d + e * e) < b.getCollision() * c + a.getCollision() * c ? !0 : !1
} (function () {
	function b(b) {
		var c = {
			focus: "visible",
			focusin: "visible",
			pageshow: "visible",
			blur: "hidden",
			focusout: "hidden",
			pagehide: "hidden"
		};
		b = b || window.event;
		b.type in c ? document.body.className = c[b.type] : (document.body.className = this[a] ? "hidden": "visible", "hidden" === document.body.className ? s_oMain.stopUpdate() : s_oMain.startUpdate())
	}
	var a = "hidden";
	a in document ? document.addEventListener("visibilitychange", b) : (a = "mozHidden") in document ? document.addEventListener("mozvisibilitychange", b) : (a = "webkitHidden") in document ? document.addEventListener("webkitvisibilitychange", b) : (a = "msHidden") in document ? document.addEventListener("msvisibilitychange", b) : "onfocusin" in document ? document.onfocusin = document.onfocusout = b: window.onpageshow = window.onpagehide = window.onfocus = window.onblur = b
})();
function saveItem(b, a) {
	s_bStorageAvailable && localStorage.setItem(b, a)
}
function getItem(b) {
	return s_bStorageAvailable ? localStorage.getItem(b) : null
}
function fullscreenHandler() {
	ENABLE_FULLSCREEN && !inIframe() && (s_bFullscreen = screen.height < window.innerHeight + 3 && screen.height > window.innerHeight - 3 ? !0 : !1, null !== s_oInterface && s_oInterface.resetFullscreenBut(), null !== s_oMenu && s_oMenu.resetFullscreenBut())
}
if (screenfull.enabled) screenfull.on("change", function () {
	s_bFullscreen = screenfull.isFullscreen;
	null !== s_oInterface && s_oInterface.resetFullscreenBut();
	null !== s_oMenu && s_oMenu.resetFullscreenBut()
});
window.GD_OPTIONS = {
	gameId: "c2820a1635844cff8c6c9b2bf0771df0",
	onEvent: function (b) {
		switch (b.name) {
		case "SDK_GAME_START":
			s_oMain.startUpdate();
			break;
		case "SDK_GAME_PAUSE":
			s_oMain.stopUpdate()
		}
	}
};
// (function (b, a, c) {
// 	var d = b.getElementsByTagName(a)[0];
// 	b.getElementById(c) || (b = b.createElement(a), b.id = c, b.src = "https://html5.api.gamedistribution.com/main.min.js", d.parentNode.insertBefore(b, d))
// })(document, "script", "gamedistribution-jssdk");
function CSpriteLibrary() {
	var b, a, c, d, e, h;
	this.init = function (k, g, f) {
		c = a = 0;
		d = k;
		e = g;
		h = f;
		b = {}
	};
	this.addSprite = function (c, d) {
		b.hasOwnProperty(c) || (b[c] = {
			szPath: d,
			oSprite: new Image
		},
		a++)
	};
	this.getSprite = function (a) {
		return b.hasOwnProperty(a) ? b[a].oSprite: null
	};
	this._onSpritesLoaded = function () {
		e.call(h)
	};
	this._onSpriteLoaded = function () {
		d.call(h); ++c === a && this._onSpritesLoaded()
	};
	this.loadSprites = function () {
		for (var a in b) b[a].oSprite.oSpriteLibrary = this,
		b[a].oSprite.onload = function () {
			this.oSpriteLibrary._onSpriteLoaded()
		},
		b[a].oSprite.src = b[a].szPath
	};
	this.getNumSprites = function () {
		return a
	}
}
var CANVAS_WIDTH = 768,
CANVAS_HEIGHT = 1400,
EDGEBOARD_X = 40,
EDGEBOARD_Y = 260,
FPS = 30,
FPS_TIME = 1E3 / FPS,
DISABLE_SOUND_MOBILE = !1,
PRIMARY_FONT = "junegullregular",
STATE_LOADING = 0,
STATE_MENU = 1,
STATE_HELP = 1,
STATE_GAME = 3,
ON_MOUSE_DOWN = 0,
ON_MOUSE_UP = 1,
ON_MOUSE_OVER = 2,
ON_MOUSE_OUT = 3,
ON_DRAG_START = 4,
ON_DRAG_END = 5,
NUM_ROWS = 4,
NUM_COLS = 4,
CELL_WIDTH = 174,
CELL_HEIGHT = 174,
GRID_POSITION = {
	x: CANVAS_WIDTH / 2,
	y: CANVAS_HEIGHT / 2
},
SPACE_BETWEEN_CELLS = 4,
CELL_EMPTY = 0,
GOAL_NUMBER,
ENABLE_FULLSCREEN,
ENABLE_CHECK_ORIENTATION,
TEXT_SCORE = "SCORE",
TEXT_BEST_SCORE = "BEST SCORE",
TEXT_CONGRATS = "CONGRATULATIONS!! YOU GOT",
TEXT_END_PANEL = "YOUR FINAL SCORE",
TEXT_ARE_SURE = "ARE YOU SURE?",
TEXT_CREDITS_DEVELOPED = "DEVELOPED BY",
TEXT_ERR_LS = "YOUR WEB BROWSER DOES NOT SUPPORT STORING SETTING LOCALLY. IN SAFARI, THE MOST COMMON CAUSE OF THIS IS USING 'PRIVATE BROWSING MODE'. SOME INFO MAY NOT SAVE OR SOME FEATURE MAY NOT WORK PROPERLY.",
TEXT_SHARE_IMAGE = "200x200.jpg",
TEXT_SHARE_TITLE = "Congratulations!",
TEXT_SHARE_MSG1 = "You collected <strong>",
TEXT_SHARE_MSG2 = " points</strong>!<br><br>Share your score with your friends!",
TEXT_SHARE_SHARE1 = "My score is ",
TEXT_SHARE_SHARE2 = " points! Can you do better";
function CPreloader() {
	var b, a, c, d, e, h, k;
	this._init = function () {
		s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
		s_oSpriteLibrary.addSprite("bg_preloader", "sprites/bg_preloader.jpg");
		s_oSpriteLibrary.addSprite("progress_bar", "sprites/progress_bar.png");
		s_oSpriteLibrary.loadSprites();
		k = new createjs.Container;
		s_oStage.addChild(k)
	};
	this.unload = function () {
		k.removeAllChildren()
	};
	this.hide = function () {
		var a = this;
		setTimeout(function () {
			createjs.Tween.get(h).to({
				alpha: 1
			},
			500).call(function () {
				a.unload();
				s_oMain.gotoMenu()
			})
		},
		1E3)
	};
	this._onImagesLoaded = function () {};
	this._onAllImagesLoaded = function () {
		this.attachSprites();
		s_oMain.preloaderReady()
	};
	this.attachSprites = function () {
		var g = createBitmap(s_oSpriteLibrary.getSprite("bg_preloader"));
		k.addChild(g);
		g = s_oSpriteLibrary.getSprite("progress_bar");
		d = createBitmap(g);
		d.x = CANVAS_WIDTH / 2 - g.width / 2;
		d.y = CANVAS_HEIGHT - 340;
		k.addChild(d);
		b = g.width;
		a = g.height;
		e = new createjs.Shape;
		e.graphics.beginFill("rgba(255,255,255,0.01)").drawRect(d.x, d.y, 1, a);
		k.addChild(e);
		d.mask = e;
		c = new createjs.Text("", "30px " + PRIMARY_FONT, "#fff");
		c.x = CANVAS_WIDTH / 2;
		c.y = CANVAS_HEIGHT - 350;
		c.shadow = new createjs.Shadow("#000", 2, 2, 2);
		c.textBaseline = "alphabetic";
		c.textAlign = "center";
		k.addChild(c);
		h = new createjs.Shape;
		h.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		h.alpha = 0;
		k.addChild(h)
	};
	this.refreshLoader = function (g) {
		c.text = g + "%";
		e.graphics.clear();
		g = Math.floor(g * b / 100);
		e.graphics.beginFill("rgba(255,255,255,0.01)").drawRect(d.x, d.y, g, a)
	};
	this._init()
}
function CMain(b) {
	var a, c = 0,
	d = 0,
	e = STATE_LOADING,
	h, k;
	this.initContainer = function () {
		s_oCanvas = document.getElementById("canvas");
		s_oStage = new createjs.Stage(s_oCanvas);
		s_oStage.preventSelection = !1;
		createjs.Touch.enable(s_oStage);
		s_bMobile = jQuery.browser.mobile; ! 1 === s_bMobile && (s_oStage.enableMouseOver(20), $("body").on("contextmenu", "#canvas", function (a) {
			return ! 1
		}));
		s_iPrevTime = (new Date).getTime();
		createjs.Ticker.addEventListener("tick", this._update);
		createjs.Ticker.setFPS(FPS);
		navigator.userAgent.match(/Windows Phone/i) && (DISABLE_SOUND_MOBILE = !0);
		s_oSpriteLibrary = new CSpriteLibrary;
		h = new CPreloader
	};
	this.preloaderReady = function () {
		this._loadImages(); ! 1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || this._initSounds();
		a = !0
	};
	this.soundLoaded = function () {
		c++;
		h.refreshLoader(Math.floor(c / d * 100));
		c === d && this._onRemovePreloader()
	};
	this._initSounds = function () {
		var a = [];
		a.push({
			path: "sounds/default.htm",
			filename: "matching",
			loop: !1,
			volume: 1,
			ingamename: "matching"
		});
		a.push({
			path: "sounds/default.htm",
			filename: "click",
			loop: !1,
			volume: 1,
			ingamename: "click"
		});
		a.push({
			path: "sounds/default.htm",
			filename: "moving",
			loop: !1,
			volume: 1,
			ingamename: "moving"
		});
		a.push({
			path: "sounds/default.htm",
			filename: "great_matching",
			loop: !1,
			volume: 1,
			ingamename: "great_matching"
		});
		a.push({
			path: "sounds/default.htm",
			filename: "soundtrack",
			loop: !0,
			volume: 1,
			ingamename: "soundtrack"
		});
		d += a.length;
		s_aSounds = [];
		for (var b = 0; b < a.length; b++) s_aSounds[a[b].ingamename] = new Howl({
			src: [a[b].path + a[b].filename + ".mp3", a[b].path + a[b].filename + ".ogg"],
			autoplay: !1,
			preload: !0,
			loop: a[b].loop,
			volume: a[b].volume,
			onload: s_oMain.soundLoaded()
		})
	};
	this._loadImages = function () {
		s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
		s_oSpriteLibrary.addSprite("bg_menu", "sprites/bg_menu.jpg");
		s_oSpriteLibrary.addSprite("but_exit", "sprites/but_exit.png");
		s_oSpriteLibrary.addSprite("audio_icon", "sprites/audio_icon.png");
		s_oSpriteLibrary.addSprite("but_play", "sprites/but_play.png");
		s_oSpriteLibrary.addSprite("but_restart", "sprites/but_restart.png");
		s_oSpriteLibrary.addSprite("but_home", "sprites/but_home.png");
		s_oSpriteLibrary.addSprite("but_continue", "sprites/but_continue.png");
		s_oSpriteLibrary.addSprite("msg_box", "sprites/msg_box.png");
		s_oSpriteLibrary.addSprite("but_credits", "sprites/but_credits.png");
		s_oSpriteLibrary.addSprite("logo_ctl", "sprites/logo_ctl.png");
		s_oSpriteLibrary.addSprite("but_fullscreen", "sprites/but_fullscreen.png");
		s_oSpriteLibrary.addSprite("bg_end_panel", "sprites/bg_end_panel.png");
		s_oSpriteLibrary.addSprite("bg_game", "sprites/bg_game.jpg");
		s_oSpriteLibrary.addSprite("but_menu_bg", "sprites/but_menu_bg.png");
		s_oSpriteLibrary.addSprite("but_no", "sprites/but_no.png");
		s_oSpriteLibrary.addSprite("but_yes", "sprites/but_yes.png");
		s_oSpriteLibrary.addSprite("cells", "sprites/cells.png");
		s_oSpriteLibrary.addSprite("cell_empty", "sprites/cell_empty.png");
		s_oSpriteLibrary.addSprite("but_restart_small", "sprites/but_restart_small.png");
		d += s_oSpriteLibrary.getNumSprites();
		s_oSpriteLibrary.loadSprites()
	};
	this._onImagesLoaded = function () {
		c++;
		h.refreshLoader(Math.floor(c / d * 100));
		c === d && this._onRemovePreloader()
	};
	this._onAllImagesLoaded = function () {};
	this._onRemovePreloader = function () {
		try {
			saveItem("ls_available", "ok")
		} catch(f) {
			s_bStorageAvailable = !1
		}
		h.unload();
		isIOS() || (s_oSoundTrack = playSound("soundtrack", 1, !0));
		this.gotoMenu()
	};
	this.gotoMenu = function () {
		new CMenu;
		e = STATE_MENU;
		showMoreGames()
	};
	this.gotoGame = function (a) {
		k = new CGame(g, a);
		e = STATE_GAME;
		$(s_oMain).trigger("start_session");
		hideMoreGames()
	};
	this.stopUpdate = function () {
		a = !1;
		createjs.Ticker.paused = !0;
		$("#block_game").css("display", "block"); ! 1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || Howler.mute(!0)
	};
	this.startUpdate = function () {
		s_iPrevTime = (new Date).getTime();
		a = !0;
		createjs.Ticker.paused = !1;
		$("#block_game").css("display", "none");
		(!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) && s_bAudioActive && Howler.mute(!1)
	};
	this._update = function (b) {
		if (!1 !== a) {
			var c = (new Date).getTime();
			s_iTimeElaps = c - s_iPrevTime;
			s_iCntTime += s_iTimeElaps;
			s_iCntFps++;
			s_iPrevTime = c;
			1E3 <= s_iCntTime && (s_iCurFps = s_iCntFps, s_iCntTime -= 1E3, s_iCntFps = 0);
			e === STATE_GAME && k.update();
			s_oStage.update(b)
		}
	};
	s_oMain = this;
	var g = b;
	ENABLE_FULLSCREEN = b.fullscreen;
	ENABLE_CHECK_ORIENTATION = b.check_orientation;
	this.initContainer()
}
var s_bMobile, s_bAudioActive = !0,
s_bFullscreen = !1,
s_iCntTime = 0,
s_iTimeElaps = 0,
s_iPrevTime = 0,
s_iCntFps = 0,
s_iCurFps = 0,
s_iLevelReached = 1,
s_oDrawLayer, s_oStage, s_oMain, s_oSpriteLibrary, s_oSoundTrack = null,
s_oCanvas, s_iBestScore = 0,
s_bStorageAvailable = !0,
s_aSounds;
function CTextButton(b, a, c, d, e, h, k) {
	var g, f, l, p, n;
	this._init = function (a, b, c, q, v, d, e) {
		g = [];
		f = [];
		v = createBitmap(c);
		var h = Math.ceil(e / 20);
		n = new createjs.Text(q, "bold " + e + "px " + PRIMARY_FONT, "#000000");
		n.textAlign = "center";
		n.textBaseline = "alphabetic";
		var u = n.getBounds();
		n.x = c.width / 2 + h;
		n.y = Math.floor(c.height / 2) + u.height / 3 + h;
		p = new createjs.Text(q, "bold " + e + "px " + PRIMARY_FONT, d);
		p.textAlign = "center";
		p.textBaseline = "alphabetic";
		u = p.getBounds();
		p.x = c.width / 2;
		p.y = Math.floor(c.height / 2) + u.height / 3;
		l = new createjs.Container;
		l.x = a;
		l.y = b;
		l.regX = c.width / 2;
		l.regY = c.height / 2;
		l.addChild(v, n, p);
		s_oStage.addChild(l);
		s_bMobile || (l.cursor = "pointer");
		this._initListener()
	};
	this.unload = function () {
		l.off("mousedown");
		l.off("pressup");
		s_oStage.removeChild(l)
	};
	this.setVisible = function (a) {
		l.visible = a
	};
	this._initListener = function () {
		oParent = this;
		l.on("mousedown", this.buttonDown);
		l.on("pressup", this.buttonRelease)
	};
	this.addEventListener = function (a, b, c) {
		g[a] = b;
		f[a] = c
	};
	this.buttonRelease = function () {
		l.scaleX = 1;
		l.scaleY = 1;
		playSound("click", 1, !1);
		g[ON_MOUSE_UP] && g[ON_MOUSE_UP].call(f[ON_MOUSE_UP])
	};
	this.buttonDown = function () {
		l.scaleX = .9;
		l.scaleY = .9;
		g[ON_MOUSE_DOWN] && g[ON_MOUSE_DOWN].call(f[ON_MOUSE_DOWN])
	};
	this.setTextPosition = function (a) {
		p.y = a;
		n.y = a + 2
	};
	this.setPosition = function (a, b) {
		l.x = a;
		l.y = b
	};
	this.setX = function (a) {
		l.x = a
	};
	this.setY = function (a) {
		l.y = a
	};
	this.getButtonImage = function () {
		return l
	};
	this.getX = function () {
		return l.x
	};
	this.getY = function () {
		return l.y
	};
	this._init(b, a, c, d, e, h, k);
	return this
}
function CToggle(b, a, c, d, e) {
	var h, k, g, f, l;
	this._init = function (a, b, c, d, e) {
		l = void 0 !== e ? e: s_oStage;
		k = [];
		g = [];
		e = new createjs.SpriteSheet({
			images: [c],
			frames: {
				width: c.width / 2,
				height: c.height,
				regX: c.width / 2 / 2,
				regY: c.height / 2
			},
			animations: {
				state_true: [0],
				state_false: [1]
			}
		});
		h = d;
		f = createSprite(e, "state_" + h, c.width / 2 / 2, c.height / 2, c.width / 2, c.height);
		f.x = a;
		f.y = b;
		f.stop();
		s_bMobile || (f.cursor = "pointer");
		l.addChild(f);
		this._initListener()
	};
	this.unload = function () {
		f.off("mousedown", this.buttonDown);
		f.off("pressup", this.buttonRelease);
		l.removeChild(f)
	};
	this._initListener = function () {
		f.on("mousedown", this.buttonDown);
		f.on("pressup", this.buttonRelease)
	};
	this.addEventListener = function (a, b, c) {
		k[a] = b;
		g[a] = c
	};
	this.setCursorType = function (a) {
		f.cursor = a
	};
	this.setActive = function (a) {
		h = a;
		f.gotoAndStop("state_" + h)
	};
	this.buttonRelease = function () {
		f.scaleX = 1;
		f.scaleY = 1;
		playSound("click", 1, !1);
		h = !h;
		f.gotoAndStop("state_" + h);
		k[ON_MOUSE_UP] && k[ON_MOUSE_UP].call(g[ON_MOUSE_UP], h)
	};
	this.buttonDown = function () {
		f.scaleX = .9;
		f.scaleY = .9;
		k[ON_MOUSE_DOWN] && k[ON_MOUSE_DOWN].call(g[ON_MOUSE_DOWN])
	};
	this.setPosition = function (a, b) {
		f.x = a;
		f.y = b
	};
	this._init(b, a, c, d, e)
}
function CGfxButton(b, a, c, d) {
	var e, h, k, g, f, l, p, n, r;
	this._init = function (a, b, c) {
		e = !1;
		h = [];
		k = [];
		f = [];
		g = createBitmap(c);
		g.x = a;
		g.y = b;
		p = l = 1;
		g.regX = c.width / 2;
		g.regY = c.height / 2;
		s_bMobile || (g.cursor = "pointer");
		t.addChild(g);
		this._initListener()
	};
	this.unload = function () {
		g.off("mousedown", n);
		g.off("pressup", r);
		t.removeChild(g)
	};
	this.setVisible = function (a) {
		g.visible = a
	};
	this.setCursorType = function (a) {
		g.cursor = a
	};
	this._initListener = function () {
		n = g.on("mousedown", this.buttonDown);
		r = g.on("pressup", this.buttonRelease)
	};
	this.addEventListener = function (a, b, c) {
		h[a] = b;
		k[a] = c
	};
	this.addEventListenerWithParams = function (a, b, c, d) {
		h[a] = b;
		k[a] = c;
		f[a] = d
	};
	this.enable = function () {
		e = !1
	};
	this.disable = function () {
		e = !0
	};
	this.buttonRelease = function () {
		e || (g.scaleX = 0 < l ? 1 : -1, g.scaleY = 1, playSound("click", 1, !1), h[ON_MOUSE_UP] && h[ON_MOUSE_UP].call(k[ON_MOUSE_UP], f[ON_MOUSE_UP]))
	};
	this.buttonDown = function () {
		e || (g.scaleX = 0 < l ? .9 : -.9, g.scaleY = .9, h[ON_MOUSE_DOWN] && h[ON_MOUSE_DOWN].call(k[ON_MOUSE_DOWN], f[ON_MOUSE_DOWN]))
	};
	this.rotation = function (a) {
		g.rotation = a
	};
	this.getButton = function () {
		return g
	};
	this.setPosition = function (a, b) {
		g.x = a;
		g.y = b
	};
	this.setX = function (a) {
		g.x = a
	};
	this.setY = function (a) {
		g.y = a
	};
	this.getButtonImage = function () {
		return g
	};
	this.setScaleX = function (a) {
		l = g.scaleX = a
	};
	this.getX = function () {
		return g.x
	};
	this.getY = function () {
		return g.y
	};
	this.pulseAnimation = function () {
		createjs.Tween.get(g).to({
			scaleX: .9 * l,
			scaleY: .9 * p
		},
		850, createjs.Ease.quadOut).to({
			scaleX: l,
			scaleY: p
		},
		650, createjs.Ease.quadIn).call(function () {
			m.pulseAnimation()
		})
	};
	this.trebleAnimation = function () {
		createjs.Tween.get(g).to({
			rotation: 5
		},
		75, createjs.Ease.quadOut).to({
			rotation: -5
		},
		140, createjs.Ease.quadIn).to({
			rotation: 0
		},
		75, createjs.Ease.quadIn).wait(750).call(function () {
			m.trebleAnimation()
		})
	};
	this.removeAllTweens = function () {
		createjs.Tween.removeTweens(g)
	};
	var t = void 0 !== d ? d: s_oStage;
	this._init(b, a, c);
	var m = this;
	return this
}
function CMenu() {
	var b, a, c, d, e, h, k, g, f, l, p, n, r = null,
	t = null;
	this._init = function () {
		k = createBitmap(s_oSpriteLibrary.getSprite("bg_menu"));
		s_oStage.addChild(k);
		var m = s_oSpriteLibrary.getSprite("but_play");
		g = new CGfxButton(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 350, m);
		g.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);
		m = s_oSpriteLibrary.getSprite("but_credits");
		c = 20 + m.width / 2;
		d = m.height / 2 + 20;
		p = new CGfxButton(c, d, m);
		p.addEventListener(ON_MOUSE_UP, this._onCredits, this);
		if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) m = s_oSpriteLibrary.getSprite("audio_icon"),
		e = CANVAS_WIDTH - m.width / 4 - 20,
		h = m.height / 2 + 20,
		l = new CToggle(e, h, m, s_bAudioActive, s_oStage),
		l.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
		m = window.document;
		var q = m.documentElement;
		r = q.requestFullscreen || q.mozRequestFullScreen || q.webkitRequestFullScreen || q.msRequestFullscreen;
		t = m.exitFullscreen || m.mozCancelFullScreen || m.webkitExitFullscreen || m.msExitFullscreen; ! 1 === ENABLE_FULLSCREEN && (r = !1);
		r && !1 === inIframe() && (m = s_oSpriteLibrary.getSprite("but_fullscreen"), b = c + m.width / 2 + 10, a = d, n = new CToggle(b, a, m, s_bFullscreen, s_oStage), n.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
		f = new createjs.Shape;
		f.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		s_oStage.addChild(f);
		createjs.Tween.get(f).to({
			alpha: 0
		},
		1E3).call(function () {
			s_oStage.removeChild(f)
		});
		s_bStorageAvailable ? (m = getItem("best_score"), null !== m && (s_iBestScore = m)) : new CMsgBox(TEXT_ERR_LS, s_oStage);
		this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
	};
	this.unload = function () {
		g.unload();
		g = null;
		p.unload();
		s_oStage.removeChild(k);
		k = null;
		if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) l.unload(),
		l = null;
		r && !1 === inIframe() && n.unload();
		s_oMenu = null
	};
	this.refreshButtonPos = function (f, q) { ! 1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || l.setPosition(e - f, h + q);
		r && !1 === inIframe() && n.setPosition(b + f, a + q);
		p.setPosition(c + f, d + q)
	};
	this.exitFromCredits = function () {};
	this._onAudioToggle = function () {
		Howler.mute(s_bAudioActive);
		s_bAudioActive = !s_bAudioActive
	};
	this._onCredits = function () {
		new CCreditsPanel
	};
	this._onButPlayRelease = function () {
		// gdsdk.showBanner();
		this.unload();
		isIOS() && null === s_oSoundTrack ? s_oSoundTrack = playSound("soundtrack", 1, !0) : playSound("click", 1, !1);
		s_oMain.gotoGame()
	};
	this.resetFullscreenBut = function () {
		n.setActive(s_bFullscreen)
	};
	this._onFullscreenRelease = function () {
		s_bFullscreen ? t.call(window.document) : r.call(window.document.documentElement);
		sizeHandler()
	};
	s_oMenu = this;
	this._init()
}
var s_oMenu = null;
function CGame(b) {
	function a(a) {
		if (!c) {
			a || (a = window.event);
			c = !0;
			switch (a.keyCode) {
			case 37:
				k = "left";
				s_oGame._keyPressed();
				break;
			case 38:
				k = "up";
				s_oGame._keyPressed();
				break;
			case 39:
				k = "right";
				s_oGame._keyPressed();
				break;
			case 40:
				k = "down",
				s_oGame._keyPressed()
			}
			a.preventDefault();
			return ! 1
		}
	}
	var c, d, e, h, k, g, f, l, p, n, r, t, m;
	this._init = function () {
		d = c = !1;
		h = 0;
		setVolume("soundtrack", .4);
		var a = createBitmap(s_oSpriteLibrary.getSprite("bg_game"));
		s_oStage.addChild(a);
		this._initGrid();
		n = new CInterface;
		this._fillNewCell();
		this._fillNewCell();
		this.initListeners()
	};
	this.restart = function () {
		d = c = !1;
		h = 0;
		setVolume("soundtrack", .4);
		for (var a = 0; a < NUM_ROWS; a++) for (var b = 0; b < NUM_COLS; b++) g[a][b].reset(),
		f[a][b] = CELL_EMPTY,
		l[a][b] = CELL_EMPTY;
		this._fillNewCell();
		this._fillNewCell();
		n.refreshScore(h);
		$(s_oMain).trigger("restart_level", 1)
	};
	this.unload = function () {
		this.removeListeners();
		n.unload();
		createjs.Tween.removeAllTweens();
		s_oStage.removeAllChildren();
		s_oGame = null
	};
	this.resumeGame = function () {
		c = !1
	};
	this.initListeners = function () {
		m = new Hammer(s_oCanvas);
		m.get("swipe").set({
			direction: Hammer.DIRECTION_ALL
		});
		m.get("swipe").set({
			velocity: .005
		});
		m.get("swipe").set({
			threshold: .1
		});
		m.on("swipeleft", function () {
			k = "left";
			s_oGame._keyPressed()
		});
		m.on("swiperight", function () {
			k = "right";
			s_oGame._keyPressed()
		});
		m.on("swipeup", function () {
			k = "up";
			s_oGame._keyPressed()
		});
		m.on("swipedown", function () {
			k = "down";
			s_oGame._keyPressed()
		}); ! 1 === s_bMobile && (document.onkeydown = a)
	};
	this.removeListeners = function () {
		m.off("swipeleft", function () {
			k = "left"
		});
		m.off("swiperight", function () {
			k = "right"
		});
		m.off("swipeup", function () {
			k = "up"
		});
		m.off("swipedown", function () {
			k = "down"
		}); ! 1 === s_bMobile && (document.onkeydown = null)
	};
	this._keyPressed = function () {
		for (var a = 0; a < NUM_ROWS; a++) for (var b = 0; b < NUM_COLS; b++) l[a][b] = f[a][b];
		p = [];
		this._findMatching();
		this._trimGrid();
		if (this.isNewGridDifferentFromPrevious()) {
			for (a = e = 0; a < p.length; a++) p[a].playMovingAnim();
			playSound("moving", 1, !1)
		} else {
			for (a = 0; a < p.length; a++) b = p[a].getCoord(),
			g[b.row][b.col].setValue(f[b.row][b.col]),
			p[a].unload();
			c = !1;
			this._checkWin()
		}
	};
	this.isNewGridDifferentFromPrevious = function () {
		for (var a = 0; a < NUM_ROWS; a++) for (var b = 0; b < NUM_COLS; b++) if (l[a][b] !== f[a][b]) return ! 0;
		return ! 1
	};
	this._initGrid = function () {
		this._initGridBg();
		t = new createjs.Container;
		t.x = CANVAS_WIDTH / 2 - NUM_COLS / 2 * (CELL_WIDTH + SPACE_BETWEEN_CELLS) + CELL_WIDTH / 2 + SPACE_BETWEEN_CELLS / 2;
		t.y = CANVAS_HEIGHT / 2 - NUM_ROWS / 2 * (CELL_HEIGHT + SPACE_BETWEEN_CELLS) + CELL_HEIGHT / 2;
		s_oStage.addChild(t);
		r = new createjs.Container;
		r.x = CANVAS_WIDTH / 2 - NUM_COLS / 2 * (CELL_WIDTH + SPACE_BETWEEN_CELLS) + CELL_WIDTH / 2 + SPACE_BETWEEN_CELLS / 2;
		r.y = CANVAS_HEIGHT / 2 - NUM_ROWS / 2 * (CELL_HEIGHT + SPACE_BETWEEN_CELLS) + CELL_HEIGHT / 2;
		s_oStage.addChild(r);
		f = [];
		l = [];
		g = [];
		for (var a = 0, b = 0, c = 0; c < NUM_ROWS; c++) {
			g[c] = [];
			f[c] = [];
			l[c] = [];
			for (var d = 0; d < NUM_COLS; d++) {
				var e = new CCell(a, b, r);
				g[c][d] = e;
				f[c][d] = CELL_EMPTY;
				l[c][d] = CELL_EMPTY;
				a += CELL_WIDTH + SPACE_BETWEEN_CELLS
			}
			a = 0;
			b += CELL_HEIGHT + SPACE_BETWEEN_CELLS
		}
	};
	this._initGridBg = function () {
		for (var a = CANVAS_WIDTH / 2 - NUM_COLS / 2 * (CELL_WIDTH + SPACE_BETWEEN_CELLS) + CELL_WIDTH / 2 + SPACE_BETWEEN_CELLS / 2, b = CANVAS_HEIGHT / 2 - NUM_ROWS / 2 * (CELL_HEIGHT + SPACE_BETWEEN_CELLS) + CELL_HEIGHT / 2, c = s_oSpriteLibrary.getSprite("cell_empty"), d = 0; d < NUM_ROWS; d++) {
			for (var f = 0; f < NUM_COLS; f++) {
				var g = createBitmap(c);
				g.regX = c.width / 2;
				g.regY = c.height / 2;
				g.x = a;
				g.y = b;
				s_oStage.addChild(g);
				a += CELL_WIDTH + SPACE_BETWEEN_CELLS
			}
			a = CANVAS_WIDTH / 2 - NUM_COLS / 2 * (CELL_WIDTH + SPACE_BETWEEN_CELLS) + CELL_WIDTH / 2 + SPACE_BETWEEN_CELLS / 2;
			b += CELL_HEIGHT + SPACE_BETWEEN_CELLS
		}
	};
	this._fillNewCell = function (a, b) {
		for (var d = [], q = 0; q < NUM_ROWS; q++) for (var e = 0; e < NUM_COLS; e++) f[q][e] === CELL_EMPTY && d.push({
			row: q,
			col: e
		});
		0 === d.length ? this._gameOver() : (e = Math.floor(Math.random() * d.length), q = d[e].row, d = d[e].col, f[q][d] += 1, g[q][d].playSpawnAnim(), c = !1)
	};
	this._debugFillNewCell = function (a, b, d) {
		f[a][b] = d;
		g[a][b].setValue(d);
		c = !1
	};
	this._findMatching = function () {
		switch (k) {
		case "up":
			this._findMatchingUp();
			break;
		case "down":
			this._findMatchingDown();
			break;
		case "left":
			this._findMatchingLeft();
			break;
		case "right":
			this._findMatchingRight()
		}
	};
	this._findMatchingUp = function () {
		for (var a = 0; a < NUM_COLS; a++) for (var b = 0, c = 0; b < NUM_ROWS;) if (f[b][a] !== CELL_EMPTY) {
			var d = f[b][a];
			this._createMovingCell(d, g[b][a].getPos(), g[b - c][a].getPos(), b - c, a);
			g[b][a].setEmpty();
			for (var e = b + 1; e < NUM_ROWS;) if (f[e][a] !== CELL_EMPTY) {
				f[b][a] === f[e][a] && (this._createMovingCell(d, g[e][a].getPos(), g[b - c][a].getPos(), b - c, a), g[e][a].setEmpty(), f[b][a] += 1, f[e][a] = CELL_EMPTY);
				break
			} else e++;
			b++
		} else b++,
		c++
	};
	this._findMatchingDown = function () {
		for (var a = 0; a < NUM_COLS; a++) for (var b = NUM_ROWS - 1, c = 0; 0 <= b;) if (f[b][a] !== CELL_EMPTY) {
			var d = f[b][a];
			this._createMovingCell(d, g[b][a].getPos(), g[b + c][a].getPos(), b + c, a);
			g[b][a].setEmpty();
			for (var e = b - 1; 0 <= e;) if (f[e][a] !== CELL_EMPTY) {
				f[b][a] === f[e][a] && (this._createMovingCell(d, g[e][a].getPos(), g[b + c][a].getPos(), b + c, a), g[e][a].setEmpty(), f[b][a] += 1, f[e][a] = CELL_EMPTY);
				break
			} else e--;
			b--
		} else b--,
		c++
	};
	this._findMatchingLeft = function () {
		for (var a = 0; a < NUM_ROWS; a++) for (var b = 0, c = 0; b < NUM_COLS;) if (f[a][b] !== CELL_EMPTY) {
			var d = f[a][b];
			this._createMovingCell(d, g[a][b].getPos(), g[a][b - c].getPos(), a, b - c);
			g[a][b].setEmpty();
			for (var e = b + 1; e < NUM_COLS;) if (f[a][e] !== CELL_EMPTY) {
				f[a][b] === f[a][e] && (this._createMovingCell(d, g[a][e].getPos(), g[a][b - c].getPos(), a, b - c), g[a][e].setEmpty(), f[a][b] += 1, f[a][e] = CELL_EMPTY);
				break
			} else e++;
			b++
		} else b++,
		c++
	};
	this._findMatchingRight = function () {
		for (var a = 0; a < NUM_ROWS; a++) for (var b = NUM_COLS - 1, c = 0; 0 <= b;) if (f[a][b] !== CELL_EMPTY) {
			var d = f[a][b];
			this._createMovingCell(d, g[a][b].getPos(), g[a][b + c].getPos(), a, b + c);
			g[a][b].setEmpty();
			for (var e = b - 1; 0 <= e;) if (f[a][e] !== CELL_EMPTY) {
				f[a][b] === f[a][e] && (this._createMovingCell(d, g[a][e].getPos(), g[a][b + c].getPos(), a, b + c), g[a][e].setEmpty(), f[a][b] += 1, f[a][e] = CELL_EMPTY);
				break
			} else e--;
			b--
		} else b--,
		c++
	};
	this._trimGrid = function () {
		switch (k) {
		case "up":
			for (var a = 0; a < NUM_COLS; a++) for (var b = 0, c = 0; b < NUM_ROWS;) f[b][a] === CELL_EMPTY ? c++:0 < c && (f[b - c][a] = f[b][a], f[b][a] = CELL_EMPTY),
			b++;
			break;
		case "down":
			for (a = 0; a < NUM_COLS; a++) for (b = NUM_ROWS - 1, c = 0; 0 <= b;) f[b][a] === CELL_EMPTY ? c++:0 < c && (f[b + c][a] = f[b][a], f[b][a] = CELL_EMPTY),
			b--;
			break;
		case "left":
			for (a = 0; a < NUM_ROWS; a++) for (c = b = 0; b < NUM_COLS;) f[a][b] === CELL_EMPTY ? c++:0 < c && (f[a][b - c] = f[a][b], f[a][b] = CELL_EMPTY),
			b++;
			break;
		case "right":
			for (a = 0; a < NUM_ROWS; a++) for (b = NUM_COLS - 1, c = 0; 0 <= b;) f[a][b] === CELL_EMPTY ? c++:0 < c && (f[a][b + c] = f[a][b], f[a][b] = CELL_EMPTY),
			b--
		}
	};
	this._createMovingCell = function (a, b, c, d, e) {
		a = new CFakeMovingCell(a, b, c, d, e, t);
		p.push(a)
	};
	this.movingCellArrived = function (a, b) {
		g[a][b].playNewValueAnim(f[a][b]);
		e++;
		e === p.length && this._checkWin()
	};
	this._checkWin = function () {
		if (d) this._fillNewCell();
		else {
			for (var a = 2, b = 0; b < NUM_ROWS; b++) for (var c = 0; c < NUM_COLS; c++) a < Math.pow(2, f[b][c]) && (a = Math.pow(2, f[b][c])),
			Math.pow(2, f[b][c]) === GOAL_NUMBER && (d = !0);
			a > s_iBestScore && (s_iBestScore = a, saveItem("best_score", s_iBestScore), n.refreshBestScore());
			h = a;
			n.refreshScore(h);
			d ? (n.showWin(), $(s_oMain).trigger("share_event", h), $(s_oMain).trigger("save_score", h)) : this._fillNewCell()
		}
	};
	this._gameOver = function () {
		c = !0;
		setVolume("soundtrack", 1);
		n.gameOver(h);
		$(s_oMain).trigger("share_event", h);
		$(s_oMain).trigger("save_score", h)
	};
	this.printGridValues = function () {
		for (var a = "", b = 0; b < NUM_ROWS; b++) {
			for (var c = "", d = 0; d < NUM_COLS; d++) c += "|" + f[b][d];
			c += "|";
			a += c + "\n"
		}
		trace(a)
	};
	this.onExit = function () {
		setVolume("soundtrack", 1);
		s_oGame.unload();
		s_oMain.gotoMenu();
		$(s_oMain).trigger("end_session");
		$(s_oMain).trigger("show_interlevel_ad")
	};
	this.update = function () {};
	s_oGame = this;
	GOAL_NUMBER = b.goal_number;
	this._init()
}
var s_oGame;
function CInterface() {
	var b, a, c, d, e, h, k, g, f, l, p = null,
	n = null,
	r, t, m, q;
	this._init = function () {
		var v = s_oSpriteLibrary.getSprite("but_exit");
		m = new createjs.Text(TEXT_SCORE + " 0", "36px " + PRIMARY_FONT, "#ab152c");
		m.textAlign = "left";
		m.textBaseline = "alphabetic";
		m.x = 40;
		m.y = 1100;
		s_oStage.addChild(m);
		q = new createjs.Text(TEXT_BEST_SCORE + " " + s_iBestScore, "36px " + PRIMARY_FONT, "#ab152c");
		q.textAlign = "right";
		q.textBaseline = "alphabetic";
		q.x = CANVAS_WIDTH - 40;
		q.y = 1100;
		s_oStage.addChild(q);
		c = CANVAS_WIDTH - v.width / 2 - 10;
		d = v.height / 2 + 10;
		r = new CGfxButton(c, d, v, s_oStage);
		r.addEventListener(ON_MOUSE_UP, this._onExit, this);
		if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) {
			var u = s_oSpriteLibrary.getSprite("audio_icon");
			k = c - v.width / 2 - u.width / 4 - 10;
			g = d;
			f = new CToggle(k, g, u, s_bAudioActive, s_oStage);
			f.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
			b = k - u.width / 2 - 20;
			a = g
		} else b = c - v.width - 10,
		a = d;
		u = window.document;
		var w = u.documentElement;
		p = w.requestFullscreen || w.mozRequestFullScreen || w.webkitRequestFullScreen || w.msRequestFullscreen;
		n = u.exitFullscreen || u.mozCancelFullScreen || u.webkitExitFullscreen || u.msExitFullscreen; ! 1 === ENABLE_FULLSCREEN && (p = !1);
		p && !1 === inIframe() ? (u = s_oSpriteLibrary.getSprite("but_fullscreen"), l = new CToggle(b, a, u, s_bFullscreen, s_oStage), l.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this), e = b - v.width) : e = b;
		h = a;
		t = new CGfxButton(e, h, s_oSpriteLibrary.getSprite("but_restart_small"), s_oStage);
		t.addEventListener(ON_MOUSE_UP, this._onRestart, this);
		this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
	};
	this.refreshButtonPos = function (m, n) { ! 1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || f.setPosition(k - m, g + n);
		p && !1 === inIframe() && l.setPosition(b - m, a + n);
		r.setPosition(c - m, d + n);
		t.setPosition(e - m, h + n)
	};
	this.refreshScore = function (a) {
		m.text = TEXT_SCORE + " " + a
	};
	this.refreshBestScore = function () {
		q.text = TEXT_BEST_SCORE + " " + s_iBestScore
	};
	this.unload = function () {
		if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) f.unload(),
		f = null;
		p && !1 === inIframe() && l.unload();
		t.unload();
		r.unload();
		s_oInterface = null
	};
	this.gameOver = function (a) {
		new CEndPanel(a)
	};
	this.showWin = function () {
		new CWinPanel
	};
	this._onExit = function () {
		new CAreYouSurePanel(s_oStage)
	};
	this._onAudioToggle = function () {
		Howler.mute(s_bAudioActive);
		s_bAudioActive = !s_bAudioActive
	};
	this.resetFullscreenBut = function () {
		l.setActive(s_bFullscreen)
	};
	this._onFullscreenRelease = function () {
		s_bFullscreen ? n.call(window.document) : p.call(window.document.documentElement);
		sizeHandler()
	};
	this._onRestart = function () {
		s_oGame.restart()
	};
	s_oInterface = this;
	this._init();
	return this
}
var s_oInterface = null;
function CCreditsPanel() {
	var b, a, c, d, e, h, k, g;
	this._init = function () {
		e = new createjs.Shape;
		e.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		e.alpha = 0;
		s_oStage.addChild(e);
		(new createjs.Tween.get(e)).to({
			alpha: .7
		},
		500);
		var f = s_oSpriteLibrary.getSprite("msg_box");
		g = new createjs.Container;
		g.y = CANVAS_HEIGHT + f.height / 2;
		s_oStage.addChild(g);
		b = createBitmap(f);
		b.regX = f.width / 2;
		b.regY = f.height / 2;
		b.x = CANVAS_WIDTH / 2;
		b.y = CANVAS_HEIGHT / 2;
		g.addChild(b);
		h = new createjs.Shape;
		h.graphics.beginFill("#0f0f0f").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		h.alpha = .01;
		h.on("click", this._onLogoButRelease);
		g.addChild(h);
		f = s_oSpriteLibrary.getSprite("but_exit");
		c = new CGfxButton(605, 550, f, g);
		c.addEventListener(ON_MOUSE_UP, this.unload, this);
		d = new createjs.Text(TEXT_CREDITS_DEVELOPED, "44px " + PRIMARY_FONT, "#ab152c");
		d.textAlign = "center";
		d.textBaseline = "alphabetic";
		d.x = CANVAS_WIDTH / 2;
		d.y = CANVAS_HEIGHT / 2 + 80;
		g.addChild(d);
		f = s_oSpriteLibrary.getSprite("logo_ctl");
		a = createBitmap(f);
		a.regX = f.width / 2;
		a.regY = f.height / 2;
		a.x = CANVAS_WIDTH / 2;
		a.y = CANVAS_HEIGHT / 2 + 140;
		g.addChild(a);
		k = new createjs.Text("www.codethislab.com", "38px " + PRIMARY_FONT, "#ab152c");
		k.textAlign = "center";
		k.textBaseline = "alphabetic";
		k.x = CANVAS_WIDTH / 2;
		k.y = CANVAS_HEIGHT / 2 + 220;
		g.addChild(k);
		(new createjs.Tween.get(g)).to({
			y: 0
		},
		1E3, createjs.Ease.backOut)
	};
	this.unload = function () {
		h.off("click", this._onLogoButRelease);
		c.unload();
		c = null;
		s_oStage.removeChild(e);
		s_oStage.removeChild(g);
		s_oMenu.exitFromCredits()
	};
	this._onLogoButRelease = function () {
		window.open("http://www.codethislab.com/index.php?&l=en", "_blank")
	};
	this._init()
}
function CCell(b, a, c) {
	var d, e, h, k;
	this._init = function (a, b) {
		d = 0;
		k = new createjs.Container;
		k.x = a;
		k.y = b;
		g.addChild(k);
		var c = {
			images: [s_oSpriteLibrary.getSprite("cells")],
			frames: {
				width: CELL_WIDTH,
				height: CELL_HEIGHT,
				regX: CELL_WIDTH / 2,
				regY: CELL_HEIGHT / 2
			},
			animations: {
				cell_0: [ - 1],
				cell_1: [0],
				cell_2: [1],
				cell_3: [2],
				cell_4: [3],
				cell_5: [4],
				cell_6: [5],
				cell_7: [6],
				cell_8: [7],
				cell_9: [8],
				cell_10: [9],
				cell_11: [10],
				cell_12: [11]
			}
		};
		e = new createjs.SpriteSheet(c);
		h = createSprite(e, "cell_" + d, CELL_WIDTH / 2, CELL_HEIGHT / 2, CELL_WIDTH, CELL_HEIGHT);
		k.addChild(h)
	};
	this.reset = function () {
		this.setValue(0)
	};
	this.setValue = function (a) {
		d = a;
		h.gotoAndStop("cell_" + d)
	};
	this.setNextValue = function () {
		d++;
		h.gotoAndStop("cell_" + d)
	};
	this.setEmpty = function () {
		d = 0;
		h.gotoAndStop("cell_" + d)
	};
	this.playSpawnAnim = function () {
		h.scaleX = h.scaleY = .1;
		this.setNextValue();
		createjs.Tween.get(h).to({
			scaleX: 1,
			scaleY: 1
		},
		500, createjs.Ease.backOut).call(function () {})
	};
	this.playNewValueAnim = function (a) {
		0 < d && (playSound("matching", 1, !1), 7 < d && playSound("great_matching", 1, !1), createjs.Tween.get(h).to({
			scaleX: 1.1,
			scaleY: 1.1
		},
		100, createjs.Ease.linear).call(function () {
			createjs.Tween.get(h).to({
				scaleX: 1,
				scaleY: 1
			},
			100, createjs.Ease.linear)
		}));
		this.setValue(a)
	};
	this.getPos = function () {
		return {
			x: k.x,
			y: k.y
		}
	};
	this.getType = function () {
		return d
	};
	var g = c;
	this._init(b, a)
}
function CFakeMovingCell(b, a, c, d, e, h) {
	var k, g, f, l, p, n;
	this._init = function (a, b, c, d, e) {
		f = a;
		l = c;
		k = d;
		g = e;
		n = new createjs.Container;
		n.x = b.x;
		n.y = b.y;
		t.addChild(n);
		a = {
			images: [s_oSpriteLibrary.getSprite("cells")],
			frames: {
				width: CELL_WIDTH,
				height: CELL_HEIGHT,
				regX: CELL_WIDTH / 2,
				regY: CELL_HEIGHT / 2
			},
			animations: {
				cell_0: [ - 1],
				cell_1: [0],
				cell_2: [1],
				cell_3: [2],
				cell_4: [3],
				cell_5: [4],
				cell_6: [5],
				cell_7: [6],
				cell_8: [7],
				cell_9: [8],
				cell_10: [9],
				cell_11: [10],
				cell_12: [11]
			}
		};
		a = new createjs.SpriteSheet(a);
		p = createSprite(a, "cell_" + f, CELL_WIDTH / 2, CELL_HEIGHT / 2, CELL_WIDTH, CELL_HEIGHT);
		n.addChild(p)
	};
	this.unload = function () {
		t.removeChild(n)
	};
	this.playMovingAnim = function () {
		createjs.Tween.get(n).to({
			x: l.x,
			y: l.y
		},
		100, createjs.Ease.linear).call(function () {
			s_oGame.movingCellArrived(k, g);
			r.unload()
		})
	};
	this.getCoord = function () {
		return {
			row: k,
			col: g
		}
	};
	var r = this;
	var t = h;
	this._init(b, a, c, d, e)
}
function CAreYouSurePanel() {
	var b, a, c, d, e;
	this._init = function () {
		d = new createjs.Shape;
		d.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		d.alpha = 0;
		d.on("mousedown", function () {});
		s_oStage.addChild(d);
		(new createjs.Tween.get(d)).to({
			alpha: .7
		},
		500);
		e = new createjs.Container;
		s_oStage.addChild(e);
		var h = s_oSpriteLibrary.getSprite("msg_box"),
		g = createBitmap(h);
		g.regX = h.width / 2;
		g.regY = h.height / 2;
		g.x = CANVAS_WIDTH / 2;
		g.y = CANVAS_HEIGHT / 2;
		e.addChild(g);
		e.y = CANVAS_HEIGHT + h.height / 2;
		b = e.y;
		(new createjs.Tween.get(e)).to({
			y: 0
		},
		1E3, createjs.Ease.backOut);
		h = new createjs.Text(TEXT_ARE_SURE, " 100px " + PRIMARY_FONT, "#ab152c");
		h.x = CANVAS_WIDTH / 2;
		h.y = CANVAS_HEIGHT / 2 + 60;
		h.textAlign = "center";
		h.textBaseline = "middle";
		h.lineWidth = 500;
		e.addChild(h);
		a = new CGfxButton(CANVAS_WIDTH / 2 + 180, 1010, s_oSpriteLibrary.getSprite("but_yes"), e);
		a.addEventListener(ON_MOUSE_UP, this._onButYes, this);
		c = new CGfxButton(CANVAS_WIDTH / 2 - 180, 1010, s_oSpriteLibrary.getSprite("but_no"), e);
		c.addEventListener(ON_MOUSE_UP, this._onButNo, this)
	};
	this._onButYes = function () {
		c.disable();
		a.disable();
		(new createjs.Tween.get(d)).to({
			alpha: 0
		},
		500);
		(new createjs.Tween.get(e)).to({
			y: b
		},
		400, createjs.Ease.backIn).call(function () {
			h.unload();
			s_oGame.onExit()
		})
	};
	this._onButNo = function () {
		c.disable();
		a.disable();
		(new createjs.Tween.get(d)).to({
			alpha: 0
		},
		500);
		(new createjs.Tween.get(e)).to({
			y: b
		},
		400, createjs.Ease.backIn).call(function () {
			h.unload()
		})
	};
	this.unload = function () {
		c.unload();
		a.unload();
		s_oStage.removeChild(d);
		s_oStage.removeChild(e);
		d.off("mousedown", function () {})
	};
	var h = this;
	this._init()
}
function CEndPanel(b) {
	var a, c, d, e, h;
	this._init = function (b) {
		h = new createjs.Container;
		s_oStage.addChild(h);
		a = createBitmap(s_oSpriteLibrary.getSprite("bg_end_panel"));
		h.addChild(a);
		e = new createjs.Text(TEXT_END_PANEL + ": " + b, "54px " + PRIMARY_FONT, "#8ce5e6");
		e.textAlign = "center";
		e.textBaseline = "alphabetic";
		e.x = CANVAS_WIDTH / 2;
		e.y = CANVAS_HEIGHT / 2;
		h.addChild(e);
		c = new CGfxButton(CANVAS_WIDTH / 2 - 180, 900, s_oSpriteLibrary.getSprite("but_home"), h);
		c.addEventListener(ON_MOUSE_UP, this._onExit, this);
		d = new CGfxButton(CANVAS_WIDTH / 2 + 180, 900, s_oSpriteLibrary.getSprite("but_restart"), h);
		d.addEventListener(ON_MOUSE_UP, this._onRestart, this);
		h.alpha = 0;
		(new createjs.Tween.get(h)).to({
			alpha: 1
		},
		500).call(function () {})
	};
	this.unload = function () {
		c.unload();
		c = null;
		d.unload();
		d = null;
		s_oStage.removeChild(h)
	};
	this._onExit = function () {
		$(s_oMain).trigger("show_interlevel_ad");
		k.unload();
		s_oMain.gotoMenu()
	};
	this._onRestart = function () {
		$(s_oMain).trigger("show_interlevel_ad");
		k.unload();
		s_oGame.restart()
	};
	var k = this;
	this._init(b)
}
function CWinPanel() {
	var b, a, c, d, e, h;
	this._init = function (g) {
		h = new createjs.Container;
		s_oStage.addChild(h);
		b = createBitmap(s_oSpriteLibrary.getSprite("bg_end_panel"));
		h.addChild(b);
		e = new createjs.Text(TEXT_CONGRATS + " " + GOAL_NUMBER + "!", "74px " + PRIMARY_FONT, "#8ce5e6");
		e.textAlign = "center";
		e.textBaseline = "alphabetic";
		e.lineWidth = 500;
		e.x = CANVAS_WIDTH / 2;
		e.y = CANVAS_HEIGHT / 2;
		h.addChild(e);
		a = new CGfxButton(CANVAS_WIDTH / 2 - 200, 900, s_oSpriteLibrary.getSprite("but_home"), h);
		a.addEventListener(ON_MOUSE_UP, this._onExit, this);
		c = new CGfxButton(CANVAS_WIDTH / 2, 900, s_oSpriteLibrary.getSprite("but_restart"), h);
		c.addEventListener(ON_MOUSE_UP, this._onRestart, this);
		d = new CGfxButton(CANVAS_WIDTH / 2 + 200, 900, s_oSpriteLibrary.getSprite("but_continue"), h);
		d.addEventListener(ON_MOUSE_UP, this._onContinue, this);
		h.alpha = 0;
		(new createjs.Tween.get(h)).to({
			alpha: 1
		},
		500).call(function () {})
	};
	this.unload = function () {
		a.unload();
		a = null;
		c.unload();
		c = null;
		s_oStage.removeChild(h)
	};
	this._onExit = function () {
		$(s_oMain).trigger("show_interlevel_ad");
		k.unload();
		s_oMain.gotoMenu()
	};
	this._onRestart = function () {
		$(s_oMain).trigger("show_interlevel_ad");
		k.unload();
		s_oGame.restart()
	};
	this._onContinue = function () {
		$(s_oMain).trigger("show_interlevel_ad");
		k.unload();
		s_oGame.resumeGame()
	};
	var k = this;
	this._init()
}
function CMsgBox(b, a) {
	var c, d, e;
	this._init = function (a) {
		e = new createjs.Container;
		k.addChild(e);
		a = new createjs.Shape;
		a.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		a.alpha = .5;
		a.on("click", function () {});
		e.addChild(a);
		a = s_oSpriteLibrary.getSprite("msg_box");
		var b = createBitmap(a);
		b.x = .5 * CANVAS_WIDTH;
		b.y = .5 * CANVAS_HEIGHT;
		b.regX = .5 * a.width;
		b.regY = .5 * a.height;
		e.addChild(b);
		c = new createjs.Text(TEXT_ERR_LS, "40px " + PRIMARY_FONT, "#fff");
		c.x = CANVAS_WIDTH / 2;
		c.y = 670;
		c.textAlign = "center";
		c.textBaseline = "middle";
		c.lineWidth = 500;
		e.addChild(c);
		d = new CGfxButton(CANVAS_WIDTH / 2, 1030, s_oSpriteLibrary.getSprite("but_yes"), e);
		d.addEventListener(ON_MOUSE_UP, this._onButOk, this)
	};
	this._onButOk = function () {
		h.unload()
	};
	this.unload = function () {
		d.unload();
		k.removeChild(e)
	};
	var h = this;
	var k = a;
	this._init(b)
};