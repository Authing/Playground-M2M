<template>
  <div>
    <div style="float: right">
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
    <div style="float: right">{{ user.username }}</div>
  </div>
</template>
<script>
import { SmileOutlined, DownOutlined } from "@ant-design/icons-vue";
import { defineComponent, onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import { setUserInfo, UserInfo } from "../authing/AuthingClient";
import { request } from "../../util/request";

export default defineComponent({
  components: {
    SmileOutlined,
  },
  setup() {
    const router = useRouter();
    const user = reactive({
      photo: "",
      username: "",
    });

    onMounted(() => {
      user.photo = UserInfo.photo;
      user.username = UserInfo.username;
    });

    const menuClick = async (index) => {
      console.log(index);
      if (index.key == "1") {
        console.log( import.meta.env);
        const result = await request({
          method: "GET",
          url: "/api/logout",
          baseURL: import.meta.env.APP_SERVER_HOST,
          headers: {
            Authorization: `Bearer ${UserInfo.token}`,
          },
        });
        console.log(result);
        if(result.data==true){
          setUserInfo("");
          router.push("/login");
        }
        
      }
      // AuthingClient.checkLoginStatus(UserInfo.token).then((res) => {
      //   router.push("/login");
      // });
    };

    return {
      user,
      menuClick,
    };
  },
});
</script>
