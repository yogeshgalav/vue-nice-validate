import { reactive } from 'vue';
import { TValidationField, TFormErrors } from './types';
import useDirective from './Directive';
import useValidationField from './ValidationField';
import useFormValidator from './FormValidator';
import useValidationRules from './ValidationRules';
import { addValidationMessages } from './ValidationMessage';

export default function useVueNiceValidate() {
	const validationFields = reactive<TValidationField[]>([]);
	const formErrors = reactive<TFormErrors>({});

	const { vValidate } = useDirective(validationFields);
	const {validationRules, addValidationRules} = useValidationRules();

	const { addField } = useValidationField(validationFields);
	const { validateForm } = useFormValidator(validationFields, formErrors, validationRules);

	return {
		validationFields,
		formErrors,

		vValidate, 

		addField,

		addValidationRules,

		validateForm,

		addValidationMessages
	}
}