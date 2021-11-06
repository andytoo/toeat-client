import axiosInstance from '@/services/Api'
import TokenService from '@/services/TokenService'
import AuthService from '@/services/AuthService'

const setup = () => {
    axiosInstance.interceptors.request.use(
        (config) => {
            const token = TokenService.getLocalAccessToken()
            if (token) {
                config.headers["Authorization"] = 'Bearer ' + token
            }
            return config
        },
        (err) => {
            return Promise.reject(err)
        }
    )

    axiosInstance.interceptors.response.use(
        (res) => {
            return res
        },
        async (err) => {
            const originalConfig = err.config

            if (originalConfig.url === "/user/refreshToken" && err.response) {
                // Refresh Token was expired
                if (err.response.status === 401 ) {
                    AuthService.signOut()
                } else {
                    return Promise.reject(err)
                }
            } else if (originalConfig.url !== "/client/signIn" && err.response) {
                // Access Token was expired
                if (err.response.status === 401) {
                    try {
                        const rs = await axiosInstance.post("/client/refreshToken", {
                            refreshToken: TokenService.getLocalRefreshToken(),
                        })

                        const { accessToken } = rs.data
                        //   store.dispatch('auth/refreshToken', accessToken)
                        TokenService.updateLocalAccessToken(accessToken, refreshToken)
                        return axiosInstance(originalConfig)
                    } catch (_err) {
                        return Promise.reject(_err)
                    }
                }
            }
            return Promise.reject(err)
        }
    )
}

export default setup