import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router'
import MainPage from '@/views/mainPage/mainPage.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'MainPage',
    component: MainPage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
