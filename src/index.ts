import useVueNiceValidate from "./VueNiceValidate";
import { setTranslator } from './ValidationMessages';
// import ShowErrors from "./ShowErrors.vue";
// const { ErrorChecker, validateDirective, ValidationField, FormErrors} = useVueNiceValidate();

export default useVueNiceValidate;

export const validatePlugin = {
	install(app, options) {
		if(options.messageFormatter){
			setTranslator(options.messageFormatter);
		}
		// let VueNiceValidate = useVueNiceValidate();
		// app.directive('validate', VueNiceValidate.validateDirective);
		// app.config.globalProperties.$validator = VueNiceValidate;
	}
}