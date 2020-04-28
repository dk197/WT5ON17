import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import VueSocketIO from 'vue-socket.io'

Vue.config.productionTip = false

const options = {}

Vue.use(new VueSocketIO({
    debug: true,
    connection: 'http://localhost:3000',
    vuex: {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
    },
    options: options
}))

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
