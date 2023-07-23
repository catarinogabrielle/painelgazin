import axios from "axios";

const Api = axios.create({
    baseURL: 'http://207.244.238.126:8888'
})

const Api_Gazin = axios.create({
    baseURL: 'https://api.gazin.com.br/varejo/relatorio/promocoes'
})

export { Api_Gazin }

export { Api }