define(function(require) {
    var Backbone = require('backbone');
    return Backbone.Model.extend({
        defaults: {
            slopeAngle: 30,
            sideSupportLength: 5,
            truckDistanceFromEdge: 7.5,
            carDistanceFromEdge: 5,
            carMass: 1000,
            showCarMass: true,
            truckMass: 3000,
            showTruckMass: true,
            friction: 0.25,
            showFriction: true,
            cwMoment: 0,
            ccwMoment: 0,
            carMoment:0,
            truckMoment:0,
            rightNormalForce: 0,
            leftNormalForce: 0,
            forceCausingSliding: 0,
            forcePreventingSliding: 0,
            adjustTruck: true,
            adjustSlope: true,
            maxCarMass: 0,
            minFrictionCoeff: 0,
            showSpeechbubble: true,
            showMomentArrows: true

        },
        expose: function(adapter) {
            adapter.expose('slopeAngle', this, {
                alias: 'Slope.Angle'
            });
            adapter.expose('sideSupportLength', this, {
                alias: 'Truck.Side Support Length'
            });
            adapter.expose('truckDistanceFromEdge', this, {
                alias: 'Truck.Distance From Edge'
            });
            adapter.expose('carDistanceFromEdge', this, {
                alias: 'Car.Distance From Edge'
            });
            adapter.expose('truckMass', this, {
                alias: 'Truck.Mass'
            });
            adapter.expose('showTruckMass', this, {
                alias: 'Truck.Show Mass'
            });
            adapter.expose('carMass', this, {
                alias: 'Car.Mass'
            });
            adapter.expose('showCarMass', this, {
                alias: 'Car.Show Mass'
            });
            adapter.expose('friction', this, {
                alias: 'Slope.Friction Coefficient'
            });
            adapter.expose('showFriction', this, {
                alias: 'Slope.Show Friction Coefficient'
            });
            adapter.expose('cwMoment', this, {
                alias: 'Data.Clockwise Moment'
            });
            adapter.expose('ccwMoment', this, {
                alias: 'Data.Counterclockwise Moment'
            });
             adapter.expose('carMoment', this, {
                alias: 'Car.Moment'
            });
             adapter.expose('truckMoment', this, {
                alias: 'Truck.Moment'
            });
            adapter.expose('leftNormalForce', this, {
                alias: 'Data.Left Normal Force'
            });
            adapter.expose('rightNormalForce', this, {
                alias: 'Data.Right Normal Force'
            });
            adapter.expose('forcePreventingSliding', this, {
                alias: 'Data.Force Preventing Sliding'
            });
            adapter.expose('forceCausingSliding', this, {
                alias: 'Data.Force Causing Sliding'
            });
            adapter.expose('adjustTruck', this, {
                alias: 'Options.Adjust Truck'
            });
            adapter.expose('adjustSlope', this, {
                alias: 'Options.Adjust Slope'
            });
            adapter.expose('maxCarMass', this, {
                alias: 'Data.Max Car Mass'
            });
            adapter.expose('minFrictionCoeff', this, {
                alias: 'Data.Min Coefficient of Friction'
            });
            adapter.expose('showSpeechbubble', this, {
                alias: 'Options.Show Speech Bubble'
            });
            adapter.expose('showMomentArrows', this, {
                alias: 'Options.Show Moment Arrows'
            });
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
            return Number(this.get('truckDistanceFromEdge')).toFixed(2);
        },
        setTruckDistanceFromEdge: function(distance) {
            this.set('truckDistanceFromEdge', distance);
        },
        getCarDistanceFromEdge: function() {
            return Number(this.get('carDistanceFromEdge')).toFixed(2);
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
        },
        getCarMass: function() {
            return this.get('carMass');
        },
        setCarMass: function(mass) {
            this.set('carMass', mass);
        },
        getShowCarMass: function() {
            return this.get('showCarMass');
        },
        setShowCarMass: function(arg) {
            this.set('showCarMass', arg);
        },
        getTruckMass: function() {
            return this.get('truckMass');
        },
        setTruckMass: function(mass) {
            this.set('truckMass', mass);
        },
        getShowTruckMass: function() {
            return this.get('showTruckMass');
        },
        setShowTruckMass: function(arg) {
            this.set('showTruckMass', arg);
        },
        getFriction: function() {
            return this.get('friction');
        },
        setFriction: function(coeff) {
            this.set('friction', coeff);
        },
        getShowFriction: function() {
            return this.get('showFriction');
        },
        setShowFriction: function(arg) {
            this.set('showFriction', arg);
        },
        getCWMoment: function() {
            return Number(this.get('ccwMoment')).toFixed(2);
        },
        setCWMoment: function(moment) {
            this.set('cwMoment', moment);
        },
        getCCWMoment: function() {
            return Number(this.get('ccwMoment')).toFixed(2);
        },
        setCCWMoment: function(moment) {
            this.set('ccwMoment', moment);
        },
        getCarMoment: function() {
            return this.get('carMoment');
        },
        setCarMoment: function(moment) {
            this.set('carMoment', moment);
        },
        getTruckMoment: function() {
            return this.get('truckMoment');
        },
        setTruckMoment: function(moment) {
            this.set('truckMoment', moment);
        },
        getRightNormalForce: function() {
            return this.get('rightNormalForce');
        },
        setRightNormalForce: function(force) {
            this.set('rightNormalForce', force);
        },
        getLeftNormalForce: function() {
            return this.get('leftNormalForce');
        },
        setLeftNormalForce: function(force) {
            this.set('leftNormalForce', force);
        },
        getForcePreventingSliding: function() {
            return this.get('forcePreventingSliding');
        },
        setForceCausingSliding: function(force) {
            this.set('forceCausingSliding', force);
        },
        setForcePreventingSliding: function(force) {
            this.set('forcePreventingSliding', force);
        },
        getAdjustTruck: function() {
            return this.get('adjustTruck');
        },
        setAdjustTruck: function(adjustable) {
            this.set('adjustTruck', adjustable);
        },
        getAdjustSlope: function() {
            return this.get('adjustSlope');
        },
        setAdjustSlope: function(adjustable) {
            this.set('adjustSlope', adjustable);
        },
        getMaxCarMass: function() {
            return this.get('maxCarMass');
        },
        setMaxCarMass: function(mass) {
            this.set('maxCarMass', mass);
        },
        getMinFrictionCoeff: function() {
            return this.get('minFrictionCoeff');
        },
        setMinFrictionCoeff: function(coeff) {
            this.set('minFrictionCoeff', coeff);
        },
        getShowSpeechbubble: function() {
            return this.get('showSpeechbubble');
        },
        setShowSpeechbubble: function(show) {
            this.set('showSpeechbubble', show);
        },
        getShowMomentArrows: function() {
            return this.get('showMomentArrows');
        },
        setShowMomentArrows: function(show) {
            this.set('showMomentArrows', show);
        }
    });
});
