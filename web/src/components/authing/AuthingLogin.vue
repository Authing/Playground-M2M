<template>
  <Guard class="elCenter" :appId="appId" @login="onLogin"></Guard>
</template>

<script>
import { Guard } from "@authing/vue-ui-components";

// 引入 CSS 样式
import "@authing/vue-ui-components/lib/index.min.css";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { AuthingClient } from "../authing/AuthingClient";

export default defineComponent({
  name: "AuthingLogin",
  components: {
    Guard,
  },
  data() {
    return {
      appId: import.meta.env.APP_AUTHING_APPID,
      divClass: "divCenter",
    };
  },
  setup() {
    const route = useRouter();

    const onLogin = (userInfo) => {
      console.log(userInfo);

      AuthingClient.setCurrentUser(userInfo);

      route.push("/home");
    };

    return {
      onLogin,
    };
  },
});
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
