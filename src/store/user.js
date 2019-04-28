import firebase from 'firebase'

export default {
    state: {
        user: {
            online: false,
            user_id: null
        }
    },
    mutations: {
        SET_USER(state, payload) {
            state.user.online = true
            state.user.user_id = payload
        },
        UNSET_USER(state) {
            state.user = {
                online: false,
                user_id: null
            }
        }
    },
    actions: {
        SIGNUP({commit}, payload) {
            commit('SET_PROCESS', true)
            commit('CLEAR_ERROR')
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
            .then(() => {
                commit('SET_PROCESS', false)
            })
            .catch(function(error) {
                commit('SET_PROCESS', false)
                commit('SET_ERROR', error.message)
        
            });
        },
        SIGNIN({commit}, payload) {
            commit('SET_PROCESS', true)
            commit('CLEAR_ERROR')
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
            .then(() => {
                commit('SET_PROCESS', false)
            })
            .catch(function(error) {
                commit('SET_PROCESS', false)
                commit('SET_ERROR', error.message)
        
            });
        },
        SIGNOUT() {
            firebase.auth().signOut()
        },
        STATE_CHANGED({commit}, payload) {
            if (payload) {
                commit('SET_USER', payload.user_id)
            } 
            else {
                commit('UNSET_USER')
            }
        }
  
    },
    getters: {
        userOnline: (state) => state.user.online
    }
}