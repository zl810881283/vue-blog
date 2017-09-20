import Vue from 'vue'
import Router from 'vue-router'
import { Message } from 'element-ui'
import Home from '../pages/Home'
import About from '../pages/About'
import Article from '../pages/Article'
import Admin from '../pages/admin'
import NotFound from '../pages/NotFound'
import SignOut from '../pages/SignOut'
Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/article/:id',
      name: 'Article',
      component: Article
    },
    {
      path: '/archive/:year/:month',
      name: 'Achive',
      component: Home
    },
    {
      path: '/article/tag/:id',
      name: 'Tag',
      component: Home
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    },
    {
      path: '/not-found',
      name: 'NotFound',
      component: NotFound
    },
    {
      path: '/sign-out',
      name: 'SignOut',
      component: SignOut
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name === 'Admin') {
    if (window.localStorage.getItem('userId')) {
      next()
    } else {
      next(false)
      Message.error('对不起，您没有权限访问')
    }
  } else {
    next()
  }
})

export default router
