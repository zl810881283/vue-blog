import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/Home'
import About from '../pages/About'
import Article from '../pages/Article'
import Admin from '../pages/admin'
import NotFound from '../pages/NotFound'
import SignOut from '../pages/SignOut'
Vue.use(Router)

export default new Router({
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
