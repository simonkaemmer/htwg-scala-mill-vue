import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'

import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import VueConfetti from 'vue-confetti'

Vue.config.productionTip = false

Vue.use(VueSweetalert2)
Vue.use(VueConfetti)

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
