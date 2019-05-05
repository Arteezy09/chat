import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Store from './store'
import Profile from './views/Profile.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
 
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
      beforeEnter: AuthGuard
    },
    {
      path: '/profile/:id',
      name: 'profile',
      component: Profile
    },
  ]
})

function AuthGuard(from, to, next) {
  if (Store.getters.userOnline) {
    next()
  }
  else {
    next('/')
  }
} 