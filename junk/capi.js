BackboneAdapter.expose("AdjustSlope", view.model, {
    allowedValues: ['true', 'false'],
    alias: "Options.AdjustSlope"
});


BackboneAdapter.expose("AdjustTruck", view.model, {
    allowedValues: ['true', 'false'],
    alias: "Options.AdjustTruck"
});



BackboneAdapter.expose("Mode", view.model, {
    allowedValues: ['true', 'false'],
    alias: "Options.Mode"
});



BackboneAdapter.expose("FrictionCoefficient", view.model, {
    allowedValues: ['true', 'false'],
    alias: "Slope.FrictionCoefficient"
});

BackboneAdapter.expose("Angle", view.model, {
    allowedValues: ['true', 'false'],
    alias: "Slope.Angle"
});


BackboneAdapter.expose("DistanceFromEdge", view.model, {
    allowedValues: ['true', 'false'],
    alias: "Car.DistanceFromEdge"
});


BackboneAdapter.expose("Mass", view.model, {
    allowedValues: ['true', 'false'],
    alias: "Car.Mass"
});


BackboneAdapter.expose("CounterClockwiseMoment", view.model, {
    allowedValues: ['true', 'false'],
    alias: "Data.CounterClockwiseMoment"
});


BackboneAdapter.expose("ClockwiseMoment", view.model, {
    allowedValues: ['true', 'false'],
    alias: "Data.ClockwiseMoment"
});


BackboneAdapter.expose("LeftNormalForce", view.model, {
    allowedValues: ['true', 'false'],
    alias: "Data.LeftNormalForce"
});


BackboneAdapter.expose("ForceCausingSliding", view.model, {
    allowedValues: ['true', 'false'],
    alias: "Data.ForceCausingSliding"
});


BackboneAdapter.expose("ForcePreventingSliding", view.model, {
    allowedValues: ['true', 'false'],
    alias: "Data.ForcePreventingSliding"
});


BackboneAdapter.expose("MaxCarMass", view.model, {
    allowedValues: ['true', 'false'],
    alias: "Data.MaxCarMass"
});


BackboneAdapter.expose("MinCoefficientOfFriction", view.model, {
    allowedValues: ['true', 'false'],
    alias: "Data.MinCoefficientOfFriction"
});


BackboneAdapter.expose("showSpeechBubble", view.model, {
    allowedValues: ['true', 'false'],
});


BackboneAdapter.expose("showMomentArrowsOnSupportA", view.model, {
    allowedValues: ['true', 'false'],
});


