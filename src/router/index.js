import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Detail from '@/components/Detail'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/detail/:name',
      name: 'Detail',
      component: Detail
    },
    { path: '*', redirect: '/' }
  ]
})

export default router
