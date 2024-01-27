import {TValidationField} from './types';
import { messageFormatter } from './ValidationMessages';
import validationRules from './validationRules';

export default function useValidator(){

	function runValidation(field: TValidationField, field_value: any): void {
		// loop through the validators array
		for (const [rule_name, rule_params] of Object.entries(field.rules)) {

			if (!validationRules[rule_name]) {
				/* eslint-disable-next-line */
				console.error('Validation rule "' + rule_name + '" not found.');
				continue;
			}

			let result = false;
			if (typeof rule_params === 'object') {
				result = validationRules[rule_name](field_value, rule_params);
			} else {
				result = validationRules[rule_name](field_value);
			}

			field['has_error'] = !result;
			if (!result) {
				field['error_msg'] = messageFormatter(rule_name, typeof rule_params === 'object' ? rule_params : {}, field.field_name);
				field['failed_rule'] = rule_name;
				// stop the loop
				break;
			}
		}
	}
	function addValidationRules(ruleObject: Record<string, any>): Record<string, any> {
		return Object.assign(validationRules, ruleObject);
	}

	return {
		runValidation,
		addValidationRules
	}
}