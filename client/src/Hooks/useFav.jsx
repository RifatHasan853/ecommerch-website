import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";







const useFav = () => {
    const axiosSecure = useAxiosSecure();
    const { user} = useAuth();
    const { refetch, data: fav = [] } = useQuery({
        queryKey: ['fav', user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/favourites?email=${user.email}`);
            return res.data;
        }
    })

    return [fav, refetch]

};

export default useFav;