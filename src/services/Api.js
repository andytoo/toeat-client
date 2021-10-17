import axios from 'axios'
import { authHeader } from '@/helpers/authHeader';

export default() => {
    const instance = axios.create({
        baseURL: `http://localhost:8080`
    })

    const token = authHeader()
    if (token != null) {
        instance.defaults.headers.common['Authorization'] = token
    }
    
    return instance
}