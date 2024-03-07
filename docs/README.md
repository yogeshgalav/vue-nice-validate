<p align="center">
  <img width="250" src="http://vue-technologies.com/wp-content/uploads/2022/04/cropped-vue-logo-png.png">
  <br>
  <a href="https://npm.im/vue-nice-validate">
    <img src="https://badgen.net/npm/v/vue-nice-validate">
  </a>
  <a href="https://npm.im/vue-nice-validate">
    <img src="https://badgen.net/npm/dw/vue-nice-validate?color=blue">
  </a>
  <a href="https://bundlephobia.com/result?p=vue-nice-validate">
    <img src="https://badgen.net/bundlephobia/minzip/vue-nice-validate">
  </a>
</p>

# Vue Nice Validate
VueNIceValidate is the light weight validation package. This package allows developers to full fill their basic requirements for form validation without heavy templating, heavy computaion and much code. You can validate single input, multiple inputs, single form or third party component with ease. You can easily access and modify field errors, rules and messages. 

This package is in early stage so feel free to make contribution and make this package better.
## Project setup
```
npm install vue-nice-validate
```

## Usage
### Basic Usage
Use as global plugin
```
import { createApp } from 'vue'
import App from './App.vue'
import VueNiceValidate from 'vue-nice-validate';

const app = createApp(App);
app.use(VueNiceValidate);
app.mount('#app');
```
In plugin mode you can globally access v-validate directive and this.$validator to access all validation properties.

Or use in perticular component.
```
import { validateInputs, validateDirective, fieldErrors } from 'vue-nice-validate';
const vValidate = validateDirective;
```
### Validating form fields

The validation field are searched and validated by their name attribute. If not present it will skip validation for that field. 
Use formErrors Method with field_name as paramter to get error

```
<input
    name="field_name"
    v-validate="'required|max:5'"
>

or pass object

<input
    name="field_name"
    v-validate="{required:true,max:5}"
>
<span class="text-danger">{{ fieldErrors['field_name'] }}</span>
```
### Get validation errors

use validateForm() method to validate all fields.
It return a promise with a resolved value as true or false.
use this.$validator.form_errors to get all errors.
```
methods:{
    handleSubmit(){
        this.$validator.validateForm().then(result=>{
            if(result){
                \\validation successfull
            }else{
                \\validation failed
            }
        });
    }
}

```

### Validate single forms

To validate on only a single form use attribute validationScope.
```
<form validationScope="form_name">
    <input
        name="field_name"
        v-validate="'required'"
    >
    <span class="text-danger">{{ fieldErrors['form_name.field_name'] }}</span>
</form>

methods:{
    handleSubmit(){
        this.$validator.validateForm('form_name').then(result=>{
            if(result){
                \\validation successfull
            }else{
                \\validation failed
            }
        });
    }
}
```
### Validate single input

To validate on only a single form use attribute validationScope
```
<form>
    <input
        name="field_name"
        v-validate="'required'"
    >
    <span class="text-danger">{{ fieldErrors['field_name'] }}</span>
</form>

methods:{
    handleSubmit(){
        this.$validator.validateInput('field_name').then(result=>{
            if(result){
                \\validation successfull
            }else{
                \\validation failed
            }
        });
    }
}
```
### Validate multiple inputs

To validate on only a single form use attribute validationScope
```
<form>
    <input
        name="field_name"
        v-validate="'required'"
    >
    <span class="text-danger">{{ fieldErrors['field_name'] }}</span>
    <input
        name="second_field_name"
        v-validate="'required'"
    >
    <span class="text-danger">{{ fieldErrors['second_field_name'] }}</span>
</form>

methods:{
    handleSubmit(){
        this.$validator.validateInputs(['field_name','second_field_name']).then(result=>{
            if(result){
                \\validation successfull
            }else{
                \\validation failed
            }
        });
    }
}
```
### Add custom validation rules
If you want to use your custom made rule, create a function with first parameter as input value and second parameter as array of rule parameters. And return boolean value.

The "setValidationRules" function accepts single parameter as object containing rule functions. Original rule will be replaced with custom, if used with same name. 
```
import {setValidationRules} from 'vue-nice-validate';
let phoneRule = function(value,country){
    if(value.length===10 && country==='IN') return true;
    return false;
}
setValidationRules({phoneRule});
```
You can use your custom rule with same function name inside directive
```
<input v-validate="'phoneRule:IN'" value="8003345821">
```

### Add custom validation messages
If you want to use your custom messages, create an object with key as rule name and value as message. This message can have :attribute and :param inside it to be replaced with respective values.

The "setValidationMessages" function accepts single parameter as object of messages.  Original message will be replaced with custom, if used with same key.
```
import {setValidationRules} from 'vue-nice-validate';
let japaneseMsg = {
    'digits' : ':attribute は :param 桁でなければなりません。'
}
setValidationMessages(japaneseMsg);
```

### Validate components

If v-model or value attribute is not present in component, It will read for attribute validation-value
```
<third-party-component
    name="field_name"
    v-validate="'required'"
    :validation-value="custom_value"
>
<span class="text-danger">{{ fieldErrors['field_name'] }}</span>

data(){
    return {
        custom_value:'',
    };
}

```
### Manually Add field

If you still struggle with any third party component or have complex requirement just add the field from script section.
```
this.$validator.addField(field_name,validation_rules,formName)
where formName is optional parameter.
```

### Manually Manage Errors

```
As this.$validator.form_errors is available as data property you can simply add, update or delete error messages by your comfort.
```
### Use dynamic input names

Underscores will be automatically removed from field names in error message
For dynamic input fields use field name and hashtag
```
<input
    :name="'field_name#'+123"
    v-validate="'required'"
>
<span class="text-danger">{{ fieldErrors['field_name#'+123] }}</span>
```
and error will be show as "field name is required."

### Use only number inside input field
```
<input
    :name="'field_name'"
    @input="onlyNumber"
    v-validate="'required'"
>
```