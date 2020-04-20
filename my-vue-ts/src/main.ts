import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'normalize.css/normalize.css';
import ElementUI from 'element-ui';
import SvgIcon from 'vue-svgicon';
import 'element-ui/lib/theme-chalk/index.css';
import '@/styles/element-variables.scss';
import '@/styles/index.scss';

import '@/permission'

import i18n from '@/lang'


console.log('678900',SvgIcon)
Vue.config.productionTip = false;

Vue.use(ElementUI, {
  i18n: (key: string, value: string) => i18n.t(key, value)
})

Vue.use(SvgIcon, {
  tagName: 'svg-icon',
  defaultWidth: '1em',
  defaultHeight: '1em'
})

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');

