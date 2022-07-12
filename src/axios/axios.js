
import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.crossorigin = true;

const instance = axios.create({
    baseURL: 'https://shopp-e-server.herokuapp.com/',
    responseType: 'json',
    timeout: 10000,

    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
    }
})

export default instance;