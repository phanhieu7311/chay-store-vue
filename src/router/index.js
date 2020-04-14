import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Shop from '../views/Shop.vue'
import About from '../views/About.vue'
import Cart from '../views/Cart.vue'
import Detail from '../views/Detail.vue'
import Checkout from '../views/Checkout.vue'
import Success from '../views/Success.vue'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import User from '../views/User.vue'
import EditUser from '../views/EditUser.vue'
import ChangePassword from '../views/ChangePassword.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/shop',
    name: 'shop',
    component: Shop,
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart
  },
  {
    path: '/product-detail',
    name: 'detail',
    component: Detail
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: Checkout
  },
  {
    path: '/success',
    name: 'success',
    component: Success
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp
  },
  {
    path: '/user',
    name: 'user',
    component: User
  },
  {
    path: '/user/edit',
    name: 'editUser',
    component: EditUser
  },
  {
    path: '/user/changePassword',
    name: 'changPassword',
    component: ChangePassword
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
