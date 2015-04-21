/*globals checkBrowser, document, console, window, Math, $, require*/
define(function(require) {

    var $ = require('jquery');


    var horizontal_distance_truck_from_edge = function(model) {

        return model.getTruckDistanceFromEdge() * Math.cos(model.getSlopeAngle() * Math.PI / 180) - (model.getCGTruckHeight() * Math.sin(model.angle()));
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


    var drawDottedLineToTruckGrill = function(model) {
        var notch_at_leg_offset = $('#notch-at-leg').offset();
        
        var slope_base_offset = $('#slope-base').offset();

        var notch_at_truck_offset = $('#notch-at-truck').offset();

        var horizontals_positon = $('#horizontal-distances').position();

        var slope_base = $('#slope-base').position();

        var offsetHor = function(notch) {
            return notch.left - slope_base_offset.left;
        };
        var offsetVer = function(offset) {
            return Math.tan(model.getSlopeAngle() * Math.PI / 180) * offsetHor(offset);
        };

        $('#dotted-line-to-leg-below').width(horizontals_positon.top - slope_base.top + offsetVer(notch_at_leg_offset) + 3);
        $('#dotted-line-to-truck-below').width(horizontals_positon.top - slope_base.top + offsetVer(notch_at_truck_offset) + 67);

    };

    return function(model) {

        var $horizontal_line = $('#truck-to-car-distance-measure');
        this.$horizontal_line = $horizontal_line;
        var $draggable_truck = $('#draggable-truck');
        this.$draggable_truck = $draggable_truck;
        var $slope_base = $('#slope-base');
        var $horizontal_distances = $('#horizontal-distances');


        var hLineWidth = (parseInt($slope_base.css('left')) - parseInt($horizontal_distances.css('left')) + parseInt($draggable_truck.css('left'))) * Math.cos(model.angle()) - 25 * Math.sin(model.angle());
        $horizontal_line.width(hLineWidth);

        drawDottedLineToLeftSupport(model);
        drawDottedLineToTruckGrill(model);
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

        $('#distance-to-leg-label').text(horizontal_distance_truck_from_support(model).toFixed(2));
        $('#distance-to-car-label').text(horizontal_distance_car_from_support(model).toFixed(2));

    };
});
