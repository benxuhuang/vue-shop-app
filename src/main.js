import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import jQuery from "jquery";
import Swal from 'sweetalert2';
import { fb } from './Firebase';
import 'popper.js'
import 'bootstrap'
import './assets/app.scss'
import VueFirestore from 'vue-firestore'
require('firebase/firestore')

Vue.use(VueFirestore, {
  key: 'id',         // the name of the property. Default is '.key'.
  enumerable: true  //  whether it is enumerable or not. Default is true.
})

Vue.use(VueFirestore)

window.Swal = Swal;
window.$ = jQuery

Vue.config.productionTip = false;
Vue.component('Navbar', require('./components/Navbar.vue').default);
Vue.component('Login', require('./components/Login.vue').default);

//當驗證狀態改變時才會mount資料，避免登入後/未登出回首頁需重新登入
let app = '';
fb.auth().onAuthStateChanged(function (user) {
  if (!app) {
    new Vue({
      router,
      render: h => h(App)
    }).$mount("#app");
  }
});
