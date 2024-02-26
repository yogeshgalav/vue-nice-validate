import useValidationField from './ValidationField';
import { DirectiveBinding, VNode } from 'vue'
import { TValidationField } from './types';

export default function useDirective(validationFields: TValidationField[]){

	const { addField, updateField, deleteField } = useValidationField(validationFields);
	// register a custom directive called v-validate
	const vValidate = {
		updated(el: HTMLElement, binding: DirectiveBinding, vnode: VNode): boolean {
			
			if(!vnode.dirs?.length){
				return false;
			}
			const validateDir = vnode.dirs.find(el=>el.value == binding.value);
			if(JSON.stringify(validateDir?.value) === JSON.stringify(validateDir?.oldValue)){
				return false;
			}
			const field_id = getFieldId(vnode);
			if (!field_id) {
				return false;
			}
			const form_name = getFormName(vnode.props?.form, binding.arg);
			const validator_field = updateField(field_id, binding.value, form_name);

			return validator_field ? true : false;
		},

		mounted(el: HTMLElement, binding: DirectiveBinding, vnode: VNode): boolean {
			const field_id = getFieldId(vnode);
			if (!field_id) {
				/* eslint-disable-next-line */
				console.error('id or validate-id attribute not found for field:', vnode.el);
				return false;
			}
			const field_name = getFieldName(vnode);
			const form_name = getFormName(vnode.props?.form, binding.arg);

			//add field to input fields bag
			const validator_field = addField(field_id, binding.value, field_name, form_name, !!binding.modifiers.all);
			
			return validator_field ? true : false;
		},
		unmounted(el: HTMLElement, binding: DirectiveBinding, vnode: VNode): boolean {
			const field_id = getFieldId(vnode);
			if (!field_id) {
				return false;
			}
			return deleteField(field_id);
		}
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
		if(vnode.props?.id){
			let field_name = vnode.props.id.replace(/_/g, ' ');
			if (field_name.includes('.')) field_name = field_name.split('.')?.slice(-1)?.pop() || field_name;
			return field_name;
		}	
		return '';
	}
	function getFormName(form?:string, arg?:string){
		if(form) return form;

		if(arg) return arg;

		return '';
	}

	return {
		vValidate
	}
}