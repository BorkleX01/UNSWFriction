/*globals console, Math, $, require*/
define(function(require) {
    var Backbone = require('backbone');
    var g = 9.18;
    return Backbone.Model.extend({
        defaults: {
            slopeAngle: 30,
            sideSupportLength: 5,
            truckDistanceFromEdge: 7.5,
            carDistanceFromEdge: 5,
            pixelScale: 25,
            cgHeightTruck: 2.5, 
            truckCraneHeight: 6,
            beamLength: 0,
            carMass: 1000,
            truckMass: 3000,
            friction: 0.25,
            carToSupport: 0,
            supportToTruck: 0,
            cwMoment: 0,
            ccwMoment: 0,
            carMoment:0,
            truckMoment:0,
            rightNormalForce: 0,
            leftNormalForce: 0,
            forcePreventingSliding: 0,
            momentCircleXPos: 0,
            momentCircleYPos: 0
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
        setCGTruckHeight: function(height) {
            return this.set('cgHeightTruck', height);
        },
        getCGTruckHeight: function() {
            return this.get('cgHeightTruck');
        },
        getTruckCraneHeight: function() {
            return this.get('truckCraneHeight');
        },
        
        getBeamLength: function() {
            var length = this.getCarDistanceFromEdge()-(this.getTruckCraneHeight()*Math.sin(this.angle()))+this.getTruckDistanceFromEdge();
            return length;
            
        },
        getCarMass: function() {
            return this.get('carMass');
        },
        setCarMass: function(mass) {
            this.set('carMass', mass);
        },
        getTruckMass: function() {
            return this.get('truckMass');
        },
        setTruckMass: function(mass) {
            this.set('truckMass', mass);
        },
        getFriction: function() {
            return this.get('friction');
        },
        setFriction: function(coeff) {
            this.set('friction', coeff);
        },
        getCarToSupport: function() {
            return this.get('carToSupport');
        },
        setCarToSupport: function(distance) {
            this.set('carToSupport', distance);
        },
        getSupportToTruck: function() {
            return this.get('supportToTruck');
        },
        setSupportToTruck: function(arg) {
            this.set('supportToTruck', arg);
        },
       
        getCWMoment: function() {
            var moment =  -1*this.getTruckMass()*g*this.getSupportToTruck();
            return moment;
        },
        
        getCCWMoment: function() {
            var moment = this.getCarMass()*g*this.getCarToSupport();
            return moment;
        },
       
        getCarMoment: function() {
            var moment = this.getCarMass()*g*Math.cos(this.angle())*(this.getBeamLength() - this.getSideSupportLength())+this.getCarMass()*g*Math.cos(this.angle())*this.getTruckCraneHeight();
            return moment;
        },
        
        getTruckMoment: function() {
            var moment = (-1*this.getTruckMass()*g*Math.cos(this.angle())*this.getSideSupportLength())+this.getTruckMass()*g*Math.sin(this.angle())*this.getCGTruckHeight();
            return moment;
        },
        
        getRightNormalForce: function() {
            var force = (-1*this.getCarMoment()-this.getTruckMoment())/(2*this.getSideSupportLength());
            return force;
        },
        
        getLeftNormalForce: function() {
            var force = this.getCarMass()*g*Math.cos(this.angle())+this.getTruckMass()*g*Math.cos(this.angle())-this.getRightNormalForce();
            return force;
        },
        
        getForcePreventingSliding: function() {
            var force = (this.getRightNormalForce()+this.getLeftNormalForce())*this.getFriction();
             return force;
        },
        
        getMomentCircleXPos: function() {
            return this.get('momentCircleXPos');
        },
        setMomentCircleXPos: function(pos) {
            this.set('momentCircleXPos', pos);
        },
        getMomentCircleYPos: function() {
            return this.get('momentCircleYPos');
        },
        setMomentCircleYPos: function(pos) {
            this.set('momentCircleYPos', pos);
        }

    });
});
