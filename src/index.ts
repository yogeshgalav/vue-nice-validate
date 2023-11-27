import VueNiceValidate from "./VueNiceValidate";

export default {
	install(Vue) {
		Vue.prototype.$validator = VueNiceValidate;
	}
};

export const ValidateMixin = VueNiceValidate;