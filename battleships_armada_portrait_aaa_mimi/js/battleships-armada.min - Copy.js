var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var BattleshipsArmada;
(function (BattleshipsArmada) {
    var AdTimer = (function () {
        function AdTimer() {
        }
        AdTimer.timeForAd = function () {
            if (!AdTimer.lastTime) {
                AdTimer.lastTime = Date.now();
                return true;
            }
            var eventStartTime = AdTimer.lastTime;
            var eventEndTime = Date.now();
            var duration = eventEndTime - eventStartTime;
            var timeForAd = duration > AdTimer.AD_INTERVAL_MILLISECONDS;
            if (!timeForAd) {
                AdTimer.printOutTimerData(duration);
            }
            return timeForAd;
        };
        AdTimer.printOutTimerData = function (current) {
            if (current === void 0) { current = 0; }
            if (BattleshipsArmada.GameConstants.DEVELOPMENT) {
                console.log("Not time for ad yet.");
                console.log("Interval: " + AdTimer.AD_INTERVAL_MILLISECONDS + " ms");
                if (current) {
                    console.error("Current: " + current + " ms");
                }
            }
        };
        AdTimer.AD_INTERVAL_MILLISECONDS = 60000 * 5;
        return AdTimer;
    }());
    BattleshipsArmada.AdTimer = AdTimer;
})(BattleshipsArmada || (BattleshipsArmada = {}));
var BattleshipsArmada;
(function (BattleshipsArmada) {
    var AudioManager = (function () {
        function AudioManager() {
            if (AudioManager._instance) {
                throw new Error("Error: Instantiation failed: Use GameVars.getInstance() instead of new");
            }
            else {
                AudioManager._instance = this;
            }
        }
        AudioManager.getInstance = function () {
            if (AudioManager._instance === null) {
                AudioManager._instance = new AudioManager();
            }
            return AudioManager._instance;
        };
        AudioManager.prototype.init = function (game) {
            AudioManager.game = game;
            this.loopPlayingKey = null;
            this.audioSprite = AudioManager.game.add.audioSprite("audio-sprite");
            this.audioSprite.sounds.allowMultiple = true;
            AudioManager.game.sound.mute = !BattleshipsArmada.GameVars.gameData.sound;
        };
        AudioManager.prototype.mute = function () {
            BattleshipsArmada.GameVars.gameData.sound = false;
            AudioManager.game.sound.mute = true;
            BattleshipsArmada.GameManager.setStorageData(BattleshipsArmada.GameConstants.GAME_DATA_KEY, BattleshipsArmada.GameVars.gameData, function (error) {
                BattleshipsArmada.GameManager.log("audio status saved");
            }, function (error) {
                BattleshipsArmada.GameManager.log("failed to save audio status", error);
            });
        };
        AudioManager.prototype.unmute = function () {
            BattleshipsArmada.GameVars.gameData.sound = true;
            AudioManager.game.sound.mute = false;
            BattleshipsArmada.GameManager.setStorageData(BattleshipsArmada.GameConstants.GAME_DATA_KEY, BattleshipsArmada.GameVars.gameData, function (error) {
                BattleshipsArmada.GameManager.log("audio status saved");
            }, function (error) {
                BattleshipsArmada.GameManager.log("failed to save audio status", error);
            });
        };
        AudioManager.prototype.playSound = function (key, loop, volume) {
            loop = loop || false;
            this.audioSprite.play(key, volume);
            if (loop) {
                if (this.loopPlayingKey && (this.loopPlayingKey !== key)) {
                    this.stopSound(this.loopPlayingKey, false, true);
                }
                this.loopPlayingKey = key;
            }
        };
        AudioManager.prototype.stopSound = function (key, fade, loop) {
            if (key === null || typeof key === "undefined") {
                return;
            }
            if (fade) {
                var sound = this.audioSprite.get(key);
                sound.fadeOut(850);
            }
            else {
                this.audioSprite.stop(key);
            }
            if (loop) {
                this.loopPlayingKey = null;
            }
        };
        AudioManager._instance = null;
        return AudioManager;
    }());
    BattleshipsArmada.AudioManager = AudioManager;
})(BattleshipsArmada || (BattleshipsArmada = {}));
var BattleshipsArmada;
(function (BattleshipsArmada) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            var _this = _super.call(this, BattleshipsArmada.GameConstants.GAME_WIDTH, BattleshipsArmada.GameConstants.GAME_HEIGHT, Phaser.CANVAS, "content", null, false, true) || this;
            Game.currentInstance = _this;
            _this.state.add("PreLoader", BattleshipsArmada.PreLoader, false);
            _this.state.add("SplashState", BattleshipsArmada.SplashState, false);
            _this.state.add("SetBoardState", BattleshipsArmada.SetBoardState, false);
            _this.state.add("BattleState", BattleshipsArmada.BattleState, false);
            _this.state.add("Boot", BattleshipsArmada.Boot, true);
            return _this;
        }
        return Game;
    }(Phaser.Game));
    BattleshipsArmada.Game = Game;
})(BattleshipsArmada || (BattleshipsArmada = {}));
var BattleshipsArmada;
(function (BattleshipsArmada) {
    var GameConstants = (function () {
        function GameConstants() {
        }
        GameConstants.VERSION = "1.0";
        GameConstants.ASSETS_PATH = "assets";
        GameConstants.DEVELOPMENT = false;
        GameConstants.SHOW_COORDINATES = false;
        GameConstants.ADVERSARY_SHIPS_VISIBLE = false;
        GameConstants.VERBOSE = false;
        GameConstants.AI_SHOTS = false;
        GameConstants.SHOW_PROBABILITIES = false;
        GameConstants.START_SCENE = "SplashState";
        GameConstants.LANGUAGE_EN = "en";
        GameConstants.LANGUAGE_BR = "br";
        GameConstants.LANGUAGE_DE = "de";
        GameConstants.LANGUAGE_ES = "es";
        GameConstants.LANGUAGE_FR = "fr";
        GameConstants.LANGUAGE_IT = "it";
        GameConstants.LANGUAGE_RU = "ru";
        GameConstants.LANGUAGES = [
            GameConstants.LANGUAGE_BR,
            GameConstants.LANGUAGE_DE,
            GameConstants.LANGUAGE_ES,
            GameConstants.LANGUAGE_EN,
            GameConstants.LANGUAGE_FR,
            GameConstants.LANGUAGE_IT,
            GameConstants.LANGUAGE_RU
        ];
        GameConstants.LANGUAGES_TEXT = [
            "PORTUGUESE",
            "GERMAN",
            "SPANISH",
            "ENGLISH",
            "FRENCH",
            "ITALIAN",
            "RUSSIAN"
        ];
        GameConstants.GAME_WIDTH = 768;
        GameConstants.GAME_HEIGHT = 1024;
        GameConstants.SQUARE_WIDTH = 74.5;
        GameConstants.BOARD_PY = 520;
        GameConstants.PLAYER = "player";
        GameConstants.AI = "ai";
        GameConstants.EASY = 1;
        GameConstants.MEDIUM = 4;
        GameConstants.HARD = 8;
        GameConstants.UNKNOWN_CELL = 0;
        GameConstants.WATER_AI = 1;
        GameConstants.HIT = 2;
        GameConstants.SUNK_SHIP = 3;
        GameConstants.WATER = 0;
        GameConstants.WATER_MISSED = 1;
        GameConstants.SHIP_DESTROYER = 2;
        GameConstants.SHIP_CRUISER = 3;
        GameConstants.SHIP_SUBMARINE = 4;
        GameConstants.SHIP_BATTLESHIP = 5;
        GameConstants.SHIP_CARRIER = 6;
        GameConstants.SHIP_DESTROYER_HIT = 7;
        GameConstants.SHIP_CRUISER_HIT = 8;
        GameConstants.SHIP_SUBMARINE_HIT = 9;
        GameConstants.SHIP_BATTLESHIP_HIT = 10;
        GameConstants.SHIP_CARRIER_HIT = 11;
        GameConstants.SHIP_DESTROYER_SUNK = 12;
        GameConstants.SHIP_CRUISER_SUNK = 13;
        GameConstants.SHIP_SUBMARINE_SUNK = 14;
        GameConstants.SHIP_BATTLESHIP_SUNK = 15;
        GameConstants.SHIP_CARRIER_SUNK = 16;
        GameConstants.NUM_MISSILES = 3;
        GameConstants.TIME_FADE_IN_OUT = 350;
        GameConstants.FADE_COLOR = 0x000000;
        GameConstants.SPLASH_SCENE = -1;
        GameConstants.WAITING_SCENE = 0;
        GameConstants.SET_BOARD_SCENE = 1;
        GameConstants.BATTLE_SCENE = 2;
        GameConstants.FINAL_SCENE = 3;
        GameConstants.PLAYER_RESIGNED = "player resigned";
        GameConstants.ADVERSARY_RESIGNED = "adversary resigned";
        GameConstants.PLAYER_TIMEOUT = "player timeout";
        GameConstants.ADVERSARY_TIMEOUT = "adversary timeout";
        GameConstants.WATER_NAME = "water";
        GameConstants.SHIPS = [GameConstants.SHIP_CARRIER, GameConstants.SHIP_BATTLESHIP, GameConstants.SHIP_SUBMARINE, GameConstants.SHIP_CRUISER, GameConstants.SHIP_DESTROYER];
        GameConstants.CELLS_TO_CHECK = [{ row: -1, col: 0 }, { row: 0, col: 1 }, { row: 1, col: 0 }, { row: 0, col: -1 }];
        GameConstants.RED_SQUARE = "red-square";
        GameConstants.GREEN_SQUARE = "green-square";
        GameConstants.OLIVE_GREEN_SQUARE = "olive-green-square";
        GameConstants.BLUE_SQUARE = "blue-square";
        GameConstants.WHITE_SQUARE = "white-square";
        GameConstants.BLACK_SQUARE = "black-square";
        GameConstants.GRAY_SQUARE = "gray-square";
        GameConstants.DARK_BLUE_SQUARE = "dark-blue-square";
        GameConstants.CYAN_SQUARE = "cyan-square";
        GameConstants.BITMAP_SIZE = 64;
        GameConstants.ALPHA_LAYERS = .25;
        GameConstants.TIME_FADE = 600;
        GameConstants.AUDIO_STATE_KEY = "battleships-audio";
        GameConstants.SAVED_GAME_KEY = "battleships-saved-game";
        GameConstants.GAME_DATA_KEY = "battleships_game_data";
        GameConstants.ACHIEVEMENTS_DATA = "battleship-achievements-data";
        return GameConstants;
    }());
    BattleshipsArmada.GameConstants = GameConstants;
})(BattleshipsArmada || (BattleshipsArmada = {}));
var BattleshipsArmada;
(function (BattleshipsArmada) {
    var GameManager = (function () {
        function GameManager() {
        }
        GameManager.init = function (game) {
            GameManager.game = game;
            GameManager.resetVars();
            GameManager.readGameStorage();
        };
        GameManager.onGameDataRead = function () {
            BattleshipsArmada.AudioManager.getInstance().init(this.game);
            BattleshipsArmada.GameVars.languages = this.game.cache.getJSON("languages");
            GameManager.game.state.start(BattleshipsArmada.GameConstants.START_SCENE, true, false);
        };
        GameManager.startSplash = function () {
            GameManager.game.state.start("SplashState", true, false);
        };
        GameManager.onGameDataRetrieved = function (gameData) {
            if (gameData) {
                BattleshipsArmada.GameVars.gameData = JSON.parse(gameData);
            }
            else {
                var friendsStatsData = { gamesWon: 0, hits: 0, total: 0, gamesLost: 0 };
                var randomStatsData = { gamesWon: 0, hits: 0, total: 0, gamesLost: 0 };
                var computerStatsData = { gamesWon: 0, hits: 0, total: 0, gamesLost: 0 };
                BattleshipsArmada.GameVars.gameData = {
                    globalStatsData: { friendsStatsData: friendsStatsData, randomStatsData: randomStatsData, computerStatsData: computerStatsData },
                    sound: true,
                    language: BattleshipsArmada.GameConstants.LANGUAGE_EN
                };
            }
            GameManager.onGameDataRead();
        };
        GameManager.soloGameChosen = function (type) {
            GameManager.resetVars();
            if (type) {
                BattleshipsArmada.GameVars.gameType = type;
            }
            GameManager.game.state.start("SetBoardState", true, false);
        };
        GameManager.rematch = function () {
            GameManager.resetVars();
            GameManager.game.state.start("SetBoardState", true, false);
        };
        GameManager.selectScene = function () {
            GameManager.log("SELECT SCENE " + BattleshipsArmada.GameVars.currentScene);
            if (BattleshipsArmada.GameVars.currentScene === BattleshipsArmada.GameConstants.SET_BOARD_SCENE) {
                GameManager.game.state.start("SetBoardState", true, false);
            }
            else {
                GameManager.game.state.start("BattleState", true, false);
            }
        };
        GameManager.addHit = function () {
            if (BattleshipsArmada.GameVars.currentTurn === BattleshipsArmada.GameConstants.PLAYER) {
                BattleshipsArmada.GameVars.hits++;
                BattleshipsArmada.GameVars.total++;
            }
        };
        GameManager.addMissedHit = function () {
            if (BattleshipsArmada.GameVars.currentTurn === BattleshipsArmada.GameConstants.PLAYER) {
                BattleshipsArmada.GameVars.total++;
            }
        };
        GameManager.onStatsDataSaved = function () {
            GameManager.log("stats data saved");
        };
        GameManager.onStatsSavingFailed = function (error) {
            GameManager.log("failed to save stats data!", error);
        };
        GameManager.setRandom = function (data) {
            BattleshipsArmada.SetBoardManager.currentInstance.setRandom(data);
        };
        GameManager.hint = function () {
            BattleshipsArmada.BattleState.currentInstance.hint();
        };
        GameManager.setLanguage = function (name) {
            BattleshipsArmada.GameVars.gameData.language = name;
            GameManager.setStorageData(BattleshipsArmada.GameConstants.GAME_DATA_KEY, BattleshipsArmada.GameVars.gameData, function (error) {
                GameManager.log("language status saved");
            }, function (error) {
                GameManager.log("failed to save language status", error);
            });
            BattleshipsArmada.SplashState.currentInstance.onLanguageSet();
        };
        GameManager.getStorageData = function (key, successCb, failureCb) {
            var data;
            data = localStorage.getItem(key);
            successCb(data);
        };
        GameManager.setStorageData = function (key, value, successCb, failureCb) {
            localStorage.setItem(key, JSON.stringify(value));
            successCb();
        };
        GameManager.readGameStorage = function () {
            GameManager.getStorageData(BattleshipsArmada.GameConstants.GAME_DATA_KEY, GameManager.onGameDataRetrieved, function (error) {
                GameManager.log("failed to retrieve stats data", error);
            });
        };
        GameManager.log = function (text, error) {
            if (!BattleshipsArmada.GameConstants.VERBOSE) {
                return;
            }
            if (error) {
                console.log(text + ":");
                console.error(error);
            }
            else {
                console.log(text);
            }
        };
        GameManager.resetVars = function () {
            BattleshipsArmada.GameVars.win = null;
            BattleshipsArmada.GameVars.rivalResigned = false;
            BattleshipsArmada.GameVars.resigned = false;
            BattleshipsArmada.GameVars.timeout = false;
            BattleshipsArmada.GameVars.rivalTimeout = false;
            BattleshipsArmada.GameVars.idAdversary = null;
            BattleshipsArmada.GameVars.ranks = null;
            BattleshipsArmada.GameVars.currentScene = BattleshipsArmada.GameConstants.SPLASH_SCENE;
            BattleshipsArmada.GameVars.playerBoard = null;
            BattleshipsArmada.GameVars.adversaryBoard = null;
            if (BattleshipsArmada.GameConstants.AI_SHOTS) {
                BattleshipsArmada.GameVars.currentTurn = BattleshipsArmada.GameConstants.AI;
            }
            else {
                BattleshipsArmada.GameVars.currentTurn = BattleshipsArmada.GameConstants.PLAYER;
            }
            BattleshipsArmada.GameVars.shot = 0;
            BattleshipsArmada.GameVars.animation = 0;
            BattleshipsArmada.GameVars.playerShipsSunks = 0;
            BattleshipsArmada.GameVars.rivalShipsSunks = 0;
            BattleshipsArmada.GameVars.playerBoardAI = null;
            BattleshipsArmada.GameVars.shipLengths = [2, 3, 3, 4, 5];
            BattleshipsArmada.GameVars.shipLengthsPlayer = [2, 3, 3, 4, 5];
            BattleshipsArmada.GameVars.lastMessageID = null;
            BattleshipsArmada.GameVars.hits = 0;
            BattleshipsArmada.GameVars.total = 0;
            BattleshipsArmada.GameVars.timeLastMove = 0;
            BattleshipsArmada.GameVars.senderiOS = false;
            BattleshipsArmada.GameVars.timeSet = null;
            BattleshipsArmada.GameVars.randomReaded = false;
            BattleshipsArmada.GameVars.needResign = false;
            BattleshipsArmada.GameVars.needTimeoutAdversary = false;
            BattleshipsArmada.GameVars.needTimeoutPlayer = false;
            BattleshipsArmada.GameVars.bot = false;
            BattleshipsArmada.GameVars.dissolve = false;
            BattleshipsArmada.GameVars.startMatch = false;
            BattleshipsArmada.GameVars.autodeploying = false;
            BattleshipsArmada.GameVars.firstTurnChanged = false;
        };
        return GameManager;
    }());
    BattleshipsArmada.GameManager = GameManager;
})(BattleshipsArmada || (BattleshipsArmada = {}));
var BattleshipsArmada;
(function (BattleshipsArmada) {
    var GameVars = (function () {
        function GameVars() {
        }
        GameVars.areValidDomains = function (domains) {
            var isValid = false;
            for (var i = 0; i < domains.length; i++) {
                if (window.location.hostname.indexOf(domains[i]) !== -1) {
                    isValid = true;
                    break;
                }
            }
            return isValid;
        };
        GameVars.makeid = function () {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for (var i = 0; i < 20; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
        };
        GameVars.validName = function (name) {
            var i = name.indexOf(" ");
            if (i >= 0) {
                name = name.substr(0, i);
            }
            if (name.length > 13) {
                name = name.substr(0, 11);
                name += "...";
            }
            return name;
        };
        GameVars.getCoordinatesFromRowAndCol = function (row, col) {
            var x = BattleshipsArmada.GameConstants.SQUARE_WIDTH * (col - 4.5);
            var y = BattleshipsArmada.GameConstants.SQUARE_WIDTH * (row - 4.5);
            return { x: x, y: y };
        };
        GameVars.countOcurrencies = function (grid, value) {
            var ret = 0;
            for (var row = 0; row < 10; row++) {
                for (var col = 0; col < 10; col++) {
                    if (grid[row][col] === value) {
                        ret++;
                    }
                }
            }
            return ret;
        };
        GameVars.replaceValues = function (grid, oldValue, newValue) {
            var gridPoints = [];
            for (var row = 0; row < 10; row++) {
                for (var col = 0; col < 10; col++) {
                    if (grid[row][col] === oldValue) {
                        grid[row][col] = newValue;
                        gridPoints.push({ row: row, col: col });
                    }
                }
            }
            return gridPoints;
        };
        GameVars.getShipPosition = function (grid, shipType) {
            var row = 0;
            var col = 0;
            var angle = 0;
            var gridPoints = [];
            for (var row_1 = 0; row_1 < 10; row_1++) {
                for (var col_1 = 0; col_1 < 10; col_1++) {
                    if (grid[row_1][col_1] === shipType || grid[row_1][col_1] - 5 === shipType || grid[row_1][col_1] - 10 === shipType) {
                        gridPoints.push({ row: row_1, col: col_1 });
                    }
                }
            }
            if (gridPoints[0].row !== gridPoints[1].row) {
                angle = 90;
                col = gridPoints[0].col;
                switch (shipType) {
                    case BattleshipsArmada.GameConstants.SHIP_DESTROYER:
                    case BattleshipsArmada.GameConstants.SHIP_DESTROYER_SUNK:
                        row = gridPoints[0].row;
                        break;
                    case BattleshipsArmada.GameConstants.SHIP_CRUISER:
                    case BattleshipsArmada.GameConstants.SHIP_CRUISER_SUNK:
                        row = gridPoints[0].row + 1;
                        break;
                    case BattleshipsArmada.GameConstants.SHIP_SUBMARINE:
                    case BattleshipsArmada.GameConstants.SHIP_SUBMARINE_SUNK:
                        row = gridPoints[0].row + 1;
                        break;
                    case BattleshipsArmada.GameConstants.SHIP_BATTLESHIP:
                    case BattleshipsArmada.GameConstants.SHIP_BATTLESHIP_SUNK:
                        row = gridPoints[0].row + 1;
                        break;
                    case BattleshipsArmada.GameConstants.SHIP_CARRIER:
                    case BattleshipsArmada.GameConstants.SHIP_CARRIER_SUNK:
                        row = gridPoints[0].row + 2;
                        break;
                    default:
                        break;
                }
            }
            else {
                row = gridPoints[0].row;
                switch (shipType) {
                    case BattleshipsArmada.GameConstants.SHIP_DESTROYER:
                    case BattleshipsArmada.GameConstants.SHIP_DESTROYER_SUNK:
                        col = gridPoints[0].col;
                        break;
                    case BattleshipsArmada.GameConstants.SHIP_CRUISER:
                    case BattleshipsArmada.GameConstants.SHIP_CRUISER_SUNK:
                        col = gridPoints[0].col + 1;
                        break;
                    case BattleshipsArmada.GameConstants.SHIP_SUBMARINE:
                    case BattleshipsArmada.GameConstants.SHIP_SUBMARINE_SUNK:
                        col = gridPoints[0].col + 1;
                        break;
                    case BattleshipsArmada.GameConstants.SHIP_BATTLESHIP:
                    case BattleshipsArmada.GameConstants.SHIP_BATTLESHIP_SUNK:
                        col = gridPoints[0].col + 1;
                        break;
                    case BattleshipsArmada.GameConstants.SHIP_CARRIER:
                    case BattleshipsArmada.GameConstants.SHIP_CARRIER_SUNK:
                        col = gridPoints[0].col + 2;
                        break;
                    default:
                        break;
                }
            }
            return { row: row, col: col, angle: angle };
        };
        GameVars.formatTime = function (timeInSeconds) {
            var hours = Math.floor(timeInSeconds / 3600);
            var minutes = Math.floor((timeInSeconds - (hours * 3600)) / 60);
            var seconds = timeInSeconds - (hours * 3600) - (minutes * 60);
            var h = hours.toString();
            var m = minutes.toString();
            var s = seconds.toString();
            if (hours < 10) {
                h = "0" + hours;
            }
            if (minutes < 10) {
                m = "0" + minutes;
            }
            if (seconds < 10) {
                s = "0" + seconds;
            }
            return h + ":" + m + ":" + s;
        };
        GameVars.logBoard = function (board) {
            console.clear();
            for (var row = 0; row < 10; row++) {
                var rowStr = String.fromCharCode(65 + row);
                for (var col = 0; col < 10; col++) {
                    var value = board[row][col];
                    var valueStr = void 0;
                    if (value < 10) {
                        valueStr = "0" + value.toString();
                    }
                    else {
                        valueStr = value.toString();
                    }
                    rowStr += "-" + valueStr;
                }
                console.log(rowStr);
            }
        };
        GameVars.getShipLength = function (shipType) {
            var shipLength;
            switch (shipType) {
                case BattleshipsArmada.GameConstants.SHIP_DESTROYER:
                    shipLength = 2;
                    break;
                case BattleshipsArmada.GameConstants.SHIP_CRUISER:
                case BattleshipsArmada.GameConstants.SHIP_SUBMARINE:
                    shipLength = 3;
                    break;
                case BattleshipsArmada.GameConstants.SHIP_BATTLESHIP:
                    shipLength = 4;
                    break;
                case BattleshipsArmada.GameConstants.SHIP_CARRIER:
                    shipLength = 5;
                    break;
                default:
                    break;
            }
            return shipLength;
        };
        GameVars.getLocalStorageData = function (key) {
            var data = localStorage.getItem(key);
            return JSON.parse(data);
        };
        GameVars.setLocalStorageData = function (key, data) {
            localStorage.setItem(key, JSON.stringify(data));
        };
        return GameVars;
    }());
    BattleshipsArmada.GameVars = GameVars;
})(BattleshipsArmada || (BattleshipsArmada = {}));
var BattleshipsArmada;
(function (BattleshipsArmada) {
    var Utils = (function () {
        function Utils() {
        }
        Utils.getValidName = function (name) {
            var newName = name;
            if (name.indexOf(" ") !== -1) {
                newName = name.substr(0, name.indexOf(" "));
            }
            return newName;
        };
        Utils.getProbabilities = function () {
            var probabilities = [];
            var hits = [];
            for (var y = 0; y < BattleshipsArmada.GameVars.adversaryBoard.length; y++) {
                probabilities[y] = [];
                for (var x = 0; x < BattleshipsArmada.GameVars.adversaryBoard.length; x++) {
                    probabilities[y][x] = 0;
                    if (BattleshipsArmada.GameVars.adversaryBoard[x][y] >= 7 && BattleshipsArmada.GameVars.adversaryBoard[x][y] <= 11) {
                        hits.push([x, y]);
                    }
                }
            }
            for (var i = 0, l = BattleshipsArmada.GameVars.shipLengthsPlayer.length; i < l; i++) {
                for (var y = 0; y < BattleshipsArmada.GameVars.adversaryBoard.length; y++) {
                    for (var x = 0; x < BattleshipsArmada.GameVars.adversaryBoard.length; x++) {
                        if (Utils.shipCanOccupyPosition(BattleshipsArmada.GameConstants.WATER_MISSED, [x, y], BattleshipsArmada.GameVars.shipLengthsPlayer[i], false)) {
                            Utils.increaseProbability([x, y], BattleshipsArmada.GameVars.shipLengthsPlayer[i], false, probabilities);
                        }
                        if (Utils.shipCanOccupyPosition(BattleshipsArmada.GameConstants.WATER_MISSED, [x, y], BattleshipsArmada.GameVars.shipLengthsPlayer[i], true)) {
                            Utils.increaseProbability([x, y], BattleshipsArmada.GameVars.shipLengthsPlayer[i], true, probabilities);
                        }
                    }
                }
            }
            Utils.skewProbabilityAroundHits(hits, probabilities);
            return probabilities;
        };
        Utils.increaseProbability = function (pos, shipSize, vertical, probabilities) {
            var x = pos[0], y = pos[1], z = (vertical ? y : x), end = z + shipSize - 1;
            for (var i = z; i <= end; i++) {
                if (vertical) {
                    probabilities[x][i]++;
                }
                else {
                    probabilities[i][y]++;
                }
            }
        };
        Utils.skewProbabilityAroundHits = function (toSkew, probabilities) {
            var uniques = [];
            for (var i = 0, l = toSkew.length; i < l; i++) {
                toSkew = toSkew.concat(Utils.getAdjacentPositions(toSkew[i]));
            }
            for (var i = 0, l = toSkew.length; i < l; i++) {
                var uniquesStr = uniques.join("|").toString();
                if (uniquesStr.indexOf(toSkew[i].toString()) === -1) {
                    uniques.push(toSkew[i]);
                    var x = toSkew[i][0], y = toSkew[i][1];
                    probabilities[x][y] *= 10;
                }
            }
        };
        Utils.getAdjacentPositions = function (pos) {
            var x = pos[0], y = pos[1], adj = [];
            if (y + 1 < BattleshipsArmada.GameVars.adversaryBoard.length) {
                adj.push([x, y + 1]);
            }
            if (y - 1 >= 0) {
                adj.push([x, y - 1]);
            }
            if (x + 1 < BattleshipsArmada.GameVars.adversaryBoard.length) {
                adj.push([x + 1, y]);
            }
            if (x - 1 >= 0) {
                adj.push([x - 1, y]);
            }
            return adj;
        };
        Utils.shipCanOccupyPosition = function (criteriaForRejection, pos, shipSize, vertical) {
            var x = pos[0], y = pos[1], z = (vertical ? y : x), end = z + shipSize - 1;
            if (end > BattleshipsArmada.GameVars.adversaryBoard.length - 1) {
                return false;
            }
            for (var i = z; i <= end; i++) {
                var thisPos = (vertical ? BattleshipsArmada.GameVars.adversaryBoard[x][i] : BattleshipsArmada.GameVars.adversaryBoard[i][y]);
                if (thisPos === criteriaForRejection) {
                    return false;
                }
            }
            return true;
        };
        return Utils;
    }());
    BattleshipsArmada.Utils = Utils;
})(BattleshipsArmada || (BattleshipsArmada = {}));
window.onload = function () {
    game = new BattleshipsArmada.Game();
};
var BattleshipsArmada;
(function (BattleshipsArmada) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Boot.onYandexFullscreenChanged = function () {
            var aspectRatio = BattleshipsArmada.GameConstants.GAME_HEIGHT / BattleshipsArmada.GameConstants.GAME_WIDTH;
            if (BattleshipsArmada.Game.currentInstance.device.desktop) {
                var widthLimit = Math.min(screen.height / aspectRatio, window.innerHeight / aspectRatio);
                var heightLimit = Math.min(screen.height, window.innerHeight);
                BattleshipsArmada.Game.currentInstance.scale.minWidth = widthLimit;
                BattleshipsArmada.Game.currentInstance.scale.minHeight = heightLimit;
                BattleshipsArmada.Game.currentInstance.scale.maxWidth = widthLimit;
                BattleshipsArmada.Game.currentInstance.scale.maxHeight = heightLimit;
            }
            else {
                BattleshipsArmada.Game.currentInstance.scale.maxWidth = window.innerWidth;
                BattleshipsArmada.Game.currentInstance.scale.maxHeight = Math.max(screen.height, window.innerHeight);
            }
            BattleshipsArmada.GameVars.scaleY = aspectRatio / (BattleshipsArmada.Game.currentInstance.scale.maxHeight / BattleshipsArmada.Game.currentInstance.scale.maxWidth);
            BattleshipsArmada.Game.currentInstance.scale.refresh();
        };
        Boot.enterIncorrectOrientation = function () {
            document.getElementById("orientation").style.display = "block";
            document.getElementById("content").style.display = "none";
        };
        Boot.leaveIncorrectOrientation = function () {
            document.getElementById("orientation").style.display = "none";
            document.getElementById("content").style.display = "block";
            if (Boot.bootedInWrongOrientation) {
                Boot.bootedInWrongOrientation = false;
                BattleshipsArmada.Game.currentInstance.time.events.add(500, function () {
                    Boot.currentInstance.refreshScaleVars();
                    BattleshipsArmada.Game.currentInstance.scale.refresh();
                    BattleshipsArmada.Game.currentInstance.state.start("PreLoader", true, false);
                }, this);
            }
        };
        Boot.prototype.init = function () {
            Boot.currentInstance = this;
            this.input.maxPointers = 1;
            this.game.stage.disableVisibilityChange = true;
            this.game.stage.backgroundColor = "#004871";
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.pageAlignHorizontally = true;
            if (this.game.device.desktop) {
                BattleshipsArmada.GameVars.scaleY = 1;
                this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
                this.game.scale.pageAlignHorizontally = true;
            }
            else {
                this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
                if (window.innerHeight < window.innerWidth) {
                    Boot.bootedInWrongOrientation = true;
                }
                else {
                    Boot.bootedInWrongOrientation = false;
                }
                this.refreshScaleVars();
                this.game.scale.pageAlignHorizontally = true;
                this.game.scale.isPortrait = true;
                this.game.scale.forceOrientation(false, true);
                this.game.scale.enterIncorrectOrientation.add(Boot.enterIncorrectOrientation, Boot);
                this.game.scale.leaveIncorrectOrientation.add(Boot.leaveIncorrectOrientation, Boot);
            }
            if (BattleshipsArmada.GameConstants.DEVELOPMENT) {
                this.game.time.advancedTiming = true;
            }
        };
        Boot.prototype.preload = function () {
            this.load.path = BattleshipsArmada.GameConstants.ASSETS_PATH;
            this.load.image("background", "/splash.jpg");
        };
        Boot.prototype.create = function () {
            if (!Boot.bootedInWrongOrientation) {
                this.game.state.start("PreLoader", true, false);
            }
        };
        Boot.prototype.shutdown = function () {
            Boot.currentInstance = null;
            _super.prototype.shutdown.call(this);
        };
        Boot.prototype.refreshScaleVars = function () {
            BattleshipsArmada.GameVars.scaleY = (4 / 3) / (window.innerHeight / window.innerWidth);
        };
        return Boot;
    }(Phaser.State));
    BattleshipsArmada.Boot = Boot;
})(BattleshipsArmada || (BattleshipsArmada = {}));
var BattleshipsArmada;
(function (BattleshipsArmada) {
    var PreLoader = (function (_super) {
        __extends(PreLoader, _super);
        function PreLoader() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PreLoader.prototype.init = function () {
            PreLoader.currentInstance = this;
            this.load.path = BattleshipsArmada.GameConstants.ASSETS_PATH;
        };
        PreLoader.prototype.preload = function () {
            this.generateBitmapData();
            this.composeScene();
            this.loadAssets();
        };
        PreLoader.prototype.create = function () {
            this.game.stage.disableVisibilityChange = false;
            PreLoader.currentInstance.initGameManager();
        };
        PreLoader.prototype.initGameManager = function () {
            this.game.add.tween(this.loadingItemsContainer)
                .to({ alpha: 0 }, 450, Phaser.Easing.Cubic.Out, true, 400)
                .onComplete.add(function () {
                BattleshipsArmada.GameManager.init(this.game);
            }, this);
        };
        PreLoader.prototype.updateLoadedPercentage = function () {
            var progressF = this.load.progress / 100;
            this.preloadBar.scale.x = progressF * 3.925;
        };
        PreLoader.prototype.composeScene = function () {
            this.add.text(0, 0, "hack", { font: "1px American Captain", fill: "#12b4f1" });
            this.add.text(0, 0, ".", { font: "46px Exo Light", fill: "#004871", align: "center" });
            var backgroundSprite = this.add.sprite(0, BattleshipsArmada.GameConstants.GAME_HEIGHT / 2, "background");
            backgroundSprite.anchor.set(0, .5);
            backgroundSprite.scale.y = BattleshipsArmada.GameVars.scaleY;
            this.loadingItemsContainer = this.add.group();
            this.loadingItemsContainer.scale.y = BattleshipsArmada.GameVars.scaleY;
            this.loadingItemsContainer.y = 800 * BattleshipsArmada.GameVars.scaleY;
            var preloadBarCapsuleShadow = new Phaser.Sprite(this.game, (BattleshipsArmada.GameConstants.GAME_WIDTH / 2 + 2), 2, this.game.cache.getBitmapData(BattleshipsArmada.GameConstants.BLACK_SQUARE));
            preloadBarCapsuleShadow.scale.set(4, .25);
            preloadBarCapsuleShadow.anchor.set(.5);
            preloadBarCapsuleShadow.alpha = .45;
            this.loadingItemsContainer.add(preloadBarCapsuleShadow);
            var preloadBarCapsule = new Phaser.Sprite(this.game, BattleshipsArmada.GameConstants.GAME_WIDTH / 2, 0, this.game.cache.getBitmapData(BattleshipsArmada.GameConstants.WHITE_SQUARE));
            preloadBarCapsule.scale.setTo(4, .25);
            preloadBarCapsule.anchor.set(.5);
            this.loadingItemsContainer.add(preloadBarCapsule);
            this.preloadBar = new Phaser.Sprite(this.game, (BattleshipsArmada.GameConstants.GAME_WIDTH / 2 - 126), 0, this.game.cache.getBitmapData(BattleshipsArmada.GameConstants.RED_SQUARE));
            this.preloadBar.scale.setTo(0, .2);
            this.preloadBar.anchor.set(0, .5);
            this.loadingItemsContainer.add(this.preloadBar);
        };
        PreLoader.prototype.loadAssets = function () {
            this.load.atlas("texture_atlas_0", "/texture_atlas_0.png", "/texture_atlas_0.json");
            this.load.atlas("texture_atlas_1", "/texture_atlas_1.png", "/texture_atlas_1.json");
            this.load.atlas("texture_atlas_2", "/texture_atlas_2.png", "/texture_atlas_2.json");
            this.load.atlas("texture_atlas_3", "/texture_atlas_3.png", "/texture_atlas_3.json");
            this.load.atlas("texture_atlas_4", "/texture_atlas_4.png", "/texture_atlas_4.json");
            this.load.atlas("texture_atlas_5_en", "/texture_atlas_5_en.png", "/texture_atlas_5_en.json");
            this.load.atlas("texture_atlas_5_es", "/texture_atlas_5_es.png", "/texture_atlas_5_es.json");
            this.load.atlas("texture_atlas_5_de", "/texture_atlas_5_de.png", "/texture_atlas_5_de.json");
            this.load.atlas("texture_atlas_5_br", "/texture_atlas_5_br.png", "/texture_atlas_5_br.json");
            this.load.atlas("texture_atlas_5_it", "/texture_atlas_5_it.png", "/texture_atlas_5_it.json");
            this.load.atlas("texture_atlas_5_ru", "/texture_atlas_5_ru.png", "/texture_atlas_5_ru.json");
            this.load.atlas("texture_atlas_5_fr", "/texture_atlas_5_fr.png", "/texture_atlas_5_fr.json");
            this.load.json("languages", "/texts/languages.json");
            this.load.audiosprite("audio-sprite", ["/audio/audiosprite.mp3", "/audio/audiosprite.ogg"], "/audio/audiosprite.json");
            this.load.onFileComplete.add(this.updateLoadedPercentage, this);
        };
        PreLoader.prototype.generateBitmapData = function () {
            var bmd = this.game.add.bitmapData(BattleshipsArmada.GameConstants.BITMAP_SIZE, BattleshipsArmada.GameConstants.BITMAP_SIZE, BattleshipsArmada.GameConstants.RED_SQUARE, true);
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, BattleshipsArmada.GameConstants.BITMAP_SIZE, BattleshipsArmada.GameConstants.BITMAP_SIZE);
            bmd.ctx.fillStyle = "#FF0000";
            bmd.ctx.fill();
            bmd = this.game.add.bitmapData(BattleshipsArmada.GameConstants.BITMAP_SIZE, BattleshipsArmada.GameConstants.BITMAP_SIZE, BattleshipsArmada.GameConstants.GREEN_SQUARE, true);
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, BattleshipsArmada.GameConstants.BITMAP_SIZE, BattleshipsArmada.GameConstants.BITMAP_SIZE);
            bmd.ctx.fillStyle = "#00FF00";
            bmd.ctx.fill();
            bmd = this.game.add.bitmapData(BattleshipsArmada.GameConstants.BITMAP_SIZE, BattleshipsArmada.GameConstants.BITMAP_SIZE, BattleshipsArmada.GameConstants.OLIVE_GREEN_SQUARE, true);
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, BattleshipsArmada.GameConstants.BITMAP_SIZE, BattleshipsArmada.GameConstants.BITMAP_SIZE);
            bmd.ctx.fillStyle = "#65aa46";
            bmd.ctx.fill();
            bmd = this.game.add.bitmapData(BattleshipsArmada.GameConstants.BITMAP_SIZE, BattleshipsArmada.GameConstants.BITMAP_SIZE, BattleshipsArmada.GameConstants.BLUE_SQUARE, true);
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, BattleshipsArmada.GameConstants.BITMAP_SIZE, BattleshipsArmada.GameConstants.BITMAP_SIZE);
            bmd.ctx.fillStyle = "#0000FF";
            bmd.ctx.fill();
            bmd = this.game.add.bitmapData(BattleshipsArmada.GameConstants.BITMAP_SIZE, BattleshipsArmada.GameConstants.BITMAP_SIZE, BattleshipsArmada.GameConstants.WHITE_SQUARE, true);
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, BattleshipsArmada.GameConstants.BITMAP_SIZE, BattleshipsArmada.GameConstants.BITMAP_SIZE);
            bmd.ctx.fillStyle = "#F6F9EF";
            bmd.ctx.fill();
            bmd = this.game.add.bitmapData(BattleshipsArmada.GameConstants.BITMAP_SIZE, BattleshipsArmada.GameConstants.BITMAP_SIZE, BattleshipsArmada.GameConstants.BLACK_SQUARE, true);
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, BattleshipsArmada.GameConstants.BITMAP_SIZE, BattleshipsArmada.GameConstants.BITMAP_SIZE);
            bmd.ctx.fillStyle = "#000000";
            bmd.ctx.fill();
            bmd = this.game.add.bitmapData(BattleshipsArmada.GameConstants.BITMAP_SIZE, BattleshipsArmada.GameConstants.BITMAP_SIZE, BattleshipsArmada.GameConstants.GRAY_SQUARE, true);
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, BattleshipsArmada.GameConstants.BITMAP_SIZE, BattleshipsArmada.GameConstants.BITMAP_SIZE);
            bmd.ctx.fillStyle = "#999999";
            bmd.ctx.fill();
            bmd = this.game.add.bitmapData(BattleshipsArmada.GameConstants.BITMAP_SIZE, BattleshipsArmada.GameConstants.BITMAP_SIZE, BattleshipsArmada.GameConstants.DARK_BLUE_SQUARE, true);
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, BattleshipsArmada.GameConstants.BITMAP_SIZE, BattleshipsArmada.GameConstants.BITMAP_SIZE);
            bmd.ctx.fillStyle = "#15263c";
            bmd.ctx.fill();
            bmd = this.game.add.bitmapData(BattleshipsArmada.GameConstants.BITMAP_SIZE, BattleshipsArmada.GameConstants.BITMAP_SIZE, BattleshipsArmada.GameConstants.CYAN_SQUARE, true);
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, BattleshipsArmada.GameConstants.BITMAP_SIZE, BattleshipsArmada.GameConstants.BITMAP_SIZE);
            bmd.ctx.fillStyle = "#43d6fe";
            bmd.ctx.fill();
        };
        return PreLoader;
    }(Phaser.State));
    BattleshipsArmada.PreLoader = PreLoader;
})(BattleshipsArmada || (BattleshipsArmada = {}));
var BattleshipsArmada;
(function (BattleshipsArmada) {
    var BattleManagerAI = (function () {
        function BattleManagerAI(game) {
            BattleManagerAI.currentInstance = this;
            this.game = game;
            this.shootOne = false;
            this.nextTurn = false;
            this.onShot = false;
            if (!BattleshipsArmada.GameVars.playerBoard) {
                BattleshipsArmada.GameVars.playerBoard = JSON.parse("[[0,0,0,0,0,0,0,0,0,0],[0,2,0,0,0,0,0,0,6,0],[0,2,0,0,0,0,0,0,6,0],[0,0,0,5,5,5,5,0,6,0],[0,0,0,0,0,0,0,0,6,0],[0,0,0,0,0,0,0,0,6,0],[0,0,0,3,3,3,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,4,4,4,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]]");
            }
            this.createPlayerAIBoard();
            if (!BattleshipsArmada.GameVars.adversaryBoard) {
                BattleshipsArmada.GameVars.adversaryBoard = Bot.getBotBoard();
            }
            if (!BattleshipsArmada.GameVars.idAdversary) {
                BattleshipsArmada.GameVars.idAdversary = BattleshipsArmada.GameVars.makeid();
            }
        }
        BattleManagerAI.prototype.destroy = function () {
            BattleManagerAI.currentInstance = null;
        };
        BattleManagerAI.prototype.createPlayerAIBoard = function () {
            if (!BattleshipsArmada.GameVars.playerBoardAI) {
                BattleshipsArmada.GameVars.playerBoardAI = [];
                for (var row = 0; row < 10; row++) {
                    BattleshipsArmada.GameVars.playerBoardAI[row] = [];
                }
                for (var row = 0; row < 10; row++) {
                    for (var col = 0; col < 10; col++) {
                        BattleshipsArmada.GameVars.playerBoardAI[row][col] = BattleshipsArmada.GameConstants.UNKNOWN_CELL;
                    }
                }
            }
        };
        BattleManagerAI.prototype.cellSelected = function (row, col) {
            if (this.onShot) {
                return;
            }
            this.onShot = true;
            var board = BattleshipsArmada.GameVars.currentTurn === BattleshipsArmada.GameConstants.PLAYER ? BattleshipsArmada.GameVars.adversaryBoard : BattleshipsArmada.GameVars.playerBoard;
            if (BattleshipsArmada.GameVars.shot === BattleshipsArmada.GameConstants.NUM_MISSILES || board[row][col] === BattleshipsArmada.GameConstants.WATER_MISSED || board[row][col] > 6) {
                this.onShot = false;
                return;
            }
            if (BattleshipsArmada.BattleState.currentInstance.gui.hintButton) {
                BattleshipsArmada.BattleState.currentInstance.gui.hintButton.alpha = .5;
                BattleshipsArmada.BattleState.currentInstance.gui.hintButton.inputEnabled = false;
            }
            var cell = board[row][col];
            var addHit = false;
            var shipSunk = false;
            var numberCellsShipHit;
            var valueHitShip;
            var valueSunkenShip;
            if (cell === BattleshipsArmada.GameConstants.WATER) {
                BattleshipsArmada.BattleState.currentInstance.shootMissile(row, col, false, false);
                BattleshipsArmada.BattleState.currentInstance.showMark(row, col);
                board[row][col] = BattleshipsArmada.GameConstants.WATER_MISSED;
            }
            else {
                switch (cell) {
                    case BattleshipsArmada.GameConstants.SHIP_DESTROYER:
                        addHit = true;
                        board[row][col] = BattleshipsArmada.GameConstants.SHIP_DESTROYER_HIT;
                        numberCellsShipHit = BattleshipsArmada.GameVars.countOcurrencies(board, BattleshipsArmada.GameConstants.SHIP_DESTROYER_HIT);
                        if (numberCellsShipHit === 2) {
                            shipSunk = true;
                            valueHitShip = BattleshipsArmada.GameConstants.SHIP_DESTROYER_HIT;
                            valueSunkenShip = BattleshipsArmada.GameConstants.SHIP_DESTROYER_SUNK;
                        }
                        break;
                    case BattleshipsArmada.GameConstants.SHIP_CRUISER:
                        addHit = true;
                        board[row][col] = BattleshipsArmada.GameConstants.SHIP_CRUISER_HIT;
                        numberCellsShipHit = BattleshipsArmada.GameVars.countOcurrencies(board, BattleshipsArmada.GameConstants.SHIP_CRUISER_HIT);
                        if (numberCellsShipHit === 3) {
                            shipSunk = true;
                            valueHitShip = BattleshipsArmada.GameConstants.SHIP_CRUISER_HIT;
                            valueSunkenShip = BattleshipsArmada.GameConstants.SHIP_CRUISER_SUNK;
                        }
                        break;
                    case BattleshipsArmada.GameConstants.SHIP_SUBMARINE:
                        addHit = true;
                        board[row][col] = BattleshipsArmada.GameConstants.SHIP_SUBMARINE_HIT;
                        numberCellsShipHit = BattleshipsArmada.GameVars.countOcurrencies(board, BattleshipsArmada.GameConstants.SHIP_SUBMARINE_HIT);
                        if (numberCellsShipHit === 3) {
                            shipSunk = true;
                            valueHitShip = BattleshipsArmada.GameConstants.SHIP_SUBMARINE_HIT;
                            valueSunkenShip = BattleshipsArmada.GameConstants.SHIP_SUBMARINE_SUNK;
                        }
                        break;
                    case BattleshipsArmada.GameConstants.SHIP_BATTLESHIP:
                        addHit = true;
                        board[row][col] = BattleshipsArmada.GameConstants.SHIP_BATTLESHIP_HIT;
                        numberCellsShipHit = BattleshipsArmada.GameVars.countOcurrencies(board, BattleshipsArmada.GameConstants.SHIP_BATTLESHIP_HIT);
                        if (numberCellsShipHit === 4) {
                            shipSunk = true;
                            valueHitShip = BattleshipsArmada.GameConstants.SHIP_BATTLESHIP_HIT;
                            valueSunkenShip = BattleshipsArmada.GameConstants.SHIP_BATTLESHIP_SUNK;
                        }
                        break;
                    case BattleshipsArmada.GameConstants.SHIP_CARRIER:
                        addHit = true;
                        board[row][col] = BattleshipsArmada.GameConstants.SHIP_CARRIER_HIT;
                        numberCellsShipHit = BattleshipsArmada.GameVars.countOcurrencies(board, BattleshipsArmada.GameConstants.SHIP_CARRIER_HIT);
                        if (numberCellsShipHit === 5) {
                            shipSunk = true;
                            valueHitShip = BattleshipsArmada.GameConstants.SHIP_CARRIER_HIT;
                            valueSunkenShip = BattleshipsArmada.GameConstants.SHIP_CARRIER_SUNK;
                        }
                        break;
                    default:
                        break;
                }
            }
            var gridPointsSunkShip;
            if (addHit) {
                BattleshipsArmada.BattleState.currentInstance.shootMissile(row, col, true, shipSunk);
                BattleshipsArmada.BattleState.currentInstance.showMark(row, col);
                if (shipSunk) {
                    gridPointsSunkShip = BattleshipsArmada.GameVars.replaceValues(board, valueHitShip, valueSunkenShip);
                }
            }
            if (BattleshipsArmada.GameVars.currentTurn !== BattleshipsArmada.GameConstants.PLAYER) {
                this.accountShot(row, col, cell !== BattleshipsArmada.GameConstants.WATER);
                if (shipSunk) {
                    this.shipSunk(gridPointsSunkShip);
                }
            }
            else {
                if (shipSunk) {
                    this.shipSunkPlayer(gridPointsSunkShip);
                }
            }
            this.countShot();
            if (BattleshipsArmada.GameConstants.SHOW_PROBABILITIES) {
                BattleshipsArmada.BoardsContainer.currentInstance.adversaryBoardLayer.setProbabilities(BattleshipsArmada.Utils.getProbabilities());
            }
        };
        BattleManagerAI.prototype.shipSunk = function (sunkShipCells) {
            for (var i_1 = 0; i_1 < sunkShipCells.length; i_1++) {
                BattleshipsArmada.GameVars.playerBoardAI[sunkShipCells[i_1].row][sunkShipCells[i_1].col] = BattleshipsArmada.GameConstants.SUNK_SHIP;
            }
            var sunkShipLength = sunkShipCells.length;
            var i = BattleshipsArmada.GameVars.shipLengths.indexOf(sunkShipLength);
            BattleshipsArmada.GameVars.shipLengths.splice(i, 1);
            BattleshipsArmada.GameVars.shipLengths.sort(function (n1, n2) { return n1 - n2; });
        };
        BattleManagerAI.prototype.shipSunkPlayer = function (sunkShipCells) {
            var sunkShipLength = sunkShipCells.length;
            var i = BattleshipsArmada.GameVars.shipLengthsPlayer.indexOf(sunkShipLength);
            BattleshipsArmada.GameVars.shipLengthsPlayer.splice(i, 1);
            BattleshipsArmada.GameVars.shipLengthsPlayer.sort(function (n1, n2) { return n1 - n2; });
        };
        BattleManagerAI.prototype.accountShot = function (row, col, hit) {
            BattleshipsArmada.GameVars.playerBoardAI[row][col] = hit ? BattleshipsArmada.GameConstants.HIT : BattleshipsArmada.GameConstants.WATER_AI;
        };
        BattleManagerAI.prototype.missileShooted = function (row, col, hit, shipSunk) {
            var board = BattleshipsArmada.GameVars.currentTurn === BattleshipsArmada.GameConstants.PLAYER ? BattleshipsArmada.GameVars.adversaryBoard : BattleshipsArmada.GameVars.playerBoard;
            if (hit) {
                BattleshipsArmada.BattleState.currentInstance.addHit(row, col, shipSunk, board[row][col] - 10);
                BattleshipsArmada.AudioManager.getInstance().playSound("explossion_ship_partial");
            }
            else {
                BattleshipsArmada.BattleState.currentInstance.addMissedHit(row, col);
                BattleshipsArmada.AudioManager.getInstance().playSound("water_impact");
            }
            if (shipSunk) {
                BattleshipsArmada.BattleState.currentInstance.showSunkenShip(board[row][col] - 10);
                if (BattleshipsArmada.GameVars.currentTurn === BattleshipsArmada.GameConstants.PLAYER) {
                    BattleshipsArmada.GameVars.playerShipsSunks++;
                }
                else {
                    BattleshipsArmada.GameVars.rivalShipsSunks++;
                }
            }
            BattleshipsArmada.GameVars.animation++;
            if (BattleshipsArmada.GameVars.playerShipsSunks === 5) {
                BattleshipsArmada.BattleState.currentInstance.finalLayer.show(true);
                BattleshipsArmada.GameVars.win = true;
                BattleshipsArmada.GameVars.currentScene = BattleshipsArmada.GameConstants.FINAL_SCENE;
                this.hideAll();
                return;
            }
            else if (BattleshipsArmada.GameVars.rivalShipsSunks === 5) {
                BattleshipsArmada.BattleState.currentInstance.finalLayer.show(false);
                BattleshipsArmada.GameVars.win = false;
                BattleshipsArmada.GameVars.currentScene = BattleshipsArmada.GameConstants.FINAL_SCENE;
                this.hideAll();
                return;
            }
            if (BattleshipsArmada.GameVars.animation === BattleshipsArmada.GameConstants.NUM_MISSILES) {
                this.setTurn();
            }
            if (BattleshipsArmada.GameVars.currentTurn !== BattleshipsArmada.GameConstants.PLAYER) {
                if (BattleshipsArmada.GameVars.shot < BattleshipsArmada.GameConstants.NUM_MISSILES) {
                    if (!BattleshipsArmada.PauseLayer.onPause) {
                        this.onShot = false;
                        this.shootAI();
                        return;
                    }
                    else {
                        this.shootOne = true;
                    }
                }
            }
            else if (BattleshipsArmada.BattleState.currentInstance.gui.hintButton) {
                BattleshipsArmada.BattleState.currentInstance.gui.hintButton.alpha = 1;
                BattleshipsArmada.BattleState.currentInstance.gui.hintButton.inputEnabled = true;
            }
            this.onShot = false;
        };
        BattleManagerAI.prototype.hideAll = function () {
            BattleshipsArmada.BattleState.currentInstance.hud.hide();
            BattleshipsArmada.BattleState.currentInstance.gui.hide();
            BattleshipsArmada.BattleState.currentInstance.missilesContainer.hide();
        };
        BattleManagerAI.prototype.setNextTurn = function () {
            if (this.nextTurn) {
                this.nextTurn = false;
                this.setTurn();
            }
        };
        BattleManagerAI.prototype.shootOneAI = function () {
            if (this.shootOne) {
                this.shootOne = false;
                if (BattleshipsArmada.GameVars.currentTurn !== BattleshipsArmada.GameConstants.PLAYER) {
                    this.shootAI();
                }
            }
        };
        BattleManagerAI.prototype.changeTurn = function () {
            BattleshipsArmada.BattleState.currentInstance.setTurn();
            BattleshipsArmada.GameVars.shot = 0;
            BattleshipsArmada.GameVars.animation = 0;
            BattleshipsArmada.BattleState.currentInstance.transitionLayer.hide();
        };
        BattleManagerAI.prototype.transitionHidden = function () {
            BattleshipsArmada.BattleState.currentInstance.missilesContainer.show();
            if (BattleshipsArmada.GameVars.currentTurn === BattleshipsArmada.GameConstants.AI) {
                this.game.time.events.add(Phaser.Timer.SECOND * 2, function () {
                    if (!BattleshipsArmada.PauseLayer.onPause) {
                        this.shootAI();
                    }
                    else {
                        this.shootOne = true;
                    }
                }, this);
            }
        };
        BattleManagerAI.prototype.resign = function () {
            BattleshipsArmada.BattleState.currentInstance.finalLayer.show(false);
            BattleshipsArmada.GameVars.currentScene = BattleshipsArmada.GameConstants.FINAL_SCENE;
            BattleshipsArmada.GameVars.win = false;
            this.hideAll();
        };
        BattleManagerAI.prototype.shootAI = function () {
            var p = Bot.getShotPosition(BattleshipsArmada.GameVars.shipLengths, BattleshipsArmada.GameVars.playerBoardAI, BattleshipsArmada.GameVars.gameType);
            BattleshipsArmada.BoardsContainer.currentInstance.playerBoardLayer.setProbabilities(p.probabilities);
            this.cellSelected(p.row, p.col);
        };
        BattleManagerAI.prototype.countShot = function () {
            BattleshipsArmada.GameVars.shot++;
        };
        BattleManagerAI.prototype.setTurn = function () {
            if (BattleshipsArmada.PauseLayer.onPause) {
                this.nextTurn = true;
                return;
            }
            if (BattleshipsArmada.GameConstants.AI_SHOTS) {
                BattleshipsArmada.GameVars.shot = 0;
                BattleshipsArmada.GameVars.animation = 0;
                return;
            }
            if (BattleshipsArmada.GameVars.currentTurn === BattleshipsArmada.GameConstants.PLAYER) {
                BattleshipsArmada.GameVars.currentTurn = BattleshipsArmada.GameConstants.AI;
            }
            else {
                BattleshipsArmada.GameVars.currentTurn = BattleshipsArmada.GameConstants.PLAYER;
            }
            this.game.time.events.add(Phaser.Timer.SECOND, function () {
                BattleshipsArmada.BattleState.currentInstance.transitionLayer.show();
            }, this);
        };
        return BattleManagerAI;
    }());
    BattleshipsArmada.BattleManagerAI = BattleManagerAI;
})(BattleshipsArmada || (BattleshipsArmada = {}));
var BattleshipsArmada;
(function (BattleshipsArmada) {
    var BattleState = (function (_super) {
        __extends(BattleState, _super);
        function BattleState() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BattleState.prototype.init = function () {
            BattleState.currentInstance = this;
            this.battleManagerAI = new BattleshipsArmada.BattleManagerAI(this.game);
        };
        BattleState.prototype.create = function () {
            this.boardsContainer = new BattleshipsArmada.BoardsContainer(this.game);
            this.add.existing(this.boardsContainer);
            this.missilesContainer = new BattleshipsArmada.MissilesContainer(this.game);
            this.add.existing(this.missilesContainer);
            this.hud = new BattleshipsArmada.HUDBattle(this.game);
            this.add.existing(this.hud);
            this.gui = new BattleshipsArmada.GUIBattle(this.game);
            this.add.existing(this.gui);
            if (BattleshipsArmada.GameConstants.DEVELOPMENT) {
                this.developmentLayer = new BattleshipsArmada.DevelopmentLayer(this.game);
                this.add.existing(this.developmentLayer);
            }
            this.finalLayer = new BattleshipsArmada.FinalLayer(this.game);
            this.add.existing(this.finalLayer);
            this.transitionLayer = new BattleshipsArmada.TransitionLayer(this.game);
            this.add.existing(this.transitionLayer);
            this.game.time.events.add(500, function () {
                this.transitionLayer.hide();
            }, this);
            BattleshipsArmada.AudioManager.getInstance().playSound("battle", true);
        };
        BattleState.prototype.shutdown = function () {
            BattleState.currentInstance = null;
            if (this.battleManagerAI) {
                this.battleManagerAI.destroy();
            }
            _super.prototype.shutdown.call(this);
        };
        BattleState.prototype.setTurn = function () {
            this.boardsContainer.setTurn();
            this.missilesContainer.reset();
            this.hud.changeTurn();
            this.gui.changeTurn();
        };
        BattleState.prototype.shootMissile = function (row, col, hit, shipSunk) {
            this.missilesContainer.shootMissile(row, col, hit, shipSunk);
        };
        BattleState.prototype.addHit = function (row, col, shipSunk, type) {
            this.boardsContainer.addHit(row, col, shipSunk, type);
        };
        BattleState.prototype.addHit2 = function (row, col, shipSunk, type) {
            this.boardsContainer.addHit2(row, col, shipSunk, type);
        };
        BattleState.prototype.addMissedHit = function (row, col) {
            this.boardsContainer.addMissedHit(row, col);
        };
        BattleState.prototype.addMissedHit2 = function (row, col) {
            this.boardsContainer.addMissedHit2(row, col);
        };
        BattleState.prototype.showSunkenShip = function (shipType) {
            this.boardsContainer.showSunkenkShip(shipType);
        };
        BattleState.prototype.showMark = function (row, col) {
            this.boardsContainer.showMark(row, col);
        };
        BattleState.prototype.hint = function () {
            this.boardsContainer.hint();
            this.gui.hintButton.alpha = .5;
            this.gui.hintButton.inputEnabled = false;
        };
        return BattleState;
    }(Phaser.State));
    BattleshipsArmada.BattleState = BattleState;
})(BattleshipsArmada || (BattleshipsArmada = {}));
var BattleshipsArmada;
(function (BattleshipsArmada) {
    var BoardShip = (function (_super) {
        __extends(BoardShip, _super);
        function BoardShip(game, shipType, color) {
            var _this = _super.call(this, game, null, "start-ship") || this;
            _this.shipType = shipType;
            _this.color = color;
            _this.shipImage = new Phaser.Image(_this.game, 0, 0, "texture_atlas_1");
            _this.add(_this.shipImage);
            return _this;
        }
        BoardShip.prototype.setInitialPosition = function (row, col, angle) {
            switch (this.shipType) {
                case BattleshipsArmada.GameConstants.SHIP_DESTROYER:
                    this.shipImage.frameName = angle === 0 ? (this.color + "_ship_2_h.png") : (this.color + "_ship_2_v.png");
                    this.shipImage.anchor.x = .25;
                    this.shipImage.anchor.y = .5;
                    break;
                case BattleshipsArmada.GameConstants.SHIP_CRUISER:
                    this.shipImage.frameName = angle === 0 ? (this.color + "_ship_3_h.png") : (this.color + "_ship_3_v.png");
                    this.shipImage.anchor.x = .5;
                    this.shipImage.anchor.y = .5;
                    break;
                case BattleshipsArmada.GameConstants.SHIP_SUBMARINE:
                    this.shipImage.frameName = angle === 0 ? (this.color + "_ship_3_h.png") : (this.color + "_ship_3_v.png");
                    this.shipImage.anchor.x = .5;
                    this.shipImage.anchor.y = .5;
                    break;
                case BattleshipsArmada.GameConstants.SHIP_BATTLESHIP:
                    this.shipImage.frameName = angle === 0 ? (this.color + "_ship_4_h.png") : (this.color + "_ship_4_v.png");
                    this.shipImage.anchor.x = .375;
                    this.shipImage.anchor.y = angle === 0 ? .62 : .5;
                    break;
                case BattleshipsArmada.GameConstants.SHIP_CARRIER:
                    this.shipImage.frameName = angle === 0 ? (this.color + "_ship_5_h.png") : (this.color + "_ship_5_v.png");
                    this.shipImage.anchor.x = .5;
                    this.shipImage.anchor.y = angle === 0 ? .6 : .5;
                    break;
                default:
                    break;
            }
            var coor = BattleshipsArmada.GameVars.getCoordinatesFromRowAndCol(row, col);
            this.shipImage.position.set(coor.x, coor.y);
            this.shipImage.angle = angle;
        };
        BoardShip.prototype.sink = function () {
        };
        return BoardShip;
    }(Phaser.Group));
    BattleshipsArmada.BoardShip = BoardShip;
})(BattleshipsArmada || (BattleshipsArmada = {}));
var BattleshipsArmada;
(function (BattleshipsArmada) {
    var BoardsContainer = (function (_super) {
        __extends(BoardsContainer, _super);
        function BoardsContainer(game) {
            var _this = _super.call(this, game, null, "adversary-battle-layer") || this;
            BoardsContainer.currentInstance = _this;
            _this.playerBoardLayer = new BattleshipsArmada.BoardLayer(_this.game, true);
            _this.playerBoardLayer.visible = false;
            _this.add(_this.playerBoardLayer);
            _this.adversaryBoardLayer = new BattleshipsArmada.BoardLayer(_this.game, false);
            _this.adversaryBoardLayer.visible = false;
            _this.add(_this.adversaryBoardLayer);
            _this.setTurn();
            return _this;
        }
        BoardsContainer.prototype.destroy = function () {
            BoardsContainer.currentInstance = null;
            _super.prototype.destroy.call(this);
        };
        BoardsContainer.prototype.setTurn = function () {
            if (BattleshipsArmada.GameVars.currentTurn === BattleshipsArmada.GameConstants.PLAYER) {
                this.playerBoardLayer.visible = false;
                this.adversaryBoardLayer.visible = true;
                if (BattleshipsArmada.GameConstants.SHOW_PROBABILITIES) {
                    this.adversaryBoardLayer.setProbabilities(BattleshipsArmada.Utils.getProbabilities());
                }
            }
            else {
                this.playerBoardLayer.visible = true;
                this.adversaryBoardLayer.visible = false;
            }
        };
        BoardsContainer.prototype.addHit = function (row, col, shipSunk, type) {
            if (BattleshipsArmada.GameVars.currentTurn === BattleshipsArmada.GameConstants.PLAYER) {
                this.adversaryBoardLayer.addHit(row, col, shipSunk, type);
            }
            else {
                this.playerBoardLayer.addHit(row, col, shipSunk, type);
            }
        };
        BoardsContainer.prototype.addHit2 = function (row, col, shipSunk, type) {
            if (BattleshipsArmada.GameVars.currentTurn === BattleshipsArmada.GameConstants.PLAYER) {
                this.adversaryBoardLayer.addHit2(row, col, shipSunk, type);
            }
            else {
                this.playerBoardLayer.addHit2(row, col, shipSunk, type);
            }
        };
        BoardsContainer.prototype.showSunkenkShip = function (shipType) {
            if (BattleshipsArmada.GameVars.currentTurn === BattleshipsArmada.GameConstants.PLAYER) {
                this.adversaryBoardLayer.showSunkenShip(shipType);
            }
            else {
                this.playerBoardLayer.showSunkenShip(shipType);
            }
        };
        BoardsContainer.prototype.addMissedHit = function (row, col) {
            if (BattleshipsArmada.GameVars.currentTurn === BattleshipsArmada.GameConstants.PLAYER) {
                this.adversaryBoardLayer.addMissedHit(row, col);
            }
            else {
                this.playerBoardLayer.addMissedHit(row, col);
            }
        };
        BoardsContainer.prototype.addMissedHit2 = function (row, col) {
            if (BattleshipsArmada.GameVars.currentTurn === BattleshipsArmada.GameConstants.PLAYER) {
                this.adversaryBoardLayer.addMissedHit2(row, col);
            }
            else {
                this.playerBoardLayer.addMissedHit2(row, col);
            }
        };
        BoardsContainer.prototype.showMark = function (row, col) {
            if (BattleshipsArmada.GameVars.currentTurn === BattleshipsArmada.GameConstants.PLAYER) {
                this.adversaryBoardLayer.showMark(row, col);
            }
            else {
            }
        };
        BoardsContainer.prototype.hint = function () {
            this.adversaryBoardLayer.hint();
        };
        return BoardsContainer;
    }(Phaser.Group));
    BattleshipsArmada.BoardsContainer = BoardsContainer;
})(BattleshipsArmada || (BattleshipsArmada = {}));
var BattleshipsArmada;
(function (BattleshipsArmada) {
    var TransitionLayer = (function (_super) {
        __extends(TransitionLayer, _super);
        function TransitionLayer(game) {
            var _this = _super.call(this, game, null, "transition-layer") || this;
            _this.visible = false;
            _this.bck = new Phaser.Image(_this.game, 0, 0, _this.game.cache.getBitmapData(BattleshipsArmada.GameConstants.DARK_BLUE_SQUARE));
            _this.bck.alpha = 0;
            _this.bck.scale.set(BattleshipsArmada.GameConstants.GAME_WIDTH / BattleshipsArmada.GameConstants.BITMAP_SIZE, BattleshipsArmada.GameConstants.GAME_HEIGHT / BattleshipsArmada.GameConstants.BITMAP_SIZE);
            _this.add(_this.bck);
            _this.containerUp = new Phaser.Group(_this.game);
            _this.containerUp.x = 0;
            _this.containerUp.y = BattleshipsArmada.GameConstants.GAME_HEIGHT / 2;
            _this.add(_this.containerUp);
            _this.partUp = new Phaser.Image(_this.game, 0, 0, "texture_atlas_1", "curtain.png");
            var addedScale = _this.game.scale.aspectRatio >= .5625 ? BattleshipsArmada.GameVars.scaleY : 1;
            _this.partUp.scale.set(2, 2 * addedScale);
            _this.partUp.anchor.set(0, 1);
            _this.containerUp.add(_this.partUp);
            _this.textUp = new Phaser.Image(_this.game, BattleshipsArmada.GameConstants.GAME_WIDTH / 2, 0, "texture_atlas_5_" + BattleshipsArmada.GameVars.gameData.language, "your_turn_up.png");
            _this.textUp.scale.y = BattleshipsArmada.GameVars.scaleY;
            _this.textUp.anchor.set(.5, 1);
            _this.containerUp.add(_this.textUp);
            _this.containerDown = new Phaser.Group(_this.game);
            _this.containerDown.x = 0;
            _this.containerDown.y = BattleshipsArmada.GameConstants.GAME_HEIGHT / 2;
            _this.add(_this.containerDown);
            _this.partDown = new Phaser.Image(_this.game, 0, 0, "texture_atlas_1", "curtain.png");
            _this.partDown.scale.set(2, -2 * addedScale);
            _this.partDown.anchor.set(0, 1);
            _this.containerDown.add(_this.partDown);
            _this.textDown = new Phaser.Image(_this.game, BattleshipsArmada.GameConstants.GAME_WIDTH / 2, 0, "texture_atlas_5_" + BattleshipsArmada.GameVars.gameData.language, "your_turn_down.png");
            _this.textDown.scale.y = BattleshipsArmada.GameVars.scaleY;
            _this.textDown.anchor.set(.5, 0);
            _this.containerDown.add(_this.textDown);
            _this.visible = true;
            if (BattleshipsArmada.GameVars.currentTurn === BattleshipsArmada.GameConstants.PLAYER) {
                _this.textUp.frameName = "your_turn_up.png";
                _this.textDown.frameName = "your_turn_down.png";
            }
            else {
                _this.textUp.frameName = "rivals_turn_up.png";
                _this.textDown.frameName = "rivals_turn_down.png";
            }
            return _this;
        }
        TransitionLayer.prototype.show = function () {
            TransitionLayer.onTween = true;
            if (BattleshipsArmada.GameVars.currentTurn === BattleshipsArmada.GameConstants.PLAYER) {
                this.textUp.frameName = "your_turn_up.png";
                this.textDown.frameName = "your_turn_down.png";
            }
            else {
                this.textUp.frameName = "rivals_turn_up.png";
                this.textDown.frameName = "rivals_turn_down.png";
            }
            BattleshipsArmada.AudioManager.getInstance().playSound("metal_gate_close");
            this.visible = true;
            this.game.add.tween(this.containerUp)
                .to({ y: BattleshipsArmada.GameConstants.GAME_HEIGHT / 2 }, 500, Phaser.Easing.Bounce.Out, true, 200)
                .onComplete.add(function () {
                BattleshipsArmada.BattleManagerAI.currentInstance.changeTurn();
            }, this);
            this.game.add.tween(this.containerDown)
                .to({ y: BattleshipsArmada.GameConstants.GAME_HEIGHT / 2 }, 500, Phaser.Easing.Bounce.Out, true, 200);
            this.game.add.tween(this.bck)
                .to({ alpha: 1 }, 500, Phaser.Easing.Cubic.Out, true, 200);
        };
        TransitionLayer.prototype.show2 = function () {
            if (BattleshipsArmada.GameVars.currentTurn === BattleshipsArmada.GameConstants.PLAYER) {
                this.textUp.frameName = "your_turn_up.png";
                this.textDown.frameName = "your_turn_down.png";
            }
            else {
                this.textUp.frameName = "rivals_turn_up.png";
                this.textDown.frameName = "rivals_turn_down.png";
            }
        };
        TransitionLayer.prototype.hide = function () {
            TransitionLayer.onTween = true;
            this.game.time.events.add(500, function () {
                BattleshipsArmada.AudioManager.getInstance().playSound("metal_gate_open");
            }, this);
            this.game.add.tween(this.containerUp)
                .to({ y: 0 }, 500, Phaser.Easing.Cubic.In, true, 500);
            this.game.add.tween(this.containerDown)
                .to({ y: BattleshipsArmada.GameConstants.GAME_HEIGHT }, 500, Phaser.Easing.Cubic.In, true, 500);
            this.game.add.tween(this.bck)
                .to({ alpha: 0 }, 500, Phaser.Easing.Cubic.In, true, 500)
                .onComplete.add(function () {
                BattleshipsArmada.BattleManagerAI.currentInstance.transitionHidden();
                this.visible = false;
            }, this);
        };
        TransitionLayer.onTween = false;
        return TransitionLayer;
    }(Phaser.Group));
    BattleshipsArmada.TransitionLayer = TransitionLayer;
})(BattleshipsArmada || (BattleshipsArmada = {}));
var BattleshipsArmada;
(function (BattleshipsArmada) {
    var BoardLayer = (function (_super) {
        __extends(BoardLayer, _super);
        function BoardLayer(game, isPlayer) {
            var _this = _super.call(this, game, null, "board-layer") || this;
            _this.isPlayer = isPlayer;
            _this.hits = new Array();
            _this.gridContainer = new Phaser.Group(_this.game);
            _this.gridContainer.position.set(BattleshipsArmada.GameConstants.GAME_WIDTH / 2, BattleshipsArmada.GameConstants.BOARD_PY);
            _this.gridContainer.scale.y = BattleshipsArmada.GameVars.scaleY;
            _this.grid1 = new Phaser.Image(_this.game, 0, 0, "texture_atlas_3", "grid_quarter.png");
            _this.grid1.anchor.set(1);
            _this.grid2 = new Phaser.Image(_this.game, 0, 0, "texture_atlas_3", "grid_quarter.png");
            _this.grid2.scale.set(1, -1);
            _this.grid2.anchor.set(1);
            _this.grid3 = new Phaser.Image(_this.game, 0, 0, "texture_atlas_3", "grid_quarter.png");
            _this.grid3.scale.set(-1, 1);
            _this.grid3.anchor.set(1);
            _this.grid4 = new Phaser.Image(_this.game, 0, 0, "texture_atlas_3", "grid_quarter.png");
            _this.grid4.scale.set(-1, -1);
            _this.grid4.anchor.set(1);
            var coast = new Phaser.Image(_this.game, 0, -BattleshipsArmada.GameConstants.BOARD_PY, "texture_atlas_3", _this.isPlayer ? "rival_north_coast.png" : "player_north_coast.png");
            coast.anchor.set(.5, 1);
            if (!_this.isPlayer) {
                coast.y += 20;
            }
            var animatedSeaContainer = new Phaser.Group(_this.game);
            _this.gridContainer.add(animatedSeaContainer);
            var animatedSea;
            var x = -BattleshipsArmada.GameConstants.GAME_WIDTH / 2;
            var y = -BattleshipsArmada.GameConstants.BOARD_PY;
            for (var i = 0; i < 2; i++) {
                for (var j = 0; j < 4; j++) {
                    animatedSea = new Phaser.Sprite(_this.game, x + 480 * i, y * 1.4 + 480 * j, "texture_atlas_4", "tide_0001.png");
                    animatedSea.scale.set(2);
                    animatedSea.animations.add("waves", Phaser.Animation.generateFrameNames("tide_", 1, 24, ".png", 4));
                    animatedSea.play("waves", 16, true);
                    animatedSeaContainer.add(animatedSea);
                }
            }
            var gradient = new Phaser.Image(_this.game, x, y, "texture_atlas_3", "gradient_sea.png");
            gradient.scale.set(BattleshipsArmada.GameConstants.GAME_WIDTH / 192, (BattleshipsArmada.GameConstants.GAME_HEIGHT / BattleshipsArmada.GameVars.scaleY) / 290);
            animatedSeaContainer.add(gradient);
            _this.waves = new Phaser.Image(_this.game, -BattleshipsArmada.GameConstants.GAME_WIDTH / 2, _this.isPlayer ? -490 - 100 : -410 - 100, "texture_atlas_1", _this.isPlayer ? "wave_01_rocks.png" : "wave_01_beach.png");
            _this.waves.scale.set(2, .76);
            _this.waves.alpha = 0;
            _this.gridContainer.add(coast);
            _this.gridContainer.add(_this.waves);
            _this.gridContainer.add(_this.grid1);
            _this.gridContainer.add(_this.grid2);
            _this.gridContainer.add(_this.grid3);
            _this.gridContainer.add(_this.grid4);
            _this.add(_this.gridContainer);
            if (!_this.isPlayer) {
                _this.grid1.inputEnabled = true;
                _this.grid1.events.onInputDown.add(_this.onDownBoard, _this);
                _this.grid2.inputEnabled = true;
                _this.grid2.events.onInputDown.add(_this.onDownBoard, _this);
                _this.grid3.inputEnabled = true;
                _this.grid3.events.onInputDown.add(_this.onDownBoard, _this);
                _this.grid4.inputEnabled = true;
                _this.grid4.events.onInputDown.add(_this.onDownBoard, _this);
            }
            if (!BattleshipsArmada.GameVars.needResign && !BattleshipsArmada.GameVars.needTimeoutAdversary && !BattleshipsArmada.GameVars.needTimeoutPlayer && BattleshipsArmada.GameVars.currentScene !== BattleshipsArmada.GameConstants.FINAL_SCENE) {
                _this.setShips();
                _this.createBoard();
            }
            if (_this.isPlayer) {
                var tween2_1 = _this.game.add.tween(_this.waves.scale);
                tween2_1.to({ y: 2 }, 3100, Phaser.Easing.Cubic.Out, true, 2200);
                var tween1_1 = _this.game.add.tween(_this.waves);
                tween1_1.to({ alpha: 1, y: -580 - 100 }, 3100, Phaser.Easing.Cubic.In, true, 2200);
                tween1_1.onStart.add(function () {
                    BattleshipsArmada.AudioManager.getInstance().playSound("sea_wave");
                }, _this);
                tween1_1.onComplete.add(function () {
                    this.game.add.tween(this.waves)
                        .to({ alpha: 0, y: -565 - 100 }, 1700, Phaser.Easing.Cubic.In, true)
                        .onComplete.add(function () {
                        this.waves.y = -490 - 100;
                        this.waves.scale.y = 2;
                        tween1_1.start();
                        tween2_1.start();
                    }, this);
                    this.game.add.tween(this.waves.scale)
                        .to({ y: 1.37 * 2 }, 1500, Phaser.Easing.Cubic.Out, true);
                }, _this);
            }
            else {
                var tween2_2 = _this.game.add.tween(_this.waves.scale);
                tween2_2.to({ y: 2 }, 3100, Phaser.Easing.Cubic.Out, true, 2200);
                var tween1_2 = _this.game.add.tween(_this.waves);
                tween1_2.to({ alpha: 1, y: -500 - 100 }, 3100, Phaser.Easing.Cubic.In, true, 2200);
                tween1_2.onStart.add(function () {
                    BattleshipsArmada.AudioManager.getInstance().playSound("sea_wave");
                }, _this);
                tween1_2.onComplete.add(function () {
                    this.game.add.tween(this.waves)
                        .to({ alpha: 0, y: -485 - 100 }, 1700, Phaser.Easing.Cubic.In, true)
                        .onComplete.add(function () {
                        this.waves.y = -410 - 100;
                        this.waves.scale.y = 2;
                        tween1_2.start();
                        tween2_2.start();
                    }, this);
                    this.game.add.tween(this.waves.scale)
                        .to({ y: 1.37 * 2 }, 1500, Phaser.Easing.Cubic.Out, true);
                }, _this);
            }
            if (BattleshipsArmada.GameConstants.SHOW_PROBABILITIES) {
                var probContainer = new Phaser.Group(_this.game);
                _this.gridContainer.add(probContainer);
                _this.probabilities = new Array();
                for (var i = 0; i < 10; i++) {
                    for (var j = 0; j < 10; j++) {
                        var p = BattleshipsArmada.GameVars.getCoordinatesFromRowAndCol(i, j);
                        var text = new Phaser.Text(_this.game, p.x, p.y, "0", { font: "30px American Captain", fill: "#ff0000" });
                        text.anchor.set(.5);
                        text.stroke = "#000000";
                        text.strokeThickness = 4;
                        _this.probabilities.push(text);
                        probContainer.add(text);
                    }
                }
            }
            return _this;
        }
        BoardLayer.prototype.createBoard = function () {
            var board = this.isPlayer ? BattleshipsArmada.GameVars.playerBoard : BattleshipsArmada.GameVars.adversaryBoard;
            for (var i = 0; i < 10; i++) {
                for (var j = 0; j < 10; j++) {
                    var p = BattleshipsArmada.GameVars.getCoordinatesFromRowAndCol(i, j);
                    if (board[i][j] === 1) {
                        var water = new Phaser.Sprite(this.game, p.x, p.y - 44, "texture_atlas_1", "watersplash0021.png");
                        water.anchor.set(.5);
                        water.name = BattleshipsArmada.GameConstants.WATER_NAME;
                        this.gridContainer.addChild(water);
                    }
                    else if (board[i][j] > 6) {
                        var hit = new BattleshipsArmada.Hit(this.game, p.x, p.y);
                        hit.visible = true;
                        hit.smoke.play("smoke", 12, true);
                        this.gridContainer.addChild(hit);
                        this.hits.push(hit);
                        this.reorderHits();
                        if (board[i][j] > 11) {
                            this.showSunkenShip(board[i][j] - 10);
                        }
                    }
                }
            }
        };
        BoardLayer.prototype.resetAnimations = function () {
            for (var i = 0; i < this.gridContainer.children.length; i++) {
                var child = this.gridContainer.getChildAt(i);
                if (child.name === BattleshipsArmada.GameConstants.WATER_NAME) {
                    child.animations.stop();
                    child.frameName = "watersplash0021.png";
                }
            }
        };
        BoardLayer.prototype.addHit = function (row, col, shipSunk, type) {
            BattleshipsArmada.GameManager.addHit();
            this.hideMark();
            var p = BattleshipsArmada.GameVars.getCoordinatesFromRowAndCol(row, col);
            var hit = new BattleshipsArmada.Hit(this.game, p.x, p.y);
            this.gridContainer.addChild(hit);
            this.hits.push(hit);
            this.reorderHits();
            var fire = new Phaser.Sprite(this.game, p.x, p.y - 50, "texture_atlas_2", "impact_0001.png");
            fire.anchor.set(.5);
            fire.scale.set(1);
            this.gridContainer.addChild(fire);
            var anim1 = fire.animations.add("fire", Phaser.Animation.generateFrameNames("impact_", 1, 3, ".png", 4));
            anim1.onComplete.add(function () {
                fire.play("fire2", 24);
                hit.visible = true;
                hit.smoke.play("smoke", 12, true);
            }, this);
            var anim2 = fire.animations.add("fire2", Phaser.Animation.generateFrameNames("impact_", 4, 17, ".png", 4));
            anim2.onComplete.add(function () {
                fire.destroy();
                if (shipSunk) {
                    var ship = void 0;
                    for (var i = 0; i < this.ships.length; i++) {
                        if (this.ships[i].shipType === type) {
                            ship = this.ships[i];
                            break;
                        }
                    }
                    var final_fire_1 = new Phaser.Sprite(this.game, ship.shipImage.x, ship.shipImage.y - 10, "texture_atlas_2", "final_kaboom_0001.png");
                    final_fire_1.anchor.set(.5);
                    final_fire_1.scale.set(1);
                    this.gridContainer.addChild(final_fire_1);
                    var animFinal = final_fire_1.animations.add("fire", Phaser.Animation.generateFrameNames("final_kaboom_", 1, 6, ".png", 4));
                    animFinal.onComplete.add(function () {
                        final_fire_1.destroy();
                    }, this);
                    final_fire_1.play("fire", 24);
                    BattleshipsArmada.AudioManager.getInstance().playSound("explossion_ship_complete");
                }
            }, this);
            fire.play("fire", 24);
        };
        BoardLayer.prototype.addHit2 = function (row, col, shipSunk, type) {
            BattleshipsArmada.GameManager.addHit();
            this.hideMark();
            var p = BattleshipsArmada.GameVars.getCoordinatesFromRowAndCol(row, col);
            var hit = new BattleshipsArmada.Hit(this.game, p.x, p.y);
            this.gridContainer.addChild(hit);
            this.hits.push(hit);
            this.reorderHits();
            hit.visible = true;
            hit.smoke.play("smoke", 12, true);
        };
        BoardLayer.prototype.reorderHits = function () {
            this.hits.sort(function (h1, h2) { return h1.y - h2.y; });
            for (var i = 0; i < this.hits.length; i++) {
                this.gridContainer.addChild(this.hits[i]);
            }
        };
        BoardLayer.prototype.addMissedHit = function (row, col) {
            BattleshipsArmada.GameManager.addMissedHit();
            this.hideMark();
            var p = BattleshipsArmada.GameVars.getCoordinatesFromRowAndCol(row, col);
            var water = new Phaser.Sprite(this.game, p.x, p.y - 44, "texture_atlas_1", "watersplash0001.png");
            water.anchor.set(.5);
            water.name = BattleshipsArmada.GameConstants.WATER_NAME;
            this.gridContainer.addChild(water);
            water.animations.add("water", Phaser.Animation.generateFrameNames("watersplash", 1, 21, ".png", 4));
            water.animations.play("water", 24, false, false);
        };
        BoardLayer.prototype.addMissedHit2 = function (row, col) {
            BattleshipsArmada.GameManager.addMissedHit();
            this.hideMark();
            var p = BattleshipsArmada.GameVars.getCoordinatesFromRowAndCol(row, col);
            var water = new Phaser.Sprite(this.game, p.x, p.y - 44, "texture_atlas_1", "watersplash0001.png");
            water.anchor.set(.5);
            water.name = BattleshipsArmada.GameConstants.WATER_NAME;
            this.gridContainer.addChild(water);
            water.animations.add("water", Phaser.Animation.generateFrameNames("watersplash", 1, 21, ".png", 4));
            water.animations.play("water", 24, false, false);
        };
        BoardLayer.prototype.showSunkenShip = function (shipType) {
            var ship;
            for (var i = 0; i < this.ships.length; i++) {
                if (this.ships[i].shipType === shipType) {
                    ship = this.ships[i];
                    break;
                }
            }
            if (!this.isPlayer) {
                if (BattleshipsArmada.GameConstants.ADVERSARY_SHIPS_VISIBLE) {
                    ship.alpha = 1;
                }
                else {
                    ship.visible = true;
                }
            }
            ship.sink();
        };
        BoardLayer.prototype.showMark = function (row, col) {
            this.gridContainer.removeChild(this.markHint);
            BoardLayer.onTween = true;
            var p = BattleshipsArmada.GameVars.getCoordinatesFromRowAndCol(row, col);
            this.mark = new Phaser.Sprite(this.game, p.x, p.y, "texture_atlas_1", "target_01.png");
            this.mark.anchor.set(.5);
            this.gridContainer.addChild(this.mark);
            this.mark.animations.add("mark", Phaser.Animation.generateFrameNames("target_", 1, 17, ".png", 2));
            this.mark.play("mark", 24);
        };
        BoardLayer.prototype.hideMark = function () {
            this.gridContainer.removeChild(this.mark);
        };
        BoardLayer.prototype.setProbabilities = function (probabilities) {
            if (BattleshipsArmada.GameConstants.SHOW_PROBABILITIES && probabilities) {
                var maxValue = 0;
                for (var i = 0; i < 10; i++) {
                    for (var j = 0; j < 10; j++) {
                        if (probabilities[i][j] > maxValue) {
                            maxValue = probabilities[i][j];
                        }
                    }
                }
                for (var i = 0; i < 10; i++) {
                    for (var j = 0; j < 10; j++) {
                        this.probabilities[j + 10 * i].text = "" + probabilities[i][j];
                        this.probabilities[j + 10 * i].fill = Phaser.Color.getWebRGB(Phaser.Color.interpolateColor(0xff0000, 0x00ff00, maxValue, probabilities[i][j]));
                    }
                }
            }
        };
        BoardLayer.prototype.hint = function () {
            var bool = false;
            var x = -1;
            var y = -1;
            for (var i = 0; i < BattleshipsArmada.GameVars.adversaryBoard.length && !bool; i++) {
                for (var j = 0; j < BattleshipsArmada.GameVars.adversaryBoard.length && !bool; j++) {
                    if (BattleshipsArmada.GameVars.adversaryBoard[i][j] >= 7) {
                        if (i - 1 >= 0 && BattleshipsArmada.GameVars.adversaryBoard[i][j] - 5 === BattleshipsArmada.GameVars.adversaryBoard[i - 1][j]) {
                            y = i - 1;
                            x = j;
                            this.showHint(x, y);
                            return;
                        }
                        else if (i + 1 <= 9 && BattleshipsArmada.GameVars.adversaryBoard[i][j] - 5 === BattleshipsArmada.GameVars.adversaryBoard[i + 1][j]) {
                            y = i + 1;
                            x = j;
                            this.showHint(x, y);
                            return;
                        }
                        else if (j - 1 >= 0 && BattleshipsArmada.GameVars.adversaryBoard[i][j] - 5 === BattleshipsArmada.GameVars.adversaryBoard[i][j - 1]) {
                            y = i;
                            x = j - 1;
                            this.showHint(x, y);
                            return;
                        }
                        else if (j + 1 <= 9 && BattleshipsArmada.GameVars.adversaryBoard[i][j] - 5 === BattleshipsArmada.GameVars.adversaryBoard[i][j + 1]) {
                            y = i;
                            x = j + 1;
                            this.showHint(x, y);
                            return;
                        }
                    }
                }
            }
            for (var i = 0; i < BattleshipsArmada.GameVars.adversaryBoard.length && !bool; i++) {
                for (var j = 0; j < BattleshipsArmada.GameVars.adversaryBoard.length && !bool; j++) {
                    if (BattleshipsArmada.GameVars.adversaryBoard[i][j] <= 6 && BattleshipsArmada.GameVars.adversaryBoard[i][j] >= 2) {
                        this.showHint(j, i);
                        return;
                    }
                }
            }
        };
        BoardLayer.prototype.showHint = function (x, y) {
            console.log(x, y);
            var p = BattleshipsArmada.GameVars.getCoordinatesFromRowAndCol(y, x);
            this.markHint = new Phaser.Sprite(this.game, p.x, p.y, "texture_atlas_1", "target_17.png");
            this.markHint.anchor.set(.5);
            this.gridContainer.addChild(this.markHint);
            this.game.add.tween(this.markHint.scale)
                .to({ x: [.9, 1], y: [.9, 1] }, 500, Phaser.Easing.Cubic.Out, true, 0, -1);
        };
        BoardLayer.prototype.onDownBoard = function (a, pointer) {
            if (BattleshipsArmada.TransitionLayer.onTween) {
                return;
            }
            var p = a.toLocal(new PIXI.Point(pointer.x, pointer.y), null);
            var row = p.y + BattleshipsArmada.GameConstants.GAME_WIDTH / 2;
            var col = p.x + BattleshipsArmada.GameConstants.GAME_WIDTH / 2;
            row = Math.floor(row / (BattleshipsArmada.GameConstants.GAME_WIDTH / 10));
            col = Math.floor(col / (BattleshipsArmada.GameConstants.GAME_WIDTH / 10));
            if (a.scale.y === -1) {
                row = 5 + (4 - row);
            }
            if (a.scale.x === -1) {
                col = 5 + (4 - col);
            }
            BattleshipsArmada.BattleManagerAI.currentInstance.cellSelected(row, col);
        };
        BoardLayer.prototype.setShips = function () {
            this.ships = [];
            var board;
            board = this.isPlayer ? BattleshipsArmada.GameVars.playerBoard : BattleshipsArmada.GameVars.adversaryBoard;
            for (var i = 0; i < BattleshipsArmada.GameConstants.SHIPS.length; i++) {
                var p = BattleshipsArmada.GameVars.getShipPosition(board, BattleshipsArmada.GameConstants.SHIPS[i]);
                var ship = new BattleshipsArmada.BoardShip(this.game, BattleshipsArmada.GameConstants.SHIPS[i], this.isPlayer ? "blue" : "red");
                ship.setInitialPosition(p.row, p.col, p.angle);
                if (!this.isPlayer) {
                    if (BattleshipsArmada.GameConstants.ADVERSARY_SHIPS_VISIBLE) {
                        ship.alpha = .35;
                    }
                    else {
                        ship.visible = false;
                    }
                }
                this.gridContainer.addAt(ship, 7);
                this.ships.push(ship);
            }
        };
        BoardLayer.onTween = false;
        return BoardLayer;
    }(Phaser.Group));
    BattleshipsArmada.BoardLayer = BoardLayer;
})(BattleshipsArmada || (BattleshipsArmada = {}));
var BattleshipsArmada;
(function (BattleshipsArmada) {
    var Hit = (function (_super) {
        __extends(Hit, _super);
        function Hit(game, x, y) {
            var _this = _super.call(this, game, null, "hit") || this;
            _this.x = x;
            _this.y = y;
            _this.visible = false;
            _this.smoke = new Phaser.Image(_this.game, 0, 0, "texture_atlas_2", "smoke_0001.png");
            _this.smoke.anchor.set(.2, .9);
            _this.smoke.animations.add("smoke", Phaser.Animation.generateFrameNames("smoke_", 1, 13, ".png", 4));
            _this.add(_this.smoke);
            var rand = Math.random() * 0.4 + 0.8;
            _this.smoke.scale.set(rand);
            _this.mark = new Phaser.Image(_this.game, 0, 0, "texture_atlas_1", "marker-hit.png");
            _this.mark.scale.set(.9);
            _this.mark.anchor.set(.5);
            _this.add(_this.mark);
            return _this;
        }
        return Hit;
    }(Phaser.Group));
    BattleshipsArmada.Hit = Hit;
})(BattleshipsArmada || (BattleshipsArmada = {}));
var BattleshipsArmada;
(function (BattleshipsArmada) {
    var DevelopmentLayer = (function (_super) {
        __extends(DevelopmentLayer, _super);
        function DevelopmentLayer(game) {
            var _this = _super.call(this, game, null, "development-layer") || this;
            var finish = new Phaser.Image(_this.game, 10, BattleshipsArmada.GameConstants.GAME_HEIGHT - 10, "texture_atlas_0", "btn_show_finish.png");
            finish.anchor.set(0, 1);
            finish.inputEnabled = true;
            finish.events.onInputDown.add(_this.onFinishDown, _this);
            finish.scale.y = BattleshipsArmada.GameVars.scaleY;
            _this.add(finish);
            _this.fpsLabel = new Phaser.Text(_this.game, BattleshipsArmada.GameConstants.GAME_WIDTH - 10, BattleshipsArmada.GameConstants.GAME_HEIGHT - 10, "60", { font: "25px Arial", fill: "#ffff00" });
            _this.fpsLabel.anchor.set(1);
            _this.fpsLabel.scale.y = BattleshipsArmada.GameVars.scaleY;
            _this.add(_this.fpsLabel);
            return _this;
        }
        DevelopmentLayer.prototype.onFinishDown = function () {
            this.visible = false;
            BattleshipsArmada.BattleState.currentInstance.finalLayer.show(false);
            BattleshipsArmada.BattleState.currentInstance.hud.hide();
            BattleshipsArmada.BattleState.currentInstance.gui.hide();
            BattleshipsArmada.BattleState.currentInstance.missilesContainer.hide();
        };
        DevelopmentLayer.prototype.update = function () {
            this.fpsLabel.text = "fps: " + this.game.time.fps;
        };
        return DevelopmentLayer;
    }(Phaser.Group));
    BattleshipsArmada.DevelopmentLayer = DevelopmentLayer;
})(BattleshipsArmada || (BattleshipsArmada = {}));
var BattleshipsArmada;
(function (BattleshipsArmada) {
    var Avatar = (function (_super) {
        __extends(Avatar, _super);
        function Avatar(game, x, y, player) {
            var _this = _super.call(this, game, null, "avatar") || this;
            _this.x = x;
            _this.y = y;
            _this.wreath = new Phaser.Image(_this.game, 0, 0, "texture_atlas_1", "wreath.png");
            _this.wreath.anchor.set(.5, 1);
            _this.wreath.visible = false;
            _this.add(_this.wreath);
            if (player) {
                if (BattleshipsArmada.GameVars.playerData) {
                    _this.image = new Phaser.Image(_this.game, 0, 0, "player-avatar");
                    _this.image.scale.set((80 / _this.image.width) * 1.3, (80 / _this.image.height) * 1.3);
                    var mask = new Phaser.Graphics(_this.game);
                    mask.beginFill();
                    mask.drawCircle(0, -_this.image.height / 2, _this.image.width);
                    mask.endFill();
                    _this.add(mask);
                    _this.image.mask = mask;
                }
                else {
                    _this.image = new Phaser.Image(_this.game, 0, 0, "texture_atlas_1", "avatar_player.png");
                    _this.image.scale.set(1.3);
                }
                var avatar_ext = new Phaser.Graphics(_this.game);
                avatar_ext.beginFill(0xFFFFFF, 1);
                avatar_ext.drawCircle(0, (-_this.image.height) / 2, _this.image.width * 1.1);
                avatar_ext.endFill();
                _this.add(avatar_ext);
                _this.image.anchor.set(.5, 1);
                _this.add(_this.image);
            }
            else {
                _this.image = new Phaser.Image(_this.game, 0, 0, "texture_atlas_1", "avatar_rival.png");
                _this.image.scale.set(1.2);
                _this.image.anchor.set(.5, 1);
                var avatar_ext = new Phaser.Graphics(_this.game);
                avatar_ext.beginFill(0xFFFFFF, 1);
                avatar_ext.drawCircle(0, (-_this.image.height) / 2, _this.image.width * 1.1);
                avatar_ext.endFill();
                _this.add(avatar_ext);
                _this.add(_this.image);
            }
            _this.nametext = new Phaser.Text(_this.game, 0, 10, BattleshipsArmada.GameVars.languages[BattleshipsArmada.GameVars.gameData.language]["PLAYER"], { font: "45px American Captain", fill: "#00cfcf" });
            _this.nametext.anchor.set(.5, 0);
            _this.add(_this.nametext);
            if (BattleshipsArmada.GameVars.playerData) {
                _this.nametext.text = BattleshipsArmada.Utils.getValidName(BattleshipsArmada.GameVars.playerData.name).toUpperCase();
            }
            if (!player) {
                _this.nametext.text = BattleshipsArmada.GameVars.languages[BattleshipsArmada.GameVars.gameData.language]["RIVAL"];
                _this.nametext.fill = "#cd0000";
            }
            return _this;
        }
        Avatar.prototype.showWreath = function () {
            this.wreath.visible = true;
        };
        return Avatar;
    }(Phaser.Group));
    BattleshipsArmada.Avatar = Avatar;
})(BattleshipsArmada || (BattleshipsArmada = {}));
var BattleshipsArmada;
(function (BattleshipsArmada) {
    var FinalLayer = (function (_super) {
        __extends(FinalLayer, _super);
        function FinalLayer(game) {
            var _this = _super.call(this, game, null, "final-layer") || this;
            _this.visible = false;
            _this.alpha = 0;
            _this.bck = new Phaser.Image(_this.game, 0, 0, _this.game.cache.getBitmapData(BattleshipsArmada.GameConstants.DARK_BLUE_SQUARE));
            _this.bck.scale.set(BattleshipsArmada.GameConstants.GAME_WIDTH / BattleshipsArmada.GameConstants.BITMAP_SIZE, BattleshipsArmada.GameConstants.GAME_HEIGHT / BattleshipsArmada.GameConstants.BITMAP_SIZE);
            _this.bck.alpha = 0;
            _this.bck.inputEnabled = true;
            _this.bck.events.onInputDown.add(_this.bckDown, _this);
            _this.add(_this.bck);
            _this.fireworks = [];
            var image = new Phaser.Image(_this.game, 100, 200 + Math.random() * 200, "texture_atlas_2", "fireworks_01.png");
            var rand = 1 + Math.random() * 1.5;
            image.scale.set(rand, rand * BattleshipsArmada.GameVars.scaleY);
            image.anchor.set(.5);
            image.angle = Math.random() * 10 - 5;
            image.tint = 0xff8260;
            image.visible = false;
            var anim = image.animations.add("fireworks", Phaser.Animation.generateFrameNames("fireworks_", 1, 25, ".png", 2));
            anim.onComplete.add(function () {
                this.fireworks[0].y = 200 + Math.random() * 200;
                this.fireworks[0].play("fireworks", 24);
                rand = 1 + Math.random() * 1.5;
                this.fireworks[0].scale.set(rand, rand * BattleshipsArmada.GameVars.scaleY);
                this.fireworks[0].angle = Math.random() * 10 - 5;
            }, _this);
            _this.fireworks.push(image);
            _this.add(image);
            image = new Phaser.Image(_this.game, 300, 200 + Math.random() * 200, "texture_atlas_2", "fireworks_01.png");
            rand = 1 + Math.random() * 1.5;
            image.scale.set(rand, rand * BattleshipsArmada.GameVars.scaleY);
            image.anchor.set(.5);
            image.angle = Math.random() * 10 - 5;
            image.tint = 0xffef65;
            image.visible = false;
            var anim2 = image.animations.add("fireworks", Phaser.Animation.generateFrameNames("fireworks_", 1, 25, ".png", 2));
            anim2.onComplete.add(function () {
                this.fireworks[1].y = 200 + Math.random() * 200;
                this.fireworks[1].play("fireworks", 24);
                rand = 1 + Math.random() * 1.5;
                this.fireworks[1].scale.set(rand, rand * BattleshipsArmada.GameVars.scaleY);
                this.fireworks[1].angle = Math.random() * 10 - 5;
            }, _this);
            _this.fireworks.push(image);
            _this.add(image);
            image = new Phaser.Image(_this.game, 500, 200 + Math.random() * 200, "texture_atlas_2", "fireworks_01.png");
            rand = 1 + Math.random() * 1.5;
            image.scale.set(rand, rand * BattleshipsArmada.GameVars.scaleY);
            image.anchor.set(.5);
            image.angle = Math.random() * 10 - 5;
            image.tint = 0xff9743;
            image.visible = false;
            var anim3 = image.animations.add("fireworks", Phaser.Animation.generateFrameNames("fireworks_", 1, 25, ".png", 2));
            anim3.onComplete.add(function () {
                this.fireworks[2].y = 200 + Math.random() * 200;
                this.fireworks[2].play("fireworks", 24);
                rand = 1 + Math.random() * 1.5;
                this.fireworks[2].scale.set(rand, rand * BattleshipsArmada.GameVars.scaleY);
                this.fireworks[2].angle = Math.random() * 10 - 5;
            }, _this);
            _this.fireworks.push(image);
            _this.add(image);
            image = new Phaser.Image(_this.game, 700, 200 + Math.random() * 200, "texture_atlas_2", "fireworks_01.png");
            rand = 1 + Math.random() * 1.5;
            image.scale.set(rand, rand * BattleshipsArmada.GameVars.scaleY);
            image.anchor.set(.5);
            image.angle = Math.random() * 10 - 5;
            image.tint = 0xffd667;
            image.visible = false;
            var anim4 = image.animations.add("fireworks", Phaser.Animation.generateFrameNames("fireworks_", 1, 25, ".png", 2));
            anim4.onComplete.add(function () {
                this.fireworks[3].y = 200 + Math.random() * 200;
                this.fireworks[3].play("fireworks", 24);
                rand = 1 + Math.random() * 1.5;
                this.fireworks[3].scale.set(rand, rand * BattleshipsArmada.GameVars.scaleY);
                this.fireworks[3].angle = Math.random() * 10 - 5;
            }, _this);
            _this.fireworks.push(image);
            _this.add(image);
            _this.topContainer = new Phaser.Group(_this.game);
            _this.topContainer.y = 150;
            _this.topContainer.x = BattleshipsArmada.GameConstants.GAME_WIDTH / 2;
            _this.topContainer.scale.y = BattleshipsArmada.GameVars.scaleY;
            _this.topContainer.alpha = 0;
            _this.add(_this.topContainer);
            _this.missileContainer = new Phaser.Group(_this.game);
            _this.missileContainer.scale.set(.7);
            _this.topContainer.add(_this.missileContainer);
            _this.smoke = new Phaser.Image(_this.game, -320, 155, "texture_atlas_1", "smoke_results.png");
            _this.smoke.anchor.set(0, .5);
            _this.smoke.angle = -20;
            _this.smoke.scale.set(.7);
            _this.missileContainer.add(_this.smoke);
            _this.missile = new Phaser.Image(_this.game, 80, -30, "texture_atlas_1", "missile_results.png");
            _this.missile.anchor.set(0, .5);
            _this.missile.angle = -20;
            _this.missile.scale.set(.7);
            _this.missileContainer.add(_this.missile);
            _this.ship = new Phaser.Image(_this.game, 0, -80, "texture_atlas_1", "ship_results.png");
            _this.ship.anchor.set(.5);
            _this.ship.alpha = 0;
            _this.topContainer.add(_this.ship);
            _this.title = new Phaser.Image(_this.game, 0, 0, "texture_atlas_5_" + BattleshipsArmada.GameVars.gameData.language, "text_you_won.png");
            _this.title.anchor.set(.5);
            _this.topContainer.add(_this.title);
            _this.subtitle = new Phaser.Text(_this.game, 0, 100, BattleshipsArmada.GameVars.languages[BattleshipsArmada.GameVars.gameData.language]["YOUR RIVAL RESIGNED"], { font: "60px American Captain", fill: "#ffffff" });
            _this.subtitle.anchor.set(.5);
            _this.subtitle.stroke = "#38536f";
            _this.subtitle.strokeThickness = 10;
            _this.subtitle.setShadow(3, 3, "rgba(0,0,0,0.5)", 5);
            _this.subtitle.visible = false;
            _this.topContainer.add(_this.subtitle);
            _this.middleContainer = new Phaser.Group(_this.game);
            _this.middleContainer.y = BattleshipsArmada.GameConstants.GAME_HEIGHT / 2 + 60;
            _this.middleContainer.x = BattleshipsArmada.GameConstants.GAME_WIDTH / 2;
            _this.middleContainer.scale.set(.8, .8 * BattleshipsArmada.GameVars.scaleY);
            _this.add(_this.middleContainer);
            var box = new Phaser.Image(_this.game, 0, 0, "texture_atlas_1", "box.png");
            box.anchor.set(.5);
            _this.middleContainer.add(box);
            _this.avatarPlayer = new BattleshipsArmada.Avatar(_this.game, -100, -80, true);
            _this.middleContainer.add(_this.avatarPlayer);
            _this.avatarRival = new BattleshipsArmada.Avatar(_this.game, 100, -80, false);
            _this.middleContainer.add(_this.avatarRival);
            var rematch = new Phaser.Button(_this.game, 0, 0, "texture_atlas_5_" + BattleshipsArmada.GameVars.gameData.language);
            rematch.setFrames("btn_rematch_on.png", "btn_rematch.png", "btn_rematch_on.png");
            rematch.anchor.set(.5, 0);
            rematch.inputEnabled = true;
            rematch.events.onInputDown.add(_this.onRematchDown, _this);
            _this.middleContainer.add(rematch);
            var backToHome = new Phaser.Button(_this.game, 0, 135, "texture_atlas_5_" + BattleshipsArmada.GameVars.gameData.language);
            backToHome.setFrames("btn_back_home_on.png", "btn_back_home.png", "btn_back_home_on.png");
            backToHome.anchor.set(.5, 0);
            backToHome.inputEnabled = true;
            backToHome.events.onInputDown.add(_this.onBackToHomeDown, _this);
            _this.middleContainer.add(backToHome);
            return _this;
        }
        FinalLayer.prototype.show = function (win) {
            if (this.visible) {
                return;
            }
            if (win) {
                this.avatarPlayer.showWreath();
                this.title.frameName = "text_you_won.png";
            }
            else {
                this.avatarRival.showWreath();
                this.title.frameName = "text_you_lose.png";
                this.ship.alpha = 1;
            }
            this.visible = true;
            if (BattleshipsArmada.GameVars.rivalResigned) {
                this.subtitle.visible = true;
            }
            else if (BattleshipsArmada.GameVars.resigned) {
                this.subtitle.visible = true;
                this.subtitle.text = BattleshipsArmada.GameVars.languages[BattleshipsArmada.GameVars.gameData.language]["YOU RESIGNED"];
                this.subtitle.fill = "#f62b56";
                this.subtitle.stroke = "#94142d";
            }
            else if (BattleshipsArmada.GameVars.rivalTimeout) {
                this.subtitle.visible = true;
                this.subtitle.text = BattleshipsArmada.GameVars.languages[BattleshipsArmada.GameVars.gameData.language]["RIVAL TIMEOUT"];
            }
            else if (BattleshipsArmada.GameVars.timeout) {
                this.subtitle.visible = true;
                this.subtitle.text = BattleshipsArmada.GameVars.languages[BattleshipsArmada.GameVars.gameData.language]["TIMEOUT"];
                this.subtitle.fill = "#f62b56";
                this.subtitle.stroke = "#94142d";
            }
            if (BattleshipsArmada.GameVars.win === null) {
                this.game.add.tween(this)
                    .to({ alpha: 1 }, 250, Phaser.Easing.Linear.None, true, 1500);
                this.game.add.tween(this.middleContainer.scale)
                    .to({ x: 1, y: BattleshipsArmada.GameVars.scaleY }, 250, Phaser.Easing.Linear.None, true, 1500);
                this.game.add.tween(this.topContainer)
                    .to({ alpha: 1 }, 250, Phaser.Easing.Cubic.Out, true, 2000);
                if (win) {
                    this.game.add.tween(this.missileContainer.scale)
                        .to({ x: 1, y: 1 }, 1000, Phaser.Easing.Cubic.Out, true, 2000);
                    this.game.add.tween(this.missile.scale)
                        .to({ x: 1, y: 1 }, 1000, Phaser.Easing.Cubic.Out, true, 2000);
                    this.game.add.tween(this.smoke.scale)
                        .to({ x: 1, y: 1 }, 1000, Phaser.Easing.Cubic.Out, true, 2000);
                }
                this.game.add.tween(this.bck)
                    .to({ alpha: .7 }, 1000, Phaser.Easing.Linear.None, true);
                if (win) {
                    var _loop_1 = function (i) {
                        var randTime = 1000 + Math.random() * 2000;
                        this_1.game.time.events.add(randTime, function () {
                            this.fireworks[i].visible = true;
                            this.fireworks[i].play("fireworks", 16);
                        }, this_1);
                    };
                    var this_1 = this;
                    for (var i = 0; i < this.fireworks.length; i++) {
                        _loop_1(i);
                    }
                    this.game.time.events.add(1000, function () {
                        BattleshipsArmada.AudioManager.getInstance().playSound("fireworks", true);
                    }, this);
                }
            }
            else {
                this.alpha = 1;
                this.middleContainer.scale.set(1, BattleshipsArmada.GameVars.scaleY);
                this.topContainer.alpha = 1;
                this.missileContainer.scale.set(1);
                this.missile.scale.set(1);
                this.smoke.scale.set(1);
                this.bck.alpha = .7;
            }
        };
        FinalLayer.prototype.onRematchDown = function () {
            BattleshipsArmada.AudioManager.getInstance().stopSound("fireworks", false, true);
            BattleshipsArmada.PauseLayer.onPause = false;
            BattleshipsArmada.AudioManager.getInstance().playSound("click");
            BattleshipsArmada.GameManager.soloGameChosen();
        };
        FinalLayer.prototype.onBackToHomeDown = function () {
            BattleshipsArmada.AudioManager.getInstance().stopSound("fireworks", false, true);
            BattleshipsArmada.AudioManager.getInstance().stopSound("battle", false, true);
            BattleshipsArmada.PauseLayer.onPause = false;
            BattleshipsArmada.AudioManager.getInstance().playSound("click");
            BattleshipsArmada.GameManager.startSplash();
        };
        FinalLayer.prototype.bckDown = function () {
        };
        return FinalLayer;
    }(Phaser.Group));
    BattleshipsArmada.FinalLayer = FinalLayer;
})(BattleshipsArmada || (BattleshipsArmada = {}));
var BattleshipsArmada;
(function (BattleshipsArmada) {
    var GUIBattle = (function (_super) {
        __extends(GUIBattle, _super);
        function GUIBattle(game) {
            var _this = _super.call(this, game, null, "gui") || this;
            var menuButton = new Phaser.Button(_this.game, 0, BattleshipsArmada.GameConstants.GAME_HEIGHT, "texture_atlas_1", _this.onClickMenu, _this);
            menuButton.setFrames("btn_menu_on.png", "btn_menu.png", "btn_menu_on.png");
            menuButton.scale.set(.9, .9 * BattleshipsArmada.GameVars.scaleY);
            menuButton.anchor.set(.5);
            menuButton.forceOut = true;
            menuButton.x += menuButton.width / 2;
            menuButton.y -= menuButton.height / 2;
            _this.add(menuButton);
            _this.hintButton = null;
            _this.pauseLayer = new BattleshipsArmada.PauseLayer(_this.game);
            _this.add(_this.pauseLayer);
            return _this;
        }
        GUIBattle.prototype.onClickMenu = function () {
            this.pauseLayer.show();
            BattleshipsArmada.AudioManager.getInstance().playSound("click");
        };
        GUIBattle.prototype.onClickHint = function () {
            BattleshipsArmada.GameManager.hint();
        };
        GUIBattle.prototype.changeTurn = function () {
            if (this.hintButton) {
                if (BattleshipsArmada.GameVars.currentTurn === BattleshipsArmada.GameConstants.PLAYER) {
                    this.hintButton.visible = true;
                    this.hintButton.alpha = 1;
                    this.hintButton.inputEnabled = true;
                    this.game.add.tween(this.hintButton.scale)
                        .to({ x: [.945, .9], y: [.945 * BattleshipsArmada.GameVars.scaleY, .9 * BattleshipsArmada.GameVars.scaleY] }, 500, Phaser.Easing.Cubic.In, true, 2000, 1);
                }
                else {
                    this.hintButton.visible = false;
                }
            }
        };
        GUIBattle.prototype.showHint = function () {
            this.hintButton.visible = false;
        };
        GUIBattle.prototype.hide = function () {
            this.game.add.tween(this)
                .to({ alpha: 0 }, 500, Phaser.Easing.Cubic.Out, true);
        };
        return GUIBattle;
    }(Phaser.Group));
    BattleshipsArmada.GUIBattle = GUIBattle;
})(BattleshipsArmada || (BattleshipsArmada = {}));
var BattleshipsArmada;
(function (BattleshipsArmada) {
    var PauseLayer = (function (_super) {
        __extends(PauseLayer, _super);
        function PauseLayer(game) {
            var _this = _super.call(this, game, null, "pause-layer") || this;
            _this.visible = false;
            _this.alpha = 0;
            var bck = new Phaser.Image(_this.game, 0, 0, _this.game.cache.getBitmapData(BattleshipsArmada.GameConstants.BLACK_SQUARE));
            bck.scale.set(BattleshipsArmada.GameConstants.GAME_WIDTH / BattleshipsArmada.GameConstants.BITMAP_SIZE, BattleshipsArmada.GameConstants.GAME_HEIGHT / BattleshipsArmada.GameConstants.BITMAP_SIZE);
            bck.alpha = .8;
            bck.inputEnabled = true;
            bck.events.onInputDown.add(_this.bckDown, _this);
            _this.add(bck);
            var exitButton = new Phaser.Button(_this.game, 0, BattleshipsArmada.GameConstants.GAME_HEIGHT, "texture_atlas_1", _this.onClickExit, _this);
            exitButton.setFrames("btn_close_on.png", "btn_close.png", "btn_close_on.png");
            exitButton.scale.set(.9, .9 * BattleshipsArmada.GameVars.scaleY);
            exitButton.anchor.set(.5);
            exitButton.x += exitButton.width / 2;
            exitButton.y -= exitButton.height / 2;
            exitButton.forceOut = true;
            _this.add(exitButton);
            var container = new Phaser.Group(_this.game);
            container.x = BattleshipsArmada.GameConstants.GAME_WIDTH / 2;
            container.y = BattleshipsArmada.GameConstants.GAME_HEIGHT / 2;
            container.scale.y = BattleshipsArmada.GameVars.scaleY;
            _this.add(container);
            var box = new Phaser.Image(_this.game, 0, 0, "texture_atlas_1", "box.png");
            box.anchor.set(.5);
            container.add(box);
            var resign = new Phaser.Button(_this.game, 0, -75, "texture_atlas_5_" + BattleshipsArmada.GameVars.gameData.language);
            resign.setFrames("btn_resign_on.png", "btn_resign.png", "btn_resign_on.png");
            resign.anchor.set(.5);
            resign.inputEnabled = true;
            resign.events.onInputDown.add(_this.onResignDown, _this);
            container.add(resign);
            var soundLabel = new Phaser.Text(_this.game, -55, 90, BattleshipsArmada.GameVars.languages[BattleshipsArmada.GameVars.gameData.language]["SOUND"], { font: "55px American Captain", fontWeight: "300", fill: "#FFFFFF", align: "center" });
            soundLabel.anchor.set(.5);
            container.add(soundLabel);
            var soundSwitchButton = new BattleshipsArmada.SwitchButton(_this.game, BattleshipsArmada.GameVars.gameData.sound);
            soundSwitchButton.x = 75;
            soundSwitchButton.y = 85;
            container.add(soundSwitchButton);
            return _this;
        }
        PauseLayer.prototype.onResignDown = function () {
            this.visible = false;
            BattleshipsArmada.BattleManagerAI.currentInstance.resign();
        };
        PauseLayer.prototype.show = function () {
            PauseLayer.onPause = true;
            this.visible = true;
            this.game.add.tween(this)
                .to({ alpha: 1 }, 500, Phaser.Easing.Cubic.Out, true);
        };
        PauseLayer.prototype.onClickExit = function () {
            BattleshipsArmada.AudioManager.getInstance().playSound("click");
            PauseLayer.onPause = false;
            this.game.add.tween(this)
                .to({ alpha: 0 }, 500, Phaser.Easing.Cubic.Out, true)
                .onComplete.add(function () {
                this.visible = false;
                BattleshipsArmada.BattleManagerAI.currentInstance.shootOneAI();
                BattleshipsArmada.BattleManagerAI.currentInstance.setNextTurn();
            }, this);
        };
        PauseLayer.prototype.bckDown = function () {
        };
        PauseLayer.onPause = false;
        return PauseLayer;
    }(Phaser.Group));
    BattleshipsArmada.PauseLayer = PauseLayer;
})(BattleshipsArmada || (BattleshipsArmada = {}));
var BattleshipsArmada;
(function (BattleshipsArmada) {
    var SwitchButton = (function (_super) {
        __extends(SwitchButton, _super);
        function SwitchButton(game, isOn, buttonContainer) {
            var _this = _super.call(this, game, 0, 0, "texture_atlas_1", isOn ? "switch_on.png" : "switch_off.png") || this;
            _this.isOn = isOn;
            _this.buttonContainer = buttonContainer || null;
            _this.inputEnabled = true;
            _this.events.onInputDown.add(_this.onDown, _this);
            _this.anchor.set(.5);
            return _this;
        }
        SwitchButton.prototype.onDown = function () {
            this.isOn = !this.isOn;
            this.frameName = this.isOn ? "switch_on.png" : "switch_off.png";
            if (this.buttonContainer) {
                this.buttonContainer.switched(this.isOn);
            }
            if (BattleshipsArmada.GameVars.gameData.sound) {
                BattleshipsArmada.GameVars.gameData.sound = false;
                BattleshipsArmada.AudioManager.getInstance().mute();
            }
            else {
                BattleshipsArmada.GameVars.gameData.sound = true;
                BattleshipsArmada.AudioManager.getInstance().unmute();
            }
        };
        return SwitchButton;
    }(Phaser.Image));
    BattleshipsArmada.SwitchButton = SwitchButton;
})(BattleshipsArmada || (BattleshipsArmada = {}));
var BattleshipsArmada;
(function (BattleshipsArmada) {
    var HUDBattle = (function (_super) {
        __extends(HUDBattle, _super);
        function HUDBattle(game) {
            var _this = _super.call(this, game, null, "hud") || this;
            _this.scale.y = BattleshipsArmada.GameVars.scaleY;
            if (BattleshipsArmada.GameVars.playerData) {
                _this.avatarPlayer = new Phaser.Image(_this.game, BattleshipsArmada.GameConstants.GAME_WIDTH - 15, 15, "player-avatar");
                _this.avatarPlayer.scale.set(80 / _this.avatarPlayer.width, 80 / _this.avatarPlayer.height);
                var mask = new Phaser.Graphics(_this.game);
                mask.beginFill();
                mask.drawCircle(BattleshipsArmada.GameConstants.GAME_WIDTH - 15 - _this.avatarPlayer.width / 2, 15 + _this.avatarPlayer.height / 2, _this.avatarPlayer.width);
                mask.endFill();
                _this.add(mask);
                _this.avatarPlayer.mask = mask;
            }
            else {
                _this.avatarPlayer = new Phaser.Image(_this.game, BattleshipsArmada.GameConstants.GAME_WIDTH - 15, 15, "texture_atlas_1", "avatar_player.png");
            }
            _this.avatarPlayer.anchor.set(1, 0);
            _this.avatarRival = new Phaser.Image(_this.game, BattleshipsArmada.GameConstants.GAME_WIDTH - 15, 15, "texture_atlas_1", "avatar_rival.png");
            _this.avatarRival.anchor.set(1, 0);
            _this.avatar_extRival = new Phaser.Graphics(_this.game);
            _this.avatar_extRival.beginFill(0xFFFFFF, 1);
            _this.avatar_extRival.drawCircle(BattleshipsArmada.GameConstants.GAME_WIDTH - 15 - _this.avatarRival.width / 2, 15 + _this.avatarRival.height / 2, _this.avatarRival.width * 1.1);
            _this.avatar_extRival.endFill();
            _this.add(_this.avatar_extRival);
            _this.add(_this.avatarRival);
            _this.add(_this.avatarPlayer);
            _this.playerName = new Phaser.Text(_this.game, BattleshipsArmada.GameConstants.GAME_WIDTH / 2, 15, BattleshipsArmada.GameVars.languages[BattleshipsArmada.GameVars.gameData.language]["PLAYER"], { font: "60px American Captain", fill: "#f0faf9", align: "center" });
            _this.playerName.anchor.set(.5, 0);
            _this.playerName.setShadow(0, 5, "#38536f", 0);
            _this.playerName.stroke = "#38536f";
            _this.playerName.strokeThickness = 10;
            _this.add(_this.playerName);
            _this.timer = new Phaser.Text(_this.game, BattleshipsArmada.GameConstants.GAME_WIDTH / 2, 90, "60", { font: "60px American Captain", fill: "#f0faf9", align: "center" });
            _this.timer.anchor.set(.5, 0);
            _this.timer.setShadow(0, 5, "#38536f", 0);
            _this.timer.stroke = "#38536f";
            _this.timer.strokeThickness = 10;
            _this.add(_this.timer);
            _this.timer.visible = false;
            _this.changeTurn();
            return _this;
        }
        HUDBattle.prototype.changeTurn = function () {
            if (BattleshipsArmada.GameVars.currentTurn === BattleshipsArmada.GameConstants.PLAYER) {
                this.avatarPlayer.visible = true;
                this.avatarRival.visible = false;
                if (this.avatar_extPlayer) {
                    this.avatar_extPlayer.visible = true;
                }
                if (this.avatar_extRival) {
                    this.avatar_extRival.visible = true;
                }
                if (BattleshipsArmada.GameVars.playerData) {
                    this.playerName.text = BattleshipsArmada.Utils.getValidName(BattleshipsArmada.GameVars.playerData.name).toUpperCase() + "'S TURN";
                }
                else {
                    this.playerName.text = BattleshipsArmada.GameVars.languages[BattleshipsArmada.GameVars.gameData.language]["YOUR TURN"];
                }
                this.playerName.fill = "#f0faf9";
                this.playerName.setShadow(0, 5, "#38536f", 0);
                this.playerName.stroke = "#38536f";
                this.timer.text = "40";
                this.timer.fill = "#f0faf9";
                this.timer.setShadow(0, 5, "#38536f", 0);
                this.timer.stroke = "#38536f";
            }
            else {
                this.avatarPlayer.visible = false;
                this.avatarRival.visible = true;
                if (this.avatar_extPlayer) {
                    this.avatar_extPlayer.visible = false;
                }
                if (this.avatar_extRival) {
                    this.avatar_extRival.visible = true;
                }
                this.playerName.text = BattleshipsArmada.GameVars.languages[BattleshipsArmada.GameVars.gameData.language]["RIVAL'S TURN"];
                this.playerName.fill = "#f92c57";
                this.playerName.setShadow(0, 5, "#8a172d", 0);
                this.playerName.stroke = "#8a172d";
                this.timer.text = "40";
                this.timer.fill = "#f92c57";
                this.timer.setShadow(0, 5, "#8a172d", 0);
                this.timer.stroke = "#8a172d";
            }
        };
        HUDBattle.prototype.startGame = function () {
        };
        HUDBattle.prototype.hide = function () {
            this.game.add.tween(this)
                .to({ alpha: 0 }, 500, Phaser.Easing.Cubic.Out, true);
        };
        return HUDBattle;
    }(Phaser.Group));
    BattleshipsArmada.HUDBattle = HUDBattle;
})(BattleshipsArmada || (BattleshipsArmada = {}));
var BattleshipsArmada;
(function (BattleshipsArmada) {
    var Missile = (function (_super) {
        __extends(Missile, _super);
        function Missile(game, x, y) {
            var _this = _super.call(this, game, x, y, "texture_atlas_2", "missile_01.png") || this;
            _this.anchor.set(.5, .35);
            _this.prevX = _this.x;
            _this.prevY = _this.y + 5;
            _this.onTween = false;
            _this.changeFrames = false;
            var anim = _this.animations.add("up", Phaser.Animation.generateFrameNames("missile_", 1, 7, ".png", 2));
            _this.animations.add("down", Phaser.Animation.generateFrameNames("missile_", 11, 26, ".png", 2));
            anim.onComplete.add(function () {
                this.changeFrames = true;
            }, _this);
            _this.changeMissiles();
            return _this;
        }
        Missile.prototype.update = function () {
            _super.prototype.update.call(this);
            if (this.onTween) {
                if (this.prevX !== this.x) {
                    this.rotation = Math.atan2(this.prevY - this.y, this.prevX - this.x) - Math.PI / 2;
                }
                this.prevY = this.y;
                this.prevX = this.x;
                var rand = Math.ceil(Math.random() * 3);
                if (rand === 1) {
                    BattleshipsArmada.BattleState.currentInstance.missilesContainer.addSmoke(this.x + this.height * .35 * Math.cos(this.rotation + Math.PI / 2), this.y + this.height * .35 * Math.sin(this.rotation + Math.PI / 2));
                }
                if (this.changeFrames && Math.ceil(Math.random() * 2) === 1) {
                    var name_1 = "bad";
                    if (BattleshipsArmada.GameVars.currentTurn === BattleshipsArmada.GameConstants.PLAYER) {
                        name_1 = "missile";
                    }
                    var rand_1 = name_1 + "_" + ("0" + (Math.ceil(Math.random() * 3) + 7)).slice(-2) + ".png";
                    while (rand_1 === this.frameName) {
                        rand_1 = name_1 + "_" + ("0" + (Math.ceil(Math.random() * 3) + 7)).slice(-2) + ".png";
                    }
                    this.frameName = rand_1;
                }
            }
        };
        Missile.prototype.startAnimation = function (row, col, hit, shipSunk) {
            this.onTween = true;
            this.prevY = this.y;
            this.prevX = this.x;
            var p = BattleshipsArmada.GameVars.getCoordinatesFromRowAndCol(row, col);
            var x = p.x - this.parent.x + BattleshipsArmada.GameConstants.GAME_WIDTH / 2;
            var y = p.y - (this.parent.y - BattleshipsArmada.GameConstants.BOARD_PY) * (1 / BattleshipsArmada.GameVars.scaleY);
            var d = Math.sqrt((this.parent.x - x) * (this.parent.x - x) + (this.parent.y - y) * (this.parent.y - y));
            var tweenTime = d / 1.2;
            var dx = (x - this.x - Math.random() * 40 - 20) / 1.5;
            var dy = (y - this.y - Math.random() * 100 - 50) / 1.5;
            this.play("up", 20);
            BattleshipsArmada.AudioManager.getInstance().playSound("missile_launch_fly");
            this.game.add.tween(this.scale)
                .to({ x: 2, y: 2 }, (12 * 1000) / 20, Phaser.Easing.Quadratic.Out, true);
            this.game.time.events.add(tweenTime - (12 * 1000) / 20, function () {
                this.play("down", 20);
                this.changeFrames = false;
                this.game.add.tween(this.scale)
                    .to({ x: .6, y: .6 }, (12 * 1000) / 20, Phaser.Easing.Quadratic.Out, true);
            }, this);
            var tween;
            if (Math.abs(dx) > 100) {
                tween = this.game.add.tween(this)
                    .to({ x: [x - dx, x], y: [y + dy, y] }, tweenTime, Phaser.Easing.Linear.None, true);
                tween.interpolation(function (v, k) {
                    return Phaser.Math.bezierInterpolation(v, k);
                });
            }
            else {
                tween = this.game.add.tween(this)
                    .to({ x: x, y: y }, tweenTime, Phaser.Easing.Quadratic.Out, true);
            }
            tween.onComplete.add(function () {
                this.onAnimationFinished(row, col, hit, shipSunk);
            }, this);
        };
        Missile.prototype.onAnimationFinished = function (row, col, hit, shipSunk) {
            this.visible = false;
            this.onTween = false;
            BattleshipsArmada.BattleManagerAI.currentInstance.missileShooted(row, col, hit, shipSunk);
        };
        Missile.prototype.changeMissiles = function () {
            var anim;
            if (BattleshipsArmada.GameVars.currentTurn === BattleshipsArmada.GameConstants.PLAYER) {
                this.frameName = "missile_01.png";
                anim = this.animations.add("up", Phaser.Animation.generateFrameNames("missile_", 1, 7, ".png", 2));
                this.animations.add("down", Phaser.Animation.generateFrameNames("missile_", 11, 26, ".png", 2));
            }
            else {
                this.frameName = "bad_01.png";
                anim = this.animations.add("up", Phaser.Animation.generateFrameNames("bad_", 1, 7, ".png", 2));
                this.animations.add("down", Phaser.Animation.generateFrameNames("bad_", 11, 26, ".png", 2));
            }
            anim.onComplete.add(function () {
                this.changeFrames = true;
            }, this);
        };
        return Missile;
    }(Phaser.Sprite));
    BattleshipsArmada.Missile = Missile;
})(BattleshipsArmada || (BattleshipsArmada = {}));
var BattleshipsArmada;
(function (BattleshipsArmada) {
    var MissilesContainer = (function (_super) {
        __extends(MissilesContainer, _super);
        function MissilesContainer(game) {
            var _this = _super.call(this, game, null, "missiles-container") || this;
            _this.y = BattleshipsArmada.GameConstants.GAME_HEIGHT;
            _this.scale.y = BattleshipsArmada.GameVars.scaleY;
            _this.bck = new Phaser.Image(_this.game, BattleshipsArmada.GameConstants.GAME_WIDTH / 2 - 160, 0, "texture_atlas_1", "missiles-container.png");
            _this.bck.anchor.y = 1;
            _this.add(_this.bck);
            _this.missiles = [];
            _this.fires = [];
            var _loop_2 = function (i) {
                var x = BattleshipsArmada.GameConstants.GAME_WIDTH / 2 - (80 * Math.floor(BattleshipsArmada.GameConstants.NUM_MISSILES / 2)) + 80 * i;
                var y = 0;
                var missile = new BattleshipsArmada.Missile(this_2.game, x, y);
                this_2.add(missile);
                this_2.missiles.push(missile);
                var fire = new Phaser.Image(this_2.game, x, y, "texture_atlas_2", "missile_fire_01.png");
                fire.anchor.set(.5, 1);
                fire.visible = false;
                this_2.add(fire);
                var anim = fire.animations.add("fire", Phaser.Animation.generateFrameNames("missile_fire_", 1, 6, ".png", 2));
                anim.onComplete.add(function () {
                    fire.visible = false;
                    fire.frameName = "missile_fire_01.png";
                }, this_2);
                this_2.fires.push(fire);
            };
            var this_2 = this;
            for (var i = 0; i < BattleshipsArmada.GameConstants.NUM_MISSILES; i++) {
                _loop_2(i);
            }
            for (var i = 0; i < BattleshipsArmada.GameVars.shot; i++) {
                _this.missiles[_this.missiles.length - 1 - i].visible = false;
            }
            _this.smokes = new Phaser.Group(_this.game);
            _this.add(_this.smokes);
            if (BattleshipsArmada.GameConstants.AI_SHOTS) {
                _this.smokes.visible = false;
            }
            return _this;
        }
        MissilesContainer.prototype.hide = function () {
            this.game.add.tween(this.bck)
                .to({ y: 200 }, 1000, Phaser.Easing.Linear.None, true);
            for (var i = 0; i < this.missiles.length; i++) {
                if (!this.missiles[i].onTween) {
                    this.game.add.tween(this.missiles[i])
                        .to({ y: 200 }, 1000, Phaser.Easing.Linear.None, true);
                }
            }
        };
        MissilesContainer.prototype.shootMissile = function (row, col, hit, shipSunk) {
            this.animationMissile(row, col, hit, shipSunk);
        };
        MissilesContainer.prototype.animationMissile = function (row, col, hit, shipSunk) {
            this.bringToTop(this.missiles[BattleshipsArmada.GameConstants.NUM_MISSILES - BattleshipsArmada.GameVars.shot - 1]);
            this.bringToTop(this.smokes);
            this.bringToTop(this.fires[BattleshipsArmada.GameConstants.NUM_MISSILES - BattleshipsArmada.GameVars.shot - 1]);
            this.startFire();
            this.missiles[BattleshipsArmada.GameConstants.NUM_MISSILES - BattleshipsArmada.GameVars.shot - 1].startAnimation(row, col, hit, shipSunk);
        };
        MissilesContainer.prototype.startFire = function () {
            this.fires[BattleshipsArmada.GameConstants.NUM_MISSILES - BattleshipsArmada.GameVars.shot - 1].visible = true;
            this.fires[BattleshipsArmada.GameConstants.NUM_MISSILES - BattleshipsArmada.GameVars.shot - 1].play("fire", 24);
        };
        MissilesContainer.prototype.show = function () {
            this.game.add.tween(this)
                .to({ y: BattleshipsArmada.GameConstants.GAME_HEIGHT }, 1000, Phaser.Easing.Linear.None, true)
                .onComplete.add(function () {
                BattleshipsArmada.TransitionLayer.onTween = false;
            }, this);
        };
        MissilesContainer.prototype.reset = function () {
            for (var i = 0; i < this.missiles.length; i++) {
                this.bringToTop(this.smokes);
                var x = BattleshipsArmada.GameConstants.GAME_WIDTH / 2 - (80 * Math.floor(BattleshipsArmada.GameConstants.NUM_MISSILES / 2)) + 80 * i;
                var y = 0;
                this.missiles[i].x = x;
                this.missiles[i].y = y;
                this.missiles[i].visible = true;
                this.missiles[i].scale.set(1);
                this.missiles[i].rotation = 0;
                this.missiles[i].changeMissiles();
                this.y = BattleshipsArmada.GameConstants.GAME_HEIGHT + 100;
            }
        };
        MissilesContainer.prototype.addSmoke = function (x, y) {
            var smoke = new Phaser.Sprite(this.game, x, y, "texture_atlas_1", "smoke_particle.png");
            smoke.anchor.set(.5);
            var rand = Math.random() * .5 + .5;
            smoke.scale.set(rand);
            this.smokes.add(smoke);
            this.smokes.sendToBack(smoke);
            this.game.add.tween(smoke.scale)
                .to({ x: smoke.scale.x * 3, y: smoke.scale.y * 3 }, 2000, Phaser.Easing.Cubic.Out, true);
            this.game.add.tween(smoke)
                .to({ alpha: 0 }, 3000, Phaser.Easing.Cubic.Out, true)
                .onComplete.add(function () {
                this.smokes.remove(smoke);
            }, this);
        };
        return MissilesContainer;
    }(Phaser.Group));
    BattleshipsArmada.MissilesContainer = MissilesContainer;
})(BattleshipsArmada || (BattleshipsArmada = {}));
var BattleshipsArmada;
(function (BattleshipsArmada) {
    var SetBoard = (function (_super) {
        __extends(SetBoard, _super);
        function SetBoard(game) {
            var _this = _super.call(this, game, null, "board") || this;
            _this.x = BattleshipsArmada.GameConstants.GAME_WIDTH / 2;
            _this.y = BattleshipsArmada.GameConstants.GAME_HEIGHT / 2;
            _this.scale.y = BattleshipsArmada.GameVars.scaleY;
            _this.timeTapped = 0;
            _this.previousX = 0;
            _this.previousY = 0;
            _this.ships = [];
            _this.downPressed = false;
            var animatedSeaContainer = new Phaser.Group(_this.game);
            _this.add(animatedSeaContainer);
            var animatedSea;
            var x = -BattleshipsArmada.GameConstants.GAME_WIDTH / 2;
            var y = -BattleshipsArmada.GameConstants.BOARD_PY - 110;
            for (var i = 0; i < 2; i++) {
                for (var j = 0; j < 4; j++) {
                    animatedSea = new Phaser.Sprite(_this.game, x + 480 * i, y * 1.4 + 480 * j, "texture_atlas_4", "tide_0001.png");
                    animatedSea.scale.set(2);
                    animatedSea.animations.add("waves", Phaser.Animation.generateFrameNames("tide_", 1, 24, ".png", 4));
                    animatedSea.play("waves", 16, true);
                    animatedSeaContainer.add(animatedSea);
                }
            }
            var gradient = new Phaser.Image(_this.game, x, y, "texture_atlas_3", "gradient_sea.png");
            gradient.scale.set(BattleshipsArmada.GameConstants.GAME_WIDTH / 192, (BattleshipsArmada.GameConstants.GAME_HEIGHT / BattleshipsArmada.GameVars.scaleY) / 290);
            animatedSeaContainer.add(gradient);
            _this.grid1 = new Phaser.Image(_this.game, 0, 0, "texture_atlas_3", "grid_quarter.png");
            _this.grid1.anchor.set(1);
            _this.grid1.inputEnabled = true;
            _this.grid1.events.onInputDown.add(_this.onDownBoard, _this);
            _this.grid1.events.onInputUp.add(_this.onUpBoard, _this);
            _this.grid1.events.onInputOver.add(_this.onOverBoard, _this);
            _this.add(_this.grid1);
            _this.grid2 = new Phaser.Image(_this.game, 0, 0, "texture_atlas_3", "grid_quarter.png");
            _this.grid2.scale.set(1, -1);
            _this.grid2.anchor.set(1);
            _this.grid2.inputEnabled = true;
            _this.grid2.events.onInputDown.add(_this.onDownBoard, _this);
            _this.grid2.events.onInputUp.add(_this.onUpBoard, _this);
            _this.grid2.events.onInputOver.add(_this.onOverBoard, _this);
            _this.add(_this.grid2);
            _this.grid3 = new Phaser.Image(_this.game, 0, 0, "texture_atlas_3", "grid_quarter.png");
            _this.grid3.scale.set(-1, 1);
            _this.grid3.anchor.set(1);
            _this.grid3.inputEnabled = true;
            _this.grid3.events.onInputDown.add(_this.onDownBoard, _this);
            _this.grid3.events.onInputUp.add(_this.onUpBoard, _this);
            _this.grid3.events.onInputOver.add(_this.onOverBoard, _this);
            _this.add(_this.grid3);
            _this.grid4 = new Phaser.Image(_this.game, 0, 0, "texture_atlas_3", "grid_quarter.png");
            _this.grid4.scale.set(-1, -1);
            _this.grid4.anchor.set(1);
            _this.grid4.inputEnabled = true;
            _this.grid4.events.onInputDown.add(_this.onDownBoard, _this);
            _this.grid4.events.onInputUp.add(_this.onUpBoard, _this);
            _this.grid4.events.onInputOver.add(_this.onOverBoard, _this);
            _this.add(_this.grid4);
            var coast = new Phaser.Image(_this.game, 0, -_this.grid1.height + 60, "texture_atlas_3", "player_north_coast.png");
            coast.anchor.set(.5, 1);
            _this.add(coast);
            _this.cursorContainer = new Phaser.Group(_this.game);
            _this.add(_this.cursorContainer);
            _this.circle = new Phaser.Image(_this.game, 0, 0, "texture_atlas_1", "sonar_outer_circle.png");
            _this.circle.anchor.set(.5);
            _this.cursorContainer.add(_this.circle);
            _this.circle2 = new Phaser.Image(_this.game, 0, 0, "texture_atlas_1", "sonar_inner_circle.png");
            _this.circle2.anchor.set(.5);
            _this.cursorContainer.add(_this.circle2);
            var horizontalLine = new Phaser.Graphics(_this.game, 0, 0);
            horizontalLine.lineStyle(4, 0xFFFFFF, 1);
            horizontalLine.moveTo(-BattleshipsArmada.GameConstants.GAME_HEIGHT, 0);
            horizontalLine.lineTo(BattleshipsArmada.GameConstants.GAME_HEIGHT, 0);
            _this.cursorContainer.add(horizontalLine);
            var verticalLine = new Phaser.Graphics(_this.game, 0, 0);
            verticalLine.lineStyle(4, 0xFFFFFF, 1);
            verticalLine.moveTo(0, BattleshipsArmada.GameConstants.GAME_HEIGHT);
            verticalLine.lineTo(0, -BattleshipsArmada.GameConstants.GAME_HEIGHT);
            _this.cursorContainer.add(verticalLine);
            if (BattleshipsArmada.GameConstants.SHOW_COORDINATES) {
                _this.addCoordinates();
            }
            _this.textDoubleTap = new Phaser.Text(_this.game, 0, _this.grid3.y + _this.grid3.height - 30, BattleshipsArmada.GameVars.languages[BattleshipsArmada.GameVars.gameData.language]["ROTATE"], { font: "50px American Captain", fill: "#f0faf9", align: "center" });
            _this.textDoubleTap.stroke = "#38536f";
            _this.textDoubleTap.strokeThickness = 10;
            _this.textDoubleTap.anchor.set(.5);
            _this.add(_this.textDoubleTap);
            var tweenShip = _this.game.add.tween(_this.textDoubleTap);
            tweenShip.to({ alpha: .2 }, 500, Phaser.Easing.Linear.None, true, 300);
            tweenShip.onComplete.add(function () {
                tweenShip2.start();
            }, _this);
            var tweenShip2 = _this.game.add.tween(_this.textDoubleTap);
            tweenShip2.to({ alpha: .8 }, 500, Phaser.Easing.Linear.None);
            tweenShip2.onComplete.add(function () {
                tweenShip.start();
            }, _this);
            return _this;
        }
        SetBoard.prototype.update = function () {
            _super.prototype.update.call(this);
            this.circle.angle += 2;
            this.circle2.angle += 5;
            if (this.downPressed) {
                if (BattleshipsArmada.ShipsLayer.onTween) {
                    return;
                }
                var p = this.currentGrid.toLocal(new PIXI.Point(this.game.input.activePointer.x, this.game.input.activePointer.y), null);
                var row = p.y + BattleshipsArmada.GameConstants.GAME_WIDTH / 2;
                var col = p.x + BattleshipsArmada.GameConstants.GAME_WIDTH / 2;
                row = Math.floor(row / (BattleshipsArmada.GameConstants.GAME_WIDTH / 10));
                col = Math.floor(col / (BattleshipsArmada.GameConstants.GAME_WIDTH / 10));
                if (row >= 0 && row <= 10 && col >= 0 && col <= 10) {
                    if (this.currentGrid.scale.y === -1) {
                        row = 5 + (4 - row);
                    }
                    if (this.currentGrid.scale.x === -1) {
                        col = 5 + (4 - col);
                    }
                    BattleshipsArmada.SetBoardManager.currentInstance.moveCurrentShip(row, col);
                    this.previousX = this.game.input.x;
                    this.previousY = this.game.input.y;
                }
            }
        };
        SetBoard.prototype.hideCursor = function () {
            this.cursorContainer.visible = false;
        };
        SetBoard.prototype.addShip = function (ship) {
            this.add(ship);
            this.ships.push(ship);
            var p = BattleshipsArmada.GameVars.getCoordinatesFromRowAndCol(ship.row, ship.col);
            this.cursorContainer.x = p.x;
            this.cursorContainer.y = p.y;
            if (!BattleshipsArmada.GameVars.autodeploying) {
                this.cursorContainer.visible = true;
            }
            this.bringToTop(this.cursorContainer);
        };
        SetBoard.prototype.moveCursor = function (row, col, tTween) {
            var p = BattleshipsArmada.GameVars.getCoordinatesFromRowAndCol(row, col);
            this.game.add.tween(this.cursorContainer)
                .to({ x: p.x, y: p.y }, tTween, Phaser.Easing.Linear.None, true);
            this.bringToTop(this.cursorContainer);
        };
        SetBoard.prototype.bringCursorToTop = function () {
            this.bringToTop(this.cursorContainer);
        };
        SetBoard.prototype.reorderShipsInZ = function () {
            this.ships.sort(function (s1, s2) { return s1.row - s2.row; });
            for (var i = 0; i < this.ships.length; i++) {
                this.add(this.ships[i]);
            }
        };
        SetBoard.prototype.allShipsPositioned = function () {
            this.cursorContainer.destroy();
            this.circle.destroy();
        };
        SetBoard.prototype.addCoordinates = function () {
            var label;
            var squareWidth = BattleshipsArmada.GameConstants.GAME_WIDTH / 10;
            for (var i = 0; i < 10; i++) {
                label = new Phaser.Text(this.game, squareWidth * (i - 4.5), -364, (i + 1).toString(), { font: "24px Arial", fontWeight: "200", fill: "#0000FF", align: "center" });
                label.anchor.set(.5);
                label.alpha = .75;
                this.add(label);
                label = new Phaser.Text(this.game, -364, squareWidth * (i - 4.5), String.fromCharCode(65 + i), { font: "24px Arial", fontWeight: "200", fill: "#0000FF", align: "center" });
                label.anchor.set(.5);
                label.alpha = .5;
                this.add(label);
            }
        };
        SetBoard.prototype.onOverBoard = function (a, pointer) {
            this.currentGrid = a;
        };
        SetBoard.prototype.onUpBoard = function () {
            this.downPressed = false;
        };
        SetBoard.prototype.onDownBoard = function (a, pointer) {
            var time = Date.now();
            var dt = time - this.timeTapped;
            this.timeTapped = time;
            if (dt < 300 && Phaser.Math.fuzzyEqual(this.previousX, this.game.input.activePointer.x, 30) && Phaser.Math.fuzzyEqual(this.previousY, this.game.input.activePointer.y, 30)) {
                BattleshipsArmada.SetBoardManager.currentInstance.rotateCurrentShip();
                this.textDoubleTap.visible = false;
            }
            else {
                this.downPressed = true;
            }
        };
        return SetBoard;
    }(Phaser.Group));
    BattleshipsArmada.SetBoard = SetBoard;
})(BattleshipsArmada || (BattleshipsArmada = {}));
var BattleshipsArmada;
(function (BattleshipsArmada) {
    var SetBoardManager = (function () {
        function SetBoardManager(game) {
            SetBoardManager.currentInstance = this;
            this.game = game;
            BattleshipsArmada.GameVars.indexStartShip = 0;
            BattleshipsArmada.GameVars.startShips = [];
            BattleshipsArmada.GameVars.currentStartShip = null;
        }
        SetBoardManager.prototype.destroy = function () {
            SetBoardManager.currentInstance = null;
        };
        SetBoardManager.prototype.onBackButtonPressed = function () {
            BattleshipsArmada.GameManager.startSplash();
        };
        SetBoardManager.prototype.startSettingShips = function () {
            var nextShip = 7;
            if (BattleshipsArmada.GameVars.playerBoard === null) {
                BattleshipsArmada.GameVars.playerBoard = [];
                for (var row = 0; row < 10; row++) {
                    BattleshipsArmada.GameVars.playerBoard[row] = [];
                    for (var col = 0; col < 10; col++) {
                        BattleshipsArmada.GameVars.playerBoard[row][col] = BattleshipsArmada.GameConstants.WATER;
                    }
                }
            }
            else {
                var array = [5, 4, 3, 2, 1, 0];
                for (var row = 0; row < 10; row++) {
                    for (var col = 0; col < 10; col++) {
                        if (BattleshipsArmada.GameVars.playerBoard[row][col] < nextShip && BattleshipsArmada.GameVars.playerBoard[row][col] > 1) {
                            nextShip = BattleshipsArmada.GameVars.playerBoard[row][col];
                        }
                    }
                }
                this.setShips(array[nextShip - 2]);
            }
            if (nextShip > 2) {
                this.addShip();
            }
            else {
                BattleshipsArmada.SetBoardState.currentInstance.shipsLayer.setBoardWaiting.visible = true;
            }
        };
        SetBoardManager.prototype.setShips = function (nextShip) {
            var board = BattleshipsArmada.GameVars.playerBoard;
            for (var i = 0; i < nextShip; i++) {
                var p = BattleshipsArmada.GameVars.getShipPosition(board, BattleshipsArmada.GameConstants.SHIPS[i]);
                this.addKnownShip(p);
                BattleshipsArmada.SetBoardState.currentInstance.shipPositioned();
            }
        };
        SetBoardManager.prototype.moveCurrentShip = function (row, col) {
            BattleshipsArmada.GameVars.currentStartShip.moveTo(row, col);
        };
        SetBoardManager.prototype.rotateCurrentShip = function () {
            BattleshipsArmada.GameVars.currentStartShip.rotate();
        };
        SetBoardManager.prototype.onClickOK = function () {
            if (BattleshipsArmada.GameVars.currentStartShip.isOnValidPosition) {
                BattleshipsArmada.GameVars.startShips.push(BattleshipsArmada.GameVars.currentStartShip);
                for (var j = 0; j < BattleshipsArmada.GameVars.currentStartShip.gridPoints.length; j++) {
                    var col = BattleshipsArmada.GameVars.currentStartShip.gridPoints[j].col;
                    var row = BattleshipsArmada.GameVars.currentStartShip.gridPoints[j].row;
                    BattleshipsArmada.GameVars.playerBoard[row][col] = BattleshipsArmada.GameVars.currentStartShip.shipType;
                }
                BattleshipsArmada.AudioManager.getInstance().playSound("click");
                BattleshipsArmada.SetBoardState.currentInstance.board.hideCursor();
                BattleshipsArmada.SetBoardState.currentInstance.shipsLayer.hideOk();
                var data = { board: JSON.stringify(BattleshipsArmada.GameVars.playerBoard), lastShipId: BattleshipsArmada.GameVars.currentStartShip.shipType };
                BattleshipsArmada.GameVars.currentStartShip.setFinalPosition();
            }
            else {
                BattleshipsArmada.AudioManager.getInstance().playSound("error_click");
            }
        };
        SetBoardManager.prototype.nextPosition = function () {
            if (BattleshipsArmada.GameVars.autodeploying) {
                return;
            }
            if (BattleshipsArmada.GameVars.indexStartShip === BattleshipsArmada.GameConstants.SHIPS.length) {
                this.allShipsPositioned();
            }
            else {
                BattleshipsArmada.SetBoardState.currentInstance.shipPositioned();
                this.addShip();
            }
        };
        SetBoardManager.prototype.checkPositionCurrentShip = function () {
            var ret = true;
            var currentShipGridPoints = BattleshipsArmada.GameVars.currentStartShip.gridPoints;
            for (var i = 0; i < BattleshipsArmada.GameVars.startShips.length; i++) {
                var shipGridPoints = BattleshipsArmada.GameVars.startShips[i].gridPoints;
                for (var j = 0; j < currentShipGridPoints.length; j++) {
                    var currentShipCol = currentShipGridPoints[j].col;
                    var currentShipRow = currentShipGridPoints[j].row;
                    for (var k = 0; k < shipGridPoints.length; k++) {
                        if (currentShipCol === shipGridPoints[k].col && currentShipRow === shipGridPoints[k].row) {
                            ret = false;
                            break;
                        }
                    }
                    if (!ret) {
                        break;
                    }
                }
                if (!ret) {
                    break;
                }
            }
            return ret;
        };
        SetBoardManager.prototype.addKnownShip = function (p) {
            BattleshipsArmada.GameVars.currentStartShip = new BattleshipsArmada.StartShip(this.game, BattleshipsArmada.GameConstants.SHIPS[BattleshipsArmada.GameVars.indexStartShip]);
            BattleshipsArmada.GameVars.indexStartShip++;
            BattleshipsArmada.GameVars.currentStartShip.setKnownPosition(p.row, p.col, p.angle);
            var board = BattleshipsArmada.SetBoardState.currentInstance.board;
            board.addShip(BattleshipsArmada.GameVars.currentStartShip);
            BattleshipsArmada.GameVars.startShips.push(BattleshipsArmada.GameVars.currentStartShip);
        };
        SetBoardManager.prototype.canStartBattle = function () {
            BattleshipsArmada.SetBoardState.currentInstance.shipsLayer.shipPositioned();
        };
        SetBoardManager.prototype.startBattle = function () {
            BattleshipsArmada.GameVars.currentScene = BattleshipsArmada.GameConstants.BATTLE_SCENE;
            BattleshipsArmada.SetBoardState.currentInstance.allShipsPositioned();
        };
        SetBoardManager.prototype.startCountdown = function (data) {
            BattleshipsArmada.SetBoardState.currentInstance.board.hideCursor();
            BattleshipsArmada.SetBoardState.currentInstance.shipsLayer.hideOk();
            if (!BattleshipsArmada.SetBoardState.currentInstance.shipsLayer.setBoardWaiting.visible) {
                BattleshipsArmada.SetBoardState.currentInstance.shipsLayer.countdown(3);
            }
            this.game.time.events.add(Phaser.Timer.SECOND, function () {
                if (!BattleshipsArmada.SetBoardState.currentInstance.shipsLayer.setBoardWaiting.visible) {
                    BattleshipsArmada.SetBoardState.currentInstance.shipsLayer.countdown(2);
                }
            }, this);
            this.game.time.events.add(2 * Phaser.Timer.SECOND, function () {
                if (!BattleshipsArmada.SetBoardState.currentInstance.shipsLayer.setBoardWaiting.visible) {
                    BattleshipsArmada.SetBoardState.currentInstance.shipsLayer.countdown(1);
                }
            }, this);
            this.game.time.events.add(3 * Phaser.Timer.SECOND, function () {
                if (!BattleshipsArmada.SetBoardState.currentInstance.shipsLayer.setBoardWaiting.visible) {
                    BattleshipsArmada.SetBoardState.currentInstance.shipsLayer.countdown(0);
                }
                this.setRandom(data);
            }, this);
        };
        SetBoardManager.prototype.setRandom = function (data) {
            BattleshipsArmada.SetBoardState.currentInstance.board.hideCursor();
            BattleshipsArmada.SetBoardState.currentInstance.shipsLayer.hideOk();
            if (data.idA === BattleshipsArmada.GameVars.playerData.id) {
                BattleshipsArmada.GameVars.playerBoard = JSON.parse(data.boardA);
                BattleshipsArmada.GameVars.adversaryBoard = JSON.parse(data.boardB);
            }
            else {
                BattleshipsArmada.GameVars.playerBoard = JSON.parse(data.boardB);
                BattleshipsArmada.GameVars.adversaryBoard = JSON.parse(data.boardA);
            }
            SetBoardManager.currentInstance.startBattle();
        };
        SetBoardManager.prototype.addShip = function () {
            if ((BattleshipsArmada.GameVars.currentStartShip && !BattleshipsArmada.GameVars.currentStartShip.isOnValidPosition) || BattleshipsArmada.GameVars.indexStartShip >= 5) {
                return;
            }
            BattleshipsArmada.GameVars.currentStartShip = new BattleshipsArmada.StartShip(this.game, BattleshipsArmada.GameConstants.SHIPS[BattleshipsArmada.GameVars.indexStartShip]);
            BattleshipsArmada.GameVars.indexStartShip++;
            var col;
            var row;
            if (BattleshipsArmada.GameVars.indexStartShip === 1) {
                row = 4;
                col = 5;
            }
            else {
                row = Math.floor(Math.random() * 10);
                col = Math.floor(Math.random() * 10);
            }
            BattleshipsArmada.GameVars.currentStartShip.setInitialPosition(row, col);
            while (!this.checkPositionCurrentShip()) {
                col = Math.floor(Math.random() * 10);
                row = Math.floor(Math.random() * 10);
                BattleshipsArmada.GameVars.currentStartShip.setInitialPosition(col, row);
            }
            BattleshipsArmada.GameVars.currentStartShip.show();
            var board = BattleshipsArmada.SetBoardState.currentInstance.board;
            board.addShip(BattleshipsArmada.GameVars.currentStartShip);
        };
        SetBoardManager.prototype.allShipsPositioned = function () {
            SetBoardManager.currentInstance.startBattle();
        };
        return SetBoardManager;
    }());
    BattleshipsArmada.SetBoardManager = SetBoardManager;
})(BattleshipsArmada || (BattleshipsArmada = {}));
var BattleshipsArmada;
(function (BattleshipsArmada) {
    var SetBoardState = (function (_super) {
        __extends(SetBoardState, _super);
        function SetBoardState() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SetBoardState.prototype.init = function () {
            SetBoardState.currentInstance = this;
            this.setBoardManager = new BattleshipsArmada.SetBoardManager(this.game);
            BattleshipsArmada.GameVars.currentScene = BattleshipsArmada.GameConstants.SET_BOARD_SCENE;
        };
        SetBoardState.prototype.create = function () {
            this.board = new BattleshipsArmada.SetBoard(this.game);
            this.add.existing(this.board);
            this.shipsLayer = new BattleshipsArmada.ShipsLayer(this.game);
            this.add.existing(this.shipsLayer);
            this.setBoardManager.startSettingShips();
            this.game.camera.flash(0x000000, BattleshipsArmada.GameConstants.TIME_FADE, false);
        };
        SetBoardState.prototype.shutdown = function () {
            SetBoardState.currentInstance = null;
            this.setBoardManager.destroy();
            _super.prototype.shutdown.call(this);
        };
        SetBoardState.prototype.shipPositioned = function () {
            this.shipsLayer.shipPositioned();
        };
        SetBoardState.prototype.allShipsPositioned = function () {
            this.board.allShipsPositioned();
            this.shipsLayer.allShipsPositioned();
        };
        SetBoardState.prototype.changeScene = function () {
            this.game.state.start("BattleState", true, false);
        };
        return SetBoardState;
    }(Phaser.State));
    BattleshipsArmada.SetBoardState = SetBoardState;
})(BattleshipsArmada || (BattleshipsArmada = {}));
var BattleshipsArmada;
(function (BattleshipsArmada) {
    var SetBoardWaiting = (function (_super) {
        __extends(SetBoardWaiting, _super);
        function SetBoardWaiting(game) {
            var _this = _super.call(this, game, null, "waiting-layer") || this;
            _this.visible = false;
            var darkLayer = _this.create(0, 0, _this.game.cache.getBitmapData(BattleshipsArmada.GameConstants.DARK_BLUE_SQUARE));
            darkLayer.alpha = .8;
            darkLayer.inputEnabled = true;
            darkLayer.events.onInputDown.add(_this.onClickDarkLayer, _this);
            darkLayer.scale.set(BattleshipsArmada.GameConstants.GAME_WIDTH / BattleshipsArmada.GameConstants.BITMAP_SIZE, BattleshipsArmada.GameConstants.GAME_HEIGHT / BattleshipsArmada.GameConstants.BITMAP_SIZE);
            var waitingContainer = new Phaser.Group(_this.game);
            waitingContainer.x = BattleshipsArmada.GameConstants.GAME_WIDTH / 2;
            waitingContainer.y = BattleshipsArmada.GameConstants.GAME_HEIGHT / 2;
            waitingContainer.scale.y = BattleshipsArmada.GameVars.scaleY;
            _this.add(waitingContainer);
            var box = new Phaser.Image(_this.game, 0, 0, "texture_atlas_1", "box.png");
            box.anchor.set(.5);
            waitingContainer.add(box);
            var sonarBg = new Phaser.Image(_this.game, 0, 0, "texture_atlas_1", "sonar_bg.png");
            sonarBg.anchor.set(.5);
            sonarBg.scale.set(2);
            waitingContainer.add(sonarBg);
            var avatar = new Phaser.Image(_this.game, 0, 0, "adversary-avatar");
            avatar.anchor.set(.5);
            avatar.scale.set(100 / avatar.width);
            var mask = new Phaser.Graphics(_this.game);
            mask.beginFill();
            mask.drawCircle(0, 0, avatar.width);
            mask.endFill();
            waitingContainer.add(mask);
            var avatar_ext = new Phaser.Graphics(_this.game);
            avatar_ext.beginFill(0xFFFFFF, 1);
            avatar_ext.drawCircle(0, 0, avatar.width * 1.1);
            avatar_ext.endFill();
            waitingContainer.add(avatar_ext);
            avatar.mask = mask;
            waitingContainer.add(avatar);
            var waiting = new Phaser.Text(_this.game, 0, -85, " WAITING FOR ", { font: "50px American Captain", fill: "#f0faf9", align: "center" });
            waiting.anchor.set(.5);
            waiting.stroke = "#38536f";
            waiting.strokeThickness = 10;
            waitingContainer.add(waiting);
            var adversary_name = new Phaser.Text(_this.game, 0, 90, BattleshipsArmada.GameVars.validName(""), { font: "50px American Captain", fill: "#f92c57", align: "center" });
            adversary_name.anchor.set(.5);
            waitingContainer.add(adversary_name);
            _this.timeLabel = new Phaser.Text(_this.game, 0, 165, " 60 ", { font: "70px American Captain", fill: "#f0faf9", align: "center" });
            _this.timeLabel.anchor.set(.5);
            _this.timeLabel.stroke = "#38536f";
            _this.timeLabel.strokeThickness = 10;
            waitingContainer.add(_this.timeLabel);
            _this.game.time.events.loop(50, _this.updateCounter, _this);
            return _this;
        }
        SetBoardWaiting.prototype.updateCounter = function () {
            this.time = (Date.now() - BattleshipsArmada.GameVars.timeSet) / 1000;
            if (this.time > 60) {
                this.time = 60;
            }
            this.timeLabel.text = " " + Math.round(60 - this.time) + " ";
        };
        SetBoardWaiting.prototype.onClickDarkLayer = function () {
        };
        return SetBoardWaiting;
    }(Phaser.Group));
    BattleshipsArmada.SetBoardWaiting = SetBoardWaiting;
})(BattleshipsArmada || (BattleshipsArmada = {}));
var BattleshipsArmada;
(function (BattleshipsArmada) {
    var StartShip = (function (_super) {
        __extends(StartShip, _super);
        function StartShip(game, shipType) {
            var _this = _super.call(this, game, null, "start-ship") || this;
            _this.gridPoints = [];
            _this.shipType = shipType;
            _this.moving = false;
            _this.rotating = false;
            _this.movingAnchorPoint = false;
            _this.isOnValidPosition = true;
            _this.alpha = 0;
            switch (_this.shipType) {
                case BattleshipsArmada.GameConstants.SHIP_DESTROYER:
                    _this.shipImageHorizontal = new Phaser.Image(_this.game, 0, 0, "texture_atlas_1", "blue_ship_2_h.png");
                    _this.shipImageHorizontal.anchor.set(.25, .5);
                    _this.shipImageVertical = new Phaser.Image(_this.game, 0, 0, "texture_atlas_1", "blue_ship_2_v.png");
                    _this.shipImageVertical.anchor.set(.25, .5);
                    _this.extremes = { stern: 0, bow: 1 };
                    break;
                case BattleshipsArmada.GameConstants.SHIP_CRUISER:
                    _this.shipImageHorizontal = new Phaser.Image(_this.game, 0, 0, "texture_atlas_1", "blue_ship_3_h.png");
                    _this.shipImageHorizontal.anchor.set(.5);
                    _this.shipImageVertical = new Phaser.Image(_this.game, 0, 0, "texture_atlas_1", "blue_ship_3_v.png");
                    _this.shipImageVertical.anchor.set(.5);
                    _this.extremes = { stern: 1, bow: 1 };
                    break;
                case BattleshipsArmada.GameConstants.SHIP_SUBMARINE:
                    _this.shipImageHorizontal = new Phaser.Image(_this.game, 0, 0, "texture_atlas_1", "blue_ship_3_h.png");
                    _this.shipImageHorizontal.anchor.set(.5);
                    _this.shipImageVertical = new Phaser.Image(_this.game, 0, 0, "texture_atlas_1", "blue_ship_3_v.png");
                    _this.shipImageVertical.anchor.set(.5);
                    _this.extremes = { stern: 1, bow: 1 };
                    break;
                case BattleshipsArmada.GameConstants.SHIP_BATTLESHIP:
                    _this.shipImageHorizontal = new Phaser.Image(_this.game, 0, 0, "texture_atlas_1", "blue_ship_4_h.png");
                    _this.shipImageHorizontal.anchor.set(.375, .62);
                    _this.shipImageVertical = new Phaser.Image(_this.game, 0, 0, "texture_atlas_1", "blue_ship_4_v.png");
                    _this.shipImageVertical.anchor.set(.375, .5);
                    _this.extremes = { stern: 1, bow: 2 };
                    break;
                case BattleshipsArmada.GameConstants.SHIP_CARRIER:
                    _this.shipImageHorizontal = new Phaser.Image(_this.game, 0, 0, "texture_atlas_1", "blue_ship_5_h.png");
                    _this.shipImageHorizontal.anchor.set(.5, .6);
                    _this.shipImageVertical = new Phaser.Image(_this.game, 0, 0, "texture_atlas_1", "blue_ship_5_v.png");
                    _this.shipImageVertical.anchor.set(.5);
                    _this.extremes = { stern: 2, bow: 2 };
                    break;
                default:
                    break;
            }
            _this.add(_this.shipImageHorizontal);
            _this.add(_this.shipImageVertical);
            return _this;
        }
        StartShip.prototype.setFinalPosition = function () {
            this.game.add.tween(this.shipImageHorizontal.scale)
                .to({ x: 1, y: 1 }, 200, Phaser.Easing.Cubic.Out, true);
            this.game.add.tween(this.shipImageVertical.scale)
                .to({ x: 1, y: 1 }, 200, Phaser.Easing.Cubic.Out, true)
                .onComplete.add(function () {
                this.game.time.events.add(500, function () {
                    BattleshipsArmada.SetBoardManager.currentInstance.nextPosition();
                });
            }, this);
        };
        StartShip.prototype.show = function () {
            this.game.add.tween(this)
                .to({ alpha: 1 }, 500, Phaser.Easing.Cubic.Out, true);
            BattleshipsArmada.SetBoardState.currentInstance.shipsLayer.showOk();
        };
        StartShip.prototype.setInitialPosition = function (row, col) {
            this.shipImageHorizontal.scale.set(1.1);
            this.shipImageVertical.scale.set(1.1);
            var angle = BattleshipsArmada.GameVars.indexStartShip % 2 === 0 ? 90 : 0;
            this.shipImageHorizontal.angle = angle;
            this.shipImageVertical.angle = angle;
            var pos = this.checkColAndRow(row, col, angle);
            this.row = pos.row;
            this.col = pos.col;
            var coor = BattleshipsArmada.GameVars.getCoordinatesFromRowAndCol(this.row, this.col);
            this.shipImageHorizontal.position.set(coor.x, coor.y);
            this.shipImageVertical.position.set(coor.x, coor.y);
            this.positionSet(angle);
        };
        StartShip.prototype.setKnownPosition = function (row, col, angle) {
            this.shipImageHorizontal.angle = angle;
            this.shipImageVertical.angle = angle;
            var pos = this.checkColAndRow(row, col, angle);
            this.row = pos.row;
            this.col = pos.col;
            var coor = BattleshipsArmada.GameVars.getCoordinatesFromRowAndCol(this.row, this.col);
            this.shipImageHorizontal.position.set(coor.x, coor.y);
            this.shipImageVertical.position.set(coor.x, coor.y);
            this.positionSet(angle);
            this.alpha = 1;
        };
        StartShip.prototype.moveTo = function (row, col) {
            if (this.moving || this.rotating) {
                return;
            }
            var posShip = this.checkColAndRow(row, col, this.shipImageHorizontal.angle);
            var tTween = 100;
            var d = Math.abs(this.col - posShip.col) + Math.abs(this.row - posShip.row);
            if (d > 8) {
                tTween = 200;
            }
            this.col = posShip.col;
            this.row = posShip.row;
            var coordinatesShip = BattleshipsArmada.GameVars.getCoordinatesFromRowAndCol(this.row, this.col);
            this.moving = true;
            this.movementTween2 = this.game.add.tween(this.shipImageHorizontal)
                .to({ x: coordinatesShip.x, y: coordinatesShip.y }, tTween, Phaser.Easing.Linear.None, true);
            this.movementTween = this.game.add.tween(this.shipImageVertical)
                .to({ x: coordinatesShip.x, y: coordinatesShip.y }, tTween, Phaser.Easing.Linear.None, true);
            this.movementTween.onComplete.add(function () {
                this.positionSet(this.shipImageHorizontal.angle);
            }, this);
            BattleshipsArmada.SetBoardState.currentInstance.board.bringToTop(this);
            this.cursorRow = row;
            this.cursorCol = col;
            BattleshipsArmada.SetBoardState.currentInstance.board.moveCursor(this.cursorRow, this.cursorCol, tTween);
        };
        StartShip.prototype.rotate = function () {
            if (this.rotating) {
                return;
            }
            this.rotating = true;
            var angle = this.shipImageHorizontal.angle === 0 ? 90 : 0;
            var tTween = 300;
            var posShip = this.checkColAndRow(this.cursorRow, this.cursorCol, angle);
            if (this.movementTween) {
                this.movementTween.pendingDelete = true;
                this.movementTween2.pendingDelete = true;
            }
            var d = Math.abs(this.col - posShip.col) + Math.abs(this.row - posShip.row);
            if (d > 8) {
                tTween = 600;
            }
            this.col = posShip.col;
            this.row = posShip.row;
            var coordinatesShip = BattleshipsArmada.GameVars.getCoordinatesFromRowAndCol(this.row, this.col);
            this.game.add.tween(this.shipImageHorizontal)
                .to({ x: coordinatesShip.x, y: coordinatesShip.y }, tTween, Phaser.Easing.Cubic.Out, true);
            this.game.add.tween(this.shipImageVertical)
                .to({ x: coordinatesShip.x, y: coordinatesShip.y }, tTween, Phaser.Easing.Cubic.Out, true);
            this.game.add.tween(this.shipImageVertical)
                .to({ angle: angle }, tTween, Phaser.Easing.Cubic.Out, true);
            this.game.add.tween(this.shipImageHorizontal)
                .to({ angle: angle }, tTween, Phaser.Easing.Cubic.Out, true)
                .onComplete.add(function () {
                this.rotating = false;
                this.positionSet(angle);
            }, this);
            BattleshipsArmada.SetBoardState.currentInstance.board.bringToTop(this);
            BattleshipsArmada.SetBoardState.currentInstance.board.bringCursorToTop();
            if (angle === 0) {
                this.game.add.tween(this.shipImageHorizontal)
                    .to({ alpha: 1 }, tTween, Phaser.Easing.Cubic.Out, true);
                this.game.add.tween(this.shipImageVertical)
                    .to({ alpha: 0 }, tTween, Phaser.Easing.Cubic.Out, true);
            }
            else {
                this.game.add.tween(this.shipImageHorizontal)
                    .to({ alpha: 0 }, tTween, Phaser.Easing.Cubic.Out, true);
                this.game.add.tween(this.shipImageVertical)
                    .to({ alpha: 1 }, tTween, Phaser.Easing.Cubic.Out, true);
            }
        };
        StartShip.prototype.checkColAndRow = function (row, col, angle) {
            if (angle === 0) {
                var cBow = col + this.extremes.bow;
                var cStern = col - this.extremes.stern;
                if (cBow > 9) {
                    col -= cBow - 9;
                }
                if (cStern < 0) {
                    col -= cStern;
                }
            }
            else {
                var rBow = row + this.extremes.bow;
                var rStern = row - this.extremes.stern;
                if (rBow > 9) {
                    row -= rBow - 9;
                }
                if (rStern < 0) {
                    row -= rStern;
                }
            }
            return { row: row, col: col };
        };
        StartShip.prototype.positionSet = function (angle) {
            this.moving = false;
            this.gridPoints.length = 0;
            var length = this.extremes.stern + this.extremes.bow + 1;
            if (angle === 0) {
                var col = this.col - this.extremes.stern;
                for (var i = 0; i < length; i++) {
                    this.gridPoints.push({ col: col + i, row: this.row });
                }
            }
            else {
                var row = this.row - this.extremes.stern;
                for (var i = 0; i < length; i++) {
                    this.gridPoints.push({ col: this.col, row: row + i });
                }
            }
            this.isOnValidPosition = BattleshipsArmada.SetBoardManager.currentInstance.checkPositionCurrentShip();
            if (this.isOnValidPosition) {
                if (angle === 0) {
                    this.shipImageHorizontal.tint = 0xFFFFFF;
                    this.shipImageHorizontal.alpha = 1;
                    this.shipImageVertical.alpha = 0;
                }
                else {
                    this.shipImageHorizontal.alpha = 0;
                    this.shipImageVertical.tint = 0xFFFFFF;
                    this.shipImageVertical.alpha = 1;
                }
            }
            else {
                if (angle === 0) {
                    this.shipImageHorizontal.tint = 0xFF0000;
                    this.shipImageHorizontal.alpha = .7;
                    this.shipImageVertical.alpha = 0;
                }
                else {
                    this.shipImageHorizontal.alpha = 0;
                    this.shipImageVertical.tint = 0xFF0000;
                    this.shipImageVertical.alpha = .7;
                }
            }
            BattleshipsArmada.SetBoardState.currentInstance.board.reorderShipsInZ();
        };
        return StartShip;
    }(Phaser.Group));
    BattleshipsArmada.StartShip = StartShip;
})(BattleshipsArmada || (BattleshipsArmada = {}));
var BattleshipsArmada;
(function (BattleshipsArmada) {
    var ShipIconsContainer = (function (_super) {
        __extends(ShipIconsContainer, _super);
        function ShipIconsContainer(game, y) {
            var _this = _super.call(this, game, null, "start-ships-container") || this;
            _this.scale.y = BattleshipsArmada.GameVars.scaleY;
            _this.y = y + 33 * BattleshipsArmada.GameVars.scaleY;
            _this.shipIcons = [];
            var shipIcon = new Phaser.Image(_this.game, 20, 0, "texture_atlas_1", "silouette_5x.png");
            shipIcon.alpha = .5;
            shipIcon.anchor.y = 1;
            _this.add(shipIcon);
            _this.shipIcons.push(shipIcon);
            shipIcon = new Phaser.Image(_this.game, 228, 0, "texture_atlas_1", "silouette_4x.png");
            shipIcon.anchor.y = 1;
            _this.add(shipIcon);
            _this.shipIcons.push(shipIcon);
            shipIcon = new Phaser.Image(_this.game, 400, 0, "texture_atlas_1", "silouette_3x.png");
            shipIcon.anchor.y = 1;
            _this.add(shipIcon);
            _this.shipIcons.push(shipIcon);
            shipIcon = new Phaser.Image(_this.game, 534, 0, "texture_atlas_1", "silouette_3x.png");
            shipIcon.anchor.y = 1;
            _this.add(shipIcon);
            _this.shipIcons.push(shipIcon);
            shipIcon = new Phaser.Image(_this.game, 665, 0, "texture_atlas_1", "silouette_2x.png");
            shipIcon.anchor.y = 1;
            _this.add(shipIcon);
            _this.shipIcons.push(shipIcon);
            _this.shipPositioned();
            return _this;
        }
        ShipIconsContainer.prototype.shipPositioned = function () {
            if (this.tweenShip) {
                this.tweenShip.stop();
                this.tweenShip2.stop();
            }
            if (this.shipIcons[BattleshipsArmada.GameVars.indexStartShip - 1]) {
                this.shipIcons[BattleshipsArmada.GameVars.indexStartShip - 1].alpha = .4;
            }
            if (this.shipIcons[BattleshipsArmada.GameVars.indexStartShip]) {
                this.tweenShip = this.game.add.tween(this.shipIcons[BattleshipsArmada.GameVars.indexStartShip]);
                this.tweenShip.to({ alpha: .4 }, 400, Phaser.Easing.Linear.None, true);
                this.tweenShip.onComplete.add(function () {
                    this.tweenShip2.start();
                }, this);
                this.tweenShip2 = this.game.add.tween(this.shipIcons[BattleshipsArmada.GameVars.indexStartShip]);
                this.tweenShip2.to({ alpha: 1 }, 400, Phaser.Easing.Linear.None);
                this.tweenShip2.onComplete.add(function () {
                    this.tweenShip.start();
                }, this);
            }
        };
        ShipIconsContainer.prototype.allShipsPositioned = function () {
            if (this.tweenShip) {
                this.tweenShip.stop();
                this.tweenShip2.stop();
            }
            for (var i = 0; i < this.shipIcons.length; i++) {
                this.shipIcons[i].alpha = .4;
            }
        };
        return ShipIconsContainer;
    }(Phaser.Group));
    BattleshipsArmada.ShipIconsContainer = ShipIconsContainer;
})(BattleshipsArmada || (BattleshipsArmada = {}));
var BattleshipsArmada;
(function (BattleshipsArmada) {
    var ShipsLayer = (function (_super) {
        __extends(ShipsLayer, _super);
        function ShipsLayer(game) {
            var _this = _super.call(this, game, null, "shipsLayer") || this;
            var menuTabTop = new Phaser.Image(_this.game, 0, 0, _this.game.cache.getBitmapData(BattleshipsArmada.GameConstants.DARK_BLUE_SQUARE));
            menuTabTop.scale.set(BattleshipsArmada.GameConstants.GAME_WIDTH / BattleshipsArmada.GameConstants.BITMAP_SIZE, (((BattleshipsArmada.GameConstants.GAME_HEIGHT / 2) - (373 * BattleshipsArmada.GameVars.scaleY)) - 10) / BattleshipsArmada.GameConstants.BITMAP_SIZE);
            _this.add(menuTabTop);
            _this.timeLabel = new Phaser.Image(_this.game, BattleshipsArmada.GameConstants.GAME_WIDTH, menuTabTop.height, _this.game.cache.getBitmapData(BattleshipsArmada.GameConstants.WHITE_SQUARE));
            _this.timeLabel.anchor.set(1);
            _this.timeLabel.scale.set(BattleshipsArmada.GameConstants.GAME_WIDTH / BattleshipsArmada.GameConstants.BITMAP_SIZE, (10 * BattleshipsArmada.GameVars.scaleY) / BattleshipsArmada.GameConstants.BITMAP_SIZE);
            _this.add(_this.timeLabel);
            _this.time = (Date.now() - BattleshipsArmada.GameVars.timeSet) / 1000;
            _this.timeLabel.visible = false;
            _this.containerTop = new Phaser.Group(_this.game);
            _this.containerTop.x = BattleshipsArmada.GameConstants.GAME_WIDTH / 2;
            _this.containerTop.y = (BattleshipsArmada.GameConstants.GAME_HEIGHT / 2) - (373 * BattleshipsArmada.GameVars.scaleY) - 100 / BattleshipsArmada.GameVars.scaleY;
            _this.add(_this.containerTop);
            var addedScale = _this.game.scale.aspectRatio >= .5625 ? BattleshipsArmada.GameVars.scaleY : 1;
            _this.curtainTop = new Phaser.Image(_this.game, 0, 0, "texture_atlas_1", "curtain.png");
            _this.curtainTop.anchor.set(.5, 1);
            _this.curtainTop.scale.set(2, 2 * addedScale);
            _this.containerTop.add(_this.curtainTop);
            _this.textTop = new Phaser.Image(_this.game, 0, 0, "texture_atlas_5_" + BattleshipsArmada.GameVars.gameData.language, "your_turn_up.png");
            _this.textTop.scale.y = BattleshipsArmada.GameVars.scaleY;
            _this.textTop.anchor.set(.5, 1);
            _this.textTop.visible = false;
            _this.containerTop.add(_this.textTop);
            var menuTabBottom = new Phaser.Image(_this.game, 0, BattleshipsArmada.GameConstants.GAME_HEIGHT, _this.game.cache.getBitmapData(BattleshipsArmada.GameConstants.DARK_BLUE_SQUARE));
            menuTabBottom.anchor.y = 1;
            menuTabBottom.scale.set(BattleshipsArmada.GameConstants.GAME_WIDTH / BattleshipsArmada.GameConstants.BITMAP_SIZE, (((BattleshipsArmada.GameConstants.GAME_HEIGHT / 2) - (373 * BattleshipsArmada.GameVars.scaleY)) - 10) / BattleshipsArmada.GameConstants.BITMAP_SIZE);
            _this.add(menuTabBottom);
            _this.containerBottom = new Phaser.Group(_this.game);
            _this.containerBottom.x = BattleshipsArmada.GameConstants.GAME_WIDTH / 2;
            _this.containerBottom.y = (BattleshipsArmada.GameConstants.GAME_HEIGHT / 2) + (373 * BattleshipsArmada.GameVars.scaleY) + 103 / BattleshipsArmada.GameVars.scaleY;
            _this.add(_this.containerBottom);
            _this.curtainBottom = new Phaser.Image(_this.game, 0, 0, "texture_atlas_1", "curtain.png");
            _this.curtainBottom.anchor.set(.5, 1);
            _this.curtainBottom.scale.set(2, -2 * addedScale);
            _this.containerBottom.add(_this.curtainBottom);
            _this.textBottom = new Phaser.Image(_this.game, 0, 0, "texture_atlas_5_" + BattleshipsArmada.GameVars.gameData.language, "your_turn_down.png");
            _this.textBottom.scale.y = BattleshipsArmada.GameVars.scaleY;
            _this.textBottom.anchor.set(.5, 0);
            _this.textBottom.visible = false;
            _this.containerBottom.add(_this.textBottom);
            _this.messageLabel = new Phaser.Image(_this.game, 20, _this.containerTop.y + (menuTabTop.height - _this.containerTop.y) / 2 + 10 * BattleshipsArmada.GameVars.scaleY, "texture_atlas_5_" + BattleshipsArmada.GameVars.gameData.language, "text_deploy.png");
            _this.messageLabel.anchor.y = .5;
            _this.messageLabel.scale.y = BattleshipsArmada.GameVars.scaleY;
            _this.messageLabel.width = Math.min(545, _this.messageLabel.width);
            _this.add(_this.messageLabel);
            _this.messageLabel2 = new Phaser.Image(_this.game, 20, _this.containerTop.y + (menuTabTop.height - _this.containerTop.y) / 2 + 10 * BattleshipsArmada.GameVars.scaleY, "texture_atlas_5_" + BattleshipsArmada.GameVars.gameData.language, "text_deploy.png");
            _this.messageLabel2.anchor.y = .5;
            _this.messageLabel2.scale.y = BattleshipsArmada.GameVars.scaleY;
            _this.messageLabel2.visible = false;
            _this.messageLabel2.width = Math.min(545, _this.messageLabel.width);
            _this.add(_this.messageLabel2);
            _this.okButton = new Phaser.Button(_this.game, BattleshipsArmada.GameConstants.GAME_WIDTH - 150, _this.containerTop.y + (menuTabTop.height - _this.containerTop.y) / 2, "texture_atlas_1", _this.onClickOK, _this);
            _this.okButton.setFrames("btn_accept_on.png", "btn_accept.png", "btn_accept_on.png");
            _this.okButton.scale.set(.8, .8 * BattleshipsArmada.GameVars.scaleY);
            _this.okButton.anchor.set(.5);
            _this.okButton.forceOut = true;
            _this.add(_this.okButton);
            _this.autodeployButton = new Phaser.Button(_this.game, BattleshipsArmada.GameConstants.GAME_WIDTH - 50, _this.containerTop.y + (menuTabTop.height - _this.containerTop.y) / 2, "texture_atlas_5_" + BattleshipsArmada.GameVars.gameData.language, _this.onClickAutodeploy, _this);
            _this.autodeployButton.setFrames("btn_autodeploy_on.png", "btn_autodeploy.png", "btn_autodeploy_on.png");
            _this.autodeployButton.scale.set(.8, .8 * BattleshipsArmada.GameVars.scaleY);
            _this.autodeployButton.anchor.set(.5);
            _this.autodeployButton.forceOut = true;
            _this.add(_this.autodeployButton);
            _this.shipIconsContainer = new BattleshipsArmada.ShipIconsContainer(_this.game, _this.containerBottom.y);
            _this.add(_this.shipIconsContainer);
            return _this;
        }
        ShipsLayer.prototype.updateCounter = function () {
            this.time = (Date.now() - BattleshipsArmada.GameVars.timeSet) / 1000;
            if (this.time < ShipsLayer.maxTime) {
                this.timeLabel.scale.x = (BattleshipsArmada.GameConstants.GAME_WIDTH - ((this.time / ShipsLayer.maxTime) * BattleshipsArmada.GameConstants.GAME_WIDTH)) / BattleshipsArmada.GameConstants.BITMAP_SIZE;
            }
        };
        ShipsLayer.prototype.countdown = function (value) {
            if (value === 1) {
                this.messageLabel2.frameName = "autodeploy_1.png";
            }
            else if (value === 2) {
                this.messageLabel2.frameName = "autodeploy_2.png";
            }
            else if (value === 3) {
                this.messageLabel.frameName = "autodeploy.png";
                this.messageLabel2.visible = true;
                this.messageLabel2.frameName = "autodeploy_3.png";
            }
            else if (value === 0) {
                this.messageLabel.visible = false;
                this.messageLabel2.visible = false;
            }
        };
        ShipsLayer.prototype.shipPositioned = function () {
            this.shipIconsContainer.shipPositioned();
        };
        ShipsLayer.prototype.allShipsPositioned = function () {
            if (BattleshipsArmada.GameVars.currentTurn === BattleshipsArmada.GameConstants.PLAYER) {
                this.textTop.frameName = "your_turn_up.png";
                this.textBottom.frameName = "your_turn_down.png";
            }
            else {
                this.textTop.frameName = "rivals_turn_up.png";
                this.textBottom.frameName = "rivals_turn_down.png";
            }
            this.shipIconsContainer.allShipsPositioned();
            this.game.time.events.add(500, function () {
                BattleshipsArmada.AudioManager.getInstance().playSound("metal_gate_close");
            }, this);
            var tween = this.game.add.tween(this.containerTop)
                .to({ y: BattleshipsArmada.GameConstants.GAME_HEIGHT / 2 }, 500, Phaser.Easing.Bounce.Out, true, 500);
            tween.onComplete.add(function () {
                BattleshipsArmada.SetBoardState.currentInstance.changeScene();
            }, this);
            tween.onStart.add(function () {
                this.bringToTop(this.containerTop);
                this.bringToTop(this.containerBottom);
                this.textTop.visible = true;
                this.textBottom.visible = true;
            }, this);
            this.game.add.tween(this.containerBottom)
                .to({ y: BattleshipsArmada.GameConstants.GAME_HEIGHT / 2 }, 500, Phaser.Easing.Bounce.Out, true, 500);
        };
        ShipsLayer.prototype.startGame = function () {
        };
        ShipsLayer.prototype.showOk = function () {
            if (BattleshipsArmada.GameVars.autodeploying) {
                return;
            }
            this.game.add.tween(this.okButton.scale)
                .to({ x: .8, y: .8 * BattleshipsArmada.GameVars.scaleY }, 400, Phaser.Easing.Elastic.Out, true)
                .onComplete.add(function () {
                ShipsLayer.onTween = false;
            }, this);
            this.autodeployButton.inputEnabled = true;
        };
        ShipsLayer.prototype.hideOk = function () {
            ShipsLayer.onTween = true;
            this.game.add.tween(this.okButton.scale)
                .to({ x: 0, y: 0 }, 200, Phaser.Easing.Cubic.In, true);
            this.autodeployButton.inputEnabled = false;
        };
        ShipsLayer.prototype.hideAll = function () {
            ShipsLayer.onTween = true;
            this.game.add.tween(this.okButton.scale)
                .to({ x: 0, y: 0 }, 200, Phaser.Easing.Cubic.In, true);
            this.game.add.tween(this.autodeployButton.scale)
                .to({ x: 0, y: 0 }, 200, Phaser.Easing.Cubic.In, true);
        };
        ShipsLayer.prototype.onClickOK = function () {
            if (ShipsLayer.onTween) {
                return;
            }
            BattleshipsArmada.SetBoardManager.currentInstance.onClickOK();
        };
        ShipsLayer.prototype.onClickAutodeploy = function () {
            if (BattleshipsArmada.GameVars.autodeploying) {
                return;
            }
            BattleshipsArmada.GameVars.autodeploying = true;
            BattleshipsArmada.SetBoardState.currentInstance.board.hideCursor();
            this.hideAll();
            while (BattleshipsArmada.GameVars.indexStartShip !== BattleshipsArmada.GameConstants.SHIPS.length) {
                BattleshipsArmada.GameVars.startShips.push(BattleshipsArmada.GameVars.currentStartShip);
                for (var j = 0; j < BattleshipsArmada.GameVars.currentStartShip.gridPoints.length; j++) {
                    var col = BattleshipsArmada.GameVars.currentStartShip.gridPoints[j].col;
                    var row = BattleshipsArmada.GameVars.currentStartShip.gridPoints[j].row;
                    BattleshipsArmada.GameVars.playerBoard[row][col] = BattleshipsArmada.GameVars.currentStartShip.shipType;
                }
                var data_1 = { board: JSON.stringify(BattleshipsArmada.GameVars.playerBoard), lastShipId: BattleshipsArmada.GameVars.currentStartShip.shipType };
                BattleshipsArmada.GameVars.currentStartShip.setFinalPosition();
                BattleshipsArmada.SetBoardState.currentInstance.shipPositioned();
                BattleshipsArmada.SetBoardManager.currentInstance.addShip();
            }
            BattleshipsArmada.GameVars.startShips.push(BattleshipsArmada.GameVars.currentStartShip);
            for (var j = 0; j < BattleshipsArmada.GameVars.currentStartShip.gridPoints.length; j++) {
                var col = BattleshipsArmada.GameVars.currentStartShip.gridPoints[j].col;
                var row = BattleshipsArmada.GameVars.currentStartShip.gridPoints[j].row;
                BattleshipsArmada.GameVars.playerBoard[row][col] = BattleshipsArmada.GameVars.currentStartShip.shipType;
            }
            var data = { board: JSON.stringify(BattleshipsArmada.GameVars.playerBoard), lastShipId: BattleshipsArmada.GameVars.currentStartShip.shipType };
            BattleshipsArmada.GameVars.currentStartShip.setFinalPosition();
            BattleshipsArmada.SetBoardState.currentInstance.shipPositioned();
            BattleshipsArmada.SetBoardManager.currentInstance.addShip();
            BattleshipsArmada.SetBoardManager.currentInstance.allShipsPositioned();
        };
        ShipsLayer.onTween = false;
        ShipsLayer.maxTime = 63;
        return ShipsLayer;
    }(Phaser.Group));
    BattleshipsArmada.ShipsLayer = ShipsLayer;
})(BattleshipsArmada || (BattleshipsArmada = {}));
var BattleshipsArmada;
(function (BattleshipsArmada) {
    var Background = (function (_super) {
        __extends(Background, _super);
        function Background(game) {
            var _this = _super.call(this, game, null, "background") || this;
            _this.scale.y = BattleshipsArmada.GameVars.scaleY;
            var bck = new Phaser.Image(_this.game, 0, 0, _this.game.cache.getBitmapData(BattleshipsArmada.GameConstants.WHITE_SQUARE));
            bck.scale.set(BattleshipsArmada.GameConstants.GAME_WIDTH / BattleshipsArmada.GameConstants.BITMAP_SIZE, (BattleshipsArmada.GameConstants.GAME_HEIGHT / BattleshipsArmada.GameVars.scaleY) / BattleshipsArmada.GameConstants.BITMAP_SIZE);
            bck.inputEnabled = true;
            bck.events.onInputDown.add(function () {
            }, _this);
            _this.add(bck);
            var animatedSeaContainer = new Phaser.Group(_this.game);
            _this.add(animatedSeaContainer);
            var animatedSea;
            var x = 0;
            var y = 0;
            for (var i = 0; i < 2; i++) {
                for (var j = 0; j < 4; j++) {
                    animatedSea = new Phaser.Sprite(_this.game, x + 480 * i, y * 1.4 + 480 * j, "texture_atlas_4", "tide_0001.png");
                    animatedSea.scale.set(2);
                    animatedSea.animations.add("waves", Phaser.Animation.generateFrameNames("tide_", 1, 24, ".png", 4));
                    animatedSea.play("waves", 16, true);
                    animatedSeaContainer.add(animatedSea);
                }
            }
            var coast = new Phaser.Image(_this.game, 0, 0, "texture_atlas_3", "player_north_coast.png");
            _this.add(coast);
            var gradient = new Phaser.Image(_this.game, 0, 0, "texture_atlas_3", "gradient_sea.png");
            gradient.scale.set(BattleshipsArmada.GameConstants.GAME_WIDTH / 192, (BattleshipsArmada.GameConstants.GAME_HEIGHT / BattleshipsArmada.GameVars.scaleY) / 290);
            _this.add(gradient);
            return _this;
        }
        return Background;
    }(Phaser.Group));
    BattleshipsArmada.Background = Background;
})(BattleshipsArmada || (BattleshipsArmada = {}));
var BattleshipsArmada;
(function (BattleshipsArmada) {
    var LanguagesLayer = (function (_super) {
        __extends(LanguagesLayer, _super);
        function LanguagesLayer(game, x, y) {
            var _this = _super.call(this, game, null, "languages-layer") || this;
            _this.scale.y = 0;
            _this.position.set(x, y);
            var bck = new Phaser.Graphics(_this.game);
            bck.beginFill(0x1b3248);
            bck.drawRoundedRect(-155, 0, 305, 480, 20);
            bck.endFill();
            _this.add(bck);
            for (var i = 0; i < 7; i++) {
                var flag = new Phaser.Image(_this.game, -130, 60 * i + 75, "texture_atlas_1", "language_" + BattleshipsArmada.GameConstants.LANGUAGES[i] + ".png");
                flag.scale.set(.9);
                flag.anchor.y = .5;
                flag.name = BattleshipsArmada.GameConstants.LANGUAGES[i];
                flag.inputEnabled = true;
                flag.events.onInputDown.add(_this.onFlagDown, _this);
                _this.add(flag);
                var title = new Phaser.Text(_this.game, -50, 60 * i + 79, BattleshipsArmada.GameConstants.LANGUAGES_TEXT[i], { font: "40px American Captain", fontWeight: "200", fill: "#ffffff" });
                title.anchor.y = .5;
                title.name = BattleshipsArmada.GameConstants.LANGUAGES[i];
                title.inputEnabled = true;
                title.events.onInputDown.add(_this.onFlagDown, _this);
                _this.add(title);
            }
            return _this;
        }
        LanguagesLayer.prototype.onFlagDown = function (a) {
            BattleshipsArmada.GameManager.setLanguage(a.name);
        };
        return LanguagesLayer;
    }(Phaser.Group));
    BattleshipsArmada.LanguagesLayer = LanguagesLayer;
})(BattleshipsArmada || (BattleshipsArmada = {}));
var BattleshipsArmada;
(function (BattleshipsArmada) {
    var SplashState = (function (_super) {
        __extends(SplashState, _super);
        function SplashState() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SplashState.prototype.init = function () {
            SplashState.currentInstance = this;
            this.helpLayer = null;
            this.clicked = false;
        };
        SplashState.prototype.create = function () {
            var background = this.add.image(0, BattleshipsArmada.GameConstants.GAME_HEIGHT / 2, "background");
            background.anchor.y = .5;
            background.scale.y = BattleshipsArmada.GameVars.scaleY;
            var topButtonsContainer = this.add.group();
            topButtonsContainer.x = BattleshipsArmada.GameConstants.GAME_WIDTH / 2;
            topButtonsContainer.y = 55 * BattleshipsArmada.GameVars.scaleY;
            topButtonsContainer.scale.y = BattleshipsArmada.GameVars.scaleY;
            var title = new Phaser.Image(this.game, 0, 180, "texture_atlas_1", "title_battleship.png");
            title.anchor.set(.5);
            topButtonsContainer.add(title);
            var title2 = new Phaser.Image(this.game, 0, 315, "texture_atlas_1", "armada_title.png");
            title2.anchor.set(.5);
            topButtonsContainer.add(title2);
            this.languagesLayer = new BattleshipsArmada.LanguagesLayer(this.game, 210, 0);
            topButtonsContainer.add(this.languagesLayer);
            this.buttonLanguage = new Phaser.Button(this.game, 210, 0, "texture_atlas_5_" + BattleshipsArmada.GameVars.gameData.language, this.onClickLanguage, this);
            this.buttonLanguage.setFrames("btn_select_language_on.png", "btn_select_language.png", "btn_select_language_on.png");
            this.buttonLanguage.forceOut = true;
            this.buttonLanguage.anchor.set(.5);
            this.buttonLanguage.scale.set(.75);
            topButtonsContainer.add(this.buttonLanguage);
            var bottomButtonsContainer = this.add.group();
            bottomButtonsContainer.y = BattleshipsArmada.GameConstants.GAME_HEIGHT;
            bottomButtonsContainer.scale.y = BattleshipsArmada.GameVars.scaleY;
            this.buttonEasy = new Phaser.Button(this.game, BattleshipsArmada.GameConstants.GAME_WIDTH / 2 - 220, -75, "texture_atlas_5_" + BattleshipsArmada.GameVars.gameData.language, this.onClickEasy, this);
            this.buttonEasy.setFrames("btn_easy_on.png", "btn_easy.png", "btn_easy_on.png");
            this.buttonEasy.forceOut = true;
            this.buttonEasy.anchor.set(.5, 1);
            this.buttonEasy.width = 227;
            bottomButtonsContainer.add(this.buttonEasy);
            this.buttonMedium = new Phaser.Button(this.game, BattleshipsArmada.GameConstants.GAME_WIDTH / 2, -75, "texture_atlas_5_" + BattleshipsArmada.GameVars.gameData.language, this.onClickMedium, this);
            this.buttonMedium.setFrames("btn_normal_on.png", "btn_normal.png", "btn_normal_on.png");
            this.buttonMedium.forceOut = true;
            this.buttonMedium.anchor.set(.5, 1);
            this.buttonMedium.width = 227;
            bottomButtonsContainer.add(this.buttonMedium);
            this.buttonHard = new Phaser.Button(this.game, BattleshipsArmada.GameConstants.GAME_WIDTH / 2 + 220, -75, "texture_atlas_5_" + BattleshipsArmada.GameVars.gameData.language, this.onClickHard, this);
            this.buttonHard.setFrames("btn_hard_on.png", "btn_hard.png", "btn_hard_on.png");
            this.buttonHard.forceOut = true;
            this.buttonHard.anchor.set(.5, 1);
            this.buttonHard.width = 227;
            bottomButtonsContainer.add(this.buttonHard);
            var bottomBar = new Phaser.Image(this.game, 0, 0, "texture_atlas_1", "metal_bar.png");
            bottomBar.anchor.set(0, .75);
            bottomButtonsContainer.add(bottomBar);
            this.buttonSound = new Phaser.Button(this.game, BattleshipsArmada.GameConstants.GAME_WIDTH / 2 - 100, 0, "texture_atlas_5_" + BattleshipsArmada.GameVars.gameData.language, this.onClickSound, this);
            this.buttonSound.forceOut = true;
            this.buttonSound.anchor.set(.5, 1);
            bottomButtonsContainer.add(this.buttonSound);
            if (BattleshipsArmada.GameVars.gameData.sound) {
                this.buttonSound.setFrames("btn_sound_on_on.png", "btn_sound_on.png", "btn_sound_on_on.png");
                BattleshipsArmada.AudioManager.getInstance().unmute();
            }
            else {
                this.buttonSound.setFrames("btn_sound_off_on.png", "btn_sound_off.png", "btn_sound_off_on.png");
                BattleshipsArmada.AudioManager.getInstance().mute();
            }
            this.buttonHelp = new Phaser.Button(this.game, BattleshipsArmada.GameConstants.GAME_WIDTH / 2 + 100, 0, "texture_atlas_5_" + BattleshipsArmada.GameVars.gameData.language, this.onClickHelp, this);
            this.buttonHelp.setFrames("btn_help_on.png", "btn_help.png", "btn_help_on.png");
            this.buttonHelp.forceOut = true;
            this.buttonHelp.anchor.set(.5, 1);
            bottomButtonsContainer.add(this.buttonHelp);
            BattleshipsArmada.AudioManager.getInstance().playSound("splash", true);
        };
        SplashState.prototype.onLanguageSet = function () {
            this.buttonLanguage.loadTexture("texture_atlas_5_" + BattleshipsArmada.GameVars.gameData.language);
            this.buttonLanguage.setFrames("btn_select_language_on.png", "btn_select_language.png", "btn_select_language_on.png");
            this.buttonEasy.loadTexture("texture_atlas_5_" + BattleshipsArmada.GameVars.gameData.language);
            this.buttonEasy.setFrames("btn_easy_on.png", "btn_easy.png", "btn_easy_on.png");
            this.buttonEasy.width = 227;
            this.buttonMedium.loadTexture("texture_atlas_5_" + BattleshipsArmada.GameVars.gameData.language);
            this.buttonMedium.setFrames("btn_normal_on.png", "btn_normal.png", "btn_normal_on.png");
            this.buttonMedium.width = 227;
            this.buttonHard.loadTexture("texture_atlas_5_" + BattleshipsArmada.GameVars.gameData.language);
            this.buttonHard.setFrames("btn_hard_on.png", "btn_hard.png", "btn_hard_on.png");
            this.buttonHard.width = 227;
            this.buttonSound.loadTexture("texture_atlas_5_" + BattleshipsArmada.GameVars.gameData.language);
            if (BattleshipsArmada.GameVars.gameData.sound) {
                this.buttonSound.setFrames("btn_sound_on_on.png", "btn_sound_on.png", "btn_sound_on_on.png");
                BattleshipsArmada.AudioManager.getInstance().unmute();
            }
            else {
                this.buttonSound.setFrames("btn_sound_off_on.png", "btn_sound_off.png", "btn_sound_off_on.png");
                BattleshipsArmada.AudioManager.getInstance().mute();
            }
            this.buttonHelp.loadTexture("texture_atlas_5_" + BattleshipsArmada.GameVars.gameData.language);
            this.buttonHelp.setFrames("btn_help_on.png", "btn_help.png", "btn_help_on.png");
            this.game.add.tween(this.languagesLayer.scale)
                .to({ y: 0 }, 250, Phaser.Easing.Cubic.In, true);
        };
        SplashState.prototype.shutdown = function () {
            SplashState.currentInstance = null;
            _super.prototype.shutdown.call(this);
        };
        SplashState.prototype.onClickOnGoing = function () {
            BattleshipsArmada.AudioManager.getInstance().playSound("click");
        };
        SplashState.prototype.removeHelpLayer = function () {
            this.helpLayer.destroy();
        };
        SplashState.prototype.removeSettingsLayer = function () {
            this.settingsLayer.destroy();
        };
        SplashState.prototype.onClickLanguage = function () {
            if (this.languagesLayer.scale.y === 1) {
                this.game.add.tween(this.languagesLayer.scale)
                    .to({ y: 0 }, 250, Phaser.Easing.Cubic.In, true);
            }
            else {
                this.game.add.tween(this.languagesLayer.scale)
                    .to({ y: 1 }, 250, Phaser.Easing.Cubic.Out, true);
            }
        };
        SplashState.prototype.onClickEasy = function () {
            if (this.clicked) {
                return;
            }
            this.clicked = true;
            BattleshipsArmada.AudioManager.getInstance().playSound("click");
            BattleshipsArmada.GameManager.soloGameChosen(BattleshipsArmada.GameConstants.EASY);
        };
        SplashState.prototype.onClickMedium = function () {
            if (this.clicked) {
                return;
            }
            this.clicked = true;
            BattleshipsArmada.GameManager.soloGameChosen(BattleshipsArmada.GameConstants.MEDIUM);
            BattleshipsArmada.AudioManager.getInstance().playSound("click");
        };
        SplashState.prototype.onClickHard = function () {
            if (this.clicked) {
                return;
            }
            this.clicked = true;
            BattleshipsArmada.GameManager.soloGameChosen(BattleshipsArmada.GameConstants.HARD);
            BattleshipsArmada.AudioManager.getInstance().playSound("click");
        };
        SplashState.prototype.onClickHelp = function () {
            this.helpLayer = new BattleshipsArmada.HelpLayer(this.game);
            this.add.existing(this.helpLayer);
            BattleshipsArmada.AudioManager.getInstance().playSound("click");
        };
        SplashState.prototype.onClickSound = function (button) {
            if (BattleshipsArmada.GameVars.gameData.sound) {
                button.setFrames("btn_sound_off_on.png", "btn_sound_off.png", "btn_sound_off_on.png");
                BattleshipsArmada.GameVars.gameData.sound = false;
                BattleshipsArmada.AudioManager.getInstance().mute();
            }
            else {
                button.setFrames("btn_sound_on_on.png", "btn_sound_on.png", "btn_sound_on_on.png");
                BattleshipsArmada.GameVars.gameData.sound = true;
                BattleshipsArmada.AudioManager.getInstance().unmute();
            }
            BattleshipsArmada.AudioManager.getInstance().playSound("click");
        };
        SplashState.currentInstance = null;
        return SplashState;
    }(Phaser.State));
    BattleshipsArmada.SplashState = SplashState;
})(BattleshipsArmada || (BattleshipsArmada = {}));
var BattleshipsArmada;
(function (BattleshipsArmada) {
    var HelpBackground = (function (_super) {
        __extends(HelpBackground, _super);
        function HelpBackground(game, y) {
            var _this = _super.call(this, game, null, "buy-background", false) || this;
            _this.alpha = 1;
            var tint = 0x1c3248;
            var width = 550;
            var height = 700;
            _this.y = y;
            _this.x = BattleshipsArmada.GameConstants.GAME_WIDTH / 2 - (width / 2) - 25;
            var cornerBmd = game.add.bitmapData(25, 25);
            cornerBmd.ctx.beginPath();
            cornerBmd.ctx.lineTo(25, 25);
            cornerBmd.ctx.lineTo(25, 0);
            cornerBmd.ctx.lineTo(0, 0);
            cornerBmd.ctx.fillStyle = "#ffffff";
            cornerBmd.ctx.fill();
            var reusableBmd = game.add.bitmapData(100, 100);
            reusableBmd.ctx.beginPath();
            reusableBmd.ctx.rect(0, 0, 100, 100);
            reusableBmd.ctx.fillStyle = "#ffffff";
            reusableBmd.ctx.fill();
            var corner = new Phaser.Sprite(game, 25, -height, cornerBmd);
            corner.tint = tint;
            corner.angle = 90;
            _this.addChild(corner);
            var rectangle = new Phaser.Sprite(game, 25, -height, reusableBmd);
            rectangle.scale.setTo(width / 100, 25 / 100);
            rectangle.tint = tint;
            _this.add(rectangle);
            corner = new Phaser.Sprite(game, (width + 50), 25 - height, cornerBmd);
            corner.tint = tint;
            corner.angle = 180;
            _this.addChild(corner);
            rectangle = new Phaser.Sprite(game, 0, 25 - height, reusableBmd);
            rectangle.scale.setTo((width + 50) / 100, height / 100);
            rectangle.tint = tint;
            _this.add(rectangle);
            return _this;
        }
        return HelpBackground;
    }(Phaser.Group));
    BattleshipsArmada.HelpBackground = HelpBackground;
})(BattleshipsArmada || (BattleshipsArmada = {}));
var BattleshipsArmada;
(function (BattleshipsArmada) {
    var HelpLayer = (function (_super) {
        __extends(HelpLayer, _super);
        function HelpLayer(game) {
            var _this = _super.call(this, game, null, "help-layer") || this;
            HelpLayer.currentInstance = _this;
            _this.page = 0;
            var bck = new BattleshipsArmada.Background(_this.game);
            _this.add(bck);
            var buttonHome = new Phaser.Button(_this.game, 0, 0, "texture_atlas_1", _this.onClickHome, _this);
            buttonHome.setFrames("btn_home_on.png", "btn_home.png", "btn_home_on.png");
            buttonHome.forceOut = true;
            buttonHome.scale.y = BattleshipsArmada.GameVars.scaleY;
            _this.add(buttonHome);
            var titleLabel = new Phaser.Text(_this.game, BattleshipsArmada.GameConstants.GAME_WIDTH / 2, 15 * BattleshipsArmada.GameVars.scaleY, BattleshipsArmada.GameVars.languages[BattleshipsArmada.GameVars.gameData.language]["HELP"], { font: "85px American Captain", fontWeight: "400", fill: "#ffffff", align: "center" });
            titleLabel.scale.y = BattleshipsArmada.GameVars.scaleY;
            titleLabel.anchor.x = .5;
            titleLabel.strokeThickness = 10;
            titleLabel.fill = "#f0faf9";
            titleLabel.setShadow(0, 5, "#38536f", 0);
            titleLabel.stroke = "#38536f";
            _this.add(titleLabel);
            var helpBackground = new BattleshipsArmada.HelpBackground(_this.game, 890);
            _this.add(helpBackground);
            var container = new Phaser.Group(_this.game);
            container.scale.y = BattleshipsArmada.GameVars.scaleY;
            container.x = BattleshipsArmada.GameConstants.GAME_WIDTH / 2;
            container.y = 900;
            _this.add(container);
            var bar = new Phaser.Image(_this.game, 0, 0, "texture_atlas_1", "bar_help.png");
            bar.anchor.set(.5);
            container.add(bar);
            _this.leftButton = new Phaser.Button(_this.game, -230, 0, "texture_atlas_1");
            _this.leftButton.setFrames("btn_left_on.png", "btn_left.png", "btn_left_on.png");
            _this.leftButton.inputEnabled = true;
            _this.leftButton.events.onInputDown.add(_this.leftButtonDown, _this);
            _this.leftButton.anchor.set(.5);
            _this.leftButton.alpha = .5;
            container.add(_this.leftButton);
            _this.rightButton = new Phaser.Button(_this.game, 230, 0, "texture_atlas_1");
            _this.rightButton.setFrames("btn_right_on.png", "btn_right.png", "btn_right_on.png");
            _this.rightButton.inputEnabled = true;
            _this.rightButton.events.onInputDown.add(_this.rightButtonDown, _this);
            _this.rightButton.anchor.set(.5);
            container.add(_this.rightButton);
            _this.pages = new Array();
            var image = new Phaser.Image(_this.game, -30, 0, "texture_atlas_1", "page_current.png");
            image.anchor.set(.5);
            container.add(image);
            _this.pages.push(image);
            image = new Phaser.Image(_this.game, 0, 0, "texture_atlas_1", "page_other.png");
            image.anchor.set(.5);
            container.add(image);
            _this.pages.push(image);
            image = new Phaser.Image(_this.game, 30, 0, "texture_atlas_1", "page_other.png");
            image.anchor.set(.5);
            container.add(image);
            _this.pages.push(image);
            _this.textContainer = new Phaser.Group(_this.game);
            _this.textContainer.y = 210;
            _this.textContainer.scale.y = BattleshipsArmada.GameVars.scaleY;
            _this.add(_this.textContainer);
            var title1 = BattleshipsArmada.GameVars.languages[BattleshipsArmada.GameVars.gameData.language]["GAME OBJECTIVE"];
            var title2 = BattleshipsArmada.GameVars.languages[BattleshipsArmada.GameVars.gameData.language]["DEPLOYMENT"];
            var title3 = BattleshipsArmada.GameVars.languages[BattleshipsArmada.GameVars.gameData.language]["GAME RULES"];
            var text1 = BattleshipsArmada.GameVars.languages[BattleshipsArmada.GameVars.gameData.language]["HELP 1"];
            var text2 = BattleshipsArmada.GameVars.languages[BattleshipsArmada.GameVars.gameData.language]["HELP 2"];
            text2 += "\n\n" + BattleshipsArmada.GameVars.languages[BattleshipsArmada.GameVars.gameData.language]["HELP 3"];
            text2 += "\n\n" + BattleshipsArmada.GameVars.languages[BattleshipsArmada.GameVars.gameData.language]["HELP 4"];
            text2 += "\n\n" + BattleshipsArmada.GameVars.languages[BattleshipsArmada.GameVars.gameData.language]["HELP 5"];
            var text3 = BattleshipsArmada.GameVars.languages[BattleshipsArmada.GameVars.gameData.language]["HELP 6"];
            text3 += "\n\n" + BattleshipsArmada.GameVars.languages[BattleshipsArmada.GameVars.gameData.language]["HELP 7"];
            text3 += "\n\n" + BattleshipsArmada.GameVars.languages[BattleshipsArmada.GameVars.gameData.language]["HELP 8"];
            text3 += "\n\n" + BattleshipsArmada.GameVars.languages[BattleshipsArmada.GameVars.gameData.language]["HELP 9"];
            _this.texts = new Array();
            var title = new Phaser.Text(_this.game, BattleshipsArmada.GameConstants.GAME_WIDTH / 2, 0, title1, { font: "70px American Captain", fontWeight: "200", fill: "#ffffff" });
            title.anchor.x = .5;
            var text = new Phaser.Text(_this.game, 130, 100, text1, { font: "30px Arial", fill: "#ffffff" });
            text.wordWrap = true;
            text.wordWrapWidth = 510;
            var texts = { text: text, title: title };
            _this.texts.push(texts);
            _this.textContainer.add(title);
            _this.textContainer.add(text);
            image = new Phaser.Image(_this.game, 120, 200, "texture_atlas_1", "silouette_5x.png");
            _this.textContainer.add(image);
            image = new Phaser.Image(_this.game, 325, 181, "texture_atlas_1", "silouette_4x.png");
            _this.textContainer.add(image);
            image = new Phaser.Image(_this.game, 493, 181, "texture_atlas_1", "silouette_4x.png");
            _this.textContainer.add(image);
            image = new Phaser.Image(_this.game, 255, 290, "texture_atlas_1", "silouette_3x.png");
            _this.textContainer.add(image);
            image = new Phaser.Image(_this.game, 390, 289, "texture_atlas_1", "silouette_2x.png");
            _this.textContainer.add(image);
            title = new Phaser.Text(_this.game, -BattleshipsArmada.GameConstants.GAME_WIDTH + BattleshipsArmada.GameConstants.GAME_WIDTH / 2, 0, title2, { font: "70px American Captain", fontWeight: "200", fill: "#ffffff" });
            title.anchor.x = .5;
            text = new Phaser.Text(_this.game, -BattleshipsArmada.GameConstants.GAME_WIDTH + 130, 100, text2, { font: "30px Arial", fill: "#ffffff" });
            text.wordWrap = true;
            text.wordWrapWidth = 510;
            texts = { text: text, title: title };
            _this.texts.push(texts);
            _this.textContainer.add(title);
            _this.textContainer.add(text);
            title = new Phaser.Text(_this.game, -(BattleshipsArmada.GameConstants.GAME_WIDTH * 2) + BattleshipsArmada.GameConstants.GAME_WIDTH / 2, 0, title3, { font: "70px American Captain", fontWeight: "200", fill: "#ffffff" });
            title.anchor.x = .5;
            text = new Phaser.Text(_this.game, -(BattleshipsArmada.GameConstants.GAME_WIDTH * 2) + 130, 100, text3, { font: "25px Arial", fill: "#ffffff" });
            text.lineSpacing = -5;
            text.fontSize = 24 / BattleshipsArmada.GameVars.scaleY;
            text.wordWrap = true;
            text.wordWrapWidth = 510;
            texts = { text: text, title: title };
            _this.texts.push(texts);
            _this.textContainer.add(title);
            _this.textContainer.add(text);
            return _this;
        }
        HelpLayer.prototype.destroy = function () {
            HelpLayer.currentInstance = null;
            _super.prototype.destroy.call(this);
        };
        HelpLayer.prototype.onClickHome = function (b) {
            b.clearFrames();
            BattleshipsArmada.SplashState.currentInstance.removeHelpLayer();
            BattleshipsArmada.AudioManager.getInstance().playSound("click");
        };
        HelpLayer.prototype.leftButtonDown = function () {
            if (this.leftButton.alpha !== .5) {
                BattleshipsArmada.AudioManager.getInstance().playSound("click");
                this.textContainer.x -= BattleshipsArmada.GameConstants.GAME_WIDTH;
                this.rightButton.alpha = 1;
                this.page--;
                for (var i = 0; i < 3; i++) {
                    if (i === this.page) {
                        this.pages[i].frameName = "page_current.png";
                    }
                    else {
                        this.pages[i].frameName = "page_other.png";
                    }
                }
                if (this.textContainer.x === 0) {
                    this.leftButton.alpha = .5;
                }
            }
        };
        HelpLayer.prototype.rightButtonDown = function () {
            if (this.rightButton.alpha !== .5) {
                BattleshipsArmada.AudioManager.getInstance().playSound("click");
                this.textContainer.x += BattleshipsArmada.GameConstants.GAME_WIDTH;
                this.leftButton.alpha = 1;
                this.page++;
                for (var i = 0; i < 3; i++) {
                    if (i === this.page) {
                        this.pages[i].frameName = "page_current.png";
                    }
                    else {
                        this.pages[i].frameName = "page_other.png";
                    }
                }
                if (this.textContainer.x === BattleshipsArmada.GameConstants.GAME_WIDTH * 2) {
                    this.rightButton.alpha = .5;
                }
            }
        };
        return HelpLayer;
    }(Phaser.Group));
    BattleshipsArmada.HelpLayer = HelpLayer;
})(BattleshipsArmada || (BattleshipsArmada = {}));
var BattleshipsArmada;
(function (BattleshipsArmada) {
    var SettingsLayer = (function (_super) {
        __extends(SettingsLayer, _super);
        function SettingsLayer(game) {
            var _this = _super.call(this, game, null, "settings-layer") || this;
            var bck = new BattleshipsArmada.Background(_this.game);
            _this.add(bck);
            var buttonHome = new Phaser.Button(_this.game, 0, 0, "texture_atlas_1", _this.onClickHome, _this);
            buttonHome.setFrames("btn_home_on.png", "btn_home.png", "btn_home_on.png");
            buttonHome.forceOut = true;
            buttonHome.scale.y = BattleshipsArmada.GameVars.scaleY;
            _this.add(buttonHome);
            var titleLabel = new Phaser.Text(_this.game, BattleshipsArmada.GameConstants.GAME_WIDTH / 2, 15 * BattleshipsArmada.GameVars.scaleY, BattleshipsArmada.GameVars.languages[BattleshipsArmada.GameVars.gameData.language]["SETTINGS"], { font: "85px American Captain", fontWeight: "400", fill: "#476990", align: "center" });
            titleLabel.scale.y = BattleshipsArmada.GameVars.scaleY;
            titleLabel.anchor.x = .5;
            titleLabel.strokeThickness = 10;
            titleLabel.fill = "#f0faf9";
            titleLabel.setShadow(0, 5, "#38536f", 0);
            titleLabel.stroke = "#38536f";
            _this.add(titleLabel);
            var container = new Phaser.Group(_this.game);
            container.x = BattleshipsArmada.GameConstants.GAME_WIDTH / 2;
            container.y = BattleshipsArmada.GameConstants.GAME_HEIGHT / 2;
            container.scale.y = BattleshipsArmada.GameVars.scaleY;
            _this.add(container);
            var box = new Phaser.Image(_this.game, 0, 0, "texture_atlas_1", "box.png");
            box.anchor.set(.5);
            container.add(box);
            var musicLabel = new Phaser.Text(_this.game, -70, -40, BattleshipsArmada.GameVars.languages[BattleshipsArmada.GameVars.gameData.language]["MUSIC"], { font: "55px American Captain", fontWeight: "300", fill: "#FFFFFF", align: "center" });
            musicLabel.anchor.set(.5);
            container.add(musicLabel);
            var soundLabel = new Phaser.Text(_this.game, -70, 50, BattleshipsArmada.GameVars.languages[BattleshipsArmada.GameVars.gameData.language]["SOUND"], { font: "55px American Captain", fontWeight: "300", fill: "#FFFFFF", align: "center" });
            soundLabel.anchor.set(.5);
            container.add(soundLabel);
            var musicSwitchButton = new BattleshipsArmada.SwitchButton(_this.game, true);
            musicSwitchButton.x = 85;
            musicSwitchButton.y = -45;
            container.add(musicSwitchButton);
            var soundSwitchButton = new BattleshipsArmada.SwitchButton(_this.game, false);
            soundSwitchButton.x = 85;
            soundSwitchButton.y = 45;
            container.add(soundSwitchButton);
            return _this;
        }
        SettingsLayer.prototype.onClickHome = function (b) {
            b.clearFrames();
            BattleshipsArmada.SplashState.currentInstance.removeSettingsLayer();
            BattleshipsArmada.AudioManager.getInstance().playSound("click");
        };
        return SettingsLayer;
    }(Phaser.Group));
    BattleshipsArmada.SettingsLayer = SettingsLayer;
})(BattleshipsArmada || (BattleshipsArmada = {}));
var Utils;
(function (Utils) {
    var RectangleWithRadius = (function (_super) {
        __extends(RectangleWithRadius, _super);
        function RectangleWithRadius(game, x, y, width, height, r, color, alpha, configuration, blendMode) {
            var _this = _super.call(this, game, null, "rectangle_with_radius", false) || this;
            if (typeof configuration === "undefined") {
                configuration = RectangleWithRadius.NORMAL_CONFIGURATION;
            }
            if (typeof blendMode === "undefined") {
                blendMode = 0;
            }
            if (typeof alpha === "undefined") {
                alpha = 1;
            }
            var deltaY = 0;
            if (configuration === RectangleWithRadius.BOTTOM_CONFIGURATION) {
                deltaY = -r;
            }
            var reusableBmd = game.add.bitmapData(100, 100);
            reusableBmd.ctx.beginPath();
            reusableBmd.ctx.rect(0, 0, 100, 100);
            reusableBmd.ctx.fillStyle = color;
            reusableBmd.ctx.fill();
            var rectangle = new Phaser.Sprite(game, x + r, y + r + deltaY, reusableBmd);
            rectangle.scale.setTo((width - 2 * r) / 100, (height - 2 * r) / 100);
            rectangle.alpha = alpha;
            rectangle.blendMode = blendMode;
            _this.add(rectangle);
            if (configuration === RectangleWithRadius.NORMAL_CONFIGURATION || configuration === RectangleWithRadius.TOP_CONFIGURATION) {
                rectangle = new Phaser.Sprite(game, x + r, y, reusableBmd);
                rectangle.scale.setTo((width - 2 * r) / 100, r / 100 + deltaY);
                rectangle.alpha = alpha;
                rectangle.blendMode = blendMode;
                _this.add(rectangle);
            }
            rectangle = new Phaser.Sprite(game, x + width - r, y + r + deltaY, reusableBmd);
            rectangle.scale.setTo(r / 100, (height - 2 * r) / 100);
            rectangle.alpha = alpha;
            rectangle.blendMode = blendMode;
            _this.add(rectangle);
            if (configuration === RectangleWithRadius.NORMAL_CONFIGURATION || configuration === RectangleWithRadius.BOTTOM_CONFIGURATION) {
                rectangle = new Phaser.Sprite(game, x + r, y + height - r + deltaY, reusableBmd);
                rectangle.scale.setTo((width - 2 * r) / 100, r / 100);
                rectangle.alpha = alpha;
                rectangle.blendMode = blendMode;
                _this.add(rectangle);
            }
            rectangle = new Phaser.Sprite(game, x, y + r + deltaY, reusableBmd);
            rectangle.scale.setTo(r / 100, (height - 2 * r) / 100);
            rectangle.alpha = alpha;
            rectangle.blendMode = blendMode;
            _this.add(rectangle);
            var cornerBmd = game.add.bitmapData(r, r);
            cornerBmd.ctx.beginPath();
            cornerBmd.ctx.arc(0, 0, r, 0, Math.PI);
            cornerBmd.ctx.fillStyle = color;
            cornerBmd.ctx.fill();
            var corner;
            if (configuration === RectangleWithRadius.NORMAL_CONFIGURATION || configuration === RectangleWithRadius.TOP_CONFIGURATION) {
                corner = new Phaser.Sprite(game, x + r, y + r + deltaY, cornerBmd);
                corner.alpha = alpha;
                corner.angle = 180;
                corner.blendMode = blendMode;
                _this.add(corner);
                corner = new Phaser.Sprite(game, x + width - r, y + r + deltaY, cornerBmd);
                corner.alpha = alpha;
                corner.angle = 270;
                corner.blendMode = blendMode;
                _this.add(corner);
            }
            if (configuration === RectangleWithRadius.NORMAL_CONFIGURATION || configuration === RectangleWithRadius.BOTTOM_CONFIGURATION) {
                corner = new Phaser.Sprite(game, x + r, y + height - r + deltaY, cornerBmd);
                corner.alpha = alpha;
                corner.angle = 90;
                corner.blendMode = blendMode;
                _this.add(corner);
                corner = new Phaser.Sprite(game, x + width - r, y + height - r + deltaY, cornerBmd);
                corner.alpha = alpha;
                corner.angle = 0;
                corner.blendMode = blendMode;
                _this.add(corner);
            }
            return _this;
        }
        RectangleWithRadius.TOP_CONFIGURATION = "top";
        RectangleWithRadius.BOTTOM_CONFIGURATION = "botton";
        RectangleWithRadius.NORMAL_CONFIGURATION = "normal";
        return RectangleWithRadius;
    }(Phaser.Group));
    Utils.RectangleWithRadius = RectangleWithRadius;
})(Utils || (Utils = {}));
//# sourceMappingURL=battleships-armada.min.js.map