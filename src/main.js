import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element-ui.js'
import './styles/global.scss'
import * as api from './api'

Vue.prototype.$api = api

new Vue({
  el: '#app',
  router,
  render: h => h(App),
})
