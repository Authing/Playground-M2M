import { createApp, VueElement } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import   axios from 'axios'
import Clipboard from 'v-clipboard'
import * as VueRouter from 'vue-router'

import './assets/main.css'

import router from './router/index'


VueElement.prototype.$http=axios
VueElement.prototype.$env=process.env;
VueElement.prototype.$route=router;

const app=createApp(App)

router.beforeEach((to,from,next)=>{
    console.log(`form:${from}`);
    next();
});

app.use(router)
app.use(Antd)
app.mount('#app')

