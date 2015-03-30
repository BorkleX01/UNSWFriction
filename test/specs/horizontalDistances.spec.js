/*global hDists, console*/
/*jshint expr: true*/
define(function(require) {
    var $ = require('jquery');
    describe('Horizontal distances', function() {
        var HorizontalDistances = require('HorizontalDistances');
        var AppModel = require('AppModel');
        var hDists = null;
        var appModel = null;
        var model = null;
        beforeEach(function() {
            appModel = new AppModel();
            hDists = new HorizontalDistances($('#distance-to-car-label'), $('#distance-to-leg-label'), appModel);
            model = hDists.model;
        });

        it('model present', function() {
            expect(model).to.be.ok;
        });

        it('Truck from edge horizontal measure sane trigonometry', function() {
            expect(hDists.horizontal_distance_truck_from_edge(model)).to.be.below(model.getTruckDistanceFromEdge());
        });

        it('Truck from edge horizontal measure should be 3.08 if truck is 5 meters from edge:', function() {
            
            model.setTruckDistanceFromEdge(5);
            expect(hDists.horizontal_distance_truck_from_edge(model)).to.be.within(3 , 4);
            console.log(hDists.horizontal_distance_truck_from_edge(model));
        });

        it('Left support from edge sane trigonometry', function() {

            expect(hDists.horizontal_distance_left_support_from_edge(model)).to.be.below(
                model.getTruckDistanceFromEdge() - model.getSideSupportLength());
            
        });
        it('Left support from edge ', function() {

            model.setTruckDistanceFromEdge(4);
            model.setSideSupportLength(3);
            expect(hDists.horizontal_distance_left_support_from_edge(model)).to.be.within(0.8, 0.9);
            
        });

        it('Horizontal extention of support leg is the horizontal distances of the truck from the edge minus that of the leg from the edge', function() {

            expect(hDists.horizontal_distance_truck_from_support(model))
                .to.equal(
                    hDists.horizontal_distance_truck_from_edge(model) - hDists.horizontal_distance_left_support_from_edge(model)
                );
        });

        it('Horizontal distance of car from leg is model car from edge value plus calculated hor distance of support from edge ', function() {

            expect(hDists.horizontal_distance_car_from_support(model))
                .to.equal(
                    model.getCarDistanceFromEdge() + hDists.horizontal_distance_left_support_from_edge(model)
                );
        });


    });
});
