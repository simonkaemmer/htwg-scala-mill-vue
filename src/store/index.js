import Vue from 'vue'
import Vuex from 'vuex'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup, GithubAuthProvider
} from 'firebase/auth'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        status: '',
        name: localStorage.getItem('name'),
        accessToken: localStorage.getItem('accessToken')
    },
    mutations: {
        AUTH_REQUEST(state) {
            state.status = 'loading'
        },
        AUTH_SUCCESS(state, {user}) {
            console.log(user)
            state.status = 'success'
            state.name = user.displayName === null ? '' :  user.displayName
            state.accessToken = user.accessToken

            localStorage.setItem('name', user.displayName === null ? '' :  user.displayName)
            localStorage.setItem('accessToken', user.accessToken)
        },
        AUTH_ERROR(state) {
            state.status = 'error'
            state.name = null
            state.accessToken = null

            localStorage.removeItem('name')
            localStorage.removeItem('accessToken')
        },
        LOGOUT(state) {
            state.status = null
            state.name = null
            state.accessToken = null

            localStorage.removeItem('name')
            localStorage.removeItem('accessToken')
        }
    },
    actions: {
        login({commit}, user) {
            const auth = getAuth()
            return new Promise((resolve, reject) => {
                commit('AUTH_REQUEST')
                signInWithEmailAndPassword(auth, user.email, user.password)
                    .then((response) => {
                        commit('AUTH_SUCCESS', response)
                        resolve(response)
                    })
                    .catch(err => {
                        commit('AUTH_ERROR')
                        reject(err)
                    })
            })
        },
        loginWithGoogle({commit}, providerType) {
            const auth = getAuth()
            return new Promise((resolve, reject) => {
                commit('AUTH_REQUEST')
                let provider
                if (providerType === 'Google') {
                    provider = new GoogleAuthProvider()
                } else if (providerType === 'Github') {
                    provider = new GithubAuthProvider()
                } else {
                    reject()
                }
                signInWithPopup(auth, provider)
                    .then((response) => {
                        commit('AUTH_SUCCESS', response)
                        resolve(response)
                    })
                    .catch(err => {
                        commit('AUTH_ERROR')
                        reject(err)
                    })
            })
        },
        register({commit}, user) {
            const auth = getAuth()
            return new Promise((resolve, reject) => {
                commit('AUTH_REQUEST')
                createUserWithEmailAndPassword(auth, user.email, user.password)
                    .then(response => {
                        commit('AUTH_SUCCESS', response)
                        resolve(response)
                    })
                    .catch(err => {
                        commit('AUTH_ERROR')
                        reject(err)
                    })
            })
        },
        logout({commit}) {
            commit('LOGOUT')
        },
        onAuthError({commit}) {
            console.error('onAuthError');
            commit('AUTH_ERROR')
        }
    },
    getters: {
        isLoggedIn(state) {
            return !!state.accessToken
        },
        displayName(state) {
            return !!state.name
        },
        authStatus(state) {
            return state.status
        }
    }
})
