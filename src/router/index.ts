import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/Newsfeed/HomeView.vue'
import Intro from '../views/WelcomePage.vue'
import PostPage from '../views/Newsfeed/PostPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'intro',
    component: Intro
  },
  {
    path: '/Home',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/Home/:index',
    name: 'Post',
    component: PostPage,
    props: true
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
