define(function(require) {
    var Backbone = require('backbone');
    return Backbone.Model.extend({
        defaults: {
            slopeAngle: 30,
            sideSupportLength: 5,
            truckDistanceFromEdge: 7.5
        },
        getSlopeAngle: function() {
            return this.get('slopeAngle');
        },
        setSlopeAngle: function(angle) {
            this.set('slopeAngle', angle);
        }
    });
});
