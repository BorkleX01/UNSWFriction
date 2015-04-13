/*globals checkBrowser, document, console, window, Math, $, require*/
define(function(require) {

    var $ = require('jquery');
    var slopeAngle = function(model) {
        return model.getSlopeAngle();
    };

    var horizontal_distance_truck_from_edge = function(model) {

        return model.getTruckDistanceFromEdge() * Math.cos(model.getSlopeAngle() * Math.PI / 180) - (2.5 * Math.sin(model.getSlopeAngle() * Math.PI / 180));
    };

    var horizontal_distance_left_support_from_edge = function(model) {

        return (model.getTruckDistanceFromEdge() - model.getSideSupportLength()) * Math.cos(model.getSlopeAngle() * Math.PI / 180);
    };


    var horizontal_distance_truck_from_support = function(model) {

        return horizontal_distance_truck_from_edge(model) - horizontal_distance_left_support_from_edge(model);
    };

    var horizontal_distance_car_from_support = function(model) {

        return model.getCarDistanceFromEdge() + horizontal_distance_left_support_from_edge(model);
    };

    var drawDottedLineToLeftSupport = function(model) {
        var notch_at_leg_offset = $('#notch-at-leg').offset();
        
        var slope_base_offset = $('#slope-base').offset();

        var horizontals_y_positon = $('#horizontal-distances').position();

        var slope_base = $('#slope-base').position();
        
        var offsetHor = notch_at_leg_offset.left - slope_base_offset.left;
        var offsetVer = Math.tan(model.getSlopeAngle() * Math.PI / 180) * offsetHor;
        $('#dotted-line-to-leg-below').width(horizontals_y_positon.top - slope_base.top + offsetVer + 3);
    };




    return function(model) {

        var middleNotchPlacementRatio = horizontal_distance_truck_from_support(model) / (horizontal_distance_truck_from_support(model) + horizontal_distance_car_from_support(model));
        var middleNotchPostionRight = middleNotchPlacementRatio * $("#truck-to-car-distance-measure").width();

        $('#notch-at-leg').css({
            "right": middleNotchPostionRight + "px"
        });

        var toCarTextFieldWidth = $("#truck-to-car-distance-measure").width() - middleNotchPostionRight;
        $('#distance-to-car-label').css({
            "width": +toCarTextFieldWidth + "px"
        });

        $('#distance-to-leg-label').css({
            "width": +middleNotchPostionRight + "px"
        });

        drawDottedLineToLeftSupport(model);
        
        $('#distance-to-leg-label').text(horizontal_distance_truck_from_support(model).toFixed(2));
        $('#distance-to-car-label').text(horizontal_distance_car_from_support(model).toFixed(2));

    };
});
