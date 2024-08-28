import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './style.css'  // Zorg ervoor dat deze regel aanwezig is
import 'leaflet/dist/leaflet.css'

const app = createApp(App)
app.use(createPinia())
app.mount('#app')
