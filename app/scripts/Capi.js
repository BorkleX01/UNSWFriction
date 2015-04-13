define(function(require) {
    var Backbone = require('backbone');
    return Backbone.Model.extend({
        defaults: {
            truckDistanceFromEdge: 7.5,
        },
        expose: function(adapter) {

            adapter.expose('truckDistanceFromEdge', this, {
                alias: 'Truck.Distance From Edge'
            });
        },
        getTruckDistanceFromEdge: function() {
            return this.get('truckDistanceFromEdge');
        },
        setTruckDistanceFromEdge: function(distance) {
            this.set('truckDistanceFromEdge', distance);
        },
    });
});
