import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

function loadView(view) {
  return () => import(/* webpackChunkName: "view-[request]" */ `@/components/${view}.vue`)
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: loadView('Index'),
      meta:{
        index:1,
        auth:true,
        title:'用户中心'
      }
    },
    {
      path: '/usageNotice',
      name: 'UsageNotice',
      component: loadView('UsageNotice'),
      meta:{
        index:2,
        auth:true,
        title:'用户安全使用须知'
      }
    },
    {
      path: '/pay',
      name: 'Pay',
      component: loadView('Pay'),
      meta:{
        index:2,
        auth:true,
        title:'订单支付'
      }
    },
    {
      path: '/timeout',
      name: 'Timeout',
      component: loadView('Timeout'),
      meta:{
        index:3,
        auth:true,
        title:'付费计时'
      }
    },
    {
      path: '/myCards',
      name: 'MyCards',
      component: loadView('MyCards'),
      meta:{
        index:3,
        auth:true,
        title:'我的卡券'
      }
    },
  ]
})
