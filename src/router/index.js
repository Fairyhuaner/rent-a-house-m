import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout'
const Home = () => import('@/views/Home')
const Information = () => import('@/views/Information')
const Find = () => import('@/views/Find')
const My = () => import('@/views/My')
const Login = () => import('@/views/Login')
const City = () => import('@/views/City')
const Renting = () => import('@/views/Renting')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: Home
      },
      {
        path: 'find',
        name: 'find',
        component: Find
      },
      {
        path: 'information',
        name: 'information',
        component: Information
      },
      {
        path: 'my',
        name: 'my',
        component: My
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/city',
    name: 'city',
    component: City
  },
  {
    path: '/renting',
    name: 'renting',
    component: Renting
  }
]

const router = new VueRouter({
  routes
})

export default router
