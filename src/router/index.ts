import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import RecipeCreateView from '@/views/RecipeCreateView.vue'
import RecipeDetailsView from '@/views/RecipeDetailsView.vue'
import NotFound from '@/components/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/recipe-create',
      name: 'recipe-create',
      component: RecipeCreateView
    },
    {
      path: '/recipes/:id',
      name: 'recipe-detail',
      component: RecipeDetailsView,
      props: true
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFound
    }
  ]
})

export default router
