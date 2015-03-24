/*globals checkBrowser, document, console, window*/
define (function(require){
    var $ = require('jquery');
    var ui = require('jquery-ui');
	    var AppModel = require('AppModel');
	    var Capi = require('Capi');
	    var BaseDistances = require('BaseDistances');
	    
    var $body;

    require('sim-common/Detect');
    require('sim-common/VersionCheck');

    var notSupportedTemplate = require('text!sim-common/templates/notSupported.html');
    var BackboneAdapter = require ('api/snapshot/adapters/BackboneAdapter').getInstance();
    var Controller = require('api/snapshot/Controller');
    var Transporter = require('api/snapshot/Transporter').getInstance();

    function init(){
        

	var appModel = new AppModel();
	var capi = new Capi();
	new BaseDistances($('#distance-to-car-label'), $('#distance-to-leg-label'), capi, appModel);
	capi.expose(BackboneAdapter);
        
    }

    function loadInitial(){
        Transporter.addInitialSetupCompleteListener(init);
        Controller.notifyOnReady();
    }


    $(document).ready(function(){
        $body = $('body');
        if (!checkBrowser()) {
            $body.prepend(notSupportedTemplate);
            return;
        }

        loadInitial();

    });
});

