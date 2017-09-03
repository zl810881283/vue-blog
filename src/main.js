// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import moment from 'moment'
import App from './App'
import router from './router'
import infiniteScroll from 'vue-infinite-scroll'
import VueMaterial from 'vue-material'
import axios from 'axios'
import 'vue-material/dist/vue-material.css'

axios.defaults.withCredentials = true

Vue.use(infiniteScroll)
Vue.use(VueMaterial)

Vue.config.productionTip = false

Vue.filter('clip', (string, num = 100) => {
  if (string.length > num) {
    return string.substr(0, num)
  } else {
    return string
  }
})
Vue.filter('datetime', (data, format = 'YYYY/MM/DD HH:mm:ss') => {
  return moment(data).format(format)
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
