
export default function setFormErrors(validationFields, formErrors):void {
	validationFields.forEach(el => {
		let key = el.field_id;
		if(el.form_name) key = el.form_name+'#'+key;

		if(el.has_error && el.show_error){
			formErrors[key] = el.error_msg;
		}else{
			formErrors[key] = '';
		}	
	});
}