import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Vuelidate from 'vuelidate';
import vuetify from './plugins/vuetify'
import VueToast from 'vue-toast-notification';
import moment from 'moment'

import 'vue-toast-notification/dist/theme-sugar.css';
import '@babel/polyfill'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

moment.locale('es');

Vue.prototype.moment = moment
Vue.config.productionTip = false;

Vue.use(Vuelidate);
Vue.use(VueToast);
new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
