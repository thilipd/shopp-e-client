
import axios from 'axios';

// axios.defaults.withCredentials = true;
// axios.defaults.crossorigin = false;

const instance = axios.create({
    baseURL: 'https://shopp-e-server.herokuapp.com/',
    // baseURL: ' http://localhost:8000',
    responseType: 'json',
    timeout: 10000,

    headers: {
        'Access-Control-Allow-Origin': 'https://shopp-e-server.herokuapp.com/',
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
    }
})

export default instance;