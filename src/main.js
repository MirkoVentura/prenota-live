import Vue from 'vue'
import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css'
import VuejsDialog from "vuejs-dialog"

Vue.config.productionTip = false
Vue.use(VuejsDialog, {
  html: true,
  loader: true,
  okText: 'Proceed',
  cancelText: 'Cancel',
  animation: 'bounce'
});


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')