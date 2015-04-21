/*global hDists, console, document*/
/*jshint expr: true*/
define(function(require) {
    var $ = require('jquery');
    var AppModel = require('AppModel');
    var appModel = null;
    var Capi = require('Capi');
    var model = null;
    var capi = null;


    var sideSupport = require('SupportLegs');
    var legs = null;
    
    var legLabel = document.createElement('div');
    legLabel.id = "distance-to-leg-label";
    legLabel.innerHTML = "before";
    document.body.appendChild(legLabel);

    var draggable_left_leg = document.createElement('div');
    draggable_left_leg.id = "draggable_left_leg";
    document.body.appendChild(draggable_left_leg);

    var draggable_right_leg = document.createElement('div');
    draggable_right_leg.id = "draggable_right_leg";
    document.body.appendChild(draggable_right_leg);


    var legGraphic = document.createElement('div');
    legGraphic.id = "draggable-left-leg";
    legGraphic.innerHTML = "before";
    document.body.appendChild(legGraphic);
    
    beforeEach(function() {
        appModel = new AppModel();
        model = appModel;
        capi = new Capi();
        legs = sideSupport(model, capi); 
    });
    describe('Side Support legs', function() {
        it('has a functional model', function() {
            expect(model).to.be.ok;
        });
        it('expect distance to leg to be same as horizontal reckoning when slope angle is 0', function (){
            model.setTruckDistanceFromEdge(7.5);
            model.setSlopeAngle(0);

            model.setSideSupportLength(3);
            model.setCarDistanceFromEdge(5);
            sideSupport(model, capi); 
            
            $(document).ready(function(){
                expect($('#distance-to-leg-label').html()).to.equal('3.00');
            });

        });
    });
});
