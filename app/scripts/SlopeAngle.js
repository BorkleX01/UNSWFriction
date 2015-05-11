/*globals console*/
define(function(require) {
    var $ = require('jquery');
    var ui = require('jquery-ui');
    var dragging = false;
    var horizontalPosOfDragThumb = 340;

    var updateSlopeAngle = function (model){
        var deg = -1*model.getSlopeAngle();
        $('#truck-surface').css({
            '-webkit-transform' : 'rotate('+deg+'deg)',
            '-moz-transform' : 'rotate('+deg+'deg)',
            '-ms-transform' : 'rotate('+deg+'deg)',
            '-o-transform' : 'rotate('+deg+'deg)',
            'transform' : 'rotate('+deg+'deg)'
        });
        if(!dragging){
            var dragPos = horizontalPosOfDragThumb/Math.cos(model.angle())*Math.sin(model.angle()) ;
            this.$drag_thumb.css({'top':(-1*dragPos)+'px'});
        }
        $('#slope-angle').val(model.getSlopeAngle());
    };

    
    var updateOnDrag = function (model, capi){
        var dragPos = -1*(parseFloat(this.$drag_thumb.css('top'))+9);
        var tilt = parseInt(Math.sin(dragPos/horizontalPosOfDragThumb)*180/Math.PI);
        model.setSlopeAngle(tilt);
        capi.setSlopeAngle(tilt);
        $('#slope-angle').val(tilt);
        
        
    };
    var updateModel = function (){
        this.model.setSlopeAngle(this.capi.getSlopeAngle());
    };

    var toggleSlopeAdjustableness = function(){
        if(this.capi.getAdjustSlope()){
            this.$drag_thumb.draggable("enable");
            $('#slope-angle').prop("disabled" , false);
        }else
        {
            this.$drag_thumb.draggable("disable");
            $('#slope-angle').prop("disabled" , true);
        }
    };
    
    return function(model, capi) {
        this.model = model;
        this.capi = capi; 
        var $drag_thumb = $('#slope-angle-thumb');
        this.$drag_thumb = $drag_thumb;
        
        $('#slope-angle').val(model.getSlopeAngle());

        updateSlopeAngle(model);
        
        model.on('change:slopeAngle', updateSlopeAngle, this);
        capi.on('change:slopeAngle', updateModel, this);
        capi.on('change:adjustSlope', toggleSlopeAdjustableness, this);

        $('#slope-angle').change(function(){
            model.setSlopeAngle($('#slope-angle').val());
            capi.setSlopeAngle($('#slope-angle').val());
        });

        var $input_box = $('#slope-angle');
        this.$input_box = $input_box;
        var lowerLimit = -9;
        var upperLimit = -202;
        $drag_thumb.draggable({
            axis: "y",
            drag: function(event, ui){
                if(ui.position.top > lowerLimit){ui.position.top = lowerLimit;}
                if(ui.position.top < upperLimit){ui.position.top = upperLimit;}
                updateOnDrag(model, capi);
            },
            start: function(event, ui) {
                dragging = true;
            },
            stop: function(event, ui) {
                dragging = false;
            }
        });
        var greyout = function(){
            $('.truck').switchClass("truck", "truck-greyed");
            $('.car').switchClass("car", "car-greyed");
            $('#leg-drag-thumb').switchClass("blue-draggable-thumb-rightleft","blue-draggable-thumb-rightleft-greyed");
            $('#truck-drag-thumb').switchClass("blue-draggable-thumb-rightleft","blue-draggable-thumb-rightleft-greyed");
        };
        var greyin = function(){
            $('.truck-greyed').switchClass("truck-greyed", "truck");
            $('.car-greyed').switchClass("car-greyed", "car");
            $('#leg-drag-thumb').switchClass("blue-draggable-thumb-rightleft-greyed","blue-draggable-thumb-rightleft");
            $('#truck-drag-thumb').switchClass("blue-draggable-thumb-rightleft-greyed","blue-draggable-thumb-rightleft");
        };
        $input_box.focusin(greyout);
        $input_box.focusout(greyin);

        
    };
});

