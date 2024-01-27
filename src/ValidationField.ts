import { reactive } from 'vue';
import { TValidationField } from './types';

export default function useValidationFields(validationFields){

	function addField(fieldId: string, rules: string | Record<string, any>, touch: boolean = false, fieldName?: string, formName?: string): TValidationField | false{
		// get the field_name from name or id attribute of the input element
		let field_name: string = fieldName || fieldId.replace(/_/g, ' ');
		if (field_name.includes('.')) field_name = field_name.split('.')?.slice(-1)?.pop() || field_name;
		console.log('rules',rules);

		let validation_rules = {};
		//construct validation_rules object from string format
		if (typeof rules === "string"){
			//get all rules seprated by | and loop over to convert them 
			rules.split("|").map((rule) => {
				// split the rule by : to get the rule and the parameter (if any)
				const ru = rule.split(":");
				validation_rules[ru[0]] = formatRuleParams(ru[1]);
			});
		//no need to do anything if rules are already define in object format
		}else if (typeof rules === "object"){
			Object.keys(rules).forEach(function(key) {
				if(typeof rules[key] === 'function'){
					// addValidationRules({key:rules[key]});
				}

				rules[key] = formatRuleParams(rules[key]);
			});
			validation_rules = Object.assign({}, rules);
		}else{
			/* eslint-disable-next-line */
			console.error('Invalid type passed for validation rules ' + fieldId + '.');
			return false;
		}

		const already_present_field = validationFields.find(el => el.field_id === fieldId);
		if (already_present_field) {
			/* eslint-disable-next-line */
			console.error('Duplicate field found with id ' + already_present_field.field_id + '.');
			return false;
		}

		const new_field: TValidationField = {
			'field_id': fieldId,
			'field_name': field_name,
			'form_name': '',
			'rules': validation_rules,
			'has_error': false,
			'error_msg': '',
			'failed_rule': '',
			'show_error': touch
		};

		validationFields.push(new_field);

		return new_field;
	}

	function formatRuleParams(rule_params: any): boolean|Record<string, string>{

		if (typeof rule_params === "undefined" || rule_params === "" || rule_params === null){
			return true;
		}

		if (typeof rule_params === "boolean" || typeof rule_params === "object" || typeof rule_params === "function"){
			return rule_params;
		}

		let final_params = {};
		rule_params.split(',').forEach((el,index)=>{
			final_params['param'+(index+1)] = el;
		});
		return final_params;
	}

	return {
		addField
	}
}