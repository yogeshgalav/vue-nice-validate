import validationRules from './validationRules.js';
import validationMessages from './validationMessages.js';

var form_fields = [];
export default {
  form_fields,
  runValidation(to_be_validated_fields){
    
    //run validation and add error to this.form_errors
    return new Promise((resolve, reject) => {
      this.form_errors = [];
      try{
        to_be_validated_fields.forEach((form_field)=>{
          for (const [rule_name, rule_parameter] of Object.entries(form_field.rules)) {
            let field_element = document.getElementsByName(form_field.field_name)[0];
        
            //continue if field not found during validation
            if(!field_element) continue;

            let field_value = field_element.value || field_element.getAttribute('validation-value');
            if(!validationRules[rule_name](field_value, rule_parameter)){
              this.form_errors.push({
                'field_name':form_field.field_name,
                'rule_name':rule_name,
                'rule_param':rule_parameter,
                'form_name':form_field.form_name,
              });
            }
          }
        });
      }catch(e){
        reject(e);
      }
      if(this.form_errors.length){
        resolve(false);
      }
      resolve(true);
    });
  },
  validateForm(FormName=''){
    const to_be_validated_fields = form_fields
      .filter(form_field=>{
        if(FormName && form_field.form_name!==FormName) return false;
        return true;
      });
    return this.runValidation(to_be_validated_fields);
  },
  validateInputs(validate_fields=[]){
    const to_be_validated_fields = form_fields
      .filter(form_field=>validate_fields.includes(form_field.field_name));
    return this.runValidation(to_be_validated_fields);
  },
  validateInput(validate_field=''){
    const to_be_validated_fields = form_fields
      .filter(form_field=>form_field.field_name===validate_field);
    return this.runValidation(to_be_validated_fields);
  },
  addField(field,validation_rules,formName){
    if(form_fields.some(el=>el.field_name===field)) return false;
    form_fields.push({
      'field_name':field,
      'rules':validation_rules,
      'form_name':formName ? formName : '',
    });
    return true;
  },
  collectErrors:function(field){ /* eslint-disable-line no-unused-vars */
    if(this.form_errors){
      return this.form_errors.flatMap(node=>node);
    }
  },
  formErrors:function(field){

    if (!this.form_errors || !this.form_errors.length) {
      return null;
    }
    //get current field errors from this.form_errors 
    let field_error = this.form_errors.find(node=>{
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
  },
  onlyNumber ($event) {
    let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
    if ((keyCode < 48 || keyCode > 57) && keyCode !== 190) { // 46 is dot
      $event.preventDefault();
    }
  },
};