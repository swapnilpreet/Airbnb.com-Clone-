import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
    // baseURL: 'http://localhost:4000',
    withCredentials: true,
})

export default axiosInstance;