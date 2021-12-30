# Vue Form Mixin

## Project setup
```
npm install vue-form-mixin
```

## Usage
### Basic Usage
```
import FormMixin from 'vue-form-mixin'

export default {
    mixins:[FormMixin]
}
```
### Validating form fields
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


Use formErrors Method with field_name as paramter to get error

<span class="text-danger">{{ formErrors('field_name') }}</span>
```
### Get validation errors
```
use validateForm() method to validate all fields.
It return a promise with a resolved value as true or false.

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

use this.form_errors to get all errors
```

### Validate multiple forms
```
To validate on only a single form use attribute validationScope

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
### Use dynamic input names
```
Underscores will be automatically removed from field names in error message

For dynamic input fields use field name and hashtag
<input
    :name="'field_name#'+123"
    v-validate="'required'"
>
<span class="text-danger">{{ formErrors('field_name#'+123) }}</span>

and error will be show as "field name is required."
```
### Use only number inside input field
```
<input
    :name="'field_name'"
    @input="onlyNumber"
    v-validate="'required'"
>
```