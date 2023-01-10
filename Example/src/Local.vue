<template>
    <div>
        <h3>Validation</h3>
      <form @submit.prevent="onEnter" validationScope=newform>
      <input id="input"
      name="field_name"
      v-validate="'required'" 
      placeholder="Text">
      <br/>
      <button v-on:click="onEnter" id="button">button</button>
      <br/>
      <label id="text">click button to check if input is valid or not</label>
      </form>
    </div>
    </template>
<script setup>
import { validateForm, validateDirective, fieldErrors } from 'vue-nice-validate';
const vValidate = validateDirective;

function onEnter(){ 
        var text = document.getElementById('text');
          validateForm('newform').then(result=>{
              if(result){
                  text.innerHTML='Its valid';
                  text.style.color='#008000';
              }else{
                  text.innerHTML='Its not valid';
                  text.style.color='#ff0000';
              }
          });
}
</script>