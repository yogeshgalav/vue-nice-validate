import validator from "./VueNiceValidate.js";

function setFormFieldData(fieldName, rules, formName) {
  let validation_rules = {};
  if (typeof rules === "string") {
    rules.split("|").map((node) => {
      let ru = node.split(":");
      validation_rules[ru[0]] = ru[1] ? ru[1] : true;
    });
  } else if (typeof rules === "object") {
    validation_rules = Object.assign({}, rules);
  } else {
    return false;
  }

  let already_present_field = validator.form_fields.find(el=>el.field_name===fieldName && el.formName===formName);
  if(already_present_field){
    already_present_field.rules = validation_rules;
    return true;
  }

  validator.form_fields.push({
    field_name: fieldName,
    rules: validation_rules,
    form_name: formName
  });
  return true;
}

export default {
  install: (app, options) => {
    app.config.globalProperties.$validator = validator;

    app.directive("validate", (el, binding) => {
        let form = el.closest("form");
        setFormFieldData(
          el.getAttribute("name"),
          binding.value,
          form ? form.getAttribute("validationScope") : ""
        );
      });
  }
};
