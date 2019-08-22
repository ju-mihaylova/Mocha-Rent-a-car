import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import { auth } from '@/fb'

Vue.config.productionTip = false

Vue.mixin({
  data() {
    return {
      isLoggedin: false,
      isAdmin: false
    }
  },
  created() {
    auth.onAuthStateChanged(user => {
      if (user) {
        user.getIdTokenResult().then(idTokenResult => {
          // user.admin = idTokenResult.claims.admin;
          this.isAdmin = idTokenResult.claims.admin;
        })
        this.isLoggedin = true;
        this.isAdmin = true;
      } else {
        this.isLoggedin = false;
        this.isAdmin = false;
      }
    });
  }
});

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
