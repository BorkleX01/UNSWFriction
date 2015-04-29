/*globals checkBrowser, document, console, window, Math, $, require*/
define(function(require) {

    var $ = require('jquery');
    var moment = require('Moment');

    var horizontal_distance_truck_from_edge = function(model) {

        return model.getTruckDistanceFromEdge() * Math.cos(model.angle()) - (model.getCGTruckHeight() * Math.sin(model.angle()));
    };

    var horizontal_distance_left_support_from_edge = function(model) {

        return (model.getTruckDistanceFromEdge() - model.getSideSupportLength()) * Math.cos(model.angle());
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
        var offsetVer = Math.tan(model.angle()) * offsetHor;
        $('#dotted-line-to-leg-below').width(horizontals_y_positon.top - slope_base.top + offsetVer + 3);
    };

    
    var offsetHor = function(notch) {
        var slope_base_offset = $('#slope-base').offset();
        return notch.left - slope_base_offset.left;
    };

    var offsetVer = function(offset, model) {
        return Math.tan(model.angle()) * offsetHor(offset);
    };

    var drawDottedLineToTruckGrill = function(model) {
        
        var notch_at_leg_offset = $('#notch-at-leg').offset();
        
        var notch_at_truck_offset = $('#notch-at-truck').offset();
        
        var horizontals_position = $('#horizontal-distances').position();
        
        var slope_base = $('#slope-base').position();
        
        $('#dotted-line-to-leg-below').width(horizontals_position.top - slope_base.top + offsetVer(notch_at_leg_offset, model) + 3);
        $('#dotted-line-to-truck-below').width(horizontals_position.top - slope_base.top + offsetVer(notch_at_truck_offset, model) + 50);

    };

    return function(model, capi) {

        var $horizontal_line = $('#truck-to-car-distance-measure');
        var $draggable_truck = $('#draggable-truck');
        var $slope_base = $('#slope-base');
        var $horizontal_distances = $('#horizontal-distances');


        var hLineWidth = (parseInt($slope_base.css('left')) - parseInt($horizontal_distances.css('left')) + parseInt($draggable_truck.css('left'))) * Math.cos(model.angle()) - 25 * Math.sin(model.angle());
        $horizontal_line.width(hLineWidth);

        drawDottedLineToLeftSupport(model);
        drawDottedLineToTruckGrill(model);
        
        var middleNotchPlacementRatio = horizontal_distance_truck_from_support(model) / (horizontal_distance_truck_from_support(model) + horizontal_distance_car_from_support(model));
        var middleNotchPostionRight = middleNotchPlacementRatio * $horizontal_line.width();

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
        model.setSupportToTruck(horizontal_distance_truck_from_support(model));
        $('#distance-to-car-label').text(horizontal_distance_car_from_support(model).toFixed(2));
        model.setCarToSupport(horizontal_distance_car_from_support(model));


        moment(model, capi);
        

    };
});
