import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        roomToken: ''
    },
    getters: {
        getRoomToken(state) {
            return state.roomToken
        }
    },
    mutations: {
        setRoomToken(state, token) {
            state.roomToken = token
        }
    },
    actions: {
    },
    modules: {
    }
})
