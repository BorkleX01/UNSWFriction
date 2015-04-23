define(function(require) {
    var Backbone = require('backbone');
    return Backbone.Model.extend({
        defaults: {
            slopeAngle: 30,
            sideSupportLength: 5,
            truckDistanceFromEdge: 7.5,
            carDistanceFromEdge: 5,
            pixelScale: 25,
            cgHeightTruck: 2.5 //to match with graphics
        },
        getSlopeAngle: function() {
            return this.get('slopeAngle');
        },
        setSlopeAngle: function(angle) {
            this.set('slopeAngle', angle);
        },
        getSideSupportLength: function() {
            return this.get('sideSupportLength');
        },
        setSideSupportLength: function(length) {
            this.set('sideSupportLength', length);
        }, 
        getTruckDistanceFromEdge: function() {
            return this.get('truckDistanceFromEdge');
        },
        setTruckDistanceFromEdge: function(distance) {
            this.set('truckDistanceFromEdge', distance);
        },
        getCarDistanceFromEdge: function() {
            return this.get('carDistanceFromEdge');
        },
        setCarDistanceFromEdge: function(distance) {
            this.set('carDistanceFromEdge', distance);
        },
        px2m: function(pixels) {
            return pixels/this.get('pixelScale');
        },
        m2px: function(meters) {
            return meters*this.get('pixelScale');
        },
        angle: function() {
            return this.get('slopeAngle') * Math.PI / 180;
        },
        getCGTruckHeight: function() {
            return this.get('cgHeightTruck');
        }
        


    });
});
