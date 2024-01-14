import VueNiceValidate from "./VueNiceValidate";

export default {
	install(Vue, i18n) {
		Vue.directive('validate', VueNiceValidate.validateDirective);
		// VueNiceValidate.i18n = i18n;
		Vue.prototype.$validator = VueNiceValidate;
		// Vue.config.globalProperties.$validator = VueNiceValidate;
	}
};