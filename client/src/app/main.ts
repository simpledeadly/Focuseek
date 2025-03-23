import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { router } from './router'
import persist from 'pinia-plugin-persistedstate'
import App from './App.vue'
import './styles.scss'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'

const pinia = createPinia()
pinia.use(persist)

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      prefix: 'p',
      darkModeSelector: 'system',
      cssLayer: false,
    },
  },
})
app.mount('#app')
