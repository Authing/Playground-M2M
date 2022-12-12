<script>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import Home from './components/home/Home.vue'
import ApiManagement from './components/home/ApiManagement.vue';
import AuthingLoginVue from './components/authing/AuthingLogin.vue';
import NewHome from './components/home/NewHome.vue'
import { defineComponent, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup(){
    const route=useRouter();

    onMounted(()=>{
      console.log('xxx');
      route.push('/login');
    })
  }
})
</script>

<template>
  <div >
  <router-view />
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  background-color: red;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
