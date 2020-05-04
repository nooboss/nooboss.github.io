/**
	       Monkey-Creative
    ***** PROPRIETARY CODE *****

	@licence: Monkey-Creative
    @licence_type : Regular/Extended      https://codecanyon.net/licenses/standard

	@date: 02/16/2019 15:02:00
	copyright @2019

*/

var langFont = 'px "Roboto"';
var resolution = 2;
var isPrivate = false;
var gamePaused = false;
var auto_camera = false;
var day_or_night = Math.round(Math.random()) + 1;
var Score_Objectif = [5e3, 5500, 5500, 1e4, 14e3, 10500, 11e3, 9500, 18500, 12e3, 10500, 17e3, 10300, 9200, 11500, 1e4, 13900, 15800, 22e3, 15e3, 18300, 17e3, 20500, 12e3, 16500, 22500, 17e3, 20500, 2e4, 23400];
var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
if (iOS) {
    window.PhaserGlobal = {
        audioContext: createAudioContext(44100)
    };

    function createAudioContext(desiredSampleRate) {
        var AudioCtor = window.AudioContext || window.webkitAudioContext;
        desiredSampleRate = typeof desiredSampleRate === "number" ? desiredSampleRate : 44100;
        var context = new AudioCtor;
        if (/(iPhone|iPad)/i.test(navigator.userAgent) && context.sampleRate !== desiredSampleRate) {
            var buffer = context.createBuffer(1, 1, desiredSampleRate);
            var dummy = context.createBufferSource();
            dummy.buffer = buffer;
            dummy.connect(context.destination);
            dummy.start(0);
            dummy.disconnect();
            context.close();
            context = new AudioCtor
        }
        return context
    }
}
var Music = {
    enableMisic: true,
    music: null
};
var sauvegarde = [];
var level;
var coins;
var nombre_levels = 30;

function Save_setItem(name, value) {
    if (localStorage) {
        if (!isPrivate) localStorage.setItem(name, value)
    }
}

function Save_getItem(name, pardefaut) {

    if (localStorage) {
        if (!isPrivate){ 
    		var val = localStorage.getItem(name);
    		return val==null?pardefaut:val;
    	}
        else return pardefaut
    } else return pardefaut
}

function save_lire(str1) {
    sauvegarde = [];
    var str = str1.split(",");
    var ligne = 0;
    var ii = 0;
    while (ligne < str.length) {
        sauvegarde[ii] = {
            numetoile: 0,
            bestscore: 0
        };
        sauvegarde[ii].numetoile = +str[ligne++];
        sauvegarde[ii].bestscore = +str[ligne++];
        ii++
    }
}

