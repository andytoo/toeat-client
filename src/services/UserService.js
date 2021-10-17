import Api from '@/services/Api'
import store from '@/store/index'

export default {
    signIn(user) {
        return Api().post('/signIn', user)
    },
    signUp(user) {
        return Api().post('/signUp', user)
    },
    signOut() {
        store.dispatch('updateTokenAndUser', { user: {}, accessToken: null, refreshToken: null })
    }
}