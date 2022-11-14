<template>
<div id="app">
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


<script>
import  {ValidateMixin}   from 'vue-nice-validate';
export default {
  mixins:[ValidateMixin],
  name: 'App',
  methods: {
     onEnter(){ 
      var text = document.getElementById('text');

        this.validateForm('newform').then(result=>{
            if(result){
                text.innerHTML='Its valid';
                text.style.color='#008000';
            }else{
                text.innerHTML='Its not valid';
                text.style.color='#ff0000';
            }
        });
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
#input{
  padding:10px;
}
#button{
  margin:10px;
}
</style>
