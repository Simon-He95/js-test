import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from 'virtual:generated-pages'
import App from './App.vue'
import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
// import { test } from '../../src'

const app = createApp(App)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
app.use(Antd);
app.use(router)
app.mount('#app')
// test([
//   {
//     name: 'fn1',
//     fn: () => {
//       const arr = Array(100)
//       const result = []
//       arr.forEach((_, i) => {
//         result.push(i)
//       })
//       return result
//     }
//   }, {
//     name: 'fn2',
//     fn: () => {
//       const arr = Array(100)
//       const result = []
//       for (let i = 0; i < arr.length; i++) {
//         result.push(i)
//       }
//       return result
//     }
//   }
// ])
