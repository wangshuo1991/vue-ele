// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import vueResource from 'vue-resource'
import Router from 'vue-router'
Vue.use(vueResource);
Vue.use(Router);

import router from './router/index.js'



Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: c => c(App),
  vueResource,
  router,
})
