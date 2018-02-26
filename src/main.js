import Vue from 'vue';
import App from './App.vue';
import Axios from 'axios';
import Print from './printAll.js'
import Load from './load.js';

Vue.prototype.$http = Axios;
Vue.prototype.print = Print;
Vue.prototype.loadSaved = Load;

export const bus = new Vue();

new Vue({
  el: '#app',
  render: h => h(App)
});
