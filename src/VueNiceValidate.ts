import { reactive } from 'vue';
import { TValidationField } from './types';
import useDirective from './Directive';
import useErrorChecker from './ErrorChecker';
import useValidator from './Validator';
import useValidationField from './ValidationField';
import useFormWatcher from './FormWatcher';

export default function useVueNiceValidate() {
	let validationFields = reactive<TValidationField[]>([]);
	let formErrors = reactive<Record<string, string>>({});

	const { validateDirective } = useDirective(validationFields);
	const { runValidation, addValidationRules } = useValidator();
	const { 
		checkValidationForForm,
		checkValidationForMultipleInputs,
		checkValidationForSingleInput 
	} = useErrorChecker(validationFields, formErrors);

	const { addField } = useValidationField(validationFields);
	const { watchForm } = useFormWatcher(validationFields, formErrors);

	return {
		validationFields,
		formErrors,

		validateDirective,

		addField,

		runValidation,
		addValidationRules,

		validateInputs: checkValidationForMultipleInputs,
		validateInput: checkValidationForSingleInput,
		validateForm: checkValidationForForm,

		watchForm,
	}
}