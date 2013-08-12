var assert = require('assert')
  , type = require('type')

describe('sgApplyScope', function(){

	it('should spam sgApplyScope 10 times in quick sucession but only receive one callback', function(_done){

		this.slow(2000);

		var numTimeCallbackwasTriggered = 0
		  , callback = function(){

				numTimeCallbackwasTriggered++;

			};

		sgApplyScope(callback);
		sgApplyScope(callback);
		sgApplyScope(callback);
		sgApplyScope(callback);
		sgApplyScope(callback);
		sgApplyScope(callback);
		sgApplyScope(callback);
		sgApplyScope(callback);
		sgApplyScope(callback);
		sgApplyScope(callback);

		setTimeout(function(){

			assert(numTimeCallbackwasTriggered == 1);
			_done();

		}, 200);

	});

	it('should try to call sgApplyScope with an invalid html element', function(_done){

		sgApplyScope('invalid');
		sgApplyScope('invalid', function(_error){

			assert(_error);
			_done();

		});

	});

	it('should try to call sgApplyScope with a valid html element', function(_done){

		sgApplyScope('#mocha');
		sgApplyScope('#mocha', function(_error){

			assert(!_error);
			_done();

		});

	});

});