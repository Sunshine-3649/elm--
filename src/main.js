import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/router'
import store from './store/'
import {
  routerMode
} from './config/env'
import './config/rem'
import FastClick from 'fastclick'

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body);
  }, false);
}

Vue.use(VueRouter)
const router = new VueRouter({
  routes,
  mode: routerMode, // 依赖 HTML5 History API 和服务器配置
  strict: process.env.NODE_ENV !== 'production',
  // 使用前端路由，当切换到新路由时，想要页面滚到顶部，或者是保持原先的滚动位置，就像重新加载页面那样。 vue-router 能做到，而且更好，它让你可以自定义路由切换时页面如何滚动。
  // 滚动行为
  scrollBehavior(to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop; // 保存滚动的位置
      }
      return {
        x: 0,
        y: to.meta.savedPosition || 0
      }
    }
  }
})

new Vue({
  router,
  store,
}).$mount('#app')
