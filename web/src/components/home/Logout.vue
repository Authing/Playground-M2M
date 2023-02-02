<template>
  <div>
    <a-dropdown-button type="text" shape="circle">
      <template #overlay>
        <a-menu @click="menuClick">
          <a-menu-item key="1"> <SmileOutlined />注销 </a-menu-item>
        </a-menu>
      </template>
      <template #icon>
        <a-avatar :src="user.photo"></a-avatar>
      </template>
    </a-dropdown-button>
  </div>
</template>
<script>
import { SmileOutlined, DownOutlined } from "@ant-design/icons-vue";
import { defineComponent, onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import { AuthingClient } from "../authing/AuthingClient";
import{useGuard} from "@authing/guard-vue3";

export default defineComponent({
  components: {
    SmileOutlined,
  },
  setup() {
    const router = useRouter();
    const guard=useGuard();
    const user=reactive({
        photo:'',
        token:''
    });

    onMounted(() => {
      AuthingClient.getCurrentUser().then((res) => {
        user.photo = res.photo?res.photo:"";
        user.token = res.token;
      });
    });

   const menuClick = (index) => {
      
      console.log(guard);
      guard.logout();
      router.push("/login");
      // AuthingClient.checkLoginStatus(user.token).then((res) => {
      //  
      // });
    };

    return {
      user,
      menuClick
    };
  },
});
</script>
