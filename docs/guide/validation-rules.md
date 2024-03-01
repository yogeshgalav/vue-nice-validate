---
outline: deep
---

# Validation Rules
VueNiceValidate comes with a bunch of validation rules out of the box and they are all localized and cover most validation needs:

>Target based rules like after, before, and confirmed can target custom components as well as native inputs, but the target field must have a ref attribute set and the confirmed parameter must be the same ref value. For validation providers the target field must have a vid prop set instead of the ref.

## after
The field under validation must have a valid date and is after the date value in the target field.

### after params
- target: The other field's ref to be validated against. Must have the same format as the date_format rule. Can also be a date value of the same format.
- inclusion: Whether to include equal dates as a valid value, setting it to any value will set it to true, it is false by default.


>**TIP**
Target based rules like after, before, and confirmed can target custom components as well as native inputs, but the target field must have a ref attribute set and the confirmed parameter must be the same ref value. For **validation providers** the target field must have a vid prop set instead of the ref.
```<input v-validate="'date_format:dd/MM/yyyy|after:afterTarget'" name="after_field" type="text">

<input name="after_field_target" ref="afterTarget" type="text">
```