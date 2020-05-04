
function gradle_disableInput() {
    "undefined" == typeof gradle_overlay && (gradle_overlay = game.make.sprite(game.width / 2, game.height / 2, "void"), gradle_overlay.anchor.set(0, 1), gradle_overlay.inputEnabled = !0);
    gradle_overlay.position.setTo(game.width / 2, game.height / 2);
    gradle_overlay.width = game.width;
    gradle_overlay.height = game.heigth;
    gradle_overlay.visible = !0
}

function gradle_enableInput() {
    "undefined" != typeof gradle_overlay && (gradle_overlay.visible = !1)
}

function gradle_pauseMusic() {
    game.sound.mute = !0
}

function gradle_resumeMusic() {
    game.sound.mute = !1
}

function getJsonFromUrl() {
    for (var a = {}, b = location.search.substr(1).split("&"), c = 0; c < b.length; c++) {
        var d = b[c].indexOf("="),
            d = [b[c].substring(0, d), b[c].substring(d + 1)];
        a[d[0]] = decodeURIComponent(d[1])
    }
    return a
};
var GameSounds = function() {
    this.musicON = !0;
    this.musics = [];
    this.sounds = [];
    this.actualMusic = null
};
GameSounds.prototype = {
    constructor: GameSounds,
    create: function() {
        this.musics[MUSIC_BOSS] = game.add.audio("mscBossFight", .25, !0);
        for (var a = 0; a < soundsList.length; a++) {
            var b = 1;
            3 === soundsList[a].length && (b = soundsList[a][2]);
            this.sounds[soundsList[a][0]] = game.add.audio(soundsList[a][0], b)
        }
    },
    playMusic: function(a, b) {
        if (SOUNDS_ENABLED && (a != this.actualMusic || 1 == b)) {
            this.actualMusic = a;
            for (var c = 0; c < this.musics.length; c++) this.musics[c].stop();
            this.musicON && null != this.actualMusic && this.musics[this.actualMusic].play()
        }
    },
    playSound: function(a, b) {
        if (SOUNDS_ENABLED) try {
            this.sounds[a].play()
        } catch (c) {}
    },
    stopSound: function(a) {
        SOUNDS_ENABLED && this.musicON && this.sounds[a].isPlaying && this.sounds[a].stop()
    },
    pauseSound: function() {
        SOUNDS_ENABLED && this.musicON && this.sounds.sndTimer.isPlaying && this.sounds.sndTimer.pause()
    },
    resumeSound: function() {
        SOUNDS_ENABLED && this.musicON && this.sounds.sndTimer.paused && this.sounds.sndTimer.resume()
    },
    playSoundFadeIn: function(a) {
        if (SOUNDS_ENABLED && this.musicON) {
            try {
                this.sounds[a].fadeTween.stop()
            } catch (b) {}
            try {
                this.sounds[a].fadeIn(200, !0)
            } catch (c) {}
        }
    },
    playSoundFadeOut: function(a) {
        if (SOUNDS_ENABLED && this.musicON) try {
            this.sounds[a].fadeOut(350)
        } catch (b) {}
    },
    pauseMusic: function() {
        SOUNDS_ENABLED && this.musicON && null !== this.actualMusic && this.musics[this.actualMusic].pause()
    },
    resumeMusic: function() {
        SOUNDS_ENABLED && this.musicON && null !== this.actualMusic && this.musics[this.actualMusic].resume()
    },
    stopMusic: function() {
        if (SOUNDS_ENABLED)
            for (var a = 0; a < this.musics.length; a++) this.musics[a].stop()
    },
    toggleEnableDisableMusic: function() {
        SOUNDS_ENABLED &&
            (this.musicON ? (this.musicON = !1, this.stopMusic(), game.sound.mute = !0) : (this.musicON = !0, this.playMusic(this.actualMusic, !0), game.sound.mute = !1), saveAllGameData())
    },
    toggleEnableDisableSound: function(a) {
        SOUNDS_ENABLED && (this.soundON = !this.soundON, saveAllGameData())
    }
};
var GameTexts = function() {
    this.xml = this.gameTextsParsed = null;
    this.gameTextsLists = []
};
GameTexts.prototype = {
    preload: function() {},
    create: function() {
		var a = game.cache.getText("gameTexts");
		//gradle.event(a);
		a = JSON.parse(a).stringresources.strings.string;
		var b, c;
        for (c=0; c < a.length; c++) {
            b = a[c]["-id"];
            null == this.gameTextsLists[b] && (this.gameTextsLists[b] = []);
            for (var d = 0; d < LANGUAGES.length; d++) this.gameTextsLists[b][LANGUAGES[d]] = a[c][LANGUAGES[d]]
        }
    },
    textFromID: function(a) {
        return void 0 == this.gameTextsLists[a] || void 0 == this.gameTextsLists[a][LANGUAGES[GAME_LANGUAGE]] ? "" : this.gameTextsLists[a][LANGUAGES[GAME_LANGUAGE]]
    },
    textFromID_toUpper: function(a) {
        return void 0 == this.gameTextsLists[a] || void 0 == this.gameTextsLists[a][LANGUAGES[GAME_LANGUAGE]] ? "" : this.gameTextsLists[a][LANGUAGES[GAME_LANGUAGE]].toUpperCase()
    },
    updateTextToWidth: function(a, b, c) {
        for (a.fontSize = b; a.width > c;) b--, a.fontSize = b
    },
    updateTextToHeight: function(a, b, c) {
        for (a.fontSize = b; a.height > c;) b--, a.fontSize = b
    }
};

function loadLanguageSettings() {
    var a = navigator.userLanguage || navigator.language,
        a = a.toLowerCase();
    systemLang = "en";
    for (var b = 1; b < LANGUAGES.length; b++) - 1 !== a.indexOf(LANGUAGES[b]) && (systemLang = LANGUAGES[b]);
    GAME_LANGUAGE = LANGUAGES.indexOf(systemLang)
}
var LANGUAGE_EN = 0,
    LANGUAGE_DE = 1,
    LANGUAGE_FR = 2,
    LANGUAGE_ES = 3,
    LANGUAGE_BR = 4,
    LANGUAGE_IT = 5,
    LANGUAGES = "en de fr es br it".split(" "),
    GAME_LANGUAGE = LANGUAGE_EN,
    systemLang = "",
    TEXT_YELLOW_COLOR = "#efb64c",
    TEXT_YELLOW_COLOR_bmp = 15709772,
    TEXT_WHITE_COLOR = "#ffffff",
    TEXT_WHITE_COLOR_bmp = 16777215,
    TEXT_BLUE_COLOR = "#5e9ecc",
    TEXT_BLUE_COLOR_bmp = 6201036,
    TEXT_STAGE = "StageKey",
    TEXT_SCORE = "ScoreKey",
    TEXT_REWARD = "RewardKey",
    TEXT_CONTINUE_Q = "ContinueQKey",
    TEXT_CONTINUE = "ContinueKey",
    TEXT_NOTHANKS = "NoThanksKey",
    TEXT_PLAY =
    "PlayKey",
    TEXT_BUY = "BuyKey",
    TEXT_QUIT_GAME = "QuitGameKey",
    TEXT_YES_QUIT = "YesQuitKey",
    TEXT_NO_QUIT = "KeepPlayingKey",
    TEXT_BOSSFIGHT = "BossFightKey",
    TEXT_LOCKED = "LockedKey",
    TEXT_BUYFORAPPLES = "BuyForApplesKey",
    TEXT_BOSSKNIVES = "BossKnivesKey",
    TEXT_BOSSDEFEATED = "BossDefeatedKey",
    TEXT_KNIFEUNLOCKED = "BossKnifeUnlockedKey",
    TEXT_RESTART = "RestartKey";


var partnerName = "gradle";


var SOUNDS_ENABLED = !0,
    RUNNING_ON_WP = -1 < navigator.userAgent.indexOf("Windows Phone");
RUNNING_ON_WP && (SOUNDS_ENABLED = !1);
Phaser.Device._initialize();
var RUNNING_ON_DESKTOP = Phaser.Device.desktop,
    RUNNING_ON_IOS = !1,
    userAgent = navigator.userAgent || navigator.vendor || window.opera;
if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i) || userAgent.match(/iPod/i)) RUNNING_ON_IOS = !0;
var GAME_VERSION = "1.0.4",
    GAME_NAME = "Knife gradle",
    APP_STATES = {
        MENU: 0,
        GAME_START: 1,
        GAME_RUNNING: 2,
        GAME_PAUSED: 3,
        STAGE_FAILED: 4,
        STAGE_WIN: 5,
        GAME_OVER: 6
    },
    MUSIC_BOSS = 0,
    LEVEL_OVER = 0,
    LEVEL_OVER_EXIT_BY_USER = 1,
    btnDistanceFromCorner = 35;

function logToConsole(a, b, c, d) {
	//gradle.event(arguments);
}
Array.prototype.contains = function(a) {
    for (var b = this.length; b--;)
        if (this[b] === a) return !0;
    return !1
};

function getCorrectAnchorX(a, b) {
    return Math.round(a.width * b) / a.width
}

function getCorrectAnchorY(a, b) {
    return Math.round(a.height * b) / a.height
}

function getRandomUIntInRange(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a
}

function getRandomInt(a) {
    return Math.floor(Math.random() * a) * (50 < getRandomUInt(100) ? -1 : 1)
}

function getRandomUInt(a) {
    return Math.floor(Math.random() * a)
}

function getRandomValueFromList(a) {
    return a[Math.floor(Math.random() * a.length)]
}

function getRandomIdxFromList(a) {
    return getRandomUIntInRange(0, a.length - 1)
}

function setObjectAnchor(a, b, c) {
    null != b && (a.anchor.x = getCorrectAnchorX(a, b));
    null != c && (a.anchor.y = getCorrectAnchorY(a, c))
}

function average(a) {
    for (var b = 0, c = 0; c < a.length; c++) b += a[c];
    return Math.floor(b / a.length)
}

function recalcDegreesToRadians(a) {
    return Math.PI / 180 * a
}
var GAME_MAX_FPS = 60,
    GAME_AVERAGE_FPS = 10,
    GAME_BG_COLOR = "#000000",
    LEVEL_DATA_STARS_IDX = 0,
    LEVEL_DATA_BESTMOVES_IDX = 1;

function removeObjectTweens(a) {
    var b = function(a) {
            void 0 !== a.scaleObj && game.tweens.removeFrom(a.scaleObj, !0)
        },
        c = function(a) {
            for (var f = 0; f < a.children.length; f++) {
                var e = a.getChildAt(f);
                game.tweens.removeFrom(e.scale, !0);
                b(a.getChildAt(f));
                0 < a.getChildAt(f).children.length && c(a.getChildAt(f))
            }
        };
    c(a);
    game.tweens.removeFrom(a, !0);
    game.tweens.removeFrom(a.scale, !0);
    b(a)
}

function floorNumber(a) {
    return Math.floor(a)
}

function wordwrap(a, b, c, d) {
    b = 2 <= arguments.length ? +b : 75;
    c = 3 <= arguments.length ? "" + c : "\n";
    d = 4 <= arguments.length ? !!d : !1;
    var f, e, g;
    a += "";
    if (1 > b) return a;
    var k = /^\S*/,
        h = /\S*(\s)?$/,
        l = a.split(/\r\n|\n|\r/),
        m = l.length;
    for (f = 0; f < m; l[f++] += g)
        for (g = l[f], l[f] = ""; g.length > b;) {
            var n = g.slice(0, b + 1),
                p = 0,
                q = 0;
            e = n.match(h);
            e[1] ? (e = b, p = 1) : ((e = n.length - e[0].length) && (q = 1), !e && d && b && (e = b), e || (e = (g.slice(b).match(k) || [""])[0], e = n.length + e.length));
            l[f] += g.slice(0, e - q);
            g = g.slice(e + p);
            l[f] += g.length ? c : ""
        }
    return l.join("\n")
}

function addKeyWhatever(a, b, c) {
    c = c || gamePlay;
    game.input.keyboard.addKey(a).onDown.add(function() {
        b.call(c)
    }, c)
};
var IMAGE_FOLDER = "img/";

function loadSplash() {
    game.load.image("void", IMAGE_FOLDER + "void.png");
    game.load.text("gameTexts", "lang.json");
}

function loadImages() {
    game.load.json("levels_easy", "levels/le.json");
    game.load.json("levels_medium", "levels/lm.json");
    game.load.json("levels_hard", "levels/lh.json");
    game.load.atlas("pk_game1", IMAGE_FOLDER + "pak_game.png", IMAGE_FOLDER + "pak_game.json");
    game.load.atlas("pk_menu1", IMAGE_FOLDER + "pak_menu.png", IMAGE_FOLDER + "pak_menu.json")
}

function loadSounds() {
    if (SOUNDS_ENABLED) {
        game.load.audio("mscBossFight", ["audio/bossfight_loop_kratky.ogg", "audio/bossfight_loop_kratky.mp3"]);
        for (var a = 0; a < soundsList.length; a++) game.load.audio(soundsList[a][0], ["audio/sounds/" + soundsList[a][1] + ".ogg", "audio/sounds/" + soundsList[a][1] + ".mp3"])
    }
}
var soundsList = [
    ["clck", "click", .8],
    ["sndFail", "fail", 1],
    ["sndWin", "Win", 1],
    ["sndTimer", "timer", 1],
    ["sndHit", "hit", 1],
    ["sndCoin", "dojablka1", 1],
    ["sndBossStart", "boss_start", 1],
    ["sndBossWin", "boss_win", 1],
    ["sndSwoosh", "swoosh", 1],
    ["sndKnifeWin", "knifewin_skratene", 1],
    ["sndBEST", "new_best", 1]
];

function showDiv(a, b) {
    null == b && (b = !1);
    if (!game.device.desktop || b) document.getElementById(a).style.display = "block"
}

