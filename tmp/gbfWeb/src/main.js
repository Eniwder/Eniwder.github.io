import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import router from './router.js'
import store from './store.js'

import LoadingAnimation from './components/LoadingAnimation.vue'

Vue.use(Vuex)

Vue.component('loading-animation', LoadingAnimation)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

