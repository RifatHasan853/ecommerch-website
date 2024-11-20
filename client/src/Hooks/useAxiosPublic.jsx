import axios from "axios";
//import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://ecommerch-server-vintnoryc-rifat-hasans-projects.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
   
};

export default useAxiosPublic;
