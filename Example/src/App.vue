<template>
	<div class="min-h-screen flex items-center justify-center">
		<div class="bg-white p-8 rounded-lg shadow-md w-full md:w-1/2 lg:w-1/3">
			<h2 class="text-2xl font-semibold mb-4">Sign Up</h2>
			<form>
				<div class="mb-4">
					<label for="full-name" class="block text-sm font-medium text-gray-700">Full Name</label>
					<input type="text" id="full-name" name="full-name"
						class="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-200">
				</div>
				<div class="mb-4">
					<label for="email" class="block text-sm font-medium text-gray-700">Email</label>
					<input type="email" id="email" name="email"
						class="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-200">
				</div>
				<div class="mb-4">
					<label for="password" class="block text-sm font-medium text-gray-700">Password</label>
					<input type="password" id="password" name="password"
						class="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-200">
				</div>
				<div class="mb-4">
					<label for="confirm-password" class="block text-sm font-medium text-gray-700">Confirm Password</label>
					<input type="password" id="confirm-password" name="confirm-password"
						class="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-200">
				</div>
				<div class="mb-4">
					<label for="phone" class="block text-sm font-medium text-gray-700">Phone Number</label>
					<input type="tel" id="phone" name="phone"
						class="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-200">
				</div>
				<button type="submit"
					class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">Sign
					Up</button>
			</form>
		</div>
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
  
