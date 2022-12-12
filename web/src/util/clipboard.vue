<template>
  <button v-clipboard="value"
        v-clipboard:success="onCopySuccess" 
        v-clipboard:error="onCopyError">点击复制</button>

</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
    name:"clipboard",
    setup(){
        const value="";

        const onCopySuccess=(e)=>{};

        const onCopyError=(error)=>{};

        return {
            value,
            onCopySuccess,
            onCopyError
        }
    }


});
</script>