/*global hDists, console, document*/
/*jshint expr: true*/
define(function(require) {
    var $ = require('jquery');
    describe('Truck', function() {
        var AppModel = require('AppModel');
        var Capi = require('Capi');

        var model = null;
        var capi = null;

        var truck = require('Truck');

        var textBox = $('body').append('<input class="input-box" value="7.5" id="truck-to-edge"/>');
        var notchAtLeg  = $('body').append('<div id="notch-at-leg"/>');
        var slopeBase  = $('body').append('<div id="slope-base"/>');
        var notchAtTruck  = $('body').append('<div id="notch-at-truck"/>');
        var horizontalDistances  = $('body').append('<div id="horizontal-distances"/>');
        var draggableTruck  = $('body').append('<div id="draggable-truck"/>');
        var truckGraphic  = $('#draggable-truck').append('<div class="truck"/>');
        
        beforeEach(function() {
            
            model = new AppModel();
            capi = new Capi();
            truck(model, capi);
            
            
            
            
        });

        it('has a functional model', function() {
            
            expect(model).to.be.ok;
        });
        
        it('updates textbox value when model chages' , function (){
            model.setTruckDistanceFromEdge(5);
            expect($('#truck-to-edge').val()).to.equal('5.0');
        });
        
    });
});
