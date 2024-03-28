import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// import fontawesome plugin
import FontAwesome from '@/plugins/FontAwesome'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(FontAwesome)

app.mount('#app')
