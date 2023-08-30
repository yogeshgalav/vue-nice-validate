import validationRules from './validationRules.js';
import validationMessages from './validationMessages.js';

const form_fields = [];
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
	directives: {
		validate:{
			inserted: function (el,binding) {
				let form = el.closest('form');
				setFormFieldData(el.id, binding.value, (form ? form.getAttribute('validationScope') : ''));
			}
		}
	},
	data(){
		return {
			form_errors: [],
		};
	},
	computed:{
		fieldErrors(){
			let field_errors = [];
			this.form_errors.forEach(el=>{
				let key = '';
				if(el.form_name){
					key = el.form_name+'.'+el.field_name
				}else{
					key = el.field_name 
				}

				let field_name = el.field_name;
				field_name=field_name.replace(/_/g, ' ').split('#')[0];
	
				
				const val = validationMessages[el.rule_name]
					.replace(':attribute', field_name)
					.replace(':param', el.rule_param);
				// let val = validationMessages[el.rule_name]
				// 	.replace(':attribute', field_name);

				// el.rule_param.split(',').forEach((el2,in2)=>{
				// 	val.replace(':param'+(in2 ? in2 : ''), el2);
				// });
				// if(typeof this.$t === 'function'){
				// 	return this.$t(validationMessages[el.rule_name],el);
				// }
				field_errors[key] = val;
			});
			
			return field_errors;
		}
	},
	methods:{
		runValidation(to_be_validated_fields){
			//run validation and add error to this.form_errors
			return new Promise((resolve, reject) => {
				this.form_errors.length = 0;
				try{
					to_be_validated_fields.forEach((field)=>{
						for (const [rule_name, rule_parameter] of Object.entries(field.rules)) {
							const field_element = document.getElementById(field.field_name) || document.querySelector('[validation-id="'+field.field_name+'"]');

							//continue if field not found during validation
							if(!field_element) {
								console.error('Field with id #'+field.field_name+' not found for validation.');
								continue;
							}
							if(!validationRules[rule_name]){
								console.error('Validation rule "'+rule_name+'" not found for field with id #'+field.field_name+'.');
								continue;
							}

							const field_value = field_element.value || field_element.getAttribute('validation-value') || '';
							const form_error = {
								'field_name':field.field_name,
								'rule_name':rule_name,
								'rule_param':rule_parameter,
								'form_name':field.form_name,
							};

							if(!validationRules[rule_name](field_value, rule_parameter)){
								this.form_errors.push(form_error);
							}else{
								this.form_errors.splice(this.form_errors.indexOf(form_error), 1);
							}
								

						}
					});
				}catch(e){
					reject(e);
				}
				if(this.form_errors.length)
					resolve(false);
      
				resolve(true);
			});
		},
		
		validateDirective(el, binding) {
			const form = el.closest("form");
			this.setFormFieldData(
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
			return this.runValidation(to_be_validated_fields);
		},

		validateInputs(validate_fields=[]){
			const to_be_validated_fields = form_fields
				.filter(el=>validate_fields.includes(el.field_name));
			return this.runValidation(to_be_validated_fields);
		},

		validateInput(validate_field=''){
			const to_be_validated_fields = form_fields
				.filter(el=>el.field_name===validate_field);
			return this.runValidation(to_be_validated_fields);
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

		addValidationRules(ruleObject){
			return Object.assign(validationRules, ruleObject);
		},
		
		addValidationMessages(msgObject){
			return Object.assign(validationMessages, msgObject);
		},
	}
}