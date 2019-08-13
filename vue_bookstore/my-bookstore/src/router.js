import Vue from 'vue'
import Router from 'vue-router'
import home from './views/Home.vue'
import collect from './views/Collect.vue'
import list from './views/List.vue'
import add from './views/Add.vue'
import xiangqing from './views/xiangqing.vue'

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
  },
  {
    path: '/collect',
    name: 'collect',
    component: collect
  },
  {
    path: '/add',
    name: 'add',
    component: add
  },
  {
    path: '/xiangqing/:id',
    name: 'xiangqing',
    component: xiangqing
  }
]

export default new Router({
  routes
})
