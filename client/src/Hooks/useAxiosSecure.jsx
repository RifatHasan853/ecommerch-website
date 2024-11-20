import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
    baseURL: 'https://ecommerch-server-vintnoryc-rifat-hasans-projects.vercel.app', // Update with your backend URL
});

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logOut } = useAuth();

    axiosSecure.interceptors.request.use(
        async (config) => {
            // No need to add JWT tokens; the browser will handle cookies automatically
            return config;
        },
        (error) => Promise.reject(error)
    );

    // Response interceptor to handle 401/403 errors
    axiosSecure.interceptors.response.use(
        (response) => response,
        async (error) => {
            const status = error.response?.status;
            if (status === 401 || status === 403) {
                await logOut();  // Log out the user on error
                navigate('/login');  // Redirect to login
            }
            return Promise.reject(error);
        }
    );

    return axiosSecure;
};

export default useAxiosSecure;
