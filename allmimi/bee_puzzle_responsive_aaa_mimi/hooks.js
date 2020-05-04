/**
	GRADLE - KNOWLEDGE IS POWER
    ***** PROPRIETARY CODE *****
    @author : gradle (gradlecode@outlook.com)
	@date: 07/11/2019 14:47:00
	@version_name: gradle-logic
	@version_code: v5.6.0
	copyright @2019
*/

var gradle = {
    debug : true,
	isMobile : false,//( /(ipad|iphone|ipod|android|windows phone)/i.test(navigator.userAgent) ),

	//Ads information :
	//===================
    banner         : 'ca-app-pub-3940256099942544/6300978111', //id placement banner
    interstitial   : 'ca-app-pub-3940256099942544/1033173712', //id placement interstitial

    isTesting      : true, //Ads mode testing. set to false for a production mode.
    enableBanner   : true, //Ads enable the banner. set to false to disable the banner.
    bannerAtBottom : true, //if false the banner will be at top
    overlap        : false,

	intervalAds    : 3,     //Ads each interval for example each 3 times

	//Events manager :
	//================
    event: function(ev, msg){
        gradle.log(ev,msg);
        switch(ev){
            case 'first_start':   //First start
                //gradle.showInter();
                break;
			case 'EVENT_LEVELSTART': //Button play
                gradle.showInter();
                break;
			case 'EVENT_LEVELRESTART':
                gradle.checkInterval() && gradle.showInter(); // <-- we check the interval if ok we show interstitial
                break;
			case 'oveer_button_back':
                //gradle.showInter();
                break;
			case 'SCREEN_GAMERESULT':
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
			case 'test':
				//gradle.checkInterval() && gradle.showInter();
                break;			
        }
    },
	

    log: function(val,msg){
        val && gradle.debug && console.log( gradle.isMobile && (typeof val === 'object' && val !== null) ? JSON.stringify(val) : val );
        msg && gradle.debug && console.log( gradle.isMobile && (typeof msg === 'object' && msg !== null) ? JSON.stringify(msg) : msg );
    },
	
	
	//Ready : /!\ DO NOT CHANGE, ONLY IF YOU ARE AN EXPERT.
	//=========================
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

		//document.addEventListener("backbutton", function() {}, !1); - 1 < navigator.userAgent.indexOf("Windows Phone") && (SOUNDS_ENABLED = !1);
        document.addEventListener("visibilitychange", gradle.onVisibilityChanged, false);
		document.addEventListener("mozvisibilitychange", gradle.onVisibilityChanged, false);
		document.addEventListener("webkitvisibilitychange", gradle.onVisibilityChanged, false);
		document.addEventListener("msvisibilitychange", gradle.onVisibilityChanged, false);
		gradle.event('first_start');
		extGameLoad();
		gradle.hideSplash();
    },

    more: function(){
        (gradle.developer_link!=="")&&window.open(gradle.developer_link);
    },

    hideSplash: function(){
        if(gradle.isMobile){
            setTimeout(function(){
                cordova.exec(null, null, "SplashScreen", "hide", []);
            },300);
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
        gradle.log('gradle run ...');
        gradle.isMobile ? document.addEventListener('deviceready', gradle.ready, false) :  gradle.ready();
    },
	
	onVisibilityChanged : function(){
		try{
			if (document.hidden || document.mozHidden || document.webkitHidden || document.msHidden){
				//snd_active && snd_track.pause();
			}else{
				//snd_active && snd_track.play();
			}
		}catch(error){}
	},
	
	currentInterval : 0,
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





