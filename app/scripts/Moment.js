/*globals console*/
define(function(require) {
    var $ = require('jquery');

    return function(model, capi){
        this.model = model;
        this.capi = capi;

        
        
        capi.setCWMoment(Number(model.getCWMoment().toFixed(2)));

        capi.setCCWMoment(Number(model.getCCWMoment().toFixed(2)));

        capi.setCarMoment(Number(model.getCarMoment().toFixed(2)));
        
        capi.setTruckMoment(Number(model.getTruckMoment().toFixed(2)));

        capi.setRightNormalForce(Number(model.getRightNormalForce().toFixed(2)));

        capi.setLeftNormalForce(Number(model.getLeftNormalForce().toFixed(2)));

        capi.setForcePreventingSliding(Number(model.getForcePreventingSliding().toFixed(2)));

        capi.setForceCausingSliding(Number(model.getForceCausingSliding().toFixed(2)));

        capi.setMaxCarMass(Number(model.getMaxCarMass()).toFixed(2));

        capi.setMinFrictionCoeff(Number(model.getMinFrictionCoeff()).toFixed(2));
        
        if(((model.getCCWMoment() > -1*model.getCWMoment()) || (model.getForceCausingSliding() > model.getForcePreventingSliding())) && capi.getShowSpeechbubble()){
            $('#distress-bubble').toggle(true);
        }else{
            $('#distress-bubble').toggle(false);
        }

        $('#leg-drag-thumb').css({'left':model.getMomentCircleXPos() +'px', 'top':model.getMomentCircleYPos() +'px'});

        
    };
});
