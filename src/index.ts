import VueNiceValidate from "./VueNiceValidate";

export default {
	install(app) {
		app.directive('validate', VueNiceValidate.validateDirective);
		VueNiceValidate.setTranslator(app.config.globalProperties.$validationTranslator);
		app.config.globalProperties.$validator = VueNiceValidate;
	}
};