import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL
})

// const token = AuthHeader()
// if (token != null) {
//     instance.defaults.headers.common['Authorization'] = token
// }

export default instance