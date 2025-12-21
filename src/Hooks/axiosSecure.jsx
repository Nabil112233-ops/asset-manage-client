import axios from "axios";
import { useNavigate } from "react-router";
import useAuth from "./useAuth"; 

const axiosSecure = axios.create({
    baseURL: 'https://asset-manage-server-blue.vercel.app'
});

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logOut } = useAuth();

    // Request Interceptor
    axiosSecure.interceptors.request.use((config) => {
        const token = localStorage.getItem('access-token');
        if (token) {
            config.headers.authorization = `Bearer ${token}`;
        }
        return config;
    }, (error) => Promise.reject(error));

    // Response Interceptor
    axiosSecure.interceptors.response.use((response) => response, 
    async (error) => {
        const status = error.response?.status;
        console.error('API Error:', status, error.config?.url);

        if (status === 401 || status === 403) {
            await logOut();
            navigate('/login');
        }
        return Promise.reject(error);
    });

    return axiosSecure;
};

export default useAxiosSecure;