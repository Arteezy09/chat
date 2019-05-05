import firebase from 'firebase/app'
import 'firebase/auth'
import db from '@/main'

export default {
    state: {
        user: {
            online: false,
            uid: null,
            name: null,
            email: null,
            photo: null
        }
    },
    getters: {
        userOnline: (state) => state.user.online,
        userId: (state) => state.user.uid,
        userName: (state) => state.user.name,
        userEmail: (state) => state.user.email,
        userPhoto: (state) => state.user.photo
    },
    mutations: {
        SET_USER(state, payload) {
            state.user.online = true
            state.user.uid = payload.uid
            state.user.email = payload.email
        },
        SET_USER_NAME(state, payload) {
            state.user.name = payload
        },
        SET_USER_EMAIL(state, payload) {
            state.user.email = payload
        },
        SET_USER_PHOTO(state, payload) {
            state.user.photo = payload
        },
        UNSET_USER(state) {
            state.user = {
                online: false,
                uid: null
            }
        }
    },
    actions: {
        SIGNUP({commit}, payload) {
            commit('SET_PROCESS', true)
            commit('CLEAR_ERROR1')
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
            .then(() => {
                firebase.auth().currentUser.updateProfile({displayName: payload.name})
                .then(() => commit('SET_USER_NAME', payload.name))

                firebase.auth().currentUser.updateProfile({photoURL: 'https://firebasestorage.googleapis.com/v0/b/chat-55a5b.appspot.com/o/avatar.jpg?alt=media&token=c21bb91c-1b67-40e3-a098-f0f63c24cc2f'})
                .then(() => commit('SET_USER_PHOTO', 'https://firebasestorage.googleapis.com/v0/b/chat-55a5b.appspot.com/o/avatar.jpg?alt=media&token=c21bb91c-1b67-40e3-a098-f0f63c24cc2f'))

                db.collection('users').add({
                    name: payload.name,
                    timestamp: Date.now()
                })
                commit('SET_PROCESS', false)
            })
            .catch(function(error) {
                commit('SET_PROCESS', false)
                commit('SET_ERROR1', error.message)
        
            });
        },
        SIGNIN({commit}, payload) {
            commit('SET_PROCESS', true)
            commit('CLEAR_ERROR2')
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
            .then(() => {
                commit('SET_PROCESS', false)
            })
            .catch(function(error) {
                commit('SET_PROCESS', false)
                commit('SET_ERROR2', error.message)
        
            });
        },
        SIGNOUT() {
            firebase.auth().signOut()
        },
        STATE_CHANGED({commit}, payload) {
            if (payload) {
                commit('SET_USER', {uid: payload.uid, email: payload.email})
                commit('SET_USER_NAME', payload.displayName)
                commit('SET_USER_PHOTO', payload.photoURL)   
            } 
            else {
                commit('UNSET_USER')
            }
        },
        CHANGE_USER_PROFILE_DATA({commit}, payload) {
            let user = firebase.auth().currentUser
            let credential = firebase.auth.EmailAuthProvider.credential(
                payload.email,
                payload.password
            )

            commit('SET_PROCESS', true)
            commit('CLEAR_ERROR')
            
            user.reauthenticateAndRetrieveDataWithCredential(credential).then(function() {
                if(payload.changeType == 'name') {
                    firebase.auth().currentUser.updateProfile({displayName: payload.newName})
                    .then(() => {
                        commit('SET_USER_NAME', payload.newName)
                        commit('SET_PROCESS', false)
                    })
                    .catch(error => {
                        commit('SET_PROCESS', false)
                        commit('SET_ERROR', error.message)
                    })
                }
                if(payload.changeType == 'email') {
                    firebase.auth().currentUser.updateEmail(payload.newEmail)
                    .then(() => {
                        commit('SET_USER_EMAIL', payload.newEmail)
                        commit('SET_PROCESS', false)
                    })
                    .catch(error => {
                        commit('SET_PROCESS', false)
                        commit('SET_ERROR', error.message)
                    })
                }
                if(payload.changeType == 'password') {
                    firebase.auth().currentUser.updatePassword(payload.newPassword)
                    .then(() => {
                        commit('SET_PROCESS', false)
                    })
                    .catch(error => {
                        commit('SET_PROCESS', false)
                        commit('SET_ERROR', error.message)
                    })
                }
                if(payload.changeType == 'photo') {
                    firebase.auth().currentUser.updateProfile({photoURL: payload.newPhoto})
                    .then(() => {
                        commit('SET_USER_PHOTO', payload.newPhoto)
                        commit('SET_PROCESS', false)
                    })
                    .catch(error => {
                        commit('SET_PROCESS', false)
                        commit('SET_ERROR', error.message)
                    })
                }
            }).catch(function(error) {
                commit('SET_PROCESS', false)
                commit('SET_ERROR', error.message)
            });
        },

        RESET_PASSWORD({commit}, payload) {    
            commit('SET_PROCESS', true)
            commit('CLEAR_ERROR')
            firebase.auth().sendPasswordResetEmail(payload.email)
            .then(() => {                 
                commit('SET_PROCESS', false)
            })
            .catch(function(error) {
                commit('SET_PROCESS', false)
                commit('SET_ERROR', error.message)
            });
        },

        DELETE({commit}, payload) {
            let user = firebase.auth().currentUser
            let credential = firebase.auth.EmailAuthProvider.credential(
                payload.email,
                payload.password
            )
            commit('SET_PROCESS', true)
            commit('CLEAR_ERROR1') 
            user.reauthenticateAndRetrieveDataWithCredential(credential).then(function() {
                firebase.auth().currentUser.delete()
                .then(() => {
                    commit('SET_PROCESS', false)
                })
                .catch(error => {
                    commit('SET_PROCESS', false)
                    commit('SET_ERROR1', error.message)
                })
            }).catch(function(error) {
                commit('SET_PROCESS', false)
                commit('SET_ERROR1', error.message)
            });       
        }

    }
}