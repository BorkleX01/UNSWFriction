define(function(require) {
    var $ = require('jquery');
    var ui = require('jquery-ui');
    var updateHorizontalDistances = require('HorizontalDistances');
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

    return function(model, capi){
        this.model = model;
        this.capi = capi;
        updateFriction();
        updateHorizontalDistances(model, capi);
        model.on('change:friction', updateFriction, this);
        capi.on('change:friction', updateModel, this);
        capi.on('change:showFriction', hideFrictionInput, this);
        $('#friction').change(function(){
            model.setFriction($('#friction').val());
            capi.setFriction($('#friction').val());
            
        });
    };
});
