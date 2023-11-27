# Vue Nice Validate
This is the light weight validation mixin similiar to vee-validate with extended support like third-party component validations, single input or selected input or perticular form validations.
## Project setup
```
npm install vue-nice-validate
```

## Usage
### Basic Usage
```js
import ValidateMixin from 'vue-nice-validate'

export default {
    mixins:[ValidateMixin]
}
```
### Validating form fields

The validation field are searched and validated by their name attribute. If not present it will skip validation for that field. 
Use formErrors Method with field_name as paramter to get error

```js
<input
    name="field_name"
    v-validate="'required|max:5'"
>
```
or pass object
```js
<input
    name="field_name"
    v-validate="{required:true,max:5}"
>
<span class="text-danger">{{ formErrors('field_name') }}</span>
```
### Get validation errors

use validateForm() method to validate all fields.
It return a promise with a resolved value as true or false.
use this.form_errors to get all errors.
```js
methods:{
    handleSubmit(){
        this.validateForm().then(result=>{
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
```js
<form validationScope="form_name">
    <input
        name="field_name"
        v-validate="'required'"
    >
    <span class="text-danger">{{ formErrors('form_name.field_name') }}</span>
</form>

methods:{
    handleSubmit(){
        this.validateForm('form_name').then(result=>{
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
```js
<form>
    <input
        name="field_name"
        v-validate="'required'"
    >
    <span class="text-danger">{{ formErrors('field_name') }}</span>
</form>

methods:{
    handleSubmit(){
        this.validateInput('field_name').then(result=>{
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
```js
<form>
    <input
        name="field_name"
        v-validate="'required'"
    >
    <span class="text-danger">{{ formErrors('field_name') }}</span>
    <input
        name="second_field_name"
        v-validate="'required'"
    >
    <span class="text-danger">{{ formErrors('second_field_name') }}</span>
</form>

methods:{
    handleSubmit(){
        this.validateInputs(['field_name','second_field_name']).then(result=>{
            if(result){
                \\validation successfull
            }else{
                \\validation failed
            }
        });
    }
}
```
### Validate components

If v-model or value attribute is not present in component, It will read for attribute validation-value
```js
<third-party-component
    name="field_name"
    v-validate="'required'"
    :validation-value="custom_value"
>
<span class="text-danger">{{ formErrors('field_name') }}</span>

data(){
    return {
        custom_value:'',
    };
}

```
### Manually Add field

If you still struggle with any third party component or have complex requirement just add the field from script section.
```js
this.addField(field_name,validation_rules,formName)
where formName is optional parameter.
```

### Manually Manage Errors

```
As this.form_errors is available as data property you can simply add, update or delete error messages by your comfort.
```
### Use dynamic input names

Underscores will be automatically removed from field names in error message
For dynamic input fields use field name and hashtag
```js
<input
    :name="'field_name#'+123"
    v-validate="'required'"
>
<span class="text-danger">{{ formErrors('field_name#'+123) }}</span>
```
and error will be show as "field name is required."