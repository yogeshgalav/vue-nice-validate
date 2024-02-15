import useFieldValidator from './FieldValidator';
import { watch, toValue } from 'vue';
import { TValidationField, TValidationRules} from './types';

export default function useFormValidator(validationFields: TValidationField[], formErrors: Record<string, string>, validationRules:TValidationRules){
	const { fieldValidator } = useFieldValidator(formErrors, validationRules);

	function validateForm(data: Record<string, any>, form_name=''){
		const validatePromise = new Promise<boolean>((resolve, reject) => {
			let data_valid_promise = new Promise<boolean>((resolve)=>resolve(false));
			try{
				data_valid_promise = validateData(data, form_name);
			}catch(e){
				reject(e)
			}
			data_valid_promise.then(e=>resolve(e)).catch(e=>reject(e));
		});
		// Object.keys(data).forEach(el=>{data[el] = toRef(data[el])})
		watch(data, (dataValue) => {
			validateData(dataValue, form_name);
		}, { deep: true });

		return validatePromise;
	}

	function validateData(data: Record<string, any>, form_name:string ='') {
		let data_valid_promise = new Promise<boolean>((resolve)=>resolve(false));
		const form_fields = validationFields.filter(el => el.form_name === form_name);

		form_fields.forEach(field => {
			if (!field.field_id.includes('.') && !Object.prototype.hasOwnProperty.call(data, field.field_id)) {
				return;
			}
			let field_value = null;

			//if field id doesn't contain dot notation
			if(!field.field_id.includes('.')){
				field_value = toValue(data[field.field_id]);
				data_valid_promise = fieldValidator(field, field_value);
				return;
			}

			//if field id contains dot notaion for nested object
			// if first key is equal to form name
			// if(nested_object_keys[0]===form_name){
			// 	nested_object_keys.shift();
			// }
			// if(nested_object_keys.length === 1){
			// 	field_value = getValue(data[nested_object_keys[0]]);
			// 	data_valid_promise = fieldValidator(field, field_value);
			// 	return;
			// }
			field_value = findNestedFieldValue(data, field.field_id);

			data_valid_promise = fieldValidator(field, field_value);
			return;	
		});	

		return data_valid_promise;
	}

	function findNestedFieldValue(data: any, field_id:string){
		// split the path by dots
		const nested_keys:Array<string> = field_id.split('.');
		// start with the input object
		let nested_value = data;
		// loop through the keys
		for (const key of nested_keys) {
			// if the key exists in the object, update the value
			if (key in nested_value) {
				nested_value = nested_value[key];
			} else {
				// otherwise, return undefined
				return undefined;
			}
		}
		// return the final value
		return nested_value;
	}

	return  {
		validateForm
	}
} 