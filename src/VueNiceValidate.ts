import { reactive } from 'vue';
import { TValidationField } from './types';
import useDirective from './Directive';
import useValidator from './FieldValidator';
import useValidationField from './ValidationField';
import useFormValidator from './FormValidator';

export default function useVueNiceValidate() {
	const validationFields = reactive<TValidationField[]>([]);
	const formErrors = reactive<Record<string, string>>({});

	const { validateDirective } = useDirective(validationFields);
	const { addValidationRules } = useValidator(formErrors);

	const { addField } = useValidationField(validationFields);
	const { validateForm } = useFormValidator(validationFields, formErrors);

	return {
		validationFields,
		formErrors,

		validateDirective,

		addField,

		addValidationRules,

		validateForm,
	}
}