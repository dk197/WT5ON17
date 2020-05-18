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
        showExchangeButton: false,
        showErrorPopup: false,
        errors: []
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
                if(Object.keys(state.user).length === 0) {
                    return false
                }else if(userId === state.user._id) {
                    return false
                }
                return state.showExchangeButton
            }
        },
        getErrorPopupStatus(state) {
            return state.showErrorPopup
        },
        getErrors(state) {
            return state.errors
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
            Vue.set(state, 'groups', [])
            state.showErrorPopup = false
            state.errors = []
        },
        setGroups(state, groups) {
            Vue.set(state, 'groups', groups)
        },
        toggleExchangeButtonStatus(state) {
            state.showExchangeButton = !state.showExchangeButton
        },
        exchangeUsers(state, data) {
            const groups = state.groups
            let receiverGroupIndex
            let senderGroupIndex
            let receiverIndex
            let senderIndex
            for (let index = 0; index < groups.length; index++) {
                const receiverSearchIndex = groups[index].participants.findIndex(participant => participant._id === data.receiver._id)
                const senderSearchIndex = groups[index].participants.findIndex(participant => participant._id === data.sender._id)
                if(receiverSearchIndex !== -1) {
                    receiverIndex = receiverSearchIndex
                    receiverGroupIndex = index
                }
                if(senderSearchIndex !== -1) {
                    senderIndex = senderSearchIndex
                    senderGroupIndex = index
                }
            }

            console.log(receiverGroupIndex,senderGroupIndex,receiverIndex,senderIndex);

            Vue.set(state.groups[receiverGroupIndex].participants, receiverIndex, {
                username: data.sender.username,
                role: data.sender.role,
                _id: data.sender._id
            })
            Vue.set(state.groups[senderGroupIndex].participants, senderIndex, {
                username: data.receiver.username,
                role: data.receiver.role,
                _id: data.receiver._id
            })
        },
        toggleErrorPopup(state) {
            state.showErrorPopup = !state.showErrorPopup
        },
        setErrors(state, message) {
            state.errors = message
        }
    },
    actions: {
    },
    modules: {
    }
})
