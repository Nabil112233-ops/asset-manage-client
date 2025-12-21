import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useAuth from '../../Hooks/useAuth';
import toast from 'react-hot-toast';

const AllRequest = () => {
    const { user } = useAuth();

    const { data: requests = [], refetch } = useQuery({
        queryKey: ['hr-requests', user?.email],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/hr-requests/${user?.email}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('access-token')}`
                }
            });
            return res.data;
        }
    });

    const handleApprove = async (request) => {
        const res = await axios.patch(`http://localhost:5000/approve-request/${request._id}`, {
            assetId: request.assetId,
            employeeEmail: request.requesterEmail,
            hrEmail: user?.email,
            companyName: request.companyName
        }, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('access-token')}`
            }
        });

        if (res.data.success) {
            toast.success("Request Approved!");
            refetch();
        } else {
            toast.error(res.data.message);
        }
    };

    const handleReject = async (id) => {
        if (window.confirm("Are you sure you want to reject this request?")) {
            const res = await axios.patch(`http://localhost:5000/reject-request/${id}`, {}, {
                headers: { authorization: `Bearer ${localStorage.getItem('access-token')}` }
            });
            if (res.data.modifiedCount > 0) {
                toast.success("Request Rejected!");
                refetch();
            }
        }
    };

    return (
        <div className="bg-white rounded-xl shadow p-4 sm:p-6 overflow-x-auto w-full">
            <h2 className="text-xl font-bold mb-4">Asset Requests</h2>
            <table className="table w-full text-sm md:text-base">
                <thead>
                    <tr className="bg-gray-100">
                        <th>Employee</th>
                        <th>Asset Name</th>
                        <th>Type</th>
                        <th>Request Date</th>
                        <th>Note</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.map(req => (
                        <tr key={req._id}>
                            <td>{req.requesterName} <br /><span className="text-xs text-gray-400">{req.requesterEmail}</span></td>
                            <td>{req.assetName}</td>
                            <td>{req.assetType}</td>
                            <td>{new Date(req.requestDate).toLocaleDateString()}</td>
                            <td>{req.note || '---'}</td>
                            <td>
                                <span className={`badge ${req.status === 'pending' ? 'badge-warning' : 'badge-success'}`}>
                                    {req.status}
                                </span>
                            </td>
                            <td className="flex flex-wrap gap-2">
                                {req.status === 'pending' && (
                                    <>
                                        <button onClick={() => handleApprove(req)} className="btn btn-xs btn-success text-white">Approve</button>
                                        <button onClick={() => handleReject(req._id)} className="btn btn-xs btn-error text-white">Reject</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllRequest;