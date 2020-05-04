var CURVE_FROM_RIGHT = 0;
var CURVE_FROM_LEFT = 1;

function CModuleLetters(oSpriteContainer, oForeGroundContainer){
    
    var _bCurveActiveFromRight;
    var _bCurveDoneFromRight;
    var _bCurveActiveFromLeft;
    var _bCurveDoneFromLeft;
    
    var _iCurLetterToLit = 0;
    
    var _aLetters;
    var _aLettersLit;
    var _aLettersAlreadyLit;
    
    var _oEye;
    var _oArrowLeft;
    var _oArrowRight;
    var _oButtonSystem;
    var _oLogo;
    var _oParent;
    
    this._init = function(oSpriteContainer, oForeGroundContainer){
        _bCurveActiveFromRight = false;
        _bCurveDoneFromRight = false;
        _bCurveActiveFromLeft = false;
        _bCurveDoneFromLeft = false;
        
        this._addSprite();
        
        this._addCurveGate();
        this._addCurveSystemButton();
        this._addArrows();
        this._addLetters();
        this._addLogo();
    };
    
    this._addSprite = function(){
        
        var oTunnelContainer = new createjs.Container();
        oTunnelContainer.x = 382;
        oTunnelContainer.y = 560;
        oForeGroundContainer.addChild(oTunnelContainer);
        
        var oSprite = s_oSpriteLibrary.getSprite('curve_tunnel');
        var oTunnel = createBitmap(oSprite);
        oTunnel.regX = oSprite.width/2;
        oTunnel.regY = oSprite.height/2;
        oTunnelContainer.addChild(oTunnel);
        
        var oEyeContainer = new createjs.Container();
        oEyeContainer.x = -16;
        oEyeContainer.y = -52;
        oTunnelContainer.addChild(oEyeContainer);
        
        var oSprite = s_oSpriteLibrary.getSprite('eye');
        _oEye = createBitmap(oSprite);
        _oEye.regX = oSprite.width/2;
        _oEye.regY = oSprite.height/2;
        oEyeContainer.addChild(_oEye);
        
    };
    
    this._addCurveSystemButton = function(){
        var iWidth = 40;
        var iHeight = 8;
        var iX = 324;
        var iY = 806;
        var iOffset = 20;
        var iAngle = 0;
        var iNumButton = 3;
        
        _oButtonSystem = new CButtonSystem();
        _oButtonSystem.setAutoReset(false);
        var oSprite = s_oSpriteLibrary.getSprite('curve_light_button');
        for(var i=0; i<iNumButton; i++){
            _oButtonSystem.addButton(iWidth, iHeight, iX  + i*(iWidth +iOffset), iY, iAngle, oSprite, 0, 20, oSpriteContainer);
        }
        
        _oButtonSystem.addAllButtonHitListener(this._onAllButtonPress);
        _oButtonSystem.addSingleButtonListener(/*(function(){trace("SINGLE")}*/s_oScoreController.addButtonScore);
        _oButtonSystem.setResititution(0.33);
    };
    
    this._onAllButtonPress = function(){
        if(!_bCurveActiveFromRight && !_bCurveActiveFromLeft){
            if(Math.random() < 0.5){
                _bCurveActiveFromRight = true;
                _oArrowRight.highlight(500);
            }else {
                _bCurveActiveFromLeft = true;
                _oArrowLeft.highlight(500);
            }
        } else if(_bCurveActiveFromRight && !_bCurveActiveFromLeft) {
            _bCurveActiveFromLeft = true;
            _oArrowLeft.highlight(500);
        } else if(!_bCurveActiveFromRight && _bCurveActiveFromLeft) {
            _bCurveActiveFromRight = true;
            _oArrowRight.highlight(500);
        }
    };
    
    this._allLettersAreLit = function(){
        for(var i=0; i<_aLettersLit.length; i++){
            if(!_aLettersLit[i]){
                return false;
            }
        };
        
        return true;
    };
    
    this._onAllLettersLit = function(){
        playSound("all_letters_complete", 1, false);
        
        s_oScoreController.addAllLettersScore();
        _oParent.hardReset();
        
        s_oTable.enableShieldBonus();
        s_oTable.enableExtraBallBonus();
    };
    
    this._addCurveGate = function(){
        var oGate = new CGateSystem(368, 620);
        oGate.addGate(60,8, 90);

        var iIDPass = 0;
        var iIDNotPass = 1;

        oGate.addOpener(40,32, 12, iIDPass, CURVE_FROM_RIGHT);
        oGate.addOpener(-52,32, 12, iIDPass, CURVE_FROM_LEFT);
        
        oGate.addCloser(-116,176, 12, iIDNotPass);
        oGate.addCloser(152,176, 12, iIDNotPass);
        oGate.addPassingGateListener(this._curvePassed);
    };
    
    this._curvePassed = function(iDirection){
        s_oScoreController.addGateScore();
        if(iDirection === CURVE_FROM_RIGHT && _bCurveActiveFromRight && !_bCurveDoneFromRight){
            trace("CURVE FROM RIGHT")
            _bCurveDoneFromRight = true;
            _oArrowRight.lit(true);
            _oButtonSystem.restart();
            
            _oParent._tryToFlashARandomLetter();
        }else if(iDirection === CURVE_FROM_LEFT && _bCurveActiveFromLeft && !_bCurveDoneFromLeft){
            trace("CURVE FROM LEFT")
            _bCurveDoneFromLeft = true;
            _oArrowLeft.lit(true);
            _oButtonSystem.restart();
            
            _oParent._tryToFlashARandomLetter();
        }
        
        if(_bCurveDoneFromRight && _bCurveDoneFromLeft){
            trace("LETTER LIT");
            _oParent.restart();
            _aLetters[_iCurLetterToLit].lit(true);
            _aLettersLit[_iCurLetterToLit] = true;
            _aLettersAlreadyLit[_iCurLetterToLit] = true;

            playSound("letter", 1, false);
            s_oScoreController.addSingleLettersScore();
            
            if(_oParent._allLettersAreLit()){
                _oParent._onAllLettersLit();
            }
        }
        
    };
    
    this._tryToFlashARandomLetter = function(){
        if( (!_bCurveDoneFromRight && _bCurveDoneFromLeft) || (_bCurveDoneFromRight && !_bCurveDoneFromLeft) ){
            trace("FLASHING A RANDOM LETTER");
            
            do{
                _iCurLetterToLit = Math.floor( Math.random()*_aLetters.length );
            } while(_aLettersLit[_iCurLetterToLit]);
            
            
            
            _aLetters[_iCurLetterToLit].highlight(1000);
            _aLettersLit[_iCurLetterToLit] = false;
        }
    };
    
    this._addArrows = function(){
        
        var oPos = {x: 408, y: 880};
        
        var oSprite = s_oSpriteLibrary.getSprite('arrow_light_0');
        _oArrowLeft = new CLightIndicator(oSprite, oPos.x-136, oPos.y, oSpriteContainer);
        _oArrowLeft.rotate(-20);

        
        var oSprite = s_oSpriteLibrary.getSprite('arrow_light_0');
        _oArrowRight = new CLightIndicator(oSprite, oPos.x+112, oPos.y-20, oSpriteContainer);
        _oArrowRight.rotate(0);
    };
    
    this._addLetters = function(){
        _aLetters = new Array();
        _aLettersLit = new Array();
        _aLettersAlreadyLit = new Array();
        for(var i=0; i<7; i++){
            var oSprite = s_oSpriteLibrary.getSprite('letter_'+i);
            var oLetter = new CLightIndicator(oSprite, LETTERS_POSITION[i].x, LETTERS_POSITION[i].y, oSpriteContainer);
            _aLetters.push(oLetter);
            
            _aLettersLit[i] = false;
            _aLettersAlreadyLit[i] = false;
        }
        
        _aLettersLit = new Array();
        _aLettersAlreadyLit = new Array();
        for(var i=0; i<_aLetters.length; i++){
            _aLettersLit[i] = false;
            _aLettersAlreadyLit[i] = false;
        }
        
    };
    
    this._addLogo = function(){
        var oSprite = s_oSpriteLibrary.getSprite('logo');
        _oLogo = new CLightIndicator(oSprite, 540, 1140, oSpriteContainer);
        
        this.animLogo();
    };
    
    this.animLogo = function(){
        _oLogo.slowHighlight(2000, 1000, _oParent.animLogo);
    };
    
    this.stopAnimLogo = function(){
        _oLogo.slowOff(1000, 0);
    };
    
    this.restart = function(){
        _bCurveActiveFromRight = false;
        _bCurveDoneFromRight = false;
        _bCurveActiveFromLeft = false;
        _bCurveDoneFromLeft = false;
        _oArrowRight.flashing();
        _oArrowLeft.flashing();
        _oButtonSystem.restart();
    };  
    
    this.reset = function(){
        _oParent.restart();
        _oArrowRight.slowOff();
        _oArrowLeft.slowOff();
        _oButtonSystem.reset();
        for(var i=0; i<_aLetters.length; i++){
            _aLettersLit[i] = false;
            if(_aLettersAlreadyLit[i]){
                _aLetters[i].lit(true);
            }else {
                _aLetters[i].lit(false);
            }
        }
    };
    
    this.hardReset = function(){
        this.restart();
        for(var i=0; i<_aLetters.length; i++){
            _aLettersLit[i] = false;
            _aLettersAlreadyLit[i] = false;
            _aLetters[i].flashing();
            _oLogo.flashing();
        }
    };
    
    this.update = function(){
        _oEye.x = s_oGame.getBallSprite().x - _oEye.parent.parent.x;
        _oEye.y = s_oGame.getBallSprite().y - _oEye.parent.parent.y;
        
        var iCurAngle =  Math.atan2(_oEye.y,_oEye.x);

        if(Math.pow(_oEye.x,2) + Math.pow(_oEye.y,2) > Math.pow(14,2)){
            _oEye.x = 14 * Math.cos(iCurAngle);
            _oEye.y = 14 * Math.sin(iCurAngle);            
        }              
    };
    
    _oParent = this;
    this._init(oSpriteContainer, oForeGroundContainer);
    
}


