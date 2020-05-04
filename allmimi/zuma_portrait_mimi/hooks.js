/**
	GRADLE - KNOWLEDGE IS POWER
    ***** PROPRIETARY CODE *****
    @author : gradle (gradlecode@outlook.com)
	@update: 11/22/2019 12:22:00
	@version_name: gradle-logic
	@version_code: v6.0.0
	copyright @2019
*/

var gradle = {
    debug : false,
	isMobile : false,//( /(ipad|iphone|ipod|android|windows phone)/i.test(navigator.userAgent) ),

	//Ads information :
	//===================
    banner            : 'ca-app-pub-3940256099942544/6300978111', //id placement banner
    interstitial      : 'ca-app-pub-3940256099942544/1033173712', //id placement interstitial

    isTesting         : true, //Ads mode testing. set to false for a production mode.
    enableBanner      : true, //Ads enable the banner. set to false to disable the banner.
    enableInterstitial : true, //Ads enable the interstitial. set to false to disable all interstitials.

    bannerAtBottom    : true, //if false the banner will be at top
    overlap           : false,

	notifiBackbutton  : true, //for confirmation backbutton
	notifiMessage     : 'Do you want to exit the game ?',

	intervalAds       : 1,     //Ads each interval for example each 4 times
	
	//Game settings :
	//===============
	path_single_color : false,
	path_alpha        : 1,  //alpha between 0.01 and 1 (1=no transparency)


	// more games :
	//=============
	enableMoreGames   : true, //set to true to make the button (i) redirect to the developer link

						//change the value with your id developer :
	developer_link    : 'https://play.google.com/store/apps/developer?id=Holova+Studio',


	//Events manager :
	//================
    event: function(ev, msg){
		gradle.process(ev,msg), gradle.log(ev);
        switch(ev){
            case 'first_start':   //First start
                //gradle.showInter();
                break;
			case 'SCREEN_LEVELSELECT': //Button play
				if(gradle.first_start){ //show the interstitial for button play only one time, to respect google rules.
					gradle.showInter();
					gradle.first_start = false;
				}
                break;
			case 'EVENT_LEVELRESTART':
                gradle.checkInterval() && gradle.showInter(); // <-- we check the interval if ok we show interstitial
                break;
			case 'oveer_button_back':
                //gradle.showInter();
                break;
			case 'EVENT_LEVELSUCCESS':
                //gradle.showInter();
                break;
			case 'EVENT_LEVELFAIL':
                //gradle.showInter();
                break;
			case 'SCREEN_PAUSE':
                //gradle.showInter();
			case 'EVENT_VOLUMECHANGE':
                //gradle.showInter();
                break;
			case 'SCREEN_CREDITS':
	            //gradle.showInter();
	            break;
	        case 'MORE_GAMES':
                gradle.more();
                break;
            case 'test':
				//gradle.checkInterval() && gradle.showInter();
                break;			
        }
    },
	

    log: function(val){
        if(typeof val === 'object' && typeof val.isTrusted!='undefined' && val.isTrusted==false) return;
        gradle.debug && console.log( gradle.isMobile && (typeof val === 'object' && val !== null) ? JSON.stringify(val) : val );
    },
	
	
	//Ready : /!\ DO NOT CHANGE, ONLY IF YOU ARE AN EXPERT.
	//=========================
	first_start: true,
	wheelFirstTime : false,
	totalLevels    : 100,
    ready: function() {
        console.log('gradle ready ...');
        if(typeof admob !='undefined'){
            if(gradle.isTesting){
                admob.banner.config({
                    id: gradle.banner,
                    isTesting: true,
                    autoShow: true,
                    overlap: gradle.overlap,
                    offsetTopBar: false,
                    bannerAtTop: !gradle.bannerAtBottom
                });

                admob.interstitial.config({
                    id: gradle.interstitial,
                    isTesting: true,
                    autoShow: false,
                });
            }
            else{
                admob.banner.config({
                    id: gradle.banner,
                    autoShow: true,
                    overlap: gradle.overlap,
                    offsetTopBar: false,
                    bannerAtTop: !gradle.bannerAtBottom
                });

                admob.interstitial.config({
                    id: gradle.interstitial,
                    autoShow: false,
                });
            }
        }
        if(gradle.enableBanner && typeof admob!=='undefined'){
            admob.banner.prepare();
        }
        gradle.prepareInter();
         document.addEventListener('admob.banner.events.LOAD_FAIL', function(event) {
           gradle.log(event);
        });

        document.addEventListener('admob.banner.events.LOAD', function(event) {
           gradle.log(event);
        });

        document.addEventListener('admob.interstitial.events.LOAD_FAIL', function(event) {
           gradle.log(event);
        });

        document.addEventListener('admob.interstitial.events.LOAD', function(event) {
           gradle.log(event);
        });

        document.addEventListener('admob.interstitial.events.CLOSE', function(event) {
           gradle.log(event);
           admob.interstitial.prepare();
        });

		if(gradle.notifiBackbutton){
			document.addEventListener("backbutton", function() {
				var key=null;
				if(typeof game.state.getCurrentState().key!='undefined'){
					key = game.state.getCurrentState().key;
					switch(key){
						case 'MainMenu':
							key=null;
							break;
						case 'LevelsMap':
							game.state.start('MainMenu');
                        	break;
                        case 'Level':
                            game.state.start('LevelsMap');
                        	break;
					}
				}

				if(key==null){
					navigator.notification.confirm(gradle.notifiMessage, function(buttonIndex){
						if(buttonIndex == 1) {
	                        navigator.app.exitApp();
	                        return true;
	                    }
	                    else {
	                        return false;
	                    }
					});
				}
			}, !1);
		}
        document.addEventListener("visibilitychange", gradle.onVisibilityChanged, false);
		document.addEventListener("mozvisibilitychange", gradle.onVisibilityChanged, false);
		document.addEventListener("webkitvisibilitychange", gradle.onVisibilityChanged, false);
		document.addEventListener("msvisibilitychange", gradle.onVisibilityChanged, false);
		gradle.event('first_start');
		//document.body.addEventListener('load', function () {
		  window["game"] = new src.App();
		//}, false);
    },

    more: function(){
        (gradle.developer_link!=="")&&window.open(gradle.developer_link);
    },
	
	process: function(ev, msg){
		if(ev=='SCREEN_HOME'){
			gradle.hideSplash();
		}
		if(gradle.isMobile && typeof cordova!='undefined'){
			cordova.plugins.firebase.analytics.logEvent("event", {param1: ev});
		}
	},

    hideSplash: function(){
        if(gradle.isMobile && typeof cordova!='undefined'){
            cordova.exec(null, null, "SplashScreen", "hide", []);
        }
    },

    prepareInter: function(){
        if(!gradle.isMobile || typeof admob=='undefined' || admob==null) return;
        admob.interstitial.prepare();
    },

    showInter: function(){
        if(!gradle.isMobile || typeof admob=='undefined' || admob==null) return;
        admob.interstitial.show();
    },

    run : function(){
		gradle.isMobile ? document.addEventListener('deviceready', gradle.ready, false) :  gradle.ready();
    },
	
	onVisibilityChanged : function(){
		try{
			if (document.hidden || document.mozHidden || document.webkitHidden || document.msHidden){
				gradle_onPauseRequested();
			}else{
				gradle_onResumeRequested();
			}
		}catch(error){}
	},
	
	currentInterval : 0,
	unlock_all_levels : false,
    checkInterval: function(){
		return (++gradle.currentInterval==gradle.intervalAds) ? !(gradle.currentInterval=0) : !1;
	},
	
	buildKey : function(key){
        return "gd.4006."+key;
    },

    getStorage: function(key, default_value){
        var value;
        try {
            value = localStorage.getItem(gradle.buildKey(key));
        }
        catch(error){
			return default_value;
        }
		if(value !== undefined && value !=null){
            value = window.atob(value);
        }
		else{
			value = default_value;
		}
        return value;
    },

    setStorage: function(key, value){
        var v = value;
        if(v !== undefined){
            v = window.btoa(v);
        }
        try{
            localStorage.setItem(gradle.buildKey(key), v);
            return value;
        }
        catch(error){
            return undefined;
        }
    }
};

gradle.run();





