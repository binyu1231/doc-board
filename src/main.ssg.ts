// import { createApp } from 'vue'
// import { createHead } from '@vueuse/head'
import App from './App.vue'
import { 
  // router, 
  routes 
} from './router'
import './style'
import { ViteSSG } from 'vite-ssg'

export const createApp = ViteSSG(
  App,
  { routes }
)

// app.use(createHead())
// app.use(router)

// app.mount('#app')
