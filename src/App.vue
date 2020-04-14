<template>
  <div id="app">
    <div id="nav">
      <Header></Header>
    </div>
    <router-view/>
  </div>
</template>

<script>
import Vue from 'vue'
import VueSession from 'vue-session'
import Header from './components/Header.vue'
Vue.use(VueSession)

import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
Vue.$cookies.config('1d');

export default {
  name: 'home',
  components: {
    Header
  }
}
</script>

<style>
#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#nav {
  padding: 30px;
}

#nav a.router-link-exact-active {
  color: #e65540;
}
</style>
