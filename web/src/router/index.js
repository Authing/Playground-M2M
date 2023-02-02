import {createRouter,createWebHashHistory,createWebHistory} from 'vue-router';
import Home from '../components/home/Home.vue';
import AuthingLogin from '../components/authing/AuthingLogin.vue';

const routes = [
    {path:'/login',name:'login',component:AuthingLogin},
    { path: "/home", name: "Home", component: Home },
    {
      path: "/about",
      name: "About",
      component: () => import("../components/home/About.vue"),
    },
  ];

export default createRouter({
    history:createWebHistory(),
    routes,
});