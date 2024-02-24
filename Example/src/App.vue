<template>
	<div>
		<h3>Validation</h3>
		<form @submit.prevent="onEnter">
			<div class="grid gap-5 md:grid-cols-2">
				<input id="full_name" v-model="data.full_name" v-validate="'required'" placeholder="Text">
				<span>{{ formErrors['full_name'] }}</span>
				<br />
				<button type="submit" id="button">button1</button>
				<br />
				<label id="text">click button to check if input is valid or not</label>
			</div>
			<div class="mt-5">
				<p class="font-semibold text-green-500 mb-5 flex items-center gap-1">
					Form has been submitted successfully
				</p>
				<button type="button"
					class="p-5 rounded-md bg-blue-600 font-semibold text-white flex items-center gap-1 hover:bg-blue-800">
					Submit Form
				</button>
			</div>
		</form>
	</div>
</template>
<script setup>
import { reactive } from 'vue';
import { useVueNiceValidate } from 'vue-nice-validate';
const { vValidate, formErrors, validateForm, validationFields } = useVueNiceValidate();

let data = reactive({
	'full_name': '',
	'email': '',
	'phone_number': '',
	'password': '',
	'confirm_password': '',
});

function onEnter() {
	var text = document.getElementById('text');
	validateForm(data).then(result => {
		if (result) {
			text.innerHTML = 'Its valid';
			text.style.color = '#008000';
		} else {
			text.innerHTML = 'Its not valid';
			text.style.color = '#ff0000';
		}
	});
}
</script>
  
<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}

#input {
	padding: 10px;
}

#button {
	margin: 10px;
}
</style>
  
