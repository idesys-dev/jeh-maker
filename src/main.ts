import Vue from 'vue'
import App from './App.vue'

import SuiVue from 'semantic-ui-vue'
import 'semantic-ui-css/semantic.min.css'
import VueClipboard from 'vue-clipboard2'

import router from './router'
import store from './store'
import './filters'

Vue.use(SuiVue)
VueClipboard.config.autoSetContainer = true // add this line
Vue.use(VueClipboard)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
