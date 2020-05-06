import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
        roomToken: '',
        room: {},
        isAdmin: false,
        isParticipant: false,
        users: []
    },
    getters: {
        getRoomToken(state) {
            return state.roomToken
        },
        getRoom(state) {
            return state.room
        },
        getAdminStatus(state) {
            return state.isAdmin
        },
        getParticipantStatus(state) {
            return state.isParticipant
        },
        getAllUsers(state) {
            return state.users
        }
    },
    mutations: {
        setRoomToken(state, token) {
            state.roomToken = token
        },
        setRoom(state, room) {
            state.room = room
        },
        setAdmin(state) {
            state.isAdmin = true
        },
        setParticipant(state) {
            state.isParticipant = true
        },
        addUser(state, user) {
            state.users.push(user)
        }
    },
    actions: {
    },
    modules: {
    }
})
