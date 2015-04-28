define(function(require) {
    var $ = require('jquery');
    var ui = require('jquery-ui');
    var moment = require('Moment');
    var updateCarMass = function(){
        $('#car-mass').text(this.model.getCarMass() + ' kg');
        moment(this.model, this.capi);
    };
    var updateModel = function(){
        this.model.setCarMass(this.capi.getCarMass());
    };
    var hideCarMass = function(){

        if (this.capi.getShowCarMass()){
            $('#car-mass-text').show();
        }else{
            $('#car-mass-text').hide();
        }
        
    };

    return function(model, capi){
        this.model = model;
        this.capi = capi;
        model.on('change:carMass', updateCarMass, this);
        capi.on('change:carMass', updateModel, this);
        capi.on('change:showCarMass', hideCarMass, this);
    };
});
