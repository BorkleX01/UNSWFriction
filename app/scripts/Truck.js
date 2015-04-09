/*globals checkBrowser, document, console, window, Math, $, require, updateTruckDistanceFromEdge*/
define(function(require) {

    var $ = require('jquery');
    var ui = require('jquery-ui');
    var horizontalDistances = require('HorizontalDistances');
    var $draggable_truck = $('#draggable-truck');
    this.$draggable_truck = $draggable_truck;

    var drawDottedLines = function() {

        var truckPos = $draggable_truck.position();
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
            return Math.tan(30 * Math.PI / 180) * offsetHor(offset);
        };

        $('#dotted-line-to-leg-below').width(horizontals_positon.top - slope_base.top + offsetVer(notch_at_leg_offset) + 3);
        $('#dotted-line-to-truck-below').width(horizontals_positon.top - slope_base.top + offsetVer(notch_at_truck_offset) + 70);
    };

    var updateTruckDistanceFromEdge = function() {

        var distance = this.model.getTruckDistanceFromEdge();

        this.capi.setTruckDistanceFromEdge(distance);

        if (!dragging){
            $draggable_truck.css({
                left: distance * 25 - 200
            });
        }

        $('#truck-to-edge').val(Number(distance).toFixed(1));

        var truckPos = $('#draggable-truck').position();
        $('#truck-distance-input').width(truckPos.left + 205);

        var hDistWidth = (truckPos.left / Math.cos(this.model.getSlopeAngle() * Math.PI / 180)) * Math.cos(this.model.getSlopeAngle() * Math.PI / 180);
        $('#distance-to-car-label').width(225 + hDistWidth);
        drawDottedLines();

    };

    var updateOnDrag = function(model){
        model.setTruckDistanceFromEdge(($draggable_truck.position().left + 200) / 25);
        drawDottedLines();
        horizontalDistances(model);
    };

    var dragging = false;
    
    return function(model, capi) {
        this.model = model;
        this.capi = capi;
        
        horizontalDistances(model);

        updateTruckDistanceFromEdge(model, capi);
        
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

        $('#truck-to-edge').change(function() {
            model.setTruckDistanceFromEdge($('#truck-to-edge').val());
        });

        $('#truck-to-edge').focusin(function() {
            $('.truck').switchClass("truck", "truck-greyed");
            $('.car').switchClass("car", "car-greyed");
            $draggable_truck.draggable('disable');
        });

        $('#truck-to-edge').focusout(function() {
            $('.truck-greyed').switchClass("truck-greyed", "truck");
            $('.car-greyed').switchClass("car-greyed", "car");
            $draggable_truck.draggable('enable');

        });

    };
});
