// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueFire from 'vuefire'
import App from './App'
import VueCarousel from 'vue-carousel';
Vue.use(VueCarousel);
Vue.use(VueFire)
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
