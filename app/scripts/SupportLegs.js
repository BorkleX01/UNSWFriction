/*globals console, Math, $, require*/
define(function(require) {
    var $ = require('jquery');
    var ui = require('jquery-ui');
    //var polyfill = require('polyfill');
    var horizontalDistances = require('HorizontalDistances');

    var legPos = function(model){
        return model.px2m(-1*parseInt(this.$draggable_left_leg.css('left'))+this.truckWidth);
    };
    var updateOnDrag = function(model){
        model.setSideSupportLength(legPos(model));
    };

    var updateSideSupportLength = function(){
        horizontalDistances(this.model);
        
        if (!dragging){
            this.$draggable_left_leg.css({'left':-1*this.model.m2px(this.model.getSideSupportLength())+this.truckWidth+'px'});
        }
        this.$draggable_right_leg.css({'left': -1*(parseInt(this.$draggable_left_leg.css('left'))+20)+'px'});
        this.$distance_line.css({'width': this.model.m2px(this.model.getSideSupportLength())+'px',
                                 'left' : -1*this.model.m2px(this.model.getSideSupportLength())+this.model.m2px(this.model.getTruckDistanceFromEdge())+'px'});
        this.$input_box.val(legPos(this.model).toFixed(1));
    };

    var dragging = false;
    
    return function(model, capi) {
        this.model = model;
        this.capi = capi;
        

        var $distance_line = $('#support-leg-distance');
        this.$distance_line = $distance_line;
        

        model.on('change:sideSupportLength', updateSideSupportLength, this);
        model.on('change:truckDistanceFromEdge', updateSideSupportLength, this);

        var $support_legs = $('#support_legs');
        this.$truck_distance_input = $support_legs;

        var $draggable_left_leg = $('#draggable-left-leg');
        this.$draggable_left_leg = $draggable_left_leg;

        var startPos = parseInt($draggable_left_leg.css('left'));
        this.startPos = startPos;

        var $draggable_right_leg = $('#right-leg');
        this.$draggable_right_leg = $draggable_right_leg;

        var $draggable_truck = $('#draggable-truck');
        this.$draggable_truck = $draggable_truck;

        var $input_box = $('#support-leg-from-truck');
        this.$input_box = $input_box;

        var truckWidth = parseFloat($('.truck').css('width'))/2;
        this.truckWidth = truckWidth;

        updateSideSupportLength();

        $draggable_left_leg.draggable({
            axis: "x",
            drag: function(event, ui){
                updateOnDrag(model);
            },
            start: function(event, ui) {
                dragging = true;
            },
            stop: function(event, ui) {
                dragging = false;
            }
        });

        $input_box.change(function(){
            model.setSideSupportLength($input_box.val());
            
        });
        $input_box.focusin(function(){
            $('.truck').switchClass("truck", "truck-greyed");
            $('.car').switchClass("car", "car-greyed");
            $draggable_truck.draggable('disable');});

        $input_box.focusout(function(){
            $('.truck-greyed').switchClass("truck-greyed", "truck");
            $('.car-greyed').switchClass("car-greyed", "car");
            $draggable_truck.draggable('enable');});
    };
});
