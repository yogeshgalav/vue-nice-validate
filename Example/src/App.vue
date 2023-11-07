<template>
    <div class="container p-4">
        <div class="grid grid-cols-2 gap-6">
            <div>
                <div class="border border-indigo-600 p-4">
                    <h3>Login</h3>
                    <form name="form1" @submit.prevent="validateForm1">
                        <div class="mb-6">
                            <label for="full_name"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                            <input type="text" id="form1.full_name" v-model="form1.full_name" v-validate="'required'"
                                class="input-field">
                            <span class="text-red-500">{{ formErrors["form1.full_name"] }}</span>
                        </div>

                        <div class="mb-6">
                            <label for="email"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input type="text" id="form1.email" v-model="form1.email" v-validate="'required'"
                                class="input-field">
                            <span class="text-red-500">{{ formErrors["form1.email"] }}</span>

                        </div>

                        <div class="mb-6">
                            <label for="age"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Age</label>
                            <input type="text" id="form1.age" v-model="form1.age" v-validate="'required'"
                                class="input-field">
                            <span class="text-red-500">{{ formErrors["form1.age"] }}</span>
                        </div>

                        <button type="submit"
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </form>
                </div>
            </div>
            <div>
                <div class="border border-indigo-600 p-4">
                    <h3>Register</h3>
                    <form @submit.prevent="validateForm1">
                        <div class="mb-6">
                            <label for="full_name"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                            <input type="text" id="form2.full_name" v-model="form2.full_name" v-validate="'required'"
                                class="input-field">
                            <span class="text-red-500">{{ formErrors["form2.full_name"] }}</span>
                        </div>

                        <div class="mb-6">
                            <label for="email"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input type="text" id="form2.email" v-model="form2.email" v-validate="'required'"
                                class="input-field">
                            <span class="text-red-500">{{ formErrors["form2.email"] }}</span>

                        </div>

                        <div class="mb-6">
                            <label for="age"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Age</label>
                            <input type="text" id="form2.age" v-model="form2.age" v-validate="'required'"
                                class="input-field">
                            <span class="text-red-500">{{ formErrors["form2.age"] }}</span>
                        </div>

                        <button type="submit"
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </form>
                </div>
            </div>
            <!-- ... -->
            <!-- <div>
                <h3>Validation</h3>
                <div class="border border-indigo-600">

                    <form @submit.prevent="" validationScope=newform>
                        <input id="input" name="field_name" v-validate="'required'" placeholder="Text">
                        <br />
                        <button v-on:click="" id="button">button</button>
                        <br />
                        <label id="text">click button to check if input is valid or not</label>
                    </form>
                </div>
            </div>
            <div>
                <h3>Validation</h3>
                <div class="border border-indigo-600">

                    <form @submit.prevent="" validationScope=newform>
                        <input id="input" name="field_name" v-validate="'required'" placeholder="Text">
                        <br />
                        <button v-on:click="onEnter" id="button">button</button>
                        <br />
                        <label id="text">click button to check if input is valid or not</label>
                    </form>
                </div>
            </div>
            <div>
                <h3>Validation</h3>
                <div class="border border-indigo-600">

                    <form @submit.prevent="" validationScope=newform>
                        <input id="input" name="field_name" v-validate="'required'" placeholder="Text">
                        <br />
                        <button v-on:click="" id="button">button</button>
                        <br />
                        <label id="text">click button to check if input is valid or not</label>
                    </form>
                </div>
            </div>
            <div>
                <h3>Validation</h3>
                <div class="border border-indigo-600">

                    <form @submit.prevent="" validationScope=newform>
                        <input id="input" name="field_name" v-validate="'required'" placeholder="Text">
                        <br />
                        <button v-on:click="" id="button">button</button>
                        <br />
                        <label id="text">click button to check if input is valid or not</label>
                    </form>
                </div>
            </div>
            <div>
                <div class="border border-indigo-600">
                    <h3>Validation</h3>

                    <form @submit.prevent="" validationScope=newform>
                        <input id="input" name="field_name" v-validate="'required'" placeholder="Text">
                        <br />
                        <button v-on:click="" id="button">button</button>
                        <br />
                        <label id="text">click button to check if input is valid or not</label>
                    </form>
                </div>
            </div> -->
        </div>
    </div>
</template>

<script>
import {
    ValidateMixin
} from 'vue-nice-validate';
export default {
    mixins: [ValidateMixin],
    name: 'App',
    data() {
        return {
            form1: {
                full_name: '',
                email: '',
                age: '',
            },
            form2: {
                full_name: '',
                email: '',
                age: '',
            },
            form3: {
                full_name: '',
                email: '',
                age: '',
            },
            form4: {
                full_name: '',
                email: '',
                age: '',
            },
        }
    },
    methods: {
        validateForm1() {
            this.validateForm('form1');
        }
    },
};
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
