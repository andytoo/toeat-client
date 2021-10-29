export default function AuthHeader() {
    // return authorization header with jwt token
    let accessToken = localStorage.getItem('accessToken')
    let refreshToken = localStorage.getItem('refreshToken')

    if (accessToken) {
        return 'Bearer ' + accessToken 
    } else {
        return null
    }
}