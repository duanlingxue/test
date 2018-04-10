import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import SportsNews from '@/views/sportsNews';
import newsInfo from '@/views/newsInfo';
import Main from '@/views/main';
import Mine from '@/views/mine';
import Register from '@/views/register'
import  Login from '@/views/login'
import  Setting from '@/views/setting'
import  History from '@/views/history'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name:'资讯',
      component: SportsNews
    },
    {
      path: '/newsinfo/:id',
      name:'详情',
      component: newsInfo
    },
    {
      path: '/main',
      name:'工具',
      component: Main
    },
    {
      path: '/mine',
      name: '我的',
      redirect: () => {
          let userMsg = (window.localStorage.userMsg);
          if (userMsg == undefined) {
            return '/mine/login'
          } else {
            return '/mine/mymsg'
          }
        },
      },
      {
        path: '/mine/register',
        name:'注册',
        component: Register
      },
      {
        path: '/mine/login',
        name:'登录',
        component: Login
      },
      {
        path:'/mine/mymsg',
        name:'我的主页',
        component:Mine,
      },
      {
        path:'/mine/history',
        name:'历史记录',
        component:History,
      },
      {
        path:'/mine/setting',
        name:'分数设置',
        component:Setting
      }


  ]
})
