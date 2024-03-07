---
outline: deep
---

# Validation Rules
VueNiceValidate comes with a bunch of validation rules out of the box and they are all localized and cover most validation needs:

>Target based rules like after, before, and confirmed can target custom components as well as native inputs, but the target field must have a ref attribute set and the confirmed parameter must be the same ref value. For validation providers the target field must have a vid prop set instead of the ref.

## after
The field under validation must have a valid date and is after the date value in the target field.

## after params
- target: The other field's ref to be validated against. Must have the same format as the date_format rule. Can also be a date value of the same format.
- inclusion: Whether to include equal dates as a valid value, setting it to any value will set it to true, it is false by default.


>**TIP**
Target based rules like after, before, and confirmed can target custom components as well as native inputs, but the target field must have a ref attribute set and the confirmed parameter must be the same ref value. For **validation providers** the target field must have a vid prop set instead of the ref.

```html
<input v-validate="'date_format:dd/MM/yyyy|after:afterTarget'" name="after_field" type="text">

<input name="after_field_target" ref="afterTarget" type="text">
```

## alpha
The field under validation may only contain alphabetic characters.

```html
<input v-validate="'alpha'" name="alpha_field" type="text">
```

## alpha_num
The field under validation may contain alphabetic characters or numbers.

```html
<input v-validate="'alpha_num'" name="alpha_num_field" type="text">
```

# alpha_dash
The field under validation may contain alphabetic characters, numbers, dashes or underscores.

```html
<input v-validate="'alpha_dash'" name="alpha_dash_field" type="text">
```

## alpha_num
The field under validation may contain alphabetic characters or numbers.

```html
<input v-validate="'alpha_num'" name="alpha_num_field" type="text">
```

## alpha_spaces
The field under validation may contain alphabetic characters or spaces.

```html
<input v-validate="'alpha_spaces'" name="alpha_spaces_field" type="text">
```

## before
The field under validation must have a valid date and is before the date value in the target field.

## before params
- target: The other field's ref to be validated against. Must have the same format as the date_format rule. Can also be a date value of the same format.
- inclusion: Whether to include equal dates as a valid value, setting it to any value will set it to true, it is false by default.


>**TIP**
Target based rules like after, before, and confirmed can target custom components as well as native inputs, but the target field must have a ref attribute set and the confirmed parameter must be the same ref value. For validation providers the target field must have a vid prop set instead of the ref.

```html
<input v-validate="'date_format:dd/MM/yyyy|before:beforeTarget'" name="before_field" type="text">

<input name="before_field_target" ref="beforeTarget" type="text">
```


## between
The field under validation must have a numeric value bounded by a minimum value and a maximum value.

## between params
- min: The minimum value.
- max: The maximum value.

```html
<input v-validate="'between:1,11'" name="between_field" type="text">
```

## confirmed
The field under validation must have the same value as the confirmation field.

## confirmed params
- target: The ref of the password field.

>**TIP**
Target based rules like after, before, and confirmed can target custom components as well as native inputs, but the target field must have a ref attribute set and the confirmed parameter must be the same ref value. For validation providers the target field must have a vid prop set instead of the ref.

```html
<input v-validate="'required'" name="password" type="password" :class="{'is-danger': errors.has('password')}" placeholder="Password" ref="password">
<span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>

<input v-validate="'required|confirmed:password'" name="password_confirmation" type="password" :class="{'is-danger': errors.has('password_confirmation')}" placeholder="Password, Again" data-vv-as="password">
<span v-show="errors.has('password_confirmation')" class="help is-danger">{{ errors.first('password_confirmation') }}</span>
```

>**TIP**
Make use of the data-vv-as="password" attribute for the confirmation field. The value input for this attribute is used as the field label in the error message. This way you can reuse the password name to show either an error with the password or password_confirmation field.

## credit_card
The field under validation must be a valid credit card.

```html
<input v-validate="'credit_card'" name="credit_field" type="text">
```

## date_between
The field under validation must be a valid date between the two dates specified.

