import validationRules from './validationRules.js';
import validationMessages from './validationMessages.js';
import { reactive } from 'vue';

const form_fields = [];
const form_errors = [];
const field_errors = reactive({});

function setFieldError(form_error,clear=false){
	//get current field errors from form_errors 
	let key = '';
	if(form_error.form_name) 
		key = form_error.form_name+'.'+form_error.field_name
	else
		key = form_error.field_name 
    
	if(clear==true){
		field_errors[key] = '';
		return false;
	}
	let field_name = form_error.field_name;
	field_name=field_name.replace(/_/g, ' ').split('#')[0];

	const val = validationMessages[form_error.rule_name]
		.replace(':attribute', field_name)
		.replace(':param', form_error.rule_param);

	field_errors[key] = val;
	return true;
}
function runValidation(to_be_validated_fields){
	//run validation and add error to form_errors
	return new Promise((resolve, reject) => {
		form_errors.length = 0;
		try{
			to_be_validated_fields.forEach((field)=>{
				for (const [rule_name, rule_parameter] of Object.entries(field.rules)) {
					const field_element = document.getElementsByName(field.field_name)[0];
      
					//continue if field not found during validation
					if(!field_element) continue;

					const field_value = field_element.value || field_element.getAttribute('validation-value');
					const form_error = {
						'field_name':field.field_name,
						'rule_name':rule_name,
						'rule_param':rule_parameter,
						'form_name':field.form_name,
					};
					if(!validationRules[rule_name](field_value, rule_parameter)){
						form_errors.push(form_error);
						setFieldError(form_error);
					}else
						setFieldError(form_error, true);
          
				}
			});
		}catch(e){
			reject(e);
		}
		if(form_errors.length)
			resolve(false);
    
		resolve(true);
	});
}
function setFormFieldData(fieldName, rules, formName) {
	let validation_rules = {};
	if (typeof rules === "string") 
		rules.split("|").map((node) => {
			const ru = node.split(":");
			validation_rules[ru[0]] = ru[1] ? ru[1] : true;
		});
	else if (typeof rules === "object") 
		validation_rules = Object.assign({}, rules);
	else 
		return false;
  

	const already_present_field = form_fields.find(el=>el.field_name===fieldName && el.formName===formName);
	if(already_present_field){
		already_present_field.rules = validation_rules;
		return true;
	}

	form_fields.push({
		field_name: fieldName,
		rules: validation_rules,
		form_name: formName,
	});
	return true;
}

export default {
	field_errors,

	validateDirective(el, binding) {
		const form = el.closest("form");
		setFormFieldData(
			el.getAttribute("name"),
			binding.value,
			form ? form.getAttribute("validationScope") : "",
		);
	},

	validateForm(FormName=''){
		const to_be_validated_fields = form_fields
			.filter(form_field=>{
				if(FormName && form_field.form_name!==FormName) return false;
				return true;
			});
		return runValidation(to_be_validated_fields);
	},

	validateInputs(validate_fields=[]){
		const to_be_validated_fields = form_fields
			.filter(form_field=>validate_fields.includes(form_field.field_name));
		return runValidation(to_be_validated_fields);
	},

	validateInput(validate_field=''){
		const to_be_validated_fields = form_fields
			.filter(form_field=>form_field.field_name===validate_field);
		return runValidation(to_be_validated_fields);
	},

	addField(field,validation_rules,formName){
		if(form_fields.some(el=>el.field_name===field)) return false;
		form_fields.push({
			'field_name':field,
			'rules':validation_rules,
			'form_name':formName ? formName : '',
		});
		return true;
	},

	onlyNumber ($event) {
		const keyCode = ($event.keyCode ? $event.keyCode : $event.which);
		if ((keyCode < 48 || keyCode > 57) && keyCode !== 190)  // 46 is dot
			$event.preventDefault();
    
	},
}