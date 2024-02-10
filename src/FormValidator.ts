import useFieldValidator from './FieldValidator';
import { watch, isRef } from 'vue';
import { TValidationField, TValidationRules} from './types';

export default function useFormValidator(validationFields: TValidationField[], formErrors: Record<string, string>, validationRules:TValidationRules){
	const { fieldValidator } = useFieldValidator(formErrors, validationRules);

	function validateForm(data: object, form_name=''){

		const validatePromise = new Promise<boolean>((resolve, reject) => {
			let data_valid_promise = new Promise<boolean>((resolve)=>resolve(false));
			try{
				data_valid_promise = validateData(data, form_name);
			}catch(e){
				reject(e)
			}
			data_valid_promise.then(e=>resolve(e)).catch(e=>reject(e));
		});

		watch(data, (dataValue) => {
			validateData(dataValue, form_name);
		});

		return validatePromise;
	}

	function validateData(data: object, form_name:string ='') {
		let data_valid_promise = new Promise<boolean>((resolve)=>resolve(false));
		const form_fields = validationFields.filter(el => el.form_name === form_name);

		form_fields.forEach(field => {
			if (!field.field_id.includes('.') && !Object.prototype.hasOwnProperty.call(data, field.field_id)) {
				return;
			}
			let field_value = null;

			//if field id doesn't contain dot notation
			if(!field.field_id.includes('.')){
				field_value = getValue(data[field.field_id]);
				data_valid_promise = fieldValidator(field, data[field.field_id]);
				return;
			}

			//if field id contains dot notaion for nested object
			const nested_object_keys:Array<string> = field.field_id.split('.');
			// if first key is equal to form name
			// if(nested_object_keys[0]===form_name){
			// 	nested_object_keys.shift();
			// }
			// if(nested_object_keys.length === 1){
			// 	field_value = getValue(data[nested_object_keys[0]]);
			// 	data_valid_promise = fieldValidator(field, field_value);
			// 	return;
			// }
			field_value = findNestedFieldValue(data, nested_object_keys);
			data_valid_promise = fieldValidator(field, field_value);
			return;	
		});	

		return data_valid_promise;
	}

	function findNestedFieldValue(data: any, nested_object_keys:Array<string>){
		let nested_field_value = data;
		nested_object_keys.forEach(el=>nested_field_value = getValue(data[el]));
		return nested_field_value;
	}
	function getValue(variable: any) {
		if (isRef(variable)) {
			return variable.value;
		}
		return variable;
	}

	return  {
		validateForm
	}
} 