var form_fields= [];
function setFormFieldData(field,rules,formName){
	let validation_rules = {};	
	if(typeof rules === 'string'){
		rules.split('|').map(node=>{
			let ru = node.split(':');
			validation_rules[ru[0]]= ru[1] ? ru[1] : true; 
		});
	}else if(typeof rules === 'object'){
		validation_rules = Object.assign({},rules);
	}else{
		return false;
	}
	form_fields.push({
		'field_name':field,
		'rules':validation_rules,
		'form_name':formName ? formName : '',
	});
	return true;
}
import runValidation from './validationRules.js';
const FormMixin = {
	directives: {
		validate:{
			inserted: function (el,binding) {
				let form = el.closest('form');
				setFormFieldData(el.name,binding.value,form.getAttribute('validationScope'));
			}
		}
	},
	data(){
		return{
			form_errors:[],
		};
	},
	methods:{
		validateForm(FormName=''){
			//run validation and add error to this.form_errors
			return new Promise((resolve, reject) => {
				this.form_errors = [];
				form_fields.forEach((form_field)=>{ 
					if(FormName && form_field.form_name!==FormName) continue;
					
					for (const [key, value] of Object.entries(form_field.rules)) {
						let field_value = document.getElementsByName(form_field.field_name)[0].value;

						if(!runValidation[key](field_value)){
							this.form_errors.push({
								'field_name':form_field.field_name,
								'rule_name':key,
								'form_name':form_field.form_name,
							});
						};
					}
					if(this.form_errors.length){
						resolve(false);
					}
					resolve(true);
				});
			});
		},
		collectErrors:function(field){ /* eslint-disable-line no-unused-vars */
			if(this.form_errors){
				return this.form_errors.flatMap(node=>node);
			}
		},
		formErrors:function(field){

			if (!this.form_errors || !this.form_errors.length) {
				return null;
			}
			//get current field errors from this.form_errors 
			let field_error = this.form_errors.find(node=>{
				if(node.form_name) return (node.form_name+'.'+node.field_name)===field;
				return node.field_name===field;
			});

			if(!field_error){
				return '';
			}
			let field_name = field_error.field_name;
			//remove string between brackets and remove underscore
			field_name=field_name.replace(/_/g, ' ').split('#')[0];
			if(this.$t){
				return  this.$t('validation.'+field_error.rule_name,{'attribute': field_name});
			}
			return 
		},
		onlyNumber ($event) {
			let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
			if ((keyCode < 48 || keyCode > 57) && keyCode !== 190) { // 46 is dot
				$event.preventDefault();
			}
		},
	}
};
export default  FormMixin;
