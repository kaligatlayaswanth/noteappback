import axios from 'axios';
import { ACCESS_TOKEN } from './constants';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // Base URL is set from environment variables
});

// Add a request interceptor to include the access token in headers
api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem(ACCESS_TOKEN); // Retrieve access token from local storage
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`; // Add Authorization header
        }
        return config;
    },
    (error) => {
        return Promise.reject(error); // Handle request error
    }
);

export default api;