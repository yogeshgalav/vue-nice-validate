import { reactive } from 'vue';
import { TValidationField } from './types';
import useDirective from './Directive';
import useValidationField from './ValidationField';
import useFormValidator from './FormValidator';
import useValidationRules from './ValidationRules';

export default function useVueNiceValidate() {
	const validationFields = reactive<TValidationField[]>([]);
	const formErrors = reactive<Record<string, string>>({});

	const { validateDirective } = useDirective(validationFields);
	const {validationRules, addValidationRules} = useValidationRules();

	const { addField } = useValidationField(validationFields);
	const { validateForm } = useFormValidator(validationFields, formErrors, validationRules);

	return {
		validationFields,
		formErrors,

		validateDirective,

		addField,

		addValidationRules,

		validateForm,
	}
}