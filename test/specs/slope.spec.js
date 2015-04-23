/*global hDists, console, document*/
/*jshint expr: true*/
define(function(require) {
    var $ = require('jquery');
    var AppModel = require('AppModel');
    var Capi = require('Capi');
    var model = null;
    var capi = null;
    var slope = require('SlopeAngle');
    
    var textBox = $('body').append('<input class="input-box" value="30" id="slope-angle"/>');
    beforeEach(function() {
        model = new AppModel();
        capi = new Capi();
        slope(model, capi);
    });
    describe('Slope angle', function() {
        
        it('has a functional model', function() {
            expect(model).to.be.ok;
        });
        it('text box reflects the model angle', function() {
            model.setSlopeAngle(15);
            slope(model, capi);
            expect($('#slope-angle').val()).to.equal('15');
        });
    });
    
});
