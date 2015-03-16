define(['backbone'], function(Backbone) {
    var model = Backbone.Model.extend({

        defaults: {
	    Options.AdjustSlope = 'false';
	    Options.AdjustTruck = 'false';
	    Options.Mode = 'none';
	    Slope.FrictionCoefficient = 0.25;
	    Slope.Angle = 30;
	    Car.DistanceFromEdge = 5;
	    Car.Mass = 1000;
	    Truck.SideSupportLength = 5;
	    Truck.DistanceFromEdge = 7.5;
	    Truck.Mass = 3000;
	    Data.CounterClockwiseMoment = 0;
	    Data.ClockwiseMoment = 0;
	    Data.LeftNormalForce = 0;
	    Data.ForceCausingSliding = 0;
	    Data.ForcePreventingSliding = 0;
	    Data.MaxCarMass = 0;
	    Data.MinCoefficientOfFriction = 0;
	    showSpeechBubble = 'false';
	    showMomentArrowsOnSupportA = 'false';
	    
	}   
	    
    })
	

});

