define(function(require) {
    var Backbone = require('backbone');
    return Backbone.Model.extend({
        defaults: {
            slopeAngle: 30,
            sideSupportLength: 5,
            truckDistanceFromEdge: 7.5
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
        },
        getSlopeAngle: function() {
            return this.get('slopeAngle');
        },
        setSlopeAngle: function(angle) {
            this.set('slopeAngle', angle);
        }
    });
});
