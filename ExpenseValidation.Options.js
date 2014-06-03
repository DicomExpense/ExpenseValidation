var ExpenseValidationOptions = {
	'defaultOptions': {
		condition: true,
		events: ['submit'],
		ruleOptionSeparator: ':'
	},
	
	'validators': {
		'required': function(element, options) {
			if (element.getValue().trim() == '')
				return false;
				
			return true;
		},
		'email': function(element, options) {
			return element.getValue().trim().match(/^([\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+\.)*[\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+@((((([a-z0-9]{1}[a-z0-9\-]{0,62}[a-z0-9]{1})|[a-z])\.)+[a-z]{2,6})|(\d{1,3}\.){3}\d{1,3}(\:\d{1,5})?)$/i);
		}
	},
	
	'handleError': function(element, success, ruleName, ruleOptions) {
		switch(ruleName) {
			default:
				this.errorHandlers.default(element, success, ruleName, ruleOptions);
				break;
		}
	},
	
	'errorHandlers': {
		'default': function(element, success, ruleName, ruleOptions) {
			if (!success)
				alert('ingen ostkaka?');
		},
		
		'required': function(element, success, ruleName, ruleOptions) {
			if (!success)
				element.hide();
		}
	}
};