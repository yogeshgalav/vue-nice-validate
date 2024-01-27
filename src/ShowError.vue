<template>
	<span class="text-danger">{{ props.formName ? formErrors[props.formName+'#'+props.fieldId] : formErrors[props.fieldId] }}</span>
</template>
<script setup>
import {formErrors} from './VueNiceValidate'
let props = defineProps(['fieldId','formName']);
</script>