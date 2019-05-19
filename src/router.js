import Vue from 'vue'
import Router from 'vue-router'
import Store from './store'
import Home from './views/Home.vue'
import Profile from './views/Profile.vue'
import Chat from './views/Chat.vue'
import Users from './views/Users.vue'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/chat',
      name: 'chat',
      component: Chat,
      meta: { authRequired: true}
    },
    {
      path: '/users',
      name: 'users',
      component: Users,
      meta: { authRequired: true}
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: { authRequired: true}
    }
  ]
})

router.beforeEach((to, from, next) => {
  Store.dispatch('INIT_AUTH').then(user => {
    if (to.matched.some(route => route.meta.authRequired)) {
      if (user) {
        next()
      }
      else {
        next('/')
      }
    }
    else {
      next()
    }
  })
})

export default router