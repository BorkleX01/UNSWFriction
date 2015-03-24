/*globals checkBrowser, document, console, window*/
define(function(){

	   //var $ = require('jquery');
	  var updateDistances = function(model){
	      return model.getSlopeAngle();
	  }; 
       
	   return function($toCar, $toLeg, capi, model){
	       this.model = model;
	       console.log("updateDistances: " + updateDistances(model));
	       console.log("model slope angle: "+model.getSlopeAngle());
	       console.log("side support length: "+model.get("sideSupportLength"));
	       console.log("truck distance: "+model.get("truckDistanceFromEdge"));

	       console.log("return distances: "+$toCar.width());
	       console.log("return distances: "+$toLeg.width());
	       console.log("return distances: "+capi);
	       console.log("return distances: "+model);
	   };
      });
