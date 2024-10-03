import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useAuth from './useAuth';


const useRole = () => {
  const { user, loading } = useAuth();

  // Use React Query to fetch the role based on the user's email
  const { data: role = '', isLoading } = useQuery({
    queryKey: ['role', user?.email],
    enabled: !loading && !!user?.email,  // Only fetch if user is authenticated and not loading
    queryFn: async () => {
      try {
        const { data } = await axios.get(`https://ecommerch-server-vintnoryc-rifat-hasans-projects.vercel.app/users/${user?.email}`);
        return data.role;  // Assuming server returns { role: 'admin' } or { role: 'user' }
      } catch (error) {
        console.error('Error fetching user role:', error);
        return ''; // Return an empty string if there's an error
      }
    },
  });

  return [role, isLoading];  // Return the role and loading state
};

export default useRole;
