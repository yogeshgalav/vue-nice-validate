import setFormErrors from './FormErrors';
import useValidator from './Validator';

export default function useFormWatcher(validationFields, formErrors){
	const { runValidation } = useValidator();

	// function validateForm(data, form_name = '') {
	// 	//case 1: if data is array of objects
	// 	//case 2: if data contains array field of objects strings
	// 	//case 2: if data contains array field of objects subfields
	// 	watch(data, () => {
	// 		if (Array.isArray(data)) {
	// 			runValidationForArray(data, form_name);
	// 		} else if (typeof data === 'object') {
	// 			runValidationForObject(data, form_name);
	// 		}
	// 	}, { immediate: true })
	// }
	// function runValidationForArray(data: Array<object>, form_name: string) {
	// 	let input_fields = validationFields.filter(el => el.form_name === form_name)
	// 	data.forEach((el, index) => {
	// 		input_fields.filter(field => field.array_key == index)
	// 			.forEach(field => {
	// 				if (!el.hasOwnProperty(field.field_id)) {
	// 					return;
	// 				}
	// 				let value = data[field.field_id];
	// 				runValidation(field, value);
	// 			});
	// 	});
	// }
	function watchForm(data: object, form_name: string='') {
		let form_fields = validationFields.filter(el => el.form_name === form_name)
		form_fields.forEach(field => {
				if (!data.hasOwnProperty(field.field_id)) {
					return;
				}
				//if field is array
				// if(Array.isArray(data[field.field_id])){
				// 	data[field.field_id].forEach(el=>{
				// 		if(typeof el === 'object'){}
				// 		else{}
				// 	})
				// }
				let value = data[field.field_id];
				runValidation(field, value);
			});
		setFormErrors(form_fields, formErrors);
	}

	return  {
		watchForm
	}
} 