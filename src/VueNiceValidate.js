import validationRules from './validationRules.js';
import validationMessages from './validationMessages.js';

const input_fields = [];
function setInputFieldData(fieldId, fieldName='', rules, touch) {
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

	let new_field = {
		field_id: fieldId,
		field_name: fieldName,
		rules: validation_rules,
	};
	const already_present_field = input_fields.find(el=>el.field_id===fieldId);
	if(already_present_field){
		already_present_field.rules = validation_rules;
	} else {
		input_fields.push(new_field);
	}
	
	if(touch){
		runValidation([new_field]);
	}
	return true;
}

export default {
	directives: {
		validate:{
			inserted: function(el, binding) {
				let field = el.tagName.toLowerCase() == 'input' ? el : el.getElementsByTagName('input')[0];
				if(!field){
					console.error('Input field not found.')
				}

				let field_name = field.name || field.id.replace(/_/g, ' ');
				if(field_name.includes('.')) field_name = field_name.split('.').slice(-1).pop();

				setInputFieldData(field.id, field_name, binding.value, binding.arg == 'touch');
			},
		}
	},
	data(){
		return {
			field_errors: [],
		};
	},
	computed:{
		formErrors(){
			let errors = [];
			// console.log(this.field_errors);
			this.field_errors.forEach(el=>{
				let key = el.field_id;
				
				const val = validationMessages[el.rule_name]
					.replace(':attribute', el.field_name)
					.replace(':param', el.rule_param);
				// let val = validationMessages[el.rule_name]
				// 	.replace(':attribute', field_id);

				// el.rule_param.split(',').forEach((el2,in2)=>{
				// 	val.replace(':param'+(in2 ? in2 : ''), el2);
				// });
				// if(typeof this.$t === 'function'){
				// 	return this.$t(validationMessages[el.rule_name],el);
				// }
				errors[key] = val;
			});
			// console.log("errors",errors);
			
			return errors;
		},
	},

	methods:{
		runValidation(to_be_validated_fields){
			//run validation and add error to this.field_errors
			return new Promise((resolve, reject) => {
				this.field_errors.splice(0, this.field_errors.length);
				try{
					to_be_validated_fields.forEach((field)=>{
						for (const [rule_name, rule_parameter] of Object.entries(field.rules)) {
							const field_element = document.getElementById(field.field_id);

							//continue if field not found during validation
							if(!field_element) {
								console.error('Field with id #'+field.field_id+' not found for validation.');
								continue;
							}
							if(!validationRules[rule_name]){
								console.error('Validation rule "'+rule_name+'" not found for field with id #'+field.field_id+'.');
								continue;
							}

							const field_value = field_element.value || '';
							const field_error = {
								'field_id':field.field_id,
								'field_name':field.field_name,
								'rule_name':rule_name,
								'rule_param':rule_parameter,
							};
							if(!validationRules[rule_name](field_value, rule_parameter)){
								this.field_errors.push(field_error);
							}
						}
					});
				}catch(e){
					reject(e);
				}
				if(this.field_errors.length)
					resolve(false);
      
				resolve(true);
			});
		},

		
		// validateDirective(el, binding) {
		// 	let field = el.tagName.toLowerCase() == 'input' ? el : el.getElementsByTagName('input')[0];
		// 	if(!field){
		// 		console.error('Input field not found.')
		// 	}
		// 	setInputFieldData(field.id, field.name, binding.value, binding.arg == 'touch');
		// },

		validateForm(FormName=''){

			const to_be_validated_fields = input_fields
				.filter(field=>{
					if(FormName && !field.field_id.includes(FormName+'.')) return false;
					return true;
				});
			return this.runValidation(to_be_validated_fields);
		},

		validateInputs(validate_fields=[]){
			const to_be_validated_fields = input_fields
				.filter(el=>validate_fields.includes(el.field_id));
			return this.runValidation(to_be_validated_fields);
		},

		validateInput(validate_field=''){
			const to_be_validated_fields = input_fields
				.filter(el=>el.field_id===validate_field);
			return this.runValidation(to_be_validated_fields);
		},

		addField(field_id,validation_rules,field_name=''){
			//if already present don't add to input_fields bag
			if(input_fields.some(el=>el.field_id===field_id)) return false;
			//add to input_fields bag
			input_fields.push({
				'field_id':field_id,
				'field_name':field_name,
				'rules':validation_rules,
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