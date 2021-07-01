import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'add',
    component: () => import('../components/UserCreate')
  },
  {
    path: '/list/:cronaca',
    name: 'list',
    component: () => import('../components/UserList')
  },
  {
    path: '/admin/:cronaca',
    name: 'admin',
    component: () => import('../components/Admin')
  },
  {
    path: '/edit/:id/:cronaca',
    name: 'edit',
    component: () => import('../components/UserEdit')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router