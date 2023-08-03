import axios from "axios"

export const api = axios.create({
    baseURL: "https://repositorio-capistrano-api.vercel.app/"
    
})