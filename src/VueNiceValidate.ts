import validationRules from './validationRules';
import validationMessages from './validationMessages';
import { reactive, watch } from 'vue';
let translator = null;

type ValidatorField = {
	field_id: string;
	field_name: string;
	form_name: string;
	rules: Record<string, boolean|Record<string, string>>;
	has_error: boolean;
	error_msg: string;
	failed_rule: string;
	show_error: boolean;
}

let inputFields = reactive<ValidatorField[]>([]);

let formErrors = reactive<Record<string, string>>({});

function setTranslator(t){
	translator = t;
}
function messageFormatter(ruleName: string, msg_params: Record<string, string>, field_name: string = '',local = 'en') {
	let params = {'attribute':field_name, ...msg_params}
	if (translator) {
	    return translator(ruleName, params);
	}

	let str = validationMessages[ruleName];

	//replace sub-string enclosed in {} with params 
	str = str.replace(/{[^{}]+}/g, function (match) {
		return params[match.slice(1, -1)];
	});
	return str;
}

// register a custom directive called v-validate
const validateDirective = {
		bind(el: HTMLElement, binding: any, vnode: any): boolean {
			// get the input element
			let field = el.tagName.toLowerCase() == 'input' ? el : el.querySelector('input');
			let field_id = field?.getAttribute('id');
			
			if (!field || !field_id) {
				/* eslint-disable-next-line */
				console.error('Input field not found.');
				return false;
			}

			let form = el.closest('form');
			//add field to input fields bag
			let validator_field = addField(field_id, binding.value, binding.arg == 'touch', field?.getAttribute('name') || '', (form?.getAttribute('name') || ''));
			if(validator_field === false){
				return false;
			}
			
			// field.addEventListener('input', function (event) {
			// 	let field_value = (event.target as HTMLInputElement)?.value;
			// 	return runValidation(validator_field, field_value);
			// });
			return true;
		},
}

function addField(fieldId: string, rules: string | Record<string, any>, touch: boolean = false, fieldName?: string, formName?: string): ValidatorField | false{
	// get the field_name from name or id attribute of the input element
	let field_name: string = fieldName || fieldId.replace(/_/g, ' ');
	if (field_name.includes('.')) field_name = field_name.split('.')?.slice(-1)?.pop() || field_name;

	let validation_rules = {};
	//construct validation_rules object from string format
	if (typeof rules === "string")
		//get all rules seprated by | and loop over to convert them 
		rules.split("|").map((rule) => {
			// split the rule by : to get the rule and the parameter (if any)
			const ru = rule.split(":");
			validation_rules[ru[0]] = formatRuleParams(ru[1]);
		});
	//no need to do anything if rules are already define in object format
	else if (typeof rules === "object"){
		Object.keys(rules).forEach(function(key) {
			rules[key] = formatRuleParams(rules[key]);
		});
		validation_rules = Object.assign({}, rules);
	}else{
		/* eslint-disable-next-line */
		console.error('Invalid type passed for validation rules ' + fieldId + '.');
		return false;
	}

	const already_present_field = inputFields.find(el => el.field_id === fieldId);
	if (already_present_field) {
		/* eslint-disable-next-line */
		console.error('Duplicate field found with id ' + already_present_field.field_id + '.');
		return false;
	}

	const new_field: ValidatorField = {
		'field_id': fieldId,
		'field_name': field_name,
		'form_name': '',
		'rules': validation_rules,
		'has_error': false,
		'error_msg': '',
		'failed_rule': '',
		'show_error': touch
	};

	inputFields.push(new_field);

	return new_field;
}
function runValidation(field: ValidatorField, field_value: any): void {
	// loop through the validators array
	for (const [rule_name, rule_params] of Object.entries(field.rules)) {

		if (!validationRules[rule_name]) {
			/* eslint-disable-next-line */
			console.error('Validation rule "' + rule_name + '" not found.');
			continue;
		}

		let result = false;
		if(typeof rule_params === 'object'){
			result = validationRules[rule_name](field_value, rule_params);
		}else{
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
	setFormErrors();
}
function formatRuleParams(rule_params: any): boolean|Record<string, string>{

	if (typeof rule_params === "undefined" || rule_params === "" || rule_params === null){
		return true;
	}

	if (typeof rule_params === "boolean" || typeof rule_params === "object"){
		return rule_params;
	}
	
	let final_params = {};
	rule_params.split(',').forEach((el,index)=>{
		final_params['param'+(index+1)] = el;
	});
	return final_params;
}
function setFormErrors():void {
	inputFields.forEach(el => {
		if(el.has_error && el.show_error){
			formErrors[el.field_id] = el.error_msg;
		}else{
			formErrors[el.field_id] = '';
		}	
	});
}
function checkValidation(to_be_validated_fields: ValidatorField[]): boolean {

	let error_present = to_be_validated_fields
		.map(el => { el.show_error = true; return el; })
		.some(el => el.has_error);

	setFormErrors();

	return !error_present;
}
function validateForm(data, form_name='') {
	//case 1: if data is array of objects
	//case 2: if data contains array field of objects strings
	//case 2: if data contains array field of objects subfields
	watch(data,()=>{
		if(Array.isArray(data)){
			runValidationForArray(data, form_name);
		}else if(typeof data === 'object'){
			runValidationForObject(data, form_name);
		}	
	},{immediate:true})
}
function runValidationForArray(data: Array<object>, form_name: string){
	let input_fields = inputFields.filter(el=>el.form_name === form_name)
	data.forEach((el,index)=>{
		input_fields.filter(field=>field.array_key == index)
		.forEach(field=>{
			if(!el.hasOwnProperty(field.field_id)){
				return;
			}
			let value = data[field.field_id];
			runValidation(field, value);
		});
	});
}
function runValidationForObject(data: object, form_name: string){
	inputFields.filter(el=>el.form_name === form_name)
	.forEach(field=>{
		if(!data.hasOwnProperty(field.field_id)){
			return;
		}
		//if field is array
		// if(Array.isArray(data[field.field_id])){
		// 	data[field.field_id].forEach(el=>{
		// 		if(typeof el === 'object'){}
		// 		else{}
		// 	})
		// }
		let value = data[field.field_id];
		runValidation(field, value);
	});
}

function checkFormValidation(FormName?: string): boolean {
	const to_be_validated_fields = inputFields
		.filter(field => {
			if (FormName && field.form_name != FormName) return false;
			return true;
		});
	return checkValidation(to_be_validated_fields);
}
function checkInputsValidation(validate_fields: string[]): boolean {
	const to_be_validated_fields = inputFields
		.filter(el => validate_fields.includes(el.field_id));
	return checkValidation(to_be_validated_fields);
}
function checkInputValidation(validate_field: string): boolean {
	const to_be_validated_fields = inputFields
		.filter(el => el.field_id === validate_field);
	return checkValidation(to_be_validated_fields);
}
function addValidationRules(ruleObject: Record<string, any>): Record<string, any> {
	return Object.assign(validationRules, ruleObject);
}

export default {
	setTranslator,
	inputFields,
	formErrors,
	addField,
	runValidation,
	checkFormValidation,
	checkInputsValidation,
	checkInputValidation,
	addValidationRules,
	validateForm,
	validateDirective
}