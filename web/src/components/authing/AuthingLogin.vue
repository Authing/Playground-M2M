<template>
  
  <!-- <Guard class="elCenter" :appId="appId" @login="onLogin"></Guard> -->
  <div id="authing-guard" class="elCenter"></div>
</template>

<script>
import {createGuard,useGuard} from "@authing/guard-vue3";
import "@authing/guard-vue3/dist/esm/guard.min.css";

import { defineComponent,onMounted } from "vue";
import { useRouter } from "vue-router";
import { setUserInfo } from "./AuthingClient";



export default defineComponent({
  name: "AuthingLogin",
  data() {
    return {
      appId: import.meta.env.APP_AUTHING_APPID,
      divClass: "divCenter",
    };
  },
  setup() {
    const route = useRouter();

    onMounted(()=>
    {
      const guard=useGuard();


      guard.start("#authing-guard").then((userInfo)=>{
        AuthingClient.setCurrentUser(userInfo);

        route.push("/home");
      })
    });

    const onLogin = (userInfo) => {
      console.log(userInfo);

     
    };

    return {
      onLogin,
    };
  },
});
 
//const guard=createGuard({appId:import.meta.env.APP_AUTHING_APPID});

  //guard.start("#authing-guard-container");

</script>
<style>
.divCenter {
  position: absolute;
  left: 50%;
  width: 500px;
  height: 100px;
  transform: translateY(0);
  text-align: center;
  background-color: red;
}

.elCenter {
  position: relative;
  float: left;

  left: 50%;
  transform: translate(50%, 15%);
  text-align: center;
}
.title {
  color: red;
}
</style>
