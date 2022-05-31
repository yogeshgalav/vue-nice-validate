<template>
<div id="app">
  <form @submit.prevent="onEnter" validationScope=newform>
  <input
  name="field_name"
  v-validate="'required'" 
  placeholder="edit me">
  <button v-on:click="onEnter">button</button>
  </form>
</div>
</template>


<script>
import  FormMixin   from 'vue-nice-validate'
export default {
  mixins:[FormMixin ],
  name: 'App',
  components: {
  },
  methods: {
     onEnter(){
        this.validateForm('newform').then(result=>{
            if(result){
                alert('Its valid');
            }else{
                alert('Enter valid');
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
</style>
