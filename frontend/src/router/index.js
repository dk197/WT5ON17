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
  {
    path: '/mygroup',
    name: 'MyGroup',
    component: () => import('../views/MyGroup.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
