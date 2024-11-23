import axios from "axios";

// use this axios instance only for authenticated users.
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_CHIT_CHAT_REST_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(
    config => {
        // handle this better, I didn't like the way it is!!!
        let authData = localStorage.getItem("authData");
        let authToken = null;

        if (authData) {
            authToken = JSON.parse(authData).token;
        }
        config.headers.Authorization = `Bearer ${authToken}`;
        return config;
    },
    error => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    response => {
        return response;
    },
    error => Promise.reject(error)
);

export default axiosInstance;