function save_ecrit() {
    var str = "";
    for (var i = 0; i < nombre_levels; i++) {
        str += "" + sauvegarde[i].numetoile;
        str += ",";
        str += "" + sauvegarde[i].bestscore;
        if (i < nombre_levels - 1) str += ","
    }
    Save_setItem("bubble_spin_sauvegarde", str)
}
bubbleSpin = {};
bubbleSpin.Boot = function (game) {};
bubbleSpin.Boot.prototype = {
    preload: function () {
        this.game.load.image("preloadSprite01", "assets/preloadBar" + resolution + ".png");
        game.load.image("bgPreload", "assets/bgPreload" + resolution + ".png");
        game.load.atlasXML("sprites", "assets/sprites.png", "assets/sprites.xml")
    },
    create: function () {
        this.input.maxPointers = 1;
        if (this.game.device.desktop) {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true
        } else {
            this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
            this.scale.forceOrientation(false, true)
        }
        this.game.scale.enterPortrait.add(this.rescale, this);
        this.game.scale.enterLandscape.add(this.rescale, this);
        this.game.onResume.add(this.rescale, this);
        this.scale.setScreenSize(true);
        this.game.state.start("preload")
    },
    rescale: function () {
        var _game = this.game;
        setTimeout(function () {
            _game.scale.refresh();
            setTimeout(function () {
                _game.scale.refresh()
            }, 400)
        }, 400)
    }
};
text = {
    textCongratulations: "Congratulations!",
    textFinished: "You finished\nall levels.\nPlay again and\ntry to get a\nhigher score.",
    youwin: "Level\nComplete!",
    txtPause: "PAUSE",
    txtgameover: "Game Over",
    txttryagain: "Try Again ?",
    txtlevel: "Stage ",
    txtscore: "Score",
    txttotalscore: "Total Score",
    txtbest: "HIGH SCORE: ",
    txthighscore: "High Score",
    txttutorial: "Tutorial",
    txttuto1: "Clear bubbles and\npop the star!",
    txt_great: "GREAT!",
    txt_amazing: "AMAZING!",
    txt_fantastic: "FANTASTIC!"
};
bubbleSpin.Preload = function (game) {};
bubbleSpin.Preload.prototype = {
    preload: function () {
        game.add.sprite(0, 0, "bgPreload");
        var progressBar = game.add.image(44.5 * resolution, 279.8 * resolution, "preloadSprite01");
        game.load.setPreloadSprite(progressBar);
        
        game.load.spritesheet("obj", "assets/obj" + resolution + ".png", 21 * resolution, 21 * resolution);
        game.load.spritesheet("bomb_effect", "assets/bomb_effect" + resolution + ".png", 72 * resolution, 72.5 * resolution);
        game.load.spritesheet("laser_effect", "assets/laser_effect" + resolution + ".png", 32 * resolution, 32 * resolution);
        game.load.spritesheet("star_effect", "assets/star_effect" + resolution + ".png", 128 * resolution, 128 * resolution);
        game.load.image("bgPlay", "assets/bgPlay" + resolution + ".png");
        game.load.image("bgPlay2", "assets/bgPlay2" + resolution + ".png");
        game.load.image("bgMenu", "assets/bgMenu" + resolution + ".png");
        game.load.image("etoile_particule", "assets/etoile_particule" + resolution + ".png");
        game.load.image("stars_bar", "assets/stars_bar" + resolution + ".png");
        game.load.tilemap("map", "assets/levelsGame" + resolution + ".json", null, Phaser.Tilemap.TILED_JSON);
        game.load.image("tiles", "assets/obj" + resolution + ".png");
        game.load.image("bgnoire", "assets/bgnoire" + resolution + ".png");
        game.load.audio("song17", ["assets/music/song17.mp3", "assets/music/song17.ogg"]);
        if (this.game.device.ie) {
            game.load.audio("sounds", ["assets/music/sounds.ogg", "assets/music/sounds.mp3"])
        } else if (this.game.sound.usingWebAudio) {
            game.load.audio("sounds", ["assets/music/sounds.ogg", "assets/music/sounds.mp3"])
        }
        this.ready = false
    },
    create: function () {
        if (game.device.localStorage) {
            this.TestPrivate();
            var str = Save_getItem("bubble_spin_sauvegarde", null);
            level = Save_getItem("bubble_spin_level", 0);
            highscore = Save_getItem("bubble_spin_highscore", 0);
            if (str == null || str == "null" || level == null || level == "null") {
                sauvegarde = [];
                for (var i = 0; i < nombre_levels; i++) {
                    sauvegarde[i] = {
                        numetoile: 0,
                        bestscore: 0
                    }
                }
                save_ecrit();
                level = 0;
                Save_setItem("bubble_spin_level", level);
                highscore = 0;
                Save_setItem("bubble_spin_highscore", highscore)
            } else {
                save_lire(str)
            }
        }
    },
    TestPrivate: function () {
        var testKey = "qeTest",
            storage = window.sessionStorage;
        try {
            storage.setItem(testKey, "1");
            storage.removeItem(testKey)
        } catch (error) {
            if (error.code === DOMException.QUOTA_EXCEEDED_ERR && storage.length === 0) {
                isPrivate = true
            } else {
                isPrivate = false
            }
        }
    },
    update: function () {
        if (game.cache.isSoundDecoded("song17") && this.ready == false) {
			gradle.event('start_session');
            this.ready = true;
            game.onPause.add(function () {
                gamePaused = true;
                Music.music.pause();
                Music.sounds.pause();
            }, this);
            game.onResume.add(function () {
                gamePaused = false;
                if (Music.enableMisic) {
                    Music.music.resume();
                    Music.sounds.resume();
                }
            }, this);
            this.game.state.start("menu");
            play.numLevel = parseInt(level) + 1;
            Music.music = this.game.add.audio("song17");
            Music.music.volume = .5;
            Music.sounds = this.game.add.audio("sounds");
            Music.sounds.addMarker("bomb", 0, 1.123265306122449);
            Music.sounds.addMarker("button", 3, .058684807256236);
            Music.sounds.addMarker("colored", 5, 3.430748299319728);
            Music.sounds.addMarker("pop", 10, .404489795918368);
            Music.sounds.addMarker("star_pop", 12, 2.15827664399093);
            Music.sounds.addMarker("whoosh", 16, .99265306122449);
            Music.sounds.addMarker("win", 18, 1.30360544217687);
            Music.sounds.addMarker("goodjob", 21, .648004535147393);
            Music.sounds.addMarker("powerup", 23, .809727891156463);
            Music.sounds.addMarker("shoot", 25, .170045351473924);
            Music.sounds.addMarker("hit", 27, .340068027210883);
            Music.music.play();
            Music.music.onStop.add(function () {
                if (gamePaused){
                    return;
                }
                if (Music.enableMisic) Music.music.play()
            }, this)
        }
    }
};
var Bouton = function (game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame) {
    Phaser.Button.call(this, game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame);
    this.anchor.setTo(.5, .5);
    this.onInputDown.add(function () {
        if (this.frameName != "change_bubble" + resolution + ".png") {
            game.add.tween(this.scale).to({
                x: 1.15,
                y: .8
            }, 200, Phaser.Easing.Back.Out, true, 0).to({
                x: 1,
                y: 1
            }, 400, Phaser.Easing.Elastic.Out, true);
            game.add.tween(this).to({
                angle: 3
            }, 150, Phaser.Easing.Quadratic.Out, true).to({
                angle: -5
            }, 150, Phaser.Easing.Quadratic.Out, true).to({
                angle: 0
            }, 200, Phaser.Easing.Quadratic.Out, true)
        }
        if (Music.enableMisic && game.sound.usingWebAudio) Music.sounds.play("button");
        if (this.txt) {
            game.world.bringToTop(this.txt);
            if (this.frameName != "change_bubble" + resolution + ".png") {
                game.add.tween(this.txt.scale).to({
                    x: 1.15,
                    y: .8
                }, 200, Phaser.Easing.Back.Out, true, 0).to({
                    x: 1,
                    y: 1
                }, 400, Phaser.Easing.Elastic.Out, true);
                game.add.tween(this.txt).to({
                    y: this.txt.y + 10 * resolution
                }, 150, Phaser.Easing.Quadratic.Out, true).to({
                    y: this.txt.y
                }, 150, Phaser.Easing.Quadratic.Out, true)
            }
        }
    }, this);
    this.onInputUp.add(function () {
        if (this.txt) {
            game.world.bringToTop(this.txt)
        }
    }, this);
    this.onInputOver.add(function () {}, this)
};
Bouton.prototype = Object.create(Phaser.Button.prototype);
Bouton.prototype.constructor = Bouton;
bubbleSpin.Menu = function (game) {
    this.musicbnt = null;
    this.bnt_play = null;
    this.bnt_moregames = null;
    this.state = null;
    this.menu_bubbles = null
};
bubbleSpin.Menu.prototype = {
    create: function () {
        this.add.image(0, 0, "bgMenu");
        this.menu_bubbles = game.add.sprite(game.width / 2, 180 * resolution, "sprites", "menu_bubbles" + resolution + ".png");
        this.menu_bubbles.anchor.setTo(.5, .5);
        this.menu_bubbles.scale.setTo(0, 0);
        game.add.tween(this.menu_bubbles.scale).to({
            x: 1,
            y: 1
        }, 600, Phaser.Easing.Back.Out, false, 400).start();
        game.add.tween(this.menu_bubbles).to({
            angle: 360
        }, 3e3, Phaser.Easing.Quadratic.Out, false, 400).start();
        var logo_part1 = game.add.sprite(-game.width / 2, 60 * resolution, "sprites");
        logo_part1.frameName = "logo_part1" + resolution + ".png";
        logo_part1.anchor.setTo(.5, .5);
        logo_part1.scale.setTo(0, 0);
        game.add.tween(logo_part1).to({
            x: game.width / 2
        }, 500, Phaser.Easing.Circular.Out, false, 1e3).start();
        game.add.tween(logo_part1.scale).to({
            x: 1,
            y: 1
        }, 600, Phaser.Easing.Back.Out, false, 1e3).start();
        var logo_part2 = game.add.sprite(game.width + game.width / 2, 105 * resolution, "sprites");
        logo_part2.frameName = "logo_part2" + resolution + ".png";
        logo_part2.anchor.setTo(.5, .5);
        logo_part2.scale.setTo(0, 0);
        game.add.tween(logo_part2).to({
            x: game.width / 1.6
        }, 500, Phaser.Easing.Circular.Out, false, 1500).start();
        game.add.tween(logo_part2.scale).to({
            x: 1,
            y: 1
        }, 600, Phaser.Easing.Back.Out, false, 1500).start();
        this.bnt_play = new Bouton(this.game, game.width / 2, 330 * resolution, "sprites", this.actionPlay, this);
        this.bnt_play.frameName = "playbtn" + resolution + ".png";
        this.world.add(this.bnt_play);
        this.bnt_play.scale.setTo(0, 0);
        game.add.tween(this.bnt_play.scale).to({
            x: 1,
            y: 1
        }, 400, Phaser.Easing.Back.Out).start().onComplete.add(function () {
            game.time.events.add(100, function () {
                game.add.tween(this.bnt_play.scale).to({
                    x: 1.15,
                    y: .8
                }, 500, Phaser.Easing.Back.Out, false, 3e3).to({
                    x: 1,
                    y: 1
                }, 400, Phaser.Easing.Elastic.Out).loop().start()
            }, this);
            game.time.events.add(1200, function () {
                logo_part1.scale.setTo(1, 1);
                logo_part2.scale.setTo(1, 1);
                game.add.tween(logo_part1.scale).to({
                    x: .8,
                    y: 1.15
                }, 500, Phaser.Easing.Back.Out, false, 3e3).to({
                    x: 1,
                    y: 1
                }, 400, Phaser.Easing.Elastic.Out).loop().start();
                game.add.tween(logo_part2.scale).to({
                    x: .8,
                    y: 1.15
                }, 500, Phaser.Easing.Back.Out, false, 3e3).to({
                    x: 1,
                    y: 1
                }, 400, Phaser.Easing.Elastic.Out).loop().start()
            }, this)
        }, this);
        this.bnt_moregames = new Bouton(this.game, game.width / 2 - 90 * resolution, 360 * resolution, "sprites", this.funcmoregames, this);
        this.bnt_moregames.frameName = "moreg" + resolution + ".png";
        //this.world.add(this.bnt_moregames);
        this.bnt_moregames.scale.setTo(0, 0);
        game.add.tween(this.bnt_moregames.scale).to({
            x: 1,
            y: 1
        }, 400, Phaser.Easing.Back.Out, false, 1200).start();
        this.musicbnt = new Bouton(this.game, game.width / 2 + 0 * resolution, 390 * resolution, "sprites", this.actionMusic, this);
        this.musicbnt.frameName = "musicbnt" + resolution + ".png";
        this.world.add(this.musicbnt);
        this.musicbnt.scale.setTo(0, 0);
        game.add.tween(this.musicbnt.scale).to({
            x: 1,
            y: 1
        }, 400, Phaser.Easing.Back.Out, false, 1400).start();
        if (Music.enableMisic) {
            this.musicbnt.frameName = "musicbnt" + resolution + ".png"
        } else {
            this.musicbnt.frameName = "Mutemusicbnt" + resolution + ".png"
        }
        document.body.style.backgroundImage = 'url("assets/big_bg_game22.png")';
        game.time.events.add(0, function () {
            // this.analytics_call()
        }, this)
    },
    // analytics_call: function () {
        // if (typeof analytics === "undefined" || typeof analytics === undefined) {
        //     game.time.events.add(3e3, function () {
        //         this.analytics_call()
        //     }, this)
        // } else analytics.menu()
    // },
    actionMusic: function () {
        Music.enableMisic = !Music.enableMisic;
        if (Music.enableMisic) {
			gradle.event('enable_music');
            this.musicbnt.frameName = "musicbnt" + resolution + ".png";
            Music.music.resume()
        } else {
			gradle.event('disable_music');
            this.musicbnt.frameName = "Mutemusicbnt" + resolution + ".png";
            Music.music.pause()
        }
    },
    actionPlay: function () {
		gradle.event('button_play');
        play.InitialiseFade("play");
    },
    funccredits: function () {
        play.InitialiseFade("credits")
    },
    funcmoregames: function () {
        //moregames.redirect()
    },
    update: function () {}
};
bubbleSpin.Credits = function (game) {
    this.bnt_home = null
};
bubbleSpin.Credits.prototype = {
    create: function () {
        this.add.image(0, 0, "credits");
        this.bnt_home = new Bouton(this.game, game.width / 2, 0, "sprites", this.funcHome, this);
        this.bnt_home.frameName = "menubnt" + resolution + ".png";
        this.world.add(this.bnt_home)
    },
    funcHome: function () {
        play.InitialiseFade("menu")
    },
    update: function () {
        if (this.bnt_home.y < 35 * resolution) {
            this.bnt_home.y += 5
        }
    }
};
bubbleSpin.Play = function (game) {
    this.numLevel = null;
    this.gameOver = false;
    this.next_level = null;
    this.bnt_pause = null;
    this.bnt_replay = null;
    this.bgPause = null;
    this.start = null;
    this.groupPause = null;
    this.groupNexLevel = null;
    this.textPause = null;
    this.textPauseLevel = null;
    this.etoilEnd1 = null;
    this.etoilEnd2 = null;
    this.etoilEnd3 = null;
    this.timerEndLevel = null;
    this.timerEndLevelAndLose = null;
    this.istimerEndLevel = null;
    this.istimerEndLevelAndLose = null;
    this.isEndAllLevels = null;
    this.stateMusic = null;
    this.bgnoire = null;
    this.you_win = null;
    this.group_sprites = null;
    this.tailleX = null;
    this.tailleY = null;
    this.rows = null;
    this.cols = null;
    this.beginX = null;
    this.beginY = null;
    this.new_frame = null;
    this.current_score = null;
    this.txt_score = null;
    this.txt_best_score = null;
    this.txt_level = null;
    this.crop_width = null;
    this.stars = null;
    this.number_etoiles = null;
    this.tw_stop_time = null;
    this.nbr_tween_started = null;
    this.txt_score_win = null;
    this.mat_fruits = null;
    this.mat_types = null;
    this.bubble_shoot = null;
    this.next_bubble = null;
    this.trajectoire = null;
    this.limit_left = null;
    this.limit_right = null;
    this.to_lose_up = null;
    this.to_lose_down = null;
    this.to_lose_right = null;
    this.to_lose_left = null;
    this.vect_bubbles_match = null;
    this.vect_bubbles_fall = null;
    this.map = null;
    this.layer = null;
    this.shooter_head = null;
    this.CanShoot = null;
    this.touched_bubble = null;
    this.objectif_etoiles = null;
    this.next_bubble_frame = null;
    this.bubbles_living = null;
    this.tuto = null;
    this.timer_animation = null;
    this.diffY = null;
    this.bubble_bigger_y = null;
    this.vect_frames = null;
    this.bnt_change_bubble = null;
    this.debut = null;
    this.fin_win = null;
    this.new_x = null;
    this.new_y = null;
    this.new_i = null;
    this.new_j = null;
    this.vitesse_shot = null;
    this.first_row = null;
    this.last_row = null;
    this.rope = null;
    this.bubble_on_top = null;
    this.center_sprite = null;
    this.shots_to_add = null;
    this.counter_pw = null;
    this.limit_bottom = null;
    this.limit_top = null;
    this.tween_angle = null;
    this.compteur_repeat = null;
    this.compteur_frame = null;
    this.isAddingBubbles = null;
    this.bgPlay = null;
    this.bnt_music = null;
    this.ispause_music = null;
    this.txt_newstage = null;
    this.bg_newstage = null;
    this.newbubble_prov = null;
    this.newbubble_filled = null
};
bubbleSpin.Play.prototype = {
    create: function () {
        this.groupNexLevel = null;
		play.numLevel = Save_getItem('bubble_spin_level', 1);
		if(play.numLevel==0) play.numLevel=1;
        this.initAtributs();
        if (day_or_night == 1) {
            this.bgPlay = game.add.image(0, 0, "bgPlay");
            document.body.style.backgroundImage = 'url("assets/big_bg_game2.png")'
        } else {
            this.bgPlay = game.add.image(0, 0, "bgPlay2");
            document.body.style.backgroundImage = 'url("assets/big_bg_game22.png")'
        }
        this.limit_bottom = game.add.image(0, 360 * resolution, "sprites", "limit" + resolution + ".png");
        this.limit_top = game.add.image(0, 52 * resolution, "sprites", "limit" + resolution + ".png");
		if (this.numLevel > nombre_levels) {
            this.createCongratulations();
            this.gameOver = true;
            return
        }
        this.newbubble_filled = false;
        this.newbubble_prov = null;
        this.txt_score_win = null;
        this.isAddingBubbles = 0;
        this.compteur_frame = 0;
        this.compteur_repeat = 0;
        this.counter_pw = 5;
        this.shots_to_add = 8;
        this.bubble_on_top = null;
        this.center_sprite = null;
        this.new_x = 0;
        this.new_y = 0;
        this.new_i = 0;
        this.new_j = 0;
        this.fin_win = false;
        this.tuto = null;
        this.group_sprites = null;
        this.debut = true;
        this.number_etoiles = 0;
        this.nbr_tween_started = 0;
        this.CanShoot = 0;
        this.touched_bubble = null;
        this.bubbles_living = 0;
        this.timer_animation = -1;
        this.bubble_bigger_y = -1e5;
        this.vect_bubbles_match = [];
        this.vect_bubbles_fall = [];
        this.tailleX = 19 * resolution;
        this.tailleY = 21 * resolution;
        this.rows = 15;
        this.cols = 15;
        this.beginX = 16 * resolution;
        this.beginY = 62 * resolution;
        this.limit_left = 10 * resolution;
        this.limit_right = 310 * resolution;
        this.diffY = 0;
        this.to_lose_up = this.limit_top.y;
        this.to_lose_down = this.limit_bottom.y + 5 * resolution;
        this.to_lose_right = game.width;
        this.to_lose_left = 0;
        this.ispause_music = false;
        this.map = game.add.tilemap("map");
        this.map.currentLayer = this.numLevel - 1;
        this.mat_fruits = [];
        for (var m = 0; m < this.cols; m++) {
            this.mat_fruits[m] = [];
            for (var k = 0; k < this.rows; k++) {
                this.mat_fruits[m][k] = null
            }
        }
        this.mat_types = [];
        for (var x = 0; x < this.cols; x++) {
            this.mat_types[x] = [];
            for (var y = 0; y < this.rows; y++) {
                this.mat_types[x][y] = this.map.getTile(y, x).index - 1
            }
        }
        this.group_sprites = game.add.group();
        this.trajectoire = game.add.sprite(169 * resolution, 382 * resolution, "sprites", 0);
        this.trajectoire.frameName = "trajectoire0.png";
        this.trajectoire.anchor.setTo(0, .5);
        this.trajectoire.angle = -90;
        this.shooter_head = game.add.sprite(game.width / 2, 400 * resolution, "sprites", "shoot_mark" + resolution + ".png");
        this.shooter_head.anchor.setTo(.5, .5);
        this.trajectoire.x = 169 * resolution;
        this.trajectoire.y = 395.5 * resolution;
        this.bnt_change_bubble = new Bouton(this.game, game.width / 2, 400 * resolution, "sprites", this.ExchangeBubbles, this);
        this.bnt_change_bubble.frameName = "change_bubble" + resolution + ".png";
        this.bnt_change_bubble.alpha = 0;
        this.game.world.add(this.bnt_change_bubble);
        var rnd_i = Math.floor(Math.random() * (this.cols - .1));
        var rnd_j = Math.floor(Math.random() * 4.9);
        if (this.mat_fruits[rnd_i][rnd_j]) this.next_bubble = game.add.sprite(146.55 * resolution, 409.5 * resolution, "obj", this.mat_fruits[rnd_i][rnd_j].frame);
        else this.next_bubble = game.add.sprite(146.55 * resolution, 409.5 * resolution, "obj", Math.floor(Math.random() * 6.9 + 1));
        this.bubble_shoot = null;
        game.input.onUp.add(this.TapUp, this);
        game.input.onDown.add(this.TapDown, this);
        this.vect_frames = [{
            frame: 0,
            isUsed: false
        }, {
            frame: 0,
            isUsed: false
        }, {
            frame: 0,
            isUsed: false
        }, {
            frame: 0,
            isUsed: false
        }, {
            frame: 0,
            isUsed: false
        }, {
            frame: 0,
            isUsed: false
        }, {
            frame: 0,
            isUsed: false
        }];
        var i = 0;
        while (i < this.vect_frames.length && this.vect_frames[i].frame == 0) {
            var rnd_frame = Math.floor(Math.random() * 6.9 + 1);
            if (!this.vect_frames[rnd_frame - 1].isUsed) {
                this.vect_frames[i].frame = rnd_frame;
                this.vect_frames[rnd_frame - 1].isUsed = true;
                i++
            }
        }
        this.first_row = this.rows;
        this.last_row = -1;
        this.init_bubbles();
        this.Select_New_Frame();
        this.next_bubble.frame = this.new_frame;
        this.next_bubble.anchor.setTo(.5, .5);
        this.next_bubble.scale.setTo(.9, .9);
        this.next_bubble.isShooted = false;
        this.next_bubble.to_kill = false;
        this.next_bubble.not_falling = false;
        game.physics.enable(this.next_bubble);
        this.next_bubble.body.setSize(15 * resolution, 14.5 * resolution, 0, resolution);
        this.next_bubble_frame = this.next_bubble.frame;
        this.MoveNextBubble();
        game.time.events.add(500, function () {
            this.bubble_shoot = this.newbubble_prov;
            play.newbubble_prov = null
        }, this);
        game.add.sprite(8 * resolution, 0, "sprites").frameName = "hud_top" + resolution + ".png";
        this.createButtonsPlay();
        this.current_score = 0;
        this.txt_score = game.add.text(0, 0, "" + this.current_score, {
            font: 23 * resolution + langFont,
            align: "center",
            fill: "#ffffff",
            stroke: "#000000",
            strokeThickness: 4 * resolution
        });
        this.txt_score.x = 159 * resolution - this.txt_score.width / 2;
        highscore = +Save_getItem("bubble_spin_highscore", 0);
        this.txt_best_score = game.add.text(118 * resolution, 27.5 * resolution, text.txtbest + highscore, {
            font: 11 * resolution + langFont,
            align: "center",
            fill: "#ffd200",
            stroke: "#000000",
            strokeThickness: 2 * resolution
        });
        this.txt_level = game.add.text(12 * resolution, 5 * resolution, text.txtlevel + "\n" + play.numLevel, {
            font: 15 * resolution + langFont,
            align: "center",
            fill: "#ffffff",
            stroke: "#000000",
            strokeThickness: 2 * resolution
        });
        this.bg_newstage = game.add.sprite(-game.width / 2, game.height / 2, "sprites", "bgNewStage" + resolution + ".png");
        this.bg_newstage.anchor.setTo(.5, .5);
        this.txt_newstage = game.add.text(this.bg_newstage.x, this.bg_newstage.y, text.txtlevel + " " + play.numLevel, {
            font: 23 * resolution + langFont,
            align: "center",
            fill: "#ffffff",
            stroke: "#000000",
            strokeThickness: 2 * resolution
        });
        this.txt_newstage.x = this.bg_newstage.x - this.txt_newstage.width / 2 + 2 * resolution;
        this.txt_newstage.y = this.bg_newstage.y - this.txt_newstage.height / 2 + 15 * resolution;
        this.objectif_etoiles = Score_Objectif[play.numLevel - 1];
        this.stars = game.add.sprite(67.5 * resolution, 41.5 * resolution, "stars_bar");
        this.stars.initWidth = this.stars.width;
        this.stars.crop_rect = {
            x: 0,
            y: 0,
            width: 0,
            height: this.stars.height
        };
        this.crop_width = this.stars.width / highscore;
        this.stars.crop(this.stars.crop_rect);
        this.Debut_Monter_Bubbles();
        this.bg_noire = game.add.image(0, 0, "bgnoire");
        this.bg_noire.alpha = .7;
        this.bg_noire.visible = false;
        this.bg_noire.alive = true;
        this.createPause();
		
    },
    initAtributs: function () {
        this.stateMusic = Music.enableMisic;
        this.timerEndLevel = null;
        this.timerEndLevelAndLose = null;
        this.istimerEndLevel = false;
        this.istimerEndLevelAndLose = false;
        this.gameOver = false;
        this.you_win = false;
        this.pausePlay = false;
        this.isEndAllLevels = false;
        if (game.device.desktop) {
            this.tw_stop_time = 200;
            this.vitesse_bubble = 650 * resolution;
            this.vitesse_shot = 16
        } else {
            this.vitesse_bubble = 400 * resolution;
            this.tw_stop_time = 150;
            this.vitesse_shot = 11
        }
    },
    createButtonsPlay: function () {
        this.bnt_pause = new Bouton(this.game, 0, 0, "sprites", this.funcPause, this);
        this.bnt_pause.frameName = "pausebnt" + resolution + ".png";
        this.bnt_pause.x = 290 * resolution;
        this.bnt_pause.y = 25 * resolution;
        this.game.world.add(this.bnt_pause);
    },
    game_over: function () {
		Save_setItem('level',play.numLevel);
		gradle.event('game_over');
		
        if (Music.enableMisic && game.sound.usingWebAudio) Music.sounds.play("whoosh");
        this.gameOver = true;
        this.bnt_pause.visible = false;
        this.bg_noire.visible = true;
        this.groupPause.forEachAlive(function (obj) {
            obj.visible = true
        }, this);
        this.resumebtn.visible = false;
        this.menubntt.x = 118 * resolution;
        this.bnt_replay.x = this.menubntt.x + 82 * resolution;
        this.textPauseLevel.setText(text.txtgameover);
        this.textPauseLevel._fontSize -= 4 * resolution;
        this.textPauseLevel.updateText();
        this.textPauseLevel.x = game.width / 2 - this.textPauseLevel.textWidth / 2;
        this.textPause.setText(text.txttryagain);
        this.textPause.updateText();
        this.textPause.x = game.width / 2 - this.textPause.textWidth / 2;
        this.groupPause.y = 400 * resolution;
        game.world.bringToTop(this.bg_noire);
        game.world.bringToTop(this.groupPause);
        this.groupPause.setAll("alpha", 0);
        game.add.tween(this.groupPause).to({
            y: -65 * resolution
        }, 350, Phaser.Easing.Quadratic.Out, true, 100).to({
            y: 0
        }, 200, Phaser.Easing.Quadratic.Out, true, 70);
        game.world.bringToTop(this.bg_noire);
        game.world.bringToTop(this.groupPause);
        this.groupPause.forEach(function (obj) {
            game.add.tween(obj).to({
                alpha: 1
            }, 600, Phaser.Easing.Quadratic.Out, true, 150)
        }, this)
    },
    createPause: function () {
		
		
        this.bgPause = new Phaser.Sprite(this.game, 40 * resolution, 140 * resolution, "sprites");
        this.bgPause.frameName = "bgPause" + resolution + ".png";
        this.bgPause.x = game.width / 2;
        this.bgPause.y = game.height / 2;
        this.bgPause.anchor.setTo(.5, .5);
        this.bgPause.alive = true;
        this.menubntt = new Bouton(this.game, 105 * resolution, 290 * resolution, "sprites", this.funcBack, this);
        this.menubntt.frameName = "levelsbnt" + resolution + ".png";
        this.menubntt.alive = true;
        this.resumebtn = new Bouton(this.game, this.menubntt.x + 55 * resolution, 265 * resolution, "sprites", this.funcResume, this);
        this.resumebtn.frameName = "resumebnt" + resolution + ".png";
        this.resumebtn.alive = true;
        this.bnt_music = new Bouton(this.game, this.menubntt.x + 55 * resolution, 310 * resolution, "sprites", this.actionMusic, this);
        this.bnt_music.frameName = "music_on" + resolution + ".png";
        this.bnt_music.alive = true;
        this.bnt_replay = new Bouton(this.game, this.resumebtn.x + 55 * resolution, 290 * resolution, "sprites", this.funReplay, this);
        this.bnt_replay.frameName = "daynightbnt" + resolution + ".png";
        this.bnt_replay.alive = true;
        this.groupPause = this.game.add.group();
        this.groupPause.add(this.bgPause);
        this.groupPause.add(this.resumebtn);
        this.groupPause.add(this.menubntt);
        this.groupPause.add(this.bnt_replay);
        this.groupPause.add(this.bnt_music);
        this.textPause = game.add.text(0, 215 * resolution, text.txtPause, {
            font: 23 * resolution + langFont,
            align: "center",
            fill: "#ffffff",
            stroke: "#000000",
            strokeThickness: 2 * resolution
        });
        this.textPause.alive = true;
        this.textPause.align = "center";
        this.textPause.x = this.bgPause.x - this.textPause.width / 2;
        this.textPauseLevel = new Phaser.Text(game, 0, 200 * resolution, text.txtPause, {
            font: 23 * resolution + langFont,
            align: "center",
            fill: "#ffffff",
            stroke: "#7a4e00",
            strokeThickness: 2 * resolution
        });
        this.textPauseLevel.alive = true;
        this.textPauseLevel.x = this.bgPause.x - this.textPauseLevel.width / 2;
        this.groupPause.add(this.textPause);
        this.groupPause.forEachAlive(function (obj) {
            obj.visible = false;
        }, this);
        this.groupPause.y = 400 * resolution;

    },
    createCongratulations: function () {
		gradle.event('congratulations');
        this.isEndAllLevels = true;
        this.numLevel = nombre_levels;
        level = sauvegarde.length - 1;
        Save_setItem("bubble_spin_level", sauvegarde.length - 1);
        this.game.add.sprite(0, 0, "bgnoire").alpha = .7;
        var bg = this.game.add.sprite(10 * resolution, 35 * resolution, "sprites", "bgWin" + resolution + ".png");
        bg.anchor.setTo(.5, .5);
        bg.x = game.width / 2;
        bg.y = game.height / 2;
        var b = new Bouton(this.game, 160 * resolution, 348 * resolution, "sprites", function () {
            play.InitialiseFade("menu")
        }, this);
        b.frameName = "resumebnt" + resolution + ".png";
        var txt_cong = game.add.text(0, 123 * resolution, text.textCongratulations, {
            font: 15 * resolution + langFont,
            align: "center",
            fill: "#ffffff",
            stroke: "#7a4e00",
            strokeThickness: 3 * resolution
        });
        txt_cong.align = "center";
        txt_cong.x = game.width / 2 - txt_cong.width / 2;
        var tt = game.add.text(0, 190 * resolution, text.textFinished, {
            font: 20 * resolution + langFont,
            align: "center",
            fill: "#ffffff",
            stroke: "#7a4e00",
            strokeThickness: 3 * resolution
        });
        tt.align = "center";
        tt.x = game.width / 2 - tt.width / 2;
        this.world.add(b)
    },
    createNextLevel: function () {
		//gradle.event('game_over');
        if (Music.enableMisic && game.sound.usingWebAudio) Music.sounds.play("whoosh");
        game.time.events.add(100, function () {
            if (Music.enableMisic && game.sound.usingWebAudio) Music.sounds.play("win")
        }, this);
        this.you_win = true;
        this.bnt_pause.visible = false;
        this.bgPause.frameName = "bgWin" + resolution + ".png";
        this.bg_noire.visible = true;
        this.groupNexLevel = this.game.add.group();
        this.menubntt.x += 15 * resolution;
        this.bnt_replay.x -= 15 * resolution;
        this.menubntt.y = this.bnt_replay.y = 335 * resolution;
        this.bnt_replay.frameName = "replaybnt" + resolution + ".png";
        this.groupNexLevel.add(this.bgPause);
        this.groupNexLevel.add(this.menubntt);
        this.groupNexLevel.add(this.bnt_replay);
        var txt_stage = game.add.text(0, 160 * resolution, text.txtlevel + play.numLevel, {
            font: 20 * resolution + langFont,
            align: "center",
            fill: "#ffffff",
            stroke: "#000000",
            strokeThickness: 2 * resolution
        });
        txt_stage.x = game.width / 2 - txt_stage.width / 2;
        this.groupNexLevel.add(txt_stage);
        var txt_tt_score = game.add.text(0, 190 * resolution, text.txttotalscore, {
            font: 14 * resolution + langFont,
            align: "center",
            fill: "#ffffff",
            stroke: "#000000",
            strokeThickness: 1.5 * resolution
        });
        txt_tt_score.x = game.width / 2 - txt_tt_score.width / 2;
        this.groupNexLevel.add(txt_tt_score);
        this.txt_score_win = game.add.text(0, 210 * resolution, "" + this.current_score, {
            font: 25 * resolution + langFont,
            align: "center",
            fill: "#ffffff",
            stroke: "#000000",
            strokeThickness: 2 * resolution
        });
        this.groupNexLevel.add(this.txt_score_win);
        var txt_highscore_word = game.add.text(0, 252 * resolution, text.txthighscore, {
            font: 14 * resolution + langFont,
            align: "center",
            fill: "#ffffff",
            stroke: "#000000",
            strokeThickness: 2 * resolution
        });
        txt_highscore_word.x = game.width / 2 - txt_highscore_word.width / 2;
        this.groupNexLevel.add(txt_highscore_word);
        var txt_highscore = game.add.text(0, 269 * resolution, "" + highscore, {
            font: 22 * resolution + langFont,
            align: "center",
            fill: "#ffffff",
            stroke: "#000000",
            strokeThickness: 2 * resolution
        });
        txt_highscore.x = game.width / 2 - txt_highscore.width / 2;
        this.groupNexLevel.add(txt_highscore);
        var medal = new Phaser.Sprite(game, 235 * resolution, 265 * resolution, "sprites", "medal" + resolution + ".png");
        medal.anchor.setTo(.5, .5);
        medal.scale.setTo(0, 0);
        this.groupNexLevel.add(medal);
        if (highscore > +Save_getItem("bubble_spin_highscore", 0)) {
            Save_setItem("bubble_spin_highscore", highscore);
            game.add.tween(medal.scale).to({
                x: 1,
                y: 1
            }, 350, Phaser.Easing.Back.Out, false, 800).start().onComplete.add(function () {
                game.add.tween(this.scale).to({
                    x: 1.2,
                    y: 1.2
                }, 200, Phaser.Easing.Linear.None).to({
                    x: 1,
                    y: 1
                }, 200, Phaser.Easing.Back.Out).start();
                var emitter = game.add.emitter(medal.x, medal.y - 15 * resolution, 12);
                emitter.makeParticles("etoile_particule");
                emitter.setAlpha(1, .5, 500, Phaser.Easing.Linear.None);
                emitter.minParticleSpeed.setTo(-150, -150);
                emitter.maxParticleSpeed.setTo(150, 150);
                emitter.start(true, 1e3, 12, 12)
            }, medal);
            game.add.tween(medal).to({
                angle: 360
            }, 350, Phaser.Easing.Quadratic.Out, false, 800).start()
        }
        this.groupNexLevel.y = 400 * resolution;
        this.groupNexLevel.forEach(function (obj) {
            if (obj != this.etoilEnd1 && obj != this.etoilEnd2 && obj != this.etoilEnd3) obj.alpha = 0
        }, this);
        game.add.tween(this.groupNexLevel).to({
            y: -65 * resolution
        }, 350, Phaser.Easing.Quadratic.Out, true, 100).to({
            y: 0
        }, 200, Phaser.Easing.Quadratic.Out, true, 70);
        game.world.bringToTop(this.bg_noire);
        game.world.bringToTop(this.groupNexLevel);
        this.groupNexLevel.forEach(function (obj) {
            if (obj.frameName != "etoile" + resolution + ".png") game.add.tween(obj).to({
                alpha: 1
            }, 600, Phaser.Easing.Quadratic.Out, true, 150)
        }, this);
        this.groupNexLevel.forEachAlive(function (obj) {
            obj.visible = true
        }, this);
        // if (enableAds && Ctr > adFreq) {
        //     adSense.showAdvertising({
        //         callback: function () {
        //             game.paused = false
        //         }
        //     });
        //     Ctr = 0
        // }
        // analytics.level(play.numLevel);
        // analytics.score(+play.txt_score.text);
        // community.submitScore({
        //     score: +play.txt_score.text,
        //     callback: function () {
        //         if (enableAds && Ctr > adFreq) {
        //             adSense.showAdvertising({
        //                 callback: function () {
        //                     game.paused = false
        //                 }
        //             });
        //             Ctr = 0
        //         }
        //     }
        // })
    },
    funcnextlevel: function () {
        if (this.numLevel <= nombre_levels) {
            this.numLevel++
        }
        play.InitialiseFade("play")
    },
    cacherPause: function () {
        this.bnt_pause.visible = false;
        this.groupPause.forEachAlive(function (obj) {
            obj.visible = true
        }, this);
        this.bg_noire.visible = true;
		gradle.event('button_pause');
    },
    funcPause: function () {
        if (this.istimerEndLevel || this.istimerEndLevelAndLose || this.isEndAllLevels || this.fin_win || !play.debut) return;
        if (Music.enableMisic && game.sound.usingWebAudio) Music.sounds.play("whoosh");
        if (play.bubble_shoot != null && play.bubble_shoot.isShooted) {
            play.bubble_shoot.body.velocity.x = play.bubble_shoot.body.velocity.y = 0
        }
        this.ispause_music = true;
        if (this.stateMusic) {
            Music.enableMisic = false;
            Music.music.pause()
        }
        this.cacherPause();
        this.pausePlay = true;
        if (this.stateMusic) {
            this.bnt_music.frameName = "music_bnt_pause" + resolution + ".png"
        } else {
            this.bnt_music.frameName = "mute_bnt_pause" + resolution + ".png"
        }
        this.groupPause.setAll("alpha", 0);
        game.add.tween(this.groupPause).to({
            y: -50 * resolution
        }, 350, Phaser.Easing.Quadratic.Out, true, 100).to({
            y: 0
        }, 200, Phaser.Easing.Quadratic.Out, true, 70);
        game.world.bringToTop(this.bg_noire);
        game.world.bringToTop(this.groupPause);
        this.groupPause.forEach(function (obj) {
            game.add.tween(obj).to({
                alpha: 1
            }, 600, Phaser.Easing.Quadratic.Out, true, 150)
        }, this);
        game.input.onUp.active = false
    },
    funcResume: function () {
        if (!this.pausePlay) return;
        if (this.stateMusic) {
            this.ispause_music = false;
            Music.enableMisic = true;
            Music.music.resume()
        }
        this.afficherPause();
        this.pausePlay = false;
        game.time.events.add(300, function () {
            if (Music.enableMisic && game.sound.usingWebAudio) Music.sounds.play("whoosh")
        }, this);
        game.add.tween(this.groupPause).to({
            y: -65 * resolution
        }, 350, Phaser.Easing.Quadratic.Out, true, 100).to({
            y: 400 * resolution
        }, 300, Phaser.Easing.Quadratic.Out, true).onComplete.add(function () {
            this.bg_noire.visible = false;
            if (play.bubble_shoot != null && play.bubble_shoot.isShooted && play.bubble_shoot.body.velocity.x == 0) {
                play.bubble_shoot.body.velocity.x = this.bubble_shoot.vitesseX;
                play.bubble_shoot.body.velocity.y = this.bubble_shoot.vitesseY
            }
        }, this);
        this.groupPause.forEach(function (obj) {
            game.add.tween(obj).to({
                alpha: 0
            }, 600, Phaser.Easing.Quadratic.Out, true, 400)
        }, this);
        game.input.onUp.active = true
    },
    afficherPause: function () {
        this.bnt_pause.visible = true;
    },
    funReplay: function () {
        if (play.groupNexLevel) {
            if (this.stateMusic && this.pausePlay) {
                Music.enableMisic = true;
                Music.music.resume()
            }
            play.InitialiseFade("play")
        } else {
            if (this.bgPlay.key == "bgPlay") {
                day_or_night = 2;
                this.bgPlay.loadTexture("bgPlay2");
                this.center_sprite.frameName = "center_sprite2" + resolution + ".png";
                document.body.style.backgroundImage = 'url("assets/big_bg_game22.png")'
            } else {
                day_or_night = 1;
                this.bgPlay.loadTexture("bgPlay");
                this.center_sprite.frameName = "center_sprite" + resolution + ".png";
                document.body.style.backgroundImage = 'url("assets/big_bg_game2.png")'
            }
        }
		gradle.event('replay');
    },
    funcBack: function () {
		gradle.event('back_tomenu');
        // if (enableAds && Ctr > adFreq) {
        //     adSense.showAdvertising({
        //         callback: function () {
        //             game.paused = false
        //         }
        //     });
        //     Ctr = 0
        // }
        if (this.stateMusic) {
            Music.enableMisic = true;
            Music.music.resume()
        }
        play.InitialiseFade("menu")
    },
    calculer_etoiles: function () {},
    Fin_level: function () {
		play.calculer_etoiles();
        if (this.numLevel > level && this.numLevel < nombre_levels) {
            level = this.numLevel;
            Save_setItem("bubble_spin_level", level);
        }
        if (play.number_etoiles > sauvegarde[play.numLevel - 1].numetoile) {
            sauvegarde[play.numLevel - 1].numetoile = play.number_etoiles
        }
        if (play.current_score > sauvegarde[play.numLevel - 1].bestscore) {
            sauvegarde[play.numLevel - 1].bestscore = play.current_score
        }
        save_ecrit();
        if (play.numLevel == nombre_levels && !play.istimerEndLevelAndLose) play.createCongratulations();
        else if (play.istimerEndLevelAndLose) {play.createNextLevel();}
        else play.NextStage()

		gradle.event('next_level');
        // if (enableAds && Ctr > adFreq) {
        //     game.paused = true;
        //     adSense.showAdvertising({
        //         callback: function () {
        //             game.paused = false
        //         }
        //     });
        //     Ctr = 0
        // }
    },
    update: function () {
        if (this.you_win && this.groupNexLevel.y > 0) {
            this.groupNexLevel.y -= 15
        }
        if (this.stars.crop_rect.width < this.stars.initWidth && this.stars.crop_rect.width < this.crop_width * this.current_score) {
            this.stars.crop_rect.width++;
            this.stars.crop({
                x: 0,
                y: 0,
                width: this.stars.crop_rect.width,
                height: this.stars.height
            })
        }
        if (this.txt_score_win != null) {
            if (+this.txt_score_win.text < this.current_score && this.current_score < 1500 || +this.txt_score_win.text < 1500 && this.current_score >= 1500) this.txt_score_win.setText("" + (+this.txt_score_win.text + 10));
            else this.txt_score_win.setText("" + this.current_score);
            this.txt_score_win.x = game.width / 2 - this.txt_score_win.width / 2
        }
        if (this.timer_animation > 0 && !this.fin_win) {
            this.timer_animation -= game.time.elapsed;
            if (this.timer_animation <= 0 && !this.fin_win) {
                play.newbubble_filled = true;
                game.add.tween(this.next_bubble.scale).to({
                    x: 1,
                    y: 1
                }, 250, Phaser.Easing.Quadratic.Out, false, 50).start();
                game.add.tween(this.next_bubble).to({
                    x: 169 * resolution,
                    y: 395.5 * resolution
                }, 350, Phaser.Easing.Quadratic.Out, false, 50).start().onComplete.add(function () {
                    this.next_bubble.x = 146.55 * resolution;
                    this.next_bubble.y = 409.5 * resolution;
                    this.NewBubble();
                    this.NewNextBubble();
                    play.CanShoot--
                }, this);
                if (this.next_bubble.laser_effect) {
                    game.add.tween(this.next_bubble.laser_effect).to({
                        x: 169 * resolution,
                        y: 395.5 * resolution
                    }, 350, Phaser.Easing.Quadratic.Out, false, 50).start();
                    game.add.tween(this.next_bubble.laser_effect.scale).to({
                        x: 1.1,
                        y: 1.1
                    }, 250, Phaser.Easing.Quadratic.Out, false, 50).start()
                }
                this.timer_animation = -1
            }
        }
        if (this.gameOver || this.you_win || this.pausePlay) return;
        if (this.isEndAllLevels) return;
        if (this.istimerEndLevel && this.timerEndLevel != null) {
            this.timerEndLevel -= this.game.time.elapsed;
            if (this.timerEndLevel < 0) {
                this.istimerEndLevel = false;
                this.Fin_level()
            }
        }
        if (this.istimerEndLevelAndLose && this.timerEndLevelAndLose != null) {
            this.timerEndLevelAndLose -= this.game.time.elapsed;
            if (this.timerEndLevelAndLose < 0) {
                this.Fin_level();
                this.istimerEndLevelAndLose = false
            }
        }
        if (this.trajectoire.rotation > -.1) this.trajectoire.rotation = -.1;
        if (this.trajectoire.rotation < -3.1) this.trajectoire.rotation = -3.1;
        if (this.bubble_shoot && !(this.trajectoire.rotation > -.1 || this.trajectoire.rotation < -3.1 || game.input.activePointer.y > this.bubble_shoot.y) && !play.fin_win && this.tuto == null && play.isAddingBubbles <= 0 && play.debut && !play.bubble_shoot.isShooted && !this.istimerEndLevel && !this.istimerEndLevelAndLose && !(this.bnt_pause.visible && Phaser.Rectangle.contains(this.bnt_pause.getBounds(), game.input.activePointer.x, game.input.activePointer.y) || this.resumebtn.visible && Phaser.Rectangle.contains(this.resumebtn.getBounds(), game.input.activePointer.x, game.input.activePointer.y))) {
            this.trajectoire.rotation = Phaser.Math.angleBetween(this.trajectoire.x, this.trajectoire.y, game.input.activePointer.x, game.input.activePointer.y);
            this.bubble_shoot.rotation = game.physics.arcade.angleToPointer(this.bubble_shoot);
            this.bubble_shoot.angle += 90
        }
        if (this.bubble_shoot != null && this.bubble_shoot.isShooted && this.bubble_shoot.alive) {
            if (this.bubble_shoot.x - this.tailleX / 2 <= this.limit_left + 5 * resolution && this.bubble_shoot.body.velocity.x < 5 * resolution) this.bubble_shoot.body.velocity.x = -this.bubble_shoot.body.velocity.x;
            else if (this.bubble_shoot.x + this.tailleX / 2 >= this.limit_right - 5 * resolution && this.bubble_shoot.body.velocity.x > 5 * resolution) this.bubble_shoot.body.velocity.x = -this.bubble_shoot.body.velocity.x;
            if (this.bubble_shoot.y - this.tailleY / 2 <= this.limit_top.y + 5 * resolution && this.bubble_shoot.body.velocity.y < 0) {
                if (this.bubble_shoot.frame == 77) {
                    play.bubble_shoot.kill();
                    if (play.bubble_shoot.laser_effect) {
                        play.bubble_shoot.laser_effect.kill();
                        play.bubble_shoot.laser_effect = null
                    }
                    play.bubble_shoot = play.newbubble_prov;
                    play.newbubble_prov = null;
                    play.CanShoot--;
                    game.time.events.add(100, function () {
                        play.DetectFalling(play.center_sprite);
                        play.FallingEffect();
                        game.time.events.add(250, function () {
                            play.vect_bubbles_match = []
                        }, this)
                    }, this)
                } else this.bubble_shoot.body.velocity.y = -this.bubble_shoot.body.velocity.y
            } else if (this.bubble_shoot.y - this.tailleY / 2 >= game.height && this.bubble_shoot.body.velocity.y > 0) {
                play.bubble_shoot.kill();
                if (play.bubble_shoot.laser_effect) {
                    play.bubble_shoot.laser_effect.kill();
                    play.bubble_shoot.laser_effect = null
                }
                play.bubble_shoot = play.newbubble_prov;
                play.newbubble_prov = null;
                play.CanShoot--
            }
        }
        if (this.bubble_shoot != null && this.bubble_shoot.isShooted && this.bubble_shoot.alive) {
            for (var i = 0; i < this.group_sprites.length; i++) {
                if (this.group_sprites.getAt(i).alive && this.group_sprites.getAt(i) != this.bubble_shoot) {
                    if (play.bubble_shoot.frame == 77) game.physics.arcade.overlap(this.bubble_shoot, this.group_sprites.getAt(i), this.LaserEffect, null, this.group_sprites.getAt(i));
                    else game.physics.arcade.overlap(this.bubble_shoot, this.group_sprites.getAt(i), this.Positionner_bubble, null, this.group_sprites.getAt(i))
                }
            }
            if (this.bubble_shoot.laser_effect) {
                this.bubble_shoot.laser_effect.x = this.bubble_shoot.x;
                this.bubble_shoot.laser_effect.y = this.bubble_shoot.y
            }
        }
        if (!play.istimerEndLevelAndLose && !this.istimerEndLevel && play.debut) {
            for (var i = 0; i < play.cols; i++) {
                for (var j = 0; j < play.rows; j++) {
                    if (!play.mat_fruits[i][j] || play.mat_fruits[i][j].tw_fall != null || play.mat_fruits[i][j].to_kill || play.mat_fruits[i][j].not_falling || play.mat_fruits[i][j].to_position) continue;
                    if (play.mat_fruits[i][j].world.x + play.tailleX / 2 >= this.to_lose_right || play.mat_fruits[i][j].world.x - play.tailleX / 2 <= this.to_lose_left || play.mat_fruits[i][j].world.y - play.tailleY / 2 <= this.to_lose_up || play.mat_fruits[i][j].world.y + play.tailleY / 2 >= this.to_lose_down) {
                        play.mat_fruits[i][j].play("pop", 20, false, false);
                        game.add.tween(play.mat_fruits[i][j].scale).to({
                            x: 2,
                            y: 2
                        }, 400, Phaser.Easing.Back.Out).start();
                        play.timerEndLevelAndLose = 1500;
                        play.istimerEndLevelAndLose = true;
                        play.tween_angle.pendingDelete = true
                    }
                }
            }
        }
    },
    InitialiseFade: function (state) {
        if (play.bgnoire == null) play.bgnoire = game.add.image(0, 0, "bgnoire");
        play.bgnoire.alpha = 0;
        game.add.tween(play.bgnoire).to({
            alpha: 1
        }, 500, Phaser.Easing.Linear.None, true).onComplete.add(function () {
            game.time.events.add(100, function () {
                game.state.start(this, true);
                play.bgnoire.alpha = 0;
                play.bgnoire.kill();
                play.bgnoire = null
            }, this)
        }, state);
    },
    Add_notification: function (notification, x, y) {
        game.time.events.add(250, function () {
            if (notification != "yeey" + resolution + ".png")
                if (Music.enableMisic && game.sound.usingWebAudio) Music.sounds.play("goodjob");
            var ultra_chain = game.add.text(x, y, "" + notification, {
                font: 18 * resolution + langFont,
                align: "center",
                fill: "#ffe50b",
                stroke: "#7a4e00",
                strokeThickness: 2 * resolution
            });
            ultra_chain.anchor.setTo(.5, .5);
            ultra_chain.initY = ultra_chain.y;
            ultra_chain.scale.setTo(.1, .1);
            ultra_chain.alpha = 1;
            this.world.bringToTop(ultra_chain);
            this.game.add.tween(ultra_chain.scale).to({
                x: 1.6,
                y: 1.4
            }, 200, Phaser.Easing.Quadratic.Out, true, 0).to({
                x: 1.2,
                y: 1.2
            }, 1e3, Phaser.Easing.Elastic.Out, true);
            game.add.tween(ultra_chain).to({
                y: ultra_chain.initY - 10 * resolution,
                alpha: 0
            }, 600, Phaser.Easing.Linear.None, true, 800).onComplete.add(function () {
                this.visible = false
            }, ultra_chain)
        }, this)
    },
    creer_text_score: function (sprite) {
        if (sprite.score == 0) return;
        sprite.txt_created = true;
        if (!sprite.world) sprite.world = {
            x: sprite.x,
            y: sprite.y
        };
        var txt_score_sp = game.add.text(sprite.world.x, sprite.world.y - 10 * resolution, "+" + sprite.score, {
            font: 12 * resolution + langFont,
            align: "center",
            fill: "#ffffff",
            stroke: "#000000",
            strokeThickness: 2 * resolution
        });
        txt_score_sp.x -= txt_score_sp.width / 2;
        txt_score_sp.initY = txt_score_sp.y;
        txt_score_sp.scale.setTo(.1, .1);
        game.add.tween(txt_score_sp.scale).to({
            x: 1,
            y: 1
        }, 400, Phaser.Easing.Quadratic.Out, true).onComplete.add(function () {
            game.add.tween(this).to({
                y: this.initY - 5 * resolution,
                alpha: 0
            }, 600, Phaser.Easing.Linear.None, true).onComplete.add(function () {
                this.visible = false;
                this.destroy()
            }, txt_score_sp)
        }, txt_score_sp)
    },
    init_bubbles: function () {
        for (var i = 0; i < this.cols; i++) {
            for (var j = 0; j < this.rows; j++) {
                if (this.mat_types[i][j] == 8) {
                    this.center_sprite = game.add.sprite(0, 0, "sprites");
                    if (this.bgPlay.key == "bgPlay") this.center_sprite.frameName = "center_sprite" + resolution + ".png";
                    else this.center_sprite.frameName = "center_sprite2" + resolution + ".png";
                    this.center_sprite.anchor.setTo(.5, .5);
                    this.center_sprite.ind_i = i;
                    this.center_sprite.ind_j = j;
                    this.center_sprite.not_falling = true;
                    this.center_sprite.scale.setTo(0, 0);
                    game.add.tween(this.center_sprite.scale).to({
                        x: 1,
                        y: 1
                    }, 700, Phaser.Easing.Elastic.Out).start();
                    game.physics.enable(this.center_sprite);
                    this.center_sprite.body.setSize(15 * resolution, 14.5 * resolution, 0, resolution);
                    this.mat_fruits[i][j] = this.center_sprite;
                    this.group_sprites.add(this.center_sprite)
                }
            }
        }
        for (var i = 0; i < this.cols; i++) {
            for (var j = 0; j < this.rows; j++) {
                if (this.mat_types[i][j] > 0 && this.mat_types[i][j] != 8) {
                    var sprite = new Phaser.Sprite(this.game, this.center_sprite.x - (this.center_sprite.ind_j - j) * this.tailleX, this.center_sprite.y - (this.center_sprite.ind_i - i) * this.tailleY - j % 2 * this.tailleX / 2 + this.tailleY / 2, "obj", 0);
                    sprite.islocked = false;
                    sprite.lock = null;
                    var rnd_frame = this.mat_types[i][j];
                    if (rnd_frame <= 7) {
                        rnd_frame = this.vect_frames[rnd_frame - 1].frame
                    } else if (rnd_frame == 74) {
                        rnd_frame = Math.floor(Math.random() * 6.9 + 1);
                        this.mat_types[i][j] = rnd_frame;
                        sprite.islocked = true;
                        sprite.lock = game.add.sprite(sprite.x, sprite.y, "obj", 74);
                        sprite.lock.anchor.setTo(.5, .5);
                        sprite.lock.scale.setTo(0, 0)
                    }
                    sprite.frame = rnd_frame;
                    sprite.alive = true;
                    sprite.anchor.setTo(.5, .5);
                    sprite.scale.setTo(0, 0);
                    sprite.animations.add("pop", [8 + 9 * (sprite.frame - 1) + 1, 8 + 9 * (sprite.frame - 1) + 2, 8 + 9 * (sprite.frame - 1) + 3, 8 + 9 * (sprite.frame - 1) + 4, 8 + 9 * (sprite.frame - 1) + 5, 8 + 9 * (sprite.frame - 1) + 6, 8 + 9 * (sprite.frame - 1) + 7, 8 + 9 * (sprite.frame - 1) + 8, 8 + 9 * (sprite.frame - 1) + 9], 8, false);
                    sprite.frame = rnd_frame;
                    sprite.ind = sprite.frame;
                    if (play.center_sprite.ind_j % 2 == 0 && (i == play.center_sprite.ind_i + 1 && (j == play.center_sprite.ind_j || j == play.center_sprite.ind_j - 1 || j == play.center_sprite.ind_j + 1) || i == play.center_sprite.ind_i && (j == play.center_sprite.ind_j - 1 || j == play.center_sprite.ind_j + 1)) || i == play.center_sprite.ind_i - 1 && j == play.center_sprite.ind_j || (play.center_sprite.ind_j % 2 != 0 && (i == play.center_sprite.ind_i - 1 && (j == play.center_sprite.ind_j || j == play.center_sprite.ind_j - 1 || j == play.center_sprite.ind_j + 1) || i == play.center_sprite.ind_i && (j == play.center_sprite.ind_j - 1 || j == play.center_sprite.ind_j + 1)) || i == play.center_sprite.ind_i + 1 && j == play.center_sprite.ind_j)) {
                        sprite.frame = 0;
                        sprite.ind = 73
                    }
                    sprite.to_kill = false;
                    sprite.not_falling = false;
                    sprite.blocked = false;
                    sprite.txt_created = false;
                    if (sprite.tw != null) sprite.tw.pause();
                    sprite.tw = null;
                    sprite.tw_fall = null;
                    sprite.initWidth = sprite.width;
                    sprite.initHeight = sprite.height;
                    sprite.tw_stop = game.add.tween(sprite).to({
                        width: sprite.initWidth * 1.2,
                        height: sprite.initHeight * .8
                    }, this.tw_stop_time, Phaser.Easing.Circular.None).to({
                        width: sprite.initWidth,
                        height: sprite.initHeight
                    }, this.tw_stop_time + 50, Phaser.Easing.Circular.None);
                    sprite.tw_stop.do_start = true;
                    sprite.tw_stop.isStart = false;
                    sprite.tw_stop.onComplete.add(function () {
                        if (this.isStart) {
                            play.nbr_tween_started--;
                            this.isStart = false
                        }
                    }, sprite.tw_stop);
                    switch (rnd_frame) {
                        case 1:
                            sprite.score = 10;
                            break;
                        case 2:
                            sprite.score = 10;
                            break;
                        case 3:
                            sprite.score = 15;
                            break;
                        case 4:
                            sprite.score = 20;
                            break;
                        case 5:
                            sprite.score = 20;
                            break;
                        case 6:
                            sprite.score = 25;
                            break;
                        case 7:
                            sprite.score = 30;
                            break;
                        default:
                            sprite.score = 0
                    }
                    sprite.ind_i = i;
                    sprite.ind_j = j;
                    sprite.origin_ind = sprite.ind;
                    game.physics.enable(sprite);
                    sprite.body.setSize(15 * resolution, 14.5 * resolution, 0, resolution);
                    if (!this.bubble_on_top || sprite.y < this.bubble_on_top.y) {
                        this.bubble_on_top = sprite
                    }
                    this.mat_fruits[i][j] = sprite;
                    this.group_sprites.add(sprite);
                    if (sprite.lock) this.group_sprites.add(sprite.lock);
                    this.bubbles_living++;
                    if (sprite.y > play.bubble_bigger_y) {
                        play.bubble_bigger_y = sprite.y
                    }
                }
            }
        }
        this.group_sprites.x = 160 * resolution;
        this.group_sprites.y = 195 * resolution
    },
    TapUp: function () {
        if (this.tuto != null || play.bubble_shoot == null || play.fin_win || !play.debut || play.vect_bubbles_match.length > 1 || this.istimerEndLevel || this.istimerEndLevelAndLose || this.isEndAllLevels || this.pausePlay || this.gameOver) return;
        if (this.bnt_pause.visible && Phaser.Rectangle.contains(this.bnt_pause.getBounds(), game.input.activePointer.x, game.input.activePointer.y) || this.resumebtn.visible && Phaser.Rectangle.contains(this.resumebtn.getBounds(), game.input.activePointer.x, game.input.activePointer.y)) return;
        if (play.CanShoot > 0 || play.isAddingBubbles > 0 || play.bubble_shoot.isShooted) return;
        if (!(this.trajectoire.rotation >= -.1 || this.trajectoire.rotation <= -3.1 || game.input.activePointer.y > this.bubble_shoot.y) && !play.bubble_shoot.isShooted) {
            this.bubble_shoot.isShooted = true;
            this.bubble_shoot.current_mouse_x = game.input.activePointer.x;
            this.bubble_shoot.current_mouse_y = game.input.activePointer.y;
            play.ShootBubble()
        } else {
            game.add.tween(this.bubble_shoot).to({
                x: 169 * resolution,
                y: 395.5 * resolution
            }, 200, Phaser.Easing.Quadratic.Out).start();
            game.add.tween(this.bubble_shoot).to({
                angle: 0
            }, 200, Phaser.Easing.Quadratic.Out).start()
        }
    },
    TapDown: function () {
        if (play.numLevel <= 1 && this.tuto != null && this.tuto.visible) {
            this.bg_noire.visible = false;
            this.tuto.visible = false;
            this.tuto.tuto_word.visible = false;
            this.tuto.txt_tuto.visible = false;
            game.time.events.add(200, function () {
                play.tuto = null
            }, this);
            return
        }
        if (!play.debut || play.CanShoot > 0 || play.isAddingBubbles > 0 || play.bubble_shoot == null || play.fin_win || this.istimerEndLevel || this.istimerEndLevelAndLose || this.isEndAllLevels || this.pausePlay || this.gameOver || play.bubble_shoot != null && game.input.activePointer.y > play.bubble_shoot.y) return;
        if (this.bnt_pause.visible && Phaser.Rectangle.contains(this.bnt_pause.getBounds(), game.input.activePointer.x, game.input.activePointer.y) || this.resumebtn.visible && Phaser.Rectangle.contains(this.resumebtn.getBounds(), game.input.activePointer.x, game.input.activePointer.y) || Phaser.Rectangle.contains(this.bnt_change_bubble.getBounds(), game.input.activePointer.x, game.input.activePointer.y)) return;
        if (this.CanShoot > 0 || play.isAddingBubbles > 0 || play.bubble_shoot.isShooted) return
    },
    NewBubble: function () {
        if (play.istimerEndLevelAndLose || play.gameOver) return;
        this.newbubble_prov = this.group_sprites.getFirstDead();
        if (this.newbubble_prov != null) {
            this.newbubble_prov.reset(169 * resolution, 395.5 * resolution);
            this.newbubble_prov.loadTexture("obj");
            this.newbubble_prov.frame = this.next_bubble_frame
        } else this.newbubble_prov = game.add.sprite(169 * resolution, 395.5 * resolution, "obj", this.next_bubble_frame);
        game.world.add(this.newbubble_prov);
        this.newbubble_prov.anchor.setTo(.5, .5);
        this.CanShoot++;
        game.add.tween(this.newbubble_prov.scale).to({
            x: 1.25,
            y: 1.25
        }, 250, Phaser.Easing.Quadratic.Out).start().onComplete.add(function () {
            this.CanShoot--
        }, this);
        this.newbubble_prov.angle = 0;
        this.newbubble_prov.islocked = false;
        this.newbubble_prov.lock = null;
        this.newbubble_prov.isShooted = false;
        this.newbubble_prov.to_kill = false;
        this.newbubble_prov.not_falling = false;
        this.newbubble_prov.blocked = false;
        this.newbubble_prov.tw_fall = null;
        game.physics.enable(this.newbubble_prov);
        this.newbubble_prov.body.setSize(15 * resolution, 14.5 * resolution, 0, resolution);
        this.newbubble_prov.bringToTop();
        this.newbubble_prov.frame = this.next_bubble_frame;
        this.newbubble_prov.laser_effect = null;
        if (this.newbubble_prov.frame == 77) {
            this.newbubble_prov.laser_effect = this.next_bubble.laser_effect;
            this.newbubble_prov.laser_effect.bringToTop();
            game.add.tween(this.newbubble_prov.laser_effect.scale).to({
                x: 1.25,
                y: 1.25
            }, 250, Phaser.Easing.Quadratic.Out).start()
        }
        this.newbubble_prov.animations.add("pop", [8 + 9 * (this.newbubble_prov.frame - 1) + 1, 8 + 9 * (this.newbubble_prov.frame - 1) + 2, 8 + 9 * (this.newbubble_prov.frame - 1) + 3, 8 + 9 * (this.newbubble_prov.frame - 1) + 4, 8 + 9 * (this.newbubble_prov.frame - 1) + 5, 8 + 9 * (this.newbubble_prov.frame - 1) + 6, 8 + 9 * (this.newbubble_prov.frame - 1) + 7, 8 + 9 * (this.newbubble_prov.frame - 1) + 8, 8 + 9 * (this.newbubble_prov.frame - 1) + 9], 8, false);
        this.newbubble_prov.frame = this.next_bubble_frame;
        this.newbubble_prov.ind = this.newbubble_prov.frame;
        this.newbubble_prov.txt_created = false;
        switch (this.newbubble_prov.frame) {
            case 1:
                this.newbubble_prov.score = 10;
                break;
            case 2:
                this.newbubble_prov.score = 10;
                break;
            case 3:
                this.newbubble_prov.score = 15;
                break;
            case 4:
                this.newbubble_prov.score = 20;
                break;
            case 5:
                this.newbubble_prov.score = 20;
                break;
            case 6:
                this.newbubble_prov.score = 25;
                break;
            case 7:
                this.newbubble_prov.score = 30;
                break;
            default:
                this.newbubble_prov.score = 0
        }
    },
    NewNextBubble: function () {
        if (play.istimerEndLevelAndLose || play.gameOver) return;
        this.next_bubble.frame = Math.floor(Math.random() * 6.9 + 1);
        this.compteur_frame = 0;
        this.Select_New_Frame();
        this.next_bubble.frame = this.new_frame;
        this.next_bubble.anchor.setTo(.5, .5);
        this.next_bubble.scale.setTo(.9, .9);
        this.next_bubble.angle = 0;
        this.next_bubble.islocked = false;
        this.next_bubble.lock = null;
        this.next_bubble.isShooted = false;
        this.next_bubble.to_kill = false;
        this.next_bubble.not_falling = false;
        this.next_bubble.blocked = false;
        this.next_bubble.tw_fall = null;
        game.physics.enable(this.next_bubble);
        this.next_bubble.body.setSize(15 * resolution, 14.5 * resolution, 0, resolution);
        this.next_bubble.bringToTop();
        this.next_bubble.laser_effect = null;
        if (this.new_frame == 77) {
            this.next_bubble.laser_effect = game.add.sprite(this.next_bubble.x, this.next_bubble.y, "laser_effect");
            this.next_bubble.laser_effect.anchor.setTo(.5, .5);
            this.next_bubble.laser_effect.scale.setTo(this.next_bubble.scale.x + .1, this.next_bubble.scale.y + .1);
            this.next_bubble.laser_effect.animations.add("laser");
            this.next_bubble.laser_effect.animations.play("laser", 15, true, false)
        }
        this.next_bubble_frame = this.next_bubble.frame
    },
    Test_Match: function (bubble) {
        for (var i = bubble.ind_i - 1; i <= bubble.ind_i + 1; i++) {
            for (var j = bubble.ind_j - 1; j <= bubble.ind_j + 1; j++) {
                if (bubble.ind_i == i && bubble.ind_j == j || bubble.ind_j % 2 == 0 && i == bubble.ind_i - 1 && (j == bubble.ind_j - 1 || j == bubble.ind_j + 1) || bubble.ind_j % 2 != 0 && i == bubble.ind_i + 1 && (j == bubble.ind_j - 1 || j == bubble.ind_j + 1)) continue;
                if (i >= 0 && j >= 0 && i < this.cols && j < this.rows && this.mat_fruits[i][j] != null && !this.mat_fruits[i][j].to_kill && this.mat_fruits[i][j].frame == bubble.frame) {
                    this.vect_bubbles_match.push(this.mat_fruits[i][j]);
                    this.mat_fruits[i][j].to_kill = true;
                    this.Test_Match(this.mat_fruits[i][j])
                }
            }
        }
    },
    After_Match: function (isPw) {
        if (play.istimerEndLevelAndLose || play.istimerEndLevel) return;
        if (play.vect_bubbles_match.length >= 3 || isPw) {
            play.Test_Kill()
        } else {
            for (var b2 = 0; b2 < play.vect_bubbles_match.length; b2++) {
                play.vect_bubbles_match[b2].to_kill = false
            }
            play.vect_bubbles_match = []
        }
        play.CanShoot--;
        play.touched_bubble = null
    },
    Test_Kill: function () {
        for (var b = 0; b < play.vect_bubbles_match.length; b++) {
            game.time.events.add(b * 100, function () {
                if (play.first_row != play.last_row) {
                    if (this.ind_i == 0 && this.ind_j == play.first_row) {
                        play.first_row = play.cols;
                        for (var xx = 0; xx < play.rows; xx++) {
                            if (xx < play.first_row && play.mat_fruits[0][xx] && !play.mat_fruits[0][xx].to_kill && !play.mat_fruits[0][xx].not_falling) play.first_row = xx
                        }
                    }
                    if (this.ind_i == 0 && this.ind_j == play.last_row) {
                        play.last_row = -1;
                        for (var xx = 0; xx < play.rows; xx++) {
                            if (xx > play.last_row && play.mat_fruits[0][xx] && !play.mat_fruits[0][xx].to_kill && !play.mat_fruits[0][xx].not_falling) play.last_row = xx
                        }
                    }
                }
                if (this.frame <= 7) {
                    if (this.lock != null) {
                        var emitter = game.add.emitter(this.lock.world.x, this.lock.world.y - this.lock.height / 2, 12);
                        emitter.makeParticles("sprites", ["ice_part" + resolution + ".png"]);
                        emitter.setAlpha(1, .5, 800, Phaser.Easing.Linear.None);
                        emitter.setScale(1, .2, 800, Phaser.Easing.Linear.None);
                        emitter.minParticleSpeed.setTo(-150, -150);
                        emitter.maxParticleSpeed.setTo(150, 150);
                        emitter.start(true, 1e3, 12, 12);
                        this.lock.kill();
                        this.lock = null;
                        this.islocked = false
                    } else {
                        this.bringToTop();
                        this.to_kill = true;
                        this.play("pop", 20, false, false);
                        game.add.tween(this.scale).to({
                            x: 2,
                            y: 2
                        }, 400, Phaser.Easing.Back.Out).start();
                        play.bubbles_living--;
                        if (Music.enableMisic && game.sound.usingWebAudio) Music.sounds.play("pop");
                        play.mat_fruits[this.ind_i][this.ind_j] = null;
                        play.mat_types[this.ind_i][this.ind_j] = 0;
                        this.animations.getAnimation("pop").onComplete.add(function () {
                            this.scale.setTo(1, 1);
                            this.kill()
                        }, this)
                    }
                } else {
                    if (this.frame == 76 || this.frame == 78) {
                        game.world.add(this);
                        this.tw_fall = -1;
                        play.CanShoot--;
                        this.kill()
                    }
                    play.bubbles_living--;
                    this.to_kill = true;
                    play.mat_fruits[this.ind_i][this.ind_j] = null;
                    play.mat_types[this.ind_i][this.ind_j] = 0
                }
                if (!this.txt_created) play.creer_text_score(this);
                play.current_score += this.score;
                play.txt_score.setText("" + play.current_score);
                play.txt_score.x = 159 * resolution - play.txt_score.width / 2;
                if (play.current_score > highscore) {
                    highscore = play.current_score;
                    play.txt_best_score.setText(text.txtbest + highscore)
                }
                if (this.y >= play.bubble_bigger_y && play.bubble_bigger_y != -1e5) {
                    play.bubble_bigger_y = -1e5
                }
            }, play.vect_bubbles_match[b])
        }
        game.time.events.add(play.vect_bubbles_match.length * 100, function () {
            if (play.vect_bubbles_match.length >= 8) play.Add_notification(text.txt_fantastic, play.vect_bubbles_match[0].world.x, play.vect_bubbles_match[0].world.y);
            else if (play.vect_bubbles_match.length >= 6) play.Add_notification(text.txt_amazing, play.vect_bubbles_match[0].world.x, play.vect_bubbles_match[0].world.y);
            else if (play.vect_bubbles_match.length >= 4) play.Add_notification(text.txt_great, play.vect_bubbles_match[0].world.x, play.vect_bubbles_match[0].world.y);
            play.DetectFalling(play.center_sprite);
            play.FallingEffect();
            game.time.events.add(250, function () {
                play.vect_bubbles_match = []
            }, this)
        }, this)
    },
    FallingEffect: function () {
        var nbr_score_falling = 0;
        play.vect_bubbles_fall = [];
        for (var i = 0; i < play.cols; i++) {
            for (var j = 0; j < play.rows; j++) {
                if (!play.mat_fruits[i][j] || play.mat_fruits[i][j].not_falling || play.mat_fruits[i][j].tw_fall != null) continue;
                var world_x = play.mat_fruits[i][j].world.x;
                var world_y = play.mat_fruits[i][j].world.y;
                game.world.add(play.mat_fruits[i][j]);
                play.mat_fruits[i][j].x = world_x;
                play.mat_fruits[i][j].y = world_y;
                play.mat_fruits[i][j].bringToTop();
                play.bubbles_living--;
                play.CanShoot++;
                if (play.mat_fruits[i][j].frame < 8 && play.mat_fruits[i][j].frame > 0 || play.mat_fruits[i][j].frame == 73 || play.mat_fruits[i][j].frame == 74) {
                    if (play.mat_fruits[i][j].lock != null) {
                        play.mat_fruits[i][j].lock.kill();
                        play.mat_fruits[i][j].lock = null;
                        play.mat_fruits[i][j].islocked = false
                    }
                    play.mat_fruits[i][j].tw_rotation = game.add.tween(play.mat_fruits[i][j]).to({
                        angle: 360
                    }, 1500, Phaser.Easing.Linear.None);
                    play.mat_fruits[i][j].tw_rotation.loop();
                    play.mat_fruits[i][j].tw_rotation.start();
                    play.mat_fruits[i][j].tw_fall = game.add.tween(play.mat_fruits[i][j]).to({
                        y: game.height
                    }, 800, Phaser.Easing.Quadratic.In);
                    play.mat_fruits[i][j].tw_fall.start();
                    play.mat_fruits[i][j].tw_fall.onComplete.add(function () {
                        play.CanShoot--;
                        this.score = 50;
                        play.current_score += this.score;
                        play.txt_score.setText("" + play.current_score);
                        play.txt_score.x = 159 * resolution - play.txt_score.width / 2;
                        if (play.current_score > highscore) {
                            highscore = play.current_score;
                            play.txt_best_score.setText(text.txtbest + highscore)
                        }
                        this.tw_rotation.stop();
                        this.tw_rotation.pendingDelete = true;
                        this.kill()
                    }, play.mat_fruits[i][j]);
                    nbr_score_falling += 50;
                    play.mat_fruits[i][j] = null;
                    play.mat_types[i][j] = 0
                }
            }
        }
        game.time.events.add(850, function () {
            var sp = {
                x: game.width / 2,
                y: game.height - 10 * resolution,
                score: nbr_score_falling
            };
            play.creer_text_score(sp)
        }, this);
        var nbr_nulls = -1;
        while (nbr_nulls <= 0) {
            nbr_nulls = 0;
            for (var yy = 0; yy < play.rows; yy++) {
                if (play.mat_fruits[0][yy] == null) {
                    nbr_nulls++
                }
            }
            if (nbr_nulls >= play.rows) {
                play.mat_fruits.shift();
                play.mat_types.shift();
                play.cols--;
                nbr_nulls = -1
            } else {
                break
            }
        }
        for (var ii = 0; ii < play.cols; ii++) {
            for (var jj = 0; jj < play.rows; jj++) {
                if (play.mat_fruits[ii][jj]) play.mat_fruits[ii][jj].ind_i = ii
            }
        }
        play.bubble_on_top = null;
        for (var i = 0; i < play.cols; i++) {
            for (var j = 0; j < play.rows; j++) {
                if (play.mat_fruits[i][j] != null && play.mat_fruits[i][j].not_falling && play.mat_fruits[i][j].alive) {
                    play.mat_fruits[i][j].not_falling = false;
                    if (!play.bubble_on_top || play.mat_fruits[i][j].y < play.bubble_on_top.y) play.bubble_on_top = play.mat_fruits[i][j]
                }
            }
        }
    },
    Positionner_bubble: function () {
        if (!play.bubble_shoot.isShooted) return;
        for (var m = 0; m < play.cols; m++) {
            for (var n = 0; n < play.rows; n++) {
                if (!play.mat_fruits[m][n]) continue;
                play.mat_fruits[m][n].to_kill = false
            }
        }
        if (!(this.tw_fall == null && !this.to_kill && !this.not_falling)) return;
        play.new_x = 0;
        play.new_y = 0;
        play.new_i = -1;
        play.new_j = -1;
        if (this != play) {
            var bubble = this;
            play.Rotate_Bubbles(play.bubble_shoot);
            play.bubble_shoot.body.velocity.x = play.bubble_shoot.body.velocity.y = 0;
            var bubble_shoot_x = play.bubble_shoot.world.x * Math.cos(play.group_sprites.rotation) + play.bubble_shoot.world.y * Math.sin(play.group_sprites.rotation);
            var bubble_shoot_y = -play.bubble_shoot.world.x * Math.sin(play.group_sprites.rotation) + play.bubble_shoot.world.y * Math.cos(play.group_sprites.rotation);
            var bubble_touched_world_x = bubble.world.x * Math.cos(play.group_sprites.rotation) + bubble.world.y * Math.sin(play.group_sprites.rotation);
            var bubble_touched_world_y = -bubble.world.x * Math.sin(play.group_sprites.rotation) + bubble.world.y * Math.cos(play.group_sprites.rotation);
            if (bubble_shoot_y > bubble_touched_world_y - play.tailleY / 2 + play.tailleY * .8) {
                if (bubble_shoot_x > bubble_touched_world_x - play.tailleX / 2 + play.tailleX * .8) {
                    play.new_y = bubble.y + play.tailleY / 2;
                    play.new_x = bubble.x + play.tailleX
                } else if (bubble_shoot_x < bubble_touched_world_x - play.tailleX / 2 + play.tailleX * .2) {
                    play.new_y = bubble.y + play.tailleY / 2;
                    play.new_x = bubble.x - play.tailleX
                } else {
                    play.new_y = bubble.y + play.tailleY;
                    play.new_x = bubble.x
                }
            } else if (bubble_shoot_y < bubble_touched_world_y - play.tailleY / 2 + play.tailleY * .2) {
                if (bubble_shoot_x > bubble_touched_world_x - play.tailleX / 2 + play.tailleX * .8) {
                    play.new_y = bubble.y - play.tailleY / 2;
                    play.new_x = bubble.x + play.tailleX
                } else if (bubble_shoot_x < bubble_touched_world_x - play.tailleX / 2 + play.tailleX * .2) {
                    play.new_y = bubble.y - play.tailleY / 2;
                    play.new_x = bubble.x - play.tailleX
                } else {
                    play.new_y = bubble.y - play.tailleY;
                    play.new_x = bubble.x
                }
            } else {
                if (bubble_shoot_y >= bubble_touched_world_y) {
                    play.new_y = bubble.y + play.tailleY / 2
                } else {
                    play.new_y = bubble.y - play.tailleY / 2
                }
                if (bubble_shoot_x >= bubble_touched_world_x) {
                    play.new_x = bubble.x + play.tailleX
                } else {
                    play.new_x = bubble.x - play.tailleX
                }
            }
            play.new_j = Math.round((play.new_x + play.center_sprite.world.x) / play.tailleX) - 1;
            play.new_i = Math.round((play.new_y + play.center_sprite.world.y - play.new_j % 2 * play.tailleX / 2) / play.tailleY) - Math.floor((play.bubble_on_top.y + play.group_sprites.y) / play.tailleY);
            if (play.new_j % 2 == 0) {
                play.new_i--
            }
            if (this.frame == 0) {
                play.istimerEndLevel = true;
                play.timerEndLevel = 1500;
                play.center_sprite.kill();
                play.bubble_shoot.visible = false;
                game.world.add(play.bubble_shoot);
                if (Music.enableMisic && game.sound.usingWebAudio) Music.sounds.play("star_pop");
                if (Music.enableMisic && game.sound.usingWebAudio) Music.sounds.play("pop");
                var star_effect = game.add.sprite(play.center_sprite.x, play.center_sprite.y, "star_effect");
                star_effect.anchor.setTo(.5, .5);
                star_effect.animations.add("star_effect");
                star_effect.animations.play("star_effect", 15, false, true);
                game.add.tween(star_effect.scale).to({
                    x: 2,
                    y: 2
                }, 500, Phaser.Easing.Linear.None).start();
                play.group_sprites.add(star_effect);
                play.group_sprites.forEachAlive(function (sp) {
                    if (!(sp.key == "star_effect" || sp == play.bubble_shoot)) {
                        if (sp.x > play.center_sprite.x) game.add.tween(sp).to({
                            x: sp.x + game.width + 100 * resolution
                        }, 800, Phaser.Easing.Quadratic.In).start().onComplete.add(function () {
                            this.kill()
                        }, sp);
                        else game.add.tween(sp).to({
                            x: sp.x - game.width - 100 * resolution
                        }, 800, Phaser.Easing.Quadratic.In).start().onComplete.add(function () {
                            this.kill()
                        }, sp);
                        if (sp.lock) sp.lock.kill()
                    }
                }, this)
            }
        }
        if (this.frame != 8) {
            if (play.new_i >= play.cols - 1) {
                play.cols++;
                play.mat_fruits.push([null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]);
                play.mat_types.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
            } else if (play.new_i < 0) {
                if (play.new_i < 0) play.new_i = 0;
                play.cols++;
                play.mat_fruits.unshift([null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]);
                play.mat_types.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
            }
            for (var ii = 0; ii < play.cols; ii++) {
                for (var jj = 0; jj < play.rows; jj++) {
                    if (play.mat_fruits[ii][jj]) play.mat_fruits[ii][jj].ind_i = ii
                }
            }
            if (Music.enableMisic && game.sound.usingWebAudio) Music.sounds.play("hit");
            if (play.mat_fruits[play.new_i][play.new_j] != null) {
                for (var i = play.new_i + 1; i >= play.new_i - 1; i--) {
                    for (var j = play.new_j + 1; j >= play.new_j - 1; j--) {
                        if (play.new_j % 2 == 0 && i == play.new_i - 1 && (j == play.new_j - 1 || j == play.new_j + 1) || play.new_j % 2 != 0 && i == play.new_i + 1 && (j == play.new_j - 1 || j == play.new_j + 1)) continue;
                        if (i >= 0 && j >= 0 && i < play.cols && j < play.rows && play.mat_fruits[i][j] == null) {
                            play.new_i = i;
                            play.new_j = j;
                            play.new_x = play.center_sprite.x - (play.center_sprite.ind_j - play.new_j) * play.tailleX;
                            play.new_y = play.center_sprite.y - (play.center_sprite.ind_i - play.new_i) * play.tailleY - play.new_j % 2 * play.tailleX / 2 + play.tailleY / 2;
                            break
                        }
                    }
                    if (play.mat_fruits[play.new_i][play.new_j] == null) break
                }
            }
            var nbr_bubbles_around = 0;
            for (var x = play.new_i - 1; x <= play.new_i + 1; x++) {
                for (var y = play.new_j - 1; y <= play.new_j + 1; y++) {
                    if (play.new_i == x && play.new_j == y || play.new_j % 2 == 0 && x == play.new_i - 1 && (y == play.new_j - 1 || y == play.new_j + 1) || play.new_j % 2 != 0 && x == play.new_i + 1 && (y == play.new_j - 1 || y == play.new_j + 1)) continue;
                    if (x >= 0 && y >= 0 && x < play.cols && y < play.rows && play.mat_fruits[x][y]) {
                        nbr_bubbles_around++
                    }
                }
            }
            if (nbr_bubbles_around == 0) {
                game.time.events.add(0, play.Positionner_bubble, this)
            }
            play.bubble_shoot.isShooted = false;
            play.bubble_shoot.ind_i = play.new_i;
            play.bubble_shoot.ind_j = play.new_j;
            var direction = 1;
            if (Math.random() > .5) direction = -1;
            play.bubble_shoot.x = play.new_x + 5 * direction * resolution;
            direction = 1;
            if (Math.random() > .5) direction = -1;
            play.bubble_shoot.y = play.new_y + 5 * direction * resolution;
            play.mat_fruits[play.new_i][play.new_j] = play.bubble_shoot;
            play.mat_fruits[play.new_i][play.new_j].ind_i = play.new_i;
            play.mat_fruits[play.new_i][play.new_j].ind_j = play.new_j;
            play.mat_types[play.new_i][play.new_j] = play.bubble_shoot.frame;
            if (play.mat_fruits[play.new_i][play.new_j].y < play.bubble_on_top.y) {
                play.bubble_on_top = play.mat_fruits[play.new_i][play.new_j]
            }
            play.touched_bubble = bubble;
            if (play.new_y > play.bubble_bigger_y) {
                play.bubble_bigger_y = play.new_y
            }
            game.add.tween(play.bubble_shoot).to({
                x: play.new_x,
                y: play.new_y
            }, 400, Phaser.Easing.Quadratic.Out).start().onComplete.add(function () {
                play.vect_bubbles_match = [];
                play.vect_bubbles_match.push(this);
                this.to_kill = true;
                play.Test_Match(this);
                play.After_Match(false);
                if (play.bubble_shoot.frame >= 75) {
                    play.Test_Powerups(play.mat_fruits[play.new_i][play.new_j], bubble.frame)
                }
                play.bubble_shoot = play.newbubble_prov;
                play.newbubble_prov = null;
                if (this.scale.x > 1) {
                    this.scale.x = this.scale.y = 1
                }
            }, play.mat_fruits[play.new_i][play.new_j]);
            play.EffectTouch(play.mat_fruits[play.new_i][play.new_j], play.new_i, play.new_j);
            play.group_sprites.add(play.mat_fruits[play.new_i][play.new_j]);
            play.bubbles_living++
        }
    },
    EffectTouch: function (bubble, new_i, new_j) {
        for (var i = bubble.ind_i - 1; i <= bubble.ind_i + 1; i++) {
            for (var j = bubble.ind_j - 1; j <= bubble.ind_j + 1; j++) {
                if (i >= 0 && i < play.cols && j >= 0 && j < play.rows) {
                    if (bubble.ind_i == i && bubble.ind_j == j || this.mat_fruits[i][j] == null) continue;
                    if (this.mat_fruits[i][j] && (this.mat_fruits[i][j].frame == 73 || this.mat_fruits[i][j].frame == 74 || this.mat_fruits[i][j].islocked)) continue;
                    game.add.tween(this.mat_fruits[i][j].scale).to({
                        x: 1.2,
                        y: .8
                    }, 200, Phaser.Easing.Circular.None).to({
                        x: 1,
                        y: 1
                    }, 250, Phaser.Easing.Circular.None).start();
                    if (i >= 0 && j >= 0 && i < this.cols && j < this.rows && this.mat_fruits[i][j] != null) {
                        if (new_j > this.mat_fruits[i][j].ind_j) game.add.tween(this.mat_fruits[i][j]).to({
                            x: this.mat_fruits[i][j].x - 5 * resolution
                        }, 150, Phaser.Easing.Quadratic.Out).to({
                            x: this.mat_fruits[i][j].x
                        }, 150, Phaser.Easing.Quadratic.Out).start();
                        else if (new_j < this.mat_fruits[i][j].ind_j) game.add.tween(this.mat_fruits[i][j]).to({
                            x: this.mat_fruits[i][j].x + 5 * resolution
                        }, 150, Phaser.Easing.Quadratic.Out).to({
                            x: this.mat_fruits[i][j].x
                        }, 150, Phaser.Easing.Quadratic.Out).start();
                        if (new_i > this.mat_fruits[i][j].ind_i) game.add.tween(this.mat_fruits[i][j]).to({
                            y: this.mat_fruits[i][j].y - 5 * resolution
                        }, 150, Phaser.Easing.Quadratic.Out).to({
                            y: this.mat_fruits[i][j].y
                        }, 150, Phaser.Easing.Quadratic.Out).start();
                        else if (new_i < this.mat_fruits[i][j].ind_i) game.add.tween(this.mat_fruits[i][j]).to({
                            y: this.mat_fruits[i][j].y + 5 * resolution
                        }, 150, Phaser.Easing.Quadratic.Out).to({
                            y: this.mat_fruits[i][j].y
                        }, 150, Phaser.Easing.Quadratic.Out).start()
                    }
                }
            }
        }
    },
    DetectFalling: function (bubble) {
        if (bubble.to_kill || bubble == play.vect_bubbles_match[0]) return;
        var i = bubble.ind_i;
        for (var i = bubble.ind_i - 1; i <= bubble.ind_i + 1; i++) {
            for (var j = bubble.ind_j - 1; j <= bubble.ind_j + 1; j++) {
                if (bubble.ind_i == i && bubble.ind_j == j || bubble.ind_j % 2 == 0 && i == bubble.ind_i - 1 && (j == bubble.ind_j - 1 || j == bubble.ind_j + 1) || bubble.ind_j % 2 != 0 && i == bubble.ind_i + 1 && (j == bubble.ind_j - 1 || j == bubble.ind_j + 1)) continue;
                if (i >= 0 && j >= 0 && i < play.cols && j < play.rows && play.mat_fruits[i][j] && !play.mat_fruits[i][j].not_falling) {
                    play.mat_fruits[i][j].not_falling = true;
                    play.DetectFalling(play.mat_fruits[i][j])
                }
            }
        }
    },
    RemoveNeighbours: function (bubble, index) {
        if (index < 0) return;
        if (bubble.ind_j % 2 == 0 && (bubble.ind_i == this.vect_bubbles_fall[index].ind_i && (bubble.ind_j == this.vect_bubbles_fall[index].ind_j - 1 || bubble.ind_j == this.vect_bubbles_fall[index].ind_j + 1) || bubble.ind_j == this.vect_bubbles_fall[index].ind_j && (bubble.ind_i == this.vect_bubbles_fall[index].ind_i - 1 || bubble.ind_i == this.vect_bubbles_fall[index].ind_i + 1) || bubble.ind_i == this.vect_bubbles_fall[index].ind_i + 1 && bubble.ind_j == this.vect_bubbles_fall[index].ind_j + 1 || bubble.ind_i == this.vect_bubbles_fall[index].ind_i + 1 && bubble.ind_j == this.vect_bubbles_fall[index].ind_j - 1) || bubble.ind_j % 2 != 0 && (bubble.ind_i == this.vect_bubbles_fall[index].ind_i && (bubble.ind_j == this.vect_bubbles_fall[index].ind_j - 1 || bubble.ind_j == this.vect_bubbles_fall[index].ind_j + 1) || bubble.ind_j == this.vect_bubbles_fall[index].ind_j && (bubble.ind_i == this.vect_bubbles_fall[index].ind_i - 1 || bubble.ind_i == this.vect_bubbles_fall[index].ind_i + 1) || bubble.ind_i == this.vect_bubbles_fall[index].ind_i - 1 && bubble.ind_j == this.vect_bubbles_fall[index].ind_j - 1 || bubble.ind_i == this.vect_bubbles_fall[index].ind_i - 1 && bubble.ind_j == this.vect_bubbles_fall[index].ind_j + 1)) {
            this.vect_bubbles_fall[index].not_falling = false;
            this.vect_bubbles_fall[index].blocked = true;
            var sp = this.vect_bubbles_fall[index];
            this.vect_bubbles_fall.pop();
            if (this.vect_bubbles_fall.length > 0) this.RemoveNeighbours(sp, this.vect_bubbles_fall.length - 1)
        }
    },
    MoveNextBubble: function () {
        play.CanShoot++;
        this.timer_animation = 1
    },
    Select_New_Frame: function () {
        this.compteur_frame++;
        if (this.group_sprites == null || this.compteur_frame > 20) {
            this.new_frame = Math.floor(Math.random() * 6.9 + 1);
            return
        }
        if (Math.random() < .1 && play.counter_pw <= 0) {
            play.new_frame = 75 + Math.floor(Math.random() * 3.9);
            play.counter_pw = 10;
            return
        }
        if (this.group_sprites.countLiving() > 8) {
            var rnd_ind = Math.round(Math.random() * this.group_sprites.length);
            if (this.group_sprites.getAt(rnd_ind).alive && this.group_sprites.getAt(rnd_ind).visible && this.group_sprites.getAt(rnd_ind).frame < 8 && this.group_sprites.getAt(rnd_ind).frame > 0) this.new_frame = this.group_sprites.getAt(rnd_ind).frame;
            else {
                this.Select_New_Frame();
                return
            }
        } else {
            this.new_frame = Math.floor(Math.random() * 6.9 + 1)
        }
        if (play.counter_pw > 0) {
            play.counter_pw--
        }
    },
    ExchangeBubbles: function () {
        if (this.CanShoot > 0 || play.isAddingBubbles > 0 || this.bubble_shoot.isShooted || this.newbubble_prov == this.bubble_shoot) return;
        var provisoire_frame = this.next_bubble.frame;
        this.next_bubble.frame = this.bubble_shoot.frame;
        this.next_bubble.ind = this.bubble_shoot.ind;
        this.next_bubble_frame = this.bubble_shoot.frame;
        this.bubble_shoot.ind = provisoire_frame;
        this.bubble_shoot.frame = provisoire_frame;
        this.bubble_shoot.animations.add("pop", [8 + 9 * (this.bubble_shoot.frame - 1) + 1, 8 + 9 * (this.bubble_shoot.frame - 1) + 2, 8 + 9 * (this.bubble_shoot.frame - 1) + 3, 8 + 9 * (this.bubble_shoot.frame - 1) + 4, 8 + 9 * (this.bubble_shoot.frame - 1) + 5, 8 + 9 * (this.bubble_shoot.frame - 1) + 6, 8 + 9 * (this.bubble_shoot.frame - 1) + 7, 8 + 9 * (this.bubble_shoot.frame - 1) + 8, 8 + 9 * (this.bubble_shoot.frame - 1) + 9], 8, false);
        this.bubble_shoot.frame = provisoire_frame;
        if (this.bubble_shoot.frame == 77) {
            this.bubble_shoot.laser_effect = this.next_bubble.laser_effect;
            this.bubble_shoot.laser_effect.x = this.bubble_shoot.x;
            this.bubble_shoot.laser_effect.y = this.bubble_shoot.y;
            this.bubble_shoot.laser_effect.scale.setTo(this.bubble_shoot.scale.x + .1, this.bubble_shoot.scale.y + .1);
            this.bubble_shoot.laser_effect.bringToTop();
            this.next_bubble.laser_effect = null
        }
        if (this.next_bubble.frame == 77) {
            this.next_bubble.laser_effect = this.bubble_shoot.laser_effect;
            this.next_bubble.laser_effect.x = this.next_bubble.x;
            this.next_bubble.laser_effect.y = this.next_bubble.y;
            this.next_bubble.laser_effect.scale.setTo(this.next_bubble.scale.x + .1, this.next_bubble.scale.y + .1);
            this.next_bubble.laser_effect.bringToTop();
            this.bubble_shoot.laser_effect = null
        }
    },
    Debut_Monter_Bubbles: function () {
        for (var i = 0; i < this.cols; i++) {
            for (var j = 0; j < this.rows; j++) {
                if (play.mat_fruits[i][j] != null && !play.mat_fruits[i][j].tw_fall && !play.mat_fruits[i][j].to_kill && !play.mat_fruits[i][j].not_falling && play.mat_fruits[i][j].y > play.bubble_bigger_y) {
                    play.bubble_bigger_y = play.mat_fruits[i][j].y
                }
            }
        }
        var new_diff = play.bubble_bigger_y - game.height / 2;
        if (new_diff != 0) {
            for (var x = 0; x < play.rows; x++) {
                if (play.mat_fruits[0][x] != null && !play.mat_fruits[0][x].tw_fall && !play.mat_fruits[0][x].to_kill && !play.mat_fruits[0][x].not_falling && play.mat_fruits[0][x].y - new_diff > play.beginY) {
                    new_diff = play.mat_fruits[0][x].y - play.beginY;
                    break
                }
            }
            play.diffY += new_diff;
            play.bubble_bigger_y -= new_diff;
            for (var ii = 0; ii < play.cols; ii++) {
                for (var jj = 0; jj < play.rows; jj++) {
                    if (play.mat_fruits[ii][jj] != null && !play.mat_fruits[ii][jj].tw_fall && !play.mat_fruits[ii][jj].to_kill && !play.mat_fruits[ii][jj].not_falling) {
                        play.CanShoot++;
                        game.add.tween(play.mat_fruits[ii][jj].scale).to({
                            x: 1,
                            y: 1
                        }, 700, Phaser.Easing.Elastic.Out, false, 700 + ii * 100).start();
                        game.time.events.add(600 + play.cols * 100, function () {
                            play.CanShoot--;
                            if (play.CanShoot <= 0) {
                                play.debut = true;
                                if (play.numLevel == 1) play.init_tuto()
                            }
                        }, play);
                        if (play.mat_fruits[ii][jj].lock != null) {
                            game.add.tween(play.mat_fruits[ii][jj].lock.scale).to({
                                x: 1,
                                y: 1
                            }, 700, Phaser.Easing.Elastic.Out, false, 700 + ii * 100).start()
                        }
                    }
                }
            }
            var xx = play.cols - 2;
            while (xx >= 0) {
                var nbr_nulls = 0;
                for (var yy = 0; yy < play.rows; yy++) {
                    if (play.mat_fruits[xx][yy] == null) {
                        nbr_nulls++
                    }
                }
                if (nbr_nulls >= play.rows) {
                    play.mat_fruits.pop();
                    play.mat_types.pop();
                    play.cols--
                } else {
                    break
                }
                xx--
            }
        }
    },
    ShootBubble: function () {
        game.add.tween(this.bubble_shoot.scale).to({
            x: 1,
            y: 1
        }, 100, Phaser.Easing.Linear.None).start();
        this.bubble_shoot.angle = 0;
        var dist = Math.sqrt((this.bubble_shoot.current_mouse_x - this.bubble_shoot.x) * (this.bubble_shoot.current_mouse_x - this.bubble_shoot.x) + (this.bubble_shoot.current_mouse_y - this.bubble_shoot.y) * (this.bubble_shoot.current_mouse_y - this.bubble_shoot.y));
        this.bubble_shoot.body.velocity.x = (this.bubble_shoot.current_mouse_x - this.bubble_shoot.x) / dist * this.vitesse_bubble;
        this.bubble_shoot.body.velocity.y = (this.bubble_shoot.current_mouse_y - this.bubble_shoot.y) / dist * this.vitesse_bubble;
        this.bubble_shoot.vitesseX = this.bubble_shoot.body.velocity.x;
        this.bubble_shoot.vitesseY = this.bubble_shoot.body.velocity.y;
        if (Music.enableMisic && game.sound.usingWebAudio) Music.sounds.play("shoot");
        this.CanShoot++;
        play.newbubble_filled = false;
        if (!play.istimerEndLevel && !play.istimerEndLevelAndLose && !play.isEndAllLevels && !play.gameOver && !play.you_win) {
            play.MoveNextBubble()
        }
    },
    init_tuto: function () {
        if (play.numLevel == 1) {
            this.bg_noire.visible = true;
            game.world.bringToTop(this.bg_noire);
            this.tuto = game.add.sprite(game.width / 2, game.height / 2, "sprites");
            this.tuto.frameName = "bgPause" + resolution + ".png";
            this.tuto.anchor.setTo(.5, .5);
            this.tuto.tuto_word = game.add.text(0, game.height / 2 - 23 * resolution, text.txttutorial, {
                font: 20 * resolution + langFont,
                align: "center",
                fill: "#ffffff",
                stroke: "#000000",
                strokeThickness: 2 * resolution
            });
            this.tuto.tuto_word.x = game.width / 2 - this.tuto.tuto_word.width / 2;
            this.tuto.txt_tuto = game.add.text(0, game.height / 2 + 10 * resolution, text.txttuto1, {
                font: 18 * resolution + langFont,
                align: "center",
                fill: "#ffffff",
                stroke: "#000000",
                strokeThickness: 2 * resolution
            });
            this.tuto.txt_tuto.x = game.width / 2 - this.tuto.txt_tuto.width / 2
        }
    },
    Rotate_Bubbles: function (bubble) {
        var distance_totale = Phaser.Math.distance(bubble.world.x, bubble.world.y, play.center_sprite.world.x, play.center_sprite.world.y);
        if (bubble.body.velocity.y < 0) var dist_x = game.width / 2 - bubble.world.x;
        else var dist_x = bubble.world.x - game.width / 2;
        play.shots_to_add--;
        if (play.shots_to_add <= 0 && play.bubbles_living > 2) play.CanShoot++;
        if (this.tween_angle != null) this.tween_angle.pendingDelete = true;
        this.tween_angle = game.add.tween(this.group_sprites).to({
            angle: this.group_sprites.angle + dist_x * distance_totale / 600
        }, 1500, Phaser.Easing.Quadratic.Out);
        this.tween_angle.start();
        this.tween_angle.onComplete.add(function () {
            play.CanShoot++;
            game.time.events.add(200, function () {
                if (play.shots_to_add <= 0 && play.bubbles_living > 2) {
                    var rnd_bubbles = Math.round(Math.random() * 5 + 3);
                    play.compteur_repeat = 0;
                    play.AddBubbles(rnd_bubbles);
                    play.shots_to_add = Math.ceil(Math.random() * (8 - Math.floor(play.numLevel / 6)))
                }
                play.CanShoot--
            }, play)
        }, this)
    },
    AddBubbles: function (rnd_bubbles) {
        if (play.istimerEndLevelAndLose || play.istimerEndLevel || play.gameOver) {
            play.CanShoot--;
            return
        }
        var rnd_i = Math.floor(Math.random() * (play.cols - .1));
        var rnd_j = Math.floor(Math.random() * (play.rows - .1));
        if (play.mat_fruits[rnd_i][rnd_j] != null) {
            this.AddBubbles(rnd_bubbles);
            return
        }
        var nbr_neighbours = 0;
        for (var i = rnd_i - 1; i < rnd_i + 1; i++) {
            for (var j = rnd_j - 1; j < rnd_j + 1; j++) {
                if (j == rnd_j && i == rnd_i || i < 0 || j < 0 || i >= play.cols || j >= play.rows) continue;
                if (rnd_j % 2 == 0 && i == rnd_i - 1 && (j == rnd_j - 1 || j == rnd_j + 1) || rnd_j % 2 != 0 && i == rnd_i + 1 && (j == rnd_j - 1 || j == rnd_j + 1)) continue;
                if (play.mat_fruits[i][j] != null) nbr_neighbours++
            }
        }
        if (nbr_neighbours == 0) {
            this.AddBubbles(rnd_bubbles);
            return
        }
        var new_x = 0;
        var new_y = 0;
        if (rnd_i < play.center_sprite.ind_i - 3) new_y = -game.height;
        else if (rnd_i > play.center_sprite.ind_i + 3) new_y = game.height * 2;
        else new_y = Math.random() * (200 * resolution) + 100 * resolution;
        if (rnd_j < play.center_sprite.ind_j - 3) new_x = -game.width;
        else if (rnd_j > play.center_sprite.ind_j + 3) new_x = game.width * 2;
        else new_x = Math.random() * (200 * resolution) + 50 * resolution;
        var rnd_frame = Math.floor(Math.random() * 6.9 + 1);
        var sprite = new Phaser.Sprite(game, new_x, new_y, "obj", rnd_frame);
        sprite.islocked = false;
        sprite.lock = null;
        sprite.alive = true;
        sprite.anchor.setTo(.5, .5);
        sprite.animations.add("pop", [8 + 9 * (sprite.frame - 1) + 1, 8 + 9 * (sprite.frame - 1) + 2, 8 + 9 * (sprite.frame - 1) + 3, 8 + 9 * (sprite.frame - 1) + 4, 8 + 9 * (sprite.frame - 1) + 5, 8 + 9 * (sprite.frame - 1) + 6, 8 + 9 * (sprite.frame - 1) + 7, 8 + 9 * (sprite.frame - 1) + 8, 8 + 9 * (sprite.frame - 1) + 9], 8, false);
        sprite.frame = rnd_frame;
        sprite.ind = sprite.frame;
        sprite.to_kill = false;
        sprite.not_falling = false;
        sprite.blocked = false;
        sprite.txt_created = false;
        if (sprite.tw != null) sprite.tw.pause();
        sprite.tw = null;
        sprite.tw_fall = null;
        sprite.initWidth = sprite.width;
        sprite.initHeight = sprite.height;
        sprite.tw_stop = game.add.tween(sprite).to({
            width: sprite.initWidth * 1.2,
            height: sprite.initHeight * .8
        }, this.tw_stop_time, Phaser.Easing.Circular.None).to({
            width: sprite.initWidth,
            height: sprite.initHeight
        }, this.tw_stop_time + 50, Phaser.Easing.Circular.None);
        sprite.tw_stop.do_start = true;
        sprite.tw_stop.isStart = false;
        sprite.tw_stop.onComplete.add(function () {
            if (this.isStart) {
                play.nbr_tween_started--;
                this.isStart = false
            }
        }, sprite.tw_stop);
        switch (rnd_frame) {
            case 1:
                sprite.score = 10;
                break;
            case 2:
                sprite.score = 10;
                break;
            case 3:
                sprite.score = 15;
                break;
            case 4:
                sprite.score = 20;
                break;
            case 5:
                sprite.score = 20;
                break;
            case 6:
                sprite.score = 25;
                break;
            case 7:
                sprite.score = 30;
                break;
            default:
                sprite.score = 0
        }
        sprite.ind_i = rnd_i;
        sprite.ind_j = rnd_j;
        sprite.origin_ind = sprite.ind;
        this.bubbles_living++;
        var to_x = play.center_sprite.x - (play.center_sprite.ind_j - rnd_j) * play.tailleX;
        var to_y = play.center_sprite.y - (play.center_sprite.ind_i - rnd_i) * play.tailleY - rnd_j % 2 * play.tailleX / 2 + play.tailleY / 2;
        sprite.visible = false;
        sprite.x = to_x;
        sprite.y = to_y;
        this.group_sprites.add(sprite);
        if (sprite.world.x + play.tailleX / 2 >= play.to_lose_right || sprite.world.x - play.tailleX / 2 <= play.to_lose_left || sprite.world.y - play.tailleY / 2 <= play.to_lose_up || sprite.world.y + play.tailleY / 2 >= play.to_lose_down) {
            game.world.add(sprite);
            sprite.kill();
            play.compteur_repeat++;
            if (play.compteur_repeat > 10) {
                rnd_bubbles--;
                play.compteur_repeat = 0
            }
            if (rnd_bubbles > 0) this.AddBubbles(rnd_bubbles);
            else play.CanShoot--;
            return
        } else {
            game.world.add(sprite);
            sprite.x = new_x;
            sprite.y = new_y;
            sprite.visible = true
        }
        play.CanShoot++;
        play.isAddingBubbles++;
        sprite.to_position = true;
        game.add.tween(sprite).to({
            x: to_x,
            y: to_y
        }, 250, Phaser.Easing.Linear.None).start().onComplete.add(function () {
            play.CanShoot--;
            play.isAddingBubbles--;
            game.physics.enable(this);
            this.body.setSize(15 * resolution, 14.5 * resolution, 0, resolution);
            this.to_position = false;
            if (!play.bubble_on_top || this.y < play.bubble_on_top.y) {
                play.bubble_on_top = this
            }
        }, sprite);
        this.mat_fruits[rnd_i][rnd_j] = sprite;
        this.group_sprites.add(sprite);
        rnd_bubbles--;
        if (rnd_bubbles > 0) this.AddBubbles(rnd_bubbles);
        else play.CanShoot--
    },
    Test_Powerups: function (bubble, frame_bubble_touched) {
        switch (bubble.frame) {
            case 75:
                if (frame_bubble_touched == play.center_sprite.frame || frame_bubble_touched >= 8 || frame_bubble_touched == 0) frame_bubble_touched = Math.floor(Math.random() * 6.9 + 1);
                if (Music.enableMisic && game.sound.usingWebAudio) Music.sounds.play("colored");
                for (var i = bubble.ind_i - 1; i <= bubble.ind_i + 1; i++) {
                    for (var j = bubble.ind_j - 1; j <= bubble.ind_j + 1; j++) {
                        if (i < 0 || j < 0 || i >= play.cols || j >= play.rows) continue;
                        if (play.mat_fruits[i][j] && (play.mat_fruits[i][j].frame == 73 || play.mat_fruits[i][j].frame == 74 || play.mat_fruits[i][j].frame == 0 || this.mat_fruits[i][j].islocked)) continue;
                        if (play.mat_fruits[i][j] && (play.mat_fruits[i][j].ind_i != play.center_sprite.ind_i || play.mat_fruits[i][j].ind_j != play.center_sprite.ind_j)) {
                            game.add.tween(play.mat_fruits[i][j]).to({
                                angle: -360
                            }, 400, Phaser.Easing.Linear.None).start().onComplete.add(function () {
                                this.frame = frame_bubble_touched;
                                this.ind = frame_bubble_touched;
                                this.animations.add("pop", [8 + 9 * (this.frame - 1) + 1, 8 + 9 * (this.frame - 1) + 2, 8 + 9 * (this.frame - 1) + 3, 8 + 9 * (this.frame - 1) + 4, 8 + 9 * (this.frame - 1) + 5, 8 + 9 * (this.frame - 1) + 6, 8 + 9 * (this.frame - 1) + 7, 8 + 9 * (this.frame - 1) + 8, 8 + 9 * (this.frame - 1) + 9], 8, false);
                                this.frame = frame_bubble_touched
                            }, play.mat_fruits[i][j])
                        }
                        if (play.mat_fruits[i][j]) {
                            for (var ii = play.mat_fruits[i][j].ind_i - 1; ii <= play.mat_fruits[i][j].ind_i + 1; ii++) {
                                for (var jj = play.mat_fruits[i][j].ind_j - 1; jj <= play.mat_fruits[i][j].ind_j + 1; jj++) {
                                    if (ii < 0 || jj < 0 || ii >= play.cols || jj >= play.rows) continue;
                                    if (play.mat_fruits[ii][jj] && (play.mat_fruits[ii][jj].frame == 73 || play.mat_fruits[ii][jj].frame == 74 || play.mat_fruits[ii][jj].frame == 0 || this.mat_fruits[ii][jj].islocked)) continue;
                                    if (play.mat_fruits[ii][jj] && (play.mat_fruits[ii][jj].ind_i != play.center_sprite.ind_i || play.mat_fruits[ii][jj].ind_j != play.center_sprite.ind_j)) {
                                        game.add.tween(play.mat_fruits[ii][jj]).to({
                                            angle: -360
                                        }, 400, Phaser.Easing.Linear.None).start().onComplete.add(function () {
                                            this.frame = frame_bubble_touched;
                                            this.ind = frame_bubble_touched;
                                            this.animations.add("pop", [8 + 9 * (this.frame - 1) + 1, 8 + 9 * (this.frame - 1) + 2, 8 + 9 * (this.frame - 1) + 3, 8 + 9 * (this.frame - 1) + 4, 8 + 9 * (this.frame - 1) + 5, 8 + 9 * (this.frame - 1) + 6, 8 + 9 * (this.frame - 1) + 7, 8 + 9 * (this.frame - 1) + 8, 8 + 9 * (this.frame - 1) + 9], 8, false);
                                            this.frame = frame_bubble_touched
                                        }, play.mat_fruits[ii][jj])
                                    }
                                }
                            }
                        }
                    }
                }
                break;
            case 76:
                if (Music.enableMisic && game.sound.usingWebAudio) Music.sounds.play("bomb");
                play.CanShoot++;
                var bomb_anim = game.add.sprite(bubble.world.x, bubble.world.y, "bomb_effect", 0);
                bomb_anim.anchor.setTo(.5, .5);
                bomb_anim.animations.add("explosion");
                bomb_anim.animations.play("explosion", 20, false, true);
                game.add.tween(bomb_anim.scale).to({
                    x: 2,
                    y: 2
                }, 500, Phaser.Easing.Back.Out).start();
                game.time.events.add(150, function () {
                    for (var i = bubble.ind_i - 1; i <= bubble.ind_i + 1; i++) {
                        for (var j = bubble.ind_j - 1; j <= bubble.ind_j + 1; j++) {
                            if (bubble.ind_j % 2 == 0 && i == bubble.ind_i - 1 && (j == bubble.ind_j - 1 || j == bubble.ind_j + 1) || bubble.ind_j % 2 != 0 && i == bubble.ind_i + 1 && (j == bubble.ind_j - 1 || j == bubble.ind_j + 1)) continue;
                            if (i == this.center_sprite.ind_i && j == this.center_sprite.ind_j) continue;
                            if (i >= 0 && j >= 0 && i < this.cols && j < this.rows && this.mat_fruits[i][j] != null && !this.mat_fruits[i][j].islocked && this.mat_fruits[i][j].frame != 0 && this.mat_fruits[i][j].frame != 73 && this.mat_fruits[i][j].frame != 74) {
                                this.vect_bubbles_match.push(this.mat_fruits[i][j])
                            }
                        }
                    }
                    bubble.to_kill = true;
                    play.After_Match(true)
                }, this);
                break;
            case 77:
                break;
            case 78:
                var last_in_line = null;
                var first_in_line = null;
                var nbr_nulls = 0;
                for (var i = 0; i < play.cols; i++) {
                    nbr_nulls = 0;
                    if (last_in_line != null) {
                        this.vect_bubbles_match.push(last_in_line)
                    }
                    last_in_line = null;
                    first_in_line = null;
                    for (var j = 0; j < play.rows; j++) {
                        if (i == this.center_sprite.ind_i && j == this.center_sprite.ind_j) continue;
                        if (!this.mat_fruits[i][j]) {
                            nbr_nulls++;
                            if (nbr_nulls == play.rows) {
                                for (var xx = 0; xx < play.rows; xx++) {
                                    if (i - 1 >= 0 && this.mat_fruits[i - 1][xx]) {
                                        var already_exist = 0;
                                        for (var yy = 0; yy < this.vect_bubbles_match.length; yy++) {
                                            if (this.vect_bubbles_match[yy] == this.mat_fruits[i - 1][j]) already_exist++
                                        }
                                        if (already_exist == 0 && this.mat_fruits[i - 1][xx].frame < 8 && this.mat_fruits[i - 1][xx].frame > 0 && !this.mat_fruits[i - 1][xx].islocked && !(i - 1 == this.center_sprite.ind_i && xx == this.center_sprite.ind_j)) {
                                            this.vect_bubbles_match.push(this.mat_fruits[i - 1][xx])
                                        }
                                    }
                                }
                            }
                        } else if (this.mat_fruits[i][j].frame < 8 && this.mat_fruits[i][j].frame > 0 && !this.mat_fruits[i][j].islocked) {
                            if (i == 0) {
                                this.vect_bubbles_match.push(this.mat_fruits[i][j])
                            } else if (first_in_line == null) {
                                first_in_line = this.mat_fruits[i][j];
                                this.vect_bubbles_match.push(first_in_line)
                            } else {
                                last_in_line = this.mat_fruits[i][j]
                            }
                        }
                    }
                }
                this.vect_bubbles_match.push(bubble);
                play.After_Match(true);
                break
        }
    },
    LaserEffect: function () {
        if (!(this.tw_fall == null && !this.to_kill && !this.not_falling)) return;
        if (this.ind_i == play.center_sprite.ind_i && this.ind_j == play.center_sprite.ind_j) return;
        if (this.frame >= 8 || this.frame == 0 || this.islocked) return;
        this.bringToTop();
        this.to_kill = true;
        this.play("pop", 20, false, false);
        game.add.tween(this.scale).to({
            x: 2,
            y: 2
        }, 400, Phaser.Easing.Back.Out).start();
        play.bubbles_living--;
        if (Music.enableMisic && game.sound.usingWebAudio) Music.sounds.play("pop");
        play.mat_fruits[this.ind_i][this.ind_j] = null;
        play.mat_types[this.ind_i][this.ind_j] = 0;
        this.animations.getAnimation("pop").onComplete.add(function () {
            this.scale.setTo(1, 1);
            this.kill()
        }, this);
        if (!this.txt_created) play.creer_text_score(this);
        play.current_score += this.score;
        play.txt_score.setText("" + play.current_score);
        play.txt_score.x = 159 * resolution - play.txt_score.width / 2;
        if (play.current_score > highscore) {
            highscore = play.current_score;
            play.txt_best_score.setText(text.txtbest + highscore)
        }
    },
    NextStage: function () {
        if (this.numLevel <= nombre_levels) {
            this.numLevel++
        }
        if (play.tween_angle) play.tween_angle.pendingDelete = true;
        play.center_sprite.kill();
        play.bubble_shoot.revive();
        play.center_sprite = null;
        play.bubble_on_top = null;
        play.bubbles_living = 0;
        play.vect_bubbles_match = [];
        play.vect_bubbles_fall = [];
        play.compteur_repeat = 0;
        play.shots_to_add = Math.ceil(Math.random() * (8 - Math.floor(play.numLevel / 6)));
        this.rows = 15;
        this.cols = 15;
        this.istimerEndLevel = false;
        this.timerEndLevel = null;
        play.debut = false;
        this.txt_level.setText(text.txtlevel + "\n" + play.numLevel);
        this.map.currentLayer = this.numLevel - 1;
        this.mat_fruits = [];
        for (var m = 0; m < this.cols; m++) {
            this.mat_fruits[m] = [];
            for (var k = 0; k < this.rows; k++) {
                this.mat_fruits[m][k] = null
            }
        }
        this.mat_types = [];
        for (var x = 0; x < this.cols; x++) {
            this.mat_types[x] = [];
            for (var y = 0; y < this.rows; y++) {
                this.mat_types[x][y] = this.map.getTile(y, x).index - 1
            }
        }
        this.init_bubbles();
        play.CanShoot = 0;
        if (!this.newbubble_filled) {
            play.MoveNextBubble();
            game.time.events.add(500, function () {
                this.bubble_shoot = this.newbubble_prov;
                play.newbubble_prov = null
            }, this)
        }
        play.group_sprites.angle = 0;
        this.txt_newstage.setText(text.txtlevel + " " + play.numLevel);
        game.add.tween(this.bg_newstage).to({
            x: game.width / 2
        }, 700, Phaser.Easing.Elastic.Out).start();
        game.add.tween(this.txt_newstage).to({
            x: game.width / 2 - this.txt_newstage.width / 2 + 2 * resolution
        }, 700, Phaser.Easing.Elastic.Out).start();
        game.time.events.add(1500, function () {
            game.add.tween(this.bg_newstage).to({
                x: -game.width
            }, 700, Phaser.Easing.Elastic.Out).start();
            game.add.tween(this.txt_newstage).to({
                x: -game.width
            }, 700, Phaser.Easing.Elastic.Out).start();
            this.bubble_shoot.x = 169 * resolution;
            this.bubble_shoot.y = 395.5 * resolution;
            this.bubble_shoot.scale.setTo(1.25, 1.25);
            this.bubble_shoot.visible = true
        }, play);
        for (var ii = 0; ii < play.cols; ii++) {
            for (var jj = 0; jj < play.rows; jj++) {
                if (play.mat_fruits[ii][jj] != null && !play.mat_fruits[ii][jj].tw_fall && !play.mat_fruits[ii][jj].to_kill && !play.mat_fruits[ii][jj].not_falling) {
                    play.CanShoot++;
                    game.add.tween(play.mat_fruits[ii][jj].scale).to({
                        x: 1,
                        y: 1
                    }, 700, Phaser.Easing.Elastic.Out, false, ii * 100).start();
                    game.time.events.add(600 + play.cols * 100, function () {
                        play.CanShoot--;
                        if (play.CanShoot <= 0) {
                            play.debut = true
                        }
                    }, play);
                    if (play.mat_fruits[ii][jj].lock != null) {
                        game.add.tween(play.mat_fruits[ii][jj].lock.scale).to({
                            x: 1,
                            y: 1
                        }, 700, Phaser.Easing.Elastic.Out, false, ii * 100).start()
                    }
                }
            }
        }
    },
    func_cheat: function () {
        play.group_sprites.forEachAlive(function (sp) {
            sp.kill()
        });
        play.NextStage();
        play.CanShoot = 0;
        play.debut = true;
        play.tuto = null
    },
    actionMusic: function () {
        this.stateMusic = !this.stateMusic;
        if (this.stateMusic) {
            this.bnt_music.frameName = "music_bnt_pause" + resolution + ".png";
            if (!this.ispause_music) {
                Music.music.resume()
            }
        } else {
            this.bnt_music.frameName = "mute_bnt_pause" + resolution + ".png";
            if (!this.ispause_music) {
                Music.music.pause()
            }
        }
    }
};
window.onload = function () {
    setTimeout(function () {
        window.scrollTo(0, 1)
    }, 10);
    game = new Phaser.Game(320 * resolution, 480 * resolution, Phaser.CANVAS);
    play = game.state.add("play", bubbleSpin.Play, false);
    game.state.add("credits", bubbleSpin.Credits, false);
    game.state.add("menu", bubbleSpin.Menu, false);
    game.state.add("preload", bubbleSpin.Preload, false);
    game.state.add("boot", bubbleSpin.Boot, true)
};



window.addEventListener("load", function () {
	function onTouchPreventDefault(event) {
		event.preventDefault();
	};
	document.addEventListener("touchmove", onTouchPreventDefault, false);
	document.addEventListener("touchstart", onTouchPreventDefault, false);
}, false);
window.addEventListener('scroll', function () {
	document.body.scrollTop = 0;
}, true);

window.addEventListener('resize', function () {
	document.body.scrollTop = 0;
}, true);




