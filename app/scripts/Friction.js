define(function(require) {
    var $ = require('jquery');
    var ui = require('jquery-ui');
    var updateHorizontalDistances = require('HorizontalDistances');
    var moment = require('Moment');

    var updateFriction = function(){
        $('#friction').val(this.model.getFriction());
        updateHorizontalDistances(this.model, this.capi);
    };
    var updateModel = function(){
        this.model.setFriction(this.capi.getFriction());
    };
    var hideFrictionInput = function(){

        if (this.capi.getShowFriction()){
            $('#friction-input').show();
        }else{
            $('#friction-input').hide();
        }
        
    };
    var updateMoment = function(){
        moment(this.model, this.capi);
    };
    var toggleMomentCircle = function(){
        if (this.capi.getShowMomentArrows())
        {
            $('#moment-circle').toggle(true);
        }
        else
        {
            $('#moment-circle').toggle(false);
        }
    };

    return function(model, capi){
        this.model = model;
        this.capi = capi;
        updateFriction();
        updateHorizontalDistances(model, capi);
        model.on('change:friction', updateFriction, this);
        capi.on('change:friction', updateModel, this);
        capi.on('change:showFriction', hideFrictionInput, this);
        capi.on('change:showSpeechbubble', updateMoment, this);
        capi.on('change:showMomentArrows', toggleMomentCircle, this);
        
        $('#friction').change(function(){
            if($('#friction').val()<0.04){$('#friction').val(0.04);}
            if($('#friction').val()>0.99){$('#friction').val(0.99);}
            model.setFriction($('#friction').val());
            capi.setFriction($('#friction').val());
            
        });
    };
});
