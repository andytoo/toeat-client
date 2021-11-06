import { createRouter, createWebHistory } from 'vue-router'

import store from '@/store/index'

import Cart from '../views/Cart.vue'
import SignIn from '../views/SignIn.vue'
import SignUp from '../views/SignUp.vue'
import Profile from '../views/Profile.vue'
// import About from '../views/About.vue'
import Edit from '../views/Edit.vue'

const routes = [
  {
    path: '/',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/signIn',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/signUp',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: About
  // },
  {
    path: '/new',
    name: 'New',
    component: Edit
  },
  {
    path: '/edit/:name',
    name: 'Edit',
    component: Edit
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page  
  const publicPages = ['/signIn', '/signUp']
  const authRequired = !publicPages.includes(to.path)
  let loggedIn = store.state.isUserSignedIn

  if (authRequired && !loggedIn) {
    return next('/signIn')
  } else if (!authRequired && loggedIn) {
    return next('/')
  }
  next()
})

export default router
