import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './components/HomeView.vue'
import PostView from './components/PostView.vue'
import ui from '@nuxt/ui/vue-plugin'
import App from './App.vue'

const app = createApp(App)

const router = createRouter({
  routes: [
    { path: '/', component: HomeView },
    { path: '/posts/:id', name: 'post', component: PostView, props: true },
  ],
  history: createWebHistory(),
})

app.use(router)
app.use(ui)

app.mount('#app')