function hideDiv(a, b) {
    null == b && (b = !1);
    if (!game.device.desktop || b) document.getElementById(a).style.display = "none"
};
var Buttons = function() {
    this.default_tint_empty = 16777215;
    this.default_tint_highlited = 10078449
};
Buttons.prototype = {
    constructor: Buttons,
    create: function() {},
    createOneImgButton: function(a, b, c, d, f, e, g, k) {
        a = game.add.button(a, b, c);
        a.frameName = d;
        a.isClickable = !0;
        a.scaleOnDown = g;
        a.clbck = f;
        a.clbckCtx = e || this;
        a.events.onInputUp.add(this.btnInputUp, this);
        a.events.onInputDown.add(this.btnInputDown, this);
        a.events.onInputOver.add(this.btnInputOver, this);
        a.events.onInputOut.add(this.btnInputOut, this);
        setObjectAnchor(a, .5, .5);
        void 0 != k ? (a.maxScaleX = k[0], a.maxScaleY = k[1], a.scale.set(k[0], k[1])) : (a.maxScaleX =
            1, a.maxScaleY = 1);
        a.tint_empty = this.default_tint_empty;
        a.tint_highlited = this.default_tint_highlited;
        a.tint = a.tint_empty;
        return a
    },
    createOneImgButtonWithText: function(a, b, c, d, f, e, g, k, h, l, m) {
        a = game.add.button(a, b, c);
        a.frameName = d;
        a.isClickable = !0;
        a.scaleOnDown = l;
        d = game.make.text(0, 2, f, {
            font: "25px gameFont",
            fill: g
        });
        setObjectAnchor(d, .5, .5);
        a.txtt = a.addChild(d);
        a.textID = e;
        a.maxTextWitdh = 1.3 * a.width;
        a.clbck = k;
        a.clbckCtx = h || this;
        a.events.onInputUp.add(this.btnInputUp, this);
        a.events.onInputDown.add(this.btnInputDown,
            this);
        a.events.onInputOver.add(this.btnInputOver, this);
        a.events.onInputOut.add(this.btnInputOut, this);
        setObjectAnchor(a, .5, .5);
        void 0 != m ? (a.maxScaleX = m[0], a.maxScaleY = m[1], a.scale.set(m[0], m[1])) : (a.maxScaleX = 1, a.maxScaleY = 1);
        a.tint_empty = this.default_tint_empty;
        a.tint_highlited = this.default_tint_highlited;
        a.tint = a.tint_empty;
        return a
    },
    createTwoImgButton: function(a, b, c, d, f, e, g, k, h) {
        a = game.add.button(a, b, c);
        a.frameName = d;
        a.isClickable = !0;
        d = game.make.sprite(0, 0, f, e);
        setObjectAnchor(d, .5, .5);
        a.addChild(d);
        a.clbck = g;
        a.clbckCtx = k || this;
        a.events.onInputUp.add(this.btnInputUp, this);
        a.events.onInputDown.add(this.btnInputDown, this);
        a.events.onInputOver.add(this.btnInputOver, this);
        a.events.onInputOut.add(this.btnInputOut, this);
        setObjectAnchor(a, .5, .5);
        void 0 != h ? (a.maxScaleX = h[0], a.maxScaleY = h[1], a.scale.set(h[0], h[1])) : (a.maxScaleX = 1, a.maxScaleY = 1);
        a.tint_empty = this.default_tint_highlited;
        a.tint_highlited = this.default_tint_empty;
        a.tint = a.tint_empty;
        return a
    },
    createShopButton: function(a, b, c, d, f, e, g, k, h, l) {
        a =
            game.add.button(a, b, c);
        a.frameName = d;
        a.isClickable = !0;
        d = game.make.sprite(0, 0, f, e);
        d.angle = 45;
        d.scale.set(.55);
        setObjectAnchor(d, .5, .5);
        a.addChild(d);
        a.clbck = k;
        a.clbckCtx = h || this;
        a.events.onInputUp.add(this.btnInputUp, this);
        a.events.onInputDown.add(this.btnInputDown, this);
        a.events.onInputOver.add(this.btnInputOver, this);
        a.events.onInputOut.add(this.btnInputOut, this);
        setObjectAnchor(a, .5, .5);
        void 0 != l ? (a.maxScaleX = l[0], a.maxScaleY = l[1], a.scale.set(l[0], l[1])) : (a.maxScaleX = 1, a.maxScaleY = 1);
        a.tint_empty =
            this.default_tint_empty;
        a.tint_highlited = this.default_tint_empty;
        a.tint = a.tint_empty;
        a.knifeID = g;
        a.scaleOnDown = !1;
        return a
    },
    createMenuButtonWithText: function(a, b, c, d, f, e, g, k, h) {
        a = game.add.button(a, b, c);
        null !== d && (a.frameName = d);
        a.isClickable = !0;
        d = game.make.text(0, 0, f, {
            font: "bold 40px gameFont",
            fill: TEXT_WHITE_COLOR
        });
        setObjectAnchor(d, .5, .5);
        a.txtt = a.addChild(d);
        a.textID = e;
        a.maxTextWitdh = .8 * a.width;
        a.clbck = g;
        a.clbckCtx = k || this;
        a.events.onInputUp.add(this.btnInputUp, this);
        a.events.onInputDown.add(this.btnInputDown,
            this);
        a.events.onInputOver.add(this.btnInputOver, this);
        a.events.onInputOut.add(this.btnInputOut, this);
        setObjectAnchor(a, .5, .5);
        void 0 != h ? (a.maxScaleX = h[0], a.maxScaleY = h[1], a.scale.set(h[0], h[1])) : (a.maxScaleX = 1, a.maxScaleY = 1);
        a.tint_empty = this.default_tint_empty;
        a.tint_highlited = this.default_tint_highlited;
        a.tint = a.tint_empty;
        return a
    },
    createMenuButtonWithText1: function(a, b, c, d, f, e, g, k, h) {
        a = game.add.button(a, b, c);
        a.frameName = d;
        a.isClickable = !0;
        d = game.make.text(0, -25, f, {
            font: "bold 40px gameFont",
            fill: TEXT_WHITE_COLOR
        });
        setObjectAnchor(d, .5, .5);
        a.txtt = a.addChild(d);
        a.textID = e;
        a.maxTextWitdh = .8 * a.width;
        a.clbck = g;
        a.clbckCtx = k || this;
        a.events.onInputUp.add(this.btnInputUp, this);
        a.events.onInputDown.add(this.btnInputDown, this);
        a.events.onInputOver.add(this.btnInputOver, this);
        a.events.onInputOut.add(this.btnInputOut, this);
        setObjectAnchor(a, .5, .5);
        void 0 != h ? (a.maxScaleX = h[0], a.maxScaleY = h[1], a.scale.set(h[0], h[1])) : (a.maxScaleX = 1, a.maxScaleY = 1);
        a.tint_empty = this.default_tint_empty;
        a.tint_highlited = this.default_tint_highlited;
        a.tint = a.tint_empty;
        return a
    },
    reloadButtonText: function(a, b) {
        void 0 == b && (b = 40);
        void 0 != a.textID && (a.txtt.setText(gameTexts.textFromID(a.textID)), gameTexts.updateTextToWidth(a.txtt, b, a.maxTextWitdh), setObjectAnchor(a.txtt, .5, .5))
    },
    btnInputOver: function(a) {
        game.input.pointer1.isDown || (a.tint = a.tint_highlited, null != a.textChildIdx && this.setFontColor(a, !0));
        a.mouseOnBtn = !0
    },
    btnInputOut: function(a) {
        a.tint = a.tint_empty;
        null != a.textChildIdx && this.setFontColor(a, !1);
        a.mouseOnBtn = !1
    },
    btnInputUp: function(a) {
        a.tint =
            a.tint_empty;
        a.mouseOnBtn && RUNNING_ON_DESKTOP && (a.tint = a.tint_highlited);
        null != a.textChildIdx && this.setFontColor(a, !1);
        a.mouseOnBtn && (a.mouseOnBtn = !1, a.clbck.call(a.clbckCtx, a));
        void 0 != a.scaleOnDown && 1 != a.scaleOnDown || a.scale.set(a.maxScaleX || 1, a.maxScaleY || 1)
    },
    btnInputDown: function(a) {
        a.tint = a.tint_highlited;
        null != a.textChildIdx && this.setFontColor(a, !0);
        void 0 != a.scaleOnDown && 1 != a.scaleOnDown || a.scale.set(.95 * a.maxScaleX || .95, .95 * a.maxScaleY || .95);
        a.mouseOnBtn = !0
    },
    setFontColor: function(a, b) {
        for (var c =
                0; c < a.textChildIdx.length; c++) b ? a.getChildAt(a.textChildIdx[c]).fill = "#CC9E6A" : a.getChildAt(a.textChildIdx[c]).fill = a.getChildAt(a.textChildIdx[c]).originalFill
    }
};
var GUI = function() {
    this.buttonsCreator = null;
    this.activeScreen = [];
    this.screensObjectsList = []
};
GUI.prototype = {
    preload: function() {
        this.screenGame = new ScreenGame;
        this.screensObjectsList.push(this.screenGame);
        this.screenMainMenu = new ScreenMainMenu;
        this.screensObjectsList.push(this.screenMainMenu);
        this.screenPause = new ScreenPause;
        this.screensObjectsList.push(this.screenPause);
        this.screenGameOver = new ScreenGameOver;
        this.screensObjectsList.push(this.screenGameOver);
        this.screenOverRevive = new ScreenOverRevive;
        this.screensObjectsList.push(this.screenOverRevive);
        this.screenShop = new ScreenShop;
        this.screensObjectsList.push(this.screenShop);
        this.screenTop = new ScreenTop;
        this.screensObjectsList.push(this.screenTop)
    },
    create: function() {
        this.buttonsCreator = new Buttons;
        this.buttonsCreator.create();
        for (var a in this.screensObjectsList) this.screensObjectsList.hasOwnProperty(a) && this.screensObjectsList[a].create();
        guiManager.resetScreenTexts();
        this.initParticles()
    },
    update: function() {
        for (var a in this.screensObjectsList) this.screensObjectsList.hasOwnProperty(a) && !0 === this.screensObjectsList[a].screenGroup.visible && this.screensObjectsList[a].update();
        this.updateScreenShake();
        this.updateParticles()
    },
    resetScreenTexts: function() {
        for (var a in this.screensObjectsList) this.screensObjectsList.hasOwnProperty(a) && this.screensObjectsList[a].resetScreenTexts()
    },
    screenSwitcher_openNewScreen: function(a) {
        for (; 0 < this.activeScreen.length;) {
            var b = this.activeScreen.pop();
            void 0 != b.grayOverlay && 0 < b.grayOverlay.alpha && b.grayOverlay.hideTW.start();
            b.hideScreen.call(b)
        }
        this.activeScreen.push(a);
        a.showScreen.call(a);
        null != a.grayOverlay && (a.grayOverlay.alpha = 0, a.grayOverlay.visible = !1)
    },
    screenSwitcher_openOverlayScreen: function(a) {
        var b = this.activeScreen[this.activeScreen.length - 1];
        this.setButtonsInput(b.screenGroup, !1);
        null == b.grayOverlay ? (b.grayOverlay = b.screenGroup.addChild(this.getGraySprite()), b.grayOverlay.showTW.start(), b.grayOverlay.anim = !1) : (b.grayOverlay.alpha = 0, b.grayOverlay.visible = !0, b.grayOverlay.showTW.start());
        this.activeScreen.push(a);
        a.showScreen.call(a)
    },
    screenSwitcher_switchOverlayScreen: function(a) {
        var b = this.activeScreen.pop();
        b.hideScreen.call(b, function() {
            this.closeOverlayScreenOver(b)
        });
        this.activeScreen.push(a);
        a.showScreen.call(a);
        b.upperScreenName = a.name
    },
    screenSwitcher_closeOverlayScreen: function() {
        var a = this.activeScreen.pop();
        a.hideScreen.call(a, function() {
            this.closeOverlayScreenOver(a)
        }.bind(this));
        var b = this.activeScreen[this.activeScreen.length - 1];
        b.grayOverlay.hideTW.start();
        a.upperScreenName = b.screenGroup.name
    },
    closeOverlayScreenOver: function(a) {
        this.activeScreen[this.activeScreen.length - 1].screenGroup.name == a.upperScreenName && this.setButtonsInput(this.activeScreen[this.activeScreen.length -
            1].screenGroup, !0)
    },
    screenSwitcher_refreshActiveScreenElements: function() {
        for (var a = 0; a < this.activeScreen.length; a++) this.activeScreen[a].refreshScrFunc.call(this)
    },
    getGraySprite: function() {
        if (0 == game.cache.checkBitmapDataKey("grayBGg")) {
            var a = game.add.bitmapData(floorNumber(game.width / 15), floorNumber(game.height / 15));
            a.fill(0, 0, 0, .65);
            game.cache.addBitmapData("grayBGg", a)
        }
        a = game.make.sprite(0, 0, game.cache.getBitmapData("grayBGg"));
        a.scale.x = 16;
        a.scale.y = 16;
        a.alpha = 0;
        a.showTW = game.add.tween(a).to({
                alpha: 1
            },
            150, Phaser.Easing.Linear.None, !1);
        a.hideTW = game.add.tween(a).to({
            alpha: 0
        }, 150, Phaser.Easing.Linear.None, !1);
        a.hideTW.onComplete.add(function(a) {
            a.showTW.isRunning || (a.visible = !1)
        }, this);
        a.isGraySprt = !0;
        return a
    },
    createBitmaps: function() {},
    create1x3WindowBitmap: function(a, b) {
        function c(a, b, c) {
            a = game.make.image(0, 0, "wind13", a);
            f.draw(a, b, c)
        }
        var d = Math.floor(a / 130),
            f = game.add.bitmapData(391, 130 * d);
        c(0, 0, 0);
        c(2, 0, 130 * (d - 1));
        for (var e = 1; e < d - 1; e++) c(1, 0, 130 * e);
        if (null != b) game.cache.addBitmapData(b, f);
        else return f
    },
    create3x3WindowBitmap: function(a, b, c, d) {
        function f(a, b, d) {
            var f = game.make.image(0, 0, "windowInside", a);
            f.tint = c;
            e.draw(f, b, d);
            a = game.make.image(0, 0, "windowBorder", a);
            e.draw(a, b, d)
        }
        a = Math.floor(a / 46);
        b = Math.floor(b / 46);
        var e = game.add.bitmapData(46 * a, 46 * b);
        f(0, 0, 0);
        f(2, 46 * (a - 1), 0);
        f(6, 0, 46 * (b - 1));
        f(8, 46 * (a - 1), 46 * (b - 1));
        for (var g = 1; g < a - 1; g++) {
            var k = game.make.image(0, 0, "windowInside", 1);
            k.tint = c;
            e.draw(k, 46 * g, 0);
            k = game.make.image(0, 0, "windowBorder", 1);
            e.draw(k, 46 * g, 0);
            var h = game.make.image(0, 0, "windowInside",
                7);
            h.tint = c;
            e.draw(h, 46 * g, 46 * (b - 1));
            h = game.make.image(0, 0, "windowBorder", 7);
            e.draw(h, 46 * g, 46 * (b - 1))
        }
        for (g = 1; g < b - 1; g++) k = game.make.image(0, 0, "windowInside", 3), k.tint = c, e.draw(k, 0, 46 * g), k = game.make.image(0, 0, "windowBorder", 3), e.draw(k, 0, 46 * g), h = game.make.image(0, 0, "windowInside", 5), h.tint = c, e.draw(h, 46 * (a - 1), 46 * g), h = game.make.image(0, 0, "windowBorder", 5), e.draw(h, 46 * (a - 1), 46 * g);
        for (g = 1; g < b - 1; g++)
            for (h = 1; h < a - 1; h++) k = game.make.image(0, 0, "windowInside", 4), k.tint = c, e.draw(k, 46 * h, 46 * g), k = game.make.image(0,
                0, "windowBorder", 4), e.draw(k, 46 * h, 46 * g);
        if (null != d) game.cache.addBitmapData(d, e);
        else return e
    },
    setButtonsInput: function(a, b) {
        var c = function(a) {
            for (var f = 0; f < a.children.length; f++)
                if (!0 !== a.getChildAt(f).dontChangeInput) {
                    var e = a.getChildAt(f);
                    e.inputEnabled = !1;
                    1 == e.isClickable && (e.inputEnabled = b, void 0 !== e.tint_empty && (e.tint = e.tint_empty));
                    0 < a.getChildAt(f).children.length && c(a.getChildAt(f))
                }
        };
        c(a);
        a.inputActive = b
    },
    showScreenFromRight: function(a, b, c, d, f) {
        null === c && (c = 300);
        null === d && (d = 150);
        null ===
            f && (f = Phaser.Easing.Linear.None);
        a.x = game.width;
        a.visible = !0;
        c = game.add.tween(a).to({
            x: 0
        }, c, f, !0, d);
        !0 === b && c.onComplete.add(function() {
            a.showScreenOver.call(this)
        }, this)
    },
    hideScreenToRight: function(a, b, c, d, f, e) {
        null === c && (c = 300);
        null === d && (d = 150);
        null === f && (f = Phaser.Easing.Linear.None);
        a.x = 0;
        a = game.add.tween(a).to({
            x: game.width
        }, c, f, !0, d);
        !0 === b && a.onComplete.add(function() {
            e.hideScreenOver.call(e);
            void 0 !== e.screenGroup.hideOverClbck && e.screenGroup.hideOverClbck.call(e)
        }, this)
    },
    showScreenFromLeft: function(a,
        b, c, d, f, e) {
        null === c && (c = 300);
        null === d && (d = 150);
        null === f && (f = Phaser.Easing.Linear.None);
        a.x = -game.width;
        a.visible = !0;
        a = game.add.tween(a).to({
            x: 0
        }, c, f, !0, d);
        !0 === b && a.onComplete.add(function() {
            e.showScreenOver.call(e)
        }, this)
    },
    hideScreenToLeft: function(a, b, c, d, f) {
        null === c && (c = 300);
        null === d && (d = 150);
        null === f && (f = Phaser.Easing.Linear.None);
        a.x = 0;
        c = game.add.tween(a).to({
            x: -game.width
        }, c, f, !0, d);
        !0 === b && c.onComplete.add(function() {
                a.hideScreenOver.call(this);
                void 0 !== a.hideOverClbck && a.hideOverClbck.call(this)
            },
            this)
    },
    showScreenFromBottom: function(a, b, c, d, f, e) {
        null === c && (c = 300);
        null === d && (d = 150);
        null === f && (f = Phaser.Easing.Linear.None);
        a.y = game.height;
        a.visible = !0;
        a = game.add.tween(a).to({
            y: 0
        }, c, f, !0, d);
        !0 === b && a.onComplete.add(function() {
            e.showScreenOver.call(e);
            void 0 !== e.screenGroup.hideOverClbck && e.screenGroup.hideOverClbck.call(e)
        }, this)
    },
    hideScreenToBottom: function(a, b, c, d, f, e) {
        null === c && (c = 300);
        null === d && (d = 150);
        null === f && (f = Phaser.Easing.Linear.None);
        a.y = 0;
        a = game.add.tween(a).to({
                y: game.height
            }, c,
            f, !0, d);
        !0 === b && a.onComplete.add(function() {
            e.hideScreenOver.call(e);
            void 0 !== e.screenGroup.hideOverClbck && e.screenGroup.hideOverClbck.call(e)
        }, this)
    },
    showScreenFromTop: function(a, b, c, d, f, e) {
        null === c && (c = 300);
        null === d && (d = 150);
        null === f && (f = Phaser.Easing.Linear.None);
        a.y = -game.height;
        a.visible = !0;
        a = game.add.tween(a).to({
            y: 0
        }, c, f, !0, d);
        !0 === b && a.onComplete.add(function() {
            e.showScreenOver.call(e)
        }, this)
    },
    hideScreenToTop: function(a, b, c, d, f, e) {
        null === c && (c = 300);
        null === d && (d = 150);
        null === f && (f = Phaser.Easing.Linear.None);
        a.y = 0;
        a = game.add.tween(a).to({
            y: -game.height
        }, c, f, !0, d);
        !0 === b && a.onComplete.add(function() {
            e.hideScreenOver.call(e);
            void 0 !== e.hideOverClbck && e.hideOverClbck.call(e)
        }, this);
        return a
    },
    showScreenAlpha: function(a, b, c, d) {
        c = c || 300;
        d = d || 150;
        a.alpha = 0;
        game.add.tween(a).to({
            alpha: 1
        }, c, Phaser.Easing.Linear.None, !0, d).onComplete.add(b, this)
    },
    hideScreenAlpha: function(a, b, c, d) {
        c = c || 300;
        d = d || 150;
        game.add.tween(a).to({
            alpha: 0
        }, c, Phaser.Easing.Linear.None, !0, d).onComplete.add(b, this)
    },
    showScreenCustomTweens: function(a) {
        a.visible = !0;
        for (var b = a.tweenCallbacksCount = 0; b < a.length; b++)
            if (1 == a.getChildAt(b).showTW instanceof Array)
                for (var c = 0; c < a.getChildAt(b).showTW.length; c++) 0 != a.getChildAt(b).anim && (a.getChildAt(b).showTW[c].start(), void 0 != a.getChildAt(b).useTweenToFinishiShow && !0 === a.getChildAt(b).useTweenToFinishiShow && a.tweenCallbacksCount++);
            else void 0 != a.getChildAt(b).showTW && 0 != a.getChildAt(b).anim && (a.getChildAt(b).showTW.start(), void 0 != a.getChildAt(b).useTweenToFinishiShow && !0 === a.getChildAt(b).useTweenToFinishiShow &&
                a.tweenCallbacksCount++)
    },
    hideScreenCustomTweens: function(a) {
        for (var b = a.tweenCallbacksCount = 0; b < a.length; b++)
            if (1 == a.getChildAt(b).hideTW instanceof Array)
                for (var c = 0; c < a.getChildAt(b).hideTW.length; c++) a.getChildAt(b).hideTW[c].start();
            else void 0 != a.getChildAt(b).hideTW && 0 != a.getChildAt(b).anim && (a.getChildAt(b).hideTW.start(), a.tweenCallbacksCount++)
    },
    addShowTween: function(a, b, c, d, f, e, g, k, h, l) {
        b = game.add.tween(b).to(c, d, f, !1, e);
        null != k && b.onComplete.addOnce(k, l);
        null != h && b.onComplete.add(h, l);
        void 0 == a.showTW && (a.showTW = []);
        a.useTweenToFinishiShow = g;
        a.showTW.push(b);
        return b
    },
    addHideTween: function(a, b, c, d, f, e, g, k, h) {
        a.hideTW = game.add.tween(b).to(c, d, f, !1, e);
        null != g && a.hideTW.onComplete.addOnce(g, h);
        null != k && a.hideTW.onComplete.add(k, h)
    },
    checkShowScreenOver: function(a, b) {
        a.tweenCallbacksCount--;
        0 > a.tweenCallbacksCount ? logToConsole("vela show tweenov:", a.name) : 0 == a.tweenCallbacksCount && (logToConsole("checkShowScreenOver:", a.name), b.showScreenOver.call(b))
    },
    checkHideScreenOver: function(a,
        b) {
        a.tweenCallbacksCount--;
        0 > a.tweenCallbacksCount ? logToConsole("vela hide tweenov:", a.name) : 0 == a.tweenCallbacksCount && (logToConsole("checkHideScreenOver:", a.name), b.hideScreenOver.call(b), void 0 != a.hideOverClbck && a.hideOverClbck.call(this))
    },
    shakeScene: function(a, b, c, d, f, e) {
        if (void 0 == a.isShaking || 0 == a.isShaking) {
            a.isShaking = !0;
            void 0 === b && (b = 3);
            void 0 === c && (c = 0);
            void 0 === d && (d = 50);
            void 0 === f && (f = null);
            void 0 === e && (e = null);
            game.tweens.removeFrom(a, !0);
            var g = game.add.tween(a.position);
            a.position.orgX =
                a.position.x;
            a.position.orgY = a.position.y;
            a.position.shakeAmount = b;
            g.to({
                x: a.position.x,
                y: a.position.y
            }, d, Phaser.Easing.Cubic.InOut, !0, c);
            g.onUpdateCallback(function(a, b, c) {
                a.target.x = a.target.orgX + getRandomInt(a.target.shakeAmount);
                a.target.y = a.target.orgY + getRandomInt(a.target.shakeAmount);
                null != this.callbackOnUpdate && this.callbackOnUpdate(b)
            }, {
                callbackOnUpdate: e
            });
            g.onComplete.add(function() {
                this.scene.position.x = this.scene.position.orgX;
                this.scene.position.y = this.scene.position.orgY;
                a.isShaking = !1;
                null != this.callbackOnComplete && this.callbackOnComplete()
            }, {
                scene: a,
                callbackOnComplete: f
            });
            return g
        }
    },
    screenShakeFire: function(a, b) {
        this._shakeWorldTime = a || 20;
        this._shakeWorldMax = b || 20;
        null == this._boundsCache && (this._boundsCache = Phaser.Utils.extend(!1, {}, game.world.bounds));
        game.world.setBounds(this._boundsCache.x - this._shakeWorldMax, this._boundsCache.y - this._shakeWorldMax, this._boundsCache.width + 2 * this._shakeWorldMax, this._boundsCache.height + 2 * this._shakeWorldMax)
    },
    updateScreenShake: function() {
        if (0 <
            this._shakeWorldTime) {
            var a = this._shakeWorldTime / this._shakeWorldMax * this._shakeWorldMax,
                b = game.rnd.integerInRange(-a, a),
                a = game.rnd.integerInRange(-a, a);
            game.camera.x = b;
            game.camera.y = a;
            this._shakeWorldTime--;
            0 >= this._shakeWorldTime && (game.world.setBounds(this._boundsCache.x, this._boundsCache.x, this._boundsCache.width, this._boundsCache.height), this._boundsCache = null)
        }
    },
    initParticles: function() {
        this.particlesGroup = game.add.group();
        this.fireParticle(-500, game.height, 30)
    },
    fireParticle: function(a, b, c,
        d) {
        void 0 == c && (c = 1);
        for (var f = 0; f < c; f++) {
            void 0 != d && getRandomValueFromList(d);
            if (30 < this.particlesGroup.countLiving()) break;
            var e = this.particlesGroup.getFirstDead();
            null == e && (e = this.particlesGroup.create(0, 0, "pk_menu1", "1px"), e.width = getRandomUIntInRange(6, 9), e.height = getRandomUIntInRange(6, 9), e.anchor.set(.5), game.physics.enable(e, Phaser.Physics.ARCADE));
            e.reset(a, b);
            e.lifespan = 1E3;
            e.allowGravity = !0;
            e.body.gravity.y = 2500 + Math.floor(200 * Math.random());
            var g = 5 * (Math.floor(3 * Math.random()) + 8);
            e.body.velocity.y = -g;
            e.body.velocity.x = Math.floor(400 * Math.random()) - 200;
            e.revive()
        }
    },
    updateParticles: function() {
        this.particlesGroup.forEachAlive(function(a) {
            a.angle += a.rotateStep;
            a.y - 30 > game.height && a.kill()
        }, this)
    },
    createBackground: function() {
        game.stage.backgroundColor = GAME_BG_COLOR;
        this.backgroundGroup = game.add.group();
        var a = game.add.sprite(0, 0, "gameBgImg");
        this.backgroundGroup.addChild(a);
        game.height > a.height && (a.height = game.height)
    }
};
var ScreenGame = function() {
    this.screenGroup = null;
    this.screenName = "ScreenGame"
};
ScreenGame.prototype = {
    create: function() {
        this.screenGroup = game.add.group();
        this.screenGroup.name = this.screenName;
        this.screenGroup.visible = !1;
        this.gameContentGroup = game.add.group();
        this.screenGroup.addChild(this.gameContentGroup);
        this.gameContentGroup.hiddenSetting = {
            alpha: 0
        };
        this.gameContentGroup.visibleSetting = {
            alpha: 1
        };
        guiManager.addHideTween(this.gameContentGroup, this.gameContentGroup, this.gameContentGroup.hiddenSetting, 300, Phaser.Easing.Linear.None, 0, null, function() {
            guiManager.checkHideScreenOver(this.screenGroup,
                this)
        }, this);
        this.coinParticleGroup = game.add.group();
        this.screenGroup.addChild(this.coinParticleGroup);
        this.gameScoreText = game.make.text(20, 30, "0", {
            font: "32px gameFont",
            fill: TEXT_YELLOW_COLOR,
            align: "center"
        });
        this.gameScoreText.align = "center";
        setObjectAnchor(this.gameScoreText, .5, .5);
        this.screenGroup.addChild(this.gameScoreText);
        this.gameScoreText.hiddenSetting = {
            y: -5
        };
        this.gameScoreText.visibleSetting = {
            y: btnDistanceFromCorner + 6
        };
        guiManager.addShowTween(this.gameScoreText, this.gameScoreText, this.gameScoreText.visibleSetting,
            300, Phaser.Easing.Quintic.Out, 0, !0, null,
            function() {
                guiManager.checkShowScreenOver(this.screenGroup, this)
            }, this);
        guiManager.addHideTween(this.gameScoreText, this.gameScoreText, this.gameScoreText.hiddenSetting, 300, Phaser.Easing.Linear.None, 0, null, function() {
            guiManager.checkHideScreenOver(this.screenGroup, this)
        }, this);
        this.stageText = game.make.text(game.width / 2, 60, "STAGE 1", {
            font: "32px gameFont",
            fill: TEXT_WHITE_COLOR,
            align: "center"
        });
        this.stageText.align = "center";
        setObjectAnchor(this.stageText, .5, .5);
        this.screenGroup.addChild(this.stageText);
        this.stageText.hiddenSetting = {
            y: -5
        };
        this.stageText.visibleSetting = {
            y: 80
        };
        this.stageText.visibleSetting_boss = {
            y: floorNumber(.35 * game.height)
        };
        guiManager.addShowTween(this.stageText, this.stageText, this.stageText.visibleSetting, 300, Phaser.Easing.Quintic.Out, 0, !0, null, function() {
            guiManager.checkShowScreenOver(this.screenGroup, this)
        }, this);
        guiManager.addHideTween(this.stageText, this.stageText, this.stageText.hiddenSetting, 300, Phaser.Easing.Linear.None, 0, null, function() {
            guiManager.checkHideScreenOver(this.screenGroup,
                this)
        }, this);
        this.levelTypeIndicator = game.make.group();
        this.screenGroup.addChild(this.levelTypeIndicator);
        this.levelTypeIndicator.hiddenSetting = {
            y: -90
        };
        this.levelTypeIndicator.visibleSetting = {
            y: 25
        };
        guiManager.addShowTween(this.levelTypeIndicator, this.levelTypeIndicator, this.levelTypeIndicator.visibleSetting, 300, Phaser.Easing.Quintic.Out, 0, !0, null, function() {
            guiManager.checkShowScreenOver(this.screenGroup, this)
        }, this);
        guiManager.addHideTween(this.levelTypeIndicator, this.levelTypeIndicator, this.levelTypeIndicator.hiddenSetting,
            300, Phaser.Easing.Linear.None, 0, null,
            function() {
                guiManager.checkHideScreenOver(this.screenGroup, this)
            }, this);
        for (var a = 0; 4 > a; a++) {
            var b = game.make.sprite(floorNumber(game.width / 2 - 44 + 22 * a), 9, "pk_game1", "game_icons_1");
            setObjectAnchor(b, .5, .5);
            this.levelTypeIndicator.addChild(b);
            b.activeFrameName = "game_icons_0";
            b.inactiveFrameName = "game_icons_1"
        }
        b = game.make.sprite(floorNumber(game.width / 2 - 44 + 22 * a), 9, "pk_game1", "game_icons_2");
        setObjectAnchor(b, .5, .5);
        this.levelTypeIndicator.addChild(b);
        b.activeFrameName =
            "game_icons_3";
        b.inactiveFrameName = "game_icons_2";
        this.swordGroup = game.make.group();
        this.swordGroup.x = 32;
        this.swordGroup.y = game.height - 55;
        this.swordGroup.icoOffset = 25;
        this.screenGroup.addChild(this.swordGroup);
        this.swordGroup.hiddenSetting = {
            alpha: 0
        };
        this.swordGroup.visibleSetting = {
            alpha: 1
        };
        guiManager.addShowTween(this.swordGroup, this.swordGroup, this.swordGroup.visibleSetting, 300, Phaser.Easing.Quintic.Out, 0, !0, null, function() {
            guiManager.checkShowScreenOver(this.screenGroup, this)
        }, this);
        guiManager.addHideTween(this.swordGroup,
            this.swordGroup, this.swordGroup.hiddenSetting, 300, Phaser.Easing.Linear.None, 0, null,
            function() {
                guiManager.checkHideScreenOver(this.screenGroup, this)
            }, this);
        this.bossFightIco = game.make.sprite(floorNumber(game.width / 2), floorNumber(.2 * game.height), "pk_game1", "");
        setObjectAnchor(this.bossFightIco, .5, .5);
        this.screenGroup.addChild(this.bossFightIco);
        this.bossDefeatText = game.make.text(game.width / 2, floorNumber(.25 * game.height), gameTexts.textFromID_toUpper(TEXT_BOSSDEFEATED), {
            font: "45px gameFont",
            fill: TEXT_WHITE_COLOR,
            align: "center"
        });
        setObjectAnchor(this.bossDefeatText, .5, .5);
        this.screenGroup.addChild(this.bossDefeatText);
        this.knifeUnlockedText = game.make.text(game.width / 2, floorNumber(.25 * game.height), gameTexts.textFromID_toUpper(TEXT_KNIFEUNLOCKED), {
            font: "40px gameFont",
            fill: TEXT_WHITE_COLOR,
            align: "center"
        });
        this.knifeUnlockedText.lineSpacing = -15;
        setObjectAnchor(this.knifeUnlockedText, .5, .5);
        this.screenGroup.addChild(this.knifeUnlockedText);
        a = game.make.group();
        this.shine1Img = game.make.sprite(0, 0, "pk_menu1", "shine2");
        setObjectAnchor(this.shine1Img, .5, .5);
        a.addChild(this.shine1Img);
        this.shine2Img = game.make.sprite(0, 0, "pk_menu1", "shine2");
        setObjectAnchor(this.shine2Img, .5, .5);
        a.addChild(this.shine2Img);
        this.shineGroup = a;
        this.screenGroup.addChild(a);
        this.unlockedKnifeImg = game.make.sprite(floorNumber(game.width / 2), floorNumber(.55 * game.height), "pk_game1", "");
        this.screenGroup.addChild(this.unlockedKnifeImg);
        this.shine1Img.x = this.shine2Img.x = this.unlockedKnifeImg.x;
        this.shine1Img.y = this.shine2Img.y = this.unlockedKnifeImg.y +
            game.cache.getFrameByName("pk_game1", "b1").height / 2
    },
    update: function() {
        0 < this.shineGroup.alpha && (this.shine1Img.angle += .1, this.shine2Img.angle -= .4)
    },
    pauseClicked: function() {
        musicPlayer.playSound("clck");
        this.pauseGame()
    },
    pauseGame: function() {
        appState === APP_STATES.GAME_RUNNING && (guiManager.screenSwitcher_openOverlayScreen(guiManager.screenPause), appState = APP_STATES.GAME_PAUSED)
    },
    updateStageText: function() {
        !1 === gamePlay.currentStageIsBossFight ? this.stageText.setText(gameTexts.textFromID(TEXT_STAGE) +
            " " + gamePlay.currentStage) : (this.stageText.setText(gameTexts.textFromID_toUpper(TEXT_BOSSFIGHT)), this.stageText.lineSpacing = -20);
        setObjectAnchor(this.stageText, .5, .5)
    },
    updateScoreText: function() {
        this.gameScoreText.setText(gamePlay.currentGameScore);
        setObjectAnchor(this.gameScoreText, .5, .5);
        this.gameScoreText.x = 30 + floorNumber(this.gameScoreText.width / 2)
    },
    resetKnivesGroup: function() {
        for (var a = 0; a < this.swordGroup.length; a++) this.swordGroup.getChildAt(a).alpha = 0
    },
    updateLeftKnivesCount: function() {
        for (var a =
                0; a < this.swordGroup.length; a++) this.swordGroup.getChildAt(a).nextAalpha = 0;
        for (var b = gamePlay.currentStageKnivesToThrowCount - gamePlay.currentStageKnivesSuccessful, a = 0; a < b; a++) {
            if (this.swordGroup.children.length < a + 1) {
                var c = game.make.sprite(0, -a * this.swordGroup.icoOffset, "pk_game1", "sword_game");
                setObjectAnchor(c, .5, .5);
                this.swordGroup.addChild(c);
                c.alpha = 0
            }
            this.swordGroup.getChildAt(a).nextAalpha = 1
        }
        for (a = 0; a < this.swordGroup.length; a++) 0 === this.swordGroup.getChildAt(a).nextAalpha && 1 === this.swordGroup.getChildAt(a).alpha &&
            game.add.tween(this.swordGroup.getChildAt(a)).to({
                alpha: 0
            }, 100, Phaser.Easing.Linear.None, !0, 0), 1 === this.swordGroup.getChildAt(a).nextAalpha && 0 === this.swordGroup.getChildAt(a).alpha && game.add.tween(this.swordGroup.getChildAt(a)).to({
                alpha: 1
            }, 100, Phaser.Easing.Linear.None, !0, 30 * a)
    },
    setLevelTypeIndicator: function() {
        for (var a = 0; 5 > a; a++) this.levelTypeIndicator.getChildAt(a).frameName = this.levelTypeIndicator.getChildAt(a).inactiveFrameName;
        a = gamePlay.currentStage % BOSS_FIGHT_LEVEL;
        0 === a ? a = 4 : --a;
        this.levelTypeIndicator.getChildAt(a).frameName =
            this.levelTypeIndicator.getChildAt(a).activeFrameName
    },
    setGameWheelScale: function(a, b, c) {
        if (!0 === b) {
            game.add.tween(gameElements.wheel.scale).to({
                x: a,
                y: a
            }, 150, Phaser.Easing.Back.Out, !0);
            game.add.tween(gameElements.wheelShadow.scale).to({
                x: a,
                y: a
            }, 150, Phaser.Easing.Back.Out, !0);
            0 === a ? game.add.tween(this.stageText).to({
                alpha: 0
            }, 100, Phaser.Easing.Linear.None, !0, 0) : game.add.tween(this.stageText).to({
                alpha: 1
            }, 100, Phaser.Easing.Linear.None, !0, 0);
            for (b = 0; b < gameElements.wheelPinsGroup.length; b++) game.add.tween(gameElements.wheelPinsGroup.getChildAt(b).scale).to({
                x: a,
                y: a
            }, 150, Phaser.Easing.Back.Out, !0);
            for (b = 0; b < gameElements.coinsGroup.length; b++) game.add.tween(gameElements.coinsGroup.getChildAt(b).scale).to({
                x: a,
                y: a
            }, 150, Phaser.Easing.Back.Out, !0);
            void 0 !== c && game.time.events.add(200, c)
        } else {
            gameElements.wheel.scale.set(a);
            gameElements.wheelShadow.scale.set(a);
            this.stageText.alpha = 0 === a ? 0 : 1;
            for (b = 0; b < gameElements.wheelPinsGroup.length; b++) gameElements.wheelPinsGroup.getChildAt(b).scale.set(a);
            for (b = 0; b < gameElements.coinsGroup.length; b++) gameElements.coinsGroup.getChildAt(b).scale.set(a);
            void 0 !== c && c.call()
        }
    },
    fireCoinParticle: function(a, b) {
        var c = this.coinParticleGroup.getFirstDead();
        null === c && (c = this.coinParticleGroup.create(a, b, "pk_menu1", "apple_game_1"), setObjectAnchor(c, .5, .5));
        c.reset(a, b);
        removeObjectTweens(c);
        game.add.tween(c.scale).to({
            x: [1.5, .5],
            y: [1.5, .5]
        }, 300, Phaser.Easing.Linear.None, !0).onComplete.addOnce(function() {
            game.add.tween(c).to({
                    x: [.1 * -game.width, .3 * game.width, guiManager.screenTop.coinImg.x],
                    y: [.5 * game.height, .05 * game.height, guiManager.screenTop.coinImg.y]
                },
                450, Phaser.Easing.Linear.None, !0, 0, 0).interpolation(function(a, b) {
                return Phaser.Math.bezierInterpolation(a, b)
            }).onComplete.addOnce(function() {
                c.kill();
                gamePlay.incCollectedCoins()
            }, this)
        }, this)
    },
    showScreen: function() {
        for (var a = 0; a < this.screenGroup.children.length; a++) {
            var b = this.screenGroup.getChildAt(a),
                c;
            for (c in b.hiddenSetting) b[c] = b.hiddenSetting[c]
        }
        this.gameContentGroup.alpha = 1;
        this.updateScoreText();
        guiManager.setButtonsInput(this.screenGroup, !1);
        guiManager.showScreenCustomTweens(this.screenGroup);
        this.resetScreenContent()
    },
    resetScreenContent: function() {
        this.updateStageText();
        this.updateLeftKnivesCount();
        this.setLevelTypeIndicator();
        this.setGameWheelScale(0, !1);
        gameElements.wheel.alpha = 1;
        gameElements.wheelShadow.alpha = gameElements.wheelShadow.defaultAlpha;
        this.bossFightIco.alpha = 0;
        this.bossDefeatText.alpha = 0;
        this.knifeUnlockedText.alpha = 0;
        this.unlockedKnifeImg.alpha = 0;
        if (!1 === gamePlay.currentStageIsBossFight) this.stageText.y = this.stageText.visibleSetting.y, this.setGameWheelScale(1, !0, function() {
            gamePlay.gameReadyToStart = !0
        });
        else {
            this.stageText.y = this.stageText.visibleSetting_boss.y;
            this.stageText.scale.set(0);
            this.stageText.alpha = 0;
            this.stageText.scale.set(1.8);
            game.add.tween(this.stageText.scale).to({
                x: 1,
                y: 1
            }, 220, Phaser.Easing.Quintic.Out, !0, 1200);
            var a = game.add.tween(this.stageText).to({
                y: this.stageText.visibleSetting.y
            }, 220, Phaser.Easing.Sinusoidal.Out, !0, 1200);
            this.stageText.scale.set(5);
            game.add.tween(this.stageText.scale).to({
                x: 2,
                y: 2
            }, 200, Phaser.Easing.Back.In, !0, 0);
            game.add.tween(this.stageText).to({
                    alpha: 1
                },
                150, Phaser.Easing.Linear.None, !0, 50);
            this.bossFightIco.frameName = "boss_icon_0";
            this.bossFightIco.y = floorNumber(.2 * game.height);
            this.bossFightIco.alpha = 1;
            game.add.tween(this.bossFightIco).to({
                alpha: 0
            }, floorNumber(330), Phaser.Easing.Linear.None, !0, 1150);
            this.bossFightIco.scale.set(2.5);
            game.add.tween(this.bossFightIco.scale).to({
                x: 1,
                y: 1
            }, 150, Phaser.Easing.Back.In, !0, 400);
            this.bossFightIco.alpha = 0;
            game.add.tween(this.bossFightIco).to({
                alpha: 1
            }, 200, Phaser.Easing.Linear.None, !0, 450);
            a.onComplete.addOnce(function() {
                this.setGameWheelScale(1, !0, function() {
                    gamePlay.gameReadyToStart = !0
                })
            }, this)
        }
        this.shineGroup.alpha = 0
    },
    bossDefeatedAnim: function() {
        var a = 200;
        this.bossFightIco.frameName = "boss_icon_1";
        this.bossFightIco.y = floorNumber(.2 * game.height);
        this.bossFightIco.scale.set(2.5);
        game.add.tween(this.bossFightIco.scale).to({
            x: 1,
            y: 1
        }, 150, Phaser.Easing.Back.In, !0, a);
        this.bossFightIco.alpha = 0;
        game.add.tween(this.bossFightIco).to({
            alpha: 1
        }, 200, Phaser.Easing.Linear.None, !0, a + 50);
        a += 200;
        this.bossDefeatText.y = floorNumber(.33 * game.height);
        this.bossDefeatText.scale.set(2.5);
        game.add.tween(this.bossDefeatText.scale).to({
            x: 1,
            y: 1
        }, 150, Phaser.Easing.Back.In, !0, a);
        this.bossDefeatText.alpha = 0;
        game.add.tween(this.bossDefeatText).to({
            alpha: 1
        }, 200, Phaser.Easing.Linear.None, !0, a + 50);
        gamePlay.bossKnifeUnlocked && (a = a + 400 + 200, this.knifeUnlockedText.y = floorNumber(.45 * game.height), this.knifeUnlockedText.scale.set(2.5), game.add.tween(this.knifeUnlockedText.scale).to({
                x: 1,
                y: 1
            }, 150, Phaser.Easing.Back.In, !0, a).onStart.addOnce(function() {
                musicPlayer.playSound("sndKnifeWin")
            }, this), this.knifeUnlockedText.alpha =
            0, game.add.tween(this.knifeUnlockedText).to({
                alpha: 1
            }, 200, Phaser.Easing.Linear.None, !0, a + 50), a += 200, this.unlockedKnifeImg.frameName = KNIVES_LIST[gamePlay.currentStageKnifeID].img, setObjectAnchor(this.unlockedKnifeImg, .5, 0), this.unlockedKnifeImg.scale.set(2.5), game.add.tween(this.unlockedKnifeImg.scale).to({
                x: 1.3,
                y: 1.3
            }, 150, Phaser.Easing.Back.In, !0, a), this.unlockedKnifeImg.alpha = 0, game.add.tween(this.unlockedKnifeImg).to({
                alpha: 1
            }, 200, Phaser.Easing.Linear.None, !0, a + 50), this.shineGroup.alpha = 0, game.add.tween(this.shineGroup).to({
                    alpha: 1
                },
                200, Phaser.Easing.Linear.None, !0, a + 50));
        a += 750;
        this.bossFightIco.alpha = 1;
        game.add.tween(this.bossFightIco).to({
            alpha: 0
        }, 200, Phaser.Easing.Linear.None, !0, a);
        this.bossFightIco.alpha = 0;
        a += 100;
        this.bossDefeatText.alpha = 1;
        game.add.tween(this.bossDefeatText).to({
            alpha: 0
        }, 200, Phaser.Easing.Linear.None, !0, a);
        this.bossDefeatText.alpha = 0;
        gamePlay.bossKnifeUnlocked && (a += 100, this.knifeUnlockedText.alpha = 1, game.add.tween(this.knifeUnlockedText).to({
                alpha: 0
            }, 200, Phaser.Easing.Linear.None, !0, a), this.knifeUnlockedText.alpha =
            0, a += 100, this.unlockedKnifeImg.alpha = 1, game.add.tween(this.unlockedKnifeImg).to({
                alpha: 0
            }, 200, Phaser.Easing.Linear.None, !0, a), this.unlockedKnifeImg.alpha = 0, this.shineGroup.alpha = 1, game.add.tween(this.shineGroup).to({
                alpha: 0
            }, 200, Phaser.Easing.Linear.None, !0, a), this.shineGroup.alpha = 0);
        return a += 300
    },
    showScreenOver: function() {
        guiManager.setButtonsInput(this.screenGroup, !0)
    },
    hideScreen: function(a) {
        guiManager.hideScreenCustomTweens(this.screenGroup);
        guiManager.setButtonsInput(this.screenGroup, !1);
        this.screenGroup.hideOverClbck =
            a
    },
    hideScreenOver: function() {
        this.screenGroup.visible = !1
    },
    resetScreenTexts: function() {}
};
var ScreenMainMenu = function() {
    this.screenGroup = null;
    this.screenName = "ScreenMainMenu";
    this.maxFontSize = 38
};
ScreenMainMenu.prototype = {
    create: function() {
		gradle.event('main_menu');
        this.screenGroup = game.add.group();
        this.screenGroup.name = this.screenName;
        this.screenGroup.visible = !1;
        
		/*var abg = game.make.group();
		var bg = game.make.sprite(0, 0, "bg");
		bg.anchor.set(0, 0);
		bg.width  = game.width;
		bg.height = game.height;
        abg.addChild(bg);
		this.screenGroup.addChild(abg);*/
		
		var a = game.make.group();
        a.x = floorNumber(.5 * game.width);
        a.y = floorNumber(.22 * game.height);
        this.screenGroup.gmLogo = this.screenGroup.addChild(a);
				
        var b = game.make.sprite(0, -3, "pk_menu1", "logo1");
        b.anchor.set(.5, 1);
        a.addChild(b);
        var c = game.make.sprite(0, 8, "pk_menu1", "logo2");
        c.anchor.set(.5, 0);
        a.addChild(c);
        var d = game.make.sprite(0, 0, "pk_menu1", "logo3");
        d.anchor.set(.5, .5);
        a.addChild(d);
        d = game.make.sprite(107, 0, "pk_menu1", "logo4");
        d.anchor.set(.5, .5);
        a.addChild(d);
        a = game.make.group();
        this.shineGrp = d.addChild(a);
        game.add.bitmapData(2, 2).fill(250, 205, 250);
        a.min_x = -5;
        a.max_x = 60;
        a.min_y = -2;
        a.max_y = 10;
        this.timeTillNextShine = 0;
        b = game.add.tween(b).to({
            y: [-10, -3]
        }, 1500, Phaser.Easing.Linear.None);
        c = game.add.tween(c).to({
            y: [16, 8]
        }, 1500, Phaser.Easing.Linear.None);
        d = game.add.tween(d.scale).to({
            x: [1.05, 1],
            y: [1.05, 1]
        }, 1500, Phaser.Easing.Linear.None);
        this.screenGroup.gmLogo.twnss = [b, c, d];
        this.screenGroup.gmLogo.anim = !1;
        c = game.make.group();
        this.screenGroup.addChild(c);
        this.maxStageText = game.make.text(game.width / 2, floorNumber(.4 * game.height), "STAGE 25", {
            font: "25px gameFont",
            fill: TEXT_WHITE_COLOR,
            align: "center"
        });
        this.maxStageText.align = "center";
        setObjectAnchor(this.maxStageText, .5, .5);
        c.addChild(this.maxStageText);
        this.maxScoreText = game.make.text(game.width / 2, floorNumber(.44 * game.height), "SCORE 120", {
            font: "25px gameFont",
            fill: TEXT_WHITE_COLOR,
            align: "center"
        });
        this.maxScoreText.align =
            "center";
        setObjectAnchor(this.maxScoreText, .5, .5);
        c.addChild(this.maxScoreText);
        this.selectedKnifeImg = game.make.sprite(game.width / 2, .6 * game.height, "pk_game1", KNIVES_LIST[0].img);
        setObjectAnchor(this.selectedKnifeImg, .5, .5);
        this.selectedKnifeImg.scale.set(1.3);
        this.screenGroup.addChild(this.selectedKnifeImg);
        this.playBtn = guiManager.buttonsCreator.createOneImgButtonWithText(game.width / 2, floorNumber(.78 * game.height), "pk_menu1", "play", gameTexts.textFromID_toUpper(TEXT_PLAY), TEXT_PLAY, TEXT_WHITE_COLOR,
            this.mainMenuPlayButtonClicked, this);
        this.playBtn.txtt.fontSize = 35;
        this.screenGroup.addChild(this.playBtn);
        this.playBtn.scaleTwn = game.add.tween(this.playBtn.scale).to({
            x: [1.05, .95, 1.05, 1.02, 1],
            y: [.97, 1.03, .97, .98, 1]
        }, 1E3, Phaser.Easing.Linear.None, !1);
        this.knifeSelBtn = guiManager.buttonsCreator.createTwoImgButton(game.width / 2, floorNumber(.92 * game.height), "pk_menu1", "bt_sword", "pk_menu1", "sword_icon", this.knifeSelBtnClicked, this);
        this.screenGroup.addChild(this.knifeSelBtn);
        for (c = 0; c < this.screenGroup.length; c++) guiManager.addShowTween(this.screenGroup.getChildAt(c),
            this.screenGroup.getChildAt(c), {
                alpha: 1
            }, 300, Phaser.Easing.Linear.None, 75 * c, !0, null,
            function() {
                guiManager.checkShowScreenOver(this.screenGroup, this)
            }, this), guiManager.addHideTween(this.screenGroup.getChildAt(c), this.screenGroup.getChildAt(c), {
            alpha: 0
        }, 300, Phaser.Easing.Linear.None, 0, null, function() {
            guiManager.checkHideScreenOver(this.screenGroup, this)
        }, this)
    },
    update: function() {
        this.knifeShine()
    },
    knifeShine: function() {
        if (0 > this.timeTillNextShine) {
            this.timeTillNextShine = .5;
            var a = this.shineGrp.getFirstDead();
            null === a && (a = this.shineGrp.create(0, 0, "pk_menu1", "particles"), setObjectAnchor(a, .5, .5));
            a.reset(getRandomUIntInRange(this.shineGrp.min_x, this.shineGrp.max_x), getRandomUIntInRange(this.shineGrp.min_y, this.shineGrp.max_y));
            a.scale.set(0);
            removeObjectTweens(a);
            var b = getRandomUIntInRange(8, 12) / 10,
                b = game.add.tween(a.scale).to({
                    x: [b, 0],
                    y: [b, 0]
                }, 1E3, Phaser.Easing.Linear.None, !0);
            b.prnt = a;
            b.onComplete.addOnce(function(a, b) {
                b.prnt.kill()
            })
        }
        this.shineGrp.forEachAlive(function(a) {
            a.angle += 1
        }, this);
        this.timeTillNextShine -=
            game.time.physicsElapsed
    },
    mainMenuPlayButtonClicked: function() {
		gradle.event('button_play');
        musicPlayer.playSound("clck");
        gamePlay.prepareNewGame();
        guiManager.screenSwitcher_openNewScreen(guiManager.screenGame)
    },
    knifeSelBtnClicked: function() {
        musicPlayer.playSound("clck");
        guiManager.screenSwitcher_openNewScreen(guiManager.screenShop)
    },
    levelBtnClicked: function() {
        musicPlayer.playSound("clck");
        guiManager.screenSwitcher_openNewScreen(guiManager.screenLevelSelection);
        guiManager.screenLogo.hideScreen()
    },
    infoBtnClicked: function() {
        musicPlayer.playSound("clck");
        guiManager.screenLogo.setLogoPosition(ScreenLogo.positionY_about);
        guiManager.screenSwitcher_openNewScreen(guiManager.screenAbout)
    },
    optionsClicked: function() {
        musicPlayer.playSound("clck");
        guiManager.screenSwitcher_openNewScreen(guiManager.screenOptions)
    },
    exitGameClicked: function() {
        musicPlayer.playSound("clck");
        guiManager.screenSwitcher_openOverlayScreen(guiManager.screenQuitGame)
    },
    showScreen: function() {
        guiManager.setButtonsInput(this.screenGroup, !1);
        for (var a = 0; a < this.screenGroup.children.length; a++) this.screenGroup.getChildAt(a).alpha =
            0;
        this.selectedKnifeImg.frameName = KNIVES_LIST[gamePlay.selectedKnifeID].img;
        !1 === this.screenGroup.gmLogo.anim && (this.screenGroup.gmLogo.alpha = 1, this.screenGroup.gmLogo.anim = !0);
        this.maxStageText.setText(gameTexts.textFromID(TEXT_STAGE) + " " + gamePlay.highestStageAchieved);
        setObjectAnchor(this.maxStageText, .5, .5);
        this.maxScoreText.setText(gameTexts.textFromID(TEXT_SCORE) + " " + gamePlay.highestScoreAchieved);
        setObjectAnchor(this.maxScoreText, .5, .5);
        guiManager.showScreenCustomTweens(this.screenGroup);
        this.screenGroup.gmLogo.getChildAt(0).y = -3;
        this.screenGroup.gmLogo.getChildAt(1).y = 8;
        this.screenGroup.gmLogo.getChildAt(3).scale.set(1);
        for (a = 0; a < this.screenGroup.gmLogo.twnss.length; a++) this.screenGroup.gmLogo.twnss[a].start(), this.screenGroup.gmLogo.twnss[a].repeat(-1, 0)
    },
    showScreenOver: function() {
        guiManager.setButtonsInput(this.screenGroup, !0);
        this.playBtn.scaleTwn.start();
        this.playBtn.scaleTwn.repeat(-1, 1E3)
    },
    hideScreen: function(a) {
        guiManager.hideScreenCustomTweens(this.screenGroup);
        guiManager.setButtonsInput(this.screenGroup, !1);
        this.screenGroup.hideOverClbck =
            a
    },
    hideScreenOver: function() {
        this.screenGroup.visible = !1;
        this.playBtn.scaleTwn.stop();
        this.playBtn.scaleTwn.pendingDelete = !1;
        for (var a = 0; a < this.screenGroup.gmLogo.twnss.length; a++) this.screenGroup.gmLogo.twnss[a].stop(), this.screenGroup.gmLogo.twnss[a].pendingDelete = !1
    },
    resetScreenTexts: function() {}
};
var ScreenOverRevive = function() {
    this.screenGroup = null;
    this.screenName = "screenOverRevive"
};
ScreenOverRevive.prototype = {
    create: function() {
		gradle.event('game_revive');
        this.screenGroup = game.add.group();
        this.screenGroup.name = this.screenName;
        this.screenGroup.visible = !1;
        this.scoreNumberText = game.make.text(game.width / 2, .11 * game.height, "1234", {
            font: "50px gameFont",
            fill: TEXT_WHITE_COLOR,
            align: "center"
        });
        this.scoreNumberText.align = "center";
        setObjectAnchor(this.scoreNumberText, .5, .5);
        this.screenGroup.addChild(this.scoreNumberText);
        this.scoreNumberText.hiddenSetting = {
            x: 0,
            y: 0
        };
        this.scoreNumberText.visibleSetting = {
            x: 1,
            y: 1
        };
        guiManager.addShowTween(this.scoreNumberText,
            this.scoreNumberText.scale, this.scoreNumberText.visibleSetting, 300, Phaser.Easing.Back.Out, 0, !0, null,
            function() {
                guiManager.checkShowScreenOver(this.screenGroup, this)
            }, this);
        guiManager.addHideTween(this.scoreNumberText, this.scoreNumberText.scale, this.scoreNumberText.hiddenSetting, 300, Phaser.Easing.Linear.None, 0, null, function() {
            guiManager.checkHideScreenOver(this.screenGroup, this)
        }, this);
        this.continueText = game.make.text(game.width / 2, .18 * game.height, gameTexts.textFromID(TEXT_CONTINUE_Q), {
            font: "45px gameFont",
            fill: TEXT_YELLOW_COLOR,
            align: "center"
        });
        this.continueText.align = "center";
        setObjectAnchor(this.continueText, .5, .5);
        this.screenGroup.addChild(this.continueText);
        this.continueText.hiddenSetting = {
            x: 0,
            y: 0
        };
        this.continueText.visibleSetting = {
            x: 1,
            y: 1
        };
        guiManager.addShowTween(this.continueText, this.continueText.scale, this.continueText.visibleSetting, 300, Phaser.Easing.Back.Out, 150, !0, null, function() {
            guiManager.checkShowScreenOver(this.screenGroup, this)
        }, this);
        guiManager.addHideTween(this.continueText, this.continueText.scale,
            this.continueText.hiddenSetting, 300, Phaser.Easing.Linear.None, 0, null,
            function() {
                guiManager.checkHideScreenOver(this.screenGroup, this)
            }, this);
        this.timerCountDownGroup = game.make.group();
        this.timerCountDownGroup.x = game.width / 2;
        this.timerCountDownGroup.y = gameElements.rotationCenter.y;
        this.screenGroup.addChild(this.timerCountDownGroup);
        this.timerCountDownGroup.hiddenSetting = {
            x: 0,
            y: 0
        };
        this.timerCountDownGroup.visibleSetting = {
            x: 1,
            y: 1
        };
        this.shine1Img = game.make.sprite(0, 0, "pk_menu1", "shine2");
        setObjectAnchor(this.shine1Img,
            .5, .5);
        this.timerCountDownGroup.addChild(this.shine1Img);
        this.shine2Img = game.make.sprite(0, 0, "pk_menu1", "shine2");
        setObjectAnchor(this.shine2Img, .5, .5);
        this.timerCountDownGroup.addChild(this.shine2Img);
        this.timeCircle = [];
        var a = this.timeCirclePartCreate(90);
        this.timeCircle.push(this.timerCountDownGroup.addChild(a));
        a = this.timeCirclePartCreate(180);
        this.timeCircle.push(this.timerCountDownGroup.addChild(a));
        a = this.timeCirclePartCreate(270);
        this.timeCircle.push(this.timerCountDownGroup.addChild(a));
        a =
            this.timeCirclePartCreate(0);
        this.timeCircle.push(this.timerCountDownGroup.addChild(a));
        this.rotatingSwordImg = game.make.sprite(0, 0, "pk_game1", KNIVES_LIST[0].img);
        setObjectAnchor(this.rotatingSwordImg, .5, .5);
        this.timerCountDownGroup.addChild(this.rotatingSwordImg);
        guiManager.addShowTween(this.timerCountDownGroup, this.timerCountDownGroup.scale, this.timerCountDownGroup.visibleSetting, 300, Phaser.Easing.Back.Out, 300, !0, null, function() {
            guiManager.checkShowScreenOver(this.screenGroup, this)
        }, this);
        guiManager.addHideTween(this.timerCountDownGroup,
            this.timerCountDownGroup.scale, this.timerCountDownGroup.hiddenSetting, 300, Phaser.Easing.Linear.None, 0, null,
            function() {
                guiManager.checkHideScreenOver(this.screenGroup, this)
            }, this);
        this.continBtn = guiManager.buttonsCreator.createOneImgButton(game.width / 2, .72 * game.height, "pk_menu1", "bt_gb", this.continueClicked, this);
        this.continBtn.hiddenSetting = {
            x: 0,
            y: 0
        };
        this.continBtn.visibleSetting = {
            x: 1,
            y: 1
        };
        this.screenGroup.addChild(this.continBtn);
        this.contBtnContText = game.make.text(-floorNumber(this.continBtn.width /
            6), 1, gameTexts.textFromID(TEXT_CONTINUE), {
            font: "35px gameFont",
            fill: TEXT_WHITE_COLOR,
            align: "center"
        });
        this.contBtnContText.align = "center";
        setObjectAnchor(this.contBtnContText, .5, .5);
        this.continBtn.addChild(this.contBtnContText);
        a = game.make.sprite(floorNumber(.31 * this.continBtn.width), -5, "pk_menu1", "apple");
        a.align = "center";
        setObjectAnchor(a, 0, .5);
        this.continBtn.addChild(a);
        this.contBtnCoinsText = game.make.text(floorNumber(.27 * this.continBtn.width), 2, REVIVE_PRICE, {
            font: "25px gameFont",
            fill: TEXT_WHITE_COLOR,
            align: "center"
        });
        this.contBtnCoinsText.align = "center";
        setObjectAnchor(this.contBtnCoinsText, .5, .5);
        this.continBtn.addChild(this.contBtnCoinsText);
        guiManager.addShowTween(this.continBtn, this.continBtn.scale, this.continBtn.visibleSetting, 300, Phaser.Easing.Back.Out, 450, !0, null, function() {
            guiManager.checkShowScreenOver(this.screenGroup, this)
        }, this);
        guiManager.addHideTween(this.continBtn, this.continBtn.scale, this.continBtn.hiddenSetting, 300, Phaser.Easing.Linear.None, 0, null, function() {
            guiManager.checkHideScreenOver(this.screenGroup,
                this)
        }, this);
        this.quitBtn = guiManager.buttonsCreator.createOneImgButtonWithText();
        this.screenGroup.addChild(this.quitBtn);
        this.quitBtn.hiddenSetting = {
            x: 0,
            y: 0
        };
        this.quitBtn.visibleSetting = {
            x: 1,
            y: 1
        };
        guiManager.addShowTween(this.quitBtn, this.quitBtn.scale, this.quitBtn.visibleSetting, 300, Phaser.Easing.Back.Out, 600, !0, null, function() {
            guiManager.checkShowScreenOver(this.screenGroup,
                this)
        }, this);
        guiManager.addHideTween(this.quitBtn, this.quitBtn.scale, this.quitBtn.hiddenSetting, 300, Phaser.Easing.Linear.None, 0, null, function() {
            guiManager.checkHideScreenOver(this.screenGroup, this)
        }, this)
    },
    timeCirclePartCreate: function(a) {
        var b = game.add.sprite(0, 0, "pk_menu1", "time");
        b.anchor.set(1);
        b.angle = a;
        a = game.add.graphics(0, 0);
        a.beginFill(16777215, .5);
        a.drawRect(-b.width, -b.height, b.width, b.height);
        b.maskChild = b.addChild(a);
        b.mask = a;
        return b
    },
    timeCircleCountDownStart: function(a) {
        a = floorNumber(a /
            4);
        for (var b = 0; 4 > b; b++) game.add.tween(this.timeCircle[b].maskChild).to({
            angle: 90
        }, a, Phaser.Easing.Linear.None, !0, b * a);
        musicPlayer.playSound("sndTimer")
    },
    timeCircleReset: function() {
        for (var a = 0; 4 > a; a++) this.timeCircle[a].maskChild.angle = 0, removeObjectTweens(this.timeCircle[a].maskChild)
    },
    update: function() {
        this.shine1Img.angle += .1;
        this.shine2Img.angle -= .4
    },
    continueClicked: function() {
        musicPlayer.playSound("clck");
        musicPlayer.stopSound("sndTimer");
        gamePlay.stageContinue();
        guiManager.screenTop.hideSoundButton()
    },
    quitClicked: function() {
        musicPlayer.playSound("clck");
        musicPlayer.stopSound("sndTimer");
        gamePlay.GameOver()
    },
    showScreen: function() {

        guiManager.setButtonsInput(this.screenGroup, !1);
        this.scoreNumberText.scale.set(this.scoreNumberText.hiddenSetting.x, this.scoreNumberText.hiddenSetting.y);
        this.continueText.scale.set(this.continueText.hiddenSetting.x, this.continueText.hiddenSetting.y);
        this.timerCountDownGroup.scale.set(this.timerCountDownGroup.hiddenSetting.x, this.timerCountDownGroup.hiddenSetting.y);
        this.continBtn.scale.set(this.continBtn.hiddenSetting.x,
            this.continBtn.hiddenSetting.y);
        this.quitBtn.scale.set(this.quitBtn.hiddenSetting.x, this.quitBtn.hiddenSetting.y);
        gameTexts.updateTextToWidth(this.contBtnContText, 35, .66 * game.cache.getFrameByName("pk_menu1", "bt_gb").width * .9);
        gameTexts.updateTextToWidth(this.quitBtn.txtt, 25, .9 * game.cache.getFrameByName("pk_menu1", "bt_long").width);
        this.rotatingSwordImg.angle = 0;
        this.rotatingSwordImg.frameName = KNIVES_LIST[gamePlay.selectedKnifeID].img;
        removeObjectTweens(this.rotatingSwordImg);
        this.scoreNumberText.setText(gamePlay.currentGameScore);
        this.timeCircleReset();
        this.contBtnCoinsText.setText(REVIVE_PRICE);
        setObjectAnchor(this.contBtnCoinsText, .5, .5);
        guiManager.showScreenCustomTweens(this.screenGroup)
    },
    showScreenOver: function() {
        guiManager.setButtonsInput(this.screenGroup, !0);
        game.add.tween(this.rotatingSwordImg).to({
            angle: 360
        }, REVIVE_DURATION, Phaser.Easing.Linear.None, !0).onComplete.add(gamePlay.GameOver, gamePlay);
        this.timeCircleCountDownStart(REVIVE_DURATION)
    },
    hideScreen: function(a) {
        guiManager.hideScreenCustomTweens(this.screenGroup);
        guiManager.setButtonsInput(this.screenGroup, !1);
        this.screenGroup.hideOverClbck = a;
        removeObjectTweens(this.rotatingSwordImg);
        musicPlayer.stopSound("sndTimer")
    },
    hideScreenOver: function() {
        this.screenGroup.visible = !1
    },
    resetScreenTexts: function() {}
};
var ScreenGameOver = function() {
    this.screenGroup = null;
    this.screenName = "ScreenGameOver"
};
ScreenGameOver.prototype = {


    create: function() {
        this.screenGroup = game.add.group();
        this.screenGroup.name = this.screenName;
        this.screenGroup.visible = !1;
        this.goWind = game.add.sprite(0, 0, "pk_menu1", "result_bg");
        setObjectAnchor(this.goWind, .5, 0);
        this.screenGroup.addChild(this.goWind);
        this.goWind.x = game.width / 2;
        this.goWind.y = floorNumber(.4 * (game.height - this.goWind.height));
        var a = game.make.text(0, floorNumber(.13 * this.goWind.height), gameTexts.textFromID(TEXT_SCORE), {
            font: "25px gameFont",
            fill: TEXT_YELLOW_COLOR
        });
        setObjectAnchor(a, .5, .5);
        this.goWind.addChild(a);
        this.scoreNumberText = game.make.text(0, floorNumber(.3 * this.goWind.height), 0, {
            font: "56px gameFont",
            fill: TEXT_WHITE_COLOR
        });
        setObjectAnchor(this.scoreNumberText, .5, .5);
        this.goWind.addChild(this.scoreNumberText);
        this.breakLine = game.add.sprite(0, floorNumber(.46 * this.goWind.height), "pk_menu1", "breaker");
        setObjectAnchor(this.breakLine, .5, 0);
        this.goWind.addChild(this.breakLine);
        a = game.make.text(0, floorNumber(.58 * this.goWind.height), gameTexts.textFromID(TEXT_REWARD), {
            font: "25px gameFont",
            fill: TEXT_YELLOW_COLOR
        });
        setObjectAnchor(a, .5, .5);
        this.goWind.addChild(a);
        this.rewardNumberText = game.make.text(-5, floorNumber(.76 * this.goWind.height), 0, {
            font: "50px gameFont",
            fill: TEXT_WHITE_COLOR
        });
        setObjectAnchor(this.rewardNumberText, 1, .5);
        this.goWind.addChild(this.rewardNumberText);
        this.coinImg = game.make.sprite(5, -7, "pk_menu1", "apple_game_1");
        setObjectAnchor(this.coinImg, 0, .5);
        this.rewardNumberText.addChild(this.coinImg);
        this.goWind.isClickable = !0;
        this.goWind.events.onInputDown.add(this.restartGameClicked,
            this);
        this.bestImg = game.make.sprite(.35 * this.goWind.width, .85 * this.goWind.height, "pk_menu1", "best");
        setObjectAnchor(this.bestImg, .5, .5);
        this.goWind.addChild(this.bestImg);
        this.bestImg.showTW = game.add.tween(this.bestImg).to({
            alpha: 1
        }, 180, Phaser.Easing.Sinusoidal.In, !1);
        this.bestImg.showTW2 = game.add.tween(this.bestImg.scale).to({
            x: 1,
            y: 1
        }, 180, Phaser.Easing.Circular.In, !1);
        this.bestImg.showTW2.onComplete.add(function() {
            guiManager.screenShakeFire(10, 1.5)
        }, this);
        this.playBtn = guiManager.buttonsCreator.createOneImgButtonWithText(game.width /
            2, floorNumber(.78 * game.height), "pk_menu1", "play", gameTexts.textFromID_toUpper(TEXT_RESTART), TEXT_RESTART, TEXT_WHITE_COLOR, this.restartGameClicked, this);
        this.playBtn.txtt.fontSize = 35;
        this.screenGroup.addChild(this.playBtn);
        this.playBtn.scaleTwn = game.add.tween(this.playBtn.scale).to({
            x: [1.05, .95, 1.05, 1.02, 1],
            y: [.97, 1.03, .97, .98, 1]
        }, 1E3, Phaser.Easing.Linear.None, !1);
        this.knifeSelBtn = guiManager.buttonsCreator.createTwoImgButton(game.width / 2, floorNumber(.92 * game.height), "pk_menu1", "bt_sword", "pk_menu1",
            "sword_icon", this.knifeSelBtnClicked, this);
        this.screenGroup.addChild(this.knifeSelBtn);
        this.backBtn = guiManager.buttonsCreator.createOneImgButton(btnDistanceFromCorner, game.height - btnDistanceFromCorner -20, "pk_menu1", "icons_2", this.backClicked, this);
        this.screenGroup.addChild(this.backBtn)
    },
    update: function() {},
    restartGameClicked: function() {
		gradle.event('over_button_restart');
        musicPlayer.playSound("clck");
        gamePlay.prepareNewGame();
        guiManager.screenSwitcher_openNewScreen(guiManager.screenGame)
    },
    knifeSelBtnClicked: function() {
        musicPlayer.playSound("clck");
        guiManager.screenSwitcher_openNewScreen(guiManager.screenShop)
    },
    backClicked: function() {
		gradle.event('oveer_button_back');
        musicPlayer.playSound("clck");
        guiManager.screenSwitcher_openNewScreen(guiManager.screenMainMenu)
    },
    setScoreText: function() {
        this.scoreNumberText.setText(gamePlay.currentGameScore);
        this.scoreNumberText.anchor.set(.5)
    },
    setRewardText: function() {
        this.rewardNumberText.setText(gamePlay.currentGameCollectedCoins);
        this.rewardNumberText.anchor.set(1, .5)
    },
    showScreen: function() {
        musicPlayer.playSound("sndSwoosh");
        guiManager.setButtonsInput(this.screenGroup, !1);
        gameTexts.updateTextToWidth(this.playBtn.txtt, 35, .9 * game.cache.getFrameByName("pk_menu1", "play").width);
        this.setScoreText();
        this.setRewardText();
        this.bestImg.alpha = 0;
        this.bestImg.scale.set(2.2);
        guiManager.showScreenFromTop(this.screenGroup, !0, 330, 50, Phaser.Easing.Quintic.Out, this)
    },
    showScreenOver: function() {
        guiManager.setButtonsInput(this.screenGroup, !0);
        this.playBtn.scaleTwn.start();
        this.playBtn.scaleTwn.repeat(-1, 1E3);
        gamePlay.newHighScore && (this.bestImg.showTW.start(), this.bestImg.showTW2.start(),
            musicPlayer.playSound("sndBEST"))
    },
    hideScreen: function(a) {
        guiManager.hideScreenToTop(this.screenGroup, !0, 200, 0, Phaser.Easing.Linear.None, this);
        guiManager.setButtonsInput(this.screenGroup, !1);
        this.screenGroup.hideOverClbck = a
    },
    hideScreenOver: function() {
        this.screenGroup.visible = !1;
        this.playBtn.scaleTwn.stop();
        this.playBtn.scaleTwn.pendingDelete = !1
    },
    resetScreenTexts: function() {}
};
var ScreenTop = function() {
    this.screenGroup = null;
    this.screenName = "screenTop"
};
ScreenTop.prototype = {
    create: function() {
        this.screenGroup = game.add.group();
        this.screenGroup.name = this.screenName;
        if (SOUNDS_ENABLED) {
            var a = guiManager.buttonsCreator.createOneImgButton(btnDistanceFromCorner, btnDistanceFromCorner + 20, "pk_menu1", "sound_0", this.soundClicked, this);
            this.btn = this.screenGroup.addChild(a);
            this.btn.alpha = 0;
            game.add.tween(this.btn).to({
                alpha: 1
            }, 250, Phaser.Easing.Linear.None, !0);
            this.setBtnFrame()
        }
        this.coinImg = game.make.sprite(game.width - btnDistanceFromCorner, btnDistanceFromCorner,
            "pk_menu1", "apple");
        setObjectAnchor(this.coinImg, .5, .5);
        this.screenGroup.addChild(this.coinImg);
        this.totalCoinsText = game.make.text(0, 6, "0", {
            font: "30px gameFont",
            fill: TEXT_YELLOW_COLOR,
            align: "center"
        });
        this.totalCoinsText.align = "center";
        setObjectAnchor(this.totalCoinsText, .5, .5);
        this.coinImg.addChild(this.totalCoinsText);
        this.totalCoinsText.scldwn_tw = game.add.tween(this.totalCoinsText.scale).to({
            x: 1,
            y: 1
        }, 300, Phaser.Easing.Quintic.Out, !1);
        a = [1.5, 1.2, 1.5, 1.2, 1.5, 1];
        this.totalCoinsText.blink_tw = game.add.tween(this.totalCoinsText.scale).to({
            x: a,
            y: a
        }, 800, Phaser.Easing.Linear.None, !1);
        game.add.tween(this.coinImg).to({
            alpha: 1
        }, 250, Phaser.Easing.Linear.None, !0);
        this.updateTotalCoinText()
    },
    update: function() {},
    soundClicked: function() {
        musicPlayer.playSound("clck");
        musicPlayer.toggleEnableDisableMusic();
        this.setBtnFrame()
    },
    setBtnFrame: function() {
        SOUNDS_ENABLED && (this.btn.frameName = musicPlayer.musicON ? "sound_0" : "sound_1")
    },
    updateTotalCoinText: function() {
        this.totalCoinsText.setText(gamePlay.coinsCount);
        setObjectAnchor(this.totalCoinsText, .5, .5);
        this.totalCoinsText.x = -floorNumber(this.coinImg.width / 2) - 5 - floorNumber(this.totalCoinsText.width / 2);
        this.totalCoinsText.scale.set(1.5);
        this.totalCoinsText.scldwn_tw.start()
    },
    coinsTextBlink: function() {
        this.totalCoinsText.blink_tw.start()
    },
    showSoundButton: function() {
        !1 !== SOUNDS_ENABLED && (removeObjectTweens(this.btn), game.add.tween(this.btn).to({
            y: btnDistanceFromCorner
        }, 100, Phaser.Easing.Sinusoidal.Out, !0))
    },
    hideSoundButton: function() {
        !1 !== SOUNDS_ENABLED && (removeObjectTweens(this.btn), game.add.tween(this.btn).to({
                y: -btnDistanceFromCorner
            },
            100, Phaser.Easing.Sinusoidal.Out, !0))
    },
    showScreen: function() {
        guiManager.setButtonsInput(this.screenGroup, !1);
        guiManager.showScreenCustomTweens(this.screenGroup)
    },
    showScreenOver: function() {
        guiManager.setButtonsInput(this.screenGroup, !0)
    },
    hideScreen: function(a) {
        guiManager.hideScreenCustomTweens(this.screenGroup);
        guiManager.setButtonsInput(this.screenGroup, !1);
        this.screenGroup.hideOverClbck = a
    },
    hideScreenOver: function() {
        this.screenGroup.visible = !1
    },
    resetScreenTexts: function() {}
};
var ScreenShop = function() {
    this.screenGroup = null;
    this.screenName = "screenShop";
    this.clickedKnifeID = 0
};
ScreenShop.prototype = {
    create: function() {
        this.screenGroup = game.add.group();
        this.screenGroup.name = this.screenName;
        this.screenGroup.visible = !1;
        game.input.onDown.add(this.clickDown, this);
        game.input.onUp.add(this.clickUp, this);
        this.initClickX = null;
        this.knivesActiveGrp = 1;
        this.backBtn = guiManager.buttonsCreator.createOneImgButton(btnDistanceFromCorner, btnDistanceFromCorner, "pk_menu1", "icons_2", this.backClicked, this);
        this.screenGroup.addChild(this.backBtn);
        this.backBtn.hiddenSetting = {
            y: game.height + btnDistanceFromCorner -20
        };
        this.backBtn.visibleSetting = {
            y: game.height - btnDistanceFromCorner -20
        };
        var a = game.make.group();
        this.shine1Img = game.make.sprite(0, 0, "pk_menu1", "shine2");
        setObjectAnchor(this.shine1Img, .5, .5);
        a.addChild(this.shine1Img);
        this.shine2Img = game.make.sprite(0, 0, "pk_menu1", "shine2");
        setObjectAnchor(this.shine2Img, .5, .5);
        a.addChild(this.shine2Img);
        this.screenGroup.addChild(a);
        a.hiddenSetting = {
            alpha: 0
        };
        a.visibleSetting = {
            alpha: 1
        };
        this.selectedKnifeImg = game.make.sprite(floorNumber(game.width / 2), floorNumber(.13 * game.height),
            "pk_game1", KNIVES_LIST[0].img);
        this.selectedKnifeImg.angle = 50;
        setObjectAnchor(this.selectedKnifeImg, .5, .5);
        this.screenGroup.addChild(this.selectedKnifeImg);
        this.selectedKnifeImg.hiddenSetting = {
            alpha: 0
        };
        this.selectedKnifeImg.visibleSetting = {
            alpha: 1
        };
        this.selectedKnifeImg.s_tw = game.add.tween(this.selectedKnifeImg.scale).to({
            x: 1,
            y: 1
        }, 500, Phaser.Easing.Elastic.Out, !1);
        this.selectedKnifeImg.h_tw = game.add.tween(this.selectedKnifeImg.scale).to({
            x: 0,
            y: 0
        }, 150, Phaser.Easing.Linear.None, !1);
        this.shine1Img.x =
            this.shine2Img.x = this.selectedKnifeImg.x;
        this.shine1Img.y = this.shine2Img.y = this.selectedKnifeImg.y;
        a = game.make.sprite(game.width / 2, floorNumber(.28 * game.height), "pk_menu1", "hl_blue");
        setObjectAnchor(a, .5, .5);
        this.stuha = this.screenGroup.addChild(a);
        var b = game.make.text(0, 1, ".", {
            font: "25px gameFont",
            fill: TEXT_WHITE_COLOR
        });
        b.maxFontSize = 22;
        this.stuhaText = a.addChild(b);
        a.hiddenSetting = {
            alpha: 0
        };
        a.visibleSetting = {
            alpha: 1
        };
        this.knivesGrpIndicator1 = game.make.sprite(game.width / 2 - 15, floorNumber(.76 * game.height),
            "pk_menu1", "sword_page_0");
        this.knivesGrpIndicator1.anchor.set(.5);
        this.screenGroup.addChild(this.knivesGrpIndicator1);
        this.knivesGrpIndicator1.isClickable = !0;
        this.knivesGrpIndicator1.events.onInputDown.add(this.indicator1Clicked, this);
        this.knivesGrpIndicator2 = game.make.sprite(game.width / 2 + 15, floorNumber(.76 * game.height), "pk_menu1", "sword_page_1");
        this.knivesGrpIndicator2.anchor.set(.5);
        this.screenGroup.addChild(this.knivesGrpIndicator2);
        this.knivesGrpIndicator2.isClickable = !0;
        this.knivesGrpIndicator2.events.onInputDown.add(this.indicator2Clicked,
            this);
        this.knivesGrpIndicator1.hiddenSetting = {
            alpha: 0
        };
        this.knivesGrpIndicator1.visibleSetting = {
            alpha: 1
        };
        this.knivesGrpIndicator2.hiddenSetting = {
            alpha: 0
        };
        this.knivesGrpIndicator2.visibleSetting = {
            alpha: 1
        };
        this.knivesGrp1 = game.make.group(this.screenGroup);
        this.knivesGrp1.y = a.y + .75 * a.height;
        this.knivesGrp1.x = game.width / 2;
        this.knivesGrp1.hiddenSetting = {
            alpha: 0
        };
        this.knivesGrp1.visibleSetting = {
            alpha: 1
        };
        this.knivesReferencesList = [];
        for (var c = b = 0; 4 > c; c++)
            for (var d = 0; 4 > d; d++) {
                var f = guiManager.buttonsCreator.createShopButton(-floorNumber(186) +
                    45 + 94 * d, 45 + 94 * c, "pk_menu1", "sword_bg_0", "pk_game1", "k" + (b + 1), b, this.knifePressedClassic, this);
                this.knivesGrp1.addChild(f);
                this.knivesReferencesList.push(f);
                b++
            }
        this.knivesGrp2 = game.make.group(this.screenGroup);
        this.knivesGrp2.y = a.y + .75 * a.height;
        this.knivesGrp2.x = game.width + 188;
        this.knivesGrp2.hiddenSetting = {
            alpha: 0
        };
        this.knivesGrp2.visibleSetting = {
            alpha: 1
        };
        for (c = 0; 4 > c; c++)
            for (d = 0; 4 > d; d++) f = guiManager.buttonsCreator.createShopButton(-floorNumber(186) + 45 + 94 * d, 45 + 94 * c, "pk_menu1", "sword_bg_0", "pk_game1",
                "b" + (b + 1 - 16), b, this.knifePressedBoss, this), this.knivesGrp2.addChild(f), this.knivesReferencesList.push(f), b++;
        this.buyKnifeBtn = guiManager.buttonsCreator.createOneImgButton(game.width / 2, .72 * game.height, "pk_menu1", "bt_gb", this.buyKnifeBtnClicked, this);
        this.buyKnifeBtn.hiddenSetting = {
            x: 0,
            y: 0
        };
        this.buyKnifeBtn.visibleSetting = {
            x: 1,
            y: 1
        };
        this.screenGroup.addChild(this.buyKnifeBtn);
        this.buyBtnBuyText = game.make.text(-floorNumber(this.buyKnifeBtn.width / 6), 1, gameTexts.textFromID(TEXT_BUY), {
            font: "35px gameFont",
            fill: TEXT_WHITE_COLOR,
            align: "center"
        });
        this.buyBtnBuyText.align = "center";
        setObjectAnchor(this.buyBtnBuyText, .5, .5);
        this.buyKnifeBtn.addChild(this.buyBtnBuyText);
        a = game.make.sprite(floorNumber(.31 * this.buyKnifeBtn.width), -5, "pk_menu1", "apple");
        a.align = "center";
        setObjectAnchor(a, 0, .5);
        this.buyKnifeBtn.addChild(a);
        this.buyBtnCoinsText = game.make.text(floorNumber(.27 * this.buyKnifeBtn.width), 2, 0, {
            font: "25px gameFont",
            fill: TEXT_WHITE_COLOR,
            align: "center"
        });
        this.buyBtnCoinsText.align = "center";
        setObjectAnchor(this.buyBtnCoinsText,
            .5, .5);
        this.buyKnifeBtn.addChild(this.buyBtnCoinsText);
        this.buyBtnCoinsText.scldwn_tw = game.add.tween(this.buyBtnCoinsText.scale).to({
            x: 1,
            y: 1
        }, 300, Phaser.Easing.Quintic.Out, !1);
        this.buyKnifeBtn.anim = !1;
        this.buyKnifeBtn.hiddenSetting = {
            y: game.height + 85
        };
        this.buyKnifeBtn.visibleSetting = {
            y: game.height - 85
        };
        this.buyKnifeBtn.s_tw = game.add.tween(this.buyKnifeBtn).to(this.buyKnifeBtn.visibleSetting, 400, Phaser.Easing.Back.Out, !1);
        this.buyKnifeBtn.h_tw = game.add.tween(this.buyKnifeBtn).to(this.buyKnifeBtn.hiddenSetting,
            200, Phaser.Easing.Linear.None, !1);
        this.lockedBtn = guiManager.buttonsCreator.createOneImgButtonWithText(game.width / 2, .72 * game.height, "pk_menu1", "bt_long", gameTexts.textFromID_toUpper(TEXT_LOCKED), TEXT_LOCKED, TEXT_WHITE_COLOR, null);
        this.screenGroup.addChild(this.lockedBtn);
        this.lockedBtn.isClickable = !1;
        this.lockedBtn.anim = !1;
        this.lockedBtn.hiddenSetting = {
            y: game.height + 85
        };
        this.lockedBtn.visibleSetting = {
            y: game.height - 85
        };
        this.lockedBtn.s_tw = game.add.tween(this.lockedBtn).to(this.lockedBtn.visibleSetting,
            400, Phaser.Easing.Back.Out, !1);
        this.lockedBtn.h_tw = game.add.tween(this.lockedBtn).to(this.lockedBtn.hiddenSetting, 200, Phaser.Easing.Linear.None, !1);
        for (a = 0; a < this.screenGroup.length; a++) !1 !== this.screenGroup.getChildAt(a).anim && (guiManager.addShowTween(this.screenGroup.getChildAt(a), this.screenGroup.getChildAt(a), this.screenGroup.getChildAt(a).visibleSetting, 300, Phaser.Easing.Linear.None, 75 * a, !0, null, function() {
            guiManager.checkShowScreenOver(this.screenGroup, this)
        }, this), guiManager.addHideTween(this.screenGroup.getChildAt(a),
            this.screenGroup.getChildAt(a), this.screenGroup.getChildAt(a).hiddenSetting, 300, Phaser.Easing.Linear.None, 0, null,
            function() {
                guiManager.checkHideScreenOver(this.screenGroup, this)
            }, this))
    },
    update: function() {
        this.shine1Img.angle += .1;
        this.shine2Img.angle -= .4;
        null !== this.initClickX && (this.knivesGrp1.x = this.knivesGrp1.originX + (game.input.activePointer.x - this.initClickX), this.knivesGrp2.x = this.knivesGrp2.originX + (game.input.activePointer.x - this.initClickX))
    },
    clickDown: function(a) {
        !1 !== this.screenGroup.visible &&
            (this.initClickX = a.x, this.knivesGrp1.originX = this.knivesGrp1.x, this.knivesGrp2.originX = this.knivesGrp2.x)
    },
    clickUp: function(a) {
        !1 !== this.screenGroup.visible && (this.touchContentMove = Math.abs(this.initClickX - a.x), this.initClickX = null, a = this.knivesActiveGrp, 1 === this.knivesActiveGrp ? this.knivesGrp1.originX - this.knivesGrp1.x > .3 * this.knivesGrp1.width && (this.knivesActiveGrp = 2) : this.knivesGrp2.x - this.knivesGrp2.originX > .3 * this.knivesGrp2.width && (this.knivesActiveGrp = 1), this.showActiveKnivesGrp(!0), this.setKnivesGrpIndicator(),
            a != this.knivesActiveGrp && musicPlayer.playSound("sndSwoosh"))
    },
    indicator1Clicked: function() {
        1 !== this.knivesActiveGrp && (this.knivesActiveGrp = 1, this.showActiveKnivesGrp(!0))
    },
    indicator2Clicked: function() {
        2 !== this.knivesActiveGrp && (this.knivesActiveGrp = 2, this.showActiveKnivesGrp(!0))
    },
    showActiveKnivesGrp: function(a) {
        var b = 1 === this.knivesActiveGrp ? game.width / 2 - this.knivesGrp1.x : game.width / 2 - this.knivesGrp2.x;
        !0 === a ? (game.add.tween(this.knivesGrp1).to({
            x: this.knivesGrp1.x + b
        }, 200, Phaser.Easing.Quintic.Out, !0), game.add.tween(this.knivesGrp2).to({
            x: this.knivesGrp2.x + b
        }, 200, Phaser.Easing.Quintic.Out, !0)) : (this.knivesGrp1.x += b, this.knivesGrp2.x += b)
    },
    setKnivesGrpIndicator: function() {
        1 === this.knivesActiveGrp ? (this.knivesGrpIndicator1.frameName = "sword_page_0", this.knivesGrpIndicator2.frameName = "sword_page_1", this.stuha.frameName = "hl_blue", this.stuhaText.setText(gameTexts.textFromID_toUpper(TEXT_BUYFORAPPLES))) : (this.knivesGrpIndicator1.frameName = "sword_page_1", this.knivesGrpIndicator2.frameName = "sword_page_0",
            this.stuha.frameName = "hl_orange", this.stuhaText.setText(gameTexts.textFromID_toUpper(TEXT_BOSSKNIVES)));
        setObjectAnchor(this.stuhaText, .5, .5);
        gameTexts.updateTextToWidth(this.stuhaText, this.stuhaText.maxFontSize, .55 * this.stuha.width)
    },
    backClicked: function() {
        musicPlayer.playSound("clck");
        guiManager.screenSwitcher_openNewScreen(guiManager.screenMainMenu)
    },
    knifePressedClassic: function(a) {
        20 < this.touchContentMove || (this.knivesReferencesList[gamePlay.selectedKnifeID].frameName = "sword_bg_0", this.knivesReferencesList[this.clickedKnifeID].frameName =
            "sword_bg_0", this.clickedKnifeID = a.knifeID, !1 === KNIVES_LIST[a.knifeID].isLocked && a.knifeID !== gamePlay.selectedKnifeID && (gamePlay.selectedKnifeID = a.knifeID, this.renewSelectedKnife(), saveAllGameData()), this.clickedKnifeID === gamePlay.selectedKnifeID ? a.frameName = "sword_bg_3" : (this.knivesReferencesList[gamePlay.selectedKnifeID].frameName = "sword_bg_3", this.knivesReferencesList[this.clickedKnifeID].frameName = "sword_bg_2"), !0 === KNIVES_LIST[a.knifeID].isLocked ? (this.renewBuyBtnPrice(KNIVES_LIST[a.knifeID].price),
                this.buyKnifeBtnShow()) : (this.buyKnifeBtnHide(), this.lockedBtnHide()))
    },
    knifePressedBoss: function(a) {
        20 < this.touchContentMove || (this.knivesReferencesList[gamePlay.selectedKnifeID].frameName = "sword_bg_0", this.knivesReferencesList[this.clickedKnifeID].frameName = "sword_bg_0", this.clickedKnifeID = a.knifeID, !1 === KNIVES_LIST[a.knifeID].isLocked && a.knifeID !== gamePlay.selectedKnifeID && (gamePlay.selectedKnifeID = a.knifeID, this.renewSelectedKnife(), saveAllGameData()), this.clickedKnifeID === gamePlay.selectedKnifeID ?
            a.frameName = "sword_bg_3" : (this.knivesReferencesList[gamePlay.selectedKnifeID].frameName = "sword_bg_3", this.knivesReferencesList[this.clickedKnifeID].frameName = "sword_bg_2"), !0 === KNIVES_LIST[a.knifeID].isLocked ? (this.renewBuyBtnPrice(KNIVES_LIST[a.knifeID].price), this.lockedBtnShow()) : (this.lockedBtnHide(), this.buyKnifeBtnHide()))
    },
    renewBuyBtnPrice: function(a) {
        a != this.buyBtnCoinsText.text && (this.buyBtnCoinsText.setText(a), setObjectAnchor(this.buyBtnCoinsText, .5, .5), this.buyBtnCoinsText.scale.set(1.3),
            this.buyBtnCoinsText.scldwn_tw.start())
    },
    renewSelectedKnife: function() {
        this.selectedKnifeImg.h_tw.onComplete.addOnce(function() {
            this.selectedKnifeImg.frameName = KNIVES_LIST[gamePlay.selectedKnifeID].img;
            this.selectedKnifeImg.s_tw.isRunning && (this.selectedKnifeImg.s_tw.stop(), this.selectedKnifeImg.s_tw.pendingDelete = !1);
            this.selectedKnifeImg.s_tw.start()
        }, this);
        this.selectedKnifeImg.h_tw.start()
    },
    buyKnifeBtnClicked: function() {
        musicPlayer.playSound("clck");
        gamePlay.useCoins(KNIVES_LIST[this.clickedKnifeID].price) &&
            (KNIVES_LIST[this.clickedKnifeID].isLocked = !1, this.knivesReferencesList[this.clickedKnifeID].getChildAt(0).frameName = KNIVES_LIST[this.clickedKnifeID].img, this.knivesReferencesList[gamePlay.selectedKnifeID].frameName = "sword_bg_0", gamePlay.selectedKnifeID = this.clickedKnifeID, this.knivesReferencesList[gamePlay.selectedKnifeID].frameName = "sword_bg_2", this.renewSelectedKnife(), this.buyKnifeBtnHide(), gameElements.generateUnlockedKnivesString(), saveAllGameData())
    },
    buyKnifeBtnShow: function() {
        this.lockedBtnHide();
        var a = function() {
            this.buyKnifeBtn.inputEnabled = !0;
            this.buyKnifeBtn.s_tw.start()
        }.bind(this);
        this.buyKnifeBtn.y > game.height && a();
        this.buyKnifeBtn.h_tw.isRunning && (this.buyKnifeBtn.h_tw.stop(), this.buyKnifeBtn.h_tw.pendingDelete = !1, a())
    },
    buyKnifeBtnHide: function() {
        this.buyKnifeBtn.inputEnabled = !1;
        var a = function() {
            this.buyKnifeBtn.h_tw.start()
        }.bind(this);
        this.buyKnifeBtn.y < game.height && a();
        this.buyKnifeBtn.s_tw.isRunning && (this.buyKnifeBtn.s_tw.stop(), this.buyKnifeBtn.s_tw.pendingDelete = !1, a())
    },
    lockedBtnShow: function() {
        this.buyKnifeBtnHide();
        var a = function() {
            this.lockedBtn.s_tw.start()
        }.bind(this);
        this.lockedBtn.y > game.height && a();
        this.lockedBtn.h_tw.isRunning && (this.lockedBtn.h_tw.stop(), this.lockedBtn.h_tw.pendingDelete = !1, a())
    },
    lockedBtnHide: function() {
        var a = function() {
            this.lockedBtn.h_tw.start()
        }.bind(this);
        this.lockedBtn.y < game.height && a();
        this.lockedBtn.s_tw.isRunning && (this.lockedBtn.s_tw.stop(), this.lockedBtn.s_tw.pendingDelete = !1, a())
    },
    showScreen: function() {
        guiManager.setButtonsInput(this.screenGroup, !1);
        for (var a = 0; a < this.screenGroup.children.length; a++) {
            var b =
                this.screenGroup.getChildAt(a),
                c;
            for (c in b.hiddenSetting) b[c] = b.hiddenSetting[c]
        }
        for (a = 0; a < this.knivesReferencesList.length; a++) b = this.knivesReferencesList[a], b.frameName = "sword_bg_0", !0 === KNIVES_LIST[b.knifeID].isLocked ? b.getChildAt(0).frameName = KNIVES_LIST.getLockedImgName(b.knifeID) : b.getChildAt(0).frameName = KNIVES_LIST[b.knifeID].img;
        this.knivesReferencesList[gamePlay.selectedKnifeID].frameName = "sword_bg_3";
        this.selectedKnifeImg.frameName = KNIVES_LIST[gamePlay.selectedKnifeID].img;
        this.knivesActiveGrp =
            16 > gamePlay.selectedKnifeID ? 1 : 2;
        this.showActiveKnivesGrp(!1);
        this.setKnivesGrpIndicator();
        guiManager.showScreenCustomTweens(this.screenGroup)
    },
    showScreenOver: function() {
        guiManager.setButtonsInput(this.screenGroup, !0)
    },
    hideScreen: function(a) {
        guiManager.setButtonsInput(this.screenGroup, !1);
        guiManager.hideScreenCustomTweens(this.screenGroup);
        this.buyKnifeBtnHide();
        removeObjectTweens(this.knivesGrp1);
        removeObjectTweens(this.knivesGrp2);
        this.screenGroup.hideOverClbck = a
    },
    hideScreenOver: function() {
        this.screenGroup.visible = !1
    },
    resetScreenTexts: function() {}
};
var ScreenPause = function() {
    this.screenGroup = null;
    this.screenName = "ScreenPause";
    this.maxFontSize = 28
};
ScreenPause.prototype = {
    create: function() {
		
        this.screenGroup = game.add.group();
        this.screenGroup.name = this.screenName;
        this.screenGroup.visible = !1;
        this.contBtn = guiManager.buttonsCreator.createOneImgButtonWithText(game.width / 2, game.height / 2, "pk_menu1", "bt_long", gameTexts.textFromID(TEXT_CONTINUE), TEXT_CONTINUE, TEXT_WHITE_COLOR, this.continueClicked, this);
        this.screenGroup.addChild(this.contBtn);
        this.contBtn.hiddenSetting = {
            x: 0,
            y: 0
        };
        this.contBtn.visibleSetting = {
            x: 1,
            y: 1
        };
        guiManager.addShowTween(this.contBtn,
            this.contBtn.scale, this.contBtn.visibleSetting, 300, Phaser.Easing.Back.Out, 600, !0, null,
            function() {
                guiManager.checkShowScreenOver(this.screenGroup, this)
            }, this);
        guiManager.addHideTween(this.contBtn, this.contBtn.scale, this.contBtn.hiddenSetting, 300, Phaser.Easing.Linear.None, 0, null, function() {
            guiManager.checkHideScreenOver(this.screenGroup, this)
        }, this)
    },
    update: function() {},
    continueClicked: function() {
        musicPlayer.playSound("clck");
        appState = APP_STATES.GAME_RUNNING;
        guiManager.screenSwitcher_closeOverlayScreen()
    },
    showScreen: function() {
		gradle.event('screen_pause');
        guiManager.setButtonsInput(this.screenGroup, !1);
        this.contBtn.scale.set(this.contBtn.hiddenSetting.x, this.contBtn.hiddenSetting.y);
        guiManager.showScreenCustomTweens(this.screenGroup);
        guiManager.screenTop.showSoundButton()
    },
    showScreenOver: function() {
        guiManager.setButtonsInput(this.screenGroup, !0)
    },
    hideScreen: function(a) {
        guiManager.hideScreenCustomTweens(this.screenGroup);
        guiManager.setButtonsInput(this.screenGroup, !1);
        this.screenGroup.hideOverClbck = a;
        guiManager.screenTop.hideSoundButton()
    },
    hideScreenOver: function() {
        this.screenGroup.visible = !1
    },
    resetScreenTexts: function() {}
};
var LEVELS_DIFFICULTY = {
        EASY: "EASY",
        MEDIUM: "MEDIUM",
        HARD: "HARD"
    },
    Levels = function() {
        this.levelsDb = {
            EASY: [],
            MEDIUM: [],
            HARD: []
        }
    };
