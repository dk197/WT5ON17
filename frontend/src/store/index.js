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
                if(Object.keys(state.user).length === 0) {
                    return false
                }else if(userId === state.user._id) {
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
            Vue.set(state, 'groups', [])
        },
        setGroups(state, groups) {
            Vue.set(state, 'groups', groups)
        },
        toggleExchangeButtonStatus(state) {
            state.showExchangeButton = !state.showExchangeButton
        },
        exchangeUsers(state, data) {
            console.log(data);
            const groups = state.groups
            // const receiverId = data.receiver._id
            // groups.forEach(group => {
            //     const index = group.paricipants.findIndex(participant => participant._id === receiverId)
            //     if(index) {
            //         console.log(object);
            //     }
            // });
            for (let index = 0; index < groups.length; index++) {
                const receiverIndex = groups[index].participants.findIndex(participant => participant._id === data.receiver._id)
                console.log(receiverIndex);
                if(receiverIndex !== -1) {
                    console.log(data.sender);
                    // const test = groups[index].participants
                    // test[receiverIndex] = data.sender
                    // Vue.set(state.groups[index], 'participants', test)
                    // groups[index].participants[receiverIndex] = data.sender
                    Vue.set(state.groups[index].participants, receiverIndex, {
                        username: 'test',
                        role: 'asdsadadssad'
                    })
                }
            }
            // const senderIndex = groups[data.senderGroupIndex].participants.findIndex(participant => participant._id === data.sender._id)
            // console.log(senderIndex);
            // Vue.set(state.groups[data.senderGroupIndex].participants, senderIndex, {
            //     username: 'test2',
            //     role: 'aaaaaaaasdsadadssad'
            // })
            // Vue.set(state, 'groups', groups)
        }
    },
    actions: {
    },
    modules: {
    }
})
