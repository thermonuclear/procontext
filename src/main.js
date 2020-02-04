import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import Loader from './components/app/Loader'

Vue.config.productionTip = false;

Vue.component('Loader', Loader)
/* eslint-disable */
new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
