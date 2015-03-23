define(function(require){

    describe('context', function(){
        it('should run without problems', function(){
           
            expect('example').to.be.a('string');
            expect('example').to.not.equal('something different');

        });
    });
});