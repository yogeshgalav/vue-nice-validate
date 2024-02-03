import useValidationField from './ValidationField';
import { DirectiveBinding, VNode } from 'vue'
import { TValidationField } from './types';

export default function useDirective(validationFields: TValidationField[]){

	const {addField} = useValidationField(validationFields);
	// register a custom directive called v-validate
	const validateDirective = {
		bind(el: HTMLElement, binding: DirectiveBinding, vnode: VNode): boolean {

			const field_id = getFieldId(vnode);
			if (!field_id) {
				/* eslint-disable-next-line */
				console.error('id or validate-id attribute not found for field:', vnode.el);
				return false;
			}
			const field_name = getFieldName(vnode);
			const form_name = getFormName(vnode.props?.form, binding.arg);

			//add field to input fields bag
			const validator_field = addField(field_id, binding.value, field_name, form_name);
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

	function getFieldId(vnode: VNode){
		if(vnode.props?.id){
			return vnode.props.id;
		}
		if(vnode.props && vnode.props['validate-id']){
			return vnode.props['validate-id'];
		}
		return null;
	}
	function getFieldName(vnode: VNode){
		if(vnode.props?.name){
			return vnode.props.name;
		}
		if(vnode.props && vnode.props['validate-name']){
			return vnode.props['validate-name'];
		}		
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