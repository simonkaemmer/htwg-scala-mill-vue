import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import Vuex from 'vuex'

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
  apiKey: "AIzaSyDnLKyrQTXbTwoKgnKN2xYA9LV77WmJtPk",
  authDomain: "htwg-mill-firebase.firebaseapp.com",
  projectId: "htwg-mill-firebase",
  storageBucket: "htwg-mill-firebase.appspot.com",
  messagingSenderId: "1002822741451",
  appId: "1:1002822741451:web:57575e23e6dbd931951a4e"
}

initializeApp(firebaseConfig);

new Vue({
  vuetify,
  router,
  Vuex,
  render: h => h(App),
  theme: {dark: true}
}).$mount('#app')
