import { TValidationField } from './types';
import { messageFormatter } from './ValidationMessage';
import validationRules from './ValidationRules';

export default function useFieldValidator(formErrors: Record<string, string>) {

	function addValidationRules(ruleObject: Record<string, any>): Record<string, any> {
		return Object.assign(validationRules, ruleObject);
	}

	function fieldValidator(field: TValidationField, field_value: any): Promise<boolean> {
		return new Promise<boolean>((resolve, reject) => {
			try {
				runValidation(field, field_value)
			} catch (e) {
				reject(e)
			}
			resolve(!field['has_error']);
		});
	}

	function runValidation(field: TValidationField, field_value: any) {
		// loop through the validators array
		for (const [rule_name, rule_params] of Object.entries(field.rules)) {

			if (!validationRules[rule_name]) {
				/* eslint-disable-next-line */
				console.error('Validation rule "' + rule_name + '" not found.');
				continue;
			}

			let result = false;
			if (typeof rule_params === 'boolean' && rule_params == true) {
				result = validationRules[rule_name](field_value);
			} else if (typeof rule_params === 'object' && Object.keys(rule_params).length == 1) {
				result = validationRules[rule_name](field_value, rule_params.param1);
			} else if (typeof rule_params === 'object' && Object.keys(rule_params).length > 1) {
				result = validationRules[rule_name](field_value, rule_params);
			}

			field['has_error'] = !result;
			if (!result) {
				field['error_msg'] = messageFormatter(rule_name, typeof rule_params === 'object' ? rule_params : {}, field.field_name);
				field['failed_rule'] = rule_name;

				break;
			}
		}
		setFormError(field);

	}

	function setFormError(field: TValidationField): void {
		let key = field.field_id;
		if (field.form_name) key = field.form_name + '#' + key;

		if (field.has_error) {
			formErrors[key] = field.error_msg;
		} else {
			formErrors[key] = '';
		}
	}

	return {
		fieldValidator,
		addValidationRules
	}
}