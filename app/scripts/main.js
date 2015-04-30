/*globals checkBrowser, document, console, window, Image, setTimeout, requestAnimFrame */
define(function(require) {
    var $ = require('jquery');
    var ui = require('jquery-ui');
    var AppModel = require('AppModel');
    var Capi = require('Capi');
    var env = require('env');
    var slope = require('SlopeAngle');
    var truck = require('Truck');
    var $body;
    require('sim-common/Detect');
    require('sim-common/VersionCheck');

    var notSupportedTemplate = require('text!sim-common/templates/notSupported.html');
    var BackboneAdapter = require('api/snapshot/adapters/BackboneAdapter').getInstance();
    var Controller = require('api/snapshot/Controller');
    var Transporter = require('api/snapshot/Transporter').getInstance();

    function init() {
        var model = new AppModel();
        var capi = new Capi();

        window.requestAnimFrame = (function(callback) {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
                function(callback) {
                    window.setTimeout(callback, 1000 / 60);
                };
        })();
       
        var cwCanvas = document.getElementById('cw-moment');
        var ccwCanvas = document.getElementById('ccw-moment');

        var cwCTX = cwCanvas.getContext('2d');
        cwCTX.globalCompositeOperation = 'source-over';
        var ccwCTX = ccwCanvas.getContext('2d');
        ccwCTX.globalCompositeOperation = 'source-over';

        var cwArrows = new Image();
        var ccwArrows = new Image();

        cwArrows.onload = function() {
            cwCTX.drawImage(cwArrows, 0, 0, 90, 90);
            setTimeout(function(){rotate(cwCTX, cwCanvas, 1, cwArrows);},1000);
        };
        ccwArrows.onload = function() {
            ccwCTX.drawImage(ccwArrows, 0, 0, 90, 90);
            setTimeout(function(){rotate(ccwCTX, ccwCanvas, -1, ccwArrows);},1000);

        };
        function drawMask(ctx, angle, dir){
            var momentRatio = -1*model.getCWMoment()/(-1*model.getCWMoment() + model.getCCWMoment());
            var vector = momentRatio*2*Math.PI;
             
            ctx.globalCompositeOperation = 'destination-in';
            ctx.beginPath();
            ctx.arc(45, 45 , 45, Math.PI/2-angle, Math.PI/2+vector-angle , (dir>-1)?false:true);
            ctx.closePath();
            ctx.lineWidth = 5;
            ctx.fillStyle = 'red';
            ctx.fill();
            ctx.globalCompositeOperation = 'source-over';
        }
        var startAngleCW = 0;
        var startAngleCCW = 0;
        var angle;

        function rotate(ctx, canvas, dir, arrows){
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate(dir*Math.PI / 360);
            if(dir === 1){
                startAngleCW = startAngleCW+dir*Math.PI / 360;
                angle = startAngleCW;
            }
            else
            {
                startAngleCCW = startAngleCCW+dir*Math.PI / 360;
                angle = startAngleCCW;
            }
            
            ctx.translate(-canvas.width / 2, -canvas.height / 2);
            ctx.drawImage(arrows, 0, 0, 90, 90);
            drawMask(ctx, angle, dir);
            requestAnimFrame(function() {
                rotate(ctx, canvas, dir, arrows);
            });
        }
        cwArrows.src = env.assets + 'cwMoment.png';
        ccwArrows.src = env.assets + 'ccwMoment.png';
        
        truck(model, capi);
        slope(model, capi);
        capi.expose(BackboneAdapter);

    }
  
    function loadInitial() {
        Transporter.addInitialSetupCompleteListener(init);
        Controller.notifyOnReady();
    }


    $(document).ready(function() {
        $body = $('body');
        if (!checkBrowser()) {
            $body.prepend(notSupportedTemplate);
            return;
        }

        loadInitial();

    });
});
