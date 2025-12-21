import { useQuery } from "@tanstack/react-query";
import useAuth from './useAuth';
import axios from 'axios';
import useAxiosSecure from "./axiosSecure";

const useRole = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure()

    const { data: role, isLoading: isRoleLoading } = useQuery({
        queryKey: [user?.email, 'role'],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/role/${user?.email}`);
            return res.data.role;
        }
    });

    return [role, isRoleLoading];
};

export default useRole;