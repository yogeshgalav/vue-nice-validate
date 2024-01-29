import setFormErrors from './FormErrors';
import useValidator from './Validator';
import { watch, isRef } from 'vue';

export default function useFormWatcher(validationFields, formErrors){
	const { runValidation } = useValidator();

	function formWatcher(data: object, form_name: string=''){
		watch(data, (newValue, oldValue) => {
			// Object.keys(newValue).forEach(key=>{
			// 	if(newValue[key] === oldValue[key]){
			// 		return;
			// 	}
			// //find validatorField with object id as key
			// //
			// })
			watchForm(data, form_name);
		}, { immediate: true });
	}
	function watchForm(data: object, form_name: string='') {
		let form_fields = validationFields.filter(el => el.form_name === form_name)
		form_fields.forEach(field => {
			
			if (!field.field_id.includes('.') && !data.hasOwnProperty(field.field_id)) {
				return;
			}
			let field_value = null;

			//if field id doesn't contain dot notation
			if(!field.field_id.includes('.')){
				field_value = getValue(data[field.field_id]);
				runValidation(field, data[field.field_id]);
				return;
			}

			//if field id contains dot notaion for nested object
			let nested_object_keys:Array<string> = field.field_id.split('.');
			// if first key is equal to form name
			if(nested_object_keys[0]===form_name){
				nested_object_keys.shift();
			}
			if(nested_object_keys.length === 1){
				field_value = getValue(data[nested_object_keys[0]]);
				runValidation(field, field_value);
				return;
			}
			field_value = findNestedFieldValue(data, nested_object_keys);
			runValidation(field, field_value);
			return;
			
		});
		setFormErrors(form_fields, formErrors);
	}

	function findNestedFieldValue(data, nested_object_keys:Array<string>){
		let nested_field_value = data;
		nested_object_keys.forEach(el=>nested_field_value = getValue(data[el]));
		return nested_field_value;
	}
	function getValue(variable) {
		if (isRef(variable)) {
			return variable.value;
		}
		return variable;
	}
	return  {
		formWatcher,
		watchForm
	}
} 