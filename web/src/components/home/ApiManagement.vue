<template>
  <a-table :columns="columns" :data-source="data">
    <template #headerCell="{ column }">
      <template v-if="column.key === 'appname'">
        <span>
          <smile-outlined />
          Name
        </span>
      </template>
    </template>

    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'appkey'">
        {{ record.appkey }}
      </template>
      <template v-if="column.key === 'appsecret'">
        {{ record.appsecret }}
      </template>
      <template v-if="column.key === 'gettoken'">
        {{ record.gettoken }}
      </template>

      <template v-if="column.key === 'sourcecode'">
        <input
          id="inputcall"
          placeholder="请输入要获取的资源"
          v-model="record.sourcecode"
        />
      </template>
      <template v-if="column.key === 'call'">
        <a-button
          class="button"
          size="small"
          type="primary"
          @click="getAccessToken($event, record)"
          >获取 Token</a-button
        >
        <a-button class="button" size="small" @click="getFace($event, record)"
          >人脸识别 API</a-button
        >
        <a-button class="button" size="small" @click="getGender($event, record)"
          >性别识别 API</a-button
        >
        <a-button class="button" size="small" @click="getObject($event, record)"
          >物体识别 API</a-button
        >
        <a-button class="button" size="small" @click="getAction($event, record)"
          >动作识别 API</a-button
        >
      </template>
    </template>
  </a-table>
</template>
<script>
import { SmileOutlined, DownOutlined } from "@ant-design/icons-vue";
import { defineComponent, getCurrentInstance } from "vue";
import { request } from "../../util/request";
import { message } from "ant-design-vue";

export default defineComponent({
  setup() {
    const columns = [
      {
        dataIndex: "appkey",
        key: "appkey",
        title: "编程账号",
        width: 230,
      },
      {
        dataIndex: "appsecret",
        key: "appsecret",
        title: "编程账号密钥",
        width: 200,
      },
      {
        dataIndex: "sourcecode",
        key: "sourcecode",
        title: "资源操作",
        width: 200,
        ellipsis: true,
      },
      {
        dataIndex: "gettoken",
        key: "gettoken",
        title: "获取 Token",
        width: 300,
        ellipsis: true,
      },
      {
        dataIndex: "call",
        key: "call",
        title: "操作",
      },
    ];

    const data = [
      {
        key: "1",
        appname: "app 1",
        appkey: "",
        appsecret: "",
        sourcecode: "",
        gettoken: "",
      },
    ];

    data[0] = {
      key: "1",
      appname: "app 2",
      appkey: import.meta.env.APP_ACCESSKEY,
      appsecret: import.meta.env.APP_ACCESSSECRET,
      sourcecode: "",
      gettoken: "",
    };

    const getAccessToken = async (data, item) => {
      if (item.sourcecode == null || item.sourcecode == "") {
        message.info("请先输入资源名");
        return;
      }

      const result = await request({
        method: "POST",
        baseURL: import.meta.env.APP_AUTHING_HOST,
        url: "oidc/token",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: {
          client_id: item.appkey,
          grant_type: "client_credentials",
          client_secret: item.appsecret,
          scope: item.sourcecode,
        },
      });
      if (result.data.access_token != null) {
        message.info("获取成功");
      }
      console.log(result.data);
      item.gettoken = result.data.access_token;
    };

    const getApi= async(token,apiPath)=>{
      const result = await request({
        method: "GET",
        url: apiPath,
        baseURL: import.meta.env.APP_SERVER_HOST,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return result;
    };

    const getFace = async (data, item) => {
      if (item.gettoken === "") {
        message.info("请先请求 accesstoken");
        return;
      }
      
     var result=await getApi(item.gettoken,'api/face')
     
      message.info(result.data);
    };

    const getGender = async (data, item) => {
      //性别识别接口
      if (item.gettoken === "") {
        message.info("请先请求 accesstoken");
        return;
      }
      
     var result=await getApi(item.gettoken,'api/gender')
     
      message.info(result.data);
    };

    const getObject = async (data, item) => {
      if (item.gettoken === "") {
        message.info("请先请求 accesstoken");
        return;
      }
      
     var result=await getApi(item.gettoken,'api/object')
     
      message.info(result.data);
    };

    const getAction = async (data, item) => {
      if (item.gettoken === "") {
        message.info("请先请求 accesstoken");
        return;
      }
      
     var result=await getApi(item.gettoken,'api/action')
     
      message.info(result.data);
    };

    return {
      columns,
      data,
      getAccessToken,
      getFace,
      getGender,
      getObject,
      getAction,
    };
  },
});
</script>
<style>
.button {
  margin-left: 5px;
}

table {
  table-layout: fixed;
}

#inputcall {
  background-color: transparent;
}
</style>
