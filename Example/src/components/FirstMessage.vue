<template>
    <div class="data">
        <h2>{{data}}</h2>
    </div>
    
</template>
<script>
export default {
    name: 'FirstMessage',
    props: {
        data: String
    }
}
</script>

<style lang="scss">
// h1{
//     font-size: 2rem;
//     font-weight: bold;
//     color: #0062c5;
// }
h2{
    font-size: 2.5rem;
    font-weight: bold;
    color: rgb(220, 20, 133);
}
</style>