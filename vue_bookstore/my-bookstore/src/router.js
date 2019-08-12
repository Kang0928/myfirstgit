import Vue from 'vue'
import Router from 'vue-router'
import home from './views/Home.vue'
// import Collect from './views/Collect.vue'
import list from './views/List.vue'
// import Add from './views/Add.vue'

Vue.use(Router)

let routes = [
  {
    path: '/',
    component: home
  },
  {
    path: '/home',
    name: 'home',
    component: home
  },
  {
    path: '/list',
    name: 'list',
    component: list
  }
]

export default new Router({
  routes
})
