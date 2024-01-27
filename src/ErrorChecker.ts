import {TValidationField} from './types';
import setFormErrors from './FormErrors';

export default function ErrorChecker(validationFields, formErrors){

	function checkValidation(to_be_validated_fields: TValidationField[]): boolean {

		let error_fields = to_be_validated_fields
			.map(el => { el.show_error = true; return el; })
			.filter(el => el.has_error);

		setFormErrors(error_fields, formErrors);

		return !(error_fields.length);
	}

	function checkValidationForForm(FormName?: string): boolean {
		const to_be_validated_fields = validationFields
			.filter(field => {
				if (FormName && field.form_name != FormName) return false;
				return true;
			});
		return checkValidation(to_be_validated_fields);
	}
	function checkValidationForMultipleInputs(validate_fields: string[]): boolean {
		const to_be_validated_fields = validationFields
			.filter(el => validate_fields.includes(el.field_id));
		return checkValidation(to_be_validated_fields);
	}
	function checkValidationForSingleInput(validate_field: string): boolean {
		const to_be_validated_fields = validationFields
			.filter(el => el.field_id === validate_field);
		return checkValidation(to_be_validated_fields);
	}

	return {
		checkValidationForForm,
		checkValidationForMultipleInputs,
		checkValidationForSingleInput
	}
}