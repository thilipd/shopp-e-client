
import axios from 'axios';

axios.defaults.withCredentials = true;

const instance = axios.create({
    baseURL: 'http://localhost:8000',
    responseType: 'json',
    timeout: 10000,

    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
    }
})

export default instance;