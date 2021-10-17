import store from '@/store/index'

export function authHeader() {
    // return authorization header with jwt token
    let accessToken = store.state.accessToken
    let refreshToken = store.state.refreshToken

    if (accessToken) {
        return 'Bearer ' + accessToken 
    } else {
        return null
    }
}