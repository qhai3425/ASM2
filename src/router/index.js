import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/LoginView.vue'
import Register from '../views/RegisterView.vue'
import CreatePost from '../views/CreatePost.vue'
import User from '../views/UserView.vue'
import ListPost from '../views/ListPost.vue'
import PostDetail from '../views/PostDetail.vue'
import Pro from '../views/ProfileView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },

    {
      path: '/port',
      name: 'port',
      component: () => import('../views/CreatePost.vue'),
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('../views/UserView.vue'),
    },

    {
      path: '/dk',
      name: 'dk',
      component: () => import('../views/RegisterView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/createpost',
      name: 'createPost',
      component: CreatePost,
    },
    {
      path: '/user',
      name: 'user',
      component: User,
    },
    {
      path: '/list',
      name: 'list',
      component: ListPost,
    },
    {
      path: '/list/:id',
      name: 'PostDetail',
      component: PostDetail,
    },
    {
      path: '/pro',
      name: 'Pro',
      component: Pro,
    },
  ],
})

export default router
