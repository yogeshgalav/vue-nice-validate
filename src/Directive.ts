import useValidationField from './ValidationField';

export default function useDirective(validationFields){

	const {addField} = useValidationField(validationFields);
	// register a custom directive called v-validate
	const validateDirective = {
		bind(el: HTMLElement, binding: any, vnode: any): boolean {
			if(!vnode.props.id) console.log('vnode',vnode);
			// get the input element
			let field = getElementWithId(el);
			
			if (!field) {
				/* eslint-disable-next-line */
				console.error('Input field not found.');
				return false;
			}

			let field_id = field?.getAttribute('id');
			let form = el.closest('form');
			//add field to input fields bag
			let validator_field = addField(field_id, binding.value, binding.arg == 'touch', field?.getAttribute('name') || '', (form?.getAttribute('name') || ''));
			if(validator_field === false){
				return false;
			}
			
			// field.addEventListener('input', function (event) {
			// 	let field_value = (event.target as HTMLInputElement)?.value;
			// 	return runValidation(validator_field, field_value);
			// });
			return true;
		},
	}

	function getElementWithId(element: HTMLElement): HTMLElement|null
	{
		if(!element){
			return null;
		}
		// Check if the element has an id attribute
		if (element?.getAttribute('id')) {
			return element;
		} 

		// Find child elements with an id attribute
		let childElementsWithId = element.querySelectorAll('[id]');
		return childElementsWithId.length ? childElementsWithId[0] : null;
	}

	return {
		validateDirective
	}
}