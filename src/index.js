

import VueNiceValidate from "./VueNiceValidate";

export default {
  install: (app, options) => {
    app.config.globalProperties.$validator = VueNiceValidate;

    app.directive("v-validate", VueNiceValidate.ValidateDirective);
  }
};

export const fieldErrors = VueNiceValidate.field_errors;
export const validateDirective = VueNiceValidate.validateDirective;
export const validateForm = VueNiceValidate.validateForm;
export const validateInputs = VueNiceValidate.validateInputs;
export const validateInput = VueNiceValidate.validateInput;
export const setValidationMessages = VueNiceValidate.setValidationMessages;
export const setValidationRules = VueNiceValidate.setValidationRules;
export const addField = VueNiceValidate.addField;
export const onlyNumber = VueNiceValidate.onlyNumber;
