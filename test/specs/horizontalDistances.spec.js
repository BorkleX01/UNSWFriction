/*global horizontalDistances*/
define(function(require){
    var $ = require('jquery');
    describe('horizontal distances', function(){
        var HorizontalDistances = require('HorizontalDistances');
        var AppModel = require('AppModel');
        var horizontalDistances = null;
        var appModel = null;
        beforeEach(function(){
            appModel = new AppModel();
            horizontalDistances = new HorizontalDistances($('#distance-to-car-label'), $('#distance-to-leg-label'), appModel);
        });

        it('model present', function(){
                
            //expect(horizontalDistances.model).to.be.ok;
        });


    });
});
