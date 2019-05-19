import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import banner from '../components/banner'
import tab from '../components/tab'
import test from '../components/test'
import info from '../components/info'
import list from '../components/list'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: '/banner'
    },
    {
      path: '/banner',
      name: 'banner',
      component: banner
    },
    {
      path: '/tab',
      component: tab,
      children: [{
        path: 'info',
        component: info
      },
      {
        path: 'list',
        component: list
      }]
      // {
      //   path: 'list/:name/:id',
      //   component: list
      // }]
    },
    {
      path: '/test/:id',
      component: test
    }
  ]
})
