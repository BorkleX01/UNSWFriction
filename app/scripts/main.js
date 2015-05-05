/*globals checkBrowser, document, window, Image, setTimeout, requestAnimFrame */
define(function(require) {
    var $ = require('jquery');
    var ui = require('jquery-ui');
    var AppModel = require('AppModel');
    var Capi = require('Capi');
    
    var slope = require('SlopeAngle');
    var truck = require('Truck');
    var $body;
    require('sim-common/Detect');
    require('sim-common/VersionCheck');

    var notSupportedTemplate = require('text!sim-common/templates/notSupported.html');
    var BackboneAdapter = require('api/snapshot/adapters/BackboneAdapter').getInstance();
    var Controller = require('api/snapshot/Controller');
    var Transporter = require('api/snapshot/Transporter').getInstance();
    window.requestAnimFrame = (function(callback) {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
                function(callback) {
                    window.setTimeout(callback, 1000 / 60);
                };
        })();

    function init() {
        var model = new AppModel();
        var capi = new Capi();
        
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
