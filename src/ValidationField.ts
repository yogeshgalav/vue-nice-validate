import { TRuleParam, TValidationField} from './types';

export default function useValidationFields(validationFields: TValidationField[]){

	function deleteField(fieldId: string, formName?: string): boolean{

		const field_index = validationFields.findIndex(el => el.field_id === fieldId && el.form_name === formName);
		if(field_index == -1){
			return false;
		}
		delete validationFields[field_index];

		return true;
	}
	function updateField(fieldId: string, rules: string | Record<string, any>, formName?: string): TValidationField | false{

		const validation_rules = createRuleObject(rules);

		const already_present_field = validationFields.find(el => el.field_id === fieldId && el.form_name === formName);
		if(!already_present_field){
			return false;
		}
		already_present_field['rules'] = validation_rules;

		return already_present_field;
	}
	function addField(fieldId: string, rules: string | Record<string, any>, fieldName: string, formName?: string, all: boolean = false): TValidationField | false{

		const validation_rules = createRuleObject(rules);

		const already_present_field = validationFields.find(el => el.field_id === fieldId && el.form_name === formName);
		if (already_present_field) {
			/* eslint-disable-next-line */
			console.error('Duplicate field found with id ' + already_present_field.field_id + '.');
			return false;
		}

		const new_field: TValidationField = {
			'field_id': fieldId,
			'field_name': fieldName,
			'form_name': formName || '',
			'rules': validation_rules,
			'has_error': false,
			'errors': {},
			'validate_all_rules': all,
		};

		validationFields.push(new_field);

		return new_field;
	}

	//In: 'required|max:5', out:{required:true, max: {param1:'5'}}
	//In: {required:true, max:5}, out:{required:true, max: {param1:'5'}}
	function createRuleObject(rules:string|Record<string, any>){
		let validation_rules:Record<string, TRuleParam> = {};

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
	//In: 5,6 out:{param1:5, param2:6}
	//In: [foo, bar] out:{param1:foo, param2:bar}
	function formatRuleParams(rule_params: any): TRuleParam{

		if (typeof rule_params === "function"){
			return false;
		}
		if (typeof rule_params === "undefined"){
			return true;
		}
		if (typeof rule_params === "boolean"){
			return rule_params;
		}

		const final_params:Record<string, any> = {};

		if (typeof rule_params === "string"){
			rule_params.split(',').forEach((el,index)=>{
				final_params['param'+(index+1)] = el;
			});
		}
		if (Array.isArray(rule_params)){
			rule_params.forEach((el,index)=>{
				final_params['param'+(index+1)] = el;
			});
		}
		if (typeof rule_params === "object" && rule_params!==null){
			Object.keys(rule_params).forEach((el,index)=>{
				final_params['param'+(index+1)] = rule_params[el];
			});
		}

		return final_params;	
	}

	return {
		addField,
		updateField,
		deleteField
	}
}