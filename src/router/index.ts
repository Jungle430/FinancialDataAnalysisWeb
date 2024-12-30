import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/index.vue';
import Home from "@/views/Home/index.vue"
import StockTable from '@/components/StockTable.vue';
import StockIndexTable from '@/components/StockIndexTable.vue';
import BitCoinTable from '@/components/BitCoinTable.vue';
import CommoditiesTable from '@/components/CommoditiesTable.vue';
import BondsTable from '@/components/BondsTable.vue';
import ForexTable from '@/components/ForexTable.vue';
import OffshoreRMB from '@/components/OffshoreRMB.vue';
import StockEcharts from '@/components/StockEcharts.vue';
import StockIndexEcharts from '@/components/StockIndexEcharts.vue';
import BitCoinEcharts from '@/components/BitCoinEcharts.vue';
import ForexEcharts from '@/components/ForexEcharts.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: 'home',
      component: Home,
      children: [
        {
          path: "/",
          redirect: { name: 'stock' }
        },
        {
          path: "stock",
          name: "stock",
          component: StockTable
        },
        {
          path: 'stockIndex',
          name: 'stockIndex',
          component: StockIndexTable
        },
        {
          path: 'bitCoin',
          name: 'bitCoin',
          component: BitCoinTable
        },
        {
          path: 'commodities',
          name: 'commodities',
          component: CommoditiesTable
        },
        {
          path: 'bonds',
          name: 'bonds',
          component: BondsTable
        },
        {
          path: 'forex',
          name: 'forex',
          component: ForexTable
        },
        {
          path: 'offshoreRMB',
          name: 'offshoreRMB',
          component: OffshoreRMB
        },

        {
          path: '/echarts',
          name: 'echarts',
          children: [
            {
              path: '/echarts',
              redirect: { name: 'stockEcharts', params: { code: "002594" } } // default: 比亚迪
            },
            {
              path: 'stock/:code',
              name: 'stockEcharts',
              component: StockEcharts,
              props: true
            },
            {
              path: 'stockIndex/:code',
              name: 'stockIndexEcharts',
              component: StockIndexEcharts,
              props: true,
            },
            {
              path: 'bitCoin/:code',
              name: 'bitCoinEcharts',
              component: BitCoinEcharts,
              props: true,
            },
            {
              path: 'forex/:baseCurrency/:quoteCurrency',
              name: 'forexEcharts',
              component: ForexEcharts,
              props: true,
            }
          ]
        },
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
