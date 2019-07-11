import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import router from './router.js'
import store from './store.js'

import LoadingAnimation from './components/LoadingAnimation.vue'
import Clipboard from 'v-clipboard';

Vue.use(Vuex);
Vue.use(Clipboard);

Vue.component('loading-animation', LoadingAnimation)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

