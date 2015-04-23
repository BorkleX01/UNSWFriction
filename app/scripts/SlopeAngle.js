/*globals document, console, window, Math, $, require*/
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
    };
    var updateOnDrag = function (model){
        
        var dragPos = -1*(parseFloat(this.$drag_thumb.css('top'))+9);
        var tilt = parseInt(Math.sin(dragPos/horizontalPosOfDragThumb)*180/Math.PI);
        model.setSlopeAngle(tilt);
        $('#slope-angle').val(tilt);
        
        
    };

    return function(model, capi) {
        this.model = model;
        this.capi = capi; 
        var $drag_thumb = $('#slope-angle-thumb');
        this.$drag_thumb = $drag_thumb;
        
        $('#slope-angle').val(model.getSlopeAngle());

        updateSlopeAngle(model);
        
        model.on('change:slopeAngle', updateSlopeAngle, this);
        $('#slope-angle').change(function(){
            model.setSlopeAngle($('#slope-angle').val());
        });
        var $input_box = $('#slope-angle');
        this.$input_box = $input_box;
        
        $drag_thumb.draggable({
            axis: "y",
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
        
        $input_box.focusin(function(){
            $('.truck').switchClass("truck", "truck-greyed");
            $('.car').switchClass("car", "car-greyed");
            $('#leg-drag-thumb').switchClass("blue-draggable-thumb-rightleft","blue-draggable-thumb-rightleft-greyed");
            $('#truck-drag-thumb').switchClass("blue-draggable-thumb-rightleft","blue-draggable-thumb-rightleft-greyed");
        });
        

        $input_box.focusout(function(){
            $('.truck-greyed').switchClass("truck-greyed", "truck");
            $('.car-greyed').switchClass("car-greyed", "car");
            $('#leg-drag-thumb').switchClass("blue-draggable-thumb-rightleft-greyed","blue-draggable-thumb-rightleft");
            $('#truck-drag-thumb').switchClass("blue-draggable-thumb-rightleft-greyed","blue-draggable-thumb-rightleft");
        });
        
    };
});