Levels.prototype = {
    preload: function() {
        this.parseLevels()
    },
    create: function() {},
    parseLevels: function() {
        var a = game.cache.getJSON("levels_easy");
        this.levelsDb.EASY = a;
        a = game.cache.getJSON("levels_medium");
        this.levelsDb.MEDIUM = a;
        a = game.cache.getJSON("levels_hard");
        this.levelsDb.HARD = a;
        for (a = 0; a < this.levelsDb.EASY.length; a++) this.levelsDb.EASY[a].levelUsed = 0;
        for (a = 0; a < this.levelsDb.MEDIUM.length; a++) this.levelsDb.MEDIUM[a].levelUsed = 0;
        for (a = 0; a < this.levelsDb.HARD.length; a++) this.levelsDb.HARD[a].levelUsed =
            0
    },
    loadLevel: function(a) {
        var b = getRandomUIntInRange(0, 100),
            c = LEVELS_DIFFICULTY.EASY;
        if (1 === a) return this.levelsDb.EASY[0].levelUsed = 3, this.levelsDb.EASY[0];
        c = 5 >= a ? LEVELS_DIFFICULTY.EASY : 10 >= a ? 40 > b ? LEVELS_DIFFICULTY.EASY : LEVELS_DIFFICULTY.MEDIUM : 15 >= a ? 10 > b ? LEVELS_DIFFICULTY.EASY : 80 > b ? LEVELS_DIFFICULTY.MEDIUM : LEVELS_DIFFICULTY.HARD : 20 >= a ? 60 > b ? LEVELS_DIFFICULTY.MEDIUM : LEVELS_DIFFICULTY.HARD : 20 > b ? LEVELS_DIFFICULTY.MEDIUM : LEVELS_DIFFICULTY.HARD;
        b = this.levelsDb[c];
        do a = getRandomValueFromList(b); while (0 <
            a.levelUsed);
        for (b = 0; b < this.levelsDb.EASY.length; b++) 0 < this.levelsDb.EASY[b].levelUsed && --this.levelsDb.EASY[b].levelUsed;
        for (b = 0; b < this.levelsDb.MEDIUM.length; b++) 0 < this.levelsDb.MEDIUM[b].levelUsed && --this.levelsDb.MEDIUM[b].levelUsed;
        for (b = 0; b < this.levelsDb.HARD.length; b++) 0 < this.levelsDb.HARD[b].levelUsed && --this.levelsDb.HARD[b].levelUsed;
        a.levelUsed = 3;
        return a
    }
};
var knivesPixelsOffsetFromWheelCenter = 55,
    coinsPixelsOffsetFromWheelCenter = 140,
    PHYSICS_DEBUG = !1,
    REVIVE_DURATION = 4E3,
    REVIVE_PRICE_increment = 25,
    REVIVE_PRICE = 0,
    knifeHalfAngleOffset = 5,
    coinHalfAngleOffset = 11,
    KNIVES_LIST = [{
            img: "k1",
            price: 0,
            isLocked: !1,
            colliderWidth: 14,
            halfAngle: 4
        }, {
            img: "k2",
            price: 5,
            isLocked: !0,
            colliderWidth: 17,
            halfAngle: 4
        }, {
            img: "k3",
            price: 10,
            isLocked: !0,
            colliderWidth: 14,
            halfAngle: 5
        }, {
            img: "k4",
            price: 15,
            isLocked: !0,
            colliderWidth: 17,
            halfAngle: 5
        }, {
            img: "k5",
            price: 20,
            isLocked: !0,
            colliderWidth: 19,
            halfAngle: 6
        }, {
            img: "k6",
            price: 25,
            isLocked: !0,
            colliderWidth: 15,
            halfAngle: 5
        }, {
            img: "k7",
            price: 30,
            isLocked: !0,
            colliderWidth: 20,
            halfAngle: 4
        }, {
            img: "k8",
            price: 35,
            isLocked: !0,
            colliderWidth: 15,
            halfAngle: 5
        }, {
            img: "k9",
            price: 40,
            isLocked: !0,
            colliderWidth: 17,
            halfAngle: 4
        }, {
            img: "k10",
            price: 45,
            isLocked: !0,
            colliderWidth: 20,
            halfAngle: 5
        }, {
            img: "k11",
            price: 50,
            isLocked: !0,
            colliderWidth: 20,
            halfAngle: 5
        }, {
            img: "k12",
            price: 55,
            isLocked: !0,
            colliderWidth: 20,
            halfAngle: 6
        }, {
            img: "k13",
            price: 60,
            isLocked: !0,
            colliderWidth: 16,
            halfAngle: 4
        },
        {
            img: "k14",
            price: 65,
            isLocked: !0,
            colliderWidth: 19,
            halfAngle: 5
        }, {
            img: "k15",
            price: 70,
            isLocked: !0,
            colliderWidth: 14,
            halfAngle: 4
        }, {
            img: "k16",
            price: 75,
            isLocked: !0,
            colliderWidth: 17,
            halfAngle: 4
        }, {
            img: "b1",
            price: 20,
            isLocked: !0,
            colliderWidth: 21,
            halfAngle: 6
        }, {
            img: "b2",
            price: 20,
            isLocked: !0,
            colliderWidth: 16,
            halfAngle: 4
        }, {
            img: "b3",
            price: 20,
            isLocked: !0,
            colliderWidth: 21,
            halfAngle: 5
        }, {
            img: "b4",
            price: 20,
            isLocked: !0,
            colliderWidth: 15,
            halfAngle: 4
        }, {
            img: "b5",
            price: 20,
            isLocked: !0,
            colliderWidth: 17,
            halfAngle: 4
        }, {
            img: "b6",
            price: 20,
            isLocked: !0,
            colliderWidth: 17,
            halfAngle: 4
        }, {
            img: "b7",
            price: 20,
            isLocked: !0,
            colliderWidth: 16,
            halfAngle: 5
        }, {
            img: "b8",
            price: 20,
            isLocked: !0,
            colliderWidth: 17,
            halfAngle: 5
        }, {
            img: "b9",
            price: 20,
            isLocked: !0,
            colliderWidth: 19,
            halfAngle: 5
        }, {
            img: "b10",
            price: 20,
            isLocked: !0,
            colliderWidth: 14,
            halfAngle: 3
        }, {
            img: "b11",
            price: 20,
            isLocked: !0,
            colliderWidth: 22,
            halfAngle: 7
        }, {
            img: "b12",
            price: 20,
            isLocked: !0,
            colliderWidth: 20,
            halfAngle: 5
        }, {
            img: "b13",
            price: 20,
            isLocked: !0,
            colliderWidth: 18,
            halfAngle: 5
        }, {
            img: "b14",
            price: 20,
            isLocked: !0,
            colliderWidth: 18,
            halfAngle: 5
        }, {
            img: "b15",
            price: 20,
            isLocked: !0,
            colliderWidth: 17,
            halfAngle: 5
        }, {
            img: "b16",
            price: 20,
            isLocked: !0,
            colliderWidth: 15,
            halfAngle: 6
        }
    ];
