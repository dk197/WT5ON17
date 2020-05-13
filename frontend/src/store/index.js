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
        user: {},
        users: [],
        currentPhase: 'Beitrittsphase',
        groups: [],
        showExchangeButton: false
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
        getUser(state) {
            return state.user
        },
        getAllUsers(state) {
            return state.users
        },
        getCurrentPhase(state) {
            return state.currentPhase
        },
        getGroups(state) {
            console.log(state.groups);
            return state.groups
        },
        getExchangeButtonStatus(state) {
            return (userId) => {
                if(userId === state.user._id) {
                    return false
                }
                return state.showExchangeButton
            }
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
        setUser(state, user) {
            state.user = user
        },
        addUser(state, user) {
            state.users.push(user)
        },
        setPhase(state, phase) {
            state.currentPhase = phase
        },
        resetRoom(state) {
            state.roomToken = ''
            state.room = {}
            state.isAdmin = false
            state.isParticipant = false
            state.user = {}
            state.users = []
            state.currentPhase = '',
            state.showExchangeButton = false
        },
        setGroups(state, groups) {
            state.groups = groups
        },
        toggleExchangeButtonStatus(state) {
            state.showExchangeButton = !state.showExchangeButton
        }
    },
    actions: {
    },
    modules: {
    }
})
