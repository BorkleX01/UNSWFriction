/*globals checkBrowser, document, console, window, Math, $, require, updateTruckDistanceFromEdge*/
define(function(require) {

    var $ = require('jquery');
    var ui = require('jquery-ui');
    var horizontalDistances = require('HorizontalDistances');
    

    var drawDottedLines = function() {

        var truckPos = $('#draggable-truck').position();
        $('#truck-distance').width((truckPos.left+179)/Math.cos(this.model.getSlopeAngle() * Math.PI / 180));
        $('#truck-to-car-distance-measure').width(225 + truckPos.left);
        
        var notch_at_leg_offset = $('#notch-at-leg').offset();
        
        var slope_base_offset = $('#slope-base').offset();

        var notch_at_truck_offset = $('#notch-at-truck').offset();

        var horizontals_positon = $('#horizontal-distances').position();

        var slope_base = $('#slope-base').position();

        var offsetHor = function(notch) {
            return notch.left - slope_base_offset.left;
        };
        var offsetVer = function(offset) {
            return Math.tan(this.model.getSlopeAngle() * Math.PI / 180) * offsetHor(offset);
        };

        $('#dotted-line-to-leg-below').width(horizontals_positon.top - slope_base.top + offsetVer(notch_at_leg_offset) + 3);
        $('#dotted-line-to-truck-below').width(horizontals_positon.top - slope_base.top + offsetVer(notch_at_truck_offset) + 70);
    };

    var updateTruckDistanceFromEdge = function() {

        var distance = this.model.getTruckDistanceFromEdge();

        this.capi.setTruckDistanceFromEdge(distance);

        if (!dragging){
            this.$draggable_truck.css({
                left: distance * 25 - 200
            });
        }

        this.$truck_to_edge.val(Number(distance).toFixed(1));

        var truckPos = this.$draggable_truck.position();

        var hDistWidth = (truckPos.left / Math.cos(this.model.getSlopeAngle() * Math.PI / 180)) * Math.cos(this.model.getSlopeAngle() * Math.PI / 180);
        this.$distance_to_car_label.width(225 + hDistWidth);
        drawDottedLines();

    };

    var updateOnDrag = function(model){
        model.setTruckDistanceFromEdge((this.$draggable_truck.position().left + 200) / 25);
        drawDottedLines();
        horizontalDistances(model);
    };

    var dragging = false;
    
    return function(model, capi) {
        this.model = model;
        this.capi = capi;
        
        horizontalDistances(model);
        var $draggable_truck = $('#draggable-truck');
        this.$draggable_truck = $draggable_truck;
        var $truck_to_edge = $('#truck-to-edge');
        this.$truck_to_edge = $truck_to_edge;
        var $distance_to_car_label = $('#distance-to-car-label');
        this.$distance_to_car_label = $distance_to_car_label;
        var $truck_distance_input = $('#truck-distance-input');
        this.$truck_distance_input = $truck_distance_input;
        
        updateTruckDistanceFromEdge(model, capi, $draggable_truck);
        

        
        var slopeDistancePosition = $('#truck-distance').position();
        
        $draggable_truck.draggable({
            axis: "x",
            drag: function(event, ui){
                updateOnDrag(model);
            },
            start: function(event, ui){
                dragging = true;
            },
            stop: function(event, ui){
                dragging = false;
            }
        });

        model.on('change:truckDistanceFromEdge', updateTruckDistanceFromEdge, this);

        $truck_to_edge.change(function() {
            model.setTruckDistanceFromEdge($truck_to_edge.val());
        });

        $truck_to_edge.focusin(function() {
            $('.truck').switchClass("truck", "truck-greyed");
            $('.car').switchClass("car", "car-greyed");
            $draggable_truck.draggable('disable');
        });

        $truck_to_edge.focusout(function() {
            $('.truck-greyed').switchClass("truck-greyed", "truck");
            $('.car-greyed').switchClass("car-greyed", "car");
            $draggable_truck.draggable('enable');

        });

    };
});
