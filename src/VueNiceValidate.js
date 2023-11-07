import validationRules from './validationRules.js';
import validationMessages from './validationMessages.js';

const allErrors = [];
const validator = {
	directives: {
		// register a custom directive called v-validate
		validate: {
			bind(el, binding, vnode) {
				// get the input element
				let field = el.tagName.toLowerCase() == 'input' ? el : el.querySelector('input');
				let form = el.closest('form');
				if (!field) {
					/* eslint-disable-next-line */
					console.error('Input field not found.')
				}

				//add field to input fields bag
				let validator_field = vnode.context.addField(field.getAttribute('id'), field.getAttribute('name'), (form?.getAttribute('name') || ''), binding.value, binding.arg == 'touch');
				if (!validator_field) {
					return false;
				}
				field.addEventListener('input', function (event) {
					return vnode.context.runValidation(event.target.value, validator_field);
				});
			},
		}
	},
	data() {
		return {
			inputFields: [],
		};
	},
	computed: {
		formErrors() {
			let form_errors = {};

			this.inputFields.filter(el => el.has_error && el.show_error)
				.forEach(el => {
					form_errors[el.field_id] = el.error_msg;
				});
			return form_errors;
		}
	},
	methods: {
		// validateDirective(el, binding) {
		// 	let field = el.tagName.toLowerCase() == 'input' ? el : el.getElementsByTagName('input')[0];
		// 	if(!field){
		// 		console.error('Input field not found.')
		// 	}
		// 	this.addField(field.id, field.name, binding.value, binding.arg == 'touch');
		// },
		addField(fieldId, fieldName = '', formName = '', rules, touch) {

			// get the field_name from name or id attribute of the input element
			let field_name = fieldName || fieldId.replace(/_/g, ' ');
			if (field_name.includes('.')) field_name = field_name.split('.').slice(-1).pop();

			let validation_rules = {};
			//construct validation_rules object from string format
			if (typeof rules === "string")
				//get all rules seprated by | and loop over to convert them 
				rules.split("|").map((rule) => {
					// split the rule by : to get the rule and the parameter (if any)
					const ru = rule.split(":");
					validation_rules[ru[0]] = ru[1] ? ru[1] : true;
				});
			//no need to do anything if rules are already define in object format
			else if (typeof rules === "object")
				validation_rules = Object.assign({}, rules);
			else
				return false;

			const already_present_field = this.inputFields.find(el => el.field_id === fieldId);
			if (already_present_field) {
				/* eslint-disable-next-line */
				console.error('Duplicate field found with id ' + field.field_id + '.');
				return false;
			}

			const new_field = {
				'field_id': fieldId,
				'field_name': field_name,
				'form_name': '',
				'rules': validation_rules,
				'has_error': false,
				'error_msg': '',
				'failed_rule': '',
				'show_error': touch
			};

			this.inputFields.push(new_field);

			return new_field;
		},
		runValidation(field_value, field) {

			// loop through the validators array
			for (const [rule_name, rule_parameter] of Object.entries(field.rules)) {

				if (!validationRules[rule_name]) {
					/* eslint-disable-next-line */
					console.error('Validation rule "' + rule_name + '" not found for field with id #' + field.field_id + '.');
					continue;
				}


				let result = validationRules[rule_name](field_value, rule_parameter);
				field['has_error'] = !result;

				if (!result) {
					field['error_msg'] = validationMessages[rule_name];
					field['failed_rule'] = rule_name;
					// stop the loop
					break;
				}
			}
		},
		checkValidation(to_be_validated_fields) {
			return new Promise((resolve, reject) => {
				to_be_validated_fields.forEach(el => this.runValidation('', el));
				let error_present = to_be_validated_fields
					.map(el => { el.show_error = true; return el; })
					.some(el => el.has_error);

				resolve(error_present);
			});
		},
		validateForm(FormName = '') {
			const to_be_validated_fields = this.inputFields
			// .filter(field => {
			// 	if (FormName && field.form_name != FormName) return false;
			// 	return true;
			// });

			return this.checkValidation(to_be_validated_fields);
		},

		validateInputs(validate_fields = []) {
			const to_be_validated_fields = this.inputFields
				.filter(el => validate_fields.includes(el.field_id));
			return this.checkValidation(to_be_validated_fields);
		},

		validateInput(validate_field = '') {
			const to_be_validated_fields = this.inputFields
				.filter(el => el.field_id === validate_field);
			return this.checkValidation(to_be_validated_fields);
		},

		addValidationRules(ruleObject) {
			return Object.assign(validationRules, ruleObject);
		},

		addValidationMessages(msgObject) {
			return Object.assign(validationMessages, msgObject);
		},
	}
}

export default validator;