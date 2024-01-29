import useValidationField from './ValidationField';

export default function useDirective(validationFields){

	const {addField} = useValidationField(validationFields);
	// register a custom directive called v-validate
	const validateDirective = {
		bind(el: HTMLElement, binding: any, vnode: any): boolean {

			let field_id = getFieldId(vnode);
			if (!field_id) {
				/* eslint-disable-next-line */
				console.error('Id attribute not found for field:', vnode);
				return false;
			}
			let field_name = getFieldName(vnode.props.name);
			let form_name = getFormName(vnode.props.form, binding.arg);
			let touch = Boolean(binding.modifiers?.touch);
			//add field to input fields bag
			let validator_field = addField(field_id, binding.value, field_name, form_name, touch);
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

	function getFieldId(vnode){
		if(vnode.props.id){
			return vnode.props.id;
		}
		return null;
	}
	function getFieldName(name?:string){
		if(name) return name;
		return '';
	}
	function getFormName(form?:string, arg?:string){
		if(form) return form;

		if(arg) return arg;

		return '';
	}

	return {
		validateDirective
	}
}