/*globals console, Math, $, require*/
define(function(require) {

    var $ = require('jquery');
    var ui = require('jquery-ui');
    var updateHorizontalDistances = require('HorizontalDistances');
    var slope = require('SlopeAngle');
    var legs = require('SupportLegs');

    var updateSlopedDistances = function() {

        var truckPos = parseFloat($('#draggable-truck').css('left'));
        this.$truck_distance_from_edge_line.width(truckPos);

    };

    var updateTruckDistanceFromEdge = function(model) {

        var distance = this.model.getTruckDistanceFromEdge();

        this.capi.setTruckDistanceFromEdge(distance);

        if (!dragging) {
            this.$draggable_truck.css({
                left: this.model.m2px(distance)
            });
        }
        
        this.$truck_to_edge_input.val(Number(distance).toFixed(1));
        
        var truckPos = parseFloat(this.$draggable_truck.css('left'));
        var supportLegPos = truckPos;
        this.$support_legs.css({"left" : + (supportLegPos-60) + "px"});
        this.$support_legs.css({"left" : + (supportLegPos-60) + "px"});
        this.truckDragThumb.css({"left" : + (truckPos - this.truckDragThumb.width()/2) + "px"});
        
        
        updateHorizontalDistances(this.model);
        updateSlopedDistances();
    };

    var updateOnDrag = function(model) {
        model.setTruckDistanceFromEdge(model.px2m(this.$draggable_truck.position().left)/Math.cos(model.angle()));
        updateSlopedDistances();
        updateHorizontalDistances(model);
    };

    var dragging = false;

    return function(model, capi) {
        this.model = model;
        this.capi = capi;

        slope(model, capi);
        legs(model, capi);
        
        var $draggable_truck = $('#draggable-truck');
        this.$draggable_truck = $draggable_truck;
        var $truck_to_edge_input = $('#truck-to-edge');
        this.$truck_to_edge_input = $truck_to_edge_input;
        var $distance_to_car_label = $('#distance-to-car-label');
        this.$distance_to_car_label = $distance_to_car_label;
        var $truck_distance_input = $('#truck-distance-input');
        this.$truck_distance_input = $truck_distance_input;
        var $support_legs = $('#support-legs');
        this.$support_legs = $support_legs;
        var $truck_distance_from_edge_line = $('#truck-distance');
        this.$truck_distance_from_edge_line = $truck_distance_from_edge_line;
        this.truckDragThumb = $('#truck-drag-thumb');

        updateTruckDistanceFromEdge(model);

        var slopeDistancePosition = $('#truck-distance').position();

        $draggable_truck.draggable({
            axis: "x",
            drag: function(event, ui) {
                updateOnDrag(model);
            },
            start: function(event, ui) {
                dragging = true;
            },
            stop: function(event, ui) {
                dragging = false;
            }
        });

        model.on('change:truckDistanceFromEdge', updateTruckDistanceFromEdge, this);
        model.on('change:slopeAngle', updateTruckDistanceFromEdge, this);

        $truck_to_edge_input.change(function() {
            model.setTruckDistanceFromEdge($truck_to_edge_input.val());
        });

        $truck_to_edge_input.focusin(function() {
            $('.truck').switchClass("truck", "truck-greyed");
            $('.car').switchClass("car", "car-greyed");
            $draggable_truck.draggable('disable');
        });

        $truck_to_edge_input.focusout(function() {
            $('.truck-greyed').switchClass("truck-greyed", "truck");
            $('.car-greyed').switchClass("car-greyed", "car");
            $draggable_truck.draggable('enable');
        });

    };
});
