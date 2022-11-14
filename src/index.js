import validationRules from './validationRules.js';
import validationMessages from './validationMessages.js';

export const form_fields = [];
export const form_errors = [];

function runValidation(to_be_validated_fields){
  //run validation and add error to form_errors
  return new Promise((resolve, reject) => {
    form_errors.length = 0;//clear all errors

    try{
      to_be_validated_fields.forEach((field)=>{
        for (const [rule_name, rule_parameter] of Object.entries(field.rules)) {
          let field_element = document.getElementsByName(field.field_name)[0];
      
          //continue if field not found during validation
          if(!field_element) continue;

          let field_value = field_element.value || field_element.getAttribute('validation-value');
          if(!validationRules[rule_name](field_value, rule_parameter)){
            form_errors.push({
              'field_name':field.field_name,
              'rule_name':rule_name,
              'rule_param':rule_parameter,
              'form_name':field.form_name,
            });
          }
        }
      });
    }catch(e){
      reject(e);
    }
    if(form_errors.length){
      resolve(false);
    }
    resolve(true);
  });
};
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

  let already_present_field = form_fields.find(el=>el.field_name===fieldName && el.formName===formName);
  if(already_present_field){
    already_present_field.rules = validation_rules;
    return true;
  }

  form_fields.push({
    field_name: fieldName,
    rules: validation_rules,
    form_name: formName
  });
  return true;
};
export default function validatePlugin(){
  install: (app, options) => {
    app.config.globalProperties.$validator = validator;

    app.directive("validate", Validator.ValidateDirective);
  }
};
export function validateDirective(el, binding) {
  let form = el.closest("form");
  setFormFieldData(
    el.getAttribute("name"),
    binding.value,
    form ? form.getAttribute("validationScope") : ""
  );
};
export  function validateForm(FormName=''){
  const to_be_validated_fields = form_fields
    .filter(form_field=>{
      if(FormName && form_field.form_name!==FormName) return false;
      return true;
    });
  return runValidation(to_be_validated_fields);
};
export  function validateInputs(validate_fields=[]){
  const to_be_validated_fields = form_fields
    .filter(form_field=>validate_fields.includes(form_field.field_name));
  return runValidation(to_be_validated_fields);
};
export  function validateInput(validate_field=''){
  const to_be_validated_fields = form_fields
    .filter(form_field=>form_field.field_name===validate_field);
  return runValidation(to_be_validated_fields);
};
export  function addField(field,validation_rules,formName){
  if(form_fields.some(el=>el.field_name===field)) return false;
  form_fields.push({
    'field_name':field,
    'rules':validation_rules,
    'form_name':formName ? formName : '',
  });
  return true;
};
export  function allErrors(){ /* eslint-disable-line no-unused-vars */
  if(form_errors){
    return form_errors.flatMap(node=>node);
  }
};
export  function fieldError(field){
  //get current field errors from form_errors 
  let field_error = form_errors.find(node=>{
    if(node.form_name) return (node.form_name+'.'+node.field_name)===field;
    return node.field_name===field;
  });

  if(!field_error){
    return '';
  }
  let field_name = field_error.field_name;
  //remove string between brackets and remove underscore
  field_name=field_name.replace(/_/g, ' ').split('#')[0];
  if(this.$t){
    return  this.$t('validation.'+field_error.rule_name,{'attribute': field_name});
  }

  return validationMessages[field_error.rule_name]
    .replace(':attribute', field_name)
    .replace(':param', field_error.rule_param);
};
export  function onlyNumber ($event) {
  let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
  if ((keyCode < 48 || keyCode > 57) && keyCode !== 190) { // 46 is dot
    $event.preventDefault();
  }
};