import axios from "axios";

const Api = axios.create({
    baseURL: 'http://207.244.238.126:8888',
    timeout: 7000,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export { Api }