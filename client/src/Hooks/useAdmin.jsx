import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

// Define the base URL for your API
const BASE_URL = 'https://ecommerch-server-vintnoryc-rifat-hasans-projects.vercel.app';

const useAdmin = () => {
    const { user, loading } = useAuth();

    const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled: !loading && !!user?.email, // Only run the query if the user is not loading and has an email
        queryFn: async () => {
            console.log('Checking if user is admin', user);
            try {
                // Use fetch to make the API request
                const response = await fetch(`${BASE_URL}/users/admin/${user.email}`);
                
                // Check if the response is ok (status in the range 200-299)
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                // Parse the JSON response
                const data = await response.json();
                
                // Return whether the user is an admin
                return data?.admin;
            } catch (error) {
                console.error('Error fetching admin status:', error);
                return false; // Return false in case of error
            }
        }
    });

    return [isAdmin, isAdminLoading];
};

export default useAdmin;
