/*globals console*/
define(function(require) {
    var $ = require('jquery');
    var ui = require('jquery-ui');
    var updateHorizontalDistances = require('HorizontalDistances');

    var legPosPx = function () {
        return parseInt(this.$draggable_left_leg.css('left'));
    };
    var legPos = function(model){

        return model.px2m(-1*legPosPx()+this.truckWidth);
    };
    var sideSupportPx = function(){
        return this.model.m2px(this.model.getSideSupportLength());
    };
    var updateOnDrag = function(model, capi){
        model.setSideSupportLength(legPos(model));
        capi.setSideSupportLength(legPos(model));
    };
    
    var updateSideSupportLength = function(){
        updateHorizontalDistances(this.model, this.capi);
        
        if (!dragging){
            this.$draggable_left_leg.css({'left':-1*sideSupportPx()+this.truckWidth+'px'});
        }
        this.$distance_line.css({'width': sideSupportPx()+'px',
                                 'left' : -1*sideSupportPx()+this.model.m2px(this.model.getTruckDistanceFromEdge())+'px'});
        $('#legL').width(-1*(legPosPx()-30));
        $('#legR').width(-1*(legPosPx())+35);
        $('#footR').css({'left' : parseInt($('#legR').width())-$('#footR').width()});
        this.$legDist_intput_box.val(legPos(this.model).toFixed(1));
    };
    
    var updateModel = function(){
        this.model.setSideSupportLength(this.capi.getSideSupportLength());
    };

    var dragging = false;
    
    return function(model, capi) {

        this.model = model;
        this.capi = capi;
        

        var $distance_line = $('#support-leg-distance');
        this.$distance_line = $distance_line;
        

        model.on('change:sideSupportLength', updateSideSupportLength, this);
        capi.on('change:sideSupportLength', updateModel, this);
        model.on('change:truckDistanceFromEdge', updateSideSupportLength, this);
        capi.on('change:truckDistanceFromEdge', updateSideSupportLength, this);

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

        var $legDist_intput_box = $('#support-leg-from-truck');
        this.$legDist_intput_box = $legDist_intput_box;

        var truckWidth = parseFloat($('.truck').css('width'))/2;
        this.truckWidth = truckWidth;

        updateSideSupportLength();

        $draggable_left_leg.draggable({
            axis: "x",
            drag: function(event, ui){
                var truckDist = model.m2px(model.getTruckDistanceFromEdge());
                var legLength = model.m2px(model.getSideSupportLength());
                var leftLimit = -1*(truckDist-truckWidth);
                if(ui.position.left < leftLimit){ui.position.left = leftLimit;}
                if(ui.position.left > 0){ui.position.left = 0;}
                updateOnDrag(model, capi);
            },
            start: function(event, ui) {
                dragging = true;
            },
            stop: function(event, ui) {
                dragging = false;
            },
        });
        var greyout = function(){
            $('.truck').switchClass("truck", "truck-greyed");
            $('.car').switchClass("car", "car-greyed");
            $('#slope-angle-thumb').switchClass("blue-draggable-thumb-updown","blue-draggable-thumb-updown-greyed");
            $('#truck-drag-thumb').switchClass("blue-draggable-thumb-rightleft","blue-draggable-thumb-rightleft-greyed");
        };
        var greyin = function(){
            $('.truck-greyed').switchClass("truck-greyed", "truck");
            $('.car-greyed').switchClass("car-greyed", "car");
            $('#slope-angle-thumb').switchClass("blue-draggable-thumb-updown-greyed","blue-draggable-thumb-updown");
            $('#truck-drag-thumb').switchClass("blue-draggable-thumb-rightleft-greyed","blue-draggable-thumb-rightleft");
        };
        var lowerLimit = 2.2;
        var upperLimit = function(){return Number(model.getTruckDistanceFromEdge());};
        $legDist_intput_box.change(function(){
            if ($legDist_intput_box.val() < lowerLimit){$legDist_intput_box.val(lowerLimit);}
            if ($legDist_intput_box.val() > upperLimit()){$legDist_intput_box.val(upperLimit());}
            model.setSideSupportLength($legDist_intput_box.val());
            capi.setSideSupportLength($legDist_intput_box.val());
            
        });
        
        $legDist_intput_box.focusin(greyout);
        
        $legDist_intput_box.focusout(greyin);

        
        
    };
});
