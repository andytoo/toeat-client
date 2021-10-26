import axios from 'axios'
import { authHeader } from '@/helpers/authHeader';

export default() => {
    const instance = axios.create({
        baseURL: process.env.VUE_APP_API_URL
    })

    const token = authHeader()
    if (token != null) {
        instance.defaults.headers.common['Authorization'] = token
    }
    
    return instance
}