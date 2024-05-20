import axios from "axios";

const Api = axios.create({
    baseURL: 'https://thback.thdacademy.com',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export { Api }