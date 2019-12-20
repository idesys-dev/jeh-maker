import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import E404 from './views/404.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/p/:phases',
      name: 'phases',
      component: Home
    },
    {
      // will match everything
      path: '*',
      component: E404
    }
  ]
})
