import { useQuery } from "@tanstack/react-query";
import useAuth from './useAuth';
import axios from 'axios';

const useRole = () => {
    const { user, loading } = useAuth();

    const { data: role, isLoading: isRoleLoading } = useQuery({
        queryKey: [user?.email, 'role'],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/users/role/${user?.email}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('access-token')}`
                }
            });
            return res.data.role;
        }
    });

    return [role, isRoleLoading];
};

export default useRole;