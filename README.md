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
## Installation
The latest version supports Vue3, install it via npm
```
npm install vue-nice-validate
```
If you want to use it with Vue2, then you can use 
```
npm install vue-nice-validate@2
```

## Usage
### Basic Usage
The VueNiceValidate provide Vue3 composable function `useVueNiceValidate`
you have to run this function to get tools(Array and functions) to perform validation in your page.
For basic validation you need to import and use at least 4 entities,
`validateDirective` for using directive
`validateForm` or `validateInputs` or `validateInput` to check if perticular input fields are valid w.r.t data.
`formErrors` for showing errors in template

## Import and use useVueNiceValidate
```js
import {useVueNiceValidate} from 'vue-nice-validate';
const {validateDirective, formErrors, validateForm, validationFields} = useVueNiceValidate();
```

## Declare directive
```js
const { validateDirective } = useVueNiceValidate();
//composition API
const vValidate = validateDirective;
//optional api
export default {
	...
	directives: {
		"validate": validateDirective,
	}, 
	...
}
```

## Use directive
```html
<input id="email" v-validate="'required|email'" />
```
The html element must contain id attribute. This id attribute must contain unique value which should reperesnt variable(reacive property) name. This package take rules from your directive in template and values from your reactive properties, And combine them with help of id attribute.
so for `let email = ref('')` you can use `<input id="email" />`
for `let loginForm = reactive({email:''})` you can use `<input id="loginForm.email" />`
for `let userProfile = reactive({emails:[{email:''}]})` you can use `<input id="userProfile.emails.0.email" />`

## Check validation
```js
import { validateForm } from useVueNiceValidate();
...
	async submit(){
		let is_form_valid = await validateForm(loginForm); 
		if(!is_form_valid){
			//form is invalid
			return false;
		}
		//form is valid
		//call api
	}
...
```
validateForm is a function which returns boolean value, it can be used just before calling api, 
your fields are already checked by formWatcher, the information that any field has error or not is already available prior to checking,
this functions only checks if your fields has error or not and return boolean instantly.
This functions also add form errors to formErrors.

## Declare formErrors
```js
import { formErrors } from useVueNiceValidate();
//optional api
export default {
	...
	data() {
		return {
			...
			formErrors: formErrors,
			...
		}
	}, 
	...
}
```

## use formErrors
```html
<input id="field_id" v-validate="'required'">
<span class="text-danger">{{ formErrors['field_id'] }}</span>
```

### Message Formatter
If you are using internationalization or wants your custom validation messages to show instead of default ones,
Then you can use messageFormatter option in validatePlugin
```js
import {validatePlugin} from 'vue-nice-validate';
...
const messageFormatter = (rule, params)=>{
	return i18n.global.t(rule.toUpperCase(), params)
};
app.use(validatePlugin,{messageFormatter});
...
```


### Validate selected input fields
To validate on selected input fields you can pass object containing only those fields.
```js
import { validateForm } from useVueNiceValidate();
...
	async submit(){
		//composition API
		let is_form_valid = await validateForm({email,password}); 
		//optional API
		let is_form_valid = await validateForm({email:this.email}); 
		if(!is_form_valid){
			//form is invalid
			return false;
		}
		//form is valid
		//call api
	}
...
```


### Validate multiple forms
To validate single form if you are using multiple forms in component, 
You need to pass form name as parameter in validateForm and formWatcher
You need to mention form name in template and with field ids as well
```html
<form>
	<input id="email" form="loginForm" v-validate="'required'"/>
	<span class="text-danger">{{ formErrors['loginForm#email'] }}</span>

	<input id="password"  v-validate:loginForm="'required'"/>
	<span class="text-danger">{{ formErrors['loginForm#password'] }}</span>
</form>
<form>
	<input id="email" form="registerForm" v-validate="'required'"/>
	<span class="text-danger">{{ formErrors['registerForm#email'] }}</span>

	<input id="password"  v-validate:registerForm="'required'"/>
	<span class="text-danger">{{ formErrors['registerForm#password'] }}</span>
</form>
```
```js
import { validateForm } from useVueNiceValidate();
...
	async login(){
		if(!await validateForm('loginForm')){
			//loginForm is invalid
			return false;
		}
		...
	}
	async register(){
		if(!await validateForm('registerForm')){
			//registerForm is invalid
			return false;
		}
		...
	}
...
```
### Manually Add field
If you still struggle with any third party component or have complex requirement just add the field with addField function.
```js
	function addField(fieldId: string, rules: string | Record<string, any>, fieldName?: string, formName?: string, touch?: boolean): TValidationField | false
```
```js
import { addField } from useVueNiceValidate();
```

### Manually Manage Errors
As formErrors is available as reactive property, you can play with it in case you want to add server error or custom errors.
```js
import { formErrors } from useVueNiceValidate();
...
formErrors['email'] = 'This email is already registered. Please Login.';
...
```
//TO DO
### Validate components with no id attribute
In most cases vue components pass id attribute or id props, this you can check by inspecting HTML elements in your browser
but if you have a component with no id atrribute then you can pass it via validation-id or argument

