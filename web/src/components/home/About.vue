<template>
    <div>
        <button @click="aboutClick">about</button>
    </div>
    
</template>
<script>
import { defineComponent, getCurrentInstance, getCurrentScope, onMounted } from 'vue';
import {  useRouter } from 'vue-router';

export default defineComponent({
    setup(){
        const router=useRouter();
        const name='';
        console.log('打印');
       
        onMounted(()=>{
            //console.log(getCurrentInstance().$router);
        })
        const aboutClick=()=> {
            router.push({path:'/'});
        };
        return{
            name,
            aboutClick
        }
    }
})
</script>