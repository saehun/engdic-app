import Vue from 'vue';
import App from './App.vue';
import Axios from 'axios';

Vue.prototype.$http = Axios;

new Vue({
  el: '#app',
  render: h => h(App)
});