## date_between params
- min:The minimum allowed value for date. Must be in the same format as the date_format rule.
- max:The maximum allowed value for date. Must be in the same format as the date_format rule.
- inclusion: Whether to include equal dates as a valid value, it is set to () (exclude) by default. (For further information check the monentjs inclusion docsvee-validate uses date-fns but ported this functionality.

```html
<input v-validate="'date_format:dd/MM/yyyy|date_between:10/09/2016,20/09/2016'" name="date_between_field" type="text">
```

## decimal
The field under validation must be numeric and may contain the specified amount of decimal points.

## decimal params
- decimals: The maximum allowed number of decimal point numbers. Not passing the decimals will accept numeric data which may or may not contain decimal point numbers.
- separator: Character used to separate the integer from the fractional part of the number

```html
<input v-validate="'decimal:3'" name="decimal_field" type="text">
```

## digits
The field under validation must be numeric and have the specified number of digits.

## digits params
length: The number of digits.

```html
<input v-validate="'digits:3'" name="digits_field" type="text">
```

## dimensions
The file added to the field under validation must be an image (jpg,svg,jpeg,png,bmp,gif) having the exact specified dimension.

## dimensions params
- width: The width of the image.
- height: The height of the image.

```html
<input v-validate="'dimensions:30,30'" data-vv-as="image" name="dimensions_field" type="file">
```

## email
The field under validation must be a valid email.

## email params
Email rule can recieve any args from validator.js isEmail validator. Note that to be able to configure it you need to use the object format.

```html
<input v-validate="'email'" data-vv-as="email" name="email_field" type="text">
```

## ext
The file added to the field under validation must have one of the extensions specified.

## ext params
- extensions: list of extensions. ex: `ext:jpg,png,bmp,svg

```html
<input v-validate="'ext:jpeg,jpg'" data-vv-as="field" name="ext_field" type="file">
```
## image
The file added to the field under validation must have an image mime type (image/*).

```html
<input v-validate="'image'" data-vv-as="image" name="image_field" type="file">
```

## included
The field under validation must have a value that is in the specified list.

## included params
list: An iterable, like arrays or sets or strings containing the allowed list of values. in string format it should be a comma separated list. i.e: included:1,2,3.

```html
<span class="select">
  <select v-validate="'included:1,2,3'" name="in_field" data-vv-as="selected">
    <option value="1">One</option>
    <option value="2">Two</option>
    <option value="3">Three</option>
    <option value="4">Invalid</option>
  </select>
</span>
```

## ip
The field under validation must have a string that is a valid ipv4 value.

```html
<input v-validate="'ip'" data-vv-as="ip" name="ip_field" type="text">
```

## ip_or_fqdn
The field under validation must have a string that is a valid ipv4 value, a valid ipv6 value, or a valid fully-qualified domain name.

```html
<input v-validate="'ip'" data-vv-as="host_address" name="host_address_field" type="text">
```

## is
The field under validation must be equal to the first argument passed, uses === for equality checks. This rule is useful for confirming passwords when used in object form. Note that using the string format will cause any arguments to be parsed as strings, so use the object format when using this rule.

## is params
- value: A value of any type to be compared against the field value.

```html
<input v-validate="{ is: confirmation }" type="text" name="password">
<input v-model="confirmation" type="text" name="password_confirmation">
```

## is_not
A negated version of is rule, also uses the === for equality checks.

## is_not params
- value: A value of any type to be compared against the field value.

```html
<input v-validate="{ is_not: duplicate }" type="text" name="field">
<input v-model="duplicate" type="text" name="not_again">
```

## length
The field under validation must be an iterable and/or have a length property of the specified amount. If another value is provided it forces the length check to be between those values in a min/max fashion.

## length params
- len: The length the iterable should exactly have. If max is provided it will act as a min length check.
- max: The maximum length the iterable should have. Optional.

```html
<input v-validate="'length:5'" type="text" name="field">
```

## max
The field under validation length may not exceed the specified length.

## max params
- length: A numeric value representing the maximum number of characters.
11 Characters or shorter

```html
<input v-validate="'max:11'" data-vv-as="field" name="max_field" type="text">
```

## max_value
The field under validation must be a numeric value and must not be greater than the specified value.

## max_value params
- value: A numeric value representing the greatest value allowed.
Can you go over 9000?

```html
<input v-validate="'max_value:9000'" data-vv-as="field" name="max_value_field" type="text">
```

## mimes
The file type added to the field under validation should have one of the specified mime types.

## mimes params
- list: List of mime types. In string format it should be a comma separated list of mime types mimes:image/jpeg,image/png. In object form it should be an array of string values: { mimes: ['image/jpeg', 'image/png'] }.

>**TIP**
You can use '*' to specify a wild card, something like mimes:image/* will accept all image types.

```html
<input v-validate="'mimes:image/*'" data-vv-as="image" name="mimes_field" type="file">
```

## min
The field under validation length should not be less than the specified length.

## min params
- length: A numeric value representing the minimum number of characters.
Min: 3

```html
<input v-validate="'min:3'" data-vv-as="field" name="min_field" type="text">
```

## min_value
The field under validation must be a numeric value and must not be less than the specified value.

## min_value params
- value: A numeric value representing the lowest value allowed.

```html
<input v-validate="'min_value:10'" data-vv-as="field" name="min_value_field" type="text">
```

## excluded
The field under validation value should not be in the specified list.

## excluded params
- list: an iterable, like arrays or sets or strings. in string format it should be a comma separated list of invalid values. ex: excluded:1,2,3

```html
<span class="select">
  <select v-validate="'excluded:1,2,3'" name="not_in_field" data-vv-as="selected">
    <option value="1">One - Invalid</option>
    <option value="2">Two - Invalid</option>
    <option value="3">Three - Invalid</option>
    <option value="4">Four - Valid</option>
  </select>
</span>
```

## numeric
The field under validation must only consist of numbers.

```html
<input v-validate="'numeric'" data-vv-as="field" name="numeric_field" type="text">
```

## regex
The field under validation must match the specified regular expression.

## regex params
- pattern: A regular expression
- flags: list of regular expression flags (optional)
- Regex: ^([0-9]+)$ 

>**TIP**
You should not use the pipe '|' or commas ',' within your regular expression when using the string rules format as it will cause a conflict with how validators parsing works. You should use the object format of the rules instead.

```html
<input v-validate="{ required: true, regex: /\.(js|ts)$/ }" name="regex">
```

## required
The field under validation must have a non-empty value. By default, all validators pass the validation if they have "empty values" unless they are required. Those empty values are: empty strings, undefined, null.

By default, the boolean value of false will pass validate. Setting invalidateFalse to true will fail validation for false values. For example, using v-validate="'required:true'" is helpful to support pseudo-checkbox validations where the checkbox must be checked. Note that <input type='checkbox' v-validate="'required'" /> automatically supports this scenario.

>**TIP**
The required & required_if rules are special, by default the validator skips the validation for non-required fields that have an empty value. If you wish to force validation for non-required fields, use the continues modifier.

```html
<input v-validate="'required'" data-vv-as="field" name="required_field" type="text">
```

## required_if
The field under validation must have a non-empty value only if the target field (first argument) is set to one of the specified values (other arguments).

In the example below, the required_if:country,US,FM rule makes the state field required only if the ref="country" input is set to US or FM. If the target field value meets the requirement, empty values (empty strings, undefined, null and false) in the field under validation will trigger an error.
 
The state field is required when the country field has this value.
```html
<select ref="country" v-validate :class="{'input': true, 'is-danger': errors.has('required_field') }" name="select_country" >
  <option value="US">United States</option>
  <option value="OTHER">Other country</option>
</select>
<input v-validate.immediate="'required_if:country,US,FM'" data-vv-as="state" :class="{'input': true, 'is-danger': errors.has('state_field') }" name="state_field" type="text" placeholder="State">
<span v-show="errors.has('state_field')" class="help is-danger">{{ errors.first('state_field') }}</span>
```

## size
The file size added to the field under validation must not exceed the specified size in kilobytes.

## size params
- size: The maximum file size in kilobytes.

```html
<input v-validate="'size:10'" name="size_field" data-vv-as="file" type="file">
```

## url
The field under validation must be a valid url. Protocols are not required by default.

## url params
This rule can recieve any args from validator.js isURL validator. Note that to be able to configure it you need to use the object format and pass the params as an object.

```html
<input v-validate="{url: {require_protocol: true }}" data-vv-as="field" name="url_field" type="text">`
```



