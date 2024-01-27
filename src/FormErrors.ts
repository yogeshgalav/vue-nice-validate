
export default function setFormErrors(validationFields, formErrors):void {
	validationFields.forEach(el => {
		if(el.has_error && el.show_error){
			formErrors[el.field_id] = el.error_msg;
		}else{
			formErrors[el.field_id] = '';
		}	
	});
}