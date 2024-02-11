---
outline: deep
---

## Installation
You can install this plugin via npm
```sh
npm install vue-nice-validate
```

## Usage
```js
import Vue from 'vue';
import VeeValidate from 'vee-validate';

Vue.use(VeeValidate);
```

### Basic Example
All you need is to add the v-validate directive to the input you wish to validate, 
Make sure your input has a id attribute through which we will find the data to validate,
and optional name attribute for error messages generation.

Then, pass to the directive a rules string which contains a list of validation rules separated by a pipe '|'. For the following example, the validation rules are straightforward. Use required to indicate that the field is required and email to indicate that the field must be an email. To combine both rules we assign the string value required|email to the v-validate expression value.

```js
<input v-validate="'required|email'" id="email" name="email" type="text">
```

To display the error message we simply use the formErrors reactive property to display error generated for the field:
```js
<span>{{ formErrors['email'] }}</span>
```