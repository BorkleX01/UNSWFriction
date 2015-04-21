/*global hDists, console, document*/
/*jshint expr: true*/
define(function(require) {
    var $ = require('jquery');
    describe('Horizontal distances', function() {
        var horizontalDistances = require('HorizontalDistances');
        var AppModel = require('AppModel');
        var hDists = null;
        var appModel = null;
        var model = null;

        var car = document.createElement('div');
        car.id = "distance-to-car-label";
        car.innerHTML = "before";
        document.body.appendChild(car);
        var leg = document.createElement('div');
        leg.id = "distance-to-leg-label";
        leg.innerHTML = "before";
        document.body.appendChild(leg);
        var legNotch = document.createElement('div');
        legNotch.id = "notch-at-leg";
        document.body.appendChild(legNotch);
        var truckNotch = document.createElement('div');
        truckNotch.id = "notch-at-truck";
        document.body.appendChild(truckNotch);
        var slopeBase = document.createElement('div');
        slopeBase.id = "slope-base"; 
        document.body.appendChild(slopeBase);
        var horDistances = document.createElement('div');
        horDistances.id = "horizontal-distances"; 
        document.body.appendChild(horDistances);
        
        beforeEach(function() {
            appModel = new AppModel();
            hDists =  horizontalDistances(appModel);
            model = appModel;

            
        });

        it('has a functional model', function() {
            expect(model).to.be.ok;
        });

        it('returns these figures and places them in text fields', function (){
            model.setTruckDistanceFromEdge(7.5);
            model.setSlopeAngle(30);
            model.setSideSupportLength(5);
            model.setCarDistanceFromEdge(5);
            horizontalDistances(appModel);
            $(document).ready(function(){
                expect($('#distance-to-car-label').html()).to.equal('7.17');
                expect($('#distance-to-leg-label').html()).to.equal('3.08');
            });
            

        });
        it('support leg distance identical to horizontal reckoning when slope is 0', function (){
            model.setTruckDistanceFromEdge(7.5);
            model.setSlopeAngle(0);
            model.setSideSupportLength(5);
            model.setCarDistanceFromEdge(5);
            horizontalDistances(appModel);
            $(document).ready(function(){
                expect($('#distance-to-car-label').html()).to.equal('7.50');
                expect($('#distance-to-leg-label').html()).to.equal('5.00');
            });
            

        });
        
    });
});
