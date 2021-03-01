import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '../views/index'
import Test from '../views/login/loginPage'
import storage from "../utils/storage";
import store from '../store'
Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      redirect: '/APList'
    },
    {
      path: '/test',
      component: () => import('../../test')
    },
    {
      path:'/index',
      component: Layout,

     /* redirect: '/addressAP',*/
      children: [
        {
          // 子路由前加上 / 在 router-link to 可以直接 写 to = '/addressAP',而且网页上显示的也只有/addressAP,
          // 如果不加/ , router-link 得写 to = '/index/addressAP',页面上显示得也是 /index/addressAP
          path:'/APlist',
          name: 'APlist',
          component: () => import('../views/addressAP/APList'),
          meta:{
            title:'位置映射IPv6网络系统',
          },
        },
        /*
        {
          path: '/submit',
          name: 'Submit',
          component: () => import('../views/submit/Submit')
        },
        */
        {
          path:'/APMap',
          name: 'APMap',
          component: () => import('../views/addressAP/APMap'),
          meta:{
            title:'位置映射IPv6网络系统',
          },
        },
        {
          path: '/loc',
          name: 'Website',
          component: () => import('../views/IPv6Info/IPv6Loc'),
          meta:{
            title:'位置映射IPv6网络系统',
          },
        },
        {
          path: '/mapping',
          name: 'Explore',
          component: () => import('../views/IPv6Info/mapping'),
          meta:{
            title:'位置映射IPv6网络系统',
          },
        },
        {
          path: '/service',
          name: 'Statistics',
          component: () => import('../views/IPv6Info/service'),
          meta:{
            title:'位置映射IPv6网络系统',
          },
        },
        {
          path: '/IPv6Info/detail',
          component: () => import('../views/IPv6Info/WebsiteDetail'),
          meta:{
            title:'位置映射IPv6网络系统',
          },
        },
        {
          path: '/dot',
          name: 'Dot',
          component: () => import('../views/IPv6Info/dot'),
          meta:{
            title:'位置映射IPv6网络系统',
          },
        },
        {
          path: '/map',
          component: () => import('../views/addressAP/APMap'),
          meta:{
            title:'位置映射IPv6网络系统',
          },
        },

        {
          path: '/priList',
          name: 'AddrExplore',
          component: () => import('../views/privacy/PrivacyList'),
          meta:{
            title:'位置映射IPv6网络系统',
          },
        },
        {
          path: '/priMap',
          name: 'AddrStatistics',
          component: () => import('../views/privacy/privacyMap'),
          meta:{
            title:'位置映射IPv6网络系统',
          },
        },
        {
          path: '/Tsinghua',
          name: 'serviceExplore',
          component: () => import('../views/apply/Tsinghua'),
          meta:{
            title:'位置映射IPv6网络系统',
          },
        },
        {
          path: '/Peking',
          name: 'ServiceStatistics',
          component: () => import('../views/apply/Peking'),
          meta:{
            title:'位置映射IPv6网络系统',
          },
        },
        {
          path: '/bupt',
          name: 'ServiceViews',
          component: () => import('../views/apply/bupt'),
          meta:{
            title:'位置映射IPv6网络系统',
          },
        },
        {
          path: '/wuhan',
          name: 'wuhan',
          component: () => import('../views/apply/wuhan'),
          meta:{
            title:'位置映射IPv6网络系统',
          },
        },
      ]
    },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

/*if (storage.get('token')) {
  store.commit("set_token",storage.get("token"))
}
router.beforeEach((to,from,next) => {
  // 判断要去的路由有没有requireAuth
  if(to.matched.some(res => res.meta.requireAuth)){
    if(store.state.token) {
      next()
    }else{
      next({
        path:'/login',
        query:{redirect: to.fullPath}
      })
    }
  }
  else{
    next()
  }
})*/

export default router
