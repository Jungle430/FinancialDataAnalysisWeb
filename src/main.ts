import { createApp } from 'vue'
import { createPinia } from 'pinia'

import ArcoVue from '@arco-design/web-vue'
import App from './App.vue'
import router from './router'
import '@arco-design/web-vue/dist/arco.css'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'


const app = createApp(App)

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(router)
app.use(ArcoVue)
app.use(pinia)
app.mount('#app')
