import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/index.vue';
import Home from "@/views/Home/index.vue"
import StockTable from '@/components/StockTable.vue';
import StockIndexTable from '@/components/StockIndexTable.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: 'home',
      component: Home,
      children: [
        {
          path: "/stock",
          name: "stock",
          component: StockTable
        },
        {
          path: 'stockIndex',
          name: 'stockIndex',
          component: StockIndexTable
        }
      ]
    },
    {
      path: "/login",
      name: 'login',
      component: Login
    }
  ],
})

export default router
