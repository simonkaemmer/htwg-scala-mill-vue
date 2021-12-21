import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'

import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import VueConfetti from 'vue-confetti'
import wb from './registerServiceWorker'
import { initializeApp } from 'firebase/app'

Vue.config.productionTip = false
Vue.prototype.$workbox = wb

Vue.use(VueSweetalert2)
Vue.use(VueConfetti)

const firebaseConfig = {
  apiKey: "AIzaSyBlo0ts5Nj4A14uJngPP0RkTgkgyclC6Yk",
  authDomain: "htwg-mill.firebaseapp.com",
  projectId: "htwg-mill",
  storageBucket: "htwg-mill.appspot.com",
  messagingSenderId: "96531561840",
  appId: "1:96531561840:web:18d5ffe59607753fa963b5"
}

initializeApp(firebaseConfig);

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
  theme: {dark: true}
}).$mount('#app')
