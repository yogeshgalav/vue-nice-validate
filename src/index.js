import validator from "./VueNiceValidate.js";

function setFormFieldData(field, rules, formName) {
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
  validator.form_fields.push({
    field_name: field,
    rules: validation_rules,
    form_name: formName ? formName : ""
  });
  return true;
}

export default {
  install: (app, options) => {
    app.config.globalProperties.$validator = validator;

    app.directive("validate", {
      inserted: function (el, binding) {
        let form = el.closest("form");
        setFormFieldData(
          el.getAttribute("name"),
          binding.value,
          form ? form.getAttribute("validationScope") : ""
        );
      }
    });
  }
};
