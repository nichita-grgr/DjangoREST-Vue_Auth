import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import IdleVue from 'idle-vue'

const eventsHub = new Vue()

Vue.use(IdleVue, {
  eventEmitter: eventsHub,
  idleTime: 720000
})
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.loggedIn) {
      next({ name: 'login' })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresLogged)) {
    if (store.getters.loggedIn) {
      next({ name: 'home' })
    } else {
      next()
    }
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
