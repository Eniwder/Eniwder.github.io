import Vue from 'vue'
import VueRouter from 'vue-router'

import Schedule from '@/views/Schedule.vue'
import Recruitment from '@/views/Recruitment.vue'

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: '/', component: Schedule },
    { path: '/schedule', component: Schedule },
    { path: '/recruitment', component: Recruitment }
  ]
});

export default router;