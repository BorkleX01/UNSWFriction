/*globals console*/
define(function(require) {
    var $ = require('jquery');
    var ui = require('jquery-ui');
    var updateHorizontalDistances = require('HorizontalDistances');
    var moment = require('Moment');
    var updateCarMass = function(){
        $('#car-mass').text(this.model.getCarMass() + ' kg');
        moment(this.model, this.capi);
    };
    var updateModel = function(){
        this.model.setCarMass(this.capi.getCarMass());
        this.model.setCarDistanceFromEdge(Number(this.capi.getCarDistanceFromEdge()));
    };
    var hideCarMass = function(){

        if (this.capi.getShowCarMass()){
            $('#car-mass-text').show();
        }else{
            $('#car-mass-text').hide();
        }
        
    };
    var carPlacementAestheticShim = 6;
    var updateCarDistance = function(){
        
        var carLeftPosX = $('#slope-base').position().left - this.model.m2px(this.model.getCarDistanceFromEdge());
        this.horizontalDistancesXPos = carLeftPosX+"px";
        $('#horizontal-distances').css({"left" : carLeftPosX+"px"});
        this.$carSprite.css({'left' : (parseInt(this.horizontalDistancesXPos) - $('.car').width()/2 - carPlacementAestheticShim)+'px'});
        updateHorizontalDistances(this.model, this.capi);
        
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
        capi.on('change:carDistanceFromEdge', updateModel, this);
    };
});
