import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VueKeyCloak from '@dsb-norge/vue-keycloak-js';
import Axios from 'axios';

Vue.config.productionTip = false;

import './styles/app.scss';

import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import '@fortawesome/fontawesome-pro/js/all';
import store from './store';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(Buefy, {
  defaultIconPack: 'fas',
});

process.env.NODE_ENV;

const ssoUrl = 'http://auth.stremos.com/auth';
const ssoClientId = 'development';
const ssoRealm = 'STREMOS';
const logoutUrl = 'http://localhost:8080';

function tokenInterceptor() {
  Axios.interceptors.request.use(
    config => {
      const currentConfig = config;
      if (process.env.NODE_ENV === 'development') {
        currentConfig.headers.Authorization = `Bearer ${Vue.prototype.$keycloak.token}`;
      } else {
        currentConfig.headers.Authorization = `Bearer devToken`;
      }
      return currentConfig;
    },
    error => Promise.reject(error),
  );
}

if (process.env.NODE_ENV === 'development') {
  tokenInterceptor();
  new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount('#app');
} else {
  Vue.use(VueKeyCloak, {
    logout: {
      redirectUri: logoutUrl,
    },
    init: {
      onLoad: 'login-required',
      checkLoginIframe: false,
    },
    config: {
      realm: ssoRealm,
      url: ssoUrl,
      clientId: ssoClientId,
      logoutRedirectUri: logoutUrl,
    },
    onReady: () => {
      tokenInterceptor();
      new Vue({
        router,
        store,
        render: h => h(App),
      }).$mount('#app');
    },
  });
}

window.addEventListener('message', e => {
  if (
    e.data &&
    typeof e.data === 'string' &&
    e.data.match(/webpackHotUpdate/)
  ) {
    location.reload();
    console.clear();
  }
});
