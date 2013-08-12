var type = require('type')
  , sgSanitizeArguments = require('sg-sanitize-arguments')
  , applyTimeout

var applyScope = function(_querySelector, _callback) {

	var args = sgSanitizeArguments(arguments, {querySelector: String, callback: Function})
	  , el = document.querySelector(type(args['querySelector']) == 'string' && args['querySelector'] != '' ? args['querySelector'] : 'body')
	  , angularElement = type(el) == 'element' ? angular.element(el) : null
	  , scope = type(angularElement) == 'object' && angularElement.length > 0 ? angularElement.scope() : null
	  , callback = type(args['callback']) == 'function' ? args['callback'] : function(){}

	if (scope === null) {
		callback(Error('The specified html element was not attached to a valid scope'));
		return;
	}

	clearTimeout(applyTimeout);

	applyTimeout = setTimeout(function(){

		if (scope['$$phase']) {
			applyScope();
		} else {
			scope.$apply();
			applyTimeout = null;
			callback();
		}
		
	}, 5);

}

module.exports = applyScope;