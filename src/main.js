import { createApp } from 'vue'
import { store } from './store.js'
import App from './App.vue'


const app = createApp(App)

app.use(store)

store.commit('setWord', 'stack')

app.mount('#app')
