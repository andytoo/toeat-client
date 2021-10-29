import api from '@/services/Api'

class AuthService {
    signIn(user) {
        return api
        .post('/signIn', {
            phone: user.phone,
            password: user.password
        })
        .then(response => {
            if (response.data) {
                localStorage.setItem('user', JSON.stringify({ phone: response.data.phone, name: response.data.name, restaurantId: response.data.restaurantId, accessToken:  response.data.access_token, refreshToken: response.data.refresh_token }))
            }
            return response.data;
        })
        .catch(err => {
            return Promise.reject(err)
        });
    }

    logout() {
        localStorage.removeItem('user')
    }

    signUp(user) {
        return api.post('/signUp', {
            phone: user.phone, 
            name: user.name, 
            password: user.password, 
            confirm: user.confirm
        });
    }
}

export default new AuthService();