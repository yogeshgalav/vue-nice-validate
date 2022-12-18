

import VueNiceValidate from "./VueNiceValidate";

export default {
  install: (app, options) => {
    app.config.globalProperties.$validator = VueNiceValidate;

    app.directive("validate", VueNiceValidate.ValidateDirective);
  }
};

export const field_errors = VueNiceValidate.field_errors;
export const validateDirective = VueNiceValidate.validateDirective;
export const validateForm = VueNiceValidate.validateForm;
export const validateInputs = VueNiceValidate.validateInputs;
export const validateInput = VueNiceValidate.validateInput;
export const addField = VueNiceValidate.addField;
export const onlyNumber = VueNiceValidate.onlyNumber;
