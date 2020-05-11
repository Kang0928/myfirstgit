import Vue from 'vue'
import Router from 'vue-router'
import home from './views/Home.vue'
import classes from './views/Classes.vue'  //团队
import list from './views/List.vue'  //通讯录
import user from './views/User.vue'
import login from './views/Login.vue'
import register from './views/Register.vue'
import CreateTeam from './views/CreateTeam.vue'
import JoinTeam from './views/JoinTeam.vue'
import SendingNotice from './views/SendingNotice.vue' //发布通知

Vue.use(Router)

let router = new Router({
  routes: [
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
      component: list,
    },
    {
      path: '/classes',
      name: 'classes',
      component: classes
    },
    {
      path: '/user',
      name: 'user',
      component: user
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    }
    ,
    {
      path: '/CreateTeam',
      name: 'CreateTeam',
      component: CreateTeam
    },
    {
      path: '/JoinTeam',
      name: 'JoinTeam',
      component: JoinTeam
    },
    {
      path: '/SendingNotice',
      name: 'SendingNotice',
      component: SendingNotice
    }
  ]
})

router.beforeEach((to,from,next) => {
  let isNext = JSON.parse(localStorage.getItem("isLogin")).code != "0";
  if(isNext){
    if(to.fullPath != '/'&&to.fullPath != '/home'&&to.fullPath != '/user'&&to.fullPath != '/register'&&to.fullPath != '/login'){
      console.log("您好,请登录");
      next('\login')
    }else{
      next()
    }
  }else{
    next()
  }
})

export default router