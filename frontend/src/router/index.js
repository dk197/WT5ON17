import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/create',
    name: 'Create',
    component: () => import('../views/CreateRoom.vue')
  },
  {
    path: '/join/:token',
    name: 'Join',
    component: () => import('../views/JoinRoom.vue')
  },
  {
    path: '/room',
    name: 'Room',
    component: () => import('../views/Room.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/AdminPanel.vue')
  },
  {
    path: '/waitjoin',
    name: 'WaitJoin',
    component: () => import('../views/WaitJoin.vue')
  },
  {
    path: '/groups',
    name: 'Groups',
    component: () => import('../views/Groups.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
