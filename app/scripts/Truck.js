/*globals console*/
define(function(require) {

    var $ = require('jquery');
    var ui = require('jquery-ui');
    var updateHorizontalDistances = require('HorizontalDistances');
    var moment = require('Moment');
    var slope = require('SlopeAngle');
    var legs = require('SupportLegs');
    var car = require('Car');
    var friction = require('Friction');
    var momentCircle = require('MomentCircle');
   
    var updateSlopedDistances = function() {
        var truckPos = parseFloat($('#draggable-truck').css('left'));
        this.$truck_distance_from_edge_line.width(truckPos);
    };

    var updateCraneBeamLength = function(){
        var beamLength = this.model.m2px(this.model.getBeamLength());
        var cableLength = this.model.m2px(this.model.getTruckCraneHeight())*Math.cos(this.model.angle());
        $('#cable').css({'height': cableLength+'px'});

        var mountWidth = 15;
        $('.crane-beam , .crane-beam-greyed').css({'left': -1*beamLength+2+'px', 'width':beamLength+'px'});
        var deg = this.model.getSlopeAngle();
        $('#cable').css({
            '-webkit-transform' : 'rotate('+deg+'deg)',
            '-moz-transform' : 'rotate('+deg+'deg)',
            '-ms-transform' : 'rotate('+deg+'deg)',
            '-o-transform' : 'rotate('+deg+'deg)',
            'transform' : 'rotate('+deg+'deg)'
        });
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
        
        updateHorizontalDistances(this.model, this.capi);
        updateSlopedDistances();
        updateCraneBeamLength();

    };
  
    var updateOnDrag = function() {
        this.model.setTruckDistanceFromEdge(this.model.px2m(this.$draggable_truck.position().left)/Math.cos(this.model.angle()));
        updateSlopedDistances();
        updateHorizontalDistances(this.model, this.capi);
    };

    var dragging = false;
    
    var updateModel = function(){
        this.model.setTruckDistanceFromEdge(this.capi.getTruckDistanceFromEdge());
        this.model.setTruckMass(this.capi.getTruckMass());
        updateCraneBeamLength();
    };
    var updateTruckMass = function(){
        $('#truck-mass').text(this.model.getTruckMass()+" kg");
         moment(this.model, this.capi);
    };
    var hideMassLabel = function(){

        if (this.capi.getShowTruckMass()){
            $('#truck-mass-text').show();
        }else{$('#truck-mass-text').hide();}
        
    };

    var toggleTruckInteraction = function() {
        if (this.capi.getAdjustTruck()) {
            this.$draggable_truck.draggable("enable");
            $('#draggable-left-leg').draggable("enable");
            $('#truck-to-edge').prop("disabled" , false);
            $('#support-leg-from-truck').prop("disabled" , false);
            
        } else {
            this.$draggable_truck.draggable("disable");
            $('#draggable-left-leg').draggable("disable");
            $('#truck-to-edge').prop("disabled", true);
            $('#support-leg-from-truck').prop("disabled" , true);
        }
    };



    return function(model, capi) {
        this.model = model;
        this.capi = capi;
        slope(model, capi);
        legs(model, capi);
        car(model, capi);
        friction(model, capi);
        
        momentCircle(model);
        
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
        var maxTruckDistPX = 290;
        $draggable_truck.draggable({
            axis: "x",
            drag: function(event, ui) {
                var legLength = model.m2px(model.getSideSupportLength());
                if(ui.position.left < legLength){ui.position.left = legLength;}
                if(ui.position.left > maxTruckDistPX){ui.position.left = maxTruckDistPX;}
                updateOnDrag(model);
            },
            start: function(event, ui) {
                dragging = true;
            },
            stop: function(event, ui) {
                dragging = false;
            },
        });
        
        model.on('change:truckDistanceFromEdge', updateTruckDistanceFromEdge, this);
        capi.on('change:truckDistanceFromEdge', updateModel, this);
        model.on('change:slopeAngle', updateTruckDistanceFromEdge, this);
        model.on('change:truckMass', updateTruckMass, this);
        capi.on('change:truckMass', updateModel, this);
        capi.on('change:showTruckMass', hideMassLabel, this);
        capi.on('change:adjustTruck', toggleTruckInteraction, this);
        capi.on('change:carDistanceFromEdge', updateModel, this);

        var greyout = function(){
            $('.car').switchClass("car", "car-greyed");
            $('#leg-drag-thumb').switchClass("blue-draggable-thumb-rightleft","blue-draggable-thumb-rightleft-greyed");
            $('#slope-angle-thumb').switchClass("blue-draggable-thumb-updown","blue-draggable-thumb-updown-greyed");
        };
        var greyin = function(){
            $('.car-greyed').switchClass("car-greyed", "car");
            $('#leg-drag-thumb').switchClass("blue-draggable-thumb-rightleft-greyed","blue-draggable-thumb-rightleft");
            $('#slope-angle-thumb').switchClass("blue-draggable-thumb-updown-greyed","blue-draggable-thumb-updown");
        };
        
        $truck_to_edge_input.change(function() {
            model.setTruckDistanceFromEdge($truck_to_edge_input.val());
            capi.setTruckDistanceFromEdge($truck_to_edge_input.val());
        });

        $truck_to_edge_input.focusin(greyout);

        $truck_to_edge_input.focusout(greyin);


    };
});