KNIVES_LIST.getLockedImgName = function(a) {
    return KNIVES_LIST[a].img + "a"
};
var WHEEL_KNIFE_COMBINATION = [null, 4, 8, 2, 15, 11, 12, 0, 14, 7, 1, 13, 10, 5, 9, 3, 6],
    WHEEL_PARTICLE_TINT = [null, [9524532, 16760698],
        [4080464, 11513775],
        [35903, 13770791],
        [16761344, 16777215],
        [12352512, 16769116],
        [16777215, 3225150],
        [7026966, 16777215],
        [1118739, 13717283],
        [13020306, 9521946],
        [14016034, 16777215],
        [2594261, 7257686],
        [9094462, 15289135],
        [35142, 13509418],
        [16351768, 16428566],
        [13418651, 10654564],
        [2236191, 13418651]
    ],
    GameElements = function() {
        this.coinsGroup = this.backupPinsGroup = this.wheelPinsGroup = this.wheel = this.wheelShadow =
            null;
        this.lockString = "";
        this.wheelUsed = [null, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    };
GameElements.prototype = {
    preload: function() {
        this.rotationCenter = {
            x: game.width / 2,
            y: .4 * game.height
        }
    },
    create: function() {
        this.backupPinsGroup = game.make.group();
        this.backupPinsGroup.name = "backupPinsGroup";
        guiManager.screenGame.gameContentGroup.addChild(this.backupPinsGroup);
        this.wheelShadow = game.make.sprite(this.rotationCenter.x, this.rotationCenter.y + 12, "pk_game1", "ta1");
        this.wheelShadow.yOffset = 12;
        this.wheelShadow.defaultAlpha = .25;
        this.wheelShadow.anchor.set(.5);
        this.wheelShadow.tint = 0;
        this.wheelShadow.alpha =
            this.wheelShadow.defaultAlpha;
        guiManager.screenGame.gameContentGroup.addChild(this.wheelShadow);
        this.pinsCollisionGrp = game.physics.p2.createCollisionGroup();
        this.wheelPinsGroup = game.make.group();
        this.wheelPinsGroup.name = "wheelPinsGroup";
        guiManager.screenGame.gameContentGroup.addChild(this.wheelPinsGroup);
        this.coinsGroup = game.make.group();
        this.coinsGroup.name = "coinsGroup";
        guiManager.screenGame.gameContentGroup.addChild(this.coinsGroup);
        this.wheel = game.make.sprite(this.rotationCenter.x, this.rotationCenter.y,
            "pk_game1", "ta1");
        this.wheel.anchor.set(.5);
        guiManager.screenGame.gameContentGroup.addChild(this.wheel);
        var a = game.make.sprite(0, 0, "pk_game1", "target_white");
        a.anchor.set(.5);
        this.wheel.addChild(a);
        a.alpha = 0;
        this.wheelBlink = a;
        this.wheelBlink.blinkF = function() {
            removeObjectTweens(this.wheelBlink);
            this.wheelBlink.alpha = .7;
            game.add.tween(this.wheelBlink).to({
                alpha: 0
            }, 100, Phaser.Easing.Linear.None, !0)
        }.bind(this)
    },
    update: function() {
        0 < this.moveWheelBack && this.wheelHitMoveBack();
        if (appState === APP_STATES.GAME_RUNNING) {
            var a =
                gamePlay.currentWheelRotationStep * Math.floor(GAME_MAX_FPS / GAME_AVERAGE_FPS * 10) / 10;
            this.wheel.angle += a;
            this.wheelShadow.angle += a;
            for (a = 0; a < this.wheelPinsGroup.length; a++) this.wheelPinsGroup.getChildAt(a).body.angle = this.wheelPinsGroup.getChildAt(a).initAngle + this.wheel.angle;
            for (a = 0; a < this.coinsGroup.length; a++) this.coinsGroup.getChildAt(a).body.angle = this.coinsGroup.getChildAt(a).initAngle + this.wheel.angle
        }
    },
    resetWheelAngle: function() {
        this.wheel.angle = 0;
        this.wheelShadow.angle = 0
    },
    getFreePin: function(a) {
        var b =
            this.backupPinsGroup.getFirstDead();
        null === b && (b = this.backupPinsGroup.create(0, 0, "pk_game1", KNIVES_LIST[0].img), b.update = function() {
                !0 === this.move && (this.body.y -= 65 * Math.floor(GAME_MAX_FPS / GAME_AVERAGE_FPS), this.body.y < gameElements.rotationCenter.y && (this.body.y = gameElements.rotationCenter.y, this.move = !1, gamePlay.checkExtraCoinCollision(this), gamePlay.checkExtraKnivesCollision(this)))
            }, game.physics.p2.enable(b, PHYSICS_DEBUG), b.body.data.gravityScale = 0, b.body.setCollisionGroup(this.pinsCollisionGrp),
            b.body.collides(this.pinsCollisionGrp, function() {
                logToConsole("collision")
            }), b.body.data.shapes[0].sensor = !0, b.body.onBeginContact.add(gamePlay.knivesColide, gamePlay), setObjectAnchor(b, .5, 0), b.pivot.y = -knivesPixelsOffsetFromWheelCenter, b.body.setCollisionGroup(this.pinsCollisionGrp));
        b.knifeID = void 0 != a ? a : gamePlay.selectedKnifeID;
        b.frameName = KNIVES_LIST[b.knifeID].img;
        b.reset(game.width / 2, game.height);
        b.body.angle = 0;
        this.setPinCollider(b, !0);
        b.badPlaced = !1;
        removeObjectTweens(b);
        return b
    },
    setPinCollider: function(a,
        b) {
        a.body.clearShapes();
        b ? a.body.setRectangle(KNIVES_LIST[a.knifeID].colliderWidth, a.height, -1, a.height / 2 + knivesPixelsOffsetFromWheelCenter, 0) : a.body.setRectangle(KNIVES_LIST[a.knifeID].colliderWidth, a.height - 50, -1, a.height / 2 + knivesPixelsOffsetFromWheelCenter + 25, 0);
        a.body.updateCollisionMask();
        a.body.data.shapes[0].sensor = !0;
        a.body.setCollisionGroup(this.pinsCollisionGrp)
    },
    appendPinToWheel: function(a, b) {
        a.initAngle = b;
        a.body.reset(gameElements.rotationCenter.x, gameElements.rotationCenter.y);
        a.body.angle =
            b + gameElements.wheel.angle;
        this.wheelPinsGroup.addChild(a)
    },
    killAllGameElements: function() {
        removeObjectTweens(this.wheelPinsGroup);
        removeObjectTweens(this.backupPinsGroup);
        this.wheelPinsGroup.callAll("kill");
        this.backupPinsGroup.callAll("kill");
        this.coinsGroup.callAll("kill");
        for (var a = this.wheelPinsGroup.length - 1; 0 <= a; a--) this.backupPinsGroup.addChild(this.wheelPinsGroup.getChildAt(a));
        guiManager.screenGame.resetKnivesGroup()
    },
    getFreeCoin: function(a) {
        var b = this.coinsGroup.getFirstDead();
        null === b &&
            (b = this.coinsGroup.create(gameElements.rotationCenter.x, gameElements.rotationCenter.y, "pk_game1", "apple2"), setObjectAnchor(b, .5, .5), b.pivot.y = -coinsPixelsOffsetFromWheelCenter, game.physics.p2.enable(b, PHYSICS_DEBUG), b.body.data.gravityScale = 0, b.body.clearShapes(), b.body.setRectangle(60, 60, 0, coinsPixelsOffsetFromWheelCenter + 10), b.body.updateCollisionMask(), b.body.setCollisionGroup(this.pinsCollisionGrp), b.body.collides(this.pinsCollisionGrp, function() {
                logToConsole("collision")
            }), b.body.data.shapes[0].sensor = !0, b.body.onBeginContact.add(gamePlay.coinHitPhysics, gamePlay));
        b.reset(gameElements.rotationCenter.x, gameElements.rotationCenter.y);
        b.body.angle = a;
        b.initAngle = a;
        removeObjectTweens(b);
        b.wasHit = !1;
        return b
    },
    wheelHitAnim: function() {
        this.wheel.y = this.rotationCenter.y - 20;
        this.wheelPinsGroup.y = -20;
        this.coinsGroup.y = -20;
        this.moveWheelBack = 20;
        this.wheelBlink.blinkF()
    },
    wheelHitMoveBack: function() {
        this.wheel.y += 3;
        this.wheel.y > this.rotationCenter.y && (this.wheel.y = this.rotationCenter.y);
        this.wheelPinsGroup.y +=
            3;
        0 < this.wheelPinsGroup.y && (this.wheelPinsGroup.y = 0);
        this.coinsGroup.y += 3;
        0 < this.coinsGroup.y && (this.coinsGroup.y = 0);
        this.wheelShadow.y = this.wheel.y + this.wheelShadow.yOffset;
        this.moveWheelBack--
    },
    getRandomWheelID: function() {
        var a;
        do a = getRandomUIntInRange(1, 16); while (0 < this.wheelUsed[a]);
        for (var b = 1; b < this.wheelUsed.length; b++) 0 < this.wheelUsed[b] && --this.wheelUsed[b];
        this.wheelUsed[a] = 3;
        return a
    },
    getRandomBossWheelID: function() {
        return getRandomUIntInRange(17, 24)
    },
    getWheelTexture: function(a) {
        return 16 >=
            a ? "ta" + a : "tb" + (a - 16)
    },
    generateUnlockedKnivesString: function() {
        this.lockString = "";
        for (var a = 1; a < KNIVES_LIST.length; a++) this.lockString = !0 === KNIVES_LIST[a].isLocked ? this.lockString + "0" : this.lockString + "1"
    },
    getUnlockedKnives: function() {
        return this.lockString
    },
    loadSavedKnives: function(a) {
        if (31 === a.length)
            for (this.lockString = a, a = 0; a < this.lockString.length; a++) "1" === this.lockString[a] && (KNIVES_LIST[a + 1].isLocked = !1)
    }
};
var levels = new Levels,
    gameElements = new GameElements,
    BOSS_FIGHT_LEVEL = 5,
    GamePlay = function() {
        this.currentStageKnivesSuccessful = this.currentStageKnivesToThrowCount = this.currentGameCollectedCoins = this.currentGameScore = this.currentStage = this.highestStageAchieved = this.highestScoreAchieved = this.coinsCount = 0;
        this.levelsProgress = [];
        this.isGameOver = !1;
        this.activePin = null;
        this.gameReadyToStart = !1;
        this.currentLevelRotationUnits = [];
        this.currentRotationUnitIdx = 0;
        this.currentRotationUnitParams = null;
        this.selectedKnifeID =
            this.currentWheelRotationStep = this.currentRotationUnitTimer = 0;
        this.newHighScore = !1
    };
GamePlay.prototype = {
    constructor: GamePlay,
    preload: function() {
        gameElements.preload();
        levels.preload();
        this.initSavedLevelsProgress()
    },
    create: function() {
        gameElements.create();
        levels.create();
        game.input.onDown.add(this.fireKnife, this);
        game.input.keyboard.onDownCallback = function(a) {
            RUNNING_ON_DESKTOP && gamePlay.fireKnife()
        }
    },
    prepareNewGame: function() {
        this.clearGame();
        appState = APP_STATES.GAME_START;
        this.activePin = null;
        REVIVE_PRICE = this.currentGameScore = this.currentStage = 0;
        this.resetCurrentGameCollectedCoins();
        this.prepareNextStage();
        this.newHighScore = !1
    },
    prepareNextStage: function() {
        this.clearGame();
        this.currentRotationUnitTimer = this.currentRotationUnitIdx = this.currentWheelRotationStep = 0;
        this.currentRotationUnitParams = null;
        this.gameTimer = 0;
        this.currentStage++;
        this.currentLevelData = levels.loadLevel(this.currentStage);
        this.currentLevelInitKnivesAngles = this.currentLevelData.initialKnivesAngles;
        this.currentLevelCoinsAngles = [];
        this.currentStageKnivesSuccessful = 0;
        this.currentStageKnivesToThrowCount = this.currentLevelData.knivesCount;
        this.currentLevelRotationUnits = this.currentLevelData.rotation;
        gameElements.resetWheelAngle();
        this.currentStageIsBossFight = 0 === this.currentStage % BOSS_FIGHT_LEVEL;
        !1 === this.currentStageIsBossFight ? (this.currentWheelID = gameElements.getRandomWheelID(), this.currentStageKnifeID = WHEEL_KNIFE_COMBINATION[this.currentWheelID]) : (this.currentWheelID = gameElements.getRandomBossWheelID(), this.currentStageKnifeID = getRandomUIntInRange(16, 31), musicPlayer.playSound("sndBossStart"));
        for (var a = 0; a < this.currentLevelInitKnivesAngles.length; a++) gameElements.appendPinToWheel(gameElements.getFreePin(this.currentStageKnifeID),
            this.currentLevelInitKnivesAngles[a]);
        gameElements.wheelPinsGroup.forEach(function(a) {
            a.alpha = 1
        }, this);
        gameElements.wheel.frameName = gameElements.getWheelTexture(this.currentWheelID);
        gameElements.wheelShadow.frameName = gameElements.wheel.frameName;
        this.addCoins(getRandomUIntInRange(0, 7));
        gameElements.coinsGroup.alpha = 1;
        this.bossKnifeUnlocked = null
    },
    startGame: function() {
        appState = APP_STATES.GAME_RUNNING;
		guiManager.screenTop.hideSoundButton();
		this.prepareKnife();
		!0 === this.currentStageIsBossFight && musicPlayer.playMusic(MUSIC_BOSS);
    },
    prepareKnife: function() {
        var a = gameElements.getFreePin();
        a.alpha = 0;
        a.comingTwn = game.add.tween(a.body).to({
            y: game.height - a.height - 80
        }, 150, Phaser.Easing.Sinusoidal.Out, !0);
        a.comingTwn2 = game.add.tween(a).to({
            alpha: 1
        }, 150, Phaser.Easing.Linear.None, !0, 50);
        this.activePin = a
    },
    fireKnife: function() {
        appState === APP_STATES.GAME_RUNNING && null !== this.activePin &&
            (this.activePin.move = !0, this.activePin.comingTwn.isRunning && (this.activePin.comingTwn.stop(), this.activePin.body.y = game.height - this.activePin.height - 90), this.previousPin = this.activePin, this.activePin = null)
    },
    knivesColide: function(a, b, c, d, f) {
        appState === APP_STATES.GAME_RUNNING && "backupPinsGroup" === a.sprite.parent.name && !0 === a.sprite.move && (a.sprite.move = !1, gameElements.wheelHitAnim(), this.knifeHit(a.sprite))
    },
    checkExtraKnivesCollision: function(a) {
        var b = !1;
        gameElements.wheelPinsGroup.forEachAlive(function(c) {
            !0 !==
                b && Math.abs(c.body.angle) < KNIVES_LIST[a.knifeID].halfAngle + KNIVES_LIST[c.knifeID].halfAngle && (this.knifeHit(a), b = !0)
        }, this);
        !0 !== b && this.knifeThrowSuccess(a)
    },
    knifeHit: function(a) {
        !0 !== a.badPlaced && (a.badPlaced = !0, musicPlayer.playSound("sndFail"), appState = APP_STATES.STAGE_FAILED, game.add.tween(a.body).to({
            y: game.height + a.height,
            rotation: 4 * Math.random() - 2
        }, 400, Phaser.Easing.Linear.None, !0).onComplete.add(function(a, c) {
            a.sprite.kill()
        }), game.time.events.add(200, this.stageFailed, this))
    },
    knifeThrowSuccess: function(a) {
        gameElements.appendPinToWheel(a, -gameElements.wheel.angle);
        this.incSuccessfulPins();
        musicPlayer.playSound("sndHit");
        gameElements.wheelHitAnim();
        guiManager.fireParticle(gameElements.rotationCenter.x, gameElements.rotationCenter.y + 110, getRandomUIntInRange(2, 3), WHEEL_PARTICLE_TINT[this.currentWheelID]);
        this.currentStageKnivesSuccessful < this.currentStageKnivesToThrowCount && this.prepareKnife()
    },
    addCoins: function(a) {
        for (var b = 0; b < a; b++) {
            var c = this.findAvailableSpaces();
            0 < c.length && (c = this.findRandomAvailableAngle(c), this.addCoinToAngle(c))
        }
    },
    findAvailableSpaces: function() {
        for (var a = [], b = 0; b < this.currentLevelInitKnivesAngles.length; b++) a.push(this.currentLevelInitKnivesAngles[b]);
        for (b = 0; b < this.currentLevelCoinsAngles.length; b++) a.push(this.currentLevelCoinsAngles[b]);
        for (var a = a.sort(function(a, b) {
                return a - b
            }), c = [], b = 0; b < a.length; b++) {
            var d = [],
                f = b,
                e = knifeHalfAngleOffset; - 1 != gamePlay.currentLevelCoinsAngles.indexOf(a[b]) && (e = coinHalfAngleOffset);
            d.push(a[f] + e);
            f = b + 1;
            b === a.length - 1 && (f = 0);
            e = knifeHalfAngleOffset; - 1 != gamePlay.currentLevelCoinsAngles.indexOf(a[f]) &&
                (e = coinHalfAngleOffset);
            d.push(a[f] - e);
            0 > d[1] && (d[1] = 360 + d[1]);
            d[1] - d[0] > 2 * coinHalfAngleOffset && c.push(d)
        }
        return c
    },
    findRandomAvailableAngle: function(a) {
        a = getRandomValueFromList(a);
        return getRandomUIntInRange(a[0] + coinHalfAngleOffset, a[1] - coinHalfAngleOffset)
    },
    addCoinToAngle: function(a) {
        this.currentLevelCoinsAngles.push(a);
        gameElements.getFreeCoin(a)
    },
    coinHitPhysics: function(a, b, c, d, f) {
        appState === APP_STATES.GAME_RUNNING && this.coinHit(c.body.parent.sprite)
    },
    checkExtraCoinCollision: function(a) {
        gameElements.coinsGroup.forEachAlive(function(a) {
            Math.abs(a.body.angle) <
                coinHalfAngleOffset + 2 && this.coinHit(a)
        }, this)
    },
    coinHit: function(a) {
        if (!0 !== a.wasHit) {
            musicPlayer.playSound("sndCoin");
            var b = a.worldPosition;
            a.kill();
            a.wasHit = !0;
            guiManager.screenGame.fireCoinParticle(b.x, b.y)
        }
    },
    incSuccessfulPins: function() {
        this.currentStageKnivesSuccessful++;
        guiManager.screenGame.updateLeftKnivesCount();
        this.currentGameScore++;
        guiManager.screenGame.updateScoreText();
        this.currentStageKnivesSuccessful >= this.currentStageKnivesToThrowCount && (this.currentStageKnivesSuccessful = this.currentStageKnivesToThrowCount,
            this.stageSuccessful())
    },
    startFollowingLevel: function() {
        this.currentStage++;
        this.prepareNewGame()
    },
    update: function() {
        !0 === this.gameReadyToStart && (this.gameReadyToStart = !1, this.startGame());
        gameElements.update();
        appState === APP_STATES.GAME_RUNNING && (this.gameTimer += lastUpdateTimeOffset, this.updateWheelRotationStep())
    },
    updateWheelRotationStep: function() {
        if (null == this.currentRotationUnitParams) {
            var a = this.currentLevelRotationUnits[this.currentRotationUnitIdx];
            this.currentRotationUnitParams = 1 === a.length ? {
                changeSpeed: !1,
                duration: a[0]
            } : {
                changeSpeed: !0,
                initialSpeed: 100 * this.currentWheelRotationStep,
                finalSpeed: a[1],
                duration: a[0]
            }
        }
        this.currentRotationUnitTimer += lastUpdateTimeOffset;
        !0 === this.currentRotationUnitParams.changeSpeed && (this.currentWheelRotationStep = this.currentRotationUnitParams.initialSpeed + this.currentRotationUnitTimer / this.currentRotationUnitParams.duration * (this.currentRotationUnitParams.finalSpeed - this.currentRotationUnitParams.initialSpeed), this.currentWheelRotationStep = Math.round(this.currentWheelRotationStep /
            10) / 10);
        this.currentRotationUnitTimer >= this.currentRotationUnitParams.duration && (!0 === this.currentRotationUnitParams.changeSpeed && (this.currentWheelRotationStep = this.currentRotationUnitParams.finalSpeed, this.currentWheelRotationStep = Math.round(this.currentWheelRotationStep / 10) / 10), this.currentRotationUnitTimer = 0, this.currentRotationUnitIdx++, this.currentRotationUnitParams = null, this.currentRotationUnitIdx >= this.currentLevelRotationUnits.length && (this.currentRotationUnitIdx = 0))
    },
    initSavedLevelsProgress: function() {},
    clearGame: function() {
        gameElements.killAllGameElements()
    },
    stageSuccessful: function() {
        appState = APP_STATES.STAGE_WIN;
        logToConsole("stage win");
        musicPlayer.playMusic(null);
        gameElements.wheelPinsGroup.forEachAlive(function(a) {
            if (a === this.previousPin) {
                var c = a.body.rotation,
                    c = c - recalcDegreesToRadians(90);
                game.add.tween(a.body).to({
                    x: gameElements.rotationCenter.x + .75 * game.height * Math.cos(c),
                    y: gameElements.rotationCenter.y + .75 * game.height * Math.sin(c)
                }, 300, Phaser.Easing.Quadratic.In, !0, 0)
            } else game.add.tween(a).to({
                    alpha: 0
                },
                50, Phaser.Easing.Linear.None, !0, 0)
        }, this);
        game.add.tween(gameElements.coinsGroup).to({
            alpha: 0
        }, 50, Phaser.Easing.Linear.None, !0, 0);
        game.add.tween(gameElements.wheel.scale).to({
            x: 0,
            y: 0
        }, 450, Phaser.Easing.Quintic.Out, !0, 0);
        game.add.tween(gameElements.wheel).to({
            alpha: 0
        }, 300, Phaser.Easing.Linear.None, !0, 0);
        game.add.tween(gameElements.wheelShadow.scale).to({
            x: 0,
            y: 0
        }, 450, Phaser.Easing.Quintic.Out, !0, 0);
        game.add.tween(gameElements.wheelShadow).to({
            alpha: 0
        }, 300, Phaser.Easing.Linear.None, !0, 0);
        game.add.tween(guiManager.screenGame.stageText).to({
                alpha: 0
            },
            125, Phaser.Easing.Linear.None, !0, 0);
        if (this.currentStageIsBossFight) {
            musicPlayer.playSound("sndBossWin");
            !0 === KNIVES_LIST[this.currentStageKnifeID].isLocked && (KNIVES_LIST[this.currentStageKnifeID].isLocked = !1, this.bossKnifeUnlocked = !0, logToConsole("boss knife unlocked: ", this.currentStageKnifeID), gameElements.generateUnlockedKnivesString(), saveAllGameData());
            var a = guiManager.screenGame.bossDefeatedAnim();
            game.time.events.add(a, function() {

                    this.prepareNextStage();
                    guiManager.screenGame.resetScreenContent()
                },
                this)
        } else musicPlayer.playSound("sndWin"), game.time.events.add(600, function() {
            this.prepareNextStage();
            guiManager.screenGame.resetScreenContent()
        }, this)
    },
    stageFailed: function() {
        logToConsole("stage failed");
        guiManager.screenTop.showSoundButton();
        REVIVE_PRICE += REVIVE_PRICE_increment;
        this.coinsAvailable(REVIVE_PRICE) ? (appState = APP_STATES.STAGE_FAILED, guiManager.screenSwitcher_openOverlayScreen(guiManager.screenOverRevive)) : this.GameOver()
    },
    stageContinue: function() {
        gamePlay.incCoins(-REVIVE_PRICE);
        guiManager.screenSwitcher_closeOverlayScreen();
        appState = APP_STATES.GAME_RUNNING;
        null === this.activePin && this.prepareKnife()
    },
    GameOver: function(a) {
        musicPlayer.playMusic(null);
        appState = APP_STATES.GAME_OVER;
        guiManager.screenSwitcher_openNewScreen(guiManager.screenGameOver);
        logToConsole("GameOver(), vitaj v cieli");
        this.currentGameScore > this.highestScoreAchieved && (this.highestScoreAchieved = this.currentGameScore, this.newHighScore = !0);
        this.currentStage > this.highestStageAchieved && (this.highestStageAchieved = this.currentStage);
        saveAllGameData();
        this.onGameOver(LEVEL_OVER);
    },
    onGameOver: function(a) {
        gradle.event('game_over');
    },
    isLastLevel: function() {
        return gamePlay.currentStage === LEVELS_COUNT_PER_GAME_MODE - 1
    },
    setCoins: function(a) {
        this.coinsCount = a;
        guiManager.screenTop.updateTotalCoinText();
        saveAllGameData()
    },
    incCoins: function(a) {
        this.setCoins(this.coinsCount + a)
    },
    coinsAvailable: function(a) {
        return this.coinsCount >= a
    },
    useCoins: function(a) {
        if (!0 === this.coinsAvailable(a)) return this.incCoins(-a), !0;
        guiManager.screenTop.coinsTextBlink();
        return !1
    },
    resetCurrentGameCollectedCoins: function() {
        this.currentGameCollectedCoins =
            0
    },
    incCollectedCoins: function() {
        this.currentGameCollectedCoins += 1;
        this.incCoins(1)
    },
    debugWriteGameField: function() {
        void 0 == this.debugGameFieldText && (this.debugGameFieldText = game.add.text(10, guiManager.screenGame.screenGroup.upperBarGrp.getChildAt(0).height + 10, ""), this.debugGameFieldText.fill = "#ffffff", this.debugGameFieldText.fontSize = 15, this.debugGameFieldText.lineSpacing = -10);
        for (var a = "", b = 0; b < this.gameBoard.length; b++) {
            for (var c = 0; c < this.gameBoard[0].length; c++) a = this.gameBoard[b][c] === GAME_TILE_EMPTY ?
                a + "  " : a + "+";
            a += "\n"
        }
        this.debugGameFieldText.setText(a)
    },
    debugText: function() {
        this.fpsActual = Math.floor(1E3 / (Date.now() - this.lastUpdate));
        this.lastUpdate = Date.now();
        null == this.dbgText && (this.dbgText = game.add.text(game.width - 10, game.height / 2, "", {
            fill: "#ffffff",
            align: "right"
        }), this.dbgText.anchor.x = 1, this.dbgText.fontSize = 20);
        this.dbgText.text = Math.floor(100 * this.gameTimer) / 100 + "\n" + this.currentWheelRotationStep + "\n" + Math.floor(GAME_MAX_FPS / GAME_AVERAGE_FPS * 10) / 10 + "\n" + this.fpsActual
    }
};
var gameTexts = new GameTexts,
    Splash = function(a) {};
Splash.prototype = {
    preload: function() {
        this.game.load.crossOrigin = "Anonymous";
        this.game.stage.backgroundColor = GAME_BG_COLOR;
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = !0;
        this.scale.refresh();
        loadSplash();
        game.device.desktop || window.addEventListener("resize", function() {
            checkOrientation()
        });
        game.device.desktop && window.addEventListener("resize", function() {
            setBG()
        });
        gameTexts.preload();
        game.device.desktop && game.input.mspointer.stop();
        setCorrectResolution()
    },
    create: function() {
        this._create()
    },
    _create: function() {
        checkOrientation();
        this.startPreloadDelayed(0);
    },
    startPreloadDelayed: function(a) {
        0 === a ? this.startPreload() :
            game.time.events.add(a, this.startPreload, this)
    },
    startPreload: function() {
        game.device.desktop || !1 !== checkOrientation() ? (setCorrectResolution(), game.state.start("StatePreload")) : this.startPreloadDelayed(200)
    }
};

function enterIncorrectOrientation() {
    showDiv("wrongRotation");
    game.onPause.dispatch()
}

function leaveIncorrectOrientation() {
    hideDiv("wrongRotation");
    game.onResume.dispatch()
}

function checkOrientation() {
    var a = !0;
    RUNNING_ON_IOS ? document.documentElement.clientWidth > document.documentElement.clientHeight ? (enterIncorrectOrientation(), a = !1) : leaveIncorrectOrientation() : window.innerWidth > window.innerHeight ? (enterIncorrectOrientation(), a = !1) : leaveIncorrectOrientation();
    return a
}

function setCorrectResolution() {
    resolutionX = Math.floor(window.innerWidth / window.innerHeight * resolutionY);
    game.device.desktop || setBG();
    resolutionX > resolutionX_max && (resolutionX = resolutionX_max);
    resolutionX < resolutionX_min && (resolutionX = resolutionX_min);
    game.scale.setGameSize(resolutionX, resolutionY);
    game.scale.refresh()
}

function setBG() {
    document.body.style.backgroundImage = "url('img/bg.jpg')";
    document.body.style.backgroundSize = "100% 100%";// + window.innerHeight + "px"
}
setBG();
var Preloader = function(a) {};
Preloader.prototype = {
    preload: function() {
        game.stage.backgroundColor = GAME_BG_COLOR;
        loadAllGameData();
        loadLanguageSettings();
        gameTexts.create();
        this.createPreloadBG();
        
		this.preloadGroup.alpha = 0;
        
		loadImages();
        SOUNDS_ENABLED && loadSounds();
        this.game.load.onFileComplete.add(this.fileComplete, this);
    },
    fileComplete: function(a, b, c, d, f) {
        this.preloadText.setText(a + " %")
    },
    create: function() {
        this.startGame();
    },
    startGame: function() {
        game.state.start("StateGame")
    },
    createPreloadBG: function() {
        this.preloadGroup = game.add.group();
        var c = game.make.text(game.width / 2, 22, "0 %", {
            font: "22px Arial",
            fill: TEXT_WHITE_COLOR,
            align: "center",
            wordWrap: !0,
            wordWrapWidth: .85 * 22
        });
        c.lineSpacing = -8;
        setObjectAnchor(c, .5, .5);
        this.preloadGroup.add(c);
        c.makeBigTw = game.add.tween(c.scale).to({
            x: 1.05,
            y: 1.05
        }, 150, Phaser.Easing.Linear.None, !1, 700);
        c.makeSmallTw = game.add.tween(c.scale).to({
            x: 1,
            y: 1
        }, 150, Phaser.Easing.Linear.None, !1, 0);
        c.makeBigTw.onComplete.add(function() {
            c.makeSmallTw.start()
        }, this);
        c.makeSmallTw.onComplete.add(function() {
            c.makeBigTw.start()
        }, this);
        this.preloadText = c
    }
};
var appState, guiManager = new GUI,
    gamePlay = new GamePlay,
    musicPlayer = new GameSounds,
    lastUpdateTimeOffset = 0,
    GameState = function() {};
GameState.prototype = {
    preload: function() {
        guiManager.preload();
        gamePlay.preload();
        game.time.advancedTiming = !0;
        game.input.maxPointers = 1;
        game.physics.startSystem(Phaser.Physics.P2JS)
    },
    create: function() {
        guiManager.create();
        gamePlay.create();
        musicPlayer.create();
        
        game.onPause.add(this.onGamePause, this);
        game.onResume.add(this.onGameResume, this);
        appState = APP_STATES.MENU;
        guiManager.screenSwitcher_openNewScreen(guiManager.screenMainMenu);
        this.fpsList = [];
        this.lastUpdate = Date.now()
    },
    onGamePause: function() {
        musicPlayer.pauseSound();
        guiManager.screenGame.pauseGame()
    },
    onGameResume: function() {
        musicPlayer.resumeSound()
    },
    update: function() {
        lastUpdateTimeOffset = (Date.now() - this.lastUpdate) / 1E3;
        guiManager.update();
        gamePlay.update();
        if (50 > this.fpsList.length) {
            var a = Math.floor(1E3 / (Date.now() - this.lastUpdate));
            a > GAME_MAX_FPS && (a = GAME_MAX_FPS);
            0 !== a && (this.fpsList.push(a), GAME_AVERAGE_FPS = average(this.fpsList))
        }
        this.lastUpdate = Date.now()
    }
};

function updateGameLanguage(a) {
    GAME_LANGUAGE = a;
    gameTexts.loadTexts();
    guiManager.resetScreenTexts()
}

function loadAllGameData() {
    try {
        var a = localStorage.getItem("gradle-data");
        null !== a && (parsedData = JSON.parse(a), null !== parsedData && (tmp = parsedData.knv, gameElements.loadSavedKnives(tmp), tmp = parsedData.knID, 0 <= tmp && tmp <= KNIVES_LIST.length - 1 ? (gamePlay.selectedKnifeID = tmp, !0 === KNIVES_LIST[gamePlay.selectedKnifeID].isLocked && (gamePlay.selectedKnifeID = 0)) : gamePlay.selectedKnifeID = 0, tmp = parsedData.cnz, gamePlay.coinsCount = 0 <= tmp ? tmp : 0, tmp = parsedData.hst, gamePlay.highestStageAchieved = 0 <= tmp ? tmp : 0, tmp = parsedData.hsc,
            gamePlay.highestScoreAchieved = 0 <= tmp ? tmp : 0, SOUNDS_ENABLED && (tmp = parsedData.msc, !0 === tmp || !1 === tmp))) && (musicPlayer.musicON = tmp, game.sound.mute = !tmp)
    } catch (b) {}
}

function saveAllGameData() {
    try {
        localStorage.setItem("gradle-data", JSON.stringify({
            knID: gamePlay.selectedKnifeID,
            msc: musicPlayer.musicON,
            cnz: gamePlay.coinsCount,
            hsc: gamePlay.highestScoreAchieved,
            hst: gamePlay.highestStageAchieved,
            knv: gameElements.getUnlockedKnives()
        }))
    } catch (a) {}
};
var resolutionX_min = 320,
    resolutionX_max = 750,
    resolutionX = resolutionX_max,
    resolutionY = 860;

function ie_ver() {
    var a = 0,
        b = /MSIE (\d+\.\d+);/.test(navigator.userAgent),
        c = !!navigator.userAgent.match(/Trident\/7.0/),
        d = navigator.userAgent.indexOf("rv:11.0");
    b && (a = new Number(RegExp.$1)); - 1 != navigator.appVersion.indexOf("MSIE 10") && (a = 10);
    c && -1 != d && (a = 11);
    return a
}
var selectedRenderer = Phaser.CANVAS;
RUNNING_ON_DESKTOP && (selectedRenderer = Phaser.AUTO);
11 == ie_ver() && (renderer = Phaser.CANVAS);
var game, phaserInit = function() {
    game = new Phaser.Game(resolutionX, resolutionY, selectedRenderer);
    game.transparent = true;
    game.state.add("StatePreload", Preloader);
    game.state.add("StateSplash", Splash);
    game.state.add("StateGame", GameState);
    game.state.start("StateSplash");
};

var kcmp = 0;
window.phsrI = phaserInit;
document.documentElement.style.overflow = "hidden";
document.body.scroll = "no";
window.addEventListener("contextmenu", function(a) {
    a.preventDefault()
});
window.addEventListener("touchend", function() {
    if (null !== game) try {
        "running" !== game.sound.context.state && game.sound.context.resume()
    } catch (a) {}
}, !1);
RUNNING_ON_IOS || (document.addEventListener("touchstart", function(a) {
    a.preventDefault()
}), document.addEventListener("touchmove", function(a) {
    a.preventDefault()
}));
document.body.addEventListener("mousedown", function() {
    RUNNING_ON_DESKTOP && gamePlay.fireKnife()
}, !0);



