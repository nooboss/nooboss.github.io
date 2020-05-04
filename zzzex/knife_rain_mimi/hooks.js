gradle = {...gradle,...{/**
GRADLE - KNOWLEDGE IS POWER
***** PROPRIETARY CODE *****
@author : gradle (gradlecode@outlook.com)
@update: 29/02/2020 14:39:00
@version_name: gradle-logic
@version_code: v6.0.0
copyright @2012-2020
*/
    
	//Ads information
	//===============
	banner             : 'ca-app-pub-3940256099942544/6300978111', //id placement banner
    interstitial       : 'ca-app-pub-3940256099942544/1033173712', //id placement interstitial
	
    isTesting          : true, //Ads mode testing. set to false for a production mode.
    enableBanner       : true, //Ads enable the banner. set to false to disable the banner.
    enableInterstitial : true, //Ads enable the interstitial. set to false to disable all interstitials.

    bannerAtBottom     : true, //if false the banner will be at top
    overlap            : false,

	notifiBackbutton   : true, //for confirmation backbutton
	notifiMessage      : 'Do you want to exit the game ?',

	intervalAds        : 3,     //Ads each interval for example each n times
	
	fullsize		   : true,


	//Events manager :
	//================
    event: function(ev, msg){ gradle.process(ev,msg);switch(ev){
		
		case 'first_start':
			//gradle.showInter();
			break;
		case 'button_play':
			gradle.showInter();
			break;
		case 'over_button_restart':
			gradle.checkInterval() && gradle.showInter(); // <-- we check the interval if ok we show interstitial
			break;
		case 'oveer_button_back':
			//gradle.showInter();
			break;
		case 'game_over':
			//gradle.showInter();
			break;
		case 'game_revive':
			//gradle.showInter();
			break;
		case 'test':
			//gradle.checkInterval() && gradle.showInter();
			break;		
		
    }}
	
}};

gradle.run();


