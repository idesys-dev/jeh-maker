import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

import filters from './plugins/filters';
Vue.use(filters);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
