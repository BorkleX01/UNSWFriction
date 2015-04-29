/*globals console, Math, $, require*/
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
    var updateCarDistance = function(){
        
        this.$carSprite.css({'left' : (parseInt(this.horizontalDistancesXPos) - $('.car').width()/2 - 6)+'px'});
        
    };

    return function(model, capi){
        this.model = model;
        this.capi = capi;
        this.horizontalDistancesXPos = $('#horizontal-distances').css('left');
        this.$carSprite = $('.car , .car-greyed');
        
        model.on('change:carMass', updateCarMass, this);
        capi.on('change:carMass', updateModel, this);
        capi.on('change:showCarMass', hideCarMass, this);

        updateCarDistance();
        model.on('change:carDistanceFromEdge', updateCarDistance, this);
    };
});
