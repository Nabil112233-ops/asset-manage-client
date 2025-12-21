import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useAuth from '../../Hooks/useAuth';
import toast from 'react-hot-toast';

const MyEmployee = () => {
    const { user } = useAuth(); 

    const { data: employees = [], refetch } = useQuery({
        queryKey: ['my-employees', user?.email],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/my-employees/${user?.email}`, {
                headers: { authorization: `Bearer ${localStorage.getItem('access-token')}` }
            });
            return res.data;
        }
    });

    const handleRemove = async (id) => {
        if (window.confirm("Are you sure you want to remove this employee from your company?")) {
            const res = await axios.delete(`http://localhost:5000/remove-employee/${id}?hrEmail=${user?.email}`, {
                headers: { authorization: `Bearer ${localStorage.getItem('access-token')}` }
            });
            if (res.data.success) {
                toast.success("Employee removed!");
                refetch();
            }
        }
    };

    return (
        <div className="bg-white rounded-xl shadow p-4 sm:p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">My Employees</h2>
                    <p className="text-sm text-gray-500 font-medium">
                        Count: {employees.length} / {user?.packageLimit || 5} members used
                    </p>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="table w-full text-sm sm:text-base">
                    <thead>
                        <tr className="bg-gray-50">
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(emp => (
                            <tr key={emp._id} className="hover:bg-gray-50">
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-8 h-8 sm:w-10 sm:h-10">
                                            <img src={emp.photo || "https://via.placeholder.com/40"} alt="" />
                                        </div>
                                    </div>
                                </td>
                                <td className="font-medium">{emp.name}</td>
                                <td>{emp.employeeEmail}</td>
                                <td>
                                    <button
                                        onClick={() => handleRemove(emp._id)}
                                        className="btn btn-xs btn-error text-white"
                                    >
                                        Remove From Team
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {employees.length === 0 && <p className="text-center py-10 text-gray-400">No employees found in your company.</p>}
            </div>
        </div>
    );
};

export default MyEmployee;