<template>
  <div id="app" class="section">
    <nav class="tabs is-medium">
      <ul>
        <li>
          <router-link to="/schedule">スケジュール</router-link>
        </li>
        <li>
          <router-link to="/recruitment">マルチ</router-link>
        </li>
      </ul>
    </nav>
    <div class="container is-fluid">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import 'animate.css/animate.min.css';
import 'bulma/css/bulma.css';
import 'bulma-slider/dist/css/bulma-slider.min.css';
export default {
  name: 'app',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    };
  },
  computed: {
    isActiveTab(el) {}
  }
};
</script>

<style lang="scss">
@import '../node_modules/bulma/bulma.sass';
.router-link-active {
  border-bottom-color: $tabs-link-active-border-bottom-color !important;
  color: $tabs-link-active-color !important;
}
</style>
