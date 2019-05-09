// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

import {Button, Checkbox, Toast, Circle, Tab, Tabs, RadioGroup, Radio, Popup} from 'vant'

Vue.use(Button).use(Checkbox).use(Toast).use(Circle).use(Tab).use(Tabs).use(RadioGroup).use(Radio).use(Popup)

Vue.config.productionTip = false

//把 `******` 加到 `Vue` 的原型中
Vue.prototype.axios = axios;

router.beforeEach((to,from,next)=>{
  // 为页面添加标题
  if (to.meta.title) {
    document.title = to.meta.title
  }
  // 验证登录
  let openid = localStorage.getItem('openid')
  if(to.path !== '/author' && openid==undefined){
    sessionStorage.setItem('beforeLoginUrl',to.fullPath)    // 保存用户进入的url
    next('/author')
    return false;
  }


  next()
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
