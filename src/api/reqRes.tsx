import axios from "axios";

export const reqResApi = axios.create({    
    baseURL: 'https://jsonplaceholder.typicode.com'
});