define(function(require) {
    

    return function(model, capi){
        this.model = model;
        this.capi = capi;
                    
        capi.setCWMoment(model.getCWMoment().toFixed(2));

        capi.setCCWMoment(model.getCCWMoment().toFixed(2));

        capi.setCarMoment(model.getCarMoment().toFixed(2));
        capi.setTruckMoment(model.getTruckMoment().toFixed(2));
        capi.setRightNormalForce(model.getRightNormalForce().toFixed(2));
        capi.setLeftNormalForce(model.getLeftNormalForce().toFixed(2));
        capi.setForcePreventingSliding(model.getForcePreventingSliding().toFixed(2));
    };
});
