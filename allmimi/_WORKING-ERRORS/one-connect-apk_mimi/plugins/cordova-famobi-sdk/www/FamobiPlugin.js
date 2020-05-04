cordova.define("cordova-famobi-sdk.FamobiPlugin", function(require, exports, module) {
/*global cordova, module*/

var sdk = {
	// init: function (appId, isTestmode, initCallback) {
	init: function (appId, isTestmode) {
		console.log("init");
		var callback = function (msg) {
			if (typeof msg === "string") {
				console.log("init callback:", msg)
			} else {
				console.log("invalid callback param:", msg);
				return;
			}
			var parts = msg.split(":");
			var callbackName = parts[0];
			var param = parts.length > 1 ? parts[1] : "";
			if (sdk.callbacks.hasOwnProperty(callbackName)) {
				sdk.callbacks[callbackName](param);
				// if (initCallback && callbackName == "onInitDone") {
				//     initCallback();
				// }
			}
			else {
				console.log("event not found: " + callbackName);
			}
		};
		var errorCallback = function (err) {
			console.log("error callback:" + err);
			// sdk.callbacks.onInitError(err);
		};
		cordova.exec(callback, errorCallback, "FamobiPlugin", "init", [appId, isTestmode]);
		// cordova.exec(callback, errorCallback, "FamobiPlugin", "init", [appId, isTestmode, {test1:true, test2:true}]);
	},
	showAd: function (force, doneCallback) {
		console.log("showAd");
		cordova.exec(doneCallback, doneCallback, "FamobiPlugin", "showAd", [force]);
	},
	forceAd: function (doneCallback) {
		console.log("forceAd");
		cordova.exec(doneCallback, doneCallback, "FamobiPlugin", "showAd", [true]);
	},
	submitHighscore: function (level, score, doneCallback) {
		console.log("submitHighscore");
		cordova.exec(doneCallback, doneCallback, "FamobiPlugin", "submitHighscore", [level, score]);
	},
	levelUp: function (doneCallback) {
		console.log("levelUp");
		cordova.exec(doneCallback, doneCallback, "FamobiPlugin", "levelUp", []);
	},
	gameOver: function (doneCallback) {
		console.log("gameOver");
		cordova.exec(doneCallback, doneCallback, "FamobiPlugin", "gameOver", []);
	},
	trackView: function (view) {
		console.log("trackView: " + view);
		cordova.exec(null, null, "FamobiPlugin", "trackView", [view]);
	},
	trackEvent: function (category, action, label, value) {
		console.log("trackEvent: " + category + "/" + action + "/" + label + "/" + value);
		cordova.exec(null, null, "FamobiPlugin", "trackEvent", [category, action, label, value]);
	},
	sendMessage: function () {
		cordova.exec(null, null, "FamobiPlugin", "sendMessage", [{test1: true, test2: false, test3: [1, 2, 3]}]);
	},
	callbacks: {
		// onInitDone: function () {/**/},
		// onInitError: function (err) {/**/},
		onAdClosed: function () {/**/
		},
		onAdFailedToLoad: function (errCode) {/**/
		},
		onAdLeftApplication: function () {/**/
		},
		onAdOpened: function () {/**/
		},
		onAdLoaded: function () {/**/
		}
	},
	registerCallback: function (name, callback) {
		if (sdk.callbacks.hasOwnProperty(name)) {
			sdk.callbacks[name] = callback;
		}
		else {
			console.error("unknown event: " + name);
		}
	}
};

sdk.store = {};

sdk.firebase = {
	/**
	 * EventParameter should be a JsonArray in the form of:
	 * [
	 * {
	 * paramName: [EventName],
	 * paramType: ["String"\"Long"\"Double"],
	 * paramValue: [EventValue]
	 * },
	 * {
	 * paramName...,
	 * ...,
	 * ...
	 * }
	 * ]
	 *
	 * @param eventName
	 * @param eventParams JsonArray

	 */
	trackEvent: function (eventName, eventParams) {
		cordova.exec(null, null, "FamobiPlugin", "trackFirebaseEvent", [eventName, eventParams]);
	}
};

module.exports = sdk;

});
