import { TValidationField } from './types';

export default function useValidationFields(validationFields: TValidationField[]){

	function addField(fieldId: string, rules: string | Record<string, any>, fieldName?: string, formName?: string): TValidationField | false{
		// get the field_name from name or id attribute of the input element
		let field_name: string = fieldName || fieldId.replace(/_/g, ' ');
		if (field_name.includes('.')) field_name = field_name.split('.')?.slice(-1)?.pop() || field_name;

		const validation_rules = createRuleObject(rules);

		const already_present_field = validationFields.find(el => el.field_id === fieldId && el.form_name === formName);
		if (already_present_field) {
			/* eslint-disable-next-line */
			console.error('Duplicate field found with id ' + already_present_field.field_id + '.');
			return false;
		}

		const new_field: TValidationField = {
			'field_id': fieldId,
			'field_name': field_name,
			'form_name': formName || '',
			'rules': validation_rules,
			'has_error': false,
			'error_msg': '',
			'failed_rule': '',
		};

		validationFields.push(new_field);

		return new_field;
	}

	//In: 'required|max:5', out:{required:true, max: {param1:'5'}}
	//In: {required:true, max:5}, out:{required:true, max: {param1:'5'}}
	function createRuleObject(rules:string|Record<string, any>){
		let validation_rules = {};

		if (typeof rules === "string"){
			//get all rules seprated by | and loop over to convert them 
			rules.split("|").map((rule) => {
				// split the rule by : to get the rule name ru[0] and the parameters ru[1] (if any)
				const ru = rule.split(":");
				validation_rules[ru[0]] = formatRuleParams(ru[1]);
			});
		}else if (typeof rules === "object"){
			Object.keys(rules).forEach((key) => {
				rules[key] = formatRuleParams(rules[key]);
			});
			validation_rules = Object.assign({}, rules);
		}

		return validation_rules
	}
	
	//In: false, out:false
	//In: {param1:foo, param2:bar}, out:{param1:foo, param2:bar}
	//In: 5,6, out:{param1:5, param2:6}
	function formatRuleParams(rule_params: any): boolean|Record<string, string>{

		if (typeof rule_params === "boolean" || typeof rule_params === "object"){
			return rule_params;
		}

		if (typeof rule_params === "string"){
			const final_params = {};
			rule_params.split(',').forEach((el,index)=>{
				final_params['param'+(index+1)] = el;
			});
			return final_params;	
		}

		return true;
	}

	return {
		addField
	}
}