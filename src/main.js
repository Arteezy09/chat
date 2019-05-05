import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import config from './config/firebase'
import firebase from 'firebase/app'
import 'firebase/firestore'
import VueChatScroll from 'vue-chat-scroll'

Vue.use(VueChatScroll)

Vue.use(BootstrapVue)

Vue.config.productionTip = false

firebase.initializeApp(config);
const db = firebase.firestore()

export default db

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    let vm = this
    firebase.auth().onAuthStateChanged(function(user) {
      vm.$store.dispatch('STATE_CHANGED', user)
    });
  }
}).$mount('#app')
