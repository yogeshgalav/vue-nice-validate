// One possible way to create a custom js file to write a Vue mixin that validates input fields via directive similar to VeeValidate version 2 is to use the Vue.directive method to register a custom directive that can access the value and the name of the input element, and then use the Vue.prototype method to add a global function that can check the validity of the input value against some rules. You can then import this file in your main.js file and use the custom directive in your template.
// validate.js
import Vue from 'vue'

// define some validation rules
const rules = {
    required: (value) => !!value || 'Required.',
    email: (value) => {
        let pattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
        return pattern.test(value) || 'Invalid email.'
    },
    min: (value, length) => {
        return value.length >= length || `Min ${length} characters`
    },
    max: (value, length) => {
        return value.length <= length || `Max ${length} characters`
    }
}

// register a custom directive called v-validate
Vue.directive('validate', {
    // bind hook, called only once when the directive is first bound to the element
    bind(el, binding, vnode) {
        // get the input element
        let input = el.querySelector('input')
        // get the name attribute of the input element
        let name = input.getAttribute('name')
        // get the value of the directive expression
        let expression = binding.expression
        // split the expression by | to get an array of rules
        let validators = expression.split('|')
        // add an event listener for input event
        input.addEventListener('input', function () {
            // get the value of the input element
            let value = input.value
            // loop through the validators array
            for (let validator of validators) {
                // split the validator by : to get the rule and the parameter (if any)
                let [rule, param] = validator.split(':')
                // get the validation function from the rules object
                let validateFn = rules[rule]
                // call the validation function with the value and the parameter (if any)
                let result = validateFn(value, param)
                // if the result is not true, it means there is an error message
                if (result !== true) {
                    // set the error message in the errors object with the name as the key
                    vnode.context.$setErrors(name, result)
                    // stop the loop
                    break
                } else {
                    // if there is no error message, clear the errors object with the name as the key
                    vnode.context.$clearErrors(name)
                }
            }
        })
    }
})

// add a global function to set errors in the errors object of the component
Vue.prototype.$setErrors = function (field, message) {
    // if there is no errors object in the component, create one
    if (!this.$data.errors) {
        this.$data.errors = {}
    }
    // set the error message with the field as the key
    this.$data.errors[field] = message
}

// add a global function to clear errors in the errors object of the component
Vue.prototype.$clearErrors = function (field) {
    // if there is an errors object in the component, delete the error message with the field as the key
    if (this.$data.errors) {
        delete this.$data.errors[field]
    }
}


// main.js
import Vue from 'vue'
import App from './App.vue'
import './validate.js' // import validate.js

new Vue({
    el: '#app',
    render: h => h(App)
})

    // App.vue 
    < template >
    <div id="app">
        <form>
            <div>
                <label for="email">Email</label>
                <input id="email" name="email" type="email" v-validate="'required|email'">
                    <span>{{ errors.email }}</span>
            </div>
            <div>
                <label for="password">Password</label>
                <input id="password" name="password" type="password" v-validate="'required|min:6'">
                    <span>{{ errors.password }}</span>
            </div>
            <button type="submit" :disabled="Object.keys(errors).length > 0">Submit</button>
    </form>
  </div >
</template >

    <script>
        export default {
            name: 'App',
        data() {
    return {
            errors: { } // initialize an empty errors object
    }
  }
}
    </script>
