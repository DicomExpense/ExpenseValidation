
/**
 * OPTIONS
 * condition: (bool) should validate or not
 * events: (array<string>) what events should cause validation
 * rules: (array<string>) what rules should be applied while validating
 */
var ExpenseValidation = Class.create({

	// Constructor
	initialize: function(elements, options) {
		if (typeof elements === 'string') {
			if (elements.indexOf(".") > -1)
				elements = $$(elements);
			else
				elements = [$(elements)];
		} else {
			elements = [elements];
		}
			
		this.elements = elements;
		this.options = ExpenseValidationOptions.defaultOptions;
		Object.extend(this.options, options);
		
		this.AddValidators();
	},
	
	// Append validators on chosen events
	AddValidators: function() {
		var instance = this;
		instance.elements.each(function(element) {
			instance.options.events.each(function(eventName) {
				switch(eventName) {
					case 'submit':
						element.up('form').observe('submit', function(event) {
							if (!instance.Validate(element))
								Event.stop(event);
						});
						break;
						
					default:
						element.observe(eventName, function(event) {
							instance.Validate(element);
						});
						break;
				}
			});
		});
	},
	
	// Validate a single element with current rules and conditions
	Validate: function(element) {
		var instance = this;
		var didValidate = true;
		var condition = instance.VariableIsFunction(instance.options.condition) ? instance.options.condition() : instance.options.condition;
		
		if (condition) {
			// Loop through rules
			instance.options.rules.each(function(ruleName) {
				// Rule was function
				if (instance.VariableIsFunction(ruleName)) {
					if (!ruleName(element)) {
						didValidate = false;
						instance.HandleError(element, false);
					} else {
						instance.HandleError(element, true);
					}
						
				// Rule was text
				} else {
					ruleOptions = ruleName.split(instance.options.ruleOptionSeparator);
					if (!ExpenseValidationOptions.validators[ruleOptions[0]](element, ruleOptions[1])) {
						didValidate = false;
						instance.HandleError(element, false, ruleOptions[0], ruleOptions[1]);
					} else {
						instance.HandleError(element, true, ruleOptions[0], ruleOptions[1]);
					}
				}
			});
		}
		
		return didValidate;
	},
	
	// Handle single error
	HandleError: function(element, success, ruleName, ruleOptions) {
		ExpenseValidationOptions.handleError(element, success, ruleName, ruleOptions);
	},
	
	// Check whether variable is of type function
	VariableIsFunction: function(variable) {
		var getType = {};
		return variable && getType.toString.call(variable) === '[object Function]';
	}
});