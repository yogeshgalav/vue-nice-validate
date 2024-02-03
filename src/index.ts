import useVueNiceValidateFunction from "./VueNiceValidate";
import { setTranslator } from './ValidationMessage';

export const useVueNiceValidate = useVueNiceValidateFunction;

export const ValidatePlugin = {
	install(app, options) {
		if(options.messageFormatter){
			setTranslator(options.messageFormatter);
		}
		// let VueNiceValidate = useVueNiceValidate();
		// app.directive('validate', VueNiceValidate.validateDirective);
		// app.config.globalProperties.$validator = VueNiceValidate;
	}
}