<template>
<div id="app">
  <form @submit.prevent="onEnter" form>
  <input
                        v-validate="'required'"
                        name="chatroom"
                        class="form-control"
                        placeholder="write Chatroom Name here"
                       
                        
                      >
                      
                      </form>
  <!-- <form validationScope="newform">
  <input
  name="field_name"
  :v-validate="required" 
  placeholder="edit me">
  <button v-on:click="handleSubmit()">button</button>
  </form> -->
</div>
</template>


<script>
import  FormMixin   from '../../src/VueNiceValidate.vue'
export default {
  mixins:[FormMixin ],
  name: 'App',
  components: {
  },
  methods: {
     onEnter(){
        this.validateForm('field_name').then(result=>{
            if(result){
                console.log('asd');
            }else{
                console.log('asdd');
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
